import { PLACES } from './data';

export default function Marquee() {
  const items = [...PLACES, ...PLACES];

  return (
    <div className="border-y border-lnd-line overflow-hidden py-5 bg-lnd-ink/60">
      <div
        className="flex gap-14 w-max"
        style={{ animation: 'mq 40s linear infinite' }}
      >
        {items.map((p, i) => (
          <span
            key={i}
            className="font-serif italic text-[26px] text-[#8f7d70] whitespace-nowrap flex items-center gap-14"
          >
            {p}
            <i className="fa-solid fa-diamond text-lnd-amber text-[10px] not-italic" />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes mq {
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}