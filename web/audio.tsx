import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

type AudioCtx = {
  playUrl: (url: string) => void;
  playQueue: (urls: string[]) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  toggle: (url: string) => void;
  playingUrl: string | null;
  isPlaying: boolean;
};

const AudioContext = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const queueRef = useRef<string[]>([]);
  const queueActiveRef = useRef(false);

  useEffect(() => {
    const a = new Audio();
    a.preload = 'auto';
    audioRef.current = a;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      if (queueActiveRef.current) {
        const next = queueRef.current.shift();
        if (next) {
          a.src = next;
          setPlayingUrl(next);
          a.play().catch(() => {});
          return;
        }
      }
      queueActiveRef.current = false;
      setPlayingUrl(null);
    };

    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);

    return () => {
      a.pause();
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, []);

  const playUrl = useCallback((url: string) => {
    const a = audioRef.current;
    if (!a) return;
    queueActiveRef.current = false;
    queueRef.current = [];
    if (a.src && a.src.endsWith(url) && !a.paused) return;
    a.pause();
    a.currentTime = 0;
    a.src = url;
    setPlayingUrl(url);
    a.play().catch(err => console.warn('[audio] play failed:', err));
  }, []);

  const playQueue = useCallback((urls: string[]) => {
    const a = audioRef.current;
    if (!a || urls.length === 0) return;
    queueActiveRef.current = true;
    queueRef.current = [...urls];
    const first = queueRef.current.shift();
    if (!first) return;
    a.pause();
    a.currentTime = 0;
    a.src = first;
    setPlayingUrl(first);
    a.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    queueActiveRef.current = false;
    queueRef.current = [];
    a.pause();
    a.currentTime = 0;
    setPlayingUrl(null);
  }, []);

  const pause = useCallback(() => audioRef.current?.pause(), []);
  const resume = useCallback(() => audioRef.current?.play().catch(() => {}), []);

  const toggle = useCallback(
    (url: string) => {
      const a = audioRef.current;
      if (!a) return;
      if (playingUrl === url && !a.paused) {
        pause();
      } else if (playingUrl === url && a.paused) {
        resume();
      } else {
        playUrl(url);
      }
    },
    [playingUrl, pause, resume, playUrl]
  );

  return (
    <AudioContext.Provider
      value={{ playUrl, playQueue, stop, pause, resume, toggle, playingUrl, isPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used inside AudioProvider');
  return ctx;
}

export function useAudioButton(url?: string) {
  const audio = useAudio();
  const isThis = !!url && audio.playingUrl === url && audio.isPlaying;
  return {
    playing: isThis,
    play: () => url && audio.playUrl(url),
    pause: () => audio.pause(),
    stop: () => audio.stop(),
    toggle: () => url && audio.toggle(url)
  };
}