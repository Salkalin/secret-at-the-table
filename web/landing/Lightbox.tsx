import { useEffect } from 'react';
import { PHOTOS, VIDEOS } from './data';

export type LightboxState = {
  mode: 'photo' | 'video' | 'reel';
  listIndex: number;
  videoIndex: number;
  title: string;
};

type Props = {
  state: LightboxState | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ state, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state, onClose, onNext, onPrev]);

  if (!state) return null;

  const isPhoto = state.mode === 'photo';
  const photo = isPhoto
    ? PHOTOS[state.listIndex]
    : PHOTOS[VIDEOS[state.videoIndex].poster];

  return (
    <div
      className="fixed inset-0 z-30 bg-[rgba(8,4,3,.85)] grid place-items-center p-6"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[1040px]">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#140c09]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${photo.src}')`,
              filter: 'sepia(.2) saturate(.9)'
            }}
          />
          {!isPhoto && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-20 h-20 rounded-full bg-lnd-amber grid place-items-center">
                <i className="fa-solid fa-play text-[#1a0f0a] text-2xl ml-1" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center gap-4 mt-5 flex-wrap">
          <div>
            <b className="block font-serif text-[28px] text-lnd-cream font-semibold">
              {isPhoto ? photo.t : state.title}
            </b>
            <span className="text-[13px] text-lnd-muted">
              {isPhoto ? photo.m : `${photo.t} · ${photo.m}`}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              className="w-10 h-10 rounded-xl border border-lnd-line bg-white/5 grid place-items-center text-lnd-text hover:bg-white/10 transition"
            >
              <i className="fa-solid fa-arrow-left text-sm" />
            </button>
            <button
              onClick={onNext}
              className="w-10 h-10 rounded-xl border border-lnd-line bg-white/5 grid place-items-center text-lnd-text hover:bg-white/10 transition"
            >
              <i className="fa-solid fa-arrow-right text-sm" />
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl border border-lnd-line bg-white/5 grid place-items-center text-lnd-text hover:bg-white/10 transition"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}