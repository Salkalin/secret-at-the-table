export type ProviderStatus = 'PENDING' | 'WAITING_FOR_CAPTURE' | 'SUCCEEDED' | 'CANCELED' | 'REFUNDED';

export type CreatePaymentInput = {
  paymentId: string;
  amount: number;
  currency: string;
  description: string;
  returnUrl: string;
  idempotencyKey: string;
  customerEmail: string;
  metadata: Record<string, string>;
};

export type CreatePaymentResult = {
  providerPaymentId: string;
  status: ProviderStatus;
  confirmationUrl: string | null;
};

export type WebhookRequest = {
  headers: Record<string, string | string[] | undefined>;
  rawBody: string;
  body: any;
  ip: string;
};

export type WebhookEvent = {
  providerPaymentId: string;
  status: ProviderStatus;
};

export interface PaymentProvider {
  readonly name: string;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  getStatus(providerPaymentId: string): Promise<ProviderStatus>;
  parseWebhook(req: WebhookRequest): Promise<WebhookEvent | null>;
}
