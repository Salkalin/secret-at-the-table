import { FastifyInstance } from 'fastify';
import { prisma } from './db.js';
import * as A from './auth.js';
import * as E from './engine.js';
import { setSession, getSession } from './socket.js';
import { SCENARIOS } from './scenarios.js';
import { accountRoutes } from './account.js';
import { paymentRoutes } from './payments/routes.js';
import { getAllScenariosMerged, getScenarioMerged } from './scenarios-merge.js';

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
  app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    (req as any).rawBody = body;
    if (!body) return done(null, {});
    try { done(null, JSON.parse(body as string)); } catch (e: any) { e.statusCode = 400; done(e, undefined); }
  });

  await app.register(accountRoutes);
  await app.register(paymentRoutes);

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
    const sc = await getScenarioMerged(scenarioId);
    if (!sc) return reply.code(400).send({ error: 'bad_scenario' });

    let code = E.generateCode();
    while (await prisma.gameSession.findUnique({ where: { code } })) code = E.generateCode();

    const state = E.createInitialState(code, sc.id);
    state.scenarioData = sc;
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

// ============================================
// Admin: editor for scenarios
// ============================================

// Получить смерженный сценарий + признак «есть ли правки»
app.get('/api/admin/scenarios/:id', async (req, reply) => {
  if (!A.requireRole(req, reply, 'ADMIN')) return;
  const { id } = req.params as any;
  const merged = await getScenarioMerged(id);
  if (!merged) return reply.code(404).send({ error: 'not_found' });
  const edit = await prisma.scenarioEdit.findUnique({ where: { id } });
  return { scenario: merged, hasEdit: !!edit, updatedAt: edit?.updatedAt ?? null };
});

// Сохранить правки (полная замена сценария)
app.post('/api/admin/scenarios/:id', async (req, reply) => {
  if (!A.requireRole(req, reply, 'ADMIN')) return;
  const { id } = req.params as any;
  const base = SCENARIOS.find(s => s.id === id);
  if (!base) return reply.code(404).send({ error: 'not_found' });
  const data = (req.body as any)?.data;
  if (!data || typeof data !== 'object') return reply.code(400).send({ error: 'bad_data' });

  await prisma.scenarioEdit.upsert({
    where: { id },
    update: { data },
    create: { id, data }
  });

  return { ok: true };
});

// Сбросить к базовой версии
app.delete('/api/admin/scenarios/:id', async (req, reply) => {
  if (!A.requireRole(req, reply, 'ADMIN')) return;
  const { id } = req.params as any;
  await prisma.scenarioEdit.deleteMany({ where: { id } });
  return { ok: true };
});

// Список всех сценариев (для левой колонки админки)
app.get('/api/admin/scenarios', async (req, reply) => {
  if (!A.requireRole(req, reply, 'ADMIN')) return;
  const edits = await prisma.scenarioEdit.findMany();
  const editMap = new Map(edits.map(e => [e.id, e.updatedAt]));
  return SCENARIOS.map(s => ({
    id: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
    hasEdit: editMap.has(s.id),
    updatedAt: editMap.get(s.id) ?? null
  }));
});

// ============================================
// Admin: flush scenarios edits into TS source
// ============================================

app.get('/api/admin/scenarios/:id/flush', async (req, reply) => {
  if (!A.requireRole(req, reply, 'ADMIN')) return;
  const { id } = req.params as any;

  const base = SCENARIOS.find(s => s.id === id);
  if (!base) return reply.code(404).send({ error: 'not_found' });

  const merged = await getScenarioMerged(id);
  if (!merged) return reply.code(404).send({ error: 'not_found' });

  // Генерируем TS-код объекта сценария (как в scenarios.ts)
  const ts = toTsObject(merged, 2);

  // Отдаём как файл
  reply.header('Content-Type', 'text/plain; charset=utf-8');
  reply.header(
    'Content-Disposition',
    `attachment; filename="${id}.ts.txt"`
  );
  return (
    `// Скопируй этот объект в server/scenarios.ts, заменив существующий с id="${id}"\n` +
    `// и запусти: git add server/scenarios.ts && git commit -m "chore(scenarios): sync ${id} from admin"\n\n` +
    ts
  );
});

/**
 * Сериализует объект в TS-код с отступами и правильным экранированием.
 * Сохраняет порядок ключей, как в объекте.
 */
function toTsString(value: string): string {
  // Многострочные строки (>200 символов или с \n) — через template literal,
  // чтобы не было гигантской однострочной простыни с \n
  const hasNewlines = value.includes('\n');
  const isLong = value.length > 200;

  if (hasNewlines || isLong) {
    // Экранируем только обратные кавычки и ${, чтобы не сломать template literal
    const escaped = value
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');
    return `\`${escaped}\``;
  }

  // Короткие строки — обычные одинарные кавычки
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
}

function toTsObject(value: any, indent: number): string {
  const pad = ' '.repeat(indent);
  const padInner = ' '.repeat(indent + 2);

  if (value === null) return 'null';
  if (typeof value === 'string') return toTsString(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map(v => padInner + toTsObject(v, indent + 2)).join(',\n');
    return `[\n${items}\n${pad}]`;
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) return '{}';
    const lines = keys.map(k => {
      const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`;
      return `${padInner}${key}: ${toTsObject(value[k], indent + 2)}`;
    });
    return `{\n${lines.join(',\n')}\n${pad}}`;
  }

  return 'undefined';
}

  // Email'ы, которым доступны все сюжеты (для тестирования)
  const FULL_ACCESS_EMAILS = [
    '1,hottabbych.com@yandex.ru'   // ← впиши свой email сюда
  ];

  app.get('/api/scenarios', async (req) => {
    const auth = A.getAuthFromCookie(req);
    let email = '';
    if (auth?.uid) {
      const user = await prisma.user.findUnique({ where: { id: auth.uid } });
      email = (user?.email ?? '').toLowerCase();
    }
    const hasFullAccess = FULL_ACCESS_EMAILS
      .map(e => e.toLowerCase())
      .includes(email);

    const list = await getAllScenariosMerged();
    return list.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      icon: s.icon,
      isLocked: s.id !== 'dinner' && !hasFullAccess
    }));
  });

  app.get('/api/session/:code', async (req, reply) => {
    const { code } = req.params as any;
    const s = getSession(code);
    if (s) return E.publicState(s, { revealSolution: false });
    const dbS = await prisma.gameSession.findUnique({ where: { code } });
    if (!dbS) return reply.code(404).send({ error: 'not_found' });
    return E.publicState(dbS.state as any, { revealSolution: false });
  });
}
