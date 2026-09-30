import { SITE_NAME } from './data';

type Props = {
  onCabinet: () => void;
  onGo: (id: string) => void;
  onTop: () => void;
};

export default function Nav({ onCabinet, onGo, onTop }: Props) {
  const links = [
    { id: 'l-how', label: 'Как играть' },
    { id: 'l-gallery', label: 'Фото' },
    { id: 'l-video', label: 'Видео' },
    { id: 'l-reviews', label: 'Отзывы' },
    { id: 'l-biz', label: 'Ресторанам' }
  ];

  return (
    <nav className="sticky top-0 z-20 bg-lnd-ink/80 backdrop-blur-md border-b border-lnd-line">
      <div className="max-w-[1160px] mx-auto px-6 md:px-8 py-3 flex items-center gap-8">
        <button
          onClick={onTop}
          className="flex items-center gap-2.5 font-serif text-2xl font-bold text-lnd-cream"
        >
          <i className="fa-solid fa-magnifying-glass text-lnd-amber text-base" />
          Тайна<span className="text-lnd-red">.</span>за столом
        </button>

        <div className="hidden lg:flex gap-7 ml-auto">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => onGo(l.id)}
              className="text-lnd-text/80 hover:text-lnd-cream text-sm font-medium transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={onCabinet}
          className="ml-auto lg:ml-0 px-4 py-2.5 rounded-[10px] bg-lnd-amber text-[#1a0f0a] font-bold text-sm flex items-center gap-2 hover:bg-[#ffb85a] transition"
        >
          <i className="fa-solid fa-user" />
          <span>Личный кабинет</span>
        </button>
      </div>
    </nav>
  );
}