import { useEffect, useState } from 'react';
import ThreeScene from './ThreeScene';
import LoginModal from './LoginModal';

type ScenarioCard = {
  id: string;
  no: string;
  title: string;
  icon: string;
  color: string;
  tag: string;
  description: string;
};

const META: Record<string, { icon: string; color: string; tag: string; no: string }> = {
  dinner: { icon: 'fa-utensils', color: '#e0603a', tag: 'Отравление', no: '017' },
  manor: { icon: 'fa-chess-rook', color: '#3fb39c', tag: 'Запертая комната', no: '042' },
  theatre: { icon: 'fa-masks-theater', color: '#e3b04b', tag: 'Премьера', no: '088' }
};

const RANDOM_META = {
  icon: 'fa-dice',
  color: '#f2a541',
  tag: 'Сюрприз',
  no: '???'
};

export default function Landing() {
  const [cards, setCards] = useState<ScenarioCard[]>([]);
  const [selected, setSelected] = useState<string>('random');
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    fetch('/api/scenarios')
      .then(r => r.json())
      .then((data: any[]) => {
        const mapped: ScenarioCard[] = data.map(s => {
          const meta = META[s.id] || {
            icon: s.icon || 'fa-folder',
            color: '#c0563a',
            tag: 'Дело',
            no: '000'
          };
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
        setCards(mapped);
      })
      .catch(() => {});
  }, []);

  const allCards = [
    {
      id: 'random',
      no: RANDOM_META.no,
      title: 'Случайное дело',
      icon: RANDOM_META.icon,
      color: RANDOM_META.color,
      tag: RANDOM_META.tag,
      description: 'Пусть решит жребий следствия. Вы узнаете дело, когда откроете папку.'
    },
    ...cards
  ];

  const openCase = () => setLoginOpen(true);

  return (
    <div className="relative bg-lnd-ink text-lnd-text font-sans min-h-screen">
      <ThreeScene />

      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_70%_35%,transparent_0%,rgba(8,4,3,.2)_50%,rgba(8,4,3,.75)_100%)]" />

      <div className="relative z-[2] h-screen overflow-y-auto overflow-x-hidden">
        <div className="max-w-[1160px] mx-auto px-6 md:px-8 pb-20">
          {/* HERO */}
          <div className="flex flex-col justify-start pt-12 md:pt-16 pb-8 md:pb-12">
            <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold">
              <i className="fa-solid fa-magnifying-glass" />
              Интерактивный детектив для компании
            </div>

            <h1 className="font-serif font-semibold text-[clamp(64px,10vw,132px)] leading-[0.9] my-6 text-lnd-cream tracking-tight">
              Тайна
              <span className="text-lnd-red">.</span>
              <br />
              <em className="italic text-lnd-amber font-medium">за столом</em>
            </h1>

            <p className="max-w-[520px] text-[17px] leading-relaxed text-[#cdbca8]">
              Погасите верхний свет. Читайте главы вслух, вскрывайте улики раунд за раундом,
              изучайте досье подозреваемых — и назовите имя убийцы. Обвинение только одно.
            </p>

            <div className="flex gap-9 mt-8 flex-wrap">
              <div>
                <b className="block font-serif text-4xl md:text-5xl leading-none text-lnd-cream font-semibold">4</b>
                <span className="block mt-2 text-[13px] text-lnd-muted">главы дела</span>
              </div>
              <div>
                <b className="block font-serif text-4xl md:text-5xl leading-none text-lnd-cream font-semibold">9</b>
                <span className="block mt-2 text-[13px] text-lnd-muted">улик</span>
              </div>
              <div>
                <b className="block font-serif text-4xl md:text-5xl leading-none text-lnd-cream font-semibold">5</b>
                <span className="block mt-2 text-[13px] text-lnd-muted">подозреваемых</span>
              </div>
              <div>
                <b className="block font-serif text-4xl md:text-5xl leading-none text-lnd-cream font-semibold">1</b>
                <span className="block mt-2 text-[13px] text-lnd-muted">обвинение</span>
              </div>
            </div>
          </div>

          {/* CASES */}
          <section id="l-cases" className="pt-8 md:pt-16 scroll-mt-20">
            <div className="flex justify-between items-end gap-8 mb-8 flex-wrap">
              <h2 className="font-serif text-[clamp(36px,4vw,48px)] leading-none font-semibold text-lnd-cream">
                Выберите дело
              </h2>
              <p className="max-w-[400px] text-lnd-muted text-[14px] leading-relaxed m-0">
                Каждое дело — отдельная история с развязкой
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
                        <i className={`fa-solid ${card.icon} text-lg`} style={{ color: card.color }} />
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

            <div className="mt-12 pt-8 border-t border-lnd-line flex justify-between items-center gap-6 flex-wrap">
              <p className="m-0 max-w-[460px] text-lnd-muted text-[14px] leading-relaxed">
                Обсуждайте улики вместе. Когда будете уверены — выдвигайте обвинение.
                Ошибётесь, и убийца уйдёт безнаказанным.
              </p>
              <button
                onClick={openCase}
                className="px-7 py-4 rounded-xl bg-lnd-amber text-[#1a0f0a] font-bold text-[15px] inline-flex items-center gap-3 hover:-translate-y-0.5 hover:bg-[#ffb85a] transition shadow-[0_10px_40px_-12px_rgba(242,165,65,0.7)]"
              >
                Открыть дело <i className="fa-solid fa-arrow-right" />
              </button>
            </div>
          </section>
        </div>
      </div>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        preferredCase={selected !== 'random' ? selected : undefined}
      />
    </div>
  );
}