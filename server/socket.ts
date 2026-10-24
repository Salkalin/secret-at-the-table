import { Server } from 'socket.io';
import { prisma } from './db.js';
import * as E from './engine.js';
import { log } from './routes.js';

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
    if (s.roundPausedAt) return;
    const elapsed = Math.floor(
      (Date.now() - s.roundStartedAt - (s.roundPausedTotalMs || 0)) / 1000
    );
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
      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'clue:auto-reveal', actor: 'timer',
          payload: {
            round: ns.round,
            elapsedSec: elapsed,
            totalRevealed: ns.revealedClues.length,
            newRevealed: ns.revealedClues.filter((i: number) => !s.revealedClues.includes(i))
          }
        });
      }
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

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'screen:join',
          actor: socket.id,
          payload: {
            socketId: socket.id,
            userAgent: (socket.handshake.headers['user-agent'] || '').slice(0, 120),
            ip: socket.handshake.address
          }
        });
      }

      cb?.({ state: E.publicState(s, { revealSolution: false }) });
    });

    socket.on('player:join', async (payload: { code: string; nickname: string; wantCaptain: boolean; reconnectTeamId?: string }, cb?: any) => {
      const { code, nickname, wantCaptain, reconnectTeamId } = payload;
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      if (!nickname || !nickname.trim()) return cb?.({ error: 'no_name' });

      let teamId: string | null = null;
      let isCaptain = false;

      if (reconnectTeamId) {
        const existing = s.teams.find(t => t.id === reconnectTeamId);
        if (existing) {
          teamId = existing.id;
          isCaptain = existing.captainName === nickname;
          if (isCaptain) existing.captainId = socket.id;
          socket.data = { code, teamId, isCaptain, nickname };
          socket.join(`play:${code}`);

          const dbS = await prisma.gameSession.findUnique({ where: { code } });
          if (dbS) {
            await log({
              sessionId: dbS.id, code, event: 'player:reconnect',
              actor: nickname,
              payload: {
                teamId, isCaptain, socketId: socket.id,
                userAgent: (socket.handshake.headers['user-agent'] || '').slice(0, 120)
              }
            });
          }

          const pub = E.publicState(s, { revealSolution: false });
          io.to(`screen:${code}`).emit('state', pub);
          io.to(`play:${code}`).emit('state', pub);
          return cb?.({ state: pub, teamId, isCaptain });
        }
      }

      if (wantCaptain) {
        const id = Math.random().toString(36).slice(2, 10);
        s.teams.push({
          id,
          name: nickname + ' (стол)',
          score: 0,
          captainId: socket.id,
          captainName: nickname,
          vote: null,
          joinedAt: Date.now(),
          roundScores: [0, 0, 0, 0]
        });
        teamId = id;
        isCaptain = true;
      } else {
        const t = s.teams.find(t => t.captainId) || s.teams[0];
        if (!t) return cb?.({ error: 'no_teams' });
        teamId = t.id;
      }

      socket.data = { code, teamId, isCaptain, nickname };
      socket.join(`play:${code}`);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'player:join',
          actor: nickname,
          payload: {
            teamId, isCaptain, socketId: socket.id,
            userAgent: (socket.handshake.headers['user-agent'] || '').slice(0, 120)
          }
        });
      }

      const pub = E.publicState(s, { revealSolution: false });
      io.to(`screen:${code}`).emit('state', pub);
      io.to(`play:${code}`).emit('state', pub);
      cb?.({ state: pub, teamId, isCaptain });
    });

    socket.on('host:advance', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      const ns = E.nextPhase(s);
      sessions.set(code, ns);
      stopClueTimer(code);
      if (ns.phase === 'discussion') startClueTimer(io, code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'phase:advance', actor: 'host',
          payload: {
            from: s.phase,
            to: ns.phase,
            round: ns.round || s.round,
            totalRounds: ns.totalRounds,
            roundLabel: ns.round === 0 ? 'подготовка' : `раунд ${ns.round}`,
            durationInPrevPhaseSec: ns.roundStartedAt && s.roundStartedAt
              ? Math.round((Date.now() - s.roundStartedAt) / 1000)
              : null
          }
        });
      }

      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ state: E.publicState(ns, { revealSolution: ns.phase === 'end' }) });
    });

    socket.on('host:prev', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      const ns = E.prevPhase(s);
      if (ns === s) return cb?.({ error: 'no_prev' });
      sessions.set(code, ns);
      stopClueTimer(code);
      if (ns.phase === 'discussion') startClueTimer(io, code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'phase:prev', actor: 'host',
          payload: { from: s.phase, to: ns.phase, round: ns.round }
        });
      }

      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ state: E.publicState(ns, { revealSolution: ns.phase === 'end' }) });
    });

    socket.on('host:reset', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      const ns = E.resetSession(s);
      sessions.set(code, ns);
      stopClueTimer(code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'session:reset', actor: 'host',
          payload: {
            prevPhase: s.phase,
            prevRound: s.round,
            teamsCount: s.teams.length
          }
        });
      }

      await persistState(code, ns);
      broadcastState(io, code, ns);
      io.to(`play:${code}`).emit('session:kill');
      io.in(`play:${code}`).disconnectSockets(true);
      cb?.({ state: E.publicState(ns, { revealSolution: false }) });
    });

    socket.on('host:toggle-pause', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s || s.phase !== 'discussion') return cb?.({ error: 'not_discussion' });
      const ns: any = { ...s };
      if (ns.roundPausedAt) {
        const pauseDur = Math.round((Date.now() - ns.roundPausedAt) / 1000);
        ns.roundPausedTotalMs = (ns.roundPausedTotalMs || 0) + (Date.now() - ns.roundPausedAt);
        ns.roundPausedAt = null;

        const dbS = await prisma.gameSession.findUnique({ where: { code } });
        if (dbS) {
          await log({
            sessionId: dbS.id, code, event: 'timer:toggle-pause', actor: 'host',
            payload: { paused: false, pausedDurationSec: pauseDur, round: ns.round }
          });
        }
      } else {
        ns.roundPausedAt = Date.now();
        const dbS = await prisma.gameSession.findUnique({ where: { code } });
        if (dbS) {
          await log({
            sessionId: dbS.id, code, event: 'timer:toggle-pause', actor: 'host',
            payload: { paused: true, round: ns.round, elapsedSec: s.roundStartedAt ? Math.round((Date.now() - s.roundStartedAt) / 1000) : 0 }
          });
        }
      }
      sessions.set(code, ns);

      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ ok: true, paused: !!ns.roundPausedAt });
    });

    socket.on('team:vote', ({ code, suspectId }: { code: string; suspectId: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s || s.phase !== 'voting') return cb?.({ error: 'not_voting' });
      const { teamId, isCaptain, nickname } = (socket.data as any) || {};
      if (!isCaptain) return cb?.({ error: 'not_captain' });
      const team = s.teams.find(t => t.id === teamId);
      if (!team) return cb?.({ error: 'no_team' });
      team.vote = suspectId;

      const roundStartMs = s.roundStartedAt || 0;
      const timeToVoteSec = roundStartMs ? Math.round((Date.now() - roundStartMs) / 1000) : null;

      prisma.gameSession.findUnique({ where: { code } }).then(dbS => {
        if (!dbS) return;
        log({
          sessionId: dbS.id, code, event: 'vote', actor: nickname ?? teamId,
          payload: {
            teamId, teamName: team.name, suspectId, round: s.round,
            timeToVoteSec,
            teamsVotedSoFar: s.teams.filter(t => t.vote).length,
            teamsTotal: s.teams.length
          }
        });
      });

      const pub = E.publicState(s, { revealSolution: false });
      io.to(`screen:${code}`).emit('state', pub);
      io.to(`play:${code}`).emit('state', pub);
      cb?.({ ok: true });
    });

    socket.on('client:trace', async (payload: { code: string; event: string; data?: any }) => {
      const { code, event, data } = payload;
      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (!dbS) return;
      const { nickname, teamId, isCaptain } = (socket.data as any) || {};
      await log({
        sessionId: dbS.id, code, event: 'client:' + event,
        actor: nickname ?? socket.id,
        payload: { ...(data || {}), teamId, isCaptain, socketId: socket.id }
      });
    });

    socket.on('host:close', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      stopClueTimer(code);
      sessions.delete(code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'session:close', actor: 'host',
          payload: {
            finalPhase: s.phase,
            finalRound: s.round,
            teamsCount: s.teams.length,
            teams: s.teams.map(t => ({
              name: t.name, score: t.score, roundScores: t.roundScores
            })),
            endedAt: new Date().toISOString()
          }
        });
      }

      io.to(`play:${code}`).emit('session:kill');
      io.in(`play:${code}`).disconnectSockets(true);
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
