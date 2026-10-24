import { FastifyInstance } from 'fastify';
import { prisma } from './db.js';
import * as A from './auth.js';
import * as E from './engine.js';
import { setSession, getSession } from './socket.js';
import { SCENARIOS } from './scenarios.js';

type Level = 'info' | 'warn' | 'error';
type LogArgs = {
  sessionId: string;
  code: string;
  level?: Level;
  event: string;
  actor?: string | null;
  payload?: any;
};

export async function log(args: LogArgs) {
  try {
    await prisma.gameLog.create({
      data: {
        sessionId: args.sessionId,
        code: args.code,
        level: args.level ?? 'info',
        event: args.event,
        actor: args.actor ?? null,
        payload: args.payload ?? undefined
      }
    });
  } catch (e) {
    console.error('[log] failed', e);
  }
}

export async function routes(app: FastifyInstance) {
  app.post('/api/login', async (req, reply) => {
    const { email, password } = (req.body as any) || {};
    if (!email || !password) return reply.code(400).send({ error: 'missing' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.active) return reply.code(401).send({ error: 'invalid' });
    const ok = await A.verifyPassword(user.password, password);
    if (!ok) return reply.code(401).send({ error: 'invalid' });
    const token = A.signToken({ uid: user.id, role: user.role as any });
    A.setAuthCookie(reply, token);
    return { role: user.role };
  });

  app.post('/api/logout', async (_req, reply) => {
    A.clearAuthCookie(reply);
    return { ok: true };
  });

  app.get('/api/me', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    const u = await prisma.user.findUnique({ where: { id: auth.uid } });
    if (!u) return reply.code(401).send({ error: 'unauthorized' });
    return { id: u.id, email: u.email, role: u.role };
  });

  app.get('/api/admin/hosts', async (req, reply) => {
    if (!A.requireRole(req, reply, 'ADMIN')) return;
    return prisma.user.findMany({
      where: { role: 'HOST' },
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, active: true, createdAt: true }
    });
  });

  app.post('/api/admin/hosts', async (req, reply) => {
    if (!A.requireRole(req, reply, 'ADMIN')) return;
    const { email, password } = (req.body as any) || {};
    if (!email || !password) return reply.code(400).send({ error: 'missing' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return reply.code(409).send({ error: 'exists' });
    const hash = await A.hashPassword(password);
    const u = await prisma.user.create({ data: { email, password: hash, role: 'HOST' } });
    return { id: u.id, email: u.email };
  });

  app.post('/api/admin/hosts/:id/toggle', async (req, reply) => {
    if (!A.requireRole(req, reply, 'ADMIN')) return;
    const { id } = req.params as any;
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u) return reply.code(404).send({ error: 'not_found' });
    await prisma.user.update({ where: { id }, data: { active: !u.active } });
    return { ok: true, active: !u.active };
  });

  // ---- Admin: monitoring ----
  app.get('/api/admin/sessions', async (req, reply) => {
    if (!A.requireRole(req, reply, 'ADMIN')) return;

    const sessions = await prisma.gameSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        host: { select: { email: true } },
        _count: { select: { players: true, logs: true } }
      }
    });

    // Считаем метрики для каждой сессии — быстро, по логам в памяти
    const result = await Promise.all(sessions.map(async s => {
      const logs = await prisma.gameLog.findMany({
        where: { sessionId: s.id },
        select: { event: true, payload: true, createdAt: true },
        orderBy: { createdAt: 'asc' }
      });

      // Средняя длительность обсуждения
      const discLogs = logs.filter(l => l.event === 'phase:advance' && (l.payload as any)?.to === 'voting' && (l.payload as any)?.from === 'discussion');
      const discDurations: number[] = [];
      for (const dl of discLogs) {
        const p = dl.payload as any;
        if (p.durationInPrevPhaseSec && p.durationInPrevPhaseSec > 0) discDurations.push(p.durationInPrevPhaseSec);
      }
      const avgDiscussionSec = discDurations.length ? Math.round(discDurations.reduce((a, b) => a + b, 0) / discDurations.length) : null;

      // Голоса: правильные/всего
      const votes = logs.filter(l => l.event === 'vote');
      const correctVotes = votes.filter(v => {
        const p = v.payload as any;
        // s3 — убийца в dinner, t4 — в theatre, v5 — в manor
        const killerIds = new Set(['s3', 'v5', 't4']);
        return killerIds.has(p?.suspectId);
      }).length;

      // Среднее время до голоса
      const voteTimes = votes.map(v => (v.payload as any)?.timeToVoteSec).filter((n: number) => typeof n === 'number');
      const avgVoteDelaySec = voteTimes.length ? Math.round(voteTimes.reduce((a, b) => a + b, 0) / voteTimes.length) : null;

      // Средний размер команды
      const teamJoins = logs.filter(l => l.event === 'player:join');
      const playersCount = s._count.players;
      const avgTeamSize = playersCount > 0 && s._count.logs > 0 ? Math.round(playersCount * 10) / 10 : null;

      return {
        id: s.id,
        code: s.code,
        scenario: s.scenario,
        status: s.status,
        createdAt: s.createdAt,
        endedAt: s.endedAt,
        hostEmail: s.host?.email ?? null,
        playersCount,
        logsCount: s._count.logs,
        metrics: {
          avgDiscussionSec,
          correctVotes,
          totalVotes: votes.length,
          correctVotesPercent: votes.length ? Math.round((correctVotes / votes.length) * 100) : null,
          avgVoteDelaySec,
          avgTeamSize
        }
      };
    }));

    return result;
  });

  app.get('/api/admin/sessions/:code/logs', async (req, reply) => {
    if (!A.requireRole(req, reply, 'ADMIN')) return;
    const { code } = req.params as any;

    const session = await prisma.gameSession.findUnique({ where: { code } });
    if (!session) return reply.code(404).send({ error: 'not_found' });

    const logs = await prisma.gameLog.findMany({
      where: { sessionId: session.id },
      orderBy: { createdAt: 'asc' }
    });

    return {
      session: {
        id: session.id,
        code: session.code,
        scenario: session.scenario,
        status: session.status,
        createdAt: session.createdAt,
        endedAt: session.endedAt
      },
      logs
    };
  });

  // ---- Host ----
  app.get('/api/host/sessions', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    return prisma.gameSession.findMany({
      where: { hostId: auth.uid },
      orderBy: { createdAt: 'desc' },
      take: 30,
      select: { id: true, code: true, scenario: true, status: true, createdAt: true, endedAt: true }
    });
  });

  app.post('/api/host/sessions', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    const { scenarioId } = (req.body as any) || {};
    const sc = SCENARIOS.find(s => s.id === scenarioId);
    if (!sc) return reply.code(400).send({ error: 'bad_scenario' });

    let code = E.generateCode();
    while (await prisma.gameSession.findUnique({ where: { code } })) code = E.generateCode();

    const state = E.createInitialState(code, sc.id);
    const session = await prisma.gameSession.create({
      data: { code, hostId: auth.uid, scenario: sc.id, state: state as any, status: 'lobby' }
    });
    setSession(code, state);

    await log({
      sessionId: session.id, code, event: 'session:create', actor: auth.uid,
      payload: {
        scenarioId: sc.id, scenarioTitle: sc.title,
        suspectsCount: sc.suspects.length,
        cluesCount: sc.clues.length,
        totalRounds: state.totalRounds
      }
    });

    return { code, id: session.id };
  });

  app.get('/api/scenarios', async () =>
    SCENARIOS.map(s => ({ id: s.id, title: s.title, description: s.description, icon: s.icon }))
  );

  app.get('/api/session/:code', async (req, reply) => {
    const { code } = req.params as any;
    const s = getSession(code);
    if (s) return E.publicState(s, { revealSolution: false });
    const dbS = await prisma.gameSession.findUnique({ where: { code } });
    if (!dbS) return reply.code(404).send({ error: 'not_found' });
    return E.publicState(dbS.state as any, { revealSolution: false });
  });
}
