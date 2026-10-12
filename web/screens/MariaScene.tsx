export default function MariaScene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(180,95,55,.12), transparent 70%), ' +
            'linear-gradient(180deg,#140c0a 0%,#1e110d 55%,#0b0706 100%)'
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mrWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#150c0a" />
            <stop offset="1" stopColor="#1e110d" />
          </linearGradient>
          <linearGradient id="mrFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#140b09" />
            <stop offset="1" stopColor="#050303" />
          </linearGradient>
          <linearGradient id="mrWin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1f2633" />
            <stop offset="1" stopColor="#0b0e14" />
          </linearGradient>
          <linearGradient id="mrCurtain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1a0707" />
            <stop offset=".3" stopColor="#3a1110" />
            <stop offset=".55" stopColor="#1c0808" />
            <stop offset=".8" stopColor="#34100f" />
            <stop offset="1" stopColor="#150606" />
          </linearGradient>
          <linearGradient id="mrClothTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a39585" />
            <stop offset="1" stopColor="#6e6255" />
          </linearGradient>
          <linearGradient id="mrClothDrop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#231a15" />
            <stop offset=".45" stopColor="#5c5046" />
            <stop offset=".6" stopColor="#4a3f36" />
            <stop offset="1" stopColor="#1a1310" />
          </linearGradient>
          <radialGradient id="mrGlow">
            <stop offset="0" stopColor="#f2a560" stopOpacity=".35" />
            <stop offset=".5" stopColor="#b85a2c" stopOpacity=".08" />
            <stop offset="1" stopColor="#b85a2c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mrCandleGlow">
            <stop offset="0" stopColor="#ffc47a" stopOpacity=".55" />
            <stop offset=".35" stopColor="#e0843e" stopOpacity=".18" />
            <stop offset="1" stopColor="#e0843e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Стена */}
        <rect width="1600" height="570" fill="url(#mrWall)" />
        <g stroke="#241510" strokeWidth="2" opacity=".6">
          <line x1="0" y1="80" x2="1600" y2="80" />
          <line x1="0" y1="88" x2="1600" y2="88" />
        </g>

        {/* Окна со шторами */}
        {[140, 520, 960, 1340].map((x, i) => (
          <g key={i}>
            {/* Шторы слева от окна */}
            <path
              d={`M${x - 40} -20 Q${x - 30} 160 ${x - 46} 340 L${x + 10} 340 Q${x + 18} 160 ${x + 8} -20 Z`}
              fill="url(#mrCurtain)"
            />
            {/* Шторы справа */}
            <path
              d={`M${x + 112} -20 Q${x + 102} 160 ${x + 110} 340 L${x + 166} 340 Q${x + 150} 160 ${x + 160} -20 Z`}
              fill="url(#mrCurtain)"
            />
            {/* Окно */}
            <path
              d={`M${x} 300 L${x} 60 A60 60 0 0 1 ${x + 120} 60 L${x + 120} 300 Z`}
              fill="url(#mrWin)"
              stroke="#2c1a12"
              strokeWidth="6"
            />
            <line x1={x + 60} y1="0" x2={x + 60} y2="300" stroke="#1c110c" strokeWidth="4" />
            <line x1={x} y1="140" x2={x + 120} y2="140" stroke="#1c110c" strokeWidth="4" />
            <line x1={x} y1="220" x2={x + 120} y2="220" stroke="#1c110c" strokeWidth="3" />
            {/* Подоконник */}
            <rect x={x - 8} y="298" width="136" height="10" fill="#2a180f" />
            {/* Карниз */}
            <rect x={x - 44} y="-28" width="208" height="12" rx="3" fill="#2a180f" />
          </g>
        ))}

        {/* Плинтус */}
        <rect x="0" y="455" width="1600" height="115" fill="#0f0806" />
        <rect x="0" y="452" width="1600" height="6" fill="#2a170e" />
        <g fill="none" stroke="#221309" strokeWidth="2">
          <rect x="20" y="475" width="160" height="75" />
          <rect x="210" y="475" width="160" height="75" />
          <rect x="400" y="475" width="160" height="75" />
          <rect x="590" y="475" width="160" height="75" />
          <rect x="780" y="475" width="160" height="75" />
          <rect x="970" y="475" width="160" height="75" />
          <rect x="1160" y="475" width="160" height="75" />
          <rect x="1350" y="475" width="160" height="75" />
        </g>

        {/* Пол */}
        <rect y="570" width="1600" height="330" fill="url(#mrFloor)" />
        <g stroke="#1c110c" strokeWidth="1.5" opacity=".7">
          <line x1="0" y1="570" x2="-800" y2="900" />
          <line x1="200" y1="570" x2="-400" y2="900" />
          <line x1="400" y1="570" x2="0" y2="900" />
          <line x1="600" y1="570" x2="400" y2="900" />
          <line x1="800" y1="570" x2="800" y2="900" />
          <line x1="1000" y1="570" x2="1200" y2="900" />
          <line x1="1200" y1="570" x2="1600" y2="900" />
          <line x1="1400" y1="570" x2="2000" y2="900" />
          <line x1="0" y1="620" x2="1600" y2="620" />
          <line x1="0" y1="700" x2="1600" y2="700" />
        </g>
        <ellipse cx="800" cy="640" rx="420" ry="40" fill="url(#mrGlow)" opacity=".7" />

        {/* Люстра */}
        <ellipse cx="800" cy="130" rx="340" ry="260" fill="url(#mrGlow)" />
        <line x1="800" y1="0" x2="800" y2="92" stroke="#3a2616" strokeWidth="3" />
        <path d="M720,112 Q800,150 880,112" stroke="#5a3a20" strokeWidth="3" fill="none" />
        <path d="M750,108 Q800,132 850,108" stroke="#5a3a20" strokeWidth="2" fill="none" />
        <ellipse cx="800" cy="104" rx="16" ry="12" fill="#3a2414" stroke="#7a5230" strokeWidth="1.5" />

        {/* Свечи люстры */}
        {[720, 760, 800, 840, 880].map((x, i) => {
          const y = i === 0 || i === 4 ? 112 : i === 1 || i === 3 ? 124 : 130;
          return (
            <g key={x}>
              <circle cx={x} cy={y - 36} r="30" fill="url(#mrCandleGlow)" opacity=".7" />
              <rect x={x - 3} y={y - 30} width="6" height="30" fill="#d9ccb0" />
              <ellipse cx={x} cy={y - 37} rx="2.5" ry="6" fill="#ffd88f" />
              <ellipse cx={x} cy={y - 35} rx="1.2" ry="3" fill="#fff4dc" />
            </g>
          );
        })}

        {/* Подвески люстры */}
        <g fill="#e8c9a0" opacity=".6">
          <path d="M740,140 l3,12 l3,-12 Z" />
          <path d="M780,146 l3,14 l3,-14 Z" />
          <path d="M820,146 l3,14 l3,-14 Z" />
          <path d="M860,140 l3,12 l3,-12 Z" />
        </g>

        {/* Столы и гости — силуэты */}
        {/* Задний ряд */}
        <g fill="#0c0807" opacity=".85">
          {[290, 760, 1290, 1025].map((x, i) => (
            <g key={`back-${i}`} transform={`translate(${x} ${615 + (i % 2) * 4})`}>
              <ellipse cx="0" cy="0" rx="120" ry="20" fill="#a39585" opacity=".7" />
              <path d="M-100 0 Q-90 60 0 65 Q90 60 100 0 Z" fill="url(#mrClothDrop)" opacity=".6" />
              <ellipse cx="-60" cy="-30" rx="30" ry="45" />
              <ellipse cx="60" cy="-30" rx="30" ry="45" />
            </g>
          ))}
        </g>

        {/* Средний ряд */}
        <g fill="#0c0807" opacity=".85">
          {[470, 960, 1390].map((x, i) => (
            <g key={`mid-${i}`} transform={`translate(${x} ${706 + i * 4}) scale(.78)`}>
              <ellipse cx="0" cy="0" rx="135" ry="22" fill="#a39585" opacity=".75" />
              <path d="M-115 0 Q-100 80 0 88 Q100 80 115 0 Z" fill="url(#mrClothDrop)" opacity=".7" />
              <ellipse cx="-75" cy="-40" rx="36" ry="55" />
              <ellipse cx="78" cy="-40" rx="36" ry="55" />
            </g>
          ))}
        </g>

        {/* Передний ряд */}
        <g fill="#0c0807" opacity=".85">
          {[130, 700, 1110, 1520].map((x, i) => (
            <g key={`front-${i}`} transform={`translate(${x} ${885}) scale(${1.1 + i * 0.03})`}>
              <ellipse cx="0" cy="0" rx="160" ry="26" fill="#a39585" opacity=".8" />
              <path d="M-135 0 Q-115 100 0 110 Q115 100 135 0 Z" fill="url(#mrClothDrop)" opacity=".75" />
              <ellipse cx="-90" cy="-45" rx="42" ry="62" />
              <ellipse cx="90" cy="-45" rx="42" ry="62" />
            </g>
          ))}
        </g>

        {/* Пыль в воздухе */}
        <g fill="#f0c98f" opacity=".5">
          <circle cx="960" cy="300" r="1.4" />
          <circle cx="1060" cy="420" r="1" />
          <circle cx="1010" cy="520" r="1.6" />
          <circle cx="1100" cy="260" r="1" />
          <circle cx="780" cy="220" r="1.2" />
          <circle cx="840" cy="360" r="1" />
          <circle cx="420" cy="380" r="1.2" />
          <circle cx="1240" cy="360" r="1.3" />
        </g>
      </svg>
    </div>
  );
}