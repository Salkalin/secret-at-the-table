export default function ElenaScene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* База */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% -5%, rgba(170,95,50,.22), transparent 70%), ' +
            'radial-gradient(ellipse 40% 30% at 82% 78%, rgba(200,100,50,.10), transparent 70%), ' +
            'linear-gradient(180deg,#120d0b 0%,#0c0908 55%,#080605 100%)'
        }}
      />

      {/* Окно */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(1100px, 86vw)',
          height: '62vh',
          border: '1px solid rgba(236,228,220,.04)',
          borderRadius: 4,
          background:
            'linear-gradient(180deg,rgba(30,22,20,.35),rgba(10,8,7,.1))'
        }}
      >
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 0,
            bottom: 0,
            width: 10,
            background: 'rgba(8,6,5,.85)',
            transform: 'translateX(-50%)'
          }}
        />
        <div
          className="absolute"
          style={{
            top: '44%',
            left: 0,
            right: 0,
            height: 8,
            background: 'rgba(8,6,5,.85)'
          }}
        />
        {/* Мелкий дождь — статичные штрихи */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1100 500"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 137) % 1100;
            const y = (i * 89) % 500;
            return (
              <line
                key={i}
                x1={x}
                y1={y}
                x2={x - 2}
                y2={y + 18}
                stroke="rgba(200,190,180,.18)"
                strokeWidth="1"
              />
            );
          })}
          {/* Боке — городские огни */}
          {[
            { cx: 120, cy: 380, r: 24, c: '255,170,100' },
            { cx: 240, cy: 420, r: 30, c: '230,200,160' },
            { cx: 380, cy: 400, r: 22, c: '180,60,50' },
            { cx: 520, cy: 440, r: 34, c: '255,120,70' },
            { cx: 680, cy: 410, r: 26, c: '150,170,190' },
            { cx: 820, cy: 430, r: 30, c: '255,170,100' },
            { cx: 960, cy: 400, r: 22, c: '230,200,160' }
          ].map((b, i) => (
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={`rgba(${b.c},.12)`} />
          ))}
        </svg>
      </div>

      {/* Лампа */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: '100vh' }}
      >
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 0,
            width: 1,
            height: 90,
            background: 'rgba(236,228,220,.12)',
            transform: 'translateX(-50%)'
          }}
        />
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 88,
            transform: 'translateX(-50%)',
            width: 70,
            height: 26,
            borderRadius: '40px 40px 4px 4px',
            background: 'linear-gradient(180deg,#2a1d17,#150f0c)'
          }}
        />
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 108,
            transform: 'translateX(-50%)',
            width: 26,
            height: 10,
            borderRadius: '50%',
            background: '#ffcf9a',
            boxShadow: '0 0 30px 10px rgba(255,170,100,.25)'
          }}
        />
        <div
          className="absolute"
          style={{
            left: '50%',
            top: 112,
            transform: 'translateX(-50%)',
            width: 900,
            height: '80vh',
            background:
              'radial-gradient(ellipse 30% 100% at 50% 0%, rgba(255,170,100,.09), transparent 75%)',
            clipPath: 'polygon(46% 0,54% 0,100% 100%,0 100%)'
          }}
        />
      </div>

      {/* Стол с уликами (SVG) */}
      <svg
        className="absolute left-0 right-0 bottom-0 w-full"
        style={{ opacity: 0.9 }}
        viewBox="0 0 1600 420"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="elCloth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e1613" />
            <stop offset="1" stopColor="#070504" />
          </linearGradient>
          <radialGradient id="elCandleLight" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffb36b" stopOpacity=".35" />
            <stop offset="1" stopColor="#ffb36b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="elWine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5a1418" />
            <stop offset="1" stopColor="#240608" />
          </linearGradient>
          <linearGradient id="elGlassEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffcf9a" stopOpacity=".25" />
            <stop offset=".3" stopColor="#ffcf9a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Свечение свечи */}
        <ellipse cx="1180" cy="230" rx="260" ry="200" fill="url(#elCandleLight)" />

        {/* Скатерть */}
        <path d="M0 300 Q800 270 1600 300 L1600 420 L0 420 Z" fill="url(#elCloth)" />
        <path d="M0 300 Q800 270 1600 300" stroke="rgba(236,228,220,.06)" strokeWidth="1" fill="none" />

        {/* Бутылка */}
        <path d="M300 300 L300 170 Q300 140 318 125 L318 70 L338 70 L338 125 Q356 140 356 170 L356 300 Z" fill="#0d0908" />
        <path d="M304 180 L304 290" stroke="rgba(255,190,130,.12)" strokeWidth="2" />
        <rect x="306" y="200" width="44" height="46" fill="#1a120f" />

        {/* Бокал с вином — не тронут */}
        <g>
          <path d="M430 180 Q428 240 470 250 Q512 240 510 180 Z" fill="url(#elWine)" />
          <path
            d="M425 150 Q420 250 470 255 Q520 250 515 150"
            stroke="rgba(236,228,220,.14)"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M425 150 Q420 250 470 255" stroke="url(#elGlassEdge)" strokeWidth="3" fill="none" />
          <line x1="470" y1="255" x2="470" y2="298" stroke="rgba(236,228,220,.14)" strokeWidth="2" />
          <ellipse cx="470" cy="300" rx="26" ry="4" fill="none" stroke="rgba(236,228,220,.12)" />
        </g>

        {/* Тарелка с десертом */}
        <ellipse cx="800" cy="300" rx="120" ry="16" fill="#140e0c" stroke="rgba(236,228,220,.07)" />
        <path d="M745 296 L745 250 L855 262 L855 296 Z" fill="#1c1310" />
        <path d="M745 250 L855 262" stroke="rgba(200,100,60,.35)" strokeWidth="2" />
        <circle cx="820" cy="248" r="6" fill="#4a1014" />
        <path d="M950 305 L1040 292" stroke="rgba(236,228,220,.14)" strokeWidth="3" strokeLinecap="round" />

        {/* Свеча */}
        <rect x="1168" y="200" width="24" height="100" rx="2" fill="#2a1f1a" />
        <path d="M1168 205 Q1180 214 1192 205" stroke="rgba(255,200,150,.2)" fill="none" />
        <line x1="1180" y1="200" x2="1180" y2="190" stroke="#0a0706" strokeWidth="2" />
        <path d="M1180 150 Q1192 172 1186 186 Q1180 194 1174 186 Q1168 172 1180 150 Z" fill="#ffb36b" />
        <path d="M1180 166 Q1185 178 1182 185 Q1180 188 1178 185 Q1175 178 1180 166 Z" fill="#fff0d6" />
        <ellipse cx="1180" cy="302" rx="28" ry="4" fill="#0a0706" />

        {/* Второй пустой бокал */}
        <path
          d="M1330 150 Q1325 250 1375 255 Q1425 250 1420 150"
          stroke="rgba(236,228,220,.1)"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="1375" y1="255" x2="1375" y2="298" stroke="rgba(236,228,220,.1)" strokeWidth="2" />
        <ellipse cx="1375" cy="300" rx="26" ry="4" fill="none" stroke="rgba(236,228,220,.08)" />

        {/* Дым от свечи */}
        <path
          d="M1180 140 Q1170 110 1185 90 Q1198 70 1182 40"
          stroke="rgba(236,228,220,.5)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Виньетка */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 70% at 50% 45%,transparent 35%,rgba(0,0,0,.75) 100%)'
        }}
      />
    </div>
  );
}