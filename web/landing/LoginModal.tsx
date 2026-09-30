import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setEmail('');
      setPassword('');
      setErr('');
      setBusy(false);
    }
  }, [open]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const r = await api<{ role: 'ADMIN' | 'HOST' }>('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      onClose();
      nav(r.role === 'ADMIN' ? '/admin' : '/host');
    } catch {
      setErr('Неверный логин или пароль');
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-[rgba(8,4,3,.85)] grid place-items-center p-6"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-[440px] w-full bg-[#1a110d] border border-lnd-line rounded-[22px] p-9">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-[34px] h-[34px] rounded-[9px] border border-lnd-line bg-white/[.04] grid place-items-center text-lnd-text hover:bg-white/10 transition"
          title="Закрыть"
        >
          <i className="fa-solid fa-xmark text-sm" />
        </button>

        <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold">
          <i className="fa-solid fa-id-badge" />
          Личный кабинет
        </div>
        <h2 className="font-serif text-[40px] mt-3.5 mb-2 text-lnd-cream font-semibold leading-none">
          Вход для ведущих
        </h2>
        <p className="m-0 mb-7 text-[14px] leading-relaxed text-lnd-muted">
          Введите email и пароль, которые выдал администратор. Если у вас нет доступа —
          обратитесь к администратору игры.
        </p>

        <form onSubmit={submit} noValidate>
          <label className="block mb-3.5">
            <span className="block text-[12px] font-semibold tracking-[.06em] mb-2 text-lnd-text">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@mail.ru"
              autoComplete="email"
              autoFocus
              className="w-full px-4 py-3.5 rounded-[10px] border border-lnd-line bg-white/[.04] text-lnd-cream text-[15px] outline-none focus:border-lnd-amber transition"
            />
          </label>

          <label className="block mb-3.5">
            <span className="block text-[12px] font-semibold tracking-[.06em] mb-2 text-lnd-text">
              Пароль
            </span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-3.5 rounded-[10px] border border-lnd-line bg-white/[.04] text-lnd-cream text-[15px] outline-none focus:border-lnd-amber transition"
            />
          </label>

          <div className="min-h-[20px] text-[13px] text-[#ef8a6a] mt-1 mb-1">{err}</div>

          <button
            type="submit"
            disabled={busy}
            className="w-full px-6 py-4 rounded-xl bg-lnd-amber text-[#1a0f0a] font-bold text-[15px] inline-flex items-center justify-center gap-2.5 hover:bg-[#ffb85a] transition disabled:opacity-50 mt-1.5"
          >
            {busy ? 'Вход…' : 'Войти'}
            <i className="fa-solid fa-arrow-right" />
          </button>
        </form>
      </div>
    </div>
  );
}