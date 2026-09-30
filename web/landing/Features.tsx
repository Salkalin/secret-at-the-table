import { FEATURES } from './data';

export default function Features() {
  return (
    <section className="pt-28 md:pt-32">
      <div className="mb-12">
        <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
          Почему это круто
        </span>
        <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
          Не квиз. Не мафия. <em className="text-lnd-amber font-medium">Настоящее дело.</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-lnd-line">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="p-8 border-r border-b border-lnd-line hover:bg-lnd-amber/[.04] transition"
          >
            <i className={`fa-solid ${f.icon} text-lnd-amber text-[22px]`} />
            <h4 className="mt-5 mb-2.5 font-serif text-[26px] text-lnd-cream font-semibold">
              {f.title}
            </h4>
            <p className="m-0 text-[14px] leading-relaxed text-[#b9a898]">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}