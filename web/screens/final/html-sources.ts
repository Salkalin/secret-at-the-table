// Универсальный фон «Последнее слово» для сюжетов без собственной сцены финала (макет Данияра).
// Анимации — в ./effects.ts.

// ============================================================
// Глава 4: Последнее слово (универсальная)
// ============================================================
export const UNIVERSAL_FINAL_HTML = `
<style>
.fin{position:absolute;inset:0;overflow:hidden}
.fin{--accent:#c4573a;--text:#ece3d6;--muted:#9c9187;--line:rgba(236,227,214,.12);--bg:#0c0908}
.fin *{box-sizing:border-box;margin:0;padding:0}
.fin,.fin{height:100%}
.fin{background:var(--bg);color:var(--text);font-family:Inter,system-ui,sans-serif;overflow-x:hidden;min-height:100vh}
.fin .scene{position:fixed;inset:0;z-index:0;overflow:hidden}
.fin .scene svg{width:100%;height:100%;display:block}
.fin .shade{position:fixed;inset:0;z-index:2;pointer-events:none;transition:opacity .6s ease;
            background:
            radial-gradient(ellipse 48% 42% at 50% 36%, rgba(12,9,8,.86), rgba(12,9,8,.5) 55%, rgba(12,9,8,0) 100%),
            linear-gradient(180deg, rgba(12,9,8,.92) 0%, rgba(12,9,8,.35) 22%, rgba(12,9,8,0) 45%)}
.fin .view{position:fixed;right:28px;bottom:28px;z-index:4;display:inline-flex;align-items:center;gap:10px;height:42px;padding:0 18px;border-radius:999px;border:1px solid var(--line);background:rgba(12,9,8,.7);color:var(--muted);font:500 13px Inter,sans-serif;cursor:pointer;transition:color .25s,border-color .25s}
.fin .view:hover{color:var(--text);border-color:rgba(236,227,214,.3)}
.fin.scene-mode .ui{opacity:0;pointer-events:none}
.fin.scene-mode .shade{opacity:.15}
.fin .lamp{transform-box:view-box;transform-origin:800px 0px;animation:swing 7s ease-in-out infinite}
@keyframes swing{0%,100%{transform:rotate(.7deg)}50%{transform:rotate(-.7deg)}}
.fin .flicker{animation:flick 6s infinite}
@keyframes flick{0%,100%{opacity:1}47%{opacity:1}48%{opacity:.7}49%{opacity:1}51%{opacity:.82}52%{opacity:1}}
.fin .ember{animation:ember 3s ease-in-out infinite}
@keyframes ember{0%,100%{opacity:.6}50%{opacity:1}}
.fin .smoke{stroke-dasharray:14 10;animation:smoke 5s linear infinite}
@keyframes smoke{to{stroke-dashoffset:-240}}
.fin .win-rain{animation:wr .6s linear infinite}
@keyframes wr{from{transform:translateY(-60px)}to{transform:translateY(0)}}
</style>
<div class="fin">
<div class="scene">
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f0b09"/><stop offset="1" stop-color="#241812"/></linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c130e"/><stop offset="1" stop-color="#090605"/></linearGradient>
    <radialGradient id="wallGlow" cx="800" cy="330" r="560" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7a4a24" stop-opacity=".45"/><stop offset="1" stop-color="#7a4a24" stop-opacity="0"/></radialGradient>
    <radialGradient id="tableGlow" cx="800" cy="560" r="330" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f0b56a" stop-opacity=".5"/><stop offset="1" stop-color="#f0b56a" stop-opacity="0"/></radialGradient>
    <radialGradient id="floorGlow" cx="800" cy="700" r="420" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#8a5a2e" stop-opacity=".35"/><stop offset="1" stop-color="#8a5a2e" stop-opacity="0"/></radialGradient>
    <radialGradient id="readGlow" cx="1540" cy="470" r="200" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e0a45e" stop-opacity=".38"/><stop offset="1" stop-color="#e0a45e" stop-opacity="0"/></radialGradient>
    <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3c07a" stop-opacity=".2"/><stop offset="1" stop-color="#f3c07a" stop-opacity=".02"/></linearGradient>
    <linearGradient id="tableTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2717"/><stop offset="1" stop-color="#22160e"/></linearGradient>
    <linearGradient id="doorLight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e3f22"/><stop offset="1" stop-color="#8a5c30"/></linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101820"/><stop offset="1" stop-color="#2a3a4a"/></linearGradient>
    <radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
    <clipPath id="glass"><rect x="1212" y="152" width="146" height="311"/></clipPath>
    <filter id="rimWarm" x="-20%" y="-20%" width="140%" height="140%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="1.6" result="d"/>
        <feOffset in="d" dy="-1.8" result="o"/>
        <feFlood flood-color="#d8904a" flood-opacity=".55"/>
        <feComposite in2="o" operator="in" result="rim"/>
        <feMerge><feMergeNode in="rim"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="rimCool" x="-20%" y="-20%" width="140%" height="140%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="1.6" result="d"/>
        <feOffset in="d" dx="-1.5" result="o"/>
        <feFlood flood-color="#7f9ab8" flood-opacity=".6"/>
        <feComposite in2="o" operator="in" result="rim"/>
        <feMerge><feMergeNode in="rim"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <pattern id="stripes" width="28" height="10" patternUnits="userSpaceOnUse"><rect width="2" height="10" fill="#e8c9a0" opacity=".035"/></pattern>
</defs>

<!-- room -->
<rect width="1600" height="600" fill="url(#wall)"/>
<rect width="1600" height="600" fill="url(#stripes)"/>
<rect width="1600" height="600" fill="url(#wallGlow)" class="flicker"/>
<rect y="586" width="1600" height="16" fill="#0d0907"/>
<rect y="600" width="1600" height="300" fill="url(#floor)"/>
<g stroke="#000" stroke-opacity=".45" stroke-width="2">
    <path d="M0 600L-800 900M160 600L-480 900M320 600L-160 900M480 600L160 900M640 600L480 900M800 600L800 900M960 600L1120 900M1120 600L1440 900M1280 600L1760 900M1440 600L2080 900"/>
</g>
<rect y="600" width="1600" height="300" fill="url(#floorGlow)" class="flicker"/>

<!-- corkboard -->
<rect x="500" y="170" width="224" height="150" fill="#140d09"/>
<rect x="508" y="178" width="208" height="134" fill="#2e2016"/>
<g fill="#bfb09a" opacity=".55">
    <rect x="522" y="190" width="34" height="28" transform="rotate(-6 539 204)"/>
    <rect x="598" y="186" width="30" height="38" transform="rotate(4 613 205)"/>
    <rect x="668" y="194" width="34" height="26" transform="rotate(-3 685 207)"/>
    <rect x="540" y="254" width="40" height="30" transform="rotate(5 560 269)"/>
    <rect x="630" y="258" width="30" height="36" transform="rotate(-8 645 276)"/>
</g>
<path d="M539 192L613 188L685 196M613 188L560 256L645 260L685 196" stroke="#b04a32" stroke-width="1.4" fill="none" opacity=".85"/>
<g fill="#c4573a"><circle cx="539" cy="192" r="3"/><circle cx="613" cy="188" r="3"/><circle cx="685" cy="196" r="3"/><circle cx="560" cy="256" r="3"/><circle cx="645" cy="260" r="3"/></g>

<!-- clock -->
<circle cx="990" cy="230" r="30" fill="#140d09" stroke="#3a2718" stroke-width="3"/>
<path d="M990 230V210M990 230L1004 238" stroke="#8a6a48" stroke-width="2.5" stroke-linecap="round"/>

<!-- door -->
<rect x="55" y="160" width="180" height="442" fill="#0e0908"/>
<rect x="72" y="175" width="146" height="427" fill="url(#doorLight)" class="flicker"/>
<polygon points="72,175 124,192 124,590 72,602" fill="#130c09"/>
<circle cx="114" cy="400" r="4" fill="#6a4a2c"/>
<polygon points="72,602 218,602 330,790 20,810" fill="#8a5a2e" opacity=".16"/>

<!-- window -->
<rect x="1200" y="140" width="170" height="335" fill="#0e0a08"/>
<rect x="1212" y="152" width="146" height="311" fill="url(#sky)"/>
<g clip-path="url(#glass)">
    <rect id="flash" x="1212" y="152" width="146" height="311" fill="#c9d8ee" opacity="0"/>
    <path id="boltGlow" d="" stroke="#9fc0ff" stroke-width="7" fill="none" opacity="0" filter="url(#blur2)"/>
    <path id="bolt" d="" stroke="#f2f6ff" stroke-width="1.8" fill="none" stroke-linejoin="round" opacity="0"/>
    <g fill="#0b1118">
        <rect x="1212" y="380" width="30" height="90"/><rect x="1240" y="350" width="24" height="120"/><rect x="1262" y="395" width="40" height="80"/><rect x="1300" y="330" width="26" height="140"/><rect x="1324" y="372" width="36" height="100"/>
    </g>
    <g fill="#d9a55a" opacity=".6">
        <rect x="1246" y="362" width="4" height="5"/><rect x="1254" y="380" width="4" height="5"/><rect x="1306" y="345" width="4" height="5"/><rect x="1314" y="372" width="4" height="5"/><rect x="1332" y="390" width="4" height="5"/><rect x="1270" y="410" width="4" height="5"/>
    </g>
    <g id="winRain" class="win-rain" stroke="#9fb6cc" stroke-opacity=".35" stroke-width="1"></g>
</g>
<path d="M1285 152V463M1212 236H1358M1212 352H1358" stroke="#0e0a08" stroke-width="7"/>
<polygon points="1212,236 1282,236 1292,194 1202,194" fill="#34465a" opacity=".55" stroke="#0e0a08" stroke-width="5"/>
<rect x="1192" y="470" width="186" height="12" fill="#1a110c"/>
<polygon id="flashRoom" points="1212,482 1358,482 1420,640 1170,650" fill="#6f8aa8" opacity=".06"/>

<!-- detective 6: smoking at window -->
<g filter="url(#rimCool)" fill="#0a0706">
    <rect x="1293" y="286" width="18" height="16"/>
    <circle cx="1302" cy="268" r="23"/>
    <path d="M1262 305C1280 292 1325 292 1345 305L1352 460L1340 470L1336 622L1316 624L1307 482L1298 482L1290 624L1270 624L1268 470L1255 460Z"/>
    <path d="M1272 312L1246 302L1254 258" stroke="#0a0706" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="1254" cy="256" r="9"/>
    <path d="M1340 314L1362 372L1336 402" stroke="#0a0706" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="1276" cy="628" rx="16" ry="6"/><ellipse cx="1330" cy="628" rx="16" ry="6"/>
</g>
<line x1="1250" y1="250" x2="1241" y2="242" stroke="#d8d0c4" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="1241" cy="241" r="7" fill="#ff7a3a" opacity=".35" filter="url(#blur2)" class="ember"/>
<circle cx="1241" cy="241" r="2.4" fill="#ff8a45" class="ember"/>
<path class="smoke" d="M1241 236C1232 220 1250 210 1240 194C1230 180 1248 168 1238 150C1230 136 1246 124 1236 106" stroke="#d6cec4" stroke-opacity=".3" stroke-width="5" fill="none" stroke-linecap="round" filter="url(#blur2)"/>

<!-- armchair corner: detective 7 reading dossier -->
<rect x="1360" y="300" width="240" height="420" fill="url(#readGlow)" class="flicker"/>
<line x1="1586" y1="700" x2="1586" y2="400" stroke="#120c09" stroke-width="5"/>
<polygon points="1556,402 1600,402 1592,368 1564,368" fill="#3a2616"/>
<ellipse cx="1578" cy="404" rx="20" ry="4" fill="#f0c07a" opacity=".7"/>
<g filter="url(#rimWarm)">
    <path d="M1395 610L1392 470C1392 440 1410 430 1470 430C1535 430 1555 440 1555 470L1552 610Z" fill="#1c120d"/>
    <rect x="1385" y="600" width="180" height="85" rx="8" fill="#170f0b"/>
    <rect x="1532" y="556" width="42" height="112" rx="18" fill="#1f140e"/>
    <rect x="1390" y="684" width="10" height="16" fill="#0c0806"/><rect x="1550" y="684" width="10" height="16" fill="#0c0806"/>
</g>
<g filter="url(#rimWarm)" fill="#0a0706">
    <circle cx="1470" cy="490" r="21"/>
    <path d="M1438 518C1450 506 1490 506 1504 518L1510 608L1432 608Z"/>
    <path d="M1488 604L1418 598L1440 668" stroke="#0a0706" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M1452 606L1404 616L1396 690" stroke="#0a0706" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="1386" cy="696" rx="18" ry="6"/><ellipse cx="1452" cy="674" rx="14" ry="6"/>
</g>
<g transform="rotate(-12 1446 530)">
    <rect x="1424" y="498" width="46" height="60" fill="#a8997c"/>
    <rect x="1418" y="502" width="46" height="60" fill="#cdbf9f"/>
    <rect x="1424" y="508" width="16" height="20" fill="#3a332c"/>
    <path d="M1444 510H1458M1444 516H1458M1444 522H1454M1424 536H1458M1424 542H1456M1424 548H1450" stroke="#6d604c" stroke-width="1.2"/>
</g>
<rect x="1520" y="552" width="46" height="120" rx="18" fill="#1f140e" filter="url(#rimWarm)"/>
<g fill="#0a0706">
    <path d="M1444 522L1428 556L1420 540" stroke="#0a0706" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M1498 522L1484 560L1464 548" stroke="#0a0706" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="1419" cy="538" r="7"/><circle cx="1463" cy="546" r="7"/>
</g>
<g transform="translate(1330 704)"><rect width="42" height="8" fill="#5a4a36"/><rect x="3" y="-7" width="40" height="8" fill="#6d5a40"/><rect x="-2" y="-13" width="38" height="7" fill="#4c3e2c"/></g>

<!-- chairs for side detectives -->
<g fill="#120b08" filter="url(#rimWarm)">
    <rect x="432" y="432" width="12" height="270"/>
    <rect x="432" y="590" width="92" height="12"/>
    <rect x="510" y="602" width="10" height="100"/>
    <rect x="1156" y="432" width="12" height="270"/>
    <rect x="1076" y="590" width="92" height="12"/>
    <rect x="1080" y="602" width="10" height="100"/>
</g>
<!-- side legs (under table) -->
<g fill="#0a0706">
    <path d="M466 588L560 594L566 704" stroke="#0a0706" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="584" cy="708" rx="20" ry="6"/>
    <path d="M1134 588L1040 594L1034 704" stroke="#0a0706" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="1016" cy="708" rx="20" ry="6"/>
</g>

<!-- table -->
<ellipse cx="800" cy="748" rx="340" ry="28" fill="#000" opacity=".55"/>
<rect x="590" y="630" width="12" height="60" fill="#0c0806"/><rect x="998" y="630" width="12" height="60" fill="#0c0806"/>
<polygon points="580,520 1020,520 1080,610 520,610" fill="url(#tableTop)"/>
<polygon points="580,520 1020,520 1080,610 520,610" fill="url(#tableGlow)" class="flicker"/>
<rect x="520" y="610" width="560" height="22" fill="#140c08"/>
<rect x="532" y="632" width="16" height="112" fill="#100a07"/><rect x="1052" y="632" width="16" height="112" fill="#100a07"/>
<g id="tableItems"></g>
<!-- hat on table -->
<g fill="#0e0907" filter="url(#rimWarm)"><ellipse cx="606" cy="552" rx="30" ry="7"/><path d="M588 552C588 536 594 530 606 530C618 530 624 536 624 552Z"/></g>
<!-- ashtray -->
<ellipse cx="1000" cy="540" rx="16" ry="5" fill="#2a2420" stroke="#5a4c40" stroke-width="1"/>
<!-- bottle and glass -->
<g filter="url(#rimWarm)">
    <path d="M793 446H807V470C807 478 820 482 820 494V522H780V494C780 482 793 478 793 470Z" fill="#1d130a"/>
    <path d="M784 500V520H816V500Z" fill="#8a4f1c" opacity=".55"/>
    <rect x="786" y="498" width="28" height="14" fill="#c9b48c" opacity=".7"/>
    <path d="M797 454V468" stroke="#e8b070" stroke-width="1.5" opacity=".6"/>
</g>
<path d="M730 504H748L746 524H732Z" fill="#c9853f" opacity=".45" stroke="#d8b080" stroke-width="1" stroke-opacity=".5"/>

<!-- detective A: holding head -->
<g filter="url(#rimWarm)" fill="#0a0706">
    <path d="M630 524C632 480 645 456 690 452C735 456 748 480 750 524Z"/>
    <ellipse cx="690" cy="436" rx="22" ry="25"/>
    <path d="M638 520L670 426M742 520L710 426" stroke="#0a0706" stroke-width="17" stroke-linecap="round" fill="none"/>
    <circle cx="670" cy="424" r="11"/><circle cx="710" cy="424" r="11"/>
</g>
<!-- detective B: drinking whiskey -->
<g filter="url(#rimWarm)" fill="#0a0706">
    <path d="M860 524C862 478 878 454 920 450C962 454 978 478 980 524Z"/>
    <ellipse cx="924" cy="420" rx="22" ry="26" transform="rotate(-22 924 420)"/>
    <path d="M870 470L878 440L902 412" stroke="#0a0706" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M966 486L1000 522" stroke="#0a0706" stroke-width="17" stroke-linecap="round" fill="none"/>
    <circle cx="902" cy="410" r="9"/>
</g>
<path d="M896 388L912 392L906 410L892 406Z" fill="#c9853f" opacity=".7" stroke="#e0bb88" stroke-width="1" stroke-opacity=".6"/>

<!-- detective C: talking, left end -->
<g filter="url(#rimWarm)" fill="#0a0706">
    <path d="M452 440C444 490 446 540 452 590L522 590C528 540 520 475 506 440Z"/>
    <circle cx="480" cy="408" r="21"/>
    <path d="M499 404L508 411L499 416Z"/>
    <ellipse cx="480" cy="390" rx="34" ry="6"/>
    <path d="M460 390C460 370 467 362 481 362C495 362 501 370 501 390Z"/>
    <path d="M500 456L528 514L570 480" stroke="#0a0706" stroke-width="19" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="574" cy="474" rx="7" ry="11" transform="rotate(30 574 474)"/>
</g>
<!-- detective D: talking, right end -->
<g filter="url(#rimWarm)" fill="#0a0706">
    <path d="M1148 440C1156 490 1154 540 1148 590L1078 590C1072 540 1080 475 1094 440Z"/>
    <circle cx="1122" cy="402" r="22"/>
    <path d="M1102 398L1093 405L1102 410Z"/>
    <path d="M1100 392C1104 376 1140 374 1144 396" stroke="#0a0706" stroke-width="6" fill="none"/>
    <path d="M1102 456L1068 502L1036 470" stroke="#0a0706" stroke-width="19" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="1034" cy="468" r="8"/>
    <path d="M1030 464L1018 456" stroke="#0a0706" stroke-width="5" stroke-linecap="round"/>
</g>

<!-- lamp -->
<g class="lamp">
    <polygon points="734,292 866,292 1110,612 490,612" fill="url(#cone)" class="flicker"/>
    <line x1="800" y1="0" x2="800" y2="252" stroke="#0a0706" stroke-width="3"/>
    <path d="M772 250H828L870 292H730Z" fill="#1a110a" filter="url(#rimWarm)"/>
    <ellipse cx="800" cy="293" rx="42" ry="6" fill="#f7cf8e" class="flicker"/>
    <ellipse cx="800" cy="296" rx="70" ry="18" fill="#f3b86a" opacity=".45" filter="url(#blur6)" class="flicker"/>
</g>

<g id="floorItems"></g>

<!-- detective 5: running to the door, putting on hat and coat -->
<g filter="url(#rimWarm)" fill="#0a0706">
    <path d="M348 470L388 556L432 606" stroke="#0a0706" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M326 470L290 556L262 638" stroke="#0a0706" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="250" cy="644" rx="22" ry="7"/>
    <ellipse cx="444" cy="610" rx="18" ry="6" transform="rotate(28 444 610)"/>
    <path d="M290 320C300 310 350 310 364 322L374 400C402 452 428 520 450 576C424 586 400 572 384 592C366 562 350 544 334 544C318 548 302 552 284 556C290 500 284 430 290 320Z"/>
    <path d="M362 330C402 340 434 382 460 424L444 434C424 404 398 380 366 364Z"/>
    <rect x="296" y="302" width="18" height="18"/>
    <circle cx="306" cy="292" r="23"/>
    <path d="M296 332L262 300L270 266" stroke="#0a0706" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M358 334L396 382L420 362" stroke="#0a0706" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <ellipse cx="308" cy="258" rx="40" ry="7" transform="rotate(-8 308 258)"/>
    <path d="M286 258C285 238 292 226 308 225C324 224 331 236 332 254Z"/>
    <circle cx="272" cy="262" r="9"/>
</g>

<rect width="1600" height="900" fill="url(#vig)"/>
<rect width="1600" height="900" filter="url(#grain)" opacity=".07"/>
</svg>
</div>

<div class="shade"></div>
</div>
`;

