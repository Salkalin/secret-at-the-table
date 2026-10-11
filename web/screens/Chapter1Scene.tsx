export default function Chapter1Scene() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 72% 40%, rgba(40,52,64,.35), transparent 70%), ' +
            'radial-gradient(ellipse 50% 60% at 55% 20%, rgba(90,52,28,.18), transparent 70%), ' +
            'linear-gradient(180deg,#120d0b 0%,#0d0908 55%,#070504 100%)'
        }}
      />

      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px), ' +
            'linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
          backgroundSize: '64px 32px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 65% 45%, #000 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 65% 45%, #000 20%, transparent 80%)'
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 70% at 72% 10%,rgba(240,170,100,.13),rgba(240,170,100,.03) 50%,transparent 75%)'
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <g transform="translate(930,190)" opacity=".75">
          <circle r="34" fill="#0d0907" stroke="#2a211b" strokeWidth="3" />
          <g stroke="#3a2e26" strokeWidth="2">
            <line x1="0" y1="-28" x2="0" y2="-24" />
            <line x1="28" y1="0" x2="24" y2="0" />
            <line x1="0" y1="28" x2="0" y2="24" />
            <line x1="-28" y1="0" x2="-24" y2="0" />
          </g>
          <line x1="0" y1="0" x2="-15" y2="-9" stroke="#6b5a4c" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="0" x2="0" y2="24" stroke="#6b5a4c" strokeWidth="2" strokeLinecap="round" />
          <circle r="2.5" fill="#c4553a" />
        </g>

        <g fill="#0a0706" opacity=".95" transform="translate(560,40)">
          <rect x="760" y="300" width="300" height="5" rx="2" />
          <rect x="790" y="305" width="3" height="40" />
          <ellipse cx="791.5" cy="355" rx="14" ry="12" />
          <rect x="840" y="305" width="3" height="70" />
          <path d="M834 375 h15 v10 q-7 8 -15 0z" />
          <rect x="890" y="305" width="2" height="30" />
          <path d="M885 335 h12 l-2 70 h-8z" />
          <rect x="930" y="305" width="2" height="30" />
          <path d="M924 335 h14 l-3 58 q-4 6 -8 0z" />
          <rect x="975" y="305" width="3" height="50" />
          <circle cx="976.5" cy="380" r="26" />
          <rect x="1025" y="305" width="2" height="36" />
          <path d="M1018 341 h16 v40 h-16z" />
        </g>

        <g>
          <rect x="0" y="600" width="860" height="12" fill="#1a1411" />
          <rect x="0" y="612" width="860" height="94" fill="#0e0a08" />
          <g stroke="#1c1612" strokeWidth="2">
            <line x1="215" y1="620" x2="215" y2="700" />
            <line x1="430" y1="620" x2="430" y2="700" />
            <line x1="645" y1="620" x2="645" y2="700" />
          </g>
          <rect x="200" y="400" width="600" height="6" fill="#16110e" />
          <g fill="#120d0a">
            <rect x="240" y="360" width="30" height="40" rx="3" />
            <rect x="290" y="340" width="22" height="60" rx="3" />
            <circle cx="360" cy="385" r="15" />
            <rect x="420" y="370" width="60" height="30" rx="4" />
            <rect x="520" y="350" width="26" height="50" rx="3" />
          </g>
        </g>

        <g>
          <path d="M860 440 h340 l-50 -70 h-240 z" fill="#110c0a" />
          <rect x="990" y="0" width="110" height="372" fill="#0d0907" />
          <rect x="860" y="440" width="340" height="8" fill="#1a1411" />
        </g>

        <g>
          <rect x="0" y="706" width="1600" height="194" fill="#0f0b09" />
          <rect x="0" y="704" width="1600" height="4" fill="#1d1612" />
          <g stroke="rgba(233,225,214,.035)" strokeWidth="1">
            <line x1="0" y1="760" x2="1600" y2="760" />
            <line x1="0" y1="830" x2="1600" y2="830" />
            <line x1="600" y1="706" x2="300" y2="900" />
            <line x1="900" y1="706" x2="820" y2="900" />
            <line x1="1200" y1="706" x2="1340" y2="900" />
            <line x1="1450" y1="706" x2="1700" y2="900" />
          </g>
        </g>

        <g>
          <rect x="870" y="530" width="320" height="12" rx="2" fill="#241c17" />
          <rect x="880" y="542" width="300" height="164" fill="#16110e" />
          <g fill="#3a2e26">
            <circle cx="915" cy="562" r="6" />
            <circle cx="955" cy="562" r="6" />
            <circle cx="995" cy="562" r="6" />
            <circle cx="1035" cy="562" r="6" />
          </g>
          <rect x="900" y="585" width="260" height="105" rx="4" fill="#0e0a08" stroke="#2a211b" strokeWidth="2" />
          <rect x="915" y="596" width="230" height="5" rx="2" fill="#3a2e26" />
          <rect x="940" y="620" width="180" height="50" rx="3" fill="#0a0706" />
          <path d="M1060 470 h90 v56 q-45 8 -90 0z" fill="#1a1411" />
          <rect x="1052" y="466" width="106" height="6" rx="3" fill="#2a211b" />
          <ellipse cx="930" cy="528" rx="34" ry="5" fill="#0a0706" />
          <rect x="962" y="525" width="40" height="4" rx="2" fill="#0a0706" />
        </g>

        <g transform="translate(1230,430)">
          <rect width="44" height="78" rx="6" fill="#1a1411" />
          <rect x="-2" y="8" width="10" height="56" rx="4" fill="#2a211b" />
          <rect x="14" y="14" width="22" height="30" rx="2" fill="#0a0706" />
          <path d="M3 64 q-6 30 6 40 q10 8 2 20" stroke="#2a211b" strokeWidth="2" fill="none" />
        </g>

        <g>
          <rect x="1330" y="600" width="260" height="14" rx="2" fill="#2e231b" />
          <rect x="1345" y="614" width="10" height="92" fill="#1a1411" />
          <rect x="1565" y="614" width="10" height="92" fill="#1a1411" />
          <rect x="1345" y="670" width="230" height="6" fill="#1a1411" />
          <rect x="1370" y="588" width="150" height="12" rx="2" fill="#3a2a1e" />
          <path d="M1400 584 h80 l16 4 h-96z" fill="#6b5f55" />
          <rect x="1380" y="584" width="22" height="4" rx="1" fill="#2a1b14" />
          <ellipse cx="1550" cy="596" rx="26" ry="5" fill="#241c17" />
          <ellipse cx="1550" cy="594" rx="18" ry="3" fill="#3b1216" />
          <rect x="1530" y="545" width="12" height="46" rx="3" fill="#1a1411" />
        </g>

        <g>
          <ellipse cx="1200" cy="834" rx="170" ry="10" fill="#050303" opacity=".7" />
          <ellipse cx="1335" cy="836" rx="34" ry="5" fill="#2b0c0e" />
          <path d="M1062 812 L1175 806 L1175 826 L1064 830 Z" fill="#1c1613" />
          <path d="M1075 800 L1128 786 L1175 798 L1175 808 L1128 798 L1078 812 Z" fill="#171210" />
          <ellipse cx="1058" cy="821" rx="9" ry="12" fill="#0a0706" />
          <ellipse cx="1072" cy="806" rx="8" ry="10" fill="#0a0706" />
          <path d="M1170 798 Q1220 786 1272 792 L1276 828 Q1220 834 1170 828 Z" fill="#7a7166" />
          <g fill="#4a433c">
            <circle cx="1205" cy="800" r="2" />
            <circle cx="1225" cy="798" r="2" />
            <circle cx="1245" cy="797" r="2" />
          </g>
          <path d="M1250 826 Q1215 836 1185 832" stroke="#6b6359" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="1180" cy="832" r="6" fill="#8a6e5a" />
          <path d="M1262 796 L1250 760 L1240 730" stroke="#7a7166" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="1238" cy="722" r="7" fill="#8a6e5a" />
          <circle cx="1296" cy="808" r="18" fill="#7a5f4d" />
          <path d="M1300 790 q18 2 14 22 q-6 -12 -16 -14z" fill="#1c1310" />
          <ellipse cx="1287" cy="816" rx="4" ry="1.8" fill="#3a0f10" />
          <path d="M1348 812 q-6 -18 10 -20 q6 -10 18 -2 q14 -4 14 10 l-4 16 h-34z" fill="#8a8176" />
          <path d="M1110 842 l50 -6" stroke="#4a4038" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="1165" cy="835" rx="7" ry="4" fill="#4a4038" />
        </g>

        <g>
          <ellipse cx="992" cy="858" rx="50" ry="6" fill="#050303" opacity=".7" />
          <rect x="975" y="770" width="14" height="84" fill="#171210" />
          <rect x="995" y="770" width="14" height="84" fill="#171210" />
          <ellipse cx="980" cy="856" rx="12" ry="5" fill="#0a0706" />
          <ellipse cx="1004" cy="856" rx="12" ry="5" fill="#0a0706" />
          <path d="M962 610 Q990 598 1018 610 L1032 785 L950 785 Z" fill="#a8a095" />
          <line x1="990" y1="614" x2="990" y2="785" stroke="#7d766c" strokeWidth="2" />
          <path d="M978 604 L990 640 L1002 604" fill="#3a3e45" />
          <path d="M964 616 L952 700 L956 760" stroke="#9a9287" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="956" cy="768" r="7" fill="#8a6e5a" />
          <path d="M1016 616 L1030 700 L1034 752" stroke="#9a9287" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="1018" y="758" width="44" height="32" rx="4" fill="#2b1d15" />
          <path d="M1030 758 q10 -12 20 0" stroke="#2b1d15" strokeWidth="3" fill="none" />
          <rect x="1036" y="768" width="8" height="12" fill="#6b1e1a" />
          <rect x="1034" y="772" width="12" height="4" fill="#6b1e1a" />
          <path d="M976 612 Q972 650 990 662 Q1008 650 1004 612" stroke="#1e1e1e" strokeWidth="2.5" fill="none" />
          <circle cx="990" cy="666" r="4.5" fill="#1e1e1e" />
          <rect x="984" y="592" width="12" height="12" fill="#7a5f4d" />
          <circle cx="990" cy="578" r="18" fill="#7a5f4d" />
          <path d="M972 574 q2 -22 20 -20 q18 0 16 18 q-6 -10 -18 -10 q-10 0 -18 12z" fill="#3a3530" />
          <rect x="980" y="576" width="9" height="5" rx="2" fill="none" stroke="#1e1e1e" strokeWidth="1.5" />
          <rect x="993" y="576" width="9" height="5" rx="2" fill="none" stroke="#1e1e1e" strokeWidth="1.5" />
        </g>

        <g>
          <ellipse cx="1470" cy="870" rx="42" ry="5" fill="#050303" opacity=".7" />
          <rect x="1458" y="790" width="10" height="76" fill="#6e5546" />
          <rect x="1474" y="790" width="10" height="76" fill="#6e5546" />
          <ellipse cx="1462" cy="867" rx="9" ry="4" fill="#0a0706" />
          <ellipse cx="1480" cy="867" rx="9" ry="4" fill="#0a0706" />
          <path d="M1450 630 Q1471 620 1492 630 L1506 798 L1436 798 Z" fill="#2e2420" />
          <path d="M1456 662 L1486 662 L1496 792 L1446 792 Z" fill="#938a7e" />
          <rect x="1460" y="636" width="22" height="28" fill="#938a7e" />
          <line x1="1450" y1="664" x2="1492" y2="664" stroke="#6d655b" strokeWidth="3" />
          <path d="M1490 636 L1500 700 L1502 750" stroke="#2e2420" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="1502" cy="756" r="5.5" fill="#8f7060" />
          <path d="M1452 636 L1440 684 L1462 616" stroke="#2e2420" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="1465" y="612" width="10" height="12" fill="#8f7060" />
          <circle cx="1470" cy="600" r="16" fill="#8f7060" />
          <path d="M1453 600 q-2 -22 18 -22 q18 0 16 22 q-4 -14 -16 -14 q-12 0 -18 14z" fill="#2a1b14" />
          <circle cx="1484" cy="584" r="8" fill="#2a1b14" />
          <circle cx="1464" cy="612" r="5.5" fill="#8f7060" />
        </g>
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg,rgba(9,6,5,.92) 0%,rgba(9,6,5,.75) 35%,rgba(9,6,5,.1) 65%,transparent 100%)'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 55% 45%,transparent 45%,rgba(0,0,0,.75) 100%)'
        }}
      />
    </div>
  );
}