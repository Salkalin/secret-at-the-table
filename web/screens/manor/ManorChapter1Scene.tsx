import { useMemo } from 'react';
import { useIsDesktop, useLightning } from './shared';

export function ManorChapter1Scene() {
  const isDesktop = useIsDesktop(640);
  const flash = useLightning();

  // Генерация книг и стрелок часов (чтобы не хардкодить)
  const books = useMemo(() => {
    const ns = 'http://www.w3.org/2000/svg';
    const cols = ['#2a1914', '#1f1512', '#2e1d15', '#1a1411', '#33211a', '#241a14', '#3a1d17', '#1c1613'];
    const els = [];
    for (let s = 0; s < 7; s++) {
      const base = 150 + s * 95;
      let x = 680;
      while (x < 990) {
        const w = 7 + Math.random() * 12, h = 52 + Math.random() * 28;
        if (Math.random() < .06) { x += 14; continue; }
        const fill = cols[Math.floor(Math.random() * cols.length)];
        els.push(<rect key={`b${s}-${x}`} x={x} y={base - h} width={w} height={h} fill={fill} />);
        x += w + 1;
      }
    }
    return els;
  }, []);

  const ticks = useMemo(() => {
    const els = [];
    const cx = 120, cy = 252;
    for (let i = 0; i < 60; i++) {
      const a = i * Math.PI / 30, hr = i % 5 === 0, r1 = hr ? 45 : 49, r2 = 53;
      els.push(
        <line key={`t${i}`}
          x1={cx + Math.sin(a) * r1} y1={cy - Math.cos(a) * r1}
          x2={cx + Math.sin(a) * r2} y2={cy - Math.cos(a) * r2}
          strokeWidth={hr ? (i % 15 === 0 ? 2.6 : 1.8) : .7}
        />
      );
    }
    return els;
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] bg-[#0d0a09] overflow-hidden">
      {/* Lightning Flash Overlay */}
      <div className="absolute inset-0 bg-[#b9c6d2] transition-opacity duration-75 pointer-events-none z-10" style={{ opacity: flash * 0.35 }} />

      {/* Main SVG Scene */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMaxYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1c2328" /><stop offset="1" stopColor="#0c0f12" />
          </linearGradient>
          <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#140f0d" /><stop offset="1" stopColor="#070505" />
          </linearGradient>
          <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2a1a13" /><stop offset=".5" stopColor="#4a2e20" /><stop offset="1" stopColor="#2a1a13" />
          </linearGradient>
          <clipPath id="winclip"><path d="M430 560 V230 Q430 130 525 130 Q620 130 620 230 V560 Z" /></clipPath>
        </defs>

        <rect width="1000" height="800" fill="url(#sky)" />
        
        {/* Wall panels */}
        <g stroke="#1d1715" strokeWidth="2" fill="none">
          <rect x="30" y="600" width="220" height="130" /><rect x="270" y="600" width="140" height="130" />
        </g>

        {/* Window */}
        <path d="M430 560 V230 Q430 130 525 130 Q620 130 620 230 V560 Z" fill="#0c0f12" />
        <g clipPath="url(#winclip)">
          <circle cx="580" cy="200" r="60" fill="rgba(160,175,185,.06)" />
          <path d="M430 520 L470 470 L505 500 L545 440 L585 490 L620 460 V560 H430Z" fill="#0a0c0e" />
          {/* Здесь должен быть дождь, но для точности макета оставим просто окно */}
        </g>
        <g stroke="#0e0b0a" strokeWidth="7" fill="none">
          <path d="M430 560 V230 Q430 130 525 130 Q620 130 620 230 V560 Z" />
          <line x1="525" y1="130" x2="525" y2="560" />
          <line x1="430" y1="300" x2="620" y2="300" /><line x1="430" y1="430" x2="620" y2="430" />
        </g>
        <rect x="418" y="556" width="214" height="12" fill="#0e0b0a" />

        {/* Curtains */}
        <path d="M405 110 Q420 330 398 590 L440 590 Q455 330 440 110 Z" fill="#1f1210" />
        <path d="M645 110 Q630 330 652 590 L610 590 Q595 330 610 110 Z" fill="#1f1210" />
        <rect x="390" y="100" width="270" height="10" rx="4" fill="#120d0b" />

        {/* Bookshelves */}
        <rect x="670" y="60" width="330" height="700" fill="#120d0b" />
        <g>{books}</g>

        {/* Floor */}
        <rect x="0" y="730" width="1000" height="70" fill="url(#floor)" />

        {/* Armchair + table */}
        <g fill="#0b0807">
          <path d="M520 730 V610 Q520 560 560 552 Q600 546 640 552 Q680 560 680 610 V730 Z" />
          <path d="M505 730 V650 Q505 628 528 628 Q545 628 545 650 V730Z" fill="#100b09" />
          <path d="M655 730 V650 Q655 628 675 628 Q695 628 695 650 V730Z" fill="#100b09" />
          <rect x="440" y="660" width="54" height="6" fill="#140e0c" />
          <rect x="464" y="666" width="6" height="64" fill="#140e0c" />
          <path d="M458 660 Q455 640 460 632 H474 Q479 640 476 660Z" fill="none" stroke="rgba(200,140,90,.35)" strokeWidth="1.5" />
          <path d="M459 650 Q467 654 475 650 L476 660 H458Z" fill="rgba(160,80,40,.35)" />
        </g>
      </svg>

      {/* Grandfather Clock (Left) */}
      <svg className="absolute bottom-0 left-[max(20px,calc((100vw-1200px)/2+20px))] h-[min(88vh,920px)] aspect-[240/1000] pointer-events-none" viewBox="0 0 240 1000" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="gcWood" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2e1c13" /><stop offset=".3" stopColor="#5a3826" /><stop offset=".55" stopColor="#6e4630" /><stop offset="1" stopColor="#2a1911" />
          </linearGradient>
          <linearGradient id="gcWoodDark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22150e" /><stop offset=".5" stopColor="#452a1c" /><stop offset="1" stopColor="#1e120c" />
          </linearGradient>
          <radialGradient id="gcFace" cx=".45" cy=".4"><stop offset="0" stopColor="#eadbbd" /><stop offset=".7" stopColor="#c9b28b" /><stop offset="1" stopColor="#8f7757" /></radialGradient>
          <linearGradient id="gcBrass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e2c48c" /><stop offset=".5" stopColor="#b08a55" /><stop offset="1" stopColor="#6e5232" />
          </linearGradient>
        </defs>
        <circle cx="120" cy="245" r="170" fill="rgba(230,170,110,.15)" />
        <path d="M34 168 Q120 70 206 168 V182 H34Z" fill="url(#gcWood)" stroke="#8a6444" strokeWidth="1.5" />
        <path d="M52 166 Q120 94 188 166" fill="none" stroke="#2a1911" strokeWidth="2" />
        <circle cx="120" cy="96" r="7" fill="url(#gcBrass)" /><rect x="117" y="100" width="6" height="12" fill="#8a6444" />
        <circle cx="40" cy="158" r="5" fill="url(#gcBrass)" /><circle cx="200" cy="158" r="5" fill="url(#gcBrass)" />
        <rect x="30" y="180" width="180" height="8" fill="#2a1911" />
        <rect x="42" y="188" width="156" height="128" fill="url(#gcWood)" stroke="#8a6444" strokeWidth="1.5" />
        <rect x="48" y="192" width="8" height="120" fill="#2a1911" /><rect x="184" y="192" width="8" height="120" fill="#2a1911" />
        <circle cx="120" cy="252" r="62" fill="url(#gcBrass)" /><circle cx="120" cy="252" r="57" fill="url(#gcFace)" />
        <g stroke="#2a1c14" strokeLinecap="round">{ticks}</g>
        
        {/* Hands: 00:14 */}
        <path d="M120 264 L115.5 252 L120 218 L124.5 252 Z" fill="#1a100b" transform="rotate(7 120 252)" />
        <path d="M120 268 L117.5 252 L120 199 L122.5 252 Z" fill="#1a100b" transform="rotate(84 120 252)" />
        <line x1="120" y1="262" x2="120" y2="203" stroke="#c85a3a" strokeWidth="1" transform="rotate(252 120 252)" />
        <circle cx="120" cy="252" r="3.5" fill="#c85a3a" /><circle cx="120" cy="252" r="1.3" fill="#1a100b" />
        <path d="M82 222 Q100 204 124 200" fill="none" stroke="rgba(255,240,215,.28)" strokeWidth="3" strokeLinecap="round" />
        <rect x="36" y="316" width="168" height="10" fill="#2a1911" stroke="#8a6444" strokeWidth="1" />
        <rect x="62" y="326" width="116" height="452" fill="url(#gcWood)" stroke="#6b4a32" strokeWidth="1.5" />
        <path d="M84 740 V372 Q84 346 120 346 Q156 346 156 372 V740 Z" fill="#120a07" stroke="url(#gcBrass)" strokeWidth="2" />
        <line x1="98" y1="330" x2="98" y2="470" stroke="#b08a55" strokeWidth="1" /><line x1="142" y1="330" x2="142" y2="500" stroke="#b08a55" strokeWidth="1" />
        <rect x="92" y="470" width="12" height="54" rx="2" fill="url(#gcBrass)" /><rect x="136" y="500" width="12" height="54" rx="2" fill="url(#gcBrass)" />
        <g>
          <line x1="120" y1="330" x2="120" y2="656" stroke="url(#gcBrass)" strokeWidth="2.5" />
          <circle cx="120" cy="680" r="25" fill="url(#gcBrass)" stroke="#e2c48c" strokeWidth="1.5" />
          <circle cx="120" cy="680" r="16" fill="none" stroke="rgba(60,40,20,.45)" strokeWidth="1" />
          <circle cx="113" cy="672" r="6" fill="rgba(255,235,200,.45)" />
        </g>
        <rect x="46" y="778" width="148" height="10" fill="#2a1911" stroke="#8a6444" strokeWidth="1" />
        <rect x="40" y="788" width="160" height="176" fill="url(#gcWoodDark)" stroke="#6b4a32" strokeWidth="1.5" />
        <rect x="58" y="808" width="124" height="136" fill="none" stroke="#6b4a32" strokeWidth="1.2" />
        <rect x="92" y="862" width="56" height="18" rx="2" fill="url(#gcBrass)" />
        <text x="120" y="872" fill="#2a1a10" fontSize="9" textAnchor="middle" dominantBaseline="central">00:14</text>
        <rect x="30" y="964" width="180" height="16" fill="url(#gcWood)" stroke="#8a6444" strokeWidth="1" />
      </svg>

      {/* Left shade to ensure text readability */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,9,0.95)_0%,rgba(13,10,9,0.8)_30%,rgba(13,10,9,0.2)_60%,transparent_100%)] pointer-events-none" />
    </div>
  );
}