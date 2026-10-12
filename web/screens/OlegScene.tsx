export default function OlegScene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="olBricks" width="84" height="40" patternUnits="userSpaceOnUse">
            <rect width="84" height="40" fill="#1a0f0c" />
            <rect x="1" y="1" width="80" height="17" rx="1" fill="#2a1914" />
            <rect x="-41" y="21" width="80" height="17" rx="1" fill="#27170f" />
            <rect x="43" y="21" width="80" height="17" rx="1" fill="#2d1a14" />
          </pattern>
          <radialGradient id="olWallGlow" cx="1075" cy="360" r="420" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffb070" stopOpacity=".42" />
            <stop offset=".35" stopColor="#c9673c" stopOpacity=".16" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="olCone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffc58a" stopOpacity=".22" />
            <stop offset="1" stopColor="#ffc58a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="olCoat" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3b2a21" />
            <stop offset=".35" stopColor="#1c1411" />
            <stop offset="1" stopColor="#0a0706" />
          </linearGradient>
          <linearGradient id="olFace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8a5a3f" />
            <stop offset=".6" stopColor="#3a241a" />
            <stop offset="1" stopColor="#140c09" />
          </linearGradient>
          <linearGradient id="olAsphalt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#151010" />
            <stop offset="1" stopColor="#070505" />
          </linearGradient>
          <radialGradient id="olSmokeG">
            <stop offset="0" stopColor="#d8cfc6" stopOpacity=".6" />
            <stop offset="1" stopColor="#d8cfc6" stopOpacity="0" />
          </radialGradient>
          <filter id="olBlur3"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id="olBlur6"><feGaussianBlur stdDeviation="6" /></filter>
          <filter id="olBlur20"><feGaussianBlur stdDeviation="20" /></filter>
          <filter id="olGrain">
            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>

        {/* Стена */}
        <rect width="1600" height="720" fill="url(#olBricks)" />
        <rect width="1600" height="720" filter="url(#olGrain)" opacity=".5" />
        <path d="M1320 0 L1340 0 L1350 720 L1310 720Z" fill="#000" opacity=".25" />
        <ellipse cx="900" cy="640" rx="160" ry="60" fill="#000" opacity=".3" filter="url(#olBlur20)" />

        {/* Труба */}
        <rect x="1390" y="0" width="16" height="720" fill="#120c0a" />
        <rect x="1386" y="120" width="24" height="8" fill="#1d1411" />
        <rect x="1386" y="420" width="24" height="8" fill="#1d1411" />
        <path d="M1390 700 L1406 700 L1420 730 L1380 730Z" fill="#120c0a" />

        {/* Вентиляция */}
        <rect x="720" y="210" width="150" height="100" rx="3" fill="#161010" stroke="#241815" />
        <g stroke="#241815" strokeWidth="3">
          <line x1="735" y1="230" x2="855" y2="230" />
          <line x1="735" y1="250" x2="855" y2="250" />
          <line x1="735" y1="270" x2="855" y2="270" />
          <line x1="735" y1="290" x2="855" y2="290" />
        </g>

        {/* Свет на стене */}
        <rect width="1600" height="720" fill="url(#olWallGlow)" />

        {/* Дверь */}
        <rect x="992" y="392" width="166" height="310" fill="#0c0808" />
        <rect x="1000" y="400" width="150" height="300" fill="#1e1715" />
        <rect x="1000" y="400" width="150" height="300" fill="url(#olWallGlow)" opacity=".6" />
        <rect x="1040" y="430" width="70" height="60" fill="#2c1e15" stroke="#0c0808" strokeWidth="4" />
        <rect x="1040" y="430" width="70" height="60" fill="#e79a5c" opacity=".12" />
        <g stroke="#0c0808" strokeWidth="1" opacity=".7">
          <line x1="1063" y1="430" x2="1063" y2="490" />
          <line x1="1087" y1="430" x2="1087" y2="490" />
          <line x1="1040" y1="450" x2="1110" y2="450" />
          <line x1="1040" y1="470" x2="1110" y2="470" />
        </g>
        <rect x="1030" y="530" width="90" height="28" rx="2" fill="#2e2320" />
        <text x="1075" y="548" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="9" letterSpacing="1.5" fill="#8f7a6c">СЛУЖЕБНЫЙ</text>
        <rect x="1130" y="580" width="12" height="4" rx="2" fill="#5a4a40" />

        {/* Лампа */}
        <rect x="1071" y="320" width="8" height="18" fill="#0e0909" />
        <path d="M1058 338 L1092 338 L1086 358 L1064 358Z" fill="#1a1210" />
        <circle cx="1075" cy="360" r="40" fill="#ffb778" opacity=".35" filter="url(#olBlur20)" />
        <ellipse cx="1075" cy="360" rx="11" ry="6" fill="#ffe2b8" />
        <polygon points="1062,360 1088,360 1340,800 820,800" fill="url(#olCone)" />

        {/* Крыльцо */}
        <rect x="900" y="700" width="420" height="16" fill="#2a2320" />
        <rect x="900" y="700" width="420" height="3" fill="#6b5446" opacity=".6" />
        <rect x="920" y="716" width="390" height="34" fill="#1d1816" />
        <rect x="940" y="750" width="360" height="34" fill="#171311" />

        {/* Перила */}
        <g fill="#0f0a09">
          <rect x="1310" y="600" width="6" height="184" />
          <rect x="1310" y="600" width="80" height="5" />
          <rect x="1384" y="600" width="6" height="200" />
          <rect x="912" y="610" width="5" height="92" />
          <rect x="912" y="610" width="70" height="4" />
        </g>

        {/* Мусорные баки */}
        <rect x="780" y="620" width="92" height="100" rx="3" fill="#141c18" />
        <rect x="774" y="612" width="104" height="14" rx="3" fill="#1a2420" />
        <rect x="780" y="620" width="92" height="100" fill="url(#olWallGlow)" opacity=".4" />
        <path d="M676 640 L752 640 L746 720 L682 720Z" fill="#11100f" />
        <ellipse cx="714" cy="640" rx="40" ry="7" fill="#1b1716" />

        {/* Земля */}
        <rect y="784" width="1600" height="116" fill="url(#olAsphalt)" />
        <rect y="720" width="920" height="64" fill="#110c0b" />
        <rect x="1310" y="720" width="290" height="64" fill="#110c0b" />
        <ellipse cx="1075" cy="840" rx="210" ry="18" fill="#ffb778" opacity=".12" filter="url(#olBlur6)" />
        <ellipse cx="1080" cy="842" rx="6" ry="22" fill="#ffd9a8" opacity=".25" filter="url(#olBlur3)" />
        <ellipse cx="620" cy="860" rx="160" ry="10" fill="#6a5a50" opacity=".12" filter="url(#olBlur6)" />

        {/* Окурки */}
        <g>
          <g transform="translate(1180 698) rotate(-12)">
            <rect width="10" height="3" fill="#d8d0c4" />
            <rect width="4" height="3" fill="#c9884f" />
          </g>
          <g transform="translate(1270 699) rotate(18)">
            <rect width="9" height="3" fill="#cfc6ba" />
            <rect width="4" height="3" fill="#c07c47" />
          </g>
          <g transform="translate(1212 747) rotate(-30)">
            <rect width="10" height="3" fill="#bdb4a8" />
            <rect width="4" height="3" fill="#b37242" />
          </g>
          <g transform="translate(1150 781) rotate(8)">
            <rect width="9" height="3" fill="#a79e93" />
            <rect width="4" height="3" fill="#a3683d" />
          </g>
          <g transform="translate(1250 780) rotate(-6)">
            <rect width="10" height="3" fill="#b0a79b" />
            <rect width="4" height="3" fill="#a86b3f" />
          </g>
        </g>

        {/* Человек */}
        <g>
          <ellipse cx="1228" cy="703" rx="70" ry="6" fill="#000" opacity=".55" filter="url(#olBlur3)" />
          <path d="M1196 620 L1222 620 L1220 694 L1200 694Z" fill="#110c0b" />
          <path d="M1232 620 L1258 620 L1262 694 L1240 694Z" fill="#0b0807" />
          <path d="M1196 620 L1204 620 L1203 694 L1200 694Z" fill="#3a2a22" opacity=".6" />
          <path d="M1188 690 L1222 690 L1222 702 L1182 702 Q1182 693 1188 690Z" fill="#070505" />
          <path d="M1238 690 L1268 690 Q1276 694 1276 702 L1238 702Z" fill="#070505" />
          <path d="M1190 468 Q1226 456 1264 468 L1280 540 L1290 638 L1168 638 L1176 540 Z" fill="url(#olCoat)" />
          <path d="M1226 470 L1226 638" stroke="#000" strokeWidth="1.5" opacity=".6" />
          <path d="M1210 466 L1226 520 L1242 466" fill="none" stroke="#000" strokeWidth="2" opacity=".5" />
          <path d="M1202 452 L1212 476 L1226 468 L1240 476 L1250 452 L1244 470 L1226 462 L1208 470Z" fill="#1c1411" />
          <path d="M1262 478 L1276 560 L1268 596" fill="none" stroke="#0c0908" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="1217" y="444" width="16" height="16" fill="#2a1a13" />
          <ellipse cx="1225" cy="428" rx="21" ry="26" fill="url(#olFace)" />
          <path d="M1203 424 Q1202 398 1226 398 Q1250 398 1248 426 Q1244 410 1226 410 Q1210 410 1203 424Z" fill="#0d0908" />
          <g transform="rotate(-4 1225 408)">
            <ellipse cx="1226" cy="414" rx="30" ry="5" fill="#000" opacity=".45" filter="url(#olBlur3)" />
            <path d="M1204 408 Q1203 390 1207 382 Q1216 376 1226 380 Q1236 376 1245 382 Q1249 390 1248 408 Z" fill="url(#olCoat)" />
            <path d="M1204 408 Q1203 399 1204 396 L1248 396 Q1249 400 1248 408 Z" fill="#0a0605" />
            <path d="M1190 409 Q1195 402 1226 402 Q1257 402 1262 409 Q1256 414 1226 413 Q1196 414 1190 409 Z" fill="#150f0d" />
          </g>
          <path d="M1194 480 L1182 546 L1206 478" fill="none" stroke="url(#olCoat)" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="1207" cy="473" r="7" fill="#6d4630" />
          <line x1="1210" y1="470" x2="1224" y2="464" stroke="#e8e0d4" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="1225" cy="463.5" r="9" fill="#ff7a3a" opacity=".35" filter="url(#olBlur3)" />
          <circle cx="1225" cy="463.5" r="2.2" fill="#ff8a45" />
        </g>

        <rect y="860" width="1600" height="40" fill="#000" opacity=".5" />
      </svg>
    </div>
  );
}