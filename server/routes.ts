import { FastifyInstance } from 'fastify';
import { prisma } from './db.js';
import * as A from './auth.js';
import * as E from './engine.js';
import { setSession, getSession } from './socket.js';
import { SCENARIOS } from './scenarios.js';

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
