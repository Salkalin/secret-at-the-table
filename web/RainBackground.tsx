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
    type Bolt = { x1: number; y1: number; x2: number; y2: number };
    let boltPoints: Bolt[] = [];
    let boltOpacity = 0;
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

    function makeBolt() {
      boltPoints = [];

      function branch(
        startX: number,
        startY: number,
        length: number,
        direction: number,
        depth: number
      ) {
        const steps = 14 - depth * 4;
        const seg = length / steps;
        let px = startX;
        let py = startY;

        for (let i = 0; i < steps; i++) {
          const nx =
            px + (Math.random() - 0.5) * seg * 1.6 + direction * seg * 0.35;
          const ny = py - seg * (0.7 + Math.random() * 0.5);

          boltPoints.push({ x1: px, y1: py, x2: nx, y2: ny });

          if (depth < 2 && Math.random() < 0.2) {
            branch(
              nx,
              ny,
              length * 0.45,
              Math.random() < 0.5 ? -1 : 1,
              depth + 1
            );
          }

          px = nx;
          py = ny;
        }
      }

      const startX = cv.width * (0.25 + Math.random() * 0.5);
      branch(
        startX,
        cv.height * 0.05,
        cv.height * 0.7,
        (Math.random() - 0.5) * 0.5,
        0
      );
    }

    function strike(power: number) {
      makeBolt();
      boltOpacity = power;
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
        const power = 0.6 + Math.random() * 0.4;
        strike(power);
        secondAt =
          Math.random() < 0.65 ? elapsed + 0.12 + Math.random() * 0.18 : 0;
        nextStrike = elapsed + 7 + Math.random() * 11;
      }
      if (secondAt && elapsed > secondAt) {
        flash = Math.max(flash, 0.75);
        boltOpacity = 0.85;
        secondAt = 0;
      }

      flash = Math.max(0, flash - dt * 2.4);
      boltOpacity = Math.max(0, boltOpacity - dt * 3.5);

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

      // Молния
      if (boltOpacity > 0.01 && boltPoints.length > 0) {
        const offsets = [0, 0.8, -0.8];
        cx.lineCap = 'round';
        cx.lineJoin = 'round';

        for (const offset of offsets) {
          cx.strokeStyle = `rgba(220, 235, 255, ${
            boltOpacity * (offset === 0 ? 1 : 0.45)
          })`;
          cx.lineWidth = offset === 0 ? 1.6 : 1;
          cx.beginPath();
          cx.moveTo(boltPoints[0].x1 + offset, boltPoints[0].y1);
          for (const p of boltPoints) {
            cx.lineTo(p.x2 + offset, p.y2);
          }
          cx.stroke();
        }
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