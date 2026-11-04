import { useMemo } from 'react';
import { useIsDesktop, useLightning } from './shared';

export function ManorChapter2Scene() {
  const isDesktop = useIsDesktop(640);
  const flash = useLightning();

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] bg-[#0d0907] overflow-hidden">
      <div className="absolute inset-0 bg-[#b9c6d2] transition-opacity duration-75 pointer-events-none z-10" style={{ opacity: flash * 0.35 }} />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMaxYMax slice">
        <defs>
          <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b333c" /><stop offset=".6" stopColor="#171b20" /><stop offset="1" stopColor="#0e1013" />
          </linearGradient>
          <clipPath id="glass2"><path d="M30 520V150A120 120 0 0 1 270 150V520Z" /></clipPath>
          <linearGradient id="wall2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#140f0d" /><stop offset="1" stopColor="#1f1714" />
          </linearGradient>
        </defs>

        {/* Wall */}
        <rect width="1000" height="800" fill="url(#wall2)" />
        <g stroke="#2a201c" strokeWidth="2" fill="none" opacity=".6">
          <line x1="0" y1="560" x2="1000" y2="560" />
          <rect x="420" y="580" width="180" height="50" /><rect x="640" y="580" width="180" height="50" /><rect x="860" y="580" width="180" height="50" />
        </g>

        {/* Window */}
        <g transform="translate(780 60) scale(0.8)">
          <path d="M1066 574 V210 A144 144 0 0 1 1354 210 V574 Z" fill="#0c0908" />
          <g clipPath="url(#glass2)">
            <rect x="1080" y="60" width="260" height="520" fill="url(#sky2)" />
            <circle cx="1255" cy="235" r="34" fill="#dcd8cc" opacity=".85" />
            <path d="M1080 560 V470 Q1100 440 1115 465 Q1130 420 1150 455 Q1170 430 1185 470 L1200 480 Q1230 450 1250 475 Q1275 430 1300 468 Q1320 445 1340 470 V560Z" fill="#0a0c10" />
          </g>
          <g stroke="#0c0908" strokeWidth="12" fill="none">
            <path d="M1080 560 V210 A130 130 0 0 1 1340 210 V560 Z" />
            <line x1="1210" y1="80" x2="1210" y2="560" /><line x1="1080" y1="300" x2="1340" y2="300" /><line x1="1080" y1="430" x2="1340" y2="430" />
          </g>
        </g>

        {/* Painting */}
        <g transform="translate(550 80)">
          <rect x="0" y="10" width="260" height="200" rx="3" fill="#24160f" />
          <rect x="8" y="18" width="244" height="184" fill="#3a2518" />
          <rect x="16" y="26" width="228" height="168" fill="#0d0a0c" />
          <rect x="20" y="30" width="220" height="160" fill="#7d8b96" />
          <circle cx="190" cy="70" r="14" fill="#f1e6cf" opacity="0.7" />
          <path d="M20 110 L60 90 L100 100 L150 80 L200 95 L240 85 L240 130 L20 130Z" fill="#b8c2c7" />
          <path d="M20 130 C70 118 130 124 180 120 C220 116 240 124 240 124 L240 150 L20 150Z" fill="#e8ecec" />
          <path d="M60 190 C90 160 150 145 200 142 C230 140 250 145 250 145 L250 200 L20 200Z" fill="#f2f4f2" />
          <text x="130" y="130" fontSize="90" fontFamily="Caveat, cursive" fontWeight="700" textAnchor="middle" fill="#8a1a10">?</text>
          <text x="130" y="175" fontSize="24" fontFamily="Caveat, cursive" fontWeight="700" textAnchor="middle" fill="#8a1a10">копия?</text>
        </g>

        {/* Fireplace */}
        <g transform="translate(80 500)">
          <rect x="0" y="0" width="260" height="220" fill="#1a1210" stroke="#2b1f19" strokeWidth="2" />
          <rect x="20" y="20" width="220" height="180" fill="#0b0807" stroke="#2b1f19" strokeWidth="2" />
          <ellipse cx="130" cy="180" rx="70" ry="14" fill="#3a1c0e" opacity="0.7" />
          <ellipse cx="130" cy="176" rx="44" ry="8" fill="#c4531a" opacity="0.6" className="animate-pulse" />
          <ellipse cx="130" cy="172" rx="22" ry="4" fill="#f0a35a" opacity="0.75" className="animate-pulse" />
        </g>

        {/* Desk */}
        <g transform="translate(700 700)">
          <rect x="0" y="0" width="300" height="16" fill="#2a1d13" stroke="#3a2a1c" strokeWidth="1" />
          <rect x="10" y="16" width="10" height="70" fill="#1a1210" /><rect x="280" y="16" width="10" height="70" fill="#1a1210" />
          <path d="M70 -2 L130 -10 L190 -2 L190 6 L130 0 L70 6 Z" fill="#d9c9a8" />
        </g>
      </svg>
      
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,9,0.95)_0%,rgba(13,10,9,0.8)_30%,rgba(13,10,9,0.2)_60%,transparent_100%)] pointer-events-none" />
    </div>
  );
}