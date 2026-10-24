export default function ViktorScene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 105%, rgba(150,62,30,.28), transparent 70%), ' +
            'radial-gradient(ellipse 50% 60% at 85% 20%, rgba(60,40,32,.35), transparent 70%), ' +
            'linear-gradient(180deg,#0a0807 0%,#140e0b 55%,#0c0908 100%)'
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="vkSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#040508" />
            <stop offset=".55" stopColor="#0e1117" />
            <stop offset="1" stopColor="#1b1613" />
          </linearGradient>
          <linearGradient id="vkWarm" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd79a" />
            <stop offset=".6" stopColor="#f0a65a" />
            <stop offset="1" stopColor="#c9713a" />
          </linearGradient>
          <linearGradient id="vkGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#17130f" />
            <stop offset="1" stopColor="#0a0909" />
          </linearGradient>
          <linearGradient id="vkRefl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f0a65a" stopOpacity=".5" />
            <stop offset="1" stopColor="#f0a65a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vkCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe2b0" stopOpacity=".28" />
            <stop offset="1" stopColor="#ffe2b0" stopOpacity="0" />
          </linearGradient>
          <pattern id="vkBrick" width="40" height="20" patternUnits="userSpaceOnUse">
            <rect width="40" height="20" fill="#1e1814" />
            <path d="M0 .5H40M0 10.5H40M20 0V10M0 10V20M40 10V20" stroke="#14100d" strokeWidth="1" />
          </pattern>
          <pattern id="vkStripe" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="15" height="30" fill="#6a261c" />
            <rect x="15" width="15" height="30" fill="#4c1a13" />
          </pattern>
          <filter id="vkBlur6"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="vkBlur20"><feGaussianBlur stdDeviation="20" /></filter>
          <filter id="vkNeon" x="-20%" y="-60%" width="140%" height="220%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Машина (как в макете) */}
          <g id="vk-car">
            <ellipse cx="132" cy="96" rx="145" ry="8" fill="#000" opacity=".6" />
            <path d="M4 78 L4 56 Q6 44 24 42 L64 38 L98 14 Q104 9 114 9 L176 9 Q187 9 194 16 L226 40 L250 44 Q262 47 262 60 L262 78 Z" fill="currentColor" />
            <path d="M106 18 L138 18 L138 38 L80 38 Z" fill="#0b0e12" />
            <path d="M146 18 L176 18 Q182 18 186 24 L198 38 L146 38 Z" fill="#0b0e12" />
            <path d="M24 44 L64 40 L98 16 Q104 11 114 11 L176 11 Q186 11 193 18 L226 42" stroke="#ffffff" strokeOpacity=".14" strokeWidth="2" fill="none" />
            <path d="M112 12 L160 12" stroke="#ffcf86" strokeOpacity=".3" strokeWidth="2" />
            <path d="M10 60 H256" stroke="#000" strokeOpacity=".35" strokeWidth="2" />
            <path d="M140 42 V74" stroke="#000" strokeOpacity=".3" strokeWidth="1.5" />
            <rect x="4" y="50" width="6" height="9" rx="1" fill="#7a1d14" />
            <rect x="254" y="52" width="8" height="6" rx="1" fill="#a39a88" opacity=".6" />
            <circle cx="62" cy="80" r="19" fill="#070707" />
            <circle cx="62" cy="80" r="8" fill="#2c2b2a" />
            <circle cx="206" cy="80" r="19" fill="#070707" />
            <circle cx="206" cy="80" r="8" fill="#2c2b2a" />
          </g>
        </defs>

        <rect width="1600" height="900" fill="url(#vkSky)" />
        <g filter="url(#vkBlur20)" fill="#1d2129" opacity=".75">
          <ellipse cx="220" cy="120" rx="320" ry="70" />
          <ellipse cx="700" cy="80" rx="380" ry="80" />
          <ellipse cx="1250" cy="140" rx="420" ry="90" />
          <ellipse cx="950" cy="240" rx="300" ry="50" fill="#171a21" />
          <ellipse cx="380" cy="270" rx="260" ry="45" fill="#171a21" />
        </g>

        <path d="M0 700 V610 H70 V570 H140 V625 H200 V545 H270 V700 Z" fill="#0b0c10" />
        <path d="M960 700 V585 H1040 V520 H1120 V600 H1200 V480 H1260 V466 H1300 V480 H1320 V560 H1420 V605 H1500 V540 H1600 V700 Z" fill="#0b0c10" />
        <g fill="#d9a060" opacity=".35">
          <rect x="90" y="585" width="6" height="8" />
          <rect x="220" y="560" width="6" height="8" />
          <rect x="236" y="590" width="6" height="8" />
          <rect x="1060" y="540" width="6" height="8" />
          <rect x="1215" y="500" width="6" height="8" />
          <rect x="1235" y="530" width="6" height="8" />
          <rect x="1275" y="490" width="5" height="7" />
          <rect x="1520" y="560" width="6" height="8" />
          <rect x="1440" y="620" width="6" height="8" />
        </g>

        <rect x="0" y="700" width="1600" height="32" fill="#1a1512" />
        <rect x="0" y="730" width="1600" height="170" fill="url(#vkGround)" />
        <path d="M0 731 H1600" stroke="#2a221d" strokeWidth="2" />

        <ellipse cx="620" cy="620" rx="440" ry="150" fill="#f0a65a" opacity=".13" filter="url(#vkBlur20)" />

        <rect x="260" y="430" width="720" height="280" fill="url(#vkBrick)" />
        <rect x="248" y="416" width="744" height="18" fill="#110d0b" />
        <rect x="260" y="434" width="720" height="5" fill="#000" opacity=".4" />
        <rect x="260" y="690" width="720" height="20" fill="#120e0c" />

        <path d="M470 412 V416 M770 412 V416" stroke="#0d0a09" strokeWidth="8" />
        <rect x="400" y="330" width="440" height="84" rx="4" fill="#0e0a09" stroke="#2a1f1a" />
        <text x="620" y="380" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="700" fontSize="38" letterSpacing="2" fill="#ff7a5c" filter="url(#vkNeon)">
          ПОСЛЕДНИЙ УЖИН
        </text>
        <text x="620" y="402" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="10" letterSpacing="6" fill="#a39a92">
          РЕСТОРАН · С 1962
        </text>
        <ellipse cx="620" cy="372" rx="240" ry="60" fill="#ff7a5c" opacity=".12" filter="url(#vkBlur20)" />

        <polygon points="280,490 960,490 948,462 292,462" fill="url(#vkStripe)" />
        <rect x="280" y="489" width="680" height="5" fill="#000" opacity=".5" />

        <g>
          <rect x="300" y="505" width="165" height="155" fill="url(#vkWarm)" />
          <rect x="485" y="505" width="160" height="155" fill="url(#vkWarm)" />
          <rect x="765" y="505" width="175" height="155" fill="url(#vkWarm)" />
          <rect x="668" y="520" width="72" height="170" fill="url(#vkWarm)" opacity=".92" />
        </g>

        <g fill="#3a2212" opacity=".78">
          <rect x="318" y="612" width="70" height="5" />
          <rect x="350" y="617" width="5" height="43" />
          <circle cx="330" cy="583" r="9" />
          <path d="M318 612 Q318 594 330 594 Q342 594 342 612 Z" />
          <circle cx="378" cy="586" r="8" />
          <path d="M367 612 Q367 596 378 596 Q389 596 389 612 Z" />
          <rect x="408" y="620" width="44" height="5" />
          <rect x="428" y="625" width="4" height="35" />
          <circle cx="520" cy="562" r="9" />
          <rect x="509" y="572" width="22" height="56" rx="8" />
          <rect x="511" y="624" width="7" height="36" />
          <rect x="522" y="624" width="7" height="36" />
          <rect x="560" y="615" width="70" height="5" />
          <rect x="592" y="620" width="5" height="40" />
          <circle cx="612" cy="586" r="8" />
          <path d="M601 615 Q601 597 612 597 Q623 597 623 615 Z" />
          <rect x="765" y="600" width="175" height="60" />
          <path d="M775 545 H930 M775 570 H930" stroke="#3a2212" strokeWidth="3" />
          <rect x="785" y="530" width="5" height="15" />
          <rect x="796" y="533" width="5" height="12" />
          <rect x="820" y="528" width="6" height="17" />
          <rect x="880" y="531" width="5" height="14" />
          <rect x="905" y="555" width="5" height="15" />
          <rect x="915" y="558" width="5" height="12" />
          <circle cx="852" cy="578" r="9" />
          <path d="M838 600 Q838 588 852 588 Q866 588 866 600 Z" />
          <circle cx="700" cy="590" r="8" />
          <path d="M688 640 Q688 600 700 600 Q712 600 712 640 Z" />
        </g>

        <g>
          <g stroke="#3a2212" strokeWidth="1.5">
            <path d="M345 505 V528 M420 505 V528 M530 505 V528 M605 505 V528 M810 505 V522 M890 505 V522" />
          </g>
          <g fill="#fff0c8" opacity=".6" filter="url(#vkBlur6)">
            <circle cx="345" cy="532" r="12" />
            <circle cx="420" cy="532" r="12" />
            <circle cx="530" cy="532" r="12" />
            <circle cx="605" cy="532" r="12" />
            <circle cx="810" cy="526" r="12" />
            <circle cx="890" cy="526" r="12" />
          </g>
          <g fill="#fffaf0">
            <circle cx="345" cy="532" r="4.5" />
            <circle cx="420" cy="532" r="4.5" />
            <circle cx="530" cy="532" r="4.5" />
            <circle cx="605" cy="532" r="4.5" />
            <circle cx="810" cy="526" r="4.5" />
            <circle cx="890" cy="526" r="4.5" />
          </g>
        </g>

        <g stroke="#0e0a08" fill="none">
          <rect x="300" y="505" width="165" height="155" strokeWidth="7" />
          <rect x="485" y="505" width="160" height="155" strokeWidth="7" />
          <rect x="765" y="505" width="175" height="155" strokeWidth="7" />
          <rect x="668" y="520" width="72" height="170" strokeWidth="6" />
          <path d="M300 545 H465 M382 545 V660 M485 545 H645 M565 545 V660 M765 545 H940 M852 545 V660" strokeWidth="4" />
          <path d="M704 520 V690" strokeWidth="3" />
        </g>

        <g fill="#f0a65a" opacity=".22" filter="url(#vkBlur6)">
          <polygon points="300,710 465,710 500,732 270,732" />
          <polygon points="485,710 645,710 680,732 455,732" />
          <polygon points="765,710 940,710 975,732 735,732" />
          <polygon points="668,710 740,710 790,732 618,732" />
        </g>

        <g opacity=".55" filter="url(#vkBlur6)">
          <rect x="300" y="736" width="165" height="120" fill="url(#vkRefl)" />
          <rect x="485" y="736" width="160" height="120" fill="url(#vkRefl)" />
          <rect x="668" y="736" width="72" height="150" fill="url(#vkRefl)" />
          <rect x="765" y="736" width="175" height="120" fill="url(#vkRefl)" />
        </g>

        <polygon points="1052,466 1078,466 1190,810 940,810" fill="url(#vkCone)" />
        <ellipse cx="1065" cy="805" rx="140" ry="18" fill="#ffe2b0" opacity=".12" filter="url(#vkBlur6)" />
        <rect x="996" y="470" width="7" height="262" fill="#0d0c0c" />
        <path d="M1000 474 Q1000 455 1028 455 H1060" stroke="#0d0c0c" strokeWidth="5" fill="none" />
        <path d="M1045 452 H1085 L1078 465 H1052 Z" fill="#151312" />
        <circle cx="1065" cy="468" r="40" fill="#ffe2b0" opacity=".35" filter="url(#vkBlur20)" />
        <ellipse cx="1065" cy="466" rx="12" ry="3" fill="#fff3d6" />

        <rect x="1556" y="600" width="6" height="132" fill="#0d0c0c" />
        <rect x="1532" y="560" width="54" height="54" rx="6" fill="#22324a" stroke="#d8d2c8" strokeOpacity=".5" strokeWidth="2" />
        <text x="1559" y="600" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="34" fill="#ece4dc">
          P
        </text>

        <g stroke="#d8d2c8" strokeOpacity=".22" strokeWidth="3">
          <path d="M1045 740 L1035 800 M1335 740 L1328 800 M1600 740 L1596 800" />
          <path d="M995 815 L980 898 M1320 815 L1310 898" />
        </g>

        <g opacity=".1">
          <ellipse cx="540" cy="800" rx="130" ry="10" fill="#f0a65a" />
          <ellipse cx="1180" cy="885" rx="110" ry="7" fill="#ffe2b0" />
          <ellipse cx="160" cy="840" rx="90" ry="7" fill="#c9d2e0" />
        </g>

        {/* Используем одинаковую машину 4 раза, как в макете */}
        <use href="#vk-car" color="#3b2723" transform="translate(1062 700)" />
        <use href="#vk-car" color="#1f2a33" transform="translate(1345 704)" />
        <use href="#vk-car" color="#2b2b30" transform="translate(1005 782) scale(1.18)" />
        <use href="#vk-car" color="#3a3530" transform="translate(1330 790) scale(1.15)" />

        <g stroke="#c9d2e0" strokeOpacity=".15" strokeWidth="1">
          <line x1="400" y1="300" x2="398" y2="340" />
          <line x1="550" y1="250" x2="548" y2="290" />
          <line x1="700" y1="300" x2="698" y2="350" />
          <line x1="900" y1="280" x2="898" y2="320" />
          <line x1="1100" y1="320" x2="1098" y2="360" />
          <line x1="1300" y1="270" x2="1298" y2="310" />
        </g>
      </svg>
    </div>
  );
}