import { randomUUID } from 'node:crypto';
import type { PaymentProvider } from '../types.js';

export const stubProvider: PaymentProvider = {
  name: 'stub',

  async createPayment() {
    return { providerPaymentId: 'stub_' + randomUUID(), status: 'PENDING', confirmationUrl: null };
  },

  async getStatus() {
    return 'PENDING';
  },

  async parseWebhook(req) {
    if (process.env.NODE_ENV === 'production') return null;
    const { providerPaymentId, status } = req.body || {};
    if (typeof providerPaymentId !== 'string' || typeof status !== 'string') return null;
    return { providerPaymentId, status: status as any };
  }
};
