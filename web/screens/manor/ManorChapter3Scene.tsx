import { useIsDesktop, useLightning } from './shared';

export function ManorChapter3Scene() {
  const isDesktop = useIsDesktop(640);
  const flash = useLightning();

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] bg-[#0c0a09] overflow-hidden">
      <div className="absolute inset-0 bg-[#b9c6d2] transition-opacity duration-75 pointer-events-none z-10" style={{ opacity: flash * 0.35 }} />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMaxYMax slice">
        <defs>
          <linearGradient id="wall3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#130e0b" /><stop offset="1" stopColor="#0e0a08" />
          </linearGradient>
          <filter id="uvf"><feColorMatrix type="matrix" values="0.20 0.30 0.08 0 0.02  0.14 0.22 0.06 0 0.01  0.34 0.54 0.16 0 0.08  0 0 0 1 0"/></filter>
          <linearGradient id="cone" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#b9a9ff" stopOpacity=".42"/><stop offset=".5" stopColor="#9483ec" stopOpacity=".14"/><stop offset="1" stopColor="#7a6ad8" stopOpacity=".04"/>
          </linearGradient>
        </defs>

        <rect width="1000" height="800" fill="url(#wall3)" />

        {/* Painting */}
        <g transform="translate(550 50)">
          <rect x="0" y="10" width="260" height="200" rx="3" fill="#24160f" />
          <rect x="8" y="18" width="244" height="184" fill="#3a2518" />
          <rect x="16" y="26" width="228" height="168" fill="#0d0a0c" />
          <g>
            <rect x="20" y="30" width="220" height="160" fill="#7d8b96" />
            <circle cx="190" cy="70" r="14" fill="#f1e6cf" opacity="0.7" />
            <rect x="20" y="30" width="220" height="160" fill="#9d8cf0" opacity="0.22" style={{ mixBlendMode: 'screen' }} />
          </g>
          {/* UV Cone */}
          <polygon points="-40,250 0,0 340,40 340,260 -20,270" fill="url(#cone)" opacity="0.6" style={{ mixBlendMode: 'screen' }} />
        </g>

        {/* Desk */}
        <rect x="-2400" y="448" width="5600" height="220" fill="#22160f" />
        <rect x="-2400" y="448" width="5600" height="5" fill="#2e1e14" />
        
        {/* Bottle */}
        <g transform="translate(700 220)">
          <path d="M0 0 L0 64 Q0 88 14 96 L16 130 L26 130 L28 96 Q42 88 42 64 L42 0 Z" fill="#3a1a09" />
          <rect x="14" y="130" width="14" height="15" rx="2" fill="#3b2a1d" />
        </g>
      </svg>
      
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,9,0.95)_0%,rgba(13,10,9,0.8)_30%,rgba(13,10,9,0.2)_60%,transparent_100%)] pointer-events-none" />
    </div>
  );
}