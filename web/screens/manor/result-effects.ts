import type { SceneEffect } from '../HtmlScene';
import { svgEl } from '../sceneUtils';

// Анимации фонов «Итогов раундов» и «Разгадки» сюжета «Полночь у Вороновых».
// Перенесены из макетов (архив «подозреваемые полночь у вороновых»).
// Раунд 3 (Алиса) без скриптов: фон статичный, с CSS-анимациями.

// Раунд 1 — Нина: пыль в свете, лёгкий параллакс
export const manorResult1Fx: SceneEffect = rt => {
  const c = rt.$<HTMLCanvasElement>('dust');
  const x = c.getContext('2d')!;
  let W = 0, H = 0, P: any[] = [];
  const size = () => {
    W = c.width = innerWidth; H = c.height = innerHeight;
    P = Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.3, vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.2 - 0.03, a: Math.random() * 0.5 + 0.1 }));
  };
  const tick = () => {
    x.clearRect(0, 0, W, H);
    const cx = W * 0.62, cy = H * 0.55, R = Math.max(W, H) * 0.45;
    for (const p of P) {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      const d = Math.hypot(p.x - cx, p.y - cy), k = Math.max(0, 1 - d / R);
      x.fillStyle = 'rgba(240,205,160,' + (p.a * k) + ')';
      x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill();
    }
    rt.raf(tick);
  };
  rt.on('resize', size); size(); rt.raf(tick);
  const svg = rt.$<SVGElement>('svg');
  rt.on('mousemove', e => {
    const dx = (e.clientX / innerWidth - 0.5) * -14, dy = (e.clientY / innerHeight - 0.5) * -8;
    svg.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
  });
};

// Раунд 2 — Лидия: пылинки
export const manorResult2Fx: SceneEffect = rt => {
  const dust = rt.$('dust');
  for (let i = 0; i < 40; i++) {
    const s = document.createElement('span');
    s.style.left = (35 + Math.random() * 45) + '%';
    s.style.top = (30 + Math.random() * 65) + '%';
    s.style.animationDuration = (8 + Math.random() * 10) + 's';
    s.style.animationDelay = (-Math.random() * 15) + 's';
    const z = 1 + Math.random() * 1.5;
    s.style.width = s.style.height = z + 'px';
    dust.appendChild(s);
  }
};

// Раунд 4 — Герман: окна дома, забор, дождь, молния
export const manorResult4Fx: SceneEffect = rt => {
  const winG = rt.$('windows'), refG = rt.$('reflect');
  const lit = new Set(['0-1', '1-3', '2-0', '0-6', '1-7', 't-1', 'w-2']);
  const addWin = (x: number, y: number, w: number, h: number, key: string) => {
    const on = lit.has(key);
    const r = svgEl('rect', { x, y, width: w, height: h, class: 'win' + (on ? (Math.random() > 0.5 ? ' flicker' : '') : ' dim') });
    if (on) r.setAttribute('opacity', '.8');
    winG.appendChild(r);
    if (on) {
      const g = r.cloneNode() as SVGElement; g.setAttribute('class', 'win glow'); g.setAttribute('opacity', '.45'); winG.insertBefore(g, r);
      svgEl('rect', { x, y: 472 + (470 - y - h) * 0.1, width: w, height: 28, class: 'win' }, refG);
    }
  };
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) {
    const x = 605 + c * 48; if (x > 740 && x < 850) continue;
    addWin(x, 318 + r * 50, 18, 30, r + '-' + c);
  }
  for (let i = 0; i < 3; i++) addWin(516, 270 + i * 60, 28, 34, 't-' + i);
  for (let i = 0; i < 4; i++) addWin(1060 + i * 38, 370, 18, 28, 'w-' + i);
  addWin(788, 250, 24, 38, 'x');

  // забор
  const fG = rt.$('fence');
  for (let x = 260; x < 1350; x += 14) {
    if (x > 1272 && x < 1320) continue;
    svgEl('rect', { x, y: 448, width: 2, height: 22 }, fG);
  }

  // дождь
  const cv = rt.$<HTMLCanvasElement>('rain');
  const ctx = cv.getContext('2d')!;
  let W = 0, H = 0, drops: any[] = [];
  const dpr = () => window.devicePixelRatio || 1;
  const resize = () => {
    W = cv.width = innerWidth * dpr(); H = cv.height = innerHeight * dpr();
    const n = Math.round(innerWidth * innerHeight / 5000);
    drops = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, l: (10 + Math.random() * 22) * dpr(), v: (9 + Math.random() * 9) * dpr(), a: 0.08 + Math.random() * 0.2 }));
  };
  resize(); rt.on('resize', resize);
  const tick = () => {
    ctx.clearRect(0, 0, W, H); ctx.lineWidth = dpr();
    for (const d of drops) {
      ctx.strokeStyle = `rgba(190,178,165,${d.a})`;
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.l * 0.18, d.y + d.l); ctx.stroke();
      d.y += d.v; d.x -= d.v * 0.18;
      if (d.y > H) { d.y = -d.l; d.x = Math.random() * W * 1.1; }
    }
    rt.raf(tick);
  };
  rt.raf(tick);

  // молния
  const fl = rt.$<HTMLElement>('flash');
  const lightning = () => {
    const seq = [0.5, 0, 0.8, 0, 0.3, 0]; let i = 0;
    const step = () => {
      if (i >= seq.length) return;
      fl.style.transition = seq[i] ? 'none' : 'opacity .25s';
      fl.style.opacity = String(seq[i]); i++;
      rt.timeout(step, 60 + Math.random() * 120);
    };
    step();
    rt.timeout(lightning, 9000 + Math.random() * 14000);
  };
  rt.timeout(lightning, 4000);
};

// Разгадка — Павел: мерцающие звёзды
export const manorEndFx: SceneEffect = rt => {
  const g = rt.$('stars');
  for (let i = 0; i < 140; i++) {
    const x = Math.random() * 1600, y = Math.random() * 420;
    if (Math.hypot(x - 1270, y - 170) < 120) continue;
    const c = svgEl('circle', { cx: x, cy: y, r: Math.random() * 1.1 + 0.3, fill: '#e8e0d0' }, g);
    c.style.animation = `twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite`;
    c.style.opacity = '.4';
  }
};
