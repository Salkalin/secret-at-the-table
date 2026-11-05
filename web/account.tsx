import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from './api';

export type Me = {
  id: string;
  email: string;
  role: 'ADMIN' | 'HOST' | 'PLAYER';
  firstName: string | null;
  lastName: string | null;
  balance: number;
};

type Ctx = {
  me: Me | null;
  loading: boolean;
  refresh: () => Promise<void>;
  setMe: (m: Me | null) => void;
  logout: () => Promise<void>;
};

const AccountContext = createContext<Ctx | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setMe(await api<Me>('/api/me'));
    } catch {
      setMe(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api('/api/logout', { method: 'POST' });
    } catch {}
    setMe(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AccountContext.Provider value={{ me, loading, refresh, setMe, logout }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const c = useContext(AccountContext);
  if (!c) throw new Error('AccountProvider missing');
  return c;
}

export const formatRub = (kopecks: number) =>
  (kopecks / 100).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₽';

export const fullName = (m: Me) => [m.lastName, m.firstName].filter(Boolean).join(' ') || m.email;

export const initials = (m: Me) =>
  ((m.lastName?.[0] || '') + (m.firstName?.[0] || '') || m.email[0]).toUpperCase();
