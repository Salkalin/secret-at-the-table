import { FastifyInstance } from 'fastify';
import { prisma } from '../db.js';
import * as A from '../auth.js';
import { SCENARIOS } from '../scenarios.js';
import { getProvider } from './registry.js';
import { createPayment, applyProviderStatus, buyWithBalance } from './service.js';
import { getScenarioPrice, TOPUP_MIN, TOPUP_MAX } from './catalog.js';

const KNOWN_ERRORS = new Set(['bad_amount', 'bad_scenario', 'already_owned', 'insufficient_funds', 'provider_unavailable']);

const publicPayment = (p: any) => ({
  id: p.id,
  purpose: p.purpose,
  scenarioId: p.scenarioId,
  amount: p.amount,
  currency: p.currency,
  status: p.status,
  confirmationUrl: p.confirmationUrl,
  createdAt: p.createdAt,
  paidAt: p.paidAt
});

export async function paymentRoutes(app: FastifyInstance) {
  app.get('/api/catalog', async () =>
    SCENARIOS.map(s => ({ id: s.id, title: s.title, price: getScenarioPrice(s.id) }))
  );

  app.get('/api/purchases', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    return prisma.purchase.findMany({
      where: { userId: auth.uid },
      orderBy: { createdAt: 'desc' },
      select: { scenarioId: true, price: true, createdAt: true }
    });
  });

  app.get('/api/payments', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    const list = await prisma.payment.findMany({
      where: { userId: auth.uid },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    return list.map(publicPayment);
  });

  app.post('/api/payments', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    const { purpose, amount, scenarioId } = (req.body as any) || {};
    if (purpose !== 'TOPUP' && purpose !== 'SCENARIO') return reply.code(400).send({ error: 'bad_purpose' });
    if (purpose === 'TOPUP' && (!Number.isInteger(amount) || amount < TOPUP_MIN || amount > TOPUP_MAX)) {
      return reply.code(400).send({ error: 'bad_amount' });
    }
    if (purpose === 'SCENARIO' && !SCENARIOS.some(s => s.id === scenarioId)) {
      return reply.code(400).send({ error: 'bad_scenario' });
    }
    const base = process.env.PUBLIC_URL || `${req.protocol}://${req.headers.host}`;
    try {
      const p = await createPayment({
        userId: auth.uid,
        purpose,
        amount: purpose === 'TOPUP' ? amount : undefined,
        scenarioId: purpose === 'SCENARIO' ? scenarioId : undefined,
        returnUrl: `${base}/?payment=return`
      });
      return publicPayment(p);
    } catch (e: any) {
      const code = KNOWN_ERRORS.has(e?.message) ? e.message : 'payment_failed';
      req.log.error(e);
      return reply.code(code === 'payment_failed' ? 502 : 400).send({ error: code });
    }
  });

  app.get('/api/payments/:id', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    const { id } = req.params as any;
    let p = await prisma.payment.findFirst({ where: { id, userId: auth.uid } });
    if (!p) return reply.code(404).send({ error: 'not_found' });
    const provider = getProvider(p.provider);
    if (provider && p.providerPaymentId && (p.status === 'PENDING' || p.status === 'WAITING_FOR_CAPTURE')) {
      const status = await provider.getStatus(p.providerPaymentId).catch(() => null);
      if (status && status !== p.status) p = (await applyProviderStatus(provider.name, p.providerPaymentId, status)) || p;
    }
    return publicPayment(p);
  });

  app.post('/api/scenarios/:id/buy', async (req, reply) => {
    const auth = A.getAuthFromCookie(req);
    if (!auth) return reply.code(401).send({ error: 'unauthorized' });
    const { id } = req.params as any;
    if (!SCENARIOS.some(s => s.id === id)) return reply.code(404).send({ error: 'not_found' });
    try {
      await buyWithBalance(auth.uid, id);
      const u = await prisma.user.findUnique({ where: { id: auth.uid }, select: { balance: true } });
      return { ok: true, balance: u?.balance ?? 0 };
    } catch (e: any) {
      const code = KNOWN_ERRORS.has(e?.message) ? e.message : 'error';
      return reply.code(code === 'insufficient_funds' ? 402 : 400).send({ error: code });
    }
  });

  app.post('/api/payments/webhook/:provider', async (req, reply) => {
    const { provider: name } = req.params as any;
    const provider = getProvider(name);
    if (!provider) return reply.code(404).send({ error: 'not_found' });
    const event = await provider.parseWebhook({
      headers: req.headers as any,
      rawBody: (req as any).rawBody ?? '',
      body: req.body,
      ip: req.ip
    }).catch(() => null);
    if (!event) return reply.code(400).send({ error: 'bad_webhook' });
    await applyProviderStatus(provider.name, event.providerPaymentId, event.status);
    return { ok: true };
  });
}
