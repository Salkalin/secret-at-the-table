export default function IntroScene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* bg-base (радиальные градиенты) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 72% 8%, rgba(150,80,40,.22), transparent 65%), ' +
            'radial-gradient(ellipse 60% 50% at 10% 100%, rgba(90,20,15,.25), transparent 70%), ' +
            'linear-gradient(180deg, #140f0c 0%, #0d0a09 55%, #080606 100%)'
        }}
      />

      {/* window (левое окно) */}
      <div
        className="absolute opacity-90"
        style={{
          left: '6%',
          top: '9%',
          width: 'min(30vw, 380px)',
          aspectRatio: '3/4',
          border: '1px solid rgba(160,170,190,.06)',
          background:
            'linear-gradient(180deg, rgba(60,70,90,.12), rgba(20,24,32,.05))'
        }}
      >
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'rgba(160,170,190,.06)',
            transform: 'translateX(-50%)'
          }}
        />
        <div
          className="absolute"
          style={{
            top: '45%',
            left: 0,
            right: 0,
            height: 1,
            background: 'rgba(160,170,190,.06)'
          }}
        />
      </div>

      {/* kitchen SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        aria-hidden="true"
      >
        <style>{`
          @keyframes introCandle { 0%, 100% { opacity: 1 } 30% { opacity: .85 } 55% { opacity: .95 } 70% { opacity: .8 } }
          @keyframes introFlame { 0%, 100% { transform: scale(1,1) } 25% { transform: scale(.92,1.08) } 50% { transform: scale(1.05,.95) } 75% { transform: scale(.96,1.05) } }
          .intro-candle-glow { animation: introCandle 3.2s ease-in-out infinite; transform-origin: 1115px 738px; }
          .intro-flame { animation: introFlame 1.6s ease-in-out infinite; transform-origin: 1115px 742px; }
        `}</style>

        {/* Портрет шефа */}
        <g>
          <path d="M635 90L585 130M635 90L685 130" stroke="#2a201a" strokeWidth="1.5" />
          <circle cx="635" cy="90" r="3" fill="#3a2a1e" />
          <rect x="560" y="130" width="150" height="190" fill="#1f1611" stroke="#4a3322" strokeWidth="8" />
          <rect x="573" y="143" width="124" height="164" fill="#1a130f" stroke="#2e2118" strokeWidth="2" />
          <rect x="576" y="146" width="118" height="158" fill="url(#introPg)" />
          <path d="M590 304c4-34 22-48 45-48s41 14 45 48z" fill="#2c211a" />
          <path d="M618 262l17 22 17-22" stroke="#3b2d23" strokeWidth="2" />
          <ellipse cx="635" cy="232" rx="17" ry="21" fill="#3a2b21" />
          <rect x="619" y="200" width="32" height="10" fill="#4b433b" />
          <path d="M617 202c-10-4-10-24 4-24 2-10 26-12 28 0 14 0 14 20 4 24z" fill="#554c43" />
          <rect x="620" y="326" width="30" height="7" rx="1" fill="#6b4a2a" opacity=".7" />
          <defs>
            <radialGradient id="introPg" cx=".5" cy=".4" r=".7">
              <stop stopColor="#3a2618" />
              <stop offset="1" stopColor="#140e0b" />
            </radialGradient>
          </defs>
        </g>

        {/* Полка с кастрюлями */}
        <g opacity=".5">
          <rect x="760" y="250" width="560" height="6" fill="#1d1612" />
          <path d="M800 250v-40a30 30 0 0 1 60 0v40z" fill="#17120f" />
          <rect x="890" y="200" width="70" height="50" rx="4" fill="#17120f" />
          <path d="M1000 250l10-70h30l10 70z" fill="#1a1411" />
          <rect x="1090" y="215" width="90" height="35" rx="3" fill="#17120f" />
          <path d="M1220 250v-60h14v-10h12v10h14v60z" fill="#1a1411" />
        </g>

        {/* Подвешенные приборы */}
        <g stroke="#1f1814" strokeWidth="3" opacity=".7">
          <line x1="180" y1="580" x2="520" y2="580" />
          <line x1="220" y1="580" x2="220" y2="640" />
          <circle cx="220" cy="660" r="20" fill="#16110e" />
          <line x1="290" y1="580" x2="290" y2="690" />
          <ellipse cx="290" cy="700" rx="10" ry="14" fill="#16110e" />
          <line x1="360" y1="580" x2="360" y2="630" />
          <circle cx="360" cy="665" r="36" fill="#16110e" />
          <line x1="450" y1="580" x2="450" y2="680" />
          <path d="M440 680h20l-4 30h-12z" fill="#16110e" />
        </g>

        {/* Подставка для ножей */}
        <g opacity=".6">
          <rect x="1130" y="380" width="180" height="10" fill="#1d1612" />
          <path d="M1150 390h10v70l-5 12-5-12z" fill="#2a211c" />
          <path d="M1190 390h12v90l-6 14-6-14z" fill="#2a211c" />
          <path d="M1270 390h8v60l-4 10-4-10z" fill="#2a211c" />
          <rect x="1233" y="390" width="10" height="20" fill="#0f0b09" />
        </g>

        {/* Стол */}
        <path d="M560 780h640l40 120H520z" fill="#120d0b" />
        <path d="M560 780h640" stroke="#3a2418" strokeWidth="2" opacity=".6" />

        {/* Тарелка */}
        <ellipse cx="780" cy="805" rx="70" ry="12" fill="#1c1613" />
        <ellipse cx="780" cy="803" rx="44" ry="7" fill="#221a16" />
        <path d="M752 802c2-10 22-14 40-10 12 3 14 10 4 13-14 4-38 4-44-3z" fill="#4a2416" />
        <path d="M760 798c10-4 24-4 32 0" stroke="#6b3620" strokeWidth="1.5" />
        <circle cx="800" cy="800" r="4" fill="#2e3a1a" />
        <circle cx="806" cy="803" r="3" fill="#3a4820" />
        <path d="M770 806c8 2 20 2 28 0" stroke="#5a1510" strokeWidth="2" opacity=".7" />

        {/* Вилка и нож */}
        <path d="M700 812l-2 26M696 812v6M704 812v6" stroke="#4a4038" strokeWidth="2" />
        <path d="M858 812l3 26" stroke="#4a4038" strokeWidth="3" />

        {/* Ваза с фруктами */}
        <circle cx="632" cy="784" r="10" fill="#5a1a14" />
        <circle cx="650" cy="782" r="11" fill="#6b4a1a" />
        <circle cx="641" cy="774" r="9" fill="#3d4a1c" />
        <path d="M610 786h60c-4 18-18 22-30 22s-26-4-30-22z" fill="#2a1f19" />
        <path d="M610 786h60" stroke="#4a3528" strokeWidth="2" />

        {/* Бокал */}
        <path d="M708 736q0 30 14 32q14-2 14-32z" fill="#2a2320" opacity=".8" />
        <path d="M709 750q2 17 13 18q11-1 13-18z" fill="#5a1210" />
        <path d="M722 768v26" stroke="#2e2622" strokeWidth="2" />
        <ellipse cx="722" cy="796" rx="10" ry="2.5" fill="#2e2622" />
        <path d="M712 740q0 10 3 16" stroke="#6b6058" strokeWidth="1" opacity=".6" />

        {/* Бутылка */}
        <path d="M862 800v-62q0-14 9-20v-28h10v28q9 6 9 20v62z" fill="#1c0f0e" />
        <rect x="866" y="752" width="20" height="24" fill="#4a3a2a" opacity=".8" />
        <rect x="871" y="686" width="10" height="8" fill="#5a1a14" />
        <path d="M867 742v50" stroke="#5a4038" strokeWidth="1.5" opacity=".6" />

        {/* Опрокинутый бокал */}
        <path d="M930 800l70-18 6 8-40 18z" fill="#1d1715" opacity=".9" />
        <path d="M1004 786l24-4v12l-24 4z" fill="#1d1715" />
        <path d="M890 812c20-10 70-12 100-6 20 4 10 14-20 16-30 3-60 4-80-2-10-3-8-5 0-8z" fill="#4a0f0c" opacity=".7" />

        {/* Флакон с ядом */}
        <g>
          <ellipse cx="1055" cy="801" rx="30" ry="5" fill="#6fae4a" opacity=".12" />
          <ellipse cx="1055" cy="801" rx="17" ry="3" fill="#0a0806" />
          <path d="M1050 738v8q-10 4-10 14v38q0 3 3 3h24q3 0 3-3v-38q0-10-10-14v-8z" fill="#1c2a1a" stroke="#2c3e28" strokeWidth="1" />
          <path d="M1041 772h28v26q0 2-2 2h-24q-2 0-2-2z" fill="#3f6b2a" opacity=".85" />
          <path d="M1041 772h28" stroke="#7fbf55" strokeWidth="1" opacity=".5" />
          <rect x="1044" y="764" width="22" height="22" rx="1" fill="#b8ab8c" />
          <line x1="1047" y1="782" x2="1063" y2="776" stroke="#2a1f18" strokeWidth="1.5" />
          <line x1="1047" y1="776" x2="1063" y2="782" stroke="#2a1f18" strokeWidth="1.5" />
          <circle cx="1055" cy="772" r="4.5" fill="#2a1f18" />
          <rect x="1052.5" y="775" width="5" height="3" fill="#2a1f18" />
          <circle cx="1053.3" cy="771.5" r="1.1" fill="#b8ab8c" />
          <circle cx="1056.7" cy="771.5" r="1.1" fill="#b8ab8c" />
          <rect x="1049" y="728" width="12" height="11" rx="1.5" fill="#6b4a2a" />
          <path d="M1049 732h12" stroke="#4a3322" strokeWidth="1" />
          <path d="M1043 760v34" stroke="#9ad070" strokeWidth="1.2" opacity=".35" />
        </g>

        {/* Свеча */}
        <ellipse className="intro-candle-glow" cx="1115" cy="800" rx="260" ry="70" fill="url(#introTg)" />
        <circle className="intro-candle-glow" cx="1115" cy="738" r="220" fill="url(#introCg2)" />
        <rect x="1110" y="742" width="10" height="38" fill="#c9b8a0" />
        <rect x="1110" y="742" width="4" height="38" fill="#e6d8c4" opacity=".6" />
        <ellipse cx="1115" cy="781" rx="14" ry="3" fill="#3a2a1e" />
        <path d="M1115 742v-4" stroke="#1a1411" strokeWidth="1.5" />
        <g className="intro-flame">
          <ellipse cx="1115" cy="730" rx="5" ry="11" fill="#ffb05a" />
          <ellipse cx="1115" cy="733" rx="2.5" ry="6" fill="#fff1c8" />
        </g>
        <circle className="intro-candle-glow" cx="1115" cy="734" r="60" fill="url(#introCg)" />
        <defs>
          <radialGradient id="introCg">
            <stop stopColor="#ffc07a" stopOpacity=".7" />
            <stop offset=".4" stopColor="#e09a5a" stopOpacity=".25" />
            <stop offset="1" stopColor="#e09a5a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="introCg2">
            <stop stopColor="#e8a060" stopOpacity=".22" />
            <stop offset="1" stopColor="#e8a060" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="introTg">
            <stop stopColor="#f0a860" stopOpacity=".28" />
            <stop offset="1" stopColor="#f0a860" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}