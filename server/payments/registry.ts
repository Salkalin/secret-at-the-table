import type { PaymentProvider } from './types.js';
import { stubProvider } from './providers/stub.js';

const providers: Record<string, PaymentProvider> = {
  [stubProvider.name]: stubProvider
};

export const registerProvider = (p: PaymentProvider) => {
  providers[p.name] = p;
};

export const getProvider = (name?: string): PaymentProvider | null =>
  providers[name || process.env.PAYMENT_PROVIDER || 'stub'] || null;
