import type { SceneEffect } from '../HtmlScene';

// Анимации фонов сюжета «Полночь у Вороновых».
// Перенесены из макетов (архив «Сюжеты 2 и 3»); все таймеры и слушатели
// регистрируются через rt и снимаются при смене сцены.

const NS = 'http://www.w3.org/2000/svg';
const svgEl = (t: string, a: Record<string, any>) => {
  const e = document.createElementNS(NS, t);
  for (const k in a) e.setAttribute(k, String(a[k]));
  return e;
};
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

// ------------------------------------------------------------
// INTRO (макет «Полночь у Вороновых — начало»): шкафы, доски пола, дождь, пыль, молния
// ------------------------------------------------------------
export const manorIntroFx: SceneEffect = (rt, root) => {
  const bookColors = ['#2a1512', '#3a1c14', '#1f2419', '#2b2418', '#341a1a', '#1c1c22', '#3d2a1a', '#261a14', '#422015'];

  const shelf = (g: Element, x0: number, w: number, y0: number, y1: number) => {
    g.appendChild(svgEl('rect', { x: x0 - 10, y: y0 - 20, width: w + 20, height: y1 - y0 + 20, fill: '#120c0a' }));
    for (let y = y0 + 100; y <= y1; y += 110) {
      let x = x0;
      while (x < x0 + w - 8) {
        const bw = rnd(8, 18), bh = rnd(58, 90);
        if (Math.random() < 0.06) { x += rnd(14, 30); continue; }
        const tilt = Math.random() < 0.05;
        const r = svgEl('rect', { x, y: y - bh, width: bw, height: bh, fill: bookColors[Math.floor(Math.random() * bookColors.length)] });
        if (tilt) r.setAttribute('transform', `rotate(${rnd(8, 14)} ${x} ${y})`);
        g.appendChild(r);
        if (Math.random() < 0.5) g.appendChild(svgEl('rect', { x: x + 1, y: y - bh + rnd(8, 18), width: bw - 2, height: 2, fill: '#8a6a3e', opacity: 0.35 }));
        x += bw + rnd(0.5, 2);
      }
      g.appendChild(svgEl('rect', { x: x0 - 10, y, width: w + 20, height: 9, fill: '#2b1f19' }));
    }
    g.appendChild(svgEl('rect', { x: x0 - 14, y: y0 - 24, width: 8, height: y1 - y0 + 28, fill: '#2b1f19' }));
    g.appendChild(svgEl('rect', { x: x0 + w + 6, y: y0 - 24, width: 8, height: y1 - y0 + 28, fill: '#2b1f19' }));
  };
  shelf(rt.$('shelfL'), 20, 360, 40, 640);
  shelf(rt.$('shelfR'), 1440, 160, 40, 640);
  shelf(rt.$('shelfM'), 640, 340, 120, 560);

  // доски пола
  const planks = rt.$('planks');
  for (let x = -1400; x <= 3000; x += 110) planks.appendChild(svgEl('line', { x1: 1150, y1: 300, x2: x, y2: 900 }));
  [670, 705, 750, 810, 880].forEach(y => planks.appendChild(svgEl('line', { x1: 0, y1: y, x2: 1600, y2: y, 'stroke-opacity': 0.25 })));

  // дождь на стекле окна
  const wr = rt.$('winRain');
  for (let i = 0; i < 140; i++) {
    const x = rnd(1070, 1350), y = rnd(-520, 580), l = rnd(10, 26);
    wr.appendChild(svgEl('line', { x1: x, y1: y, x2: x - 3, y2: y + l }));
  }

  // canvas: дождь + пыль в лунном луче
  const cv = rt.$<HTMLCanvasElement>('fx');
  const ctx = cv.getContext('2d')!;
  let W = 0, H = 0;
  let drops: any[] = [], dust: any[] = [];
  const resize = () => {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    drops = Array.from({ length: Math.round(W / 9) }, () => ({ x: rnd(0, W), y: rnd(0, H), l: rnd(10, 22), v: rnd(7, 13) }));
    dust = Array.from({ length: 60 }, () => ({ x: rnd(W * 0.5, W * 0.9), y: rnd(H * 0.3, H), r: rnd(0.5, 1.8), vx: rnd(-0.15, 0.15), vy: rnd(-0.2, 0.05), a: rnd(0.1, 0.5) }));
  };
  resize(); rt.on('resize', resize);
  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(180,190,210,.08)'; ctx.lineWidth = 1; ctx.beginPath();
    for (const d of drops) { ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 1.5, d.y + d.l); d.y += d.v; d.x -= 0.4; if (d.y > H) { d.y = -20; d.x = rnd(0, W); } }
    ctx.stroke();
    for (const p of dust) {
      ctx.fillStyle = `rgba(210,215,225,${p.a})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.y < H * 0.25 || p.x < W * 0.45 || p.x > W) { p.x = rnd(W * 0.55, W * 0.9); p.y = H; }
    }
    rt.raf(loop);
  };
  rt.raf(loop);

  // молния
  const flash = rt.$('flash');
  const thunder = () => rt.timeout(() => {
    flash.classList.remove('on'); void (flash as HTMLElement).offsetWidth; flash.classList.add('on');
    thunder();
  }, rnd(7000, 16000));
  thunder();

  // лёгкий параллакс
  const room = root.querySelector('#room') as HTMLElement | null;
  if (room) {
    rt.on('mousemove', e => {
      const x = (e.clientX / innerWidth - 0.5) * -14, y = (e.clientY / innerHeight - 0.5) * -10;
      room.style.transform = `translate(${x}px,${y}px)`;
    });
  }
};

// ------------------------------------------------------------
// CHAPTER 1: «Часы остановились» — циферблат, дождь, молния, пыль в свете лампы
// ------------------------------------------------------------
export const manorCh1Fx: SceneEffect = rt => {
  // книги на полках
  const g = rt.$('books');
  const cols = ['#2a1914', '#1f1512', '#2e1d15', '#1a1411', '#33211a', '#241a14', '#3a1d17', '#1c1613'];
  for (let s = 0; s < 7; s++) {
    const base = 150 + s * 95;
    g.appendChild(svgEl('rect', { x: 670, y: base, width: 330, height: 8, fill: '#0a0706' }));
    let x = 680;
    while (x < 990) {
      const w = 7 + Math.random() * 12, h = 52 + Math.random() * 28;
      if (Math.random() < 0.06) { x += 14; continue; }
      const b = svgEl('rect', { x, y: base - h, width: w, height: h, fill: cols[Math.floor(Math.random() * cols.length)] });
      if (Math.random() < 0.05) b.setAttribute('transform', `rotate(8 ${x} ${base})`);
      g.appendChild(b);
      if (Math.random() < 0.4) g.appendChild(svgEl('rect', { x: x + 1, y: base - h + 8, width: w - 2, height: 1.5, fill: 'rgba(180,140,90,.18)' }));
      x += w + 1;
    }
  }

  // деления и римские цифры циферблата
  const ct = rt.$('gcTicks'), cn = rt.$('gcNums');
  const cx = 120, cy = 252;
  for (let i = 0; i < 60; i++) {
    const a = i * Math.PI / 30, hr = i % 5 === 0, r1 = hr ? 45 : 49, r2 = 53;
    ct.appendChild(svgEl('line', {
      x1: cx + Math.sin(a) * r1, y1: cy - Math.cos(a) * r1,
      x2: cx + Math.sin(a) * r2, y2: cy - Math.cos(a) * r2,
      'stroke-width': hr ? (i % 15 === 0 ? 2.6 : 1.8) : 0.7
    }));
  }
  ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].forEach((r, i) => {
    const a = i * Math.PI / 6, rr = 36;
    const tx = svgEl('text', { x: cx + Math.sin(a) * rr, y: cy - Math.cos(a) * rr, 'font-size': r.length > 2 ? 8 : 10 });
    tx.textContent = r;
    cn.appendChild(tx);
  });

  // дождь на стекле окна
  const wr = rt.$('winrain');
  for (let i = 0; i < 70; i++) {
    const len = 8 + Math.random() * 16, x = 430 + Math.random() * 200, y = 110 - len;
    const l = svgEl('line', { x1: x, y1: y, x2: x - 1.5, y2: y + len });
    const dur = 0.6 + Math.random() * 0.7;
    (l as SVGElement).style.animationDuration = dur + 's';
    (l as SVGElement).style.animationDelay = (-Math.random() * dur) + 's';
    wr.appendChild(l);
  }

  // молния
  const flash = rt.$('flash'), wf = rt.$('winflash'), gf = rt.$('gcFlash');
  const strike = () => {
    ([[0, 0.9], [80, 0.1], [160, 0.6], [260, 0]] as Array<[number, number]>).forEach(([t, o]) => rt.timeout(() => {
      (flash as HTMLElement).style.opacity = String(o);
      wf.setAttribute('opacity', String(o * 0.35));
      gf.setAttribute('opacity', String(o * 0.08));
    }, t));
    rt.timeout(strike, 7000 + Math.random() * 11000);
  };
  rt.timeout(strike, 3500);

  // пыль в свете лампы
  const dust = rt.$('dust');
  for (let i = 0; i < 22; i++) {
    const d = document.createElement('span'); d.className = 'dust';
    d.style.left = (Math.random() * 35) + 'vw'; d.style.top = (55 + Math.random() * 40) + 'vh';
    d.style.animationDuration = (10 + Math.random() * 14) + 's'; d.style.animationDelay = (-Math.random() * 20) + 's';
    dust.appendChild(d);
  }
};

// ------------------------------------------------------------
// CHAPTER 2: «Номер четырнадцать» — зола и искры камина, потёки на окне, молния
// ------------------------------------------------------------
export const manorCh2Fx: SceneEffect = rt => {
  const c = rt.$<HTMLCanvasElement>('fx');
  const ctx = c.getContext('2d')!;
  let W = 0, H = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); rt.on('resize', resize);

  const ash: any[] = [];
  const spawn = () => {
    const ember = Math.random() < 0.25;
    ash.push({ x: Math.random() * W * 0.45, y: H + 10, vx: (Math.random() - 0.3) * 0.35, vy: -(0.2 + Math.random() * 0.6), r: ember ? 1 + Math.random() * 1.3 : 0.8 + Math.random() * 1.8, life: 0, max: 400 + Math.random() * 500, ember, ph: Math.random() * 6 });
  };
  const frame = () => {
    ctx.clearRect(0, 0, W, H);
    if (ash.length < 70 && Math.random() < 0.5) spawn();
    for (let i = ash.length - 1; i >= 0; i--) {
      const p = ash[i]; p.life++; p.ph += 0.02;
      p.x += p.vx + Math.sin(p.ph) * 0.25; p.y += p.vy;
      const t = p.life / p.max, al = Math.sin(Math.PI * Math.min(t, 1));
      if (p.ember) {
        ctx.fillStyle = 'rgba(235,120,60,' + (al * 0.8) + ')';
        ctx.shadowColor = 'rgba(235,110,50,.8)'; ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = 'rgba(150,140,130,' + (al * 0.35) + ')'; ctx.shadowBlur = 0;
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      if (t >= 1 || p.y < -10) ash.splice(i, 1);
    }
    ctx.shadowBlur = 0;
    rt.raf(frame);
  };
  rt.raf(frame);

  // потёки на стекле окна
  const g = rt.$('streaks');
  for (let i = 0; i < 40; i++) {
    const x = 30 + Math.random() * 240, y = Math.random() * 520;
    const l = svgEl('line', { x1: x, y1: y, x2: x - 2, y2: y + 8 + Math.random() * 18 });
    (l as SVGElement).style.transition = 'none';
    g.appendChild(l);
  }
  rt.interval(() => {
    Array.from(g.children as HTMLCollection).forEach((l: Element) => {
      let y = +l.getAttribute('y1')! + 6; if (y > 520) y = 0;
      const len = (+l.getAttribute('y2')!) - (+l.getAttribute('y1')!);
      l.setAttribute('y1', String(y)); l.setAttribute('y2', String(y + len));
    });
  }, 60);

  // молния
  const win = rt.$('win');
  const strike = () => {
    const on = () => win.classList.add('flash'), off = () => win.classList.remove('flash');
    on(); rt.timeout(off, 90); rt.timeout(on, 180); rt.timeout(off, 300);
    rt.timeout(strike, 7000 + Math.random() * 12000);
  };
  rt.timeout(strike, 4000);
};
