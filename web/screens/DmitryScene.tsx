export default function DmitryScene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 20%, rgba(170,100,50,.2), transparent 70%), ' +
            'radial-gradient(ellipse 40% 40% at 86% 80%, rgba(200,120,60,.14), transparent 70%), ' +
            'linear-gradient(180deg,#0f0b09 0%,#0c0908 60%,#060404 100%)'
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dmStone" width="140" height="64" patternUnits="userSpaceOnUse">
            <rect width="140" height="64" fill="#0b0807" />
            <rect x="4" y="4" width="62" height="24" rx="4" fill="#211814" />
            <rect x="74" y="4" width="62" height="24" rx="4" fill="#1b1411" />
            <rect x="-31" y="36" width="62" height="24" rx="4" fill="#1e1612" />
            <rect x="39" y="36" width="62" height="24" rx="4" fill="#241a15" />
            <rect x="109" y="36" width="62" height="24" rx="4" fill="#1e1612" />
          </pattern>
          <radialGradient id="dmTunnel" cx=".5" cy=".75" r=".65">
            <stop offset="0" stopColor="#1a0f0a" />
            <stop offset=".5" stopColor="#050303" />
            <stop offset="1" stopColor="#0a0706" />
          </radialGradient>
          <linearGradient id="dmFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a130f" />
            <stop offset="1" stopColor="#070504" />
          </linearGradient>
          <radialGradient id="dmWoodEnd">
            <stop offset="0" stopColor="#5e3b25" />
            <stop offset=".7" stopColor="#3b2416" />
            <stop offset="1" stopColor="#21130b" />
          </radialGradient>
          <linearGradient id="dmWoodSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1e110a" />
            <stop offset=".45" stopColor="#4c2e1c" />
            <stop offset="1" stopColor="#26160d" />
          </linearGradient>
        </defs>

        {/* Каменные стены */}
        <rect width="1600" height="720" fill="url(#dmStone)" />
        <path d="M0 0H1600V262 Q800 -58 0 262Z" fill="#060403" opacity=".88" />
        <path d="M0 262 Q800 -58 1600 262" fill="none" stroke="#2c1f18" strokeWidth="16" />
        <path d="M0 262 Q800 -58 1600 262" fill="none" stroke="#0b0807" strokeWidth="16" strokeDasharray="3 60" />

        {/* Туннель */}
        <path d="M600 720 V420 a200 200 0 0 1 400 0 V720Z" fill="url(#dmTunnel)" />
        <path d="M700 720 V470 a100 100 0 0 1 200 0 V720" fill="none" stroke="#1a120e" strokeWidth="8" opacity=".7" />
        <ellipse cx="800" cy="640" rx="70" ry="50" fill="#c8664a" opacity=".06" />
        <path d="M600 720 V420 a200 200 0 0 1 400 0 V720" fill="none" stroke="#2e2019" strokeWidth="20" />
        <path d="M600 720 V420 a200 200 0 0 1 400 0 V720" fill="none" stroke="#0b0807" strokeWidth="20" strokeDasharray="3 40" />

        {/* Пол */}
        <rect y="720" width="1600" height="180" fill="url(#dmFloor)" />
        <line x1="0" y1="720" x2="1600" y2="720" stroke="#2c1f18" strokeWidth="3" />
        <g stroke="#050303" strokeWidth="2" opacity=".85">
          <line x1="800" y1="720" x2="-600" y2="900" />
          <line x1="800" y1="720" x2="0" y2="900" />
          <line x1="800" y1="720" x2="500" y2="900" />
          <line x1="800" y1="720" x2="1100" y2="900" />
          <line x1="800" y1="720" x2="1600" y2="900" />
          <line x1="800" y1="720" x2="2200" y2="900" />
          <line x1="0" y1="752" x2="1600" y2="752" />
          <line x1="0" y1="800" x2="1600" y2="800" />
          <line x1="0" y1="866" x2="1600" y2="866" />
        </g>

        {/* Паутина */}
        <g stroke="#6b5a4e" strokeWidth="1" opacity=".35" fill="none">
          <path d="M0 0 L120 90 M0 0 L60 130 M0 0 L140 40" />
          <path d="M30 22 Q20 38 15 32 M60 45 Q38 70 30 65 M90 67 Q60 100 45 97 M35 11 Q40 25 30 22 M70 20 Q75 42 60 45" />
        </g>

        {/* Каркас винного стеллажа */}
        <rect x="98" y="238" width="416" height="472" rx="4" fill="#120b08" stroke="#2e1f16" strokeWidth="10" />
        <rect x="104" y="708" width="16" height="30" fill="#1c120c" />
        <rect x="492" y="708" width="16" height="30" fill="#1c120c" />

        {/* Винный стеллаж — бутылки */}
        {Array.from({ length: 56 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const x = 110 + col * 56;
          const y = 250 + row * 56;
          const cx = x + 28;
          const cy = y + 28;
          const colors = ['#1f2a17', '#2c1413', '#1b2016', '#33190f', '#241a12'];
          const fill = colors[i % colors.length];
          const skip = (i * 37) % 100 < 12;
          return (
            <g key={i}>
              <rect x={x} y={y} width="56" height="56" fill="#0a0605" stroke="#2a1c14" strokeWidth="3" />
              {!skip && (
                <>
                  <circle cx={cx} cy={cy} r="19" fill={fill} />
                  <circle cx={cx} cy={cy} r="19" fill="none" stroke="#0c0706" strokeWidth="3" />
                  <circle cx={cx} cy={cy} r="7" fill="#070404" />
                  <path
                    d={`M${cx - 12} ${cy - 8} A14 14 0 0 1 ${cx + 2} ${cy - 14}`}
                    fill="none"
                    stroke="rgba(230,160,100,.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              )}
            </g>
          );
        })}

        {/* Стеллаж справа */}
        <rect x="1124" y="190" width="14" height="530" fill="#23160e" />
        <rect x="1526" y="190" width="14" height="530" fill="#23160e" />
        <g fill="#3a2517">
          <rect x="1118" y="340" width="428" height="14" />
          <rect x="1118" y="480" width="428" height="14" />
          <rect x="1118" y="620" width="428" height="14" />
        </g>

        {/* Банки на полке */}
        {[
          { x: 1150, h: 48, col: '#4a5a24' },
          { x: 1204, h: 56, col: '#6a1e1a' },
          { x: 1258, h: 48, col: '#8a5a1c' },
          { x: 1312, h: 56, col: '#3e4a1e' },
          { x: 1366, h: 48, col: '#7a2a20' },
          { x: 1420, h: 56, col: '#946420' },
          { x: 1474, h: 48, col: '#52602a' }
        ].map((j, i) => (
          <g key={i}>
            <rect x={j.x} y={340 - j.h} width="42" height={j.h} rx="8" fill={j.col} opacity=".75" />
            <rect x={j.x + 3} y={340 - j.h - 8} width="36" height="10" rx="2" fill="#5a4630" />
            <line
              x1={j.x + 9}
              y1={340 - j.h + 8}
              x2={j.x + 9}
              y2={330}
              stroke="rgba(255,230,200,.18)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Сыры на средней полке */}
        <g>
          <rect x="1148" y="448" width="112" height="32" fill="#8a6a2c" />
          <ellipse cx="1204" cy="480" rx="56" ry="7" fill="#6e5222" />
          <ellipse cx="1204" cy="448" rx="56" ry="7" fill="#b08a40" />
          <rect x="1148" y="414" width="112" height="32" fill="#8a6a2c" />
          <ellipse cx="1204" cy="446" rx="56" ry="7" fill="#6e5222" />
          <ellipse cx="1204" cy="414" rx="56" ry="7" fill="#b08a40" />

          <rect x="1275" y="440" width="96" height="38" fill="#8a6a2c" />
          <ellipse cx="1323" cy="478" rx="48" ry="7" fill="#6e5222" />
          <ellipse cx="1323" cy="440" rx="48" ry="7" fill="#b08a40" />
          <path d="M1286 440 L1323 452 L1286 470 Z" fill="#c9a456" />

          <ellipse cx="1444" cy="462" rx="48" ry="18" fill="#7a4a22" />
          <ellipse cx="1510" cy="466" rx="40" ry="18" fill="#7a4a22" />
          <ellipse cx="1476" cy="444" rx="44" ry="18" fill="#7a4a22" />
        </g>

        {/* Бутылки на нижней полке */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
          const colors = ['#1f2a17', '#2c1413', '#1b2016', '#33190f', '#241a12'];
          const col = colors[i % colors.length];
          const x = 1150 + i * 34;
          return (
            <g key={i}>
              <rect x={x} y={552} width="22" height="68" rx="5" fill={col} />
              <rect x={x + 7} y={526} width="8" height="30" rx="2" fill={col} />
              <rect x={x + 6} y={522} width="10" height="8" fill="#6a2a1c" />
              <rect x={x + 2} y={578} width="18" height="20" fill="#c9b894" opacity=".35" />
            </g>
          );
        })}

        {/* Подвесные припасы */}
        <rect x="1090" y="130" width="470" height="18" fill="#26180f" />

        {/* Чеснок */}
        <line x1="1150" y1="148" x2="1150" y2="170" stroke="#5a4630" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <ellipse
            key={i}
            cx={1150 + (i % 2 ? 8 : -8)}
            cy={180 + i * 20}
            rx="12"
            ry="11"
            fill="#b8ab94"
            opacity=".55"
          />
        ))}

        {/* Колбасы */}
        {[1225, 1245, 1440, 1462, 1484].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="148" x2={x} y2="162" stroke="#5a4630" strokeWidth="2" />
            <path
              d={`M${x} 168 q${i % 2 ? 12 : -12} 50 ${i % 2 ? -2 : 4} ${100 + (i % 3) * 16}`}
              fill="none"
              stroke="#5a2218"
              strokeWidth="14"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Окорок */}
        <line x1="1335" y1="148" x2="1335" y2="160" stroke="#5a4630" strokeWidth="2" />
        <rect x="1330" y="160" width="10" height="22" rx="3" fill="#cdb894" opacity=".7" />
        <path d="M1335 180 C1290 220 1285 310 1335 330 C1385 310 1380 220 1335 180 Z" fill="#5e2a1a" />
        <path
          d="M1312 250 C1318 290 1330 312 1340 318"
          fill="none"
          stroke="rgba(230,170,130,.25)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Травы */}
        <line x1="1525" y1="148" x2="1525" y2="172" stroke="#5a4630" strokeWidth="2" />
        {[-3, -2, -1, 0, 1, 2, 3].map(i => (
          <line
            key={i}
            x1="1525"
            y1="172"
            x2={1525 + i * 6}
            y2="240"
            stroke="#3e4a24"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}

        {/* Ящик */}
        <g>
          <rect x="130" y="760" width="210" height="116" fill="#2a1a10" />
          <g stroke="#150d08" strokeWidth="4">
            <line x1="130" y1="798" x2="340" y2="798" />
            <line x1="130" y1="838" x2="340" y2="838" />
          </g>
          <rect x="130" y="760" width="210" height="116" fill="none" stroke="#3e2818" strokeWidth="6" />
          <text
            x="235"
            y="830"
            textAnchor="middle"
            fontFamily="Cormorant Garamond, serif"
            fontSize="30"
            fontWeight="700"
            fill="#6a4a32"
            letterSpacing="6"
          >
            VIN
          </text>
        </g>

        {/* Бочки */}
        {[
          { cx: 560, cy: 812, r: 72, label: '1962' },
          { cx: 710, cy: 812, r: 72, label: '1978' },
          { cx: 635, cy: 684, r: 72, label: '1954' }
        ].map((b, i) => (
          <g key={i}>
            <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#dmWoodEnd)" />
            {[-3, -2, -1, 0, 1, 2, 3].map(j => {
              const dx = (j * b.r) / 3.6;
              const dy = Math.sqrt(Math.max(b.r * b.r - dx * dx, 0));
              return (
                <line
                  key={j}
                  x1={b.cx + dx}
                  y1={b.cy - dy}
                  x2={b.cx + dx}
                  y2={b.cy + dy}
                  stroke="#1c100a"
                  strokeWidth="1.5"
                  opacity=".7"
                />
              );
            })}
            <circle cx={b.cx} cy={b.cy} r={b.r - 8} fill="none" stroke="#1a0f09" strokeWidth="3" />
            <circle cx={b.cx} cy={b.cy} r={b.r} fill="none" stroke="#0e0806" strokeWidth="9" />
            <circle cx={b.cx} cy={b.cy + b.r * 0.45} r="6" fill="#140b07" />
            <text
              x={b.cx}
              y={b.cy + 6}
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="20"
              fontWeight="700"
              fill="#8a6446"
              letterSpacing="2"
            >
              {b.label}
            </text>
          </g>
        ))}

        {/* Стоячая бочка со свечой */}
        <path d="M1300 700 Q1284 800 1300 900 L1440 900 Q1456 800 1440 700 Z" fill="url(#dmWoodSide)" />
        <g stroke="#0f0906" strokeWidth="7" fill="none">
          <path d="M1297 735 Q1370 745 1443 735" />
          <path d="M1296 865 Q1370 875 1444 865" />
        </g>
        <ellipse cx="1370" cy="700" rx="70" ry="13" fill="#2f1c11" stroke="#140c07" strokeWidth="4" />
        <ellipse cx="1370" cy="700" rx="26" ry="5" fill="#d9c7a8" opacity=".25" />
        <rect x="1364" y="652" width="12" height="48" rx="2" fill="#cdb894" opacity=".85" />
        <ellipse cx="1370" cy="642" rx="4.5" ry="10" fill="#e8a060" opacity=".9" />

        {/* Пыль в луче света */}
        <g fill="#e8b482" opacity=".5">
          <circle cx="1180" cy="450" r="1.5" />
          <circle cx="1210" cy="500" r="1" />
          <circle cx="1150" cy="550" r="1.4" />
          <circle cx="1230" cy="420" r="1.2" />
          <circle cx="1270" cy="480" r="1.6" />
          <circle cx="1190" cy="600" r="1.3" />
        </g>
      </svg>

      {/* Свеча — анимация через inline style */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '14%',
          bottom: '17%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(230,150,80,.22), rgba(200,100,60,.06) 45%, transparent 70%)'
        }}
      />
    </div>
  );
}