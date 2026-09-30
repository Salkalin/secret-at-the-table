import { useEffect, useRef, useState } from 'react';
import { NUMBERS, NumberItem } from './data';

function NumItem({ item }: { item: NumberItem }) {
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
            const v = item.to * (1 - Math.pow(1 - k, 3));
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
  }, [item.to]);

  return (
    <div
      ref={ref}
      className={
        'p-8 rounded-[18px] ' +
        (item.dark
          ? 'bg-[rgba(30,19,15,.8)] border border-lnd-line'
          : 'bg-[#f1e4cb] text-[#2a1c14]')
      }
    >
      <b
        className={
          'block font-serif text-[clamp(46px,5vw,68px)] leading-none font-bold tabular-nums ' +
          (item.dark ? 'text-lnd-amber' : 'text-[#1d120c]')
        }
      >
        {Math.round(val).toLocaleString('ru-RU')}
        {item.suf || ''}
      </b>
      <span
        className={
          'block mt-3 text-[14px] leading-snug ' +
          (item.dark ? 'text-lnd-muted' : 'text-[#6b5140]')
        }
      >
        {item.label}
      </span>
    </div>
  );
}

export default function Numbers() {
  return (
    <section className="pt-28 md:pt-32">
      <div className="flex justify-between items-end gap-8 mb-12 flex-wrap">
        <div>
          <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
            В цифрах
          </span>
          <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
            Нас уже <em className="text-lnd-amber font-medium">расследуют</em> по всей стране
          </h2>
        </div>
        <p className="max-w-[380px] text-lnd-muted text-[15px] leading-relaxed">
          С 2022 года мы провели тысячи вечеров — от камерных ужинов до корпоративов на целый
          ресторан.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {NUMBERS.map((n, i) => (
          <NumItem key={i} item={n} />
        ))}
      </div>
    </section>
  );
}