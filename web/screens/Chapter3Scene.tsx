export default function Chapter3Scene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 110%, #1a0f0b 0%, transparent 60%), ' +
            'linear-gradient(180deg,#0a0807 0%,#120d0b 55%,#0b0807 100%)'
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          right: '-8%',
          width: '62vw',
          height: '90vh',
          background:
            'radial-gradient(closest-side, rgba(92,110,128,.16), rgba(60,72,86,.06) 55%, transparent 80%)',
          filter: 'blur(10px)'
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          right: '-20%',
          width: '90vw',
          height: '140vh',
          transform: 'rotate(-18deg)',
          background:
            'repeating-linear-gradient(180deg, rgba(120,138,156,.05) 0 26px, transparent 26px 58px)',
          maskImage:
            'radial-gradient(ellipse 55% 45% at 65% 35%, #000 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 55% 45% at 65% 35%, #000 0%, transparent 75%)'
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          left: '-12%',
          bottom: '-25%',
          width: '70vw',
          height: '80vh',
          background:
            'radial-gradient(closest-side, rgba(200,85,61,.22), rgba(150,60,35,.08) 50%, transparent 78%)'
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ch3wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c0908" />
            <stop offset=".7" stopColor="#15100d" />
            <stop offset="1" stopColor="#0e0a08" />
          </linearGradient>
          <linearGradient id="ch3door" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1c1511" />
            <stop offset="1" stopColor="#0f0b09" />
          </linearGradient>
          <linearGradient id="ch3inside" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#050303" />
            <stop offset=".6" stopColor="#0b0807" />
            <stop offset="1" stopColor="#120d0b" />
          </linearGradient>
          <linearGradient id="ch3wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1a13" />
            <stop offset=".35" stopColor="#1e130e" />
            <stop offset="1" stopColor="#0c0806" />
          </linearGradient>
          <linearGradient id="ch3paperL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8f8470" />
            <stop offset=".8" stopColor="#b3a78e" />
            <stop offset="1" stopColor="#6e6452" />
          </linearGradient>
          <linearGradient id="ch3paperR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6e6452" />
            <stop offset=".12" stopColor="#b8ab91" />
            <stop offset="1" stopColor="#9c907a" />
          </linearGradient>
          <linearGradient id="ch3brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8d7650" />
            <stop offset=".45" stopColor="#5a4830" />
            <stop offset=".7" stopColor="#9a8258" />
            <stop offset="1" stopColor="#3e3120" />
          </linearGradient>
          <radialGradient id="ch3spill" cx=".6" cy=".3" r=".6">
            <stop offset="0" stopColor="rgba(110,125,140,.14)" />
            <stop offset="1" stopColor="rgba(110,125,140,0)" />
          </radialGradient>
          <radialGradient id="ch3tableLight" cx=".72" cy=".35" r=".55">
            <stop offset="0" stopColor="rgba(180,150,120,.12)" />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <filter id="ch3soft"><feGaussianBlur stdDeviation="10" /></filter>
          <filter id="ch3softer"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        <rect width="1600" height="900" fill="url(#ch3wall)" />
        <rect x="0" y="470" width="1600" height="3" fill="#1d1511" />
        <g stroke="#120d0a" strokeWidth="2">
          <line x1="120" y1="473" x2="120" y2="640" />
          <line x1="360" y1="473" x2="360" y2="640" />
          <line x1="600" y1="473" x2="600" y2="640" />
        </g>

        <g>
          <rect x="1262" y="118" width="170" height="540" fill="#15100d" stroke="#241b16" strokeWidth="2" />
          <rect x="1276" y="132" width="142" height="512" fill="#120d0b" stroke="#1e1612" />
          <g stroke="#0a0706" strokeWidth="4">
            <line x1="1300" y1="160" x2="1394" y2="160" />
            <line x1="1300" y1="172" x2="1394" y2="172" />
            <line x1="1300" y1="184" x2="1394" y2="184" />
            <line x1="1300" y1="196" x2="1394" y2="196" />
          </g>
          <rect x="1400" y="360" width="6" height="36" rx="2" fill="#3a2e24" />
        </g>

        <g>
          <rect x="930" y="110" width="320" height="560" fill="#17110e" stroke="#2a201b" strokeWidth="2" />
          <rect x="948" y="128" width="284" height="524" fill="url(#ch3inside)" />
          <rect x="948" y="226" width="284" height="8" fill="#241a15" />
          <rect x="970" y="176" width="70" height="50" fill="#1b1411" stroke="#2a201a" />
          <rect x="1048" y="190" width="54" height="36" fill="#18120f" stroke="#261d18" />
          <rect x="1160" y="160" width="44" height="66" fill="#1a1310" stroke="#2a211b" />
          <rect x="954" y="262" width="272" height="4" fill="#2c221c" />
          <path d="M1075 266 l0 -8 a6 6 0 1 1 6 -6" fill="none" stroke="#3a2f27" strokeWidth="2" />
          <path d="M1040 290 L1078 270 L1116 290 L1128 470 L1100 480 L1098 330 L1092 520 L1062 520 L1058 330 L1056 480 L1028 470 Z" fill="#140f0c" stroke="#231a15" />
          <line x1="1190" y1="300" x2="1170" y2="610" stroke="#2e231b" strokeWidth="6" />
          <path d="M1150 600 L1190 600 L1205 650 L1135 650 Z" fill="#231a13" />
          <path d="M975 600 L1045 600 L1038 650 L982 650 Z" fill="#1a1411" stroke="#2a211b" />
          <rect x="930" y="110" width="320" height="560" fill="url(#ch3spill)" />
          <polygon points="930,110 812,70 812,712 930,670" fill="url(#ch3door)" stroke="#2a201b" strokeWidth="2" />
          <polygon points="918,130 826,98 826,690 918,652" fill="none" stroke="#1f1814" strokeWidth="2" />
          <g stroke="#0a0706" strokeWidth="4">
            <line x1="845" y1="140" x2="905" y2="160" />
            <line x1="845" y1="154" x2="905" y2="173" />
            <line x1="845" y1="168" x2="905" y2="186" />
            <line x1="845" y1="182" x2="905" y2="199" />
          </g>
          <rect x="830" y="370" width="5" height="40" rx="2" fill="#3a2e24" />
        </g>

        <path d="M0 640 L1600 600 L1600 900 L0 900 Z" fill="url(#ch3wood)" />
        <path d="M0 640 L1600 600" stroke="#3a2419" strokeWidth="2" opacity=".7" />
        <g stroke="#120b08" strokeWidth="1.5" fill="none" opacity=".7">
          <path d="M0 680 C400 668 900 660 1600 640" />
          <path d="M0 730 C500 715 1000 705 1600 690" />
          <path d="M0 790 C450 780 1100 760 1600 750" />
          <path d="M0 850 C600 835 1000 830 1600 815" />
        </g>
        <path d="M0 640 L1600 600 L1600 900 L0 900 Z" fill="url(#ch3tableLight)" />

        <ellipse cx="1160" cy="790" rx="300" ry="70" fill="#000" opacity=".6" filter="url(#ch3soft)" />
        <polygon points="870,690 1146,662 1406,676 1440,858 1150,834 856,866" fill="#2a1612" stroke="#3a1f18" />
        <polygon points="890,692 1142,670 1152,822 872,852" fill="url(#ch3paperL)" />
        <polygon points="1142,670 1392,684 1422,846 1152,822" fill="url(#ch3paperR)" />
        <line x1="1142" y1="670" x2="1152" y2="822" stroke="#3e352a" strokeWidth="2" />
        <g stroke="#6e6452" strokeWidth="1" opacity=".45">
          <line x1="900" y1="720" x2="1135" y2="702" />
          <line x1="897" y1="750" x2="1137" y2="731" />
          <line x1="893" y1="780" x2="1139" y2="760" />
          <line x1="889" y1="810" x2="1142" y2="790" />
          <line x1="1160" y1="704" x2="1392" y2="716" />
          <line x1="1161" y1="736" x2="1397" y2="748" />
          <line x1="1163" y1="768" x2="1403" y2="780" />
          <line x1="1164" y1="800" x2="1408" y2="812" />
        </g>
        <g stroke="#4a3e33" strokeWidth="1.6" fill="none" opacity=".55" strokeLinecap="round">
          <path d="M910 715 q10 -6 20 0 t20 0 t20 0 t20 -1 t20 0 t20 -1 t20 0 t20 -1" />
          <path d="M908 745 q10 -6 20 0 t20 0 t20 -1 t20 0 t20 -1 t20 0 t20 -1 t20 0 t20 0" />
          <path d="M905 775 q10 -6 20 0 t20 0 t20 -1 t20 0 t20 -1 t20 0" />
          <path d="M902 805 q10 -6 20 0 t20 0 t20 -1 t20 0 t20 -1 t20 0 t20 -1 t20 0" />
        </g>
        <text x="1000" y="700" fontFamily="Caveat, cursive" fontSize="16" fill="#4a3e33" opacity=".7" transform="rotate(-4 1000 700)">
          14 ноября
        </text>
        <g transform="translate(1166 700) rotate(2.6) skewX(5)" fontFamily="Caveat, cursive" fontWeight="600" fill="#2e211a">
          <text x="0" y="16" fontSize="27">Сегодня я скажу</text>
          <text x="0" y="50" fontSize="27">правду...</text>
          <path d="M70 82 q20 -8 40 0" stroke="#2e211a" strokeWidth="1.4" fill="none" opacity=".6" />
        </g>
        <polygon points="890,692 1142,670 1392,684 1422,846 1152,822 872,852" fill="url(#ch3tableLight)" opacity=".4" />

        <g transform="translate(700 790) rotate(-14)">
          <g transform="translate(8 14)" opacity=".7" filter="url(#ch3softer)">
            <circle cx="0" cy="0" r="32" fill="none" stroke="#000" strokeWidth="12" />
            <rect x="30" y="-6" width="175" height="12" fill="#000" />
          </g>
          <circle cx="0" cy="0" r="32" fill="none" stroke="url(#ch3brass)" strokeWidth="11" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#4a3b26" strokeWidth="3" />
          <rect x="30" y="-11" width="12" height="22" rx="2" fill="url(#ch3brass)" />
          <rect x="42" y="-6" width="160" height="12" rx="3" fill="url(#ch3brass)" />
          <rect x="60" y="-8" width="6" height="16" rx="1" fill="#6b5738" />
          <rect x="166" y="4" width="14" height="30" fill="url(#ch3brass)" />
          <rect x="186" y="4" width="12" height="20" fill="url(#ch3brass)" />
          <rect x="170" y="18" width="6" height="6" fill="#1e130e" />
          <line x1="46" y1="-4" x2="198" y2="-4" stroke="#b39a6c" strokeWidth="1.2" opacity=".5" />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,8,7,.88) 0%, rgba(10,8,7,.6) 38%, rgba(10,8,7,.1) 62%, transparent 75%), ' +
            'linear-gradient(180deg, rgba(10,8,7,.55) 0%, transparent 30%)'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 75% at 50% 45%, transparent 40%, rgba(0,0,0,.75) 100%)'
        }}
      />
    </div>
  );
}