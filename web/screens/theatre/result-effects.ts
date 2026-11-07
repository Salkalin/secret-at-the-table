import type { SceneEffect } from '../HtmlScene';
import { svgEl } from '../sceneUtils';

// Анимации фонов «Итогов раундов» и «Разгадки» сюжета «Финальный занавес».
// Перенесены из макетов (архив «подозреваемые финальный занавес»).

const dprOf = (max = 4) => Math.min(window.devicePixelRatio || 1, max);

// Раунд 1 — Эмма (бар): бутылки на полках, пылинки, параллакс слоёв
export const theatreResult1Fx: SceneEffect = rt => {
  const g = rt.$('bottles');
  const colors = ['#4a2a1c', '#2e3a26', '#5a3a1e', '#3a1f1f', '#2a2a33', '#6a4a24', '#35261c'];
  const rr = (i: number) => { const x = Math.sin(i * 91.7) * 10000; return x - Math.floor(x); };
  ([[258, 318], [338, 398], [418, 510]] as Array<[number, number]>).forEach((row, ri) => {
    if (ri === 2) return;
    let x = 695; let i = ri * 40;
    while (x < 1120) {
      const h = 26 + rr(i) * 22, w = 12 + rr(i + 3) * 8;
      const base = row[1];
      const c = colors[Math.floor(rr(i + 7) * colors.length)];
      svgEl('rect', { x, y: base - h, width: w, height: h, rx: 3, fill: c }, g);
      svgEl('rect', { x: x + w / 2 - 3, y: base - h - 12, width: 6, height: 13, fill: c }, g);
      svgEl('rect', { x: x + 2, y: base - h + 4, width: 2, height: h - 8, fill: '#f3c89a', opacity: 0.25 }, g);
      x += w + 6 + rr(i + 11) * 10; i++;
    }
  });
  const dust = rt.$('dust');
  for (let i = 0; i < 34; i++) {
    const s = document.createElement('span');
    s.style.left = (Math.random() * 100) + '%';
    s.style.top = (30 + Math.random() * 70) + '%';
    s.style.animationDuration = (9 + Math.random() * 10) + 's';
    s.style.animationDelay = (-Math.random() * 15) + 's';
    const sz = 1 + Math.random() * 2.2; s.style.width = s.style.height = sz + 'px';
    dust.appendChild(s);
  }
  const layers: Array<[HTMLElement, number]> = ([['layer-back', 6], ['layer-mid', 12], ['layer-front', 22]] as Array<[string, number]>)
    .map(([id, k]) => [rt.$<HTMLElement>(id), k]);
  rt.on('mousemove', e => {
    const dx = (e.clientX / window.innerWidth - 0.5), dy = (e.clientY / window.innerHeight - 0.5);
    layers.forEach(([el, k]) => { el.style.transform = `translate(${-dx * k}px,${-dy * k * 0.6}px)`; });
  });
};

