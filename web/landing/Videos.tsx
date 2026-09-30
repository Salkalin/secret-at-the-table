import { PHOTOS, VIDEOS } from './data';

type Props = {
  onOpen: (videoIndex: number) => void;
};

export default function Videos({ onOpen }: Props) {
  const [main, ...side] = VIDEOS;

  const Card = ({
    video,
    index,
    big
  }: {
    video: (typeof VIDEOS)[number];
    index: number;
    big?: boolean;
  }) => (
    <button
      onClick={() => onOpen(index)}
      className={
        'relative rounded-2xl overflow-hidden text-left group ' +
        (big ? 'min-h-[340px] md:min-h-[474px]' : 'min-h-[220px]')
      }
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url('${PHOTOS[video.poster].src}')`,
          filter: 'sepia(.25) saturate(.85) contrast(1.05)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,6,5,.85)] via-transparent to-transparent" />
      <span className="absolute left-4 top-4 z-10 text-[11px] tracking-[.14em] uppercase text-lnd-cream bg-[rgba(13,8,7,.6)] px-2.5 py-1.5 rounded-full">
        <i className="fa-solid fa-video text-lnd-amber mr-1.5" />
        {big ? 'Трейлер' : 'Репортаж'}
      </span>
      <div
        className={
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-lnd-amber grid place-items-center transition-transform group-hover:scale-110 ' +
          (big ? 'w-[92px] h-[92px]' : 'w-[72px] h-[72px]')
        }
      >
        <i
          className={
            'fa-solid fa-play text-[#1a0f0a] ' +
            (big ? 'text-2xl ml-1' : 'text-xl ml-1')
          }
        />
      </div>
      <div className="absolute left-4 right-4 bottom-4 z-10">
        <b className="block font-serif text-[22px] text-lnd-cream leading-tight font-semibold">
          {video.t}
        </b>
        <span className="text-[12px] text-lnd-text/85">{video.m}</span>
      </div>
    </button>
  );

  return (
    <section id="l-video" className="pt-28 md:pt-32 scroll-mt-16">
      <div className="flex justify-between items-end gap-8 mb-12 flex-wrap">
        <div>
          <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
            Видео
          </span>
          <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
            Посмотрите на <em className="text-lnd-amber font-medium">вечер изнутри</em>
          </h2>
        </div>
        <p className="max-w-[380px] text-lnd-muted text-[15px] leading-relaxed">
          Трейлер сезона и репортажи с наших игр.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-3.5">
        <Card video={main} index={0} big />
        <div className="grid gap-3.5">
          {side.map((v, i) => (
            <Card key={i} video={v} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}