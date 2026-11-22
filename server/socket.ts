import { Server } from 'socket.io';
import { prisma } from './db.js';
import * as E from './engine.js';
import { log } from './routes.js';

const sessions = new Map<string, E.GameState>();
const clueTimers = new Map<string, NodeJS.Timeout>();
const votingTimers = new Map<string, NodeJS.Timeout>();

// ============================================================
// TIMERS
// ============================================================

function stopClueTimer(code: string) {
  const t = clueTimers.get(code);
  if (t) {
    clearInterval(t);
    clueTimers.delete(code);
  }
}

function stopVotingTimer(code: string) {
  const t = votingTimers.get(code);
  if (t) {
    clearTimeout(t);
    votingTimers.delete(code);
  }
}

function broadcastState(io: Server, code: string, ns: E.GameState) {
  const isReveal = ns.phase === 'reveal';
  const screenPub = E.publicState(ns, { revealSolution: ns.phase === 'end' });
  // В фазе reveal игроку отдаём killerId (myKillerId), чтобы он увидел свою роль
  const playPub = E.publicState(ns, { revealSolution: isReveal });
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

    const times = s.isCustom
      ? E.clueTimesForRound(roundClues.length, s.roundDurationSec)
      : E.CLUE_TIMES_SEC;
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

function startVotingTimer(io: Server, code: string) {
  stopVotingTimer(code);
  const t = setTimeout(async () => {
    const s = sessions.get(code);
    if (!s || s.phase !== 'voting') return;
    if (s.isDemo) return;

    const ns = E.nextPhase(s);
    sessions.set(code, ns);
    stopClueTimer(code);
    if (ns.phase === 'discussion') startClueTimer(io, code);

    const dbS = await prisma.gameSession.findUnique({ where: { code } });
    if (dbS) {
      await log({
        sessionId: dbS.id,
        code,
        event: 'voting:auto-advance',
        actor: 'timer',
        payload: { round: s.round, teamsVoted: s.teams.filter(t => t.vote).length }
      });
    }

    await persistState(code, ns);
    broadcastState(io, code, ns);
  }, 60_000);

  votingTimers.set(code, t);
}

// ============================================================
// SOCKET
// ============================================================

export function attachSocket(io: Server) {
  io.on('connection', socket => {
    console.log('[socket] connected', socket.id);

    // ============================================================
    // SCREEN
    // ============================================================

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

      cb?.({ state: E.publicState(s, { revealSolution: s.phase === 'end' }) });
    });

    // ============================================================
    // PLAYER: JOIN
    // ============================================================

    socket.on('player:join', async (payload: {
      code: string;
      nickname: string;
      wantCaptain: boolean;
      reconnectTeamId?: string;
      targetTeamId?: string;
    }, cb?: any) => {
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
        // Защита от дубликата названия стола
        const wantedName = nickname.trim();
        const normalized = wantedName.toLowerCase();
        const duplicate = s.teams.find(
          t =>
            t.name.trim().toLowerCase() === normalized ||
            t.name.trim().toLowerCase().replace(/\s*\(стол\)$/i, '') === normalized
        );
        if (duplicate) {
          return cb?.({ error: 'duplicate_name' });
        }

        const id = Math.random().toString(36).slice(2, 10);
        s.teams.push({
          id,
          name: wantedName,
          score: 0,
          captainId: socket.id,
          captainName: wantedName,
          vote: null,
          joinedAt: Date.now(),
          roundScores: [],
          players: [
            { socketId: socket.id, nickname: wantedName, joinedAt: Date.now() }
          ]
        });
        teamId = id;
        isCaptain = true;
      } else {
        const targetTeamId = (payload as any).targetTeamId as string | undefined;

        // Нельзя переключаться после старта игры
        if (s.phase !== 'lobby' && s.phase !== 'build') {
          return cb?.({ error: 'game_started' });
        }

        let t = targetTeamId
          ? s.teams.find(x => x.id === targetTeamId)
          : s.teams.find(x => x.captainId) || s.teams[0];

        if (!t) return cb?.({ error: 'no_teams' });

        if (!t.players) t.players = [];
        const existing = t.players.find(
          p => p.nickname.trim().toLowerCase() === nickname.trim().toLowerCase()
        );
        if (existing) {
          existing.socketId = socket.id;
        } else {
          for (const other of s.teams) {
            if (other.id !== t.id && other.players) {
              other.players = other.players.filter(
                p =>
                  p.nickname.trim().toLowerCase() !==
                  nickname.trim().toLowerCase()
              );
            }
          }
          t.players.push({
            socketId: socket.id,
            nickname: nickname.trim(),
            joinedAt: Date.now()
          });
        }

        teamId = t.id;
        isCaptain = false;
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

    // ============================================================
    // HOST: ADVANCE / PREV / RESET / PAUSE / CLOSE
    // ============================================================

    socket.on('host:advance', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });

      // Для custom: из lobby переходим в build, а не в intro
      const fromPhase = s.phase;
      const ns = E.nextPhase(s);
      sessions.set(code, ns);
      stopClueTimer(code);
      stopVotingTimer(code);

      if (ns.phase === 'discussion') startClueTimer(io, code);
      if (ns.phase === 'voting' && !ns.isDemo) startVotingTimer(io, code);
      if (ns.phase === 'story' && fromPhase === 'reveal') startClueTimer(io, code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'phase:advance', actor: 'host',
          payload: {
            from: fromPhase,
            to: ns.phase,
            round: ns.round || s.round,
            totalRounds: ns.totalRounds,
            isCustom: ns.isCustom,
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
      stopVotingTimer(code);
      if (ns.phase === 'discussion') startClueTimer(io, code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'phase:prev', actor: 'host',
          payload: { from: s.phase, to: ns.phase, round: ns.round, isCustom: ns.isCustom }
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
      stopVotingTimer(code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'session:reset', actor: 'host',
          payload: {
            prevPhase: s.phase,
            prevRound: s.round,
            teamsCount: s.teams.length,
            isCustom: ns.isCustom
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
            payload: {
              paused: true, round: ns.round,
              elapsedSec: s.roundStartedAt
                ? Math.round((Date.now() - s.roundStartedAt) / 1000)
                : 0
            }
          });
        }
      }
      sessions.set(code, ns);
      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ ok: true, paused: !!ns.roundPausedAt });
    });

        socket.on('host:inject-clue', async (
      { code, clue }: {
        code: string;
        clue: { name: string; desc: string; icon?: string; type?: string };
      },
      cb?: any
    ) => {
      const s = sessions.get(code);
      if (!s || !s.isCustom) return cb?.({ error: 'not_custom' });
      if (s.phase !== 'discussion') return cb?.({ error: 'not_discussion' });
      if (!clue || !clue.desc || !clue.desc.trim()) return cb?.({ error: 'empty' });

      const sc = E.scenarioOf(s);
      if (!sc.clues) sc.clues = [];

      const newClue = {
        round: s.round,
        icon: clue.icon || 'fa-bullhorn',
        type: clue.type || 'вброс',
        name: String(clue.name || 'Новая улика').slice(0, 60),
        desc: String(clue.desc).slice(0, 300)
      };

      sc.clues.push(newClue);
      s.revealedClues.push(sc.clues.length - 1);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'host:inject-clue', actor: 'host',
          payload: { round: s.round, clue: newClue }
        });
      }

      await persistState(code, s);
      broadcastState(io, code, s);
      cb?.({ ok: true });
    });

    socket.on('host:close', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      stopClueTimer(code);
      stopVotingTimer(code);
      sessions.delete(code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'session:close', actor: 'host',
          payload: {
            finalPhase: s.phase,
            finalRound: s.round,
            teamsCount: s.teams.length,
            isCustom: s.isCustom,
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

    // ============================================================
    // TEAM: VOTE / CAPTAIN / LEAVE
    // ============================================================

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

    socket.on('team:set-captain', async (
      { code, newCaptainSocketId }: { code: string; newCaptainSocketId: string },
      cb?: any
    ) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      if (s.phase !== 'lobby' && s.phase !== 'build') return cb?.({ error: 'game_started' });

      const { teamId, isCaptain, nickname } = (socket.data as any) || {};
      if (!isCaptain) return cb?.({ error: 'not_captain' });

      const team = s.teams.find(t => t.id === teamId);
      if (!team) return cb?.({ error: 'no_team' });
      if (!team.players) team.players = [];

      const target = team.players.find(p => p.socketId === newCaptainSocketId);
      if (!target) return cb?.({ error: 'player_not_found' });

      team.captainId = target.socketId;
      team.captainName = target.nickname;

      const socketsInRoom = await io.in(`play:${code}`).fetchSockets();
      for (const sock of socketsInRoom) {
        const d = sock.data as any;
        if (d?.teamId === team.id) {
          d.isCaptain = sock.id === team.captainId;
        }
      }

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'team:set-captain',
          actor: nickname ?? teamId,
          payload: {
            teamId, teamName: team.name,
            previousCaptain: nickname,
            newCaptain: target.nickname,
            newCaptainSocketId: target.socketId
          }
        });
      }

      await persistState(code, s);
      broadcastState(io, code, s);
      cb?.({ ok: true, teamId: team.id, captainId: team.captainId });
    });

    socket.on('team:leave', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s) return cb?.({ error: 'not_found' });
      if (s.phase !== 'lobby' && s.phase !== 'build') return cb?.({ error: 'game_started' });

      const { teamId, nickname } = (socket.data as any) || {};
      const team = s.teams.find(t => t.id === teamId);
      if (!team) return cb?.({ error: 'no_team' });

      if (team.captainId === socket.id) {
        const others = (team.players || []).filter(p => p.socketId !== socket.id);
        if (others.length === 0) {
          s.teams = s.teams.filter(t => t.id !== team.id);
        } else {
          return cb?.({ error: 'captain_must_transfer' });
        }
      } else {
        if (team.players) {
          team.players = team.players.filter(p => p.socketId !== socket.id);
        }
      }

      socket.data = { ...(socket.data as any), teamId: undefined, isCaptain: false };

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'team:leave',
          actor: nickname ?? socket.id,
          payload: { teamId, teamName: team.name, phase: s.phase }
        });
      }

      await persistState(code, s);
      broadcastState(io, code, s);
      cb?.({ ok: true });
    });

    // ============================================================
    // CUSTOM: КОНСТРУКТОР
    // ============================================================

    socket.on('custom:set-setup', async (
      { code, setup }: { code: string; setup: E.CustomSetup },
      cb?: any
    ) => {
      const s = sessions.get(code);
      if (!s || !s.isCustom || s.phase !== 'lobby') return cb?.({ error: 'not_custom_lobby' });

      s.customSetup = {
        type: String(setup?.type || '').slice(0, 60),
        victim: String(setup?.victim || '').slice(0, 60),
        weapon: String(setup?.weapon || '').slice(0, 60),
        place: String(setup?.place || '').slice(0, 60),
        time: String(setup?.time || '').slice(0, 20),
        details: String(setup?.details || '').slice(0, 200)
      };

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'custom:set-setup', actor: 'host',
          payload: s.customSetup
        });
      }

      await persistState(code, s);
      broadcastState(io, code, s);
      cb?.({ ok: true });
    });

    socket.on('custom:set-config', async (
      { code, totalRounds, roundDurationSec }: {
        code: string;
        totalRounds?: number;
        roundDurationSec?: number;
      },
      cb?: any
    ) => {
      const s = sessions.get(code);
      if (!s || !s.isCustom || s.phase !== 'lobby') return cb?.({ error: 'not_custom_lobby' });

      if (typeof totalRounds === 'number') {
        s.totalRounds = Math.max(1, Math.min(5, Math.floor(totalRounds)));
      }
      if (typeof roundDurationSec === 'number') {
        s.roundDurationSec = Math.max(60, Math.min(1800, Math.floor(roundDurationSec)));
      }

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'custom:set-config', actor: 'host',
          payload: { totalRounds: s.totalRounds, roundDurationSec: s.roundDurationSec }
        });
      }

      await persistState(code, s);
      broadcastState(io, code, s);
      cb?.({ ok: true });
    });

    socket.on('custom:submit-card', async (
      { code, card }: { code: string; card: Partial<E.CustomPlayerCard> },
      cb?: any
    ) => {
      const s = sessions.get(code);
      if (!s || !s.isCustom || s.phase !== 'build') return cb?.({ error: 'not_build' });

      const { teamId, nickname } = (socket.data as any) || {};
      if (!teamId) return cb?.({ error: 'no_team' });

      if (!s.customCards) s.customCards = [];

      const newCard: E.CustomPlayerCard = {
        teamId,
        name: nickname ?? 'Unknown',
        role: String(card?.role || '').slice(0, 40),
        hook: String(card?.hook || '').slice(0, 90),
        motive: String(card?.motive || '').slice(0, 140),
        alibi: String(card?.alibi || '').slice(0, 140),
        location: String(card?.location || '').slice(0, 30),
        partner: String(card?.partner || 'Один').slice(0, 30)
      };

      const idx = s.customCards.findIndex(c => c.teamId === teamId);
      if (idx >= 0) s.customCards[idx] = newCard;
      else s.customCards.push(newCard);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'custom:submit-card', actor: nickname ?? teamId,
          payload: { teamId, totalCards: s.customCards.length }
        });
      }

      await persistState(code, s);
      broadcastState(io, code, s);
      cb?.({ ok: true, totalCards: s.customCards.length });
    });

    socket.on('custom:start', async ({ code }: { code: string }, cb?: any) => {
      const s = sessions.get(code);
      if (!s || !s.isCustom || s.phase !== 'build') return cb?.({ error: 'not_build' });
      if (!s.customSetup) return cb?.({ error: 'no_setup' });
      if ((s.customCards?.length ?? 0) < 2) return cb?.({ error: 'need_cards' });

      const ns = E.nextPhase({ ...s, phase: 'build' });
      sessions.set(code, ns);
      stopClueTimer(code);
      stopVotingTimer(code);

      const dbS = await prisma.gameSession.findUnique({ where: { code } });
      if (dbS) {
        await log({
          sessionId: dbS.id, code, event: 'custom:start', actor: 'host',
          payload: {
            totalRounds: ns.totalRounds,
            roundDurationSec: ns.roundDurationSec,
            cards: ns.customCards?.length ?? 0,
            killerId: ns.scenarioData?.killerId
          }
        });
      }

      await persistState(code, ns);
      broadcastState(io, code, ns);
      cb?.({ ok: true, state: E.publicState(ns, { revealSolution: false }) });
    });

    // ============================================================
    // TRACE
    // ============================================================

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

    // ============================================================
    // DISCONNECT
    // ============================================================

    socket.on('disconnect', () => {
      console.log('[socket] disconnected', socket.id);
      // не удаляем игрока — он может переподключиться по nickname
    });
  });
}

// ============================================================
// HELPERS
// ============================================================

export function getSession(code: string) {
  return sessions.get(code);
}

export function setSession(code: string, s: E.GameState) {
  sessions.set(code, s);
}