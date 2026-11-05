import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { api } from '../api';
import { useAccount, type Me } from '../account';
import { LEGAL_DOCS, type LegalDoc } from '../legal';

export type AuthMode = 'login' | 'register';

type Props = {
  open: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
  onSuccess?: (me: Me) => void;
};

const ERRORS: Record<string, string> = {
  invalid: 'Неверная почта или пароль',
  missing: 'Заполните почту и пароль',
  exists: 'Аккаунт с такой почтой уже существует',
  bad_email: 'Проверьте адрес электронной почты',
  bad_name: 'Укажите фамилию и имя буквами',
  weak_password: 'Пароль должен быть не короче 8 символов',
  consent_required: 'Необходимо принять оферту и согласие на обработку данных'
};

const inputCls =
  'w-full px-4 py-3.5 rounded-[10px] border border-lnd-line bg-white/[.04] text-lnd-cream text-[15px] outline-none focus:border-lnd-amber transition placeholder:text-lnd-muted/60';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block mb-3.5">
      <span className="block text-[12px] font-semibold tracking-[.06em] mb-2 text-lnd-text">{label}</span>
      {children}
    </label>
  );
}

export default function AuthModal({ open, initialMode = 'login', onClose, onSuccess }: Props) {
  const { setMe } = useAccount();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [consent, setConsent] = useState(false);
  const [doc, setDoc] = useState<LegalDoc | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMode(initialMode);
    setLastName('');
    setFirstName('');
    setEmail('');
    setPassword('');
    setShowPw(false);
    setConsent(false);
    setDoc(null);
    setErr('');
    setBusy(false);
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (doc) setDoc(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, doc]);

  if (!open) return null;

  const switchMode = (m: AuthMode) => {
    setMode(m);
    setErr('');
  };

  const openDoc = (d: LegalDoc) => {
    if (d.href) window.open(d.href, '_blank', 'noopener,noreferrer');
    else setDoc(d);
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    setErr('');
    if (mode === 'register') {
      if (!lastName.trim() || !firstName.trim()) return setErr(ERRORS.bad_name);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr(ERRORS.bad_email);
      if (password.length < 8) return setErr(ERRORS.weak_password);
      if (!consent) return setErr(ERRORS.consent_required);
    } else if (!email.trim() || !password) {
      return setErr(ERRORS.missing);
    }
    setBusy(true);
    try {
      const me =
        mode === 'register'
          ? await api<Me>('/api/register', {
              method: 'POST',
              body: JSON.stringify({ lastName, firstName, email, password, consent })
            })
          : await api<Me>('/api/login', {
              method: 'POST',
              body: JSON.stringify({ email, password })
            });
      setMe(me);
      onClose();
      onSuccess?.(me);
    } catch (e: any) {
      setErr(ERRORS[e?.message] || 'Что-то пошло не так. Попробуйте ещё раз');
      setBusy(false);
    }
  }

  const isReg = mode === 'register';
  const canSubmit = !busy && (!isReg || consent);

  return (
    <div
      className="fixed inset-0 z-40 bg-[rgba(8,4,3,.85)] backdrop-blur-sm overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-full grid place-items-center p-6" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="relative max-w-[460px] w-full bg-[#1a110d] border border-lnd-line rounded-[22px] p-8 md:p-9 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)]">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-[34px] h-[34px] rounded-[9px] border border-lnd-line bg-white/[.04] grid place-items-center text-lnd-text hover:bg-white/10 transition"
            title="Закрыть"
          >
            <i className="fa-solid fa-xmark text-sm" />
          </button>

          <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold">
            <i className="fa-solid fa-id-badge" />
            Аккаунт детектива
          </div>
          <h2 className="font-serif text-[40px] mt-3.5 mb-2 text-lnd-cream font-semibold leading-none">
            {isReg ? 'Регистрация' : 'Вход'}
          </h2>
          <p className="m-0 mb-6 text-[14px] leading-relaxed text-lnd-muted">
            {isReg
              ? 'Создайте аккаунт, чтобы открывать дела и покупать новые сюжеты.'
              : 'Войдите, чтобы продолжить расследование.'}
          </p>

          <div className="grid grid-cols-2 p-1 mb-6 rounded-xl border border-lnd-line bg-white/[.03]">
            {(['login', 'register'] as AuthMode[]).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={
                  'py-2.5 rounded-[9px] text-[13.5px] font-semibold transition ' +
                  (mode === m ? 'bg-lnd-amber text-[#1a0f0a]' : 'text-lnd-muted hover:text-lnd-cream')
                }
              >
                {m === 'login' ? 'Вход' : 'Регистрация'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} noValidate>
            {isReg && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                <Field label="Фамилия">
                  <input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Холмс"
                    autoComplete="family-name"
                    maxLength={60}
                    autoFocus
                    className={inputCls}
                  />
                </Field>
                <Field label="Имя">
                  <input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Шерлок"
                    autoComplete="given-name"
                    maxLength={60}
                    className={inputCls}
                  />
                </Field>
              </div>
            )}

            <Field label="Электронная почта">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@mail.ru"
                autoComplete="email"
                autoFocus={!isReg}
                className={inputCls}
              />
            </Field>

            <Field label="Пароль">
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={isReg ? 'Не менее 8 символов' : '••••••••'}
                  autoComplete={isReg ? 'new-password' : 'current-password'}
                  className={inputCls + ' pr-12'}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 grid place-items-center rounded-lg text-lnd-muted hover:text-lnd-cream transition"
                  title={showPw ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  <i className={'fa-solid ' + (showPw ? 'fa-eye-slash' : 'fa-eye') + ' text-sm'} />
                </button>
              </div>
            </Field>

            {isReg && (
              <label className="flex items-start gap-3 mt-4 mb-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  className={
                    'mt-0.5 shrink-0 w-5 h-5 rounded-md border grid place-items-center transition peer-focus-visible:ring-2 peer-focus-visible:ring-lnd-amber/50 ' +
                    (consent ? 'bg-lnd-amber border-lnd-amber' : 'border-lnd-muted/50 bg-white/[.04]')
                  }
                >
                  {consent && <i className="fa-solid fa-check text-[11px] text-[#1a0f0a]" />}
                </span>
                <span className="text-[13px] leading-relaxed text-lnd-muted">
                  Я принимаю условия{' '}
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      openDoc(LEGAL_DOCS.offer);
                    }}
                    className="text-lnd-amber underline underline-offset-2 decoration-lnd-amber/40 hover:decoration-lnd-amber"
                  >
                    публичной оферты
                  </button>{' '}
                  и даю{' '}
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      openDoc(LEGAL_DOCS.privacy);
                    }}
                    className="text-lnd-amber underline underline-offset-2 decoration-lnd-amber/40 hover:decoration-lnd-amber"
                  >
                    согласие на обработку персональных данных
                  </button>
                </span>
              </label>
            )}

            <div className="min-h-[20px] text-[13px] text-[#ef8a6a] mt-2 mb-1">{err}</div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full px-6 py-4 rounded-xl bg-lnd-amber text-[#1a0f0a] font-bold text-[15px] inline-flex items-center justify-center gap-2.5 hover:bg-[#ffb85a] transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-lnd-amber mt-1.5"
            >
              {busy ? (isReg ? 'Создаём аккаунт…' : 'Вход…') : isReg ? 'Зарегистрироваться' : 'Войти'}
              <i className="fa-solid fa-arrow-right" />
            </button>
          </form>

          <p className="mt-5 mb-0 text-center text-[13px] text-lnd-muted">
            {isReg ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
            <button
              type="button"
              onClick={() => switchMode(isReg ? 'login' : 'register')}
              className="text-lnd-amber font-semibold hover:text-[#ffb85a] transition"
            >
              {isReg ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </p>

          {doc && (
            <div
              className="absolute inset-0 rounded-[22px] bg-[rgba(13,8,7,.94)] grid place-items-center p-8"
              onClick={() => setDoc(null)}
            >
              <div className="text-center max-w-[320px]" onClick={e => e.stopPropagation()}>
                <span className="w-14 h-14 mx-auto mb-5 rounded-2xl grid place-items-center border border-lnd-line bg-white/[.04]">
                  <i className="fa-solid fa-file-signature text-xl text-lnd-amber" />
                </span>
                <h3 className="font-serif text-[28px] leading-tight text-lnd-cream font-semibold m-0 mb-3">
                  {doc.title}
                </h3>
                <p className="m-0 mb-6 text-[14px] leading-relaxed text-lnd-muted">
                  Документ готовится к публикации и скоро появится здесь.
                </p>
                <button
                  type="button"
                  onClick={() => setDoc(null)}
                  className="px-6 py-3 rounded-xl border border-lnd-line bg-white/[.04] text-lnd-cream font-semibold text-[14px] hover:bg-white/10 transition"
                >
                  Понятно
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
