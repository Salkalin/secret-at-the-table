export type LegalDoc = { id: string; title: string; href: string | null };

export const LEGAL_DOCS: Record<'offer' | 'privacy', LegalDoc> = {
  offer: { id: 'offer', title: 'Публичная оферта', href: null },
  privacy: { id: 'privacy', title: 'Согласие на обработку персональных данных', href: null }
};
