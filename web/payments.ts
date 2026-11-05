import { api } from './api';

export type Payment = {
  id: string;
  purpose: 'TOPUP' | 'SCENARIO';
  scenarioId: string | null;
  amount: number;
  currency: string;
  status: 'PENDING' | 'WAITING_FOR_CAPTURE' | 'SUCCEEDED' | 'CANCELED' | 'REFUNDED';
  confirmationUrl: string | null;
  createdAt: string;
  paidAt: string | null;
};

export const createTopUp = (amountKopecks: number) =>
  api<Payment>('/api/payments', {
    method: 'POST',
    body: JSON.stringify({ purpose: 'TOPUP', amount: amountKopecks })
  });

export const createScenarioPayment = (scenarioId: string) =>
  api<Payment>('/api/payments', {
    method: 'POST',
    body: JSON.stringify({ purpose: 'SCENARIO', scenarioId })
  });

export const getPayment = (id: string) => api<Payment>(`/api/payments/${id}`);

export const buyScenarioWithBalance = (scenarioId: string) =>
  api<{ ok: true; balance: number }>(`/api/scenarios/${scenarioId}/buy`, { method: 'POST' });

export const redirectToConfirmation = (p: Payment) => {
  if (p.confirmationUrl) window.location.href = p.confirmationUrl;
};
