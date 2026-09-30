import { REVIEWS } from './data';

export default function Reviews() {
  return (
    <section id="l-reviews" className="pt-28 md:pt-32 scroll-mt-16">
      <div className="mb-12">
        <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
          Отзывы
        </span>
        <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
          Что говорят <em className="text-lnd-amber font-medium">сыщики</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((r, i) => (
          <div
            key={i}
            className="p-8 rounded-[18px] border border-lnd-line bg-[rgba(30,19,15,.6)] flex flex-col"
          >
            <div className="flex gap-1">
              {Array.from({ length: r.stars }).map((_, k) => (
                <i key={k} className="fa-solid fa-star text-lnd-amber text-[12px]" />
              ))}
            </div>
            <p className="font-serif text-[22px] leading-snug text-lnd-cream my-5 flex-1">
              «{r.text}»
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-[42px] h-[42px] rounded-full grid place-items-center font-serif text-[17px] font-bold text-[#1a0f0a]"
                style={{
                  background: 'linear-gradient(140deg, #f2a541, #f3e6cf)'
                }}
              >
                {r.initials}
              </div>
              <div>
                <b className="block text-[14px] text-lnd-cream">{r.name}</b>
                <span className="text-[12.5px] text-lnd-muted">{r.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}