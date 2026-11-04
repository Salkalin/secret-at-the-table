import { useEffect, useState } from 'react';

export function useIsDesktop(minWidth = 900): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= minWidth;
  });

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= minWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [minWidth]);

  return isDesktop;
}

export function useLightning(opts?: { minMs?: number; maxMs?: number; intensity?: number }): number {
  const minMs = opts?.minMs ?? 7000;
  const maxMs = opts?.maxMs ?? 16000;
  const maxI = opts?.intensity ?? 0.35;
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      if (cancelled) return;
      const delay = minMs + Math.random() * (maxMs - minMs);
      const t = setTimeout(() => {
        if (cancelled) return;
        setFlash(maxI);
        setTimeout(() => !cancelled && setFlash(0), 120);
        setTimeout(() => !cancelled && setFlash(maxI * 0.6), 200);
        setTimeout(() => !cancelled && setFlash(0), 350);
        schedule();
      }, delay);
      return t;
    };
    const timer = schedule();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [minMs, maxMs, maxI]);

  return flash;
}