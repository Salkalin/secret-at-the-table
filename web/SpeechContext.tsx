import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type SpeechContextType = {
  speak: (text: string) => void;
  stop: () => void;
  speaking: boolean;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  supported: boolean;
};

const SpeechContext = createContext<SpeechContextType | null>(null);

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [speaking, setSpeaking] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!supported) return;
    try {
      window.speechSynthesis.cancel();
    } catch {}
    utterRef.current = null;
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported) return;
      try {
        window.speechSynthesis.cancel();
      } catch {}

      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ru-RU';
      u.rate = 0.95;
      u.pitch = 1;

      const voices = window.speechSynthesis.getVoices();
      const ru = voices.find(v => v.lang.startsWith('ru'));
      if (ru) u.voice = ru;

      u.onend = () => {
        if (utterRef.current === u) setSpeaking(false);
      };
      u.onerror = () => {
        if (utterRef.current === u) setSpeaking(false);
      };

      utterRef.current = u;
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [supported]
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
