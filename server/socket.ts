import { Server } from 'socket.io';
import { prisma } from './db.js';
import * as E from './engine.js';

const sessions = new Map<string, E.GameState>();
const clueTimers = new Map<string, NodeJS.Timeout>();

function stopClueTimer(code: string) {
  const t = clueTimers.get(code);
  if (t) {
    clearInterval(t);
    clueTimers.delete(code);
  }
}

function broadcastState(io: Server, code: string, ns: E.GameState) {
  const screenPub = E.publicState(ns, { revealSolution: ns.phase === 'end' });
  const playPub = E.publicState(ns, { revealSolution: false });
  io.to(`screen:${code}`).emit('state', screenPub);
  io.to(`play:${code}`).emit('state', playPub);
}

async function persistState(code: string, ns: E.GameState) {
  try {
    if (ns.phase === 'end') {
      await prisma.gameSession.update({
        where: { code },
        data: { status: 'finished', endedAt: new Date(), state: ns as any }
      });
    } else {
      await prisma.gameSession.update({
        where: { code },
        data: { state: ns as any, status: ns.phase === 'lobby' ? 'lobby' : 'playing' }
      });
    }
  } catch (e) {
    console.error('[persist] db update failed', e);
  }
}

function startClueTimer(io: Server, code: string) {
  stopClueTimer(code);
  const s0 = sessions.get(code);
  if (!s0 || s0.phase !== 'discussion') return;

  const timer = setInterval(async () => {
    const s = sessions.get(code);
    if (!s || s.phase !== 'discussion' || !s.roundStartedAt) {
      stopClueTimer(code);
      return;
    }
    const elapsed = Math.floor((Date.now() - s.roundStartedAt) / 1000);
    const sc = E.scenarioOf(s);
    const roundClues = sc.clues
      .map((c, i) => ({ c, i }))
      .filter(x => x.c.round === s.round)
      .map(x => x.i);

    const times = E.CLUE_TIMES_SEC;
    const shouldReveal = roundClues.filter((_, idx) => elapsed >= (times[idx] || 9999));
    let changed = false;
    let ns = s;
    for (const clueIdx of shouldReveal) {
      if (!ns.revealedClues.includes(clueIdx)) {
        ns = E.revealClue(ns, clueIdx);
        changed = true;
      }
    }
    if (changed) {
      sessions.set(code, ns);
      await persistState(code, ns);
      broadcastState(io, code, ns);
    }
  }, 3000);

  clueTimers.set(code, timer);
}

export function attachSocket(io: Server) {
  io.on('connection', socket => {
    console.log('[socket] connected', socket.id);

    socket.on('screen:join', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      socket.join(`screen:${code}`);
      cb?.({ state: E.publicState(s, { revealSolution: false }) });
    });

    socket.on('player:join', async (payload: { code: string; nickname: string; wantCaptain: boolean }, cb?: any) => {
      const { code, nickname, wantCaptain } = payload;
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      if (!nickname || !nickname.trim()) return cb?.({ error: 'no_name' });

      let teamId: string | null = null;
      let isCaptain = false;

      if (wantCaptain) {
        const id = Math.random().toString(36).slice(2, 10);
        s.teams.push({
          id,
          name: nickname + ' (стол)',
          score: 0,
          captainId: socket.id,
          vote: null
        });
        teamId = id;
        isCaptain = true;
      } else {
        const t = s.teams.find(t => t.captainId) || s.teams[0];
        if (!t) return cb?.({ error: 'no_teams' });
        teamId = t.id;
      }

      const dbSession = await prisma.gameSession.findUnique({ where: { code } });
      if (dbSession) {
        await prisma.player.create({
          data: {
            sessionId: dbSession.id,
            nickname,
            socketId: socket.id,
            teamId,
            isCaptain
          }
        });
      }

      socket.data = { code, teamId, isCaptain, nickname };
      socket.join(`play:${code}`);

      const pub = E.publicState(s, { revealSolution: false });
      io.to(`screen:${code}`).emit('state', pub);
      io.to(`play:${code}`).emit('state', pub);
      cb?.({ state: pub, teamId, isCaptain });
    });

    socket.on('host:advance', async ({ code }: { code: string }, cb?: any) => {
      console.log('[host:advance]', code);
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      const ns = E.nextPhase(s);
      sessions.set(code, ns);

      stopClueTimer(code);
      if (ns.phase === 'discussion') startClueTimer(io, code);

      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ state: E.publicState(ns, { revealSolution: ns.phase === 'end' }) });
    });

    socket.on('host:prev', async ({ code }: { code: string }, cb?: any) => {
      console.log('[host:prev]', code);
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      const ns = E.prevPhase(s);
      if (ns === s) return cb?.({ error: 'no_prev' });
      sessions.set(code, ns);

      stopClueTimer(code);
      if (ns.phase === 'discussion') startClueTimer(io, code);

      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ state: E.publicState(ns, { revealSolution: ns.phase === 'end' }) });
    });

    socket.on('host:reset', async ({ code }: { code: string }, cb?: any) => {
      console.log('[host:reset]', code);
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      const ns = E.resetSession(s);
      sessions.set(code, ns);
      stopClueTimer(code);

      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ state: E.publicState(ns, { revealSolution: false }) });
    });

    socket.on('team:vote', ({ code, suspectId }: { code: string; suspectId: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s || s.phase !== 'voting') return cb?.({ error: 'not_voting' });
      const { teamId, isCaptain } = (socket.data as any) || {};
      if (!isCaptain) return cb?.({ error: 'not_captain' });
      const team = s.teams.find(t => t.id === teamId);
      if (!team) return cb?.({ error: 'no_team' });
      team.vote = suspectId;

      const pub = E.publicState(s, { revealSolution: false });
      io.to(`screen:${code}`).emit('state', pub);
      io.to(`play:${code}`).emit('state', pub);
      cb?.({ ok: true });
    });

    socket.on('disconnect', () => {
      console.log('[socket] disconnected', socket.id);
    });
  });
}

export function getSession(code: string) {
  return sessions.get(code);
}

export function setSession(code: string, s: E.GameState) {
  sessions.set(code, s);
}