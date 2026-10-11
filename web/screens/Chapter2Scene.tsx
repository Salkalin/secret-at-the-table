export default function Chapter2Scene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 110%, #1a120e 0%, transparent 60%), ' +
            'linear-gradient(180deg,#0a0807 0%,#110c0a 55%,#0d0908 100%)'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(90deg, rgba(255,220,180,.018) 0 2px, transparent 2px 46px), ' +
            'repeating-linear-gradient(90deg, rgba(0,0,0,.25) 0 1px, transparent 1px 23px)',
          maskImage: 'linear-gradient(180deg,#000 0%,#000 58%,transparent 66%)',
          WebkitMaskImage: 'linear-gradient(180deg,#000 0%,#000 58%,transparent 66%)'
        }}
      />
      <div
        className="absolute"
        style={{
          top: '62%',
          bottom: 0,
          left: 0,
          right: 0,
          background:
            'linear-gradient(180deg, rgba(60,36,24,.35) 0 2px, transparent 2px), ' +
            'repeating-linear-gradient(90deg, rgba(0,0,0,.35) 0 2px, transparent 2px 140px), ' +
            'linear-gradient(180deg,#140d0a 0%,#0b0807 100%)'
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          background:
            'radial-gradient(42vmax 34vmax at 72% 30%, rgba(214,150,88,.16) 0%, rgba(160,96,52,.07) 35%, transparent 70%)'
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: '72%',
          top: '21%',
          width: 'min(62vw, 820px)',
          height: '62vh',
          transform: 'translateX(-50%)',
          background:
            'linear-gradient(180deg, rgba(232,176,112,.16) 0%, rgba(214,150,88,.07) 55%, rgba(214,150,88,0) 100%)',
          clipPath: 'polygon(46% 0,54% 0,100% 100%,0 100%)',
          filter: 'blur(18px)',
          mixBlendMode: 'screen'
        }}
      />

      <svg
        className="absolute"
        style={{
          left: '72%',
          bottom: '-2%',
          transform: 'translateX(-50%)',
          width: 'min(70vw, 900px)'
        }}
        viewBox="0 0 900 340"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ch2cloth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a2a22" />
            <stop offset=".35" stopColor="#1c1411" />
            <stop offset="1" stopColor="#0b0807" />
          </linearGradient>
          <radialGradient id="ch2top" cx=".5" cy=".4" r=".6">
            <stop offset="0" stopColor="#6b4c38" />
            <stop offset=".6" stopColor="#2e211b" />
            <stop offset="1" stopColor="#150f0c" />
          </radialGradient>
          <linearGradient id="ch2glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0e1a12" />
            <stop offset=".35" stopColor="#2a3d2c" />
            <stop offset=".5" stopColor="#6b7e5c" stopOpacity=".7" />
            <stop offset=".65" stopColor="#1c2a1d" />
            <stop offset="1" stopColor="#08100a" />
          </linearGradient>
          <linearGradient id="ch2wine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6e1a1c" />
            <stop offset="1" stopColor="#2a0708" />
          </linearGradient>
          <radialGradient id="ch2ashtray" cx=".5" cy=".35" r=".7">
            <stop offset="0" stopColor="#5a4f47" />
            <stop offset=".7" stopColor="#2a2320" />
            <stop offset="1" stopColor="#141010" />
          </radialGradient>
          <filter id="ch2smoke">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="ch2ember">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <style>{`
          @keyframes ch2sway { 0%, 100% { transform: skewX(0deg) } 30% { transform: skewX(-6deg) } 70% { transform: skewX(5deg) } }
          @keyframes ch2rise {
            0% { transform: translate(0,24px) scale(.55,.7); opacity: 0 }
            20% { opacity: .34 }
            60% { opacity: .18 }
            100% { transform: translate(-12px,-78px) scale(1.7,1.35); opacity: 0 }
          }
          @keyframes ch2ember { 0%, 100% { opacity: .75 } 45% { opacity: 1 } 60% { opacity: .6 } }
          .ch2-stream { transform-box: fill-box; transform-origin: 50% 100%; animation: ch2sway 5s ease-in-out infinite; }
          .ch2-wisp { stroke: #d9cfc4; opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; animation: ch2rise 7s ease-out infinite; }
          .ch2-w2 { animation-delay: 1.75s; animation-duration: 7.6s; }
          .ch2-w3 { animation-delay: 3.5s; animation-duration: 6.8s; }
          .ch2-w4 { animation-delay: 5.25s; animation-duration: 8s; }
          .ch2-ember { animation: ch2ember 2.6s ease-in-out infinite; }
        `}</style>

        <path d="M90 140 L90 330 M150 140 L150 330 M90 140 Q120 120 150 140 M90 200 L150 200" stroke="#0f0b09" strokeWidth="10" strokeLinecap="round" />
        <path d="M750 130 L750 330 M810 130 L810 330 M750 130 Q780 110 810 130 M750 195 L810 195" stroke="#0f0b09" strokeWidth="10" strokeLinecap="round" />

        <path d="M160 190 Q450 160 740 190 L770 330 L130 330 Z" fill="url(#ch2cloth)" />
        <path d="M210 250 Q220 290 205 330 M330 240 Q340 290 325 330 M470 238 Q480 290 468 330 M600 242 Q610 290 598 330 M700 250 Q708 290 700 330" stroke="#0a0706" strokeWidth="3" opacity=".6" />
        <ellipse cx="450" cy="190" rx="292" ry="34" fill="url(#ch2top)" />

        <ellipse cx="360" cy="198" rx="62" ry="11" fill="#8a7a6a" opacity=".55" />
        <ellipse cx="360" cy="197" rx="42" ry="7" fill="#b3a393" opacity=".35" />

        <path d="M600 208 l14 -4 l-4 8z M628 212 l10 2 l-8 5z M585 214 l8 -2 l2 6z M645 204 l6 3 l-7 2z" fill="#a89888" opacity=".55" />

        <g>
          <path d="M470 196 L470 110 Q470 92 482 84 L482 42 L494 42 L494 84 Q506 92 506 110 L506 196 Q488 202 470 196 Z" fill="url(#ch2glass)" />
          <rect x="480" y="36" width="16" height="8" rx="1.5" fill="#4a1414" />
          <rect x="474" y="130" width="28" height="34" fill="#c9b79c" opacity=".55" />
          <rect x="478" y="138" width="20" height="2" fill="#3a2a22" opacity=".7" />
          <rect x="478" y="146" width="14" height="1.5" fill="#3a2a22" opacity=".6" />
          <path d="M497 96 L497 190" stroke="#e8d3b0" strokeWidth="1.5" opacity=".35" />
        </g>
        <rect x="524" y="197" width="14" height="6" rx="2" fill="#8a6a48" transform="rotate(-12 531 200)" />

        <g>
          <path d="M410 128 Q410 162 426 166 L426 192 L412 196 L444 196 L430 192 L430 166 Q446 162 446 128 Z" fill="#d8c8b0" opacity=".14" stroke="#d8c8b0" strokeOpacity=".3" />
          <path d="M412 146 Q414 162 426 164 L430 164 Q442 162 444 146 Z" fill="url(#ch2wine)" opacity=".9" />
        </g>
        <g>
          <path d="M548 132 Q548 164 563 168 L563 192 L550 196 L580 196 L567 192 L567 168 Q582 164 582 132 Z" fill="#d8c8b0" opacity=".1" stroke="#d8c8b0" strokeOpacity=".25" />
        </g>
        <ellipse cx="455" cy="206" rx="22" ry="4" fill="#4a0e10" opacity=".7" />

        <g>
          <ellipse cx="238" cy="204" rx="26" ry="6" fill="#0a0706" opacity=".6" />
          <path d="M213 199 Q214 206 238 207 Q262 206 263 199 Z" fill="#1c1715" />
          <ellipse cx="238" cy="199" rx="25" ry="5.5" fill="url(#ch2ashtray)" stroke="#6e625a" strokeOpacity=".45" strokeWidth=".8" />
          <ellipse cx="238" cy="199.5" rx="17" ry="3.4" fill="#0f0c0b" />
          <ellipse cx="234" cy="200" rx="6" ry="1.4" fill="#6b645e" opacity=".7" />
          <path d="M240 199.5 L249 198.5" stroke="#b9a58a" strokeWidth="2.2" strokeLinecap="round" opacity=".6" />
          <circle cx="249.5" cy="198.4" r="1.1" fill="#2a2320" />
        </g>

        <g>
          <line x1="226" y1="197" x2="236" y2="195.6" stroke="#c28a52" strokeWidth="3" strokeLinecap="round" />
          <line x1="236" y1="195.6" x2="266" y2="191.4" stroke="#e8e0d4" strokeWidth="3" />
          <line x1="264" y1="191.7" x2="267.5" y2="191.2" stroke="#8a8078" strokeWidth="3" opacity=".8" />
          <circle className="ch2-ember" cx="268.4" cy="191.1" r="5" fill="#ff7a3c" opacity=".55" filter="url(#ch2ember)" />
          <circle className="ch2-ember" cx="268.4" cy="191.1" r="1.7" fill="#ffb070" />
        </g>

        <g filter="url(#ch2smoke)">
          <path className="ch2-stream" d="M268 189 C265 180 272 172 268 162 C264 152 271 144 267 134" stroke="#d9cfc4" strokeWidth="1.3" opacity=".32" fill="none" />
          <path className="ch2-wisp ch2-w1" d="M267 150 C261 138 274 128 266 114 C259 102 272 92 265 80" strokeWidth="3" fill="none" />
          <path className="ch2-wisp ch2-w2" d="M268 152 C274 140 262 130 270 116 C277 104 264 96 271 84" strokeWidth="3.6" fill="none" />
          <path className="ch2-wisp ch2-w3" d="M266 148 C260 136 272 126 264 112 C257 100 268 90 262 78" strokeWidth="2.6" fill="none" />
          <path className="ch2-wisp ch2-w4" d="M269 151 C275 139 263 127 271 113 C278 101 266 91 272 79" strokeWidth="4" fill="none" />
        </g>

        <rect x="300" y="160" width="8" height="30" fill="#b8a78e" opacity=".4" />
        <path d="M304 160 Q300 145 306 132 Q302 148 309 140" stroke="#8a8078" strokeWidth="1" opacity=".35" fill="none" />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 100% at 60% 40%, transparent 35%, rgba(0,0,0,.55) 75%, rgba(0,0,0,.9) 100%), ' +
            'linear-gradient(90deg, rgba(8,6,5,.92) 0%, rgba(8,6,5,.55) 38%, transparent 62%)'
        }}
      />
    </div>
  );
}