// Раунд 2 — Марк (костюмерная): костюмы на вешалках, дождь за панорамным окном
export const theatreResult2Fx: SceneEffect = (rt, root) => {
  const COLORS = ['#5a141a', '#3a2a22', '#2a1d18', '#4a1015', '#6b3a24', '#1f2a2a', '#3d1f2e', '#7a5a3a', '#2c3a2a', '#502030'];
  const SHAPES = [
    '<path d="M-22 50h44l12 160h-68z"/>',
    '<path d="M-20 50h40l4 60l30 150h-108l30-150z"/>',
    '<path d="M-24 50h48l6 130h-60z"/><path d="M-10 50l10 30l10-30" stroke="#b99a78" stroke-width="1.5" fill="none"/>',
    '<path d="M-22 50h44l14 20l-10 8l-6-6v70h-40v-70l-6 6l-10-8z"/>',
    '<path d="M-18 50h36l28 190q-46 12-92 0z"/>',
    '<path d="M-22 50h44l4 100l-8 60l-10-40h-16l-10 40l-8-60z"/><path d="M-6 50l6 16l6-16" stroke="#b99a78" stroke-width="1.5" fill="none"/>',
    '<path d="M-20 50h40l2 40l-14 8l20 140h-56l20-140l-14-8z"/>',
    '<path d="M-24 50h48l-2 70h-44z"/><path d="M-22 120h44l8 110h-60z" opacity=".75"/>'
  ];
  const fillRack = (id: string, from: number, to: number, step: number, scale: number) => {
    const svg = rt.$(id);
    let i = 0;
    for (let x = from; x <= to; x += step, i++) {
      const outer = svgEl('g', { transform: `translate(${x + (Math.random() * 6 - 3)},0) scale(${scale},1)` });
      const g = svgEl('g', { class: 'hang', fill: COLORS[(i * 3 + Math.floor(Math.random() * 3)) % COLORS.length] });
      g.style.animationDelay = (-Math.random() * 6).toFixed(2) + 's';
      g.style.animationDuration = (5 + Math.random() * 3).toFixed(2) + 's';
      g.innerHTML = '<path d="M0 30v10M-20 50L0 40L20 50" stroke="#b99a78" stroke-width="2" fill="none"/>' +
        SHAPES[(i * 5 + Math.floor(Math.random() * 2)) % SHAPES.length];
      outer.appendChild(g);
      svg.appendChild(outer);
    }
  };
  fillRack('rackFar', 55, 550, 34, 0.75);
  fillRack('rackMain', 78, 825, 38, 0.9);

  // дождь (подсвечивается у окна)
  const c = rt.$<HTMLCanvasElement>('dust');
  const ctx = c.getContext('2d')!;
  let w = 0, h = 0, parts: any[] = [], win: DOMRect | null = null;
  const spawn = () => ({ x: Math.random() * w, y: Math.random() * h, len: Math.random() * 14 + 8, vy: Math.random() * 5 + 7, a: Math.random() * 0.12 + 0.04 });
  const resize = () => {
    const dpr = dprOf(2);
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const pan = root.querySelector('.panorama');
    win = pan ? pan.getBoundingClientRect() : null;
    const n = Math.round(w * h / 6000);
    parts = Array.from({ length: n }, spawn);
  };
  const lightAt = (x: number, y: number) => {
    if (!win) return 0;
    const dx = x < win.left ? win.left - x : (x > win.right ? x - win.right : 0);
    const dy = y < win.top ? (win.top - y) : (y > win.bottom ? (y - win.bottom) * 0.5 : 0);
    return Math.max(0, 1 - (dx + dy) / 160);
  };
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    for (const p of parts) {
      p.x -= p.vy * 0.12; p.y += p.vy;
      if (p.y > h + 20) { p.y = -20; p.x = Math.random() * (w + 60); }
      const l = lightAt(p.x, p.y);
      ctx.strokeStyle = l > 0 ? `rgba(255,205,160,${p.a + l * 0.3})` : `rgba(200,210,225,${p.a})`;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.len * 0.12, p.y - p.len); ctx.stroke();
    }
    rt.raf(tick);
  };
  rt.on('resize', resize); resize(); rt.raf(tick);
};

