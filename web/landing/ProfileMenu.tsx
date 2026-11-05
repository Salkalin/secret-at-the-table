import { useEffect, useRef, useState } from 'react';
import { useAccount, formatRub, fullName, initials } from '../account';

type Props = {
  onLogin: () => void;
};

export default function ProfileMenu({ onLogin }: Props) {
  const { me, loading, refresh, logout } = useAccount();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    refresh();
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, refresh]);

  if (loading) return null;

  if (!me) {
    return (
      <div className="fixed top-4 right-4 md:top-6 md:right-8 z-30">
        <button
          onClick={onLogin}
          className="px-4 py-2.5 rounded-xl border border-lnd-line bg-[rgba(22,14,11,.82)] backdrop-blur-md text-lnd-cream font-semibold text-sm inline-flex items-center gap-2.5 hover:border-lnd-amber/50 transition"
        >
          <i className="fa-solid fa-user text-lnd-amber text-[13px]" />
          Войти
        </button>
      </div>
    );
  }

  const name = fullName(me);
  const avatar = (size: string, text: string) => (
    <span
      className={`${size} shrink-0 rounded-full grid place-items-center font-bold text-[#1a0f0a] ${text}`}
      style={{ background: 'linear-gradient(135deg, #f2a541, #e0603a)' }}
    >
      {initials(me)}
    </span>
  );

  return (
    <div ref={ref} className="fixed top-4 right-4 md:top-6 md:right-8 z-30">
      <button
        onClick={() => setOpen(o => !o)}
        className={
          'pl-1.5 pr-3.5 py-1.5 rounded-full border bg-[rgba(22,14,11,.82)] backdrop-blur-md inline-flex items-center gap-2.5 transition ' +
          (open ? 'border-lnd-amber/50' : 'border-lnd-line hover:border-lnd-amber/50')
        }
      >
        {avatar('w-8 h-8', 'text-[12px]')}
        <span className="hidden sm:block max-w-[180px] truncate text-sm font-semibold text-lnd-cream">{name}</span>
        <i className={'fa-solid fa-chevron-down text-[10px] text-lnd-muted transition-transform ' + (open ? 'rotate-180' : '')} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2.5 w-[min(320px,calc(100vw-32px))] rounded-[18px] border border-lnd-line bg-[#1a110d]/95 backdrop-blur-md shadow-[0_30px_80px_-24px_rgba(0,0,0,.9)] p-2.5">
          <div className="flex items-center gap-3 px-2.5 py-2.5">
            {avatar('w-11 h-11', 'text-[15px]')}
            <div className="min-w-0">
              <div className="text-[15px] font-semibold text-lnd-cream truncate">{name}</div>
              <div className="text-[12.5px] text-lnd-muted truncate">{me.email}</div>
            </div>
          </div>

          <div className="h-px bg-lnd-line my-2" />

          <div className="px-2.5 pt-1.5 pb-2 text-[11px] tracking-[.18em] uppercase text-lnd-muted font-semibold">
            Счёт списания
          </div>
          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/[.04] border border-lnd-line">
            <i className="fa-solid fa-wallet text-lnd-amber text-[14px]" />
            <span className="text-[14px] text-lnd-text">Персональный счёт</span>
            <span className="ml-auto text-[14px] font-semibold text-lnd-cream tabular-nums">{formatRub(me.balance)}</span>
          </div>
          <button
            type="button"
            className="w-full mt-2.5 px-5 py-3.5 rounded-xl font-bold text-[15px] text-[#1a0f0a] inline-flex items-center justify-center gap-2.5 hover:brightness-110 transition shadow-[0_10px_30px_-12px_rgba(224,96,58,.8)]"
            style={{ background: 'linear-gradient(135deg, #f2a541, #e0603a)' }}
          >
            Пополнить баланс
          </button>

          <div className="h-px bg-lnd-line my-2.5" />

          <button
            type="button"
            onClick={async () => {
              setOpen(false);
              await logout();
            }}
            className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-[14px] text-lnd-text hover:bg-white/[.05] transition"
          >
            <i className="fa-solid fa-arrow-right-from-bracket w-4 text-lnd-muted" />
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}
