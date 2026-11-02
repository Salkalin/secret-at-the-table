import { FastifyInstance } from 'fastify';
import { prisma } from './db.js';
import * as A from './auth.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}\s'’-]{1,60}$/u;

const normEmail = (v: unknown) => (typeof v === 'string' ? v.trim().toLowerCase() : '');
const normName = (v: unknown) => (typeof v === 'string' ? v.trim().replace(/\s+/g, ' ') : '');

const publicUser = (u: any) => ({
  id: u.id,
  email: u.email,
  role: u.role,
  firstName: u.firstName,
  lastName: u.lastName,
  balance: u.balance
});

export async function accountRoutes(app: FastifyInstance) {
  app.post('/api/register', async (req, reply) => {
    const b = (req.body as any) || {};
    const email = normEmail(b.email);
    const firstName = normName(b.firstName);
    const lastName = normName(b.lastName);
    const password = typeof b.password === 'string' ? b.password : '';
    if (b.consent !== true) return reply.code(400).send({ error: 'consent_required' });
    if (!NAME_RE.test(firstName) || !NAME_RE.test(lastName)) return reply.code(400).send({ error: 'bad_name' });
    if (!EMAIL_RE.test(email) || email.length > 254) return reply.code(400).send({ error: 'bad_email' });
    if (password.length < 8 || password.length > 128) return reply.code(400).send({ error: 'weak_password' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return reply.code(409).send({ error: 'exists' });
    const u = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: await A.hashPassword(password),
        role: 'PLAYER',
        consentAt: new Date(),
        consentIp: req.ip
      }
    });
    A.setAuthCookie(reply, A.signToken({ uid: u.id, role: 'PLAYER' }));
    return publicUser(u);
  });

  app.post('/api/login', async (req, reply) => {
    const b = (req.body as any) || {};
    const email = normEmail(b.email);
    const password = typeof b.password === 'string' ? b.password : '';
    if (!email || !password) return reply.code(400).send({ error: 'missing' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.active) return reply.code(401).send({ error: 'invalid' });
    const ok = await A.verifyPassword(user.password, password);
    if (!ok) return reply.code(401).send({ error: 'invalid' });
    A.setAuthCookie(reply, A.signToken({ uid: user.id, role: user.role as any }));
    return publicUser(user);
  });

  app.post('/api/logout', async (_req, reply) => {
    A.clearAuthCookie(reply);
    return { ok: true };
  });

  app.get('/api/me', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    const u = await prisma.user.findUnique({ where: { id: auth.uid } });
    if (!u || !u.active) return reply.code(401).send({ error: 'unauthorized' });
    return publicUser(u);
  });
}