// Раунд 3 — Соня (гримёрная): платья на вешалке, лампы зеркала, пыль, параллакс
export const theatreResult3Fx: SceneEffect = rt => {
  const dresses = rt.$('dresses');
  const cols = ['#3a1417', '#1f2a24', '#2b1d2e', '#4a2a14', '#1a1a22', '#3d2020', '#2a2418', '#331016'];
  cols.forEach((c, i) => {
    const x = 110 + i * 52 + (i % 2 ? 6 : 0), len = 330 + ((i * 67) % 140), w = 28 + ((i * 13) % 22);
    const g = svgEl('g', { class: 'sway', style: `animation-delay:${-i * 0.9}s` }, dresses);
    svgEl('path', { d: `M${x} 190 q0 -10 6 -10 M${x - 16} 208 L${x} 196 L${x + 16} 208`, stroke: '#5a4430', 'stroke-width': 2, fill: 'none' }, g);
    svgEl('path', { d: `M${x - 15} 208 L${x + 15} 208 L${x + w} ${208 + len} Q${x} ${218 + len} ${x - w} ${208 + len} Z`, fill: c, stroke: '#0c0606', 'stroke-width': 1.5 }, g);
    svgEl('path', { d: `M${x - 6} 240 L${x - 12} ${200 + len} M${x + 7} 250 L${x + 14} ${200 + len}`, stroke: '#000', 'stroke-width': 1.5, opacity: 0.35, fill: 'none' }, g);
  });

  const bulbs = rt.$('bulbs');
  const pos: Array<[number, number]> = [];
  for (let i = 0; i < 7; i++) pos.push([1075 + i * 45, 150]);
  for (let i = 1; i < 9; i++) { pos.push([1060, 150 + i * 46]); pos.push([1360, 150 + i * 46]); }
  const dead = [3, 8, 15], flick = [5, 12, 18];
  pos.forEach((p, i) => {
    if (dead.includes(i)) { svgEl('circle', { cx: p[0], cy: p[1], r: 7, fill: '#2a1d16', stroke: '#140c08' }, bulbs); return; }
    const g = svgEl('g', { class: flick.includes(i) ? 'flicker' : '', style: `animation-delay:${-i * 0.7}s` }, bulbs);
    svgEl('circle', { cx: p[0], cy: p[1], r: 26, fill: 'url(#bulbGlow)' }, g);
    svgEl('circle', { cx: p[0], cy: p[1], r: 7, fill: '#ffe0ad' }, g);
  });

  const cv = rt.$<HTMLCanvasElement>('dust');
  const ctx = cv.getContext('2d')!;
  let W = 0, H = 0, parts: any[] = [];
  const resize = () => {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    parts = Array.from({ length: 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.3, vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.2 - 0.03, a: Math.random() * 0.5 + 0.1 }));
  };
  resize(); rt.on('resize', resize);
  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      ctx.fillStyle = `rgba(233,190,140,${p.a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
    });
    rt.raf(loop);
  };
  rt.raf(loop);

  const scene = rt.$<HTMLElement>('scene');
  rt.on('mousemove', e => {
    const dx = (e.clientX / innerWidth - 0.5) * -14, dy = (e.clientY / innerHeight - 0.5) * -10;
    scene.style.transform = `translate(${dx}px,${dy}px)`;
  });
};

// Раунд 4 — Артур (фойе): пыль в свете прожектора и лепестки
export const theatreResult4Fx: SceneEffect = rt => {
  const pc = rt.$('particles');
  for (let i = 0; i < 40; i++) {
    const d = document.createElement('span');
    d.className = 'dust';
    const s = Math.random() * 2.5 + 1;
    d.style.cssText = `width:${s}px;height:${s}px;left:${42 + Math.random() * 16}%;top:${35 + Math.random() * 50}%;animation-duration:${6 + Math.random() * 8}s;animation-delay:${-Math.random() * 10}s;--dx:${(Math.random() - 0.5) * 60}px`;
    pc.appendChild(d);
  }
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.cssText = `left:${Math.random() * 100}%;animation-duration:${12 + Math.random() * 12}s;animation-delay:${-Math.random() * 20}s;--dx:${(Math.random() - 0.5) * 200}px;opacity:${0.35 + Math.random() * 0.4}`;
    pc.appendChild(p);
  }
};

// Разгадка — Вадим (аппаратная): лампочки зеркала, фейдеры пульта, таймкод, дождь, гроза
export const theatreEndFx: SceneEffect = rt => {
  const g = rt.$('bulbs');
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < 6; i++) pts.push([80 + i * 48, 26]);
  for (let i = 0; i < 8; i++) { pts.push([26, 80 + i * 52]); pts.push([374, 80 + i * 52]); }
  pts.forEach(([x, y]) => svgEl('circle', { cx: x, cy: y, r: 8, fill: '#e8b07a', class: 'bulb' }, g));

  const fd = rt.$('faders');
  for (let i = 0; i < 18; i++) {
    const x = 1125 + i * 19.5;
    svgEl('path', { d: `M${x} 600 V630`, stroke: '#3a3a40', 'stroke-width': 2 }, fd);
    svgEl('rect', { x: x - 4, y: 600 + Math.random() * 24, width: 8, height: 5, rx: 1, fill: i % 6 === 0 ? '#c8643f' : '#bdb5aa' }, fd);
  }

  // таймкод на мониторе
  const tc = rt.$('tc');
  let fr = 0; const t0 = 23 * 3600 + 12 * 60;
  rt.interval(() => {
    fr++;
    const s = t0 + Math.floor(fr / 25), p = (n: number) => String(n).padStart(2, '0');
    tc.textContent = `${p(Math.floor(s / 3600) % 24)}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(fr % 25)}`;
  }, 40);

  // дождь + пылинки пудры
  const cv = rt.$<HTMLCanvasElement>('fx');
  const ctx = cv.getContext('2d')!;
  let W = 0, H = 0, drops: any[] = [], dust: any[] = [];
  const resize = () => {
    const d = dprOf(2); W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    drops = Array.from({ length: Math.round(W / 9) }, () => ({ x: Math.random() * W, y: Math.random() * H, l: 10 + Math.random() * 22, v: 8 + Math.random() * 10, a: 0.03 + Math.random() * 0.07 }));
    dust = Array.from({ length: Math.round(W / 28) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: 0.4 + Math.random() * 1.4, vx: (Math.random() - 0.5) * 0.15, vy: -0.05 - Math.random() * 0.15, p: Math.random() * 6.28 }));
  };
  rt.on('resize', resize); resize();
  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    for (const d of drops) {
      ctx.strokeStyle = `rgba(180,190,205,${d.a})`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.l * 0.12, d.y + d.l); ctx.stroke();
      d.y += d.v; d.x -= d.v * 0.12;
      if (d.y > H) { d.y = -d.l; d.x = Math.random() * (W + 60); }
    }
    for (const p of dust) {
      p.p += 0.02; p.x += p.vx + Math.sin(p.p) * 0.1; p.y += p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      const cx = Math.abs(p.x - W / 2) / (W / 2);
      ctx.fillStyle = `rgba(240,200,160,${(0.35 - cx * 0.25) * (0.6 + Math.sin(p.p) * 0.4)})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.fill();
    }
    rt.raf(loop);
  };
  rt.raf(loop);

  // редкие вспышки молнии
  const fl = rt.$('flash');
  const thunder = () => rt.timeout(() => {
    fl.classList.remove('on'); void (fl as HTMLElement).offsetWidth; fl.classList.add('on');
    thunder();
  }, 9000 + Math.random() * 14000);
  thunder();
};
