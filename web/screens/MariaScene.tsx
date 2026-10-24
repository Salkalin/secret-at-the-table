export default function MariaScene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* CSS-анимации для дыма и пыли (взяты из макета) */}
      <style>{`
        .dust { animation: float 14s ease-in-out infinite; }
        .dust:nth-child(2n) { animation-duration: 18s; animation-delay: -4s; }
        .dust:nth-child(3n) { animation-duration: 22s; animation-delay: -9s; }
        @keyframes float {
          0%, 100% { transform: translate(0,0); opacity: .2; }
          50% { transform: translate(30px,-60px); opacity: .7; }
        }
        .fog { animation: drift 40s ease-in-out infinite alternate; }
        .fog2 { animation: drift 55s ease-in-out infinite alternate-reverse; }
        @keyframes drift {
          from { transform: translateX(-80px); }
          to { transform: translateX(80px); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[#0a0605]">
        <div className="absolute inset-0" style={{ zIndex: 0, pointerEvents: 'none' }}>
          <svg
            className="w-full h-full block"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#150c0a"/><stop offset="1" stopColor="#1e110d"/></linearGradient>
              <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#140b09"/><stop offset="1" stopColor="#050303"/></linearGradient>
              <linearGradient id="win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f2633"/><stop offset="1" stopColor="#0b0e14"/></linearGradient>
              <linearGradient id="curtain" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1a0707"/><stop offset=".3" stopColor="#3a1110"/><stop offset=".55" stopColor="#1c0808"/><stop offset=".8" stopColor="#34100f"/><stop offset="1" stopColor="#150606"/></linearGradient>
              <linearGradient id="moon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fa2c0" stopOpacity=".12"/><stop offset="1" stopColor="#8fa2c0" stopOpacity="0"/></linearGradient>
              <linearGradient id="spot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f0b27a" stopOpacity="0"/><stop offset=".5" stopColor="#f0b27a" stopOpacity=".07"/><stop offset="1" stopColor="#f0b27a" stopOpacity=".14"/></linearGradient>
              <linearGradient id="clothTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a39585"/><stop offset="1" stopColor="#6e6255"/></linearGradient>
              <linearGradient id="clothDrop" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#231a15"/><stop offset=".45" stopColor="#5c5046"/><stop offset=".6" stopColor="#4a3f36"/><stop offset="1" stopColor="#1a1310"/></linearGradient>
              <linearGradient id="jacket" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e2d8ca"/><stop offset=".55" stopColor="#b3a999"/><stop offset="1" stopColor="#5e574e"/></linearGradient>
              <linearGradient id="cloche" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e8dccb"/><stop offset=".4" stopColor="#8e8478"/><stop offset="1" stopColor="#2e2924"/></linearGradient>
              <linearGradient id="skin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c49a7c"/><stop offset="1" stopColor="#6b4a38"/></linearGradient>
              <radialGradient id="candleGlow"><stop offset="0" stopColor="#ffc47a" stopOpacity=".55"/><stop offset=".35" stopColor="#e0843e" stopOpacity=".18"/><stop offset="1" stopColor="#e0843e" stopOpacity="0"/></radialGradient>
              <radialGradient id="bigGlow"><stop offset="0" stopColor="#f2a560" stopOpacity=".35"/><stop offset=".5" stopColor="#b85a2c" stopOpacity=".08"/><stop offset="1" stopColor="#b85a2c" stopOpacity="0"/></radialGradient>
              <radialGradient id="fogG"><stop offset="0" stopColor="#6e5a50" stopOpacity=".18"/><stop offset="1" stopColor="#6e5a50" stopOpacity="0"/></radialGradient>

              <pattern id="rain" width="30" height="50" patternUnits="userSpaceOnUse">
                <line x1="6" y1="0" x2="2" y2="18" stroke="#9fb0c8" strokeOpacity=".35" strokeWidth="1"/>
                <line x1="22" y1="25" x2="18" y2="43" stroke="#9fb0c8" strokeOpacity=".25" strokeWidth="1"/>
                <animateTransform attributeName="patternTransform" type="translate" values="0 0;-10 50" dur=".5s" repeatCount="indefinite"/>
              </pattern>
              <clipPath id="archClip"><path d="M0,300 L0,60 A60,60 0 0 1 120,60 L120,300 Z"/></clipPath>
              <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
              <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>

              <g id="window">
                <path d="M-40,-20 Q-30,160 -46,340 L10,340 Q18,160 8,-20 Z" fill="url(#curtain)"/>
                <path d="M112,-20 Q102,160 110,340 L166,340 Q150,160 160,-20 Z" fill="url(#curtain)"/>
                <path d="M0,300 L0,60 A60,60 0 0 1 120,60 L120,300 Z" fill="url(#win)" stroke="#2c1a12" strokeWidth="6"/>
                <rect x="0" y="0" width="120" height="300" fill="url(#rain)" clipPath="url(#archClip)"/>
                <line x1="60" y1="0" x2="60" y2="300" stroke="#1c110c" strokeWidth="4"/>
                <line x1="0" y1="140" x2="120" y2="140" stroke="#1c110c" strokeWidth="4"/>
                <line x1="0" y1="220" x2="120" y2="220" stroke="#1c110c" strokeWidth="3"/>
                <rect x="-8" y="298" width="136" height="10" fill="#2a180f"/>
                <rect x="-44" y="-28" width="208" height="12" rx="3" fill="#2a180f"/>
              </g>

              <g id="candle">
                <circle cx="0" cy="-36" r="70" fill="url(#candleGlow)">
                  <animate attributeName="opacity" values=".75;1;.85;.95;.7;.9" dur="2.2s" repeatCount="indefinite"/>
                </circle>
                <rect x="-4" y="-30" width="8" height="30" fill="#d9ccb0"/>
                <ellipse cx="0" cy="-37" rx="3" ry="7" fill="#ffd88f">
                  <animate attributeName="ry" values="7;8.5;6.5;8;7" dur="1.4s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="0" cy="-35" rx="1.3" ry="3" fill="#fff4dc"/>
              </g>

              <g id="glass">
                <path d="M-7,-30 Q-8,-16 0,-14 Q8,-16 7,-30 Z" fill="rgba(210,195,180,.18)" stroke="rgba(235,215,195,.45)" strokeWidth=".8"/>
                <path d="M-6.4,-23 Q-7,-16 0,-15 Q7,-16 6.4,-23 Z" fill="#6e0f15"/>
                <line x1="0" y1="-14" x2="0" y2="-1" stroke="rgba(235,215,195,.45)" strokeWidth="1"/>
                <ellipse cx="0" cy="-1" rx="6" ry="1.6" fill="rgba(235,215,195,.4)"/>
              </g>

              <g id="plate">
                <ellipse cx="0" cy="0" rx="26" ry="7" fill="#c9bfae"/>
                <ellipse cx="0" cy="0" rx="18" ry="4.6" fill="#b2a896"/>
                <ellipse cx="-2" cy="-1.5" rx="11" ry="3.5" fill="#5a2415"/>
                <ellipse cx="5" cy="-2.5" rx="4" ry="2" fill="#3d4a26"/>
                <circle cx="-6" cy="-3" r="1.6" fill="#8b1c1c"/>
              </g>

              <g id="tableSet">
                <ellipse cx="0" cy="112" rx="155" ry="18" fill="#000" opacity=".55"/>
                <path d="M-135,0 L-130,100 Q0,122 130,100 L135,0 Z" fill="url(#clothDrop)"/>
                <path d="M-130,100 Q-100,90 -80,108 M-40,113 Q-20,100 0,114 M40,113 Q60,100 80,108" stroke="#140e0b" strokeWidth="2" fill="none" opacity=".6"/>
                <ellipse cx="0" cy="0" rx="135" ry="32" fill="url(#clothTop)"/>
                <use href="#plate" x="-62" y="6"/>
                <use href="#plate" x="58" y="10"/>
                <use href="#candle" x="0" y="-2"/>
              </g>
              
              <g id="tableFull">
                <use href="#tableSet"/>
                <use href="#glass" x="-28" y="-4"/>
                <use href="#glass" x="30" y="-6"/>
                <path d="M82,0 L82,-40 Q82,-48 87,-52 L87,-66 L93,-66 L93,-52 Q98,-48 98,-40 L98,0 Z" fill="#1c0d0b"/>
                <rect x="83" y="-32" width="14" height="14" fill="#6b5a45" opacity=".7"/>
                <line x1="85" y1="-44" x2="85" y2="-4" stroke="#e6c9a8" strokeOpacity=".35" strokeWidth="1.2"/>
              </g>

              <g id="guestM">
                <path d="M-46,12 C-47,-30 -41,-62 -20,-70 L-8,-74 L8,-74 L20,-70 C41,-62 47,-30 46,12 Z" fill="#0c0807" stroke="#c77a45" strokeOpacity=".35" strokeWidth="1.5"/>
                <path d="M-6,-72 L0,-40 L6,-72 Z" fill="#2c0c0c"/>
                <rect x="-7" y="-82" width="14" height="10" fill="#0c0807"/>
                <ellipse cx="0" cy="-96" rx="17" ry="20" fill="#120c0a" stroke="#c77a45" strokeOpacity=".3" strokeWidth="1.2"/>
                <ellipse cx="0" cy="-110" rx="30" ry="5" fill="#070504"/>
                <path d="M-18,-110 L-15,-130 Q0,-135 15,-130 L18,-110 Z" fill="#070504"/>
                <rect x="-17" y="-115" width="34" height="4" fill="#3a1412"/>
              </g>
              
              <g id="guestF">
                <path d="M-38,12 C-40,-28 -34,-58 -16,-66 L-6,-70 L6,-70 L16,-66 C34,-58 40,-28 38,12 Z" fill="#0c0807" stroke="#c77a45" strokeOpacity=".35" strokeWidth="1.5"/>
                <path d="M-16,-66 Q0,-50 16,-66" stroke="#b8a48a" strokeOpacity=".5" strokeWidth="1.5" fill="none"/>
                <ellipse cx="0" cy="-90" rx="15" ry="18" fill="#120c0a"/>
                <path d="M-18,-92 C-21,-117 21,-117 18,-92 C22,-76 20,-62 25,-54 L-25,-54 C-20,-62 -22,-76 -18,-92Z" fill="#080504" stroke="#c77a45" strokeOpacity=".3" strokeWidth="1.2"/>
                <circle cx="-12" cy="-80" r="1.8" fill="#f0c98f"/>
              </g>
              
              <g id="waiterBody">
                <ellipse cx="0" cy="0" rx="36" ry="6" fill="#000" opacity=".55"/>
                <path d="M-18,-122 L-16,-6 L-4,-6 L-2,-122 Z" fill="#0c0807" stroke="#c77a45" strokeOpacity=".25" strokeWidth="1"/>
                <path d="M2,-122 L4,-6 L16,-6 L18,-122 Z" fill="#0a0706" stroke="#c77a45" strokeOpacity=".25" strokeWidth="1"/>
                <path d="M-19,-7 L-3,-7 L-2,0 L-23,0 Z" fill="#050303"/>
                <path d="M3,-7 L17,-7 L21,0 L2,0 Z" fill="#050303"/>
                <path d="M-34,-210 C-38,-180 -34,-150 -28,-118 L28,-118 C34,-150 38,-180 34,-210 C24,-221 -24,-221 -34,-210 Z" fill="#0c0807" stroke="#c77a45" strokeOpacity=".35" strokeWidth="1.5"/>
                <path d="M-11,-217 L0,-172 L11,-217 Z" fill="#cfc4b4"/>
                <path d="M-7,-214 L0,-210 L7,-214 L7,-206 L0,-210 L-7,-206 Z" fill="#070504"/>
                <g fill="#3a2a20"><circle cx="0" cy="-196" r="1.4"/><circle cx="0" cy="-184" r="1.4"/></g>
                <path d="M-28,-134 L28,-134 L31,-24 L-31,-24 Z" fill="#8f8577"/>
                <path d="M-28,-134 L28,-134 L28,-128 L-28,-128 Z" fill="#6e6558"/>
                <path d="M-10,-128 L-12,-28 M11,-128 L13,-28" stroke="#6e6558" strokeWidth="1"/>
                <rect x="-6" y="-228" width="12" height="12" fill="#120c0a"/>
              </g>
              
              <g id="waiterHead">
                <ellipse cx="0" cy="-243" rx="17" ry="20" fill="#120c0a" stroke="#c77a45" strokeOpacity=".3" strokeWidth="1.2"/>
                <path d="M-17,-246 C-19,-268 19,-268 17,-246 C10,-258 -10,-258 -17,-246 Z" fill="#070504"/>
              </g>

              <g id="waiterTray">
                <animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur=".9s" repeatCount="indefinite"/>
                <path d="M-32,-204 Q-42,-170 -38,-136" stroke="#c77a45" strokeOpacity=".3" strokeWidth="15" strokeLinecap="round" fill="none"/>
                <use href="#waiterBody"/>
                <path d="M-32,-204 Q-42,-170 -38,-136" stroke="#0c0807" strokeWidth="12" strokeLinecap="round" fill="none"/>
                <path d="M-44,-160 L-32,-160 L-30,-126 Q-37,-122 -46,-128 Z" fill="#cfc4b4"/>
                <use href="#waiterHead"/>
                <path d="M32,-204 Q56,-210 52,-252" stroke="#c77a45" strokeOpacity=".3" strokeWidth="15" strokeLinecap="round" fill="none"/>
                <path d="M32,-204 Q56,-210 52,-252" stroke="#0c0807" strokeWidth="12" strokeLinecap="round" fill="none"/>
                <ellipse cx="52" cy="-258" rx="36" ry="6" fill="#6e6255" stroke="#a39585" strokeWidth="1"/>
                <path d="M26,-261 Q52,-300 78,-261 Z" fill="url(#cloche)"/>
                <circle cx="52" cy="-285" r="3" fill="#b3a999"/>
                <ellipse cx="52" cy="-261" rx="27" ry="3" fill="#2e2924" opacity=".6"/>
              </g>

              <g id="waiterTalk">
                <use href="#waiterBody"/>
                <path d="M-32,-204 Q-38,-170 -14,-162" stroke="#c77a45" strokeOpacity=".3" strokeWidth="15" strokeLinecap="round" fill="none"/>
                <path d="M-32,-204 Q-38,-170 -14,-162" stroke="#0c0807" strokeWidth="12" strokeLinecap="round" fill="none"/>
                <rect x="-18" y="-180" width="15" height="20" rx="1" fill="#e0d6c8" transform="rotate(-10 -10 -170)"/>
                <line x1="-15" y1="-172" x2="-7" y2="-174" stroke="#6e6255" strokeWidth="1"/>
                <line x1="-15" y1="-167" x2="-6" y2="-169" stroke="#6e6255" strokeWidth="1"/>
                <g transform="rotate(7 0 -228)"><use href="#waiterHead"/></g>
                <g>
                  <animateTransform attributeName="transform" type="rotate" values="0 32 -204;-7 32 -204;2 32 -204;-5 32 -204;0 32 -204" dur="3.8s" repeatCount="indefinite"/>
                  <path d="M32,-204 Q48,-176 56,-156 Q68,-166 80,-182" stroke="#c77a45" strokeOpacity=".3" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M32,-204 Q48,-176 56,-156 Q68,-166 80,-182" stroke="#0c0807" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M80,-190 Q90,-192 94,-188 Q90,-183 93,-179 Q86,-176 79,-178 Z" fill="#120c0a" stroke="#c77a45" strokeOpacity=".35" strokeWidth="1"/>
                </g>
              </g>

              <g id="chair">
                <path d="M-32,-150 Q0,-164 32,-150 L29,10 L22,10 L22,-128 Q0,-138 -22,-128 L-22,10 L-29,10 Z" fill="#0a0605" stroke="#c77a45" strokeOpacity=".25" strokeWidth="1.2"/>
                <line x1="-18" y1="-100" x2="18" y2="-100" stroke="#0a0605" strokeWidth="5"/>
                <line x1="-18" y1="-70" x2="18" y2="-70" stroke="#0a0605" strokeWidth="5"/>
              </g>
              
              <g id="sconce">
                <circle cx="0" cy="0" r="110" fill="url(#candleGlow)" opacity=".7">
                  <animate attributeName="opacity" values=".6;.8;.65;.75" dur="3.4s" repeatCount="indefinite"/>
                </circle>
                <path d="M-10,30 Q0,10 10,30 Z" fill="#3a2414"/>
                <rect x="-3" y="-2" width="6" height="30" fill="#4a2e18"/>
                <path d="M-14,-2 L14,-2 L9,-22 L-9,-22 Z" fill="#f0b77a" opacity=".85"/>
              </g>
            </defs>

            <rect width="1600" height="570" fill="url(#wall)"/>
            <g stroke="#241510" strokeWidth="2" opacity=".6">
              <line x1="0" y1="80" x2="1600" y2="80"/>
              <line x1="0" y1="88" x2="1600" y2="88"/>
            </g>
            
            <g>
              <polygon points="140,140 260,140 360,900 0,900" fill="url(#moon)"/>
              <polygon points="520,140 640,140 760,900 380,900" fill="url(#moon)"/>
              <polygon points="960,140 1080,140 1210,900 820,900" fill="url(#moon)"/>
              <polygon points="1340,140 1460,140 1600,900 1220,900" fill="url(#moon)"/>
            </g>
            
            <use href="#window" x="140" y="140"/>
            <use href="#window" x="520" y="140"/>
            <use href="#window" x="960" y="140"/>
            <use href="#window" x="1340" y="140"/>
            <use href="#sconce" x="390" y="300"/>
            <use href="#sconce" x="800" y="300"/>
            <use href="#sconce" x="1210" y="300"/>

            <rect x="0" y="455" width="1600" height="115" fill="#0f0806"/>
            <rect x="0" y="452" width="1600" height="6" fill="#2a170e"/>
            <g fill="none" stroke="#221309" strokeWidth="2">
              <rect x="20" y="475" width="160" height="75"/><rect x="210" y="475" width="160" height="75"/>
              <rect x="400" y="475" width="160" height="75"/><rect x="590" y="475" width="160" height="75"/>
              <rect x="780" y="475" width="160" height="75"/><rect x="970" y="475" width="160" height="75"/>
              <rect x="1160" y="475" width="160" height="75"/><rect x="1350" y="475" width="160" height="75"/>
              <rect x="1540" y="475" width="160" height="75"/>
            </g>

            <rect y="570" width="1600" height="330" fill="url(#floor)"/>
            <g stroke="#1c110c" strokeWidth="1.5" opacity=".7">
              <line x1="0" y1="570" x2="-800" y2="900"/><line x1="200" y1="570" x2="-400" y2="900"/>
              <line x1="400" y1="570" x2="0" y2="900"/><line x1="600" y1="570" x2="400" y2="900"/>
              <line x1="800" y1="570" x2="800" y2="900"/><line x1="1000" y1="570" x2="1200" y2="900"/>
              <line x1="1200" y1="570" x2="1600" y2="900"/><line x1="1400" y1="570" x2="2000" y2="900"/>
              <line x1="0" y1="620" x2="1600" y2="620"/><line x1="0" y1="700" x2="1600" y2="700"/>
            </g>
            <ellipse cx="800" cy="640" rx="420" ry="40" fill="url(#bigGlow)" opacity=".7"/>

            <ellipse cx="800" cy="130" rx="340" ry="260" fill="url(#bigGlow)"/>
            <line x1="800" y1="0" x2="800" y2="92" stroke="#3a2616" strokeWidth="3"/>
            <g>
              <path d="M720,112 Q800,150 880,112" stroke="#5a3a20" strokeWidth="3" fill="none"/>
              <path d="M750,108 Q800,132 850,108" stroke="#5a3a20" strokeWidth="2" fill="none"/>
              <ellipse cx="800" cy="104" rx="16" ry="12" fill="#3a2414" stroke="#7a5230" strokeWidth="1.5"/>
              <use href="#candle" x="720" y="112" transform="translate(720 112) scale(.6) translate(-720 -112)"/>
              <use href="#candle" x="760" y="124" transform="translate(760 124) scale(.6) translate(-760 -124)"/>
              <use href="#candle" x="800" y="130" transform="translate(800 130) scale(.6) translate(-800 -130)"/>
              <use href="#candle" x="840" y="124" transform="translate(840 124) scale(.6) translate(-840 -124)"/>
              <use href="#candle" x="880" y="112" transform="translate(880 112) scale(.6) translate(-880 -112)"/>
              <g fill="#e8c9a0" opacity=".6">
                <path d="M740,140 l3,12 l3,-12 Z"/><path d="M780,146 l3,14 l3,-14 Z"/><path d="M820,146 l3,14 l3,-14 Z"/><path d="M860,140 l3,12 l3,-12 Z"/>
              </g>
            </g>

            <g className="fog"><ellipse cx="400" cy="600" rx="500" ry="80" fill="url(#fogG)"/></g>
            <g className="fog2"><ellipse cx="1200" cy="620" rx="520" ry="90" fill="url(#fogG)"/></g>

            <g transform="translate(290 615) scale(.5)">
              <use href="#guestF" x="-72"/><use href="#guestM" x="75"/><use href="#tableFull"/>
            </g>
            <g transform="translate(760 612) scale(.48)">
              <use href="#guestM" x="-70"/><use href="#guestM" x="72"/><use href="#tableFull"/>
            </g>
            <g transform="translate(1290 618) scale(.5)">
              <use href="#guestF" x="-70"/><use href="#guestF" x="74"/><use href="#tableFull"/>
            </g>
            <g transform="translate(1025 608) scale(.44)">
              <use href="#guestF" x="-72"/><use href="#guestM" x="74"/><use href="#tableFull"/>
            </g>

            <g transform="translate(470 705) scale(.78)">
              <use href="#guestM" x="-76"/><use href="#guestF" x="78"/><use href="#tableFull"/>
            </g>
            <g transform="translate(1390 712) scale(.8)">
              <use href="#guestF" x="-74"/><use href="#guestM" x="80"/><use href="#tableFull"/>
            </g>
            <g transform="translate(960 706) scale(.74)">
              <use href="#guestM" x="-74"/><use href="#guestF" x="76"/><use href="#tableFull"/>
            </g>

            <g transform="translate(655 692) scale(.74)">
              <use href="#waiterTray"/>
            </g>
            <g transform="translate(1232 716) scale(.8)">
              <use href="#waiterTalk"/>
            </g>

            <polygon points="305,0 365,0 440,800 240,800" fill="url(#spot)"/>
            <ellipse cx="338" cy="792" rx="80" ry="10" fill="#f0b27a" opacity=".08"/>
            <g transform="translate(338 792) scale(.78 .78)">
              <ellipse cx="0" cy="0" rx="58" ry="9" fill="#000" opacity=".6"/>
              <path d="M-22,-150 L-20,-6 L-6,-6 L-2,-150 Z" fill="#110c0b"/>
              <path d="M3,-150 L7,-6 L21,-6 L22,-150 Z" fill="#0c0908"/>
              <path d="M-24,-8 L-4,-8 L-2,0 L-28,0 Z" fill="#050303"/>
              <path d="M5,-8 L23,-8 L27,0 L3,0 Z" fill="#050303"/>
              <path d="M-38,-262 Q-56,-225 -54,-186" stroke="#a79d8f" strokeWidth="15" strokeLinecap="round" fill="none"/>
              <circle cx="-54" cy="-180" r="7" fill="#b08a70"/>
              <path d="M-60,-178 L-48,-178 L-44,-130 Q-52,-126 -62,-132 Z" fill="#cfc4b4"/>
              <path d="M-44,-272 C-50,-240 -48,-196 -42,-150 L42,-150 C48,-196 50,-240 44,-272 C30,-284 -30,-284 -44,-272 Z" fill="url(#jacket)"/>
              <path d="M-44,-272 C-20,-262 10,-240 22,-150" stroke="#8c8375" strokeWidth="1.5" fill="none"/>
              <g fill="#2a1a14"><circle cx="-6" cy="-248" r="2.2"/><circle cx="-2" cy="-228" r="2.2"/><circle cx="3" cy="-208" r="2.2"/>
                  <circle cx="18" cy="-244" r="2.2"/><circle cx="21" cy="-224" r="2.2"/><circle cx="24" cy="-204" r="2.2"/></g>
              <rect x="-10" y="-286" width="20" height="8" rx="2" fill="#d6ccbd"/>
              <path d="M-30,-196 L30,-196 L46,-46 L-46,-46 Z" fill="#2b0e0d"/>
              <path d="M-30,-196 L30,-196 L32,-186 L-32,-186 Z" fill="#3e1513"/>
              <path d="M-8,-186 L-12,-50 M12,-186 L16,-50" stroke="#1a0808" strokeWidth="1.5"/>
              <path d="M-34,-190 Q-44,-180 -46,-160" stroke="#3e1513" strokeWidth="3" fill="none"/>
              <rect x="-6" y="-296" width="12" height="12" fill="#8c6a54"/>
              <ellipse cx="0" cy="-312" rx="15" ry="18" fill="url(#skin)"/>
              <path d="M8,-318 Q14,-310 9,-300" stroke="#5a3c2c" strokeWidth="1" fill="none" opacity=".6"/>
              <ellipse cx="-17" cy="-322" rx="10" ry="9" fill="#170d0a"/>
              <path d="M-16,-310 C-19,-334 16,-336 16,-314 C8,-322 -6,-322 -16,-310 Z" fill="#1e120e"/>
              <path d="M-15,-312 C-16,-333 14,-338 16,-318 C10,-326 -4,-326 -15,-312 Z" fill="#e0d6c8"/>
              <path d="M13,-312 Q17,-300 14,-292" stroke="#1e120e" strokeWidth="2" fill="none"/>
              <path d="M-14,-306 Q-18,-296 -14,-288" stroke="#1e120e" strokeWidth="2.5" fill="none"/>
              <g>
                <animateTransform attributeName="transform" type="rotate" values="0 38 -264;-4 38 -264;1 38 -264;-3 38 -264;0 38 -264" dur="4.5s" repeatCount="indefinite"/>
                <path d="M38,-264 Q56,-236 58,-208 Q72,-214 86,-228" stroke="#8a8174" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <path d="M86,-236 Q98,-240 104,-236 Q100,-230 104,-226 Q96,-222 86,-222 Z" fill="#7a5a47"/>
                <path d="M88,-236 L94,-246" stroke="#7a5a47" strokeWidth="3" strokeLinecap="round"/>
              </g>
            </g>

            <g transform="translate(130 880) scale(1.15)">
              <use href="#guestF" x="-70"/><use href="#guestM" x="76"/><use href="#tableFull"/>
            </g>
            <g transform="translate(700 885) scale(1.2)">
              <use href="#chair" x="-70" y="6"/><use href="#guestM" x="78"/>
              <use href="#tableSet"/>
              <use href="#glass" x="30" y="-6"/>
              <ellipse cx="-38" cy="8" rx="30" ry="6" fill="#5a0a10" opacity=".9"/>
              <path d="M-52,10 Q-60,30 -58,60" stroke="#4a080d" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".85"/>
              <g transform="translate(-26 4) rotate(-80)"><use href="#glass"/></g>
              <rect x="-100" y="-6" width="22" height="16" rx="1" fill="#d8ccb5" transform="rotate(-12 -89 2)" opacity=".85"/>
            </g>
            <g transform="translate(1110 892) scale(1.1)">
              <use href="#guestF" x="-72"/><use href="#guestM" x="76"/><use href="#tableFull"/>
            </g>
            <g transform="translate(1520 890) scale(1.15)">
              <use href="#guestM" x="-72"/><use href="#guestF" x="70"/><use href="#tableFull"/>
            </g>

            <g fill="#f0c98f">
              <circle className="dust" cx="960" cy="300" r="1.4"/><circle className="dust" cx="1060" cy="420" r="1"/>
              <circle className="dust" cx="1010" cy="520" r="1.6"/><circle className="dust" cx="1100" cy="260" r="1"/>
              <circle className="dust" cx="780" cy="220" r="1.2"/><circle className="dust" cx="840" cy="360" r="1"/>
              <circle className="dust" cx="420" cy="380" r="1.2"/><circle className="dust" cx="1240" cy="360" r="1.3"/>
            </g>

            <rect width="1600" height="900" filter="url(#grain)" opacity=".07"/>
          </svg>
        </div>
        {/* Затенение как в макете */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(180deg,rgba(10,6,5,.88) 0%,rgba(10,6,5,.55) 28%,rgba(10,6,5,.05) 55%,rgba(10,6,5,.25) 100%), radial-gradient(ellipse at 50% 60%,transparent 40%,rgba(0,0,0,.7) 100%)'
          }}
        />
      </div>
    </div>
  );
}