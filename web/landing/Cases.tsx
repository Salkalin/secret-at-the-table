import { useEffect, useState } from 'react';

type ScenarioCard = {
  id: string;
  no: string;
  title: string;
  icon: string;
  color: string;
  tag: string;
  description: string;
};

const RANDOM_CARD: ScenarioCard = {
  id: 'random',
  no: '???',
  title: 'Случайное дело',
  icon: 'fa-dice',
  color: '#f2a541',
  tag: 'Сюрприз',
  description: 'Пусть решит жребий следствия. Вы узнаете дело, когда откроете папку.'
};

const META: Record<string, { icon: string; color: string; tag: string; no: string }> = {
  dinner: { icon: 'fa-utensils', color: '#e0603a', tag: 'Отравление', no: '017' },
  manor: { icon: 'fa-chess-rook', color: '#3fb39c', tag: 'Запертая комната', no: '042' },
  theatre: { icon: 'fa-masks-theater', color: '#d2663f', tag: 'Премьера', no: '003' }
};

export default function Cases({ onLogin }: { onLogin: () => void }) {
  const [scenarios, setScenarios] = useState<ScenarioCard[]>([]);
  const [selected, setSelected] = useState<string>('random');

  useEffect(() => {
    fetch('/api/scenarios')
      .then(r => r.json())
      .then((data: any[]) => {
        const cards: ScenarioCard[] = data.map(s => {
          const meta = META[s.id] || { icon: s.icon || 'fa-folder', color: '#c0563a', tag: 'Дело', no: '000' };
          return {
            id: s.id,
            no: meta.no,
            title: s.title,
            icon: meta.icon,
            color: meta.color,
            tag: meta.tag,
            description: s.description
          };
        });
        setScenarios(cards);
      })
      .catch(() => {});
  }, []);

  const allCards = [RANDOM_CARD, ...scenarios];

  function handleClick() {
    // См. props ниже
  }

  return (
    <section id="l-cases" className="pt-24 md:pt-32 scroll-mt-16">
      <div className="flex justify-between items-end gap-8 mb-12 flex-wrap">
        <div>
          <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
            Выберите дело
          </span>
          <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
            Каждое дело — <em className="text-lnd-amber font-medium">отдельная история</em>
          </h2>
        </div>
        <p className="max-w-[380px] text-lnd-muted text-[15px] leading-relaxed">
          Чтобы открыть дело, войдите в личный кабинет. Ведущий запустит игру, а гости
          подключатся по QR-коду.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {allCards.map(card => {
          const isSel = selected === card.id;
          return (
            <button
              key={card.id}
              onClick={() => setSelected(card.id)}
              className={
                'relative text-left rounded-[18px] p-6 min-h-[260px] flex flex-col transition overflow-hidden border ' +
                (isSel ? 'border-transparent' : 'border-lnd-line hover:-translate-y-1')
              }
              style={{
                background: isSel
                  ? `linear-gradient(180deg, ${card.color}22, rgba(16,10,8,.94))`
                  : 'linear-gradient(180deg, rgba(30,19,15,.9), rgba(16,10,8,.92))',
                boxShadow: isSel ? `0 18px 50px -20px ${card.color}` : 'none'
              }}
            >
              {isSel && (
                <span
                  className="absolute left-0 right-0 top-0 h-[3px]"
                  style={{ background: card.color }}
                />
              )}

              <div className="flex justify-between items-center mb-auto">
                <span className="text-[11px] tracking-[.18em] uppercase text-lnd-muted">
                  Дело №{card.no}
                </span>
                <span
                  className="w-12 h-12 rounded-xl grid place-items-center border border-lnd-line"
                  style={{ background: 'rgba(255,255,255,.04)' }}
                >
                  <i
                    className={`fa-solid ${card.icon} text-lg`}
                    style={{ color: card.color }}
                  />
                </span>
              </div>

              <h3 className="font-serif text-[26px] leading-tight text-lnd-cream font-semibold m-0 mt-8 mb-2">
                {card.title}
              </h3>
              <p className="text-[13.5px] leading-snug text-[#b9a898] m-0 mb-4">
                {card.description}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-[#cdbca8] border border-lnd-line">
                  {card.tag}
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-[#cdbca8] border border-lnd-line">
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

      <div className="mt-12 flex justify-center">
        <button
          onClick={onLogin}
          className="px-8 py-4 rounded-xl bg-lnd-amber text-[#1a0f0a] font-bold text-[15px] inline-flex items-center gap-3 hover:-translate-y-0.5 hover:bg-[#ffb85a] transition shadow-[0_10px_40px_-12px_rgba(242,165,65,0.7)]"
        >
          <i className="fa-solid fa-magnifying-glass" />
          Открыть дело
        </button>
      </div>
    </section>
  );
}