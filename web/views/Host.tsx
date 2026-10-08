import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { Btn } from '../ui';

type Scen = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type SessionRow = {
  id: string;
  code: string;
  scenario: string;
  status: string;
  createdAt: string;
};

const SCENARIO_META: Record<
  string,
  { icon: string; color: string; tag: string; no: string }
> = {
  dinner: {
    icon: 'fa-utensils',
    color: '#e0603a',
    tag: 'Отравление',
    no: '017'
  },
  manor: {
    icon: 'fa-chess-rook',
    color: '#3fb39c',
    tag: 'Запертая комната',
    no: '042'
  },
  theatre: {
    icon: 'fa-masks-theater',
    color: '#d2663f',
    tag: 'Премьера',
    no: '003'
  }
};

const RANDOM_META = {
  icon: 'fa-dice',
  color: '#f2a541',
  tag: 'Сюрприз',
  no: '???'
};

export default function Host() {
  const [scens, setScens] = useState<Scen[]>([]);
  const [selected, setSelected] = useState<string>('random');
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<Scen[]>('/api/scenarios').then(setScens);
    loadSessions();
  }, []);

  const loadSessions = () =>
    api<SessionRow[]>('/api/host/sessions')
      .then(setSessions)
      .catch(() => (location.href = '/login'));

  async function createSession() {
    if (busy) return;
    setBusy(true);
    try {
      let scenarioId = selected;
      if (scenarioId === 'random') {
        const pick = scens[Math.floor(Math.random() * scens.length)];
        scenarioId = pick?.id || scens[0]?.id;
      }
      const r = await api<{ code: string }>('/api/host/sessions', {
        method: 'POST',
        body: JSON.stringify({ scenarioId })
      });
      location.href = `/screen/${r.code}`;
    } catch (e) {
      setBusy(false);
      alert('Ошибка: не удалось создать сессию');
    }
  }

  async function logout() {
    try {
      await api('/api/logout', { method: 'POST' });
    } catch {}
    location.href = '/login';
  }

  const allCards = [
    { id: 'random', title: 'Случайное дело', description: 'Пусть решит жребий следствия. Вы узнаете дело, когда откроете папку.', ...RANDOM_META },
    ...scens.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      ...(SCENARIO_META[s.id] || RANDOM_META)
    }))
  ];

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center gap-4 pb-5 mb-10 border-b border-line flex-wrap">
        <div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-accent mb-1">
            Панель ведущего
          </div>
          <h1 className="font-serif text-4xl text-text font-semibold m-0">
            Выберите дело
          </h1>
        </div>
        <Btn onClick={logout}>Выйти</Btn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {allCards.map(card => {
          const isSel = selected === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setSelected(card.id)}
              className={
                'relative text-left rounded-[18px] p-6 min-h-[260px] flex flex-col transition overflow-hidden border ' +
                (isSel
                  ? 'border-transparent'
                  : 'border-line hover:-translate-y-1')
              }
              style={{
                background: isSel
                  ? `linear-gradient(180deg, ${card.color}22, rgba(16,10,8,.94))`
                  : 'linear-gradient(180deg, rgba(30,19,15,.9), rgba(16,10,8,.92))',
                boxShadow: isSel
                  ? `0 18px 50px -20px ${card.color}`
                  : 'none'
              }}
            >
              {isSel && (
                <span
                  className="absolute left-0 right-0 top-0 h-[3px]"
                  style={{ background: card.color }}
                />
              )}

              <div className="flex justify-between items-center mb-auto">
                <span className="text-[11px] tracking-[0.18em] uppercase text-muted">
                  Дело №{card.no}
                </span>
                <span
                  className="w-12 h-12 rounded-xl grid place-items-center border border-line"
                  style={{ background: 'rgba(255,255,255,.04)' }}
                >
                  <i
                    className={`fa-solid ${card.icon} text-lg`}
                    style={{ color: card.color }}
                  />
                </span>
              </div>

              <h3 className="font-serif text-[26px] leading-tight text-text font-semibold m-0 mt-8 mb-2">
                {card.title}
              </h3>
              <p className="text-[13.5px] leading-snug text-[#b9a898] m-0 mb-4">
                {card.description}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-[#cdbca8] border border-line">
                  {card.tag}
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-[#cdbca8] border border-line">
                  4 раунда
                </span>
              </div>

              {isSel && (
                <span
                  className="absolute right-4 bottom-4 w-6 h-6 rounded-full grid place-items-center"
                  style={{ background: card.color }}
                >
                  <i className="fa-solid fa-check text-[#140c09] text-[11px]" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center gap-5 flex-wrap pt-6 border-t border-line mb-10">
        <p className="text-[14px] leading-snug text-muted max-w-[460px] m-0">
          Обсуждайте улики вместе. Когда будете уверены — выдвигайте обвинение.
          Ошибётесь, и убийца уйдёт безнаказанным.
        </p>
        <button
          onClick={createSession}
          disabled={busy || scens.length === 0}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
        >
          {busy ? 'Создание…' : 'Открыть дело'}
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>

      <div>
        <h3 className="font-serif text-[26px] text-text mb-4">Мои сессии</h3>
        {sessions.length === 0 ? (
          <div className="text-muted text-sm p-6 border border-dashed border-line rounded-xl text-center">
            Пока пусто. Создайте первую игру выше.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                    Код
                  </th>
                  <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                    Дело
                  </th>
                  <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                    Дата
                  </th>
                  <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                    Статус
                  </th>
                  <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => {
                  const meta = SCENARIO_META[s.scenario] || RANDOM_META;
                  const scenTitle =
                    scens.find(x => x.id === s.scenario)?.title || s.scenario;
                  const statusLabel: Record<string, string> = {
                    lobby: 'Лобби',
                    playing: 'Игра идёт',
                    finished: 'Завершена'
                  };
                  return (
                    <tr key={s.id} className="border-b border-line last:border-0">
                      <td className="py-3.5 px-2 font-mono text-text font-medium tracking-widest">
                        {s.code}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className="inline-flex items-center gap-2 text-text">
                          <i
                            className={`fa-solid ${meta.icon}`}
                            style={{ color: meta.color }}
                          />
                          {scenTitle}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-muted text-xs">
                        {new Date(s.createdAt).toLocaleString('ru-RU')}
                      </td>
                      <td className="py-3.5 px-2">
                        <span
                          className={
                            'text-xs font-semibold ' +
                            (s.status === 'finished'
                              ? 'text-muted'
                              : s.status === 'playing'
                              ? 'text-accent'
                              : 'text-text')
                          }
                        >
                          {statusLabel[s.status] || s.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <Link
                          to={`/screen/${s.code}`}
                          className="text-accent hover:opacity-80 text-sm"
                        >
                          Открыть →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}