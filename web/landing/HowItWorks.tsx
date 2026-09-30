import { STEPS } from './data';

export default function HowItWorks() {
  return (
    <section id="l-how" className="pt-28 md:pt-32 scroll-mt-16">
      <div className="flex justify-between items-end gap-8 mb-12 flex-wrap">
        <div>
          <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
            Как это работает
          </span>
          <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
            Вечер, который <em className="text-lnd-amber font-medium">обсуждают неделями</em>
          </h2>
        </div>
        <p className="max-w-[380px] text-lnd-muted text-[15px] leading-relaxed">
          Никаких актёров и сложной подготовки. Нужны только стол, компания и телефон ведущего.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map(s => (
          <div
            key={s.n}
            className="p-7 rounded-[18px] border border-lnd-line bg-[rgba(30,19,15,.6)] hover:border-lnd-amber/40 hover:-translate-y-1 transition"
          >
            <div className="font-serif italic text-5xl leading-none text-lnd-amber font-medium">
              {s.n}
            </div>
            <h4 className="mt-6 mb-2.5 text-[17px] text-lnd-cream font-bold">{s.title}</h4>
            <p className="m-0 text-[14px] leading-relaxed text-[#b9a898]">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}