import { useEffect, useRef, useState } from 'react';
import { HERO } from './data';

type Props = {
  onCabinet: () => void;
  onReel: () => void;
};

function StatNumber({
  to,
  suf,
  fixed
}: {
  to: number;
  suf?: string;
  fixed?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          const t0 = performance.now();
          const step = (now: number) => {
            const k = Math.min(1, (now - t0) / 1600);
            const v = to * (1 - Math.pow(1 - k, 3));
            setVal(v);
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  const display = fixed
    ? val.toFixed(fixed)
    : Math.round(val).toLocaleString('ru-RU');

  return (
    <div ref={ref}>
      <b className="block font-serif text-4xl md:text-5xl leading-none text-lnd-cream font-semibold">
        {display}
        {suf || ''}
      </b>
    </div>
  );
}

export default function Hero({ onCabinet, onReel }: Props) {
  return (
    <div className="min-h-[calc(100vh-68px)] flex flex-col justify-center py-16 md:py-24">
      <div className="inline-flex items-center gap-2.5 text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold">
        <i className="fa-solid fa-utensils" />
        {HERO.eyebrow}
      </div>

      <h1 className="font-serif font-semibold text-[clamp(54px,8.4vw,118px)] leading-[0.9] my-6 text-lnd-cream tracking-tight">
        {HERO.titleLine1}
        <span className="text-lnd-red">.</span>
        <br />
        <em className="italic text-lnd-amber font-medium">{HERO.titleLine2}</em>
        <br />
        {HERO.titleLine3}
      </h1>

      <p className="max-w-[540px] text-[17px] leading-relaxed text-lnd-text/85">
        {HERO.lead}
      </p>

      <div className="flex gap-3 mt-10 flex-wrap">
        <button
          onClick={onCabinet}
          className="px-7 py-4 rounded-xl bg-lnd-amber text-[#1a0f0a] font-bold text-[15px] inline-flex items-center gap-3 hover:-translate-y-0.5 hover:bg-[#ffb85a] transition shadow-[0_10px_40px_-12px_rgba(242,165,65,0.7)]"
        >
          <i className="fa-solid fa-magnifying-glass" />
          {HERO.ctaPrimary}
        </button>
        <button
          onClick={onReel}
          className="px-7 py-4 rounded-xl bg-white/5 border border-lnd-line text-lnd-text font-bold text-[15px] inline-flex items-center gap-3 hover:bg-white/10 transition"
        >
          <i className="fa-solid fa-play" />
          {HERO.ctaSecondary}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-16 pt-8 border-t border-lnd-line max-w-[760px]">
        {HERO.stats.map((s, i) => (
          <div key={i}>
            <StatNumber
              to={s.to}
              suf={(s as any).suf}
              fixed={(s as any).fixed}
            />
            <span className="block mt-2 text-[13px] text-lnd-muted">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}