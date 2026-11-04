import type { SceneEffect } from '../HtmlScene';

// Анимации фонов сюжета «Финальный занавес».
// Перенесены из макетов (архив «Сюжеты 2 и 3»); логика та же, но все таймеры и
// слушатели регистрируются через rt и снимаются при смене сцены.

const dprOf = () => window.devicePixelRatio || 1;

// ------------------------------------------------------------
// INTRO: пустой зал + пыль в луче прожектора
// ------------------------------------------------------------
export const theatreIntroFx: SceneEffect = rt => {
  const c = rt.$<HTMLCanvasElement>('dust');
  const ctx = c.getContext('2d')!;
  const hall = rt.$<HTMLCanvasElement>('hall');
  const hctx = hall.getContext('2d') as any;
  let W = 0, H = 0;
  const parts: Array<{ x: number; y: number; r: number; vx: number; vy: number; p: number }> = [];

  const resize = () => {
    W = c.width = innerWidth * dprOf();
    H = c.height = innerHeight * dprOf();
  };

  // кресла пустого зала
  const drawHall = () => {
    const w = innerWidth, h = innerHeight, dpr = dprOf();
    hall.width = w * dpr; hall.height = h * dpr;
    hctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    hctx.clearRect(0, 0, w, h);
    const sb = h * 0.665;
    const rows = 10;
    for (let i = 0; i < rows; i++) {
      const t = i / (rows - 1);
      const y = sb + 16 + (h - sb + 30) * Math.pow(t, 1.3);
      const s = 0.45 + t * 1.25;
      const sw = 24 * s, sh = 28 * s, gap = 5 * s, aisle = 70 * s;
      const rowW = w * (0.75 + t * 0.55);
      const n = Math.floor((rowW / 2 - aisle / 2) / (sw + gap));
      const lit = (1 - t) * 0.5 + 0.1;
      const off = (i % 2) * (sw + gap) / 2;
      for (const side of [-1, 1]) {
        for (let k = 0; k < n; k++) {
          const x = side < 0
            ? w / 2 - aisle / 2 - (k + 1) * (sw + gap) + off
            : w / 2 + aisle / 2 + k * (sw + gap) + gap - off;
          const fade = 1 - (k / n) * 0.6;
          const g = hctx.createLinearGradient(0, y - sh, 0, y);
          g.addColorStop(0, `rgba(${70 + lit * 60},${22 + lit * 20},${20 + lit * 14},${fade})`);
          g.addColorStop(1, `rgba(18,8,7,${fade})`);
          hctx.fillStyle = g;
          hctx.beginPath();
          if (hctx.roundRect) hctx.roundRect(x, y - sh, sw, sh, [6 * s, 6 * s, 2 * s, 2 * s]);
          else hctx.rect(x, y - sh, sw, sh);
          hctx.fill();
          hctx.fillStyle = `rgba(255,200,160,${0.06 * lit * fade})`;
          hctx.fillRect(x + 3 * s, y - sh + 1, sw - 6 * s, Math.max(1, s));
        }
      }
      hctx.fillStyle = 'rgba(0,0,0,.35)';
      hctx.fillRect(0, y, w, 3 * s);
    }
  };

  resize(); drawHall();
  rt.on('resize', () => { resize(); drawHall(); });

  for (let i = 0; i < 90; i++) parts.push({
    x: Math.random(), y: Math.random(),
    r: Math.random() * 1.4 + 0.3,
    vx: (Math.random() - 0.5) * 0.00015,
    vy: -(Math.random() * 0.00025 + 0.00005),
    p: Math.random() * Math.PI * 2
  });

  const draw = (t: number) => {
    ctx.clearRect(0, 0, W, H);
    for (const d of parts) {
      d.x += d.vx + Math.sin(t / 3000 + d.p) * 0.00008;
      d.y += d.vy;
      if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
      // ярче внутри конуса прожектора
      const cone = Math.max(0, 1 - Math.abs(d.x - 0.5) / (0.08 + d.y * 0.22));
      const a = 0.05 + cone * 0.45;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,222,190,${a})`;
      ctx.arc(d.x * W, d.y * H, d.r * dprOf(), 0, Math.PI * 2);
      ctx.fill();
    }
    rt.raf(draw);
  };
  rt.raf(draw);
};

// ------------------------------------------------------------
// CHAPTER 1: «Овация» — лампочки у зеркала, осколки, пыль, дождь, лепестки
// ------------------------------------------------------------
export const theatreCh1Fx: SceneEffect = rt => {
  // лампочки вокруг зеркала
  const v = rt.$('vanity');
  const W0 = 340, H0 = 430, m = 19;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < 5; i++) pts.push([m + (W0 - 2 * m) * i / 4, m]);
  for (let i = 1; i < 6; i++) { pts.push([m, m + (H0 - 2 * m) * i / 6]); pts.push([W0 - m, m + (H0 - 2 * m) * i / 6]); }
  pts.forEach((p, i) => {
    const b = document.createElement('div');
    b.className = 'bulb' + (i === 3 || i === 12 ? ' dead' : '') + (i === 6 || i === 9 ? ' flicker' : '');
    if (i === 9) b.style.animationDelay = '1.7s';
    b.style.left = p[0] + 'px'; b.style.top = p[1] + 'px';
    v.appendChild(b);
  });

  // осколки на полу
  const s = rt.$('shards');
  for (let i = 0; i < 14; i++) {
    const d = document.createElement('div'); d.className = 'shard';
    const w = 6 + Math.random() * 18;
    d.style.cssText = `width:${w}px;height:${w * 0.7}px;left:${Math.random() * 100}%;top:${Math.random() * 80}%;transform:rotate(${Math.random() * 360}deg);opacity:${0.3 + Math.random() * 0.6}`;
    s.appendChild(d);
  }

  // пыль, дождь, лепестки
  const c = rt.$<HTMLCanvasElement>('fx');
  const x = c.getContext('2d')!;
  let w = 0, h = 0;
  let dust: any[] = [], rain: any[] = [], petals: any[] = [];
  const newPetal = (any: boolean) => ({ x: Math.random() * w, y: any ? Math.random() * h : -20, s: 4 + Math.random() * 4, v: 0.25 + Math.random() * 0.3, a: Math.random() * 6, sp: (Math.random() - 0.5) * 0.02 });
  const resize = () => {
    const r = dprOf();
    w = innerWidth; h = innerHeight; c.width = w * r; c.height = h * r; x.setTransform(r, 0, 0, r, 0, 0);
    dust = Array.from({ length: Math.round(w * h / 9000) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + 0.3, vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.12 - 0.02, p: Math.random() * 6 }));
    rain = Array.from({ length: 60 }, () => ({ x: Math.random() * w, y: Math.random() * h, l: 20 + Math.random() * 40, v: 6 + Math.random() * 6 }));
    petals = Array.from({ length: 6 }, () => newPetal(true));
  };
  const lx = () => w * 0.74, ly = () => h * 0.42;
  const frame = (t: number) => {
    x.clearRect(0, 0, w, h);
    x.strokeStyle = 'rgba(200,190,180,.05)'; x.lineWidth = 1;
    rain.forEach(d => { x.beginPath(); x.moveTo(d.x, d.y); x.lineTo(d.x - 2, d.y + d.l); x.stroke(); d.y += d.v; d.x -= 0.3; if (d.y > h) { d.y = -d.l; d.x = Math.random() * w; } });
    dust.forEach(d => {
      const dist = Math.hypot(d.x - lx(), d.y - ly()), lit = Math.max(0, 1 - dist / (w * 0.45));
      const a = (0.08 + lit * 0.55) * (0.6 + 0.4 * Math.sin(t / 900 + d.p));
      x.fillStyle = `rgba(255,215,170,${a})`; x.beginPath(); x.arc(d.x, d.y, d.r, 0, 7); x.fill();
      d.x += d.vx + Math.sin(t / 3000 + d.p) * 0.1; d.y += d.vy;
      if (d.y < -5) { d.y = h + 5; d.x = Math.random() * w; }
      if (d.x < 0) d.x = w;
      if (d.x > w) d.x = 0;
    });
    petals.forEach((p, i) => {
      x.save(); x.translate(p.x, p.y); x.rotate(p.a);
      x.fillStyle = 'rgba(110,20,26,.55)'; x.beginPath(); x.ellipse(0, 0, p.s, p.s * 0.55, 0, 0, 7); x.fill(); x.restore();
      p.y += p.v; p.x += Math.sin(t / 1500 + i) * 0.3; p.a += p.sp;
      if (p.y > h * 0.9) petals[i] = newPetal(false);
    });
    rt.raf(frame);
  };
  rt.on('resize', resize); resize(); rt.raf(frame);
};

// ------------------------------------------------------------
// CHAPTER 2: «Вычеркнутое имя» — пыль в свете лампы, силуэты толпы у афиши
// ------------------------------------------------------------
export const theatreCh2Fx: SceneEffect = rt => {
  const c = rt.$<HTMLCanvasElement>('fx');
  const x = c.getContext('2d')!;
  let w = 0, h = 0, dpr = 1;
  let dust: any[] = [];
  const lampPos = () => ({ x: (w < 720 ? 0.74 : 0.70) * w, y: h * 0.32 });
  const newDust = (init: boolean) => {
    const p = lampPos(); const r = Math.random() * Math.min(w, h) * 0.3; const a = Math.random() * Math.PI * 2;
    return { x: p.x + Math.cos(a) * r, y: p.y + Math.sin(a) * r * 0.9 + (init ? 0 : 20), s: 0.4 + Math.random() * 1.4, vx: (Math.random() - 0.5) * 0.15, vy: -0.05 - Math.random() * 0.15, life: 0, max: 400 + Math.random() * 600 };
  };
  const size = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    dust = Array.from({ length: 80 }, () => newDust(true));
  };
  const frame = () => {
    x.clearRect(0, 0, w, h);
    const p = lampPos(), R = Math.min(w, h) * 0.42;
    for (let i = 0; i < dust.length; i++) {
      const d = dust[i]; d.x += d.vx + Math.sin((d.life + i * 40) / 80) * 0.1; d.y += d.vy; d.life++;
      const dist = Math.hypot(d.x - p.x, d.y - p.y);
      const fade = Math.max(0, 1 - dist / R) * Math.min(1, d.life / 60) * Math.min(1, (d.max - d.life) / 60);
      x.fillStyle = `rgba(255,215,160,${0.55 * fade})`;
      x.beginPath(); x.arc(d.x, d.y, d.s, 0, Math.PI * 2); x.fill();
      if (d.life > d.max) dust[i] = newDust(false);
    }
    rt.raf(frame);
  };
  rt.on('resize', size); size(); rt.raf(frame);

  // силуэты толпы вокруг программки
  type Fig = { row: Array<[number, number, number, string]>; fill: string; blur: string; rim: number };
  const figs: Fig[] = [
    { row: [[400, 178, 17, 'bun'], [460, 170, 16, ''], [520, 175, 17, 'hat'], [585, 172, 16, ''], [640, 180, 17, 'bun']], fill: '#1d1411', blur: 'b2', rim: 0.10 },
    { row: [[320, 182, 24, ''], [440, 188, 23, 'cap'], [560, 184, 24, 'bun'], [690, 180, 25, ''], [790, 190, 24, 'cap']], fill: '#120c0a', blur: 'b1', rim: 0.14 },
    { row: [[110, 176, 40, ''], [250, 196, 34, 'bun'], [770, 200, 35, ''], [910, 170, 42, 'hat']], fill: '#060404', blur: '', rim: 0.18 }
  ];
  const person = (cx: number, hy: number, r: number, acc: string) => {
    const sy = hy + r * 1.9, wd = r * 2.6;
    let s = `<path d="M${cx - wd * 1.05} 520 C${cx - wd * 1.05} ${sy + 80} ${cx - wd} ${sy + 10} ${cx - wd * 0.7} ${sy - 2} L${cx - r * 0.5} ${sy - r * 0.35} L${cx - r * 0.42} ${hy + r * 0.7} L${cx + r * 0.42} ${hy + r * 0.7} L${cx + r * 0.5} ${sy - r * 0.35} L${cx + wd * 0.7} ${sy - 2} C${cx + wd} ${sy + 10} ${cx + wd * 1.05} ${sy + 80} ${cx + wd * 1.05} 520Z"/>`;
    s += `<ellipse cx="${cx}" cy="${hy}" rx="${r * 0.85}" ry="${r * 1.05}"/>`;
    if (acc === 'hat') s += `<rect x="${cx - r * 0.72}" y="${hy - r * 2.05}" width="${r * 1.44}" height="${r * 1.25}" rx="2"/><rect x="${cx - r * 1.3}" y="${hy - r * 0.95}" width="${r * 2.6}" height="${r * 0.28}" rx="${r * 0.14}"/>`;
    if (acc === 'bun') s += `<circle cx="${cx + r * 0.15}" cy="${hy - r * 1.02}" r="${r * 0.48}"/>`;
    if (acc === 'cap') s += `<ellipse cx="${cx}" cy="${hy - r * 0.55}" rx="${r * 1.08}" ry="${r * 0.5}"/>`;
    return s;
  };
  let svgStr = '<defs><filter id="b1"><feGaussianBlur stdDeviation="1"/></filter><filter id="b2"><feGaussianBlur stdDeviation="2.2"/></filter></defs>';
  for (const g of figs) {
    svgStr += `<g fill="${g.fill}" stroke="rgba(214,150,90,${g.rim})" stroke-width="1.2" ${g.blur ? `filter="url(#${g.blur})"` : ''}>`;
    for (const f of g.row) svgStr += person(...f);
    svgStr += '</g>';
  }
  rt.$('crowd').innerHTML = svgStr;
};

// ------------------------------------------------------------
// CHAPTER 3: «Роль без дублёра» — пылинки в свете открытой двери
// ------------------------------------------------------------
export const theatreCh3Fx: SceneEffect = (rt, root) => {
  const c = rt.$<HTMLCanvasElement>('dust');
  const x = c.getContext('2d')!;
  const door = root.querySelector('.doorset') as HTMLElement;
  let W = 0, H = 0;
  let motes: any[] = [];
  const mk = () => ({ x: Math.random() * W, y: Math.random() * H * 0.75, r: 0.4 + Math.random() * 1.4, vx: (Math.random() - 0.5) * 0.18, vy: -0.04 - Math.random() * 0.14, a: 0.2 + Math.random() * 0.5, t: Math.random() * 6.28 });
  const size = () => {
    W = c.width = innerWidth; H = c.height = innerHeight;
    motes = Array.from({ length: Math.round(W * H / 16000) }, mk);
  };
  rt.on('resize', size); size();
  const frame = () => {
    x.clearRect(0, 0, W, H);
    const dr = door.getBoundingClientRect(), dx = dr.left + dr.width / 2, dy = dr.top + dr.height / 2;
    for (const m of motes) {
      const dist = Math.hypot(m.x - dx, (m.y - dy) * 0.7);
      const light = Math.max(0, 1 - dist / (H * 0.45));
      m.t += 0.02;
      const al = m.a * (0.08 + light) * (0.6 + 0.4 * Math.sin(m.t));
      if (al > 0.01) { x.fillStyle = `rgba(255,215,160,${al})`; x.beginPath(); x.arc(m.x, m.y, m.r, 0, 6.283); x.fill(); }
      m.x += m.vx + Math.sin(m.t) * 0.08; m.y += m.vy;
      if (m.y < -5 || m.x < -5 || m.x > W + 5) { Object.assign(m, mk(), { y: H * 0.6 + Math.random() * H * 0.1 }); }
    }
    rt.raf(frame);
  };
  rt.raf(frame);
};
