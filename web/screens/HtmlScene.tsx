import { useEffect, useRef } from 'react';

/**
 * Рантайм анимаций фоновой сцены: всё, что запускают эффекты (rAF, таймеры,
 * слушатели), регистрируется здесь и гарантированно снимается при смене сцены.
 */
export type SceneRuntime = {
  raf: (cb: FrameRequestCallback) => void;
  timeout: (cb: () => void, ms: number) => void;
  interval: (cb: () => void, ms: number) => void;
  on: (type: string, cb: (e: any) => void) => void;
  /** элемент внутри сцены по id */
  $: <T extends Element = any>(id: string) => T;
};

export type SceneEffect = (rt: SceneRuntime, root: HTMLElement) => void;

function createRuntime(root: HTMLElement) {
  let alive = true;
  let rafId = 0;
  const rafs = new Set<FrameRequestCallback>();
  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  const listeners: Array<[string, (e: any) => void]> = [];

  const loop = (t: number) => {
    if (!alive) return;
    const batch = Array.from(rafs);
    rafs.clear();
    batch.forEach(cb => cb(t));
    if (rafs.size) rafId = requestAnimationFrame(loop);
    else rafId = 0;
  };

  const rt: SceneRuntime = {
    raf: cb => {
      if (!alive) return;
      rafs.add(cb);
      if (!rafId) rafId = requestAnimationFrame(loop);
    },
    timeout: (cb, ms) => {
      if (!alive) return;
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (alive) cb();
      }, ms);
      timeouts.add(id);
    },
    interval: (cb, ms) => {
      if (!alive) return;
      intervals.add(window.setInterval(() => alive && cb(), ms));
    },
    on: (type, cb) => {
      window.addEventListener(type, cb);
      listeners.push([type, cb]);
    },
    $: id => root.querySelector('#' + id) as any
  };

  const dispose = () => {
    alive = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafs.clear();
    timeouts.forEach(id => clearTimeout(id));
    intervals.forEach(id => clearInterval(id));
    listeners.forEach(([t, cb]) => window.removeEventListener(t, cb));
  };

  return { rt, dispose };
}

/**
 * Полноэкранный фон сюжета: статичная разметка (html) + анимации (effect).
 * Разметка берётся из html-sources.ts сюжета, стили в ней ограничены корневым классом сцены.
 */
export function HtmlScene({ html, effect }: { html: string; effect?: SceneEffect }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.innerHTML = html;
    if (!effect) return;
    const { rt, dispose } = createRuntime(root);
    effect(rt, root);
    return dispose;
  }, [html, effect]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: -10,
        overflow: 'hidden'
      }}
    />
  );
}
