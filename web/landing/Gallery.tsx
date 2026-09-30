import { PHOTOS } from './data';

type Props = {
  onOpen: (index: number) => void;
};

export default function Gallery({ onOpen }: Props) {
  return (
    <section id="l-gallery" className="pt-28 md:pt-32 scroll-mt-16">
      <div className="flex justify-between items-end gap-8 mb-12 flex-wrap">
        <div>
          <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
            Фото с мероприятий
          </span>
          <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
            Как это <em className="text-lnd-amber font-medium">было</em>
          </h2>
        </div>
        <p className="max-w-[380px] text-lnd-muted text-[15px] leading-relaxed">
          Настоящие вечера в ресторанах-партнёрах. Нажмите на фото, чтобы рассмотреть.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 auto-rows-[160px] md:auto-rows-[230px] grid-flow-dense">
        {PHOTOS.map((p, i) => (
          <button
            key={i}
            onClick={() => onOpen(i)}
            className={
              'relative rounded-2xl overflow-hidden text-left group ' +
              (p.cls === 'w2 h2'
                ? 'col-span-2 row-span-2'
                : p.cls === 'w2'
                ? 'col-span-2'
                : p.cls === 'h2'
                ? 'row-span-2'
                : '')
            }
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url('${p.src}')`,
                filter: 'sepia(.25) saturate(.85) contrast(1.05)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,6,5,.85)] via-transparent to-transparent" />
            <div className="absolute left-4 right-4 bottom-3.5 z-10">
              <b className="block font-serif text-[20px] md:text-[22px] text-lnd-cream leading-tight font-semibold">
                {p.t}
              </b>
              <span className="text-[12px] text-lnd-text/85">{p.m}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}