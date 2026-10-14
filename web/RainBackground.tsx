import { useEffect, useRef } from 'react';

export default function RainBackground({ onStrike }: { onStrike?: () => void } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Локальные ссылки, чтобы TypeScript не ругался на null в замыканиях
    const cv = canvas;
    const cx = ctx;
    const root = document.documentElement;

    // ========== ДОЖДЬ ==========
    const RAIN_COUNT = 300;
    const drops: { x: number; y: number; len: number; spd: number }[] = [];

    // ========== МОЛНИИ ==========
    type Bolt = {
      pts: [number, number][];
      branches: [number, number][][];
      life: number;
    };
    let bolt: Bolt | null = null;
    let flash = 0;
    let nextStrike = 2.5;
    let secondAt = 0;

    function resize() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;

      drops.length = 0;
      for (let i = 0; i < RAIN_COUNT; i++) {
        drops.push({
          x: Math.random() * cv.width,
          y: Math.random() * cv.height,
          len: 12 + Math.random() * 18,
          spd: 6 + Math.random() * 8
        });
      }
    }

    function makeBolt(): Bolt {
      // Основная линия: рваная, сверху вниз
      let x = cv.width * (0.15 + Math.random() * 0.7);
      let y = 0;
      const pts: [number, number][] = [[x, y]];

      const endY = cv.height * (0.45 + Math.random() * 0.35);
      while (y < endY) {
        x += (Math.random() - 0.5) * 60;
        y += 15 + Math.random() * 30;
        pts.push([x, y]);
      }

      // Ветви от каждой 3-й точки
      const branches: [number, number][][] = [];
      for (let i = 2; i < pts.length - 2; i += 3) {
        if (Math.random() < 0.5) {
          let [bx, by] = pts[i];
          const b: [number, number][] = [[bx, by]];
          const dir = Math.random() < 0.5 ? -1 : 1;
          for (let k = 0; k < 5; k++) {
            bx += dir * (10 + Math.random() * 25);
            by += 12 + Math.random() * 20;
            b.push([bx, by]);
          }
          branches.push(b);
        }
      }

      return { pts, branches, life: 22 };
    }

    function strike(power: number) {
      bolt = makeBolt();
      flash = power;
      onStrike?.();
    }

    // ========== АНИМАЦИЯ ==========
    let lastT = performance.now();
    let raf = 0;
    let elapsed = 0;

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      elapsed += dt;

      if (elapsed > nextStrike) {
        bolt = makeBolt();
        const power = 0.6 + Math.random() * 0.4;
        flash = power;
        secondAt =
          Math.random() < 0.65 ? elapsed + 0.12 + Math.random() * 0.18 : 0;
        nextStrike = elapsed + 7 + Math.random() * 11;
      }
      if (secondAt && elapsed > secondAt) {
        flash = Math.max(flash, 0.75);
        if (bolt) bolt.life = 22;
        secondAt = 0;
      }

      flash = Math.max(0, flash - dt * 2.4);
      if (bolt) bolt.life -= 0.9; // затухание

      root.style.setProperty('--flash', flash.toFixed(3));

      // ========== РИСУЕМ ==========
      cx.clearRect(0, 0, cv.width, cv.height);

      // Дождь
      cx.lineWidth = 1;
      cx.strokeStyle = `rgba(190, 210, 220, ${0.18 + flash * 0.4})`;
      for (const d of drops) {
        cx.beginPath();
        cx.moveTo(d.x, d.y);
        cx.lineTo(d.x - 1, d.y + d.len);
        cx.stroke();

        d.y += d.spd * dt * 60;
        if (d.y > cv.height) {
          d.y = -d.len;
          d.x = Math.random() * cv.width;
        }
      }

      // Молния — рваная, с ветвями и свечением
      if (bolt && bolt.life > 0) {
        const a = Math.min(1, bolt.life / 10) * (Math.random() < 0.2 ? 0.4 : 1);

        cx.lineCap = 'round';
        cx.lineJoin = 'round';
        cx.shadowColor = 'rgba(200, 210, 255, 0.8)';
        cx.shadowBlur = 18;

        // Основная линия
        cx.strokeStyle = `rgba(230, 235, 255, ${a})`;
        cx.lineWidth = 2.5;
        cx.beginPath();
        cx.moveTo(bolt.pts[0][0], bolt.pts[0][1]);
        for (const [px, py] of bolt.pts) cx.lineTo(px, py);
        cx.stroke();

        // Ветви
        cx.strokeStyle = `rgba(230, 235, 255, ${a * 0.7})`;
        cx.lineWidth = 1.2;
        for (const b of bolt.branches) {
          cx.beginPath();
          cx.moveTo(b[0][0], b[0][1]);
          for (const [px, py] of b) cx.lineTo(px, py);
          cx.stroke();
        }

        cx.shadowBlur = 0;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      root.style.removeProperty('--flash');
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2, opacity: 0.75 }}
    />
  );
}