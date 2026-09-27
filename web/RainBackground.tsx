import { useEffect, useRef } from 'react';

export default function RainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext('2d');
    if (!x) return;

    type Drop = { x: number; y: number; l: number; s: number; o: number };
    let drops: Drop[] = [];
    let raf = 0;

    function resize() {
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      drops = Array.from(
        { length: Math.max(40, Math.floor(window.innerWidth / 16)) },
        () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          l: 18 + Math.random() * 38,
          s: 2.5 + Math.random() * 4,
          o: 0.04 + Math.random() * 0.1
        })
      );
    }

    function loop() {
      if (!c || !x) return;
      x.clearRect(0, 0, c.width, c.height);
      x.lineWidth = 1;
      for (const p of drops) {
        x.strokeStyle = 'rgba(236,229,218,' + p.o + ')';
        x.beginPath();
        x.moveTo(p.x, p.y);
        x.lineTo(p.x + 1.5, p.y + p.l);
        x.stroke();
        p.y += p.s * 2.2;
        if (p.y > c.height) {
          p.y = -p.l;
          p.x = Math.random() * c.width;
        }
      }
      raf = requestAnimationFrame(loop);
    }

    resize();
    loop();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
    />
  );
}
