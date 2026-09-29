import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type SpeechOptions = {
  rate?: number;
  pitch?: number;
  voice?: string;
};

type SpeechContextType = {
  speak: (text: string, opts?: SpeechOptions) => void;
  stop: () => void;
  speaking: boolean;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  supported: boolean;
};

const SpeechContext = createContext<SpeechContextType | null>(null);

function pickVoice(voices: SpeechSynthesisVoice[], hint?: string): SpeechSynthesisVoice | null {
  const ru = voices.filter(v => v.lang.startsWith('ru'));

  if (hint) {
    const byHint = ru.find(v => v.name.toLowerCase().includes(hint.toLowerCase()));
    if (byHint) return byHint;
  }

  return (
    ru.find(v => v.name.includes('Google')) ||
    ru.find(v => v.name.includes('Dmitry')) ||
    ru.find(v => v.name.includes('Svetlana')) ||
    ru.find(v => v.name.includes('Pavel')) ||
    ru.find(v => v.name.includes('Irina')) ||
    ru[0] ||
    null
  );
}

function splitIntoChunks(text: string): string[] {
  // Разбиваем по предложениям — точка, восклицание, вопрос, многоточие.
  const parts = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?…])\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  // Если одно предложение слишком длинное (>200 символов), режем по запятым.
  const result: string[] = [];
  for (const p of parts) {
    if (p.length <= 200) {
      result.push(p);
    } else {
      const sub = p.split(/,\s*/).map(s => s.trim()).filter(Boolean);
      let buf = '';
      for (const s of sub) {
        if ((buf + ', ' + s).length > 200 && buf) {
          result.push(buf);
          buf = s;
        } else {
          buf = buf ? buf + ', ' + s : s;
        }
      }
      if (buf) result.push(buf);
    }
  }
  return result;
}

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [speaking, setSpeaking] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const tokenRef = useRef(0);

  const stop = useCallback(() => {
    if (!supported) return;
    tokenRef.current++;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    utterRef.current = null;
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string, opts?: SpeechOptions) => {
      if (!supported || !text) return;

      stop();
      const myToken = tokenRef.current;

      const chunks = splitIntoChunks(text);
      if (chunks.length === 0) return;

      const rate = opts?.rate ?? 0.95;
      const pitch = opts?.pitch ?? 0.95;
      const hint = opts?.voice;

      setSpeaking(true);

      const speakChunk = (idx: number) => {
        if (tokenRef.current !== myToken) return;
        if (idx >= chunks.length) {
          setSpeaking(false);
          return;
        }

        const u = new SpeechSynthesisUtterance(chunks[idx]);
        u.lang = 'ru-RU';
        u.rate = rate;
        u.pitch = pitch;

        const voices = window.speechSynthesis.getVoices();
        const v = pickVoice(voices, hint);
        if (v) u.voice = v;

        u.onend = () => {
          if (tokenRef.current !== myToken) return;
          // небольшая пауза между предложениями
          setTimeout(() => speakChunk(idx + 1), 180);
        };
        u.onerror = () => {
          if (tokenRef.current !== myToken) return;
          setSpeaking(false);
        };

        utterRef.current = u;
        window.speechSynthesis.speak(u);
      };

      // Первую фразу — с небольшой задержкой, чтобы голос «прогрелся»
      setTimeout(() => speakChunk(0), 60);
    },
    [supported, stop]
  );

  useEffect(() => {
    return () => {
      if (supported) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }
    };
  }, [supported]);

  return (
    <SpeechContext.Provider
      value={{ speak, stop, speaking, enabled, setEnabled, supported }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeech() {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error('useSpeech must be used within SpeechProvider');
  return ctx;
}