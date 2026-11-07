import type { SceneEffect } from '../HtmlScene';
import { svgEl } from '../sceneUtils';

// Универсальный финал «Последнее слово»: бумаги и фото на столе и полу, дождь в окне, гроза.
// Перенесено из макета «последнее слово (универсальное для каждой игры)».
export const finalFx: SceneEffect = rt => {
  const sheet = (parent: Element, x: number, y: number, rot: number, type: string, flat: boolean, dim?: number) => {
    const g = svgEl('g', { transform: `translate(${x} ${y})${flat ? ' scale(1 .5)' : ''} rotate(${rot})`, opacity: dim || 1 }, parent);
    if (type === 'photo') {
      svgEl('rect', { x: -19, y: -15, width: 38, height: 30, fill: '#d6c9ae' }, g);
      svgEl('rect', { x: -15, y: -11, width: 30, height: 20, fill: '#2b2622' }, g);
      svgEl('circle', { cx: 0, cy: -3, r: 4, fill: '#5a5048' }, g);
      svgEl('rect', { x: -6, y: 1, width: 12, height: 8, fill: '#5a5048' }, g);
    } else {
      svgEl('rect', { x: -24, y: -17, width: 48, height: 34, fill: '#bdae90' }, g);
      svgEl('path', { d: 'M-18 -9H14M-18 -3H18M-18 3H10M-18 9H16', stroke: '#6d604c', 'stroke-width': 1.2 }, g);
    }
  };

  const ti = rt.$('tableItems');
  ([[650, 540, -8, 'p'], [560, 590, 15, 'p'], [845, 588, 5, 'p'], [985, 556, -18, 'p'], [1036, 596, 22, 'p'], [742, 560, 12, 'p'],
    [620, 580, -12, 'photo'], [700, 586, 8, 'photo'], [880, 560, -5, 'photo'], [952, 590, 14, 'photo'], [766, 598, -20, 'photo'], [832, 540, 24, 'photo']] as Array<[number, number, number, string]>)
    .forEach(s => sheet(ti, s[0], s[1], s[2], s[3], true));
  // бумага, свисающая с края стола
  sheet(ti, 900, 612, 6, 'p', false);

  const fi = rt.$('floorItems');
  ([[430, 770, 25, 'p'], [620, 810, -14, 'p'], [710, 860, 40, 'photo'], [930, 800, -30, 'p'], [1120, 770, 12, 'photo'], [1215, 850, -8, 'p'], [350, 850, -35, 'photo'], [820, 760, 60, 'p'], [520, 720, -5, 'photo']] as Array<[number, number, number, string]>)
    .forEach(s => sheet(fi, s[0], s[1], s[2], s[3], true, 0.55));

  // дождь в окне
  const wr = rt.$('winRain');
  for (let i = 0; i < 46; i++) {
    const x = 1212 + Math.random() * 146, y = 90 + Math.random() * 380;
    svgEl('line', { x1: x, y1: y, x2: x - 3, y2: y + 18 }, wr);
  }

  // гроза за окном
  const flash = rt.$('flash'), bolt = rt.$('bolt'), boltGlow = rt.$('boltGlow'), flashRoom = rt.$('flashRoom');
  const makeBolt = () => {
    let x = 1225 + Math.random() * 120, y = 150, d = `M${x} ${y}`;
    while (y < 330 + Math.random() * 40) { y += 12 + Math.random() * 16; x += (Math.random() - 0.5) * 26; d += `L${x.toFixed(1)} ${y.toFixed(1)}`; }
    return d;
  };
  const setL = (v: number, b: number) => {
    flash.setAttribute('opacity', String(v * 0.75));
    flashRoom.setAttribute('opacity', String(0.06 + v * 0.22));
    bolt.setAttribute('opacity', String(b));
    boltGlow.setAttribute('opacity', String(b * 0.7));
  };
  const strike = () => {
    const d = makeBolt(); bolt.setAttribute('d', d); boltGlow.setAttribute('d', d);
    const seq: Array<[number, number, number]> = [[1, 1, 0], [0.2, 0, 70], [0.85, 1, 130], [0.4, 0.5, 210], [0.15, 0, 300], [0, 0, 420]];
    if (Math.random() < 0.4) seq.splice(4, 0, [0.6, 0.8, 360]);
    seq.forEach(s => rt.timeout(() => setL(s[0], s[1]), s[2]));
    rt.timeout(strike, 3000 + Math.random() * 7000);
  };
  rt.timeout(strike, 1500);
};
