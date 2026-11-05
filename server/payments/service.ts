import { randomUUID } from 'node:crypto';
import { prisma } from '../db.js';
import { getProvider } from './registry.js';
import { getScenarioPrice } from './catalog.js';
import type { ProviderStatus } from './types.js';

type CreateArgs = {
  userId: string;
  purpose: 'TOPUP' | 'SCENARIO';
  amount?: number;
  scenarioId?: string;
  returnUrl: string;
};

export async function createPayment(args: CreateArgs) {
  const provider = getProvider();
  if (!provider) throw new Error('provider_unavailable');

  const user = await prisma.user.findUnique({ where: { id: args.userId } });
  if (!user) throw new Error('unauthorized');

  let amount = args.amount ?? 0;
  let description = 'Пополнение баланса';
  if (args.purpose === 'SCENARIO') {
    if (!args.scenarioId) throw new Error('bad_scenario');
    const owned = await prisma.purchase.findUnique({
      where: { userId_scenarioId: { userId: user.id, scenarioId: args.scenarioId } }
    });
    if (owned) throw new Error('already_owned');
    amount = getScenarioPrice(args.scenarioId);
    description = 'Покупка сюжета ' + args.scenarioId;
  }
  if (!Number.isInteger(amount) || amount <= 0) throw new Error('bad_amount');

  const idempotencyKey = randomUUID();
  const payment = await prisma.payment.create({
    data: {
      userId: user.id,
      purpose: args.purpose,
      scenarioId: args.scenarioId ?? null,
      amount,
      provider: provider.name,
      description,
      idempotencyKey
    }
  });

  const res = await provider.createPayment({
    paymentId: payment.id,
    amount,
    currency: payment.currency,
    description,
    returnUrl: args.returnUrl,
    idempotencyKey,
    customerEmail: user.email,
    metadata: { paymentId: payment.id, userId: user.id }
  });

  const updated = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      providerPaymentId: res.providerPaymentId,
      confirmationUrl: res.confirmationUrl,
      status: res.status
    }
  });

  if (res.status === 'SUCCEEDED') await settle(updated.id);
  return updated;
}

export async function applyProviderStatus(providerName: string, providerPaymentId: string, status: ProviderStatus) {
  const payment = await prisma.payment.findUnique({
    where: { provider_providerPaymentId: { provider: providerName, providerPaymentId } }
  });
  if (!payment) return null;
  if (payment.status === 'SUCCEEDED' && status !== 'REFUNDED') return payment;
  await prisma.payment.update({ where: { id: payment.id }, data: { status } });
  if (status === 'SUCCEEDED') await settle(payment.id);
  return prisma.payment.findUnique({ where: { id: payment.id } });
}

async function settle(paymentId: string) {
  await prisma.$transaction(async tx => {
    const p = await tx.payment.findUnique({ where: { id: paymentId } });
    if (!p || p.paidAt) return;
    await tx.payment.update({ where: { id: p.id }, data: { status: 'SUCCEEDED', paidAt: new Date() } });
    if (p.purpose === 'TOPUP') {
      await tx.user.update({ where: { id: p.userId }, data: { balance: { increment: p.amount } } });
    } else if (p.scenarioId) {
      await tx.purchase.upsert({
        where: { userId_scenarioId: { userId: p.userId, scenarioId: p.scenarioId } },
        create: { userId: p.userId, scenarioId: p.scenarioId, paymentId: p.id, price: p.amount },
        update: {}
      });
    }
  });
}

export async function buyWithBalance(userId: string, scenarioId: string) {
  const price = getScenarioPrice(scenarioId);
  return prisma.$transaction(async tx => {
    const owned = await tx.purchase.findUnique({ where: { userId_scenarioId: { userId, scenarioId } } });
    if (owned) throw new Error('already_owned');
    if (price > 0) {
      const r = await tx.user.updateMany({
        where: { id: userId, balance: { gte: price } },
        data: { balance: { decrement: price } }
      });
      if (r.count === 0) throw new Error('insufficient_funds');
    }
    return tx.purchase.create({ data: { userId, scenarioId, price } });
  });
}
