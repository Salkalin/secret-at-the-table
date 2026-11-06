// Фоны экранов «Итоги раундов» и «Разгадка» (макеты Данияра, архив «подозреваемые ...»).
// Только слой фона; анимации — в ./result-effects.ts. Стили ограничены корневым классом сцены.

// ============================================================
// Итоги раунда 1: Эмма
// ============================================================
export const THEATRE_RESULT_1_HTML = `
<style>
.th-r1{position:absolute;inset:0;overflow:hidden}
.th-r1 *{box-sizing:border-box;margin:0;padding:0}
.th-r1,.th-r1{height:100%}
.th-r1{background:#0a0706;color:#e9e1d6;font-family:'Inter',sans-serif;overflow-x:hidden;min-height:100vh}
.th-r1 .scene{position:fixed;inset:0;width:100%;height:100%;z-index:0;display:block}
.th-r1 .scene g.layer{transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.th-r1 .shade-top{position:fixed;inset:0;z-index:1;pointer-events:none;
            background:linear-gradient(180deg,rgba(8,6,5,.92) 0%,rgba(8,6,5,.55) 30%,rgba(8,6,5,0) 55%),
                       radial-gradient(ellipse at 50% 60%,transparent 45%,rgba(0,0,0,.75) 100%)}
.th-r1 .dust{position:fixed;inset:0;z-index:2;pointer-events:none;overflow:hidden}
.th-r1 .steam{fill:none;stroke:#e9dccb;stroke-width:2.2;stroke-linecap:round;opacity:0;animation:steam 4.5s ease-in-out infinite}
.th-r1 .steam.s2{animation-delay:1.5s}
.th-r1 .steam.s3{animation-delay:3s}
@keyframes steam{0%{opacity:0;transform:translateY(8px)}30%{opacity:.35}100%{opacity:0;transform:translateY(-38px)}}
.th-r1 .polish{animation:polish 1.6s ease-in-out infinite;transform-origin:918px 467px}
@keyframes polish{0%,100%{transform:translate(0,0)}50%{transform:translate(-6px,6px)}}
.th-r1 .flicker{animation:flicker 7s infinite}
@keyframes flicker{0%,100%{opacity:1}47%{opacity:1}48%{opacity:.75}49%{opacity:1}72%{opacity:.9}}
.th-r1 .flame{animation:flame 1.2s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center bottom}
@keyframes flame{from{transform:scaleY(1)}to{transform:scaleY(1.25) translateX(.5px)}}
.th-r1 .talk{animation:talk 3s ease-in-out infinite;transform-origin:1015px 440px}
@keyframes talk{0%,100%{transform:rotate(0)}50%{transform:rotate(6deg)}}
.th-r1 .top{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-bottom:22px;border-bottom:1px solid rgba(233,225,214,.08)}
.th-r1 .card{margin-top:40px;padding:34px 30px;border-radius:14px;border:1px solid rgba(233,225,214,.12);background:rgba(20,16,14,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);max-width:1200px;animation:rise .8s ease both}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media(max-width:640px){.th-r1 .card{padding:24px 20px}}
</style>
<div class="th-r1">
<svg class="scene" id="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#140d0b"/><stop offset=".6" stop-color="#21140f"/><stop offset="1" stop-color="#150d0a"/>
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1a110d"/><stop offset="1" stop-color="#060404"/>
        </linearGradient>
        <radialGradient id="barGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#d98a52" stop-opacity=".38"/><stop offset="1" stop-color="#d98a52" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bulb" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#ffd8a8" stop-opacity=".9"/><stop offset=".3" stop-color="#e79a5c" stop-opacity=".35"/><stop offset="1" stop-color="#e79a5c" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#f0b27a" stop-opacity=".22"/><stop offset="1" stop-color="#f0b27a" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="mirror" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#1e1612"/><stop offset=".45" stop-color="#2d211a"/><stop offset=".5" stop-color="#3a2a20"/><stop offset=".55" stop-color="#2a1f18"/><stop offset="1" stop-color="#15100d"/>
        </linearGradient>
        <linearGradient id="counter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2c1b13"/><stop offset="1" stop-color="#0f0907"/>
        </linearGradient>
        <linearGradient id="velvet" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#1c0708"/><stop offset=".3" stop-color="#3b0f11"/><stop offset=".5" stop-color="#1f0809"/><stop offset=".75" stop-color="#361013"/><stop offset="1" stop-color="#160506"/>
        </linearGradient>
        <linearGradient id="porcelain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#5a5046"/><stop offset=".6" stop-color="#b9ab96"/><stop offset="1" stop-color="#7a6d5e"/>
        </linearGradient>
        <linearGradient id="tableTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2a1a12"/><stop offset="1" stop-color="#120b08"/>
        </linearGradient>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="blur20"><feGaussianBlur stdDeviation="20"/></filter>

        <!-- Seated guest facing right -->
        <g id="guest">
            <rect x="-106" y="-40" width="7" height="122" rx="2" fill="#0a0605"/>
            <path d="M-92,-50 C-95,-30 -94,0 -90,25 L-55,25 C-52,0 -54,-30 -58,-50 C-66,-57 -84,-57 -92,-50 Z" fill="#0d0908" stroke="#c8744a" stroke-opacity=".22" stroke-width="1.5"/>
            <rect x="-80" y="-60" width="10" height="10" fill="#0d0908"/>
            <circle cx="-74" cy="-72" r="15" fill="#0d0908" stroke="#c8744a" stroke-opacity=".25" stroke-width="1.5"/>
            <path d="M-90,25 L-40,25 L-40,38 L-90,38 Z" fill="#0b0706"/>
            <rect x="-50" y="30" width="12" height="52" fill="#0b0706"/>
            <path d="M-62,-40 Q-45,-8 -22,-6" fill="none" stroke="#0d0908" stroke-width="10" stroke-linecap="round"/>
        </g>
        <g id="tableSet">
            <use href="#guest"/>
            <use href="#guest" transform="scale(-1,1)"/>
            <rect x="-4" y="0" width="8" height="78" fill="#0e0907"/>
            <ellipse cx="0" cy="80" rx="26" ry="5" fill="#0e0907"/>
            <ellipse cx="0" cy="0" rx="52" ry="9" fill="#1c120d" stroke="#c8744a" stroke-opacity=".35" stroke-width="1"/>
            <circle cx="0" cy="-16" r="26" fill="url(#bulb)" opacity=".7"/>
            <rect x="-4" y="-12" width="8" height="12" rx="2" fill="#6e5a44" opacity=".8"/>
            <ellipse class="flame" cx="0" cy="-16" rx="2.2" ry="4.5" fill="#ffcf8f"/>
            <path d="M22,-14 L30,-14 L28,-2 L24,-2 Z" fill="#6b5a48" opacity=".6"/>
        </g>
    </defs>

    <g class="layer" id="layer-back">
        <!-- wall -->
        <rect x="-60" y="-40" width="1720" height="700" fill="url(#wall)"/>
        <g stroke="#3a261c" stroke-opacity=".35" fill="none">
            <rect x="110" y="150" width="200" height="270"/><rect x="1370" y="150" width="190" height="270"/>
            <rect x="110" y="460" width="200" height="150"/><rect x="1370" y="460" width="190" height="150"/>
        </g>
        <line x1="-60" y1="440" x2="1660" y2="440" stroke="#4a3022" stroke-opacity=".5"/>
        <rect x="-60" y="440" width="1720" height="200" fill="#0f0907" opacity=".45"/>

        <!-- posters -->
        <g>
            <rect x="440" y="215" width="130" height="180" fill="#2a1712" stroke="#6b4a33" stroke-width="3"/>
            <rect x="452" y="227" width="106" height="156" fill="#3a1c15"/>
            <circle cx="505" cy="285" r="30" fill="none" stroke="#c8744a" stroke-opacity=".6" stroke-width="1.5"/>
            <path d="M488,280 Q505,300 522,280 M492,272 L500,274 M510,274 L518,272" stroke="#c8744a" stroke-opacity=".7" stroke-width="1.5" fill="none"/>
            <text x="505" y="345" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="12" fill="#d9a07a" fill-opacity=".75" letter-spacing="1.5">ФИНАЛЬНЫЙ</text>
            <text x="505" y="362" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="12" fill="#d9a07a" fill-opacity=".75" letter-spacing="1.5">ЗАНАВЕС</text>
        </g>
        <g>
            <rect x="1215" y="235" width="110" height="150" fill="#1e1512" stroke="#5a3e2c" stroke-width="3"/>
            <rect x="1226" y="246" width="88" height="128" fill="#241a15"/>
            <path d="M1270,275 L1290,330 L1250,330 Z" fill="none" stroke="#9c6b4c" stroke-opacity=".5"/>
            <text x="1270" y="355" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="11" fill="#b08a70" fill-opacity=".6" letter-spacing="2">ГРАНД</text>
        </g>

        <!-- bar back -->
        <ellipse cx="910" cy="420" rx="420" ry="230" fill="url(#barGlow)"/>
        <text x="910" y="222" text-anchor="middle" font-family="Cormorant Garamond,serif" font-weight="600" font-size="30" letter-spacing="14" fill="#c8744a" fill-opacity=".55">БУФЕТ</text>
        <rect x="680" y="240" width="460" height="200" fill="url(#mirror)" stroke="#4d3324" stroke-width="4"/>
        <rect x="680" y="318" width="460" height="5" fill="#4d3324"/>
        <rect x="680" y="398" width="460" height="5" fill="#4d3324"/>
        <g id="bottles"></g>

        <!-- floor -->
        <rect x="-60" y="640" width="1720" height="300" fill="url(#floor)"/>
        <ellipse cx="910" cy="660" rx="380" ry="30" fill="#d98a52" opacity=".08" filter="url(#blur20)"/>

        <!-- bartender -->
        <g>
            <path d="M830,520 L834,450 C836,430 855,421 880,421 C905,421 924,430 926,450 L930,520 Z" fill="#0f0a08" stroke="#e39a63" stroke-opacity=".3" stroke-width="1.5"/>
            <path d="M864,424 L880,470 L896,424" fill="#6d6257" opacity=".55"/>
            <path d="M870,428 L880,432 L890,428 L890,438 L880,434 L870,438 Z" fill="#1a0f0b"/>
            <rect x="872" y="410" width="16" height="16" fill="#0f0a08"/>
            <circle cx="880" cy="395" r="24" fill="#120c0a" stroke="#e39a63" stroke-opacity=".35" stroke-width="1.5"/>
            <path d="M857,390 C856,370 872,364 885,366 C900,368 906,380 904,390 C895,380 870,380 857,390 Z" fill="#080504"/>
            <path d="M845,445 C852,470 862,490 893,482" fill="none" stroke="#0f0a08" stroke-width="16" stroke-linecap="round"/>
            <g>
                <path d="M890,445 Q890,476 905,478 Q920,476 920,445 Z" fill="#e8c9a0" fill-opacity=".18" stroke="#f3d4a8" stroke-opacity=".7" stroke-width="1.3"/>
                <line x1="905" y1="478" x2="905" y2="498" stroke="#f3d4a8" stroke-opacity=".7" stroke-width="1.5"/>
                <ellipse cx="905" cy="499" rx="9" ry="2.5" fill="none" stroke="#f3d4a8" stroke-opacity=".7" stroke-width="1.3"/>
                <path d="M896,452 Q898,466 903,470" stroke="#fff3df" stroke-opacity=".6" stroke-width="1.5" fill="none"/>
            </g>
            <circle cx="893" cy="484" r="7" fill="#1a110d"/>
            <g class="polish">
                <path d="M915,445 C930,460 935,475 918,467" fill="none" stroke="#0f0a08" stroke-width="15" stroke-linecap="round"/>
                <path d="M905,452 Q918,448 928,458 L924,482 Q912,476 902,472 Z" fill="#b9ad9c" opacity=".55"/>
                <circle cx="918" cy="466" r="7" fill="#1a110d"/>
            </g>
        </g>

        <!-- counter -->
        <rect x="660" y="520" width="500" height="122" fill="url(#counter)"/>
        <rect x="650" y="510" width="520" height="14" rx="3" fill="#3a2419"/>
        <rect x="650" y="510" width="520" height="2" fill="#e39a63" opacity=".45"/>
        <g stroke="#3a2419" stroke-opacity=".6"><line x1="760" y1="530" x2="760" y2="642"/><line x1="860" y1="530" x2="860" y2="642"/><line x1="960" y1="530" x2="960" y2="642"/><line x1="1060" y1="530" x2="1060" y2="642"/></g>
        <path d="M740,510 L744,494 L752,494 L756,510 Z" fill="#c9b596" opacity=".35"/>
        <path d="M790,510 L788,480 L798,480 L796,510 Z" fill="#3f5a3a" opacity=".5"/>

        <!-- waiter -->
        <g>
            <rect x="1022" y="640" width="17" height="58" fill="#0a0605"/>
            <rect x="1052" y="640" width="17" height="58" fill="#0a0605"/>
            <path d="M1016,698 L1042,698 L1042,706 L1010,706 Z M1050,698 L1072,698 L1074,706 L1046,706 Z" fill="#050303"/>
            <path d="M1015,425 C1008,432 1004,452 1005,480 L1010,560 L1082,560 L1086,480 C1087,452 1082,432 1076,425 C1064,419 1027,419 1015,425 Z" fill="#0f0a08" stroke="#e39a63" stroke-opacity=".3" stroke-width="1.5"/>
            <path d="M1012,538 L1082,538 L1090,650 L1004,650 Z" fill="#8c8073" opacity=".45"/>
            <path d="M1036,424 L1045,445 L1054,424" fill="#8c8073" opacity=".5"/>
            <rect x="1037" y="410" width="16" height="16" fill="#0f0a08"/>
            <circle cx="1045" cy="395" r="23" fill="#120c0a" stroke="#e39a63" stroke-opacity=".35" stroke-width="1.5"/>
            <path d="M1024,393 L1018,398 L1025,401 Z" fill="#120c0a"/>
            <path d="M1024,388 C1024,370 1040,364 1052,366 C1066,368 1070,382 1068,396 C1060,384 1040,382 1024,388 Z" fill="#080504"/>
            <path d="M1080,440 C1100,470 1108,495 1124,470" fill="none" stroke="#0f0a08" stroke-width="15" stroke-linecap="round"/>
            <ellipse cx="1128" cy="464" rx="40" ry="6" fill="#4a3a2d" stroke="#e39a63" stroke-opacity=".4"/>
            <path d="M1112,462 L1115,450 L1121,450 L1124,462 Z M1136,462 L1138,446 L1146,446 L1147,462 Z" fill="#b9a891" opacity=".5"/>
            <g class="talk">
                <path d="M1015,440 C1000,470 995,495 978,482" fill="none" stroke="#0f0a08" stroke-width="15" stroke-linecap="round"/>
                <circle cx="977" cy="481" r="7" fill="#1a110d"/>
                <path d="M1002,458 L1014,462 L1008,500 L996,494 Z" fill="#b3a795" opacity=".5"/>
            </g>
        </g>

        <!-- lamps over bar -->
        <g class="flicker">
            <polygon points="742,188 778,188 870,520 650,520" fill="url(#cone)"/>
            <polygon points="1022,188 1058,188 1150,520 930,520" fill="url(#cone)"/>
        </g>
        <g>
            <line x1="760" y1="-10" x2="760" y2="160" stroke="#2a1c15" stroke-width="2"/>
            <path d="M738,188 L744,160 L776,160 L782,188 Z" fill="#2b1c14" stroke="#c8744a" stroke-opacity=".5"/>
            <circle cx="760" cy="192" r="46" fill="url(#bulb)" class="flicker"/>
            <line x1="1040" y1="-10" x2="1040" y2="160" stroke="#2a1c15" stroke-width="2"/>
            <path d="M1018,188 L1024,160 L1056,160 L1062,188 Z" fill="#2b1c14" stroke="#c8744a" stroke-opacity=".5"/>
            <circle cx="1040" cy="192" r="46" fill="url(#bulb)"/>
        </g>
    </g>

    <g class="layer" id="layer-mid">
        <ellipse cx="900" cy="560" rx="700" ry="90" fill="#8a6a55" opacity=".05" filter="url(#blur20)"/>
        <use href="#tableSet" transform="translate(570,612) scale(.85)"/>
        <use href="#tableSet" transform="translate(1265,616) scale(.85)"/>
        <g transform="translate(1450,620) scale(.9)">
            <use href="#tableSet"/>
            <path d="M52,-86 C56,-100 88,-100 92,-86 L100,-84 C90,-80 54,-80 44,-84 Z" fill="#0d0908" stroke="#c8744a" stroke-opacity=".25"/>
        </g>
        <!-- curtains -->
        <path d="M-60,-40 L1660,-40 L1660,40 Q1573,80 1488,40 Q1403,80 1318,40 Q1233,80 1148,40 Q1063,80 978,40 Q893,80 808,40 Q723,80 638,40 Q553,80 468,40 Q383,80 298,40 Q213,80 128,40 Q43,80 -60,40 Z" fill="#2a0a0b"/>
        <path d="M-60,40 Q43,80 128,40 Q213,80 298,40 Q383,80 468,40 Q553,80 638,40 Q723,80 808,40 Q893,80 978,40 Q1063,80 1148,40 Q1233,80 1318,40 Q1403,80 1488,40 Q1573,80 1660,40" fill="none" stroke="#c8744a" stroke-opacity=".35" stroke-width="1.5"/>
        <path d="M-60,-40 L90,-40 C80,200 60,500 70,940 L-60,940 Z" fill="url(#velvet)"/>
        <path d="M1660,-40 L1520,-40 C1530,200 1545,500 1535,940 L1660,940 Z" fill="url(#velvet)"/>
    </g>

    <g class="layer" id="layer-front">
        <!-- lamp over the girl -->
        <line x1="330" y1="-60" x2="330" y2="300" stroke="#1e140f" stroke-width="2"/>
        <path d="M296,340 L306,300 L354,300 L364,340 Z" fill="#241710" stroke="#c8744a" stroke-opacity=".6"/>
        <polygon points="300,340 360,340 640,810 20,820" fill="url(#cone)" class="flicker"/>
        <circle cx="330" cy="345" r="70" fill="url(#bulb)" class="flicker"/>

        <!-- girl body -->
        <path d="M200,612 C168,622 140,652 130,700 L110,900 L420,900 L402,760 C396,700 362,642 322,622 C302,612 282,610 262,612 Z" fill="#0b0706" stroke="#e39a63" stroke-opacity=".35" stroke-width="2"/>
        <path d="M262,612 L275,660 L290,614" fill="#2a1712" opacity=".7"/>
        <rect x="240" y="575" width="24" height="42" fill="#0e0907"/>
        <path d="M218,528 C208,560 212,592 230,603 L252,600 C240,586 236,560 242,535 Z" fill="#070403"/>
        <circle cx="258" cy="548" r="38" fill="#110b09" stroke="#f0ae78" stroke-opacity=".5" stroke-width="2"/>
        <path d="M293,548 L302,562 L291,564 Z" fill="#110b09"/>
        <path d="M294,550 L301,562" stroke="#f0ae78" stroke-opacity=".6" stroke-width="1.5"/>
        <path d="M200,528 C198,492 226,470 256,470 C290,470 306,494 306,520 L324,530 C302,538 232,538 190,532 Z" fill="#1a0c0b" stroke="#f0ae78" stroke-opacity=".45" stroke-width="1.5"/>
        <path d="M204,516 C240,522 280,522 306,516" stroke="#5a1d1a" stroke-width="5" fill="none"/>
        <path d="M205,662 C198,722 228,782 300,806" fill="none" stroke="#0b0706" stroke-width="30" stroke-linecap="round"/>

        <!-- foreground table -->
        <polygon points="-40,795 660,780 700,840 -40,862" fill="url(#tableTop)"/>
        <polygon points="-40,862 700,840 700,920 -40,920" fill="#0a0605"/>
        <line x1="-40" y1="795" x2="660" y2="780" stroke="#f0ae78" stroke-opacity=".35" stroke-width="1.5"/>
        <line x1="-40" y1="862" x2="700" y2="840" stroke="#c8744a" stroke-opacity=".3"/>

        <!-- notebook -->
        <polygon points="290,806 445,798 468,826 302,836" fill="#cbbda5" opacity=".78"/>
        <g stroke="#5a4838" stroke-opacity=".6" stroke-width="1">
            <line x1="310" y1="812" x2="430" y2="806"/><line x1="314" y1="818" x2="440" y2="812"/><line x1="318" y1="824" x2="420" y2="819"/><line x1="322" y1="830" x2="390" y2="827"/>
        </g>
        <line x1="378" y1="802" x2="386" y2="834" stroke="#6b5846" stroke-opacity=".6"/>

        <!-- writing arm -->
        <path d="M330,650 C360,690 380,740 396,776 L432,800" fill="none" stroke="#0b0706" stroke-width="30" stroke-linecap="round"/>
        <path d="M335,655 C362,694 382,740 398,772" fill="none" stroke="#e39a63" stroke-opacity=".3" stroke-width="2"/>
        <circle cx="436" cy="803" r="12" fill="#1a110d"/>
        <line x1="438" y1="808" x2="462" y2="782" stroke="#c8744a" stroke-width="3" stroke-linecap="round"/>

        <!-- empty espresso -->
        <ellipse cx="506" cy="801" rx="22" ry="5" fill="#6d6152" opacity=".8"/>
        <path d="M493,784 L519,784 L516,798 Q506,802 496,798 Z" fill="url(#porcelain)" opacity=".85"/>
        <ellipse cx="506" cy="784" rx="13" ry="2.5" fill="#1a0f09"/>

        <!-- coffee cup -->
        <ellipse cx="575" cy="813" rx="46" ry="9" fill="#7a6d5e"/>
        <ellipse cx="575" cy="811" rx="40" ry="6" fill="#9c8f7c"/>
        <path d="M605,786 C622,786 622,802 602,803" fill="none" stroke="#9f927f" stroke-width="4"/>
        <path d="M543,778 L607,778 L601,808 Q575,818 549,808 Z" fill="url(#porcelain)"/>
        <ellipse cx="575" cy="778" rx="32" ry="5" fill="#2b180e"/>
        <ellipse cx="568" cy="777" rx="10" ry="1.5" fill="#6b4a2e" opacity=".6"/>
        <path class="steam" d="M565,768 C555,752 575,742 565,726"/>
        <path class="steam s2" d="M578,768 C590,752 570,740 582,722"/>
        <path class="steam s3" d="M571,768 C563,750 581,745 572,728"/>
    </g>

    <rect x="0" y="0" width="1600" height="900" filter="url(#grain)" opacity=".07"/>
</svg>
<div class="shade-top"></div>
<div class="dust" id="dust"></div>
</div>
`;

// ============================================================
// Итоги раунда 2: Марк
// ============================================================
export const THEATRE_RESULT_2_HTML = `
<style>
.th-r2{position:absolute;inset:0;overflow:hidden}
.th-r2{--bg:#120c0a;
            --text:#ece4dc;
            --muted:#a39890;
            --accent:#d0694a;
            --line:rgba(236,228,220,.1);}
.th-r2 *{box-sizing:border-box;margin:0;padding:0}
.th-r2,.th-r2{height:100%}
.th-r2{background:var(--bg);
            color:var(--text);
            font-family:'Inter',sans-serif;
            line-height:1.55;
            overflow-x:hidden;
            min-height:100vh;}
.th-r2 .scene{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.th-r2 .layer{position:absolute;inset:0}
.th-r2 .back-wall{background:
                radial-gradient(ellipse 50% 40% at 50% 55%, rgba(224,138,95,.1), transparent 70%),
                linear-gradient(180deg,#06080b 0%,#0e0c0d 40%,#150d0a 100%);}
.th-r2 .floor{top:auto;height:28vh;
            background:
                repeating-linear-gradient(90deg, rgba(0,0,0,.35) 0 2px, transparent 2px 120px),
                linear-gradient(180deg,#22140f 0%,#150c09 60%,#0a0605 100%);
            transform:perspective(600px) rotateX(55deg);
            transform-origin:bottom;
            opacity:.8;
            mask-image:linear-gradient(180deg,transparent,#000 40%);
            -webkit-mask-image:linear-gradient(180deg,transparent,#000 40%);}
@keyframes flicker{
            0%,100%{opacity:1}
            46%{opacity:1}
            47%{opacity:.45}
            48%{opacity:.95}
            49%{opacity:.3}
            51%{opacity:1}
            78%{opacity:.85}
        }
.th-r2 .curtain{position:absolute;top:0;bottom:0;width:26vw;min-width:170px;
            background:
                linear-gradient(180deg,rgba(0,0,0,.2),transparent 30%,rgba(0,0,0,.55)),
                repeating-linear-gradient(90deg,#1a0507 0,#3f0d12 1.6vw,#5a141a 2.4vw,#34090d 3.4vw,#1a0507 4.4vw);
            filter:saturate(.85) brightness(.75);
            transform-origin:top center;}
.th-r2 .curtain.left{left:0;animation:swayL 11s ease-in-out infinite;
            mask-image:linear-gradient(90deg,#000 55%,transparent);
            -webkit-mask-image:linear-gradient(90deg,#000 55%,transparent)}
.th-r2 .curtain.right{right:0;animation:swayR 13s ease-in-out infinite;
            mask-image:linear-gradient(270deg,#000 55%,transparent);
            -webkit-mask-image:linear-gradient(270deg,#000 55%,transparent)}
@keyframes swayL{0%,100%{transform:skewX(0)}50%{transform:skewX(.8deg)}}
@keyframes swayR{0%,100%{transform:skewX(0)}50%{transform:skewX(-.8deg)}}
.th-r2 .rack{position:absolute;left:3vw;bottom:7vh;width:min(820px,72vw);
            opacity:.3;}
.th-r2 .rack.far{left:auto;right:16vw;bottom:22vh;width:min(560px,48vw);opacity:.13;filter:blur(1px)}
.th-r2 .rack .hang{transform-box:fill-box;transform-origin:50% 0;animation:swing 6s ease-in-out infinite}
@keyframes swing{0%,100%{transform:rotate(-1.4deg)}50%{transform:rotate(1.4deg)}}
.th-r2 .trunk{position:absolute;left:1vw;bottom:3vh;width:min(260px,24vw);opacity:.38}
.th-r2 .man{position:absolute;left:36vw;bottom:4vh;height:min(60vh,540px);
            opacity:.9;transform-origin:bottom center;
            animation:breathe 5s ease-in-out infinite;
            filter:drop-shadow(0 0 14px rgba(255,200,150,.08));}
.th-r2 .man .drape{transform-box:fill-box;transform-origin:50% 0;animation:swing 4s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.008)}}
.th-r2 .elevator{position:absolute;right:9vw;top:40vh;width:120px;
            opacity:.35;
            display:flex;flex-direction:column;align-items:center;gap:14px;}
.th-r2 .elevator .dial{width:120px;height:62px;border-radius:62px 62px 0 0;
            border:2px solid rgba(190,150,100,.5);border-bottom:none;
            position:relative;}
.th-r2 .elevator .dial span{position:absolute;bottom:4px;font-family:'Cormorant Garamond',serif;
            font-size:14px;color:#8d7458;}
.th-r2 .elevator .needle{position:absolute;left:50%;bottom:0;width:2px;height:48px;background:#d0694a;
            transform-origin:bottom;transform:rotate(38deg);
            animation:needle 12s ease-in-out infinite;}
@keyframes needle{0%,20%{transform:rotate(-70deg)}45%,100%{transform:rotate(38deg)}}
.th-r2 .elevator .floor-num{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:700;color:#e08a5f;
            text-shadow:0 0 18px rgba(224,138,95,.55);line-height:1;}
.th-r2 .elevator .floor-num i{font-size:16px;color:#e08a5f;margin-right:8px;vertical-align:middle}
.th-r2 .elevator .doors{width:110px;height:170px;border:2px solid rgba(190,150,100,.35);
            display:grid;grid-template-columns:1fr 1fr;}
.th-r2 .elevator .doors div{border-right:1px solid rgba(190,150,100,.3);
            background:repeating-linear-gradient(90deg,rgba(190,150,100,.08) 0 1px,transparent 1px 10px)}
.th-r2 .rain{background:repeating-linear-gradient(90deg,transparent 0 140px,rgba(236,228,220,.025) 140px 141px);
            animation:rain 1.6s linear infinite;opacity:.8}
@keyframes rain{from{background-position:0 0}to{background-position:0 100vh}}
.th-r2 #dust{position:absolute;inset:0;width:100%;height:100%}
.th-r2 .vignette{background:radial-gradient(ellipse 75% 70% at 50% 45%,transparent 30%,rgba(0,0,0,.85) 100%)}
.th-r2 .grain{opacity:.09;mix-blend-mode:overlay;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            animation:grain .6s steps(3) infinite;}
@keyframes grain{0%{transform:translate(0,0)}33%{transform:translate(-8px,5px)}66%{transform:translate(6px,-7px)}}
.th-r2 .building{position:absolute;left:50%;transform:translateX(-50%);
            top:24vh;bottom:0;width:min(1400px,92vw);
            background:
                repeating-linear-gradient(90deg,rgba(0,0,0,.22) 0 2px,transparent 2px 70px),
                linear-gradient(180deg,#1d1310,#140d0b 60%,#0e0908);
            box-shadow:0 0 0 1px rgba(185,154,120,.08);}
.th-r2 .cornice{position:absolute;left:-2%;right:-2%;top:0;height:9vh;
            background:linear-gradient(180deg,#2a1c17,#1a110e);
            border-bottom:3px solid #3a2820;
            display:flex;align-items:center;justify-content:center;}
.th-r2 .cornice::after{content:'';position:absolute;left:3%;right:3%;bottom:6px;height:6px;
            background:radial-gradient(circle,#f3cf9d 0 2px,transparent 2.6px) 0 50%/22px 6px repeat-x;
            opacity:.8;}
.th-r2 .sign{display:flex;gap:1.6vw}
.th-r2 .sign span{font-family:'Cormorant Garamond',serif;font-weight:700;
            font-size:clamp(26px,5vh,50px);color:#f0c89a;letter-spacing:.08em;line-height:1;
            text-shadow:0 0 10px rgba(240,180,120,.4);}
.th-r2 .sign span:nth-child(4){animation:flicker 7s infinite}
.th-r2 .s3{position:absolute;left:0;right:0;top:9vh;height:44vh}
.th-r2 .panorama{position:absolute;left:4%;right:15%;top:3vh;bottom:2vh;
            border:8px solid #0d0806;overflow:hidden;background:#2a1812;
            box-shadow:0 0 90px rgba(224,138,95,.2),0 0 0 1px rgba(185,154,120,.25);}
.th-r2 .s3::after{content:'';position:absolute;left:4%;right:15%;top:100%;height:12vh;
            background:radial-gradient(ellipse 60% 100% at 50% 0,rgba(224,138,95,.14),transparent 70%);}
.th-r2 .room{position:absolute;inset:0;
            background:
                radial-gradient(ellipse 34% 60% at 50% 0%,rgba(255,214,170,.45),transparent 70%),
                radial-gradient(ellipse 26% 55% at 18% 0%,rgba(255,214,170,.28),transparent 70%),
                radial-gradient(ellipse 26% 55% at 82% 0%,rgba(255,214,170,.28),transparent 70%),
                repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0 1px,transparent 1px 26px),
                linear-gradient(180deg,#6b4432 0%,#4e2f22 74%,#2a1812 74%,#1c100c 100%);}
.th-r2 .lamps i{position:absolute;top:0;width:2px;height:12%;background:#1a0f0c}
.th-r2 .lamps i::after{content:'';position:absolute;left:50%;bottom:-10px;transform:translateX(-50%);
            width:30px;height:12px;border-radius:15px 15px 0 0;background:#1a0f0c;}
.th-r2 .lamps i::before{content:'';position:absolute;left:50%;bottom:-14px;transform:translateX(-50%);
            width:8px;height:8px;border-radius:50%;background:#ffe2b8;
            box-shadow:0 0 18px 6px rgba(255,214,170,.45);}
.th-r2 .room .rack{left:3%;bottom:6%;height:70%;width:auto;opacity:1;filter:none}
.th-r2 .room .rack.far{left:auto;right:4%;bottom:22%;height:48%;width:auto;opacity:.5;filter:blur(.6px)}
.th-r2 .room .trunk{left:auto;right:2%;bottom:3%;height:30%;width:auto;opacity:.95}
.th-r2 .room .man{left:26%;bottom:2%;height:84%;margin-left:0;opacity:1;
            animation:walk 18s ease-in-out infinite;
            filter:drop-shadow(0 0 10px rgba(0,0,0,.4));}
@keyframes walk{
            0%,10%{transform:translateX(0) scaleX(1)}
            40%,50%{transform:translateX(20vw) scaleX(1)}
            52%,60%{transform:translateX(20vw) scaleX(-1)}
            90%{transform:translateX(0) scaleX(-1)}
            92%,100%{transform:translateX(0) scaleX(1)}
        }
.th-r2 .panorama .curtain{width:7%;min-width:0;filter:saturate(.9) brightness(.85)}
.th-r2 .mullions{position:absolute;inset:0;display:flex;pointer-events:none}
.th-r2 .mullions i{flex:1;border-right:6px solid #0d0806}
.th-r2 .mullions i:last-child{border-right:none}
.th-r2 .mullions::after{content:'';position:absolute;left:0;right:0;top:18%;height:5px;background:#0d0806}
.th-r2 .glass{position:absolute;inset:0;
            background:
                linear-gradient(115deg,transparent 20%,rgba(255,255,255,.05) 24%,transparent 30%,transparent 60%,rgba(255,255,255,.04) 63%,transparent 68%),
                linear-gradient(180deg,rgba(10,14,20,.28),transparent 45%);}
.th-r2 .s3 .elevator{position:absolute;right:3%;left:auto;top:50%;bottom:auto;transform:translateY(-50%) scale(.8);opacity:.75}
.th-r2 .s2{position:absolute;left:4%;right:4%;top:56vh;height:11vh;display:flex;gap:2.5%}
.th-r2 .s2 i{flex:1;border:4px solid #0d0806;border-radius:80px 80px 0 0;background:linear-gradient(180deg,#0f0b0a,#1a1110)}
.th-r2 .s2 i.lit{background:linear-gradient(180deg,#4a2c20,#24140f)}
.th-r2 .marquee{position:absolute;left:50%;transform:translateX(-50%);top:69vh;
            width:min(560px,74%);padding:12px 20px;text-align:center;
            background:#1a110e;border:2px solid #4a3326;}
.th-r2 .marquee::before,.th-r2 .marquee::after{content:'';position:absolute;left:0;right:0;height:6px;
            background:radial-gradient(circle,#f3cf9d 0 2px,transparent 2.6px) 0 50%/18px 6px repeat-x;}
.th-r2 .marquee::before{top:-9px}
.th-r2 .marquee::after{bottom:-9px}
.th-r2 .marquee span{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;color:#f0c89a;letter-spacing:.14em;text-transform:uppercase}
@media (max-width:700px){.th-r2 .building{width:100vw;top:30vh}
.th-r2 .s3 .panorama{left:3%;right:3%}
.th-r2 .s3::after{right:3%}
.th-r2 .s3 .elevator{display:none}
.th-r2 .s2 i:nth-child(n+5){display:none}
.th-r2 .marquee span{font-size:14px}}
.th-r2 .card{margin-top:40px;padding:34px 30px;border-radius:14px;
            border:1px solid var(--line);
            background:rgba(22,16,14,.72);
            backdrop-filter:blur(3px);
            transition:opacity .35s,transform .35s;}
.th-r2 .card.hidden{opacity:0;transform:translateY(10px);pointer-events:none}
@media (max-width:700px){.th-r2 .elevator{right:4vw;top:auto;bottom:10vh;transform:scale(.7);transform-origin:bottom right}
.th-r2 .rack{width:96vw;left:2vw}
.th-r2 .rack.far{width:70vw;right:4vw}
.th-r2 .man{left:50%;margin-left:-60px;height:44vh}
.th-r2 .trunk{width:34vw}}
</style>
<div class="th-r2">
<div class="scene" aria-hidden="true">
        <div class="layer back-wall"></div>
        <div class="building">
            <div class="cornice"><div class="sign"><span>Г</span><span>Р</span><span>А</span><span>Н</span><span>Д</span></div></div>
            <div class="s3">
                <div class="panorama">
                    <div class="room">
                        <div class="lamps"><i style="left:18%"></i><i style="left:50%"></i><i style="left:82%"></i></div>

        <!-- far rack -->
        <svg class="rack far" viewBox="0 0 600 260" fill="none" id="rackFar">
            <g stroke="#b99a78" stroke-width="3">
                <line x1="10" y1="30" x2="590" y2="30"/>
                <line x1="25" y1="30" x2="25" y2="255"/>
                <line x1="575" y1="30" x2="575" y2="255"/>
            </g>
        </svg>

        <!-- main rack -->
        <svg class="rack" viewBox="0 0 900 320" fill="none" id="rackMain">
            <g fill="#2a1d18" stroke="#b99a78" stroke-width="1.5">
                <path d="M120 4 q20 -6 40 0 l4 20 h-48z"/><path d="M104 24 h72 v4 h-72z"/>
                <path d="M330 24 q10 -24 40 -22 q30 -2 40 22z"/>
                <path d="M560 6 h34 v18 h-34z"/><path d="M548 24 h58 v4 h-58z"/>
                <path d="M740 24 q18 -26 44 -10 l14 10z"/>
            </g>
            <g stroke="#b99a78" stroke-width="3">
                <line x1="20" y1="30" x2="880" y2="30"/>
                <line x1="40" y1="30" x2="40" y2="310"/>
                <line x1="860" y1="30" x2="860" y2="310"/>
                <line x1="15" y1="310" x2="70" y2="310"/>
                <line x1="830" y1="310" x2="885" y2="310"/>
            </g>
        </svg>

        <!-- trunk with costumes -->
        <svg class="trunk" viewBox="0 0 260 180" fill="none">
            <path d="M40 60 q30 -60 70 -20 q20 -50 60 -10 q30 -30 50 20z" fill="#5a141a"/>
            <path d="M60 70 q-40 10 -50 60 l30 10z" fill="#3d1f2e"/>
            <path d="M190 60 q50 0 60 70 l-30 6z" fill="#6b3a24"/>
            <path d="M120 40 l6 -30 l8 30" stroke="#b99a78" stroke-width="2"/>
            <rect x="30" y="70" width="200" height="100" rx="6" fill="#22140f" stroke="#b99a78" stroke-width="2"/>
            <path d="M30 100 h200 M80 70 v100 M180 70 v100" stroke="#b99a78" stroke-width="1.5"/>
            <rect x="120" y="92" width="20" height="16" rx="2" fill="#b99a78"/>
        </svg>

        <!-- the man -->
        <svg class="man" viewBox="0 0 200 460" fill="none">
            <g fill="#0b0706" stroke="rgba(255,210,170,.28)" stroke-width="1.5" stroke-linejoin="round">
                <path d="M72 258 h26 l-2 190 h-24z"/>
                <path d="M102 258 h26 l-2 190 h-22z"/>
                <path d="M66 446 h34 v10 h-38z"/>
                <path d="M100 446 h36 v10 h-36z"/>
                <path d="M138 102 l14 70 l-2 84 h-12 l-2 -80 l-10 -50z"/>
                <path d="M62 100 q38 -14 76 0 l10 70 l-8 92 h-80 l-8 -92z"/>
                <path d="M92 96 l8 26 l8 -26" stroke="rgba(255,210,170,.35)"/>
                <rect x="92" y="80" width="16" height="16"/>
                <circle cx="100" cy="62" r="22"/>
                <path d="M74 58 q26 -30 52 0 l12 4 h-64z"/>
            </g>
            <g class="drape">
                <path d="M50 148 v14 M40 168 l10 -6 l10 6" stroke="#b99a78" stroke-width="2"/>
                <path d="M34 166 q26 -8 52 4 l8 124 q-32 12 -66 -4z" fill="#5a141a"/>
            </g>
            <g class="drape" style="animation-delay:-1.3s">
                <path d="M60 156 v12 M52 172 l8 -4 l8 4" stroke="#b99a78" stroke-width="2"/>
                <path d="M42 172 q24 -6 46 4 l-4 104 l-10 -30 h-16 l-12 34z" fill="#3a2a22"/>
            </g>
            <g class="drape" style="animation-delay:-2.4s">
                <path d="M36 178 q24 -6 50 2 l20 150 q-50 14 -96 0z" fill="#4a1015" opacity=".9"/>
            </g>
            <path d="M62 100 l-14 72 l38 22 l6 -12 l-28 -18 l8 -58z" fill="#0b0706" stroke="rgba(255,210,170,.28)" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
                    </div>
                    <div class="curtain left"></div>
                    <div class="curtain right"></div>
                    <div class="mullions"><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="glass"></div>
                </div>

        <div class="elevator">
            <div class="dial">
                <span style="left:6px">1</span>
                <span style="left:52px;bottom:44px">2</span>
                <span style="right:6px">3</span>
                <div class="needle"></div>
            </div>
            <div class="floor-num"><i class="fa-solid fa-caret-up"></i>3</div>
            <div class="doors"><div></div><div></div></div>
        </div>
            </div>
            <div class="s2"><i></i><i class="lit"></i><i></i><i></i><i class="lit"></i><i></i></div>
            <div class="marquee"><span>Сегодня · «Финальный занавес»</span></div>
        </div>
        <canvas id="dust"></canvas>
        <div class="layer rain"></div>
        <div class="layer vignette"></div>
        <div class="layer grain"></div>
    </div>
</div>
`;

// ============================================================
// Итоги раунда 3: Соня
// ============================================================
export const THEATRE_RESULT_3_HTML = `
<style>
.th-r3{position:absolute;inset:0;overflow:hidden}
.th-r3 *{box-sizing:border-box;margin:0;padding:0}
.th-r3,.th-r3{height:100%}
.th-r3{background:#0b0807;color:#e9e1d8;font-family:'Inter',sans-serif;overflow-x:hidden;min-height:100vh}
.th-r3 .scene{position:fixed;inset:-20px;z-index:0;transition:transform .6s ease-out}
.th-r3 .scene svg{width:100%;height:100%;display:block}
.th-r3 .shade{position:fixed;inset:0;z-index:1;pointer-events:none;
            background:
              linear-gradient(180deg,rgba(9,6,5,.88) 0%,rgba(9,6,5,.55) 30%,rgba(9,6,5,.15) 55%,rgba(9,6,5,.55) 100%),
              radial-gradient(ellipse at 60% 55%,transparent 35%,rgba(5,3,3,.85) 100%)}
.th-r3 .grain{position:fixed;inset:0;z-index:2;pointer-events:none;opacity:.12;mix-blend-mode:overlay;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.th-r3 #dust{position:fixed;inset:0;z-index:2;pointer-events:none}
.th-r3 .btn{padding:9px 16px;border-radius:999px;border:1px solid #c9794f;background:rgba(20,13,11,.6);color:#f1e8dd;font:600 11px 'Inter',sans-serif;letter-spacing:1.4px;text-transform:uppercase;cursor:pointer;transition:background .25s,color .25s}
.th-r3 .btn:hover{background:#c9794f;color:#140d0b}
.th-r3 .card{margin-top:38px;padding:34px 30px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:rgba(22,18,16,.74);backdrop-filter:blur(3px);transition:opacity .35s,transform .35s}
.th-r3 .card.hidden{opacity:0;transform:translateY(-8px);pointer-events:none}
@keyframes flick{0%,100%{opacity:1}8%{opacity:.2}10%{opacity:.9}12%{opacity:.15}14%{opacity:1}60%{opacity:1}62%{opacity:.4}63%{opacity:1}}
.th-r3 .flicker{animation:flick 4.5s infinite}
@keyframes sway{0%,100%{transform:rotate(-.6deg)}50%{transform:rotate(.6deg)}}
.th-r3 .sway{transform-box:fill-box;transform-origin:50% 0;animation:sway 7s ease-in-out infinite}
@media(max-width:700px){.th-r3 .card{padding:24px 20px}}
</style>
<div class="th-r3">
<div class="scene" id="scene">
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#140b0a"/><stop offset=".7" stop-color="#241210"/><stop offset="1" stop-color="#1a0d0b"/>
    </linearGradient>
    <pattern id="stripes" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="transparent"/>
        <rect x="0" width="2" height="40" fill="#2e1714" opacity=".6"/>
        <path d="M20 8 q6 6 0 12 q-6 6 0 12" stroke="#2c1512" stroke-width="1.2" fill="none" opacity=".7"/>
    </pattern>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1e110d"/><stop offset="1" stop-color="#0a0605"/>
    </linearGradient>
    <radialGradient id="mirrorLight" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffb877" stop-opacity=".55"/><stop offset=".5" stop-color="#b8603a" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bulbGlow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffd9a0" stop-opacity=".9"/><stop offset=".4" stop-color="#ff9f55" stop-opacity=".25"/><stop offset="1" stop-color="#ff9f55" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2a1d18"/><stop offset=".45" stop-color="#15100e"/><stop offset=".55" stop-color="#3a2a22"/><stop offset=".62" stop-color="#16100e"/><stop offset="1" stop-color="#0d0908"/>
    </linearGradient>
    <linearGradient id="sil" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#070404"/><stop offset=".65" stop-color="#140a08"/><stop offset="1" stop-color="#3a1f15"/>
    </linearGradient>
    <linearGradient id="spot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e9b98a" stop-opacity=".22"/><stop offset="1" stop-color="#e9b98a" stop-opacity="0"/>
    </linearGradient>
    <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
</defs>

<!-- стена и пол -->
<rect width="1600" height="900" fill="url(#wall)"/>
<rect width="1600" height="690" fill="url(#stripes)"/>
<rect y="660" width="1600" height="30" fill="#120907"/>
<rect y="688" width="1600" height="212" fill="url(#floor)"/>
<g stroke="#070404" stroke-width="2" opacity=".7">
    <line x1="0" y1="730" x2="1600" y2="730"/><line x1="0" y1="785" x2="1600" y2="785"/><line x1="0" y1="850" x2="1600" y2="850"/>
    <line x1="220" y1="690" x2="200" y2="730"/><line x1="610" y1="730" x2="590" y2="785"/><line x1="1010" y1="690" x2="1000" y2="730"/><line x1="1350" y1="785" x2="1330" y2="850"/><line x1="400" y1="785" x2="380" y2="850"/>
</g>

<!-- афиши на стене -->
<g opacity=".55">
    <rect x="560" y="120" width="110" height="150" fill="#1b0e0c" stroke="#3a2016" stroke-width="4"/>
    <rect x="575" y="140" width="80" height="90" fill="#2d1411"/>
    <circle cx="615" cy="180" r="22" fill="#170b09"/>
    <rect x="700" y="150" width="80" height="105" fill="#1b0e0c" stroke="#3a2016" stroke-width="4" transform="rotate(4 740 200)"/>
</g>

<!-- ширма -->
<g opacity=".8">
    <path d="M880 230 L960 215 L960 690 L880 690 Z" fill="#1c0f0d" stroke="#2e1813" stroke-width="3"/>
    <path d="M960 215 L1030 232 L1030 690 L960 690 Z" fill="#160b0a" stroke="#2e1813" stroke-width="3"/>
    <path d="M890 260 q30 40 0 80 q-30 40 0 80" stroke="#2a1512" stroke-width="2" fill="none"/>
    <path d="M1025 240 q-25 30 -10 70 q20 40 -5 80" stroke="#4a1c1a" stroke-width="10" fill="none" opacity=".8"/>
</g>

<!-- свет от зеркала -->
<ellipse cx="1210" cy="380" rx="560" ry="420" fill="url(#mirrorLight)"/>
<polygon points="700,0 880,0 1060,700 520,700" fill="url(#spot)"/>

<!-- вешалка с костюмами -->
<g id="rack">
    <line x1="60" y1="190" x2="520" y2="190" stroke="#3b2a1e" stroke-width="7" stroke-linecap="round"/>
    <line x1="75" y1="190" x2="75" y2="690" stroke="#2a1d15" stroke-width="7"/>
    <line x1="505" y1="190" x2="505" y2="690" stroke="#2a1d15" stroke-width="7"/>
    <line x1="45" y1="690" x2="110" y2="690" stroke="#2a1d15" stroke-width="7"/>
    <line x1="470" y1="690" x2="540" y2="690" stroke="#2a1d15" stroke-width="7"/>
    <g id="dresses"></g>
</g>

<!-- туалетный столик и зеркало -->
<g>
    <rect x="1060" y="150" width="300" height="410" rx="6" fill="#24150f" stroke="#4a2e1c" stroke-width="6"/>
    <rect x="1085" y="178" width="250" height="355" fill="url(#glass)"/>
    <!-- отражение -->
    <g opacity=".28" filter="url(#blur2)">
        <circle cx="1225" cy="300" r="16" fill="#080504"/>
        <path d="M1205 322 Q1225 314 1245 322 L1250 380 L1290 533 L1160 533 L1200 380 Z" fill="#080504"/>
        <circle cx="1170" cy="310" r="14" fill="#080504"/>
        <path d="M1155 330 L1185 330 L1195 533 L1145 533 Z" fill="#080504"/>
    </g>
    <path d="M1100 190 L1150 190 L1100 280 Z" fill="#fff" opacity=".04"/>
    <path d="M1300 520 q-10 -20 5 -35 m-10 25 l-15 20" stroke="#cfc0b0" stroke-width="1.2" fill="none" opacity=".25"/>
    <g id="bulbs"></g>
    <rect x="1030" y="560" width="360" height="22" fill="#2e1c12"/>
    <rect x="1040" y="582" width="340" height="70" fill="#1c110b"/>
    <rect x="1060" y="595" width="130" height="45" fill="#23150e" stroke="#130b07"/>
    <rect x="1230" y="595" width="130" height="45" fill="#23150e" stroke="#130b07"/>
    <circle cx="1125" cy="617" r="3" fill="#6a4a2c"/><circle cx="1295" cy="617" r="3" fill="#6a4a2c"/>
    <rect x="1045" y="652" width="12" height="40" fill="#1c110b"/><rect x="1363" y="652" width="12" height="40" fill="#1c110b"/>
    <!-- предметы на столе -->
    <rect x="1080" y="520" width="16" height="40" rx="3" fill="#3b1a18"/><rect x="1084" y="512" width="8" height="10" fill="#1a0d0b"/>
    <path d="M1110 560 L1114 530 L1130 530 L1134 560 Z" fill="#2c3a33" opacity=".8"/>
    <ellipse cx="1170" cy="556" rx="22" ry="6" fill="#4d3a2c"/>
    <circle cx="1170" cy="548" r="9" fill="#d6c1a8" opacity=".45"/>
    <!-- голова-манекен с париком -->
    <rect x="1316" y="520" width="6" height="40" fill="#1d120c"/>
    <ellipse cx="1319" cy="498" rx="17" ry="22" fill="#2e211b"/>
    <path d="M1300 495 Q1300 470 1319 470 Q1340 470 1340 495 L1344 530 Q1330 520 1335 500 Q1319 488 1303 500 Q1308 520 1294 530 Z" fill="#4a1a12"/>
    <!-- разлитая помада / записка -->
    <rect x="1230" y="552" width="40" height="8" fill="#b9ab98" opacity=".35" transform="rotate(-8 1250 556)"/>
</g>

<!-- помощница за спиной (шнурует корсет) -->
<g fill="url(#sil)">
    <path d="M868 285 Q860 330 872 360 L900 360 Q910 320 900 285 Z" fill="#0b0605"/>
    <circle cx="884" cy="292" r="22"/>
    <path d="M864 322 Q884 312 904 322 L918 450 L910 690 L852 690 L848 450 Z"/>
    <path d="M868 342 L832 382 L812 376" stroke="#0d0706" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M872 368 L838 402 L816 398" stroke="#0d0706" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</g>

<!-- актриса -->
<g fill="url(#sil)">
    <circle cx="780" cy="298" r="24"/>
    <circle cx="792" cy="274" r="14"/>
    <rect x="772" y="318" width="16" height="24"/>
    <path d="M748 344 Q780 332 812 344 L816 422 Q780 432 744 422 Z"/>
    <path d="M808 350 L842 306 L806 284" stroke="#120907" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M752 350 L718 402 L694 436" stroke="#0a0505" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M744 420 Q700 560 628 692 Q780 716 932 692 Q862 560 816 420 Z"/>
    <path d="M760 440 Q740 560 700 690 M800 440 Q820 560 850 695" stroke="#2a1510" stroke-width="2" fill="none" opacity=".7"/>
    <!-- свисающее незастёгнутое платье/шлейф -->
    <path d="M928 690 Q980 700 1010 720 Q950 725 900 705 Z" fill="#1a0a09"/>
</g>

<!-- помощница на коленях (подшивает подол) -->
<g fill="url(#sil)">
    <circle cx="598" cy="556" r="20"/>
    <path d="M582 548 Q575 580 590 590" stroke="#080404" stroke-width="10" fill="none"/>
    <path d="M584 576 Q560 620 574 672 L656 694 Q662 650 626 594 Z"/>
    <path d="M616 596 L652 628 L672 640" stroke="#0a0505" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M606 610 L640 652 L664 660" stroke="#0a0505" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="604" cy="692" rx="62" ry="14"/>
</g>

<!-- беспорядок на полу -->
<g>
    <!-- кучи ткани -->
    <path d="M110 720 Q160 680 230 705 Q300 690 330 730 Q280 770 200 760 Q130 770 110 720 Z" fill="#3a1416"/>
    <path d="M140 725 Q190 710 240 735 M200 700 Q230 730 280 740" stroke="#1b0808" stroke-width="3" fill="none"/>
    <path d="M300 760 Q360 730 430 750 Q470 780 420 800 Q340 810 300 760 Z" fill="#1f2a26"/>
    <path d="M1000 760 Q1060 730 1140 755 Q1180 790 1110 805 Q1030 810 1000 760 Z" fill="#2b1d2e"/>
    <path d="M1030 770 Q1080 760 1130 780" stroke="#140c16" stroke-width="3" fill="none"/>
    <!-- боа -->
    <path d="M440 710 q20 -15 40 0 t40 0 t40 0 t40 0 t40 5" stroke="#5a2a22" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="3 5" opacity=".9"/>
    <!-- цилиндр -->
    <ellipse cx="1420" cy="770" rx="55" ry="12" fill="#0e0807"/>
    <rect x="1392" y="715" width="56" height="55" fill="#120a09" transform="rotate(-10 1420 745)"/>
    <rect x="1392" y="755" width="56" height="7" fill="#4a1c1a" transform="rotate(-10 1420 745)"/>
    <!-- открытый сундук -->
    <rect x="1440" y="600" width="140" height="90" fill="#26170e" stroke="#3d2716" stroke-width="3"/>
    <path d="M1440 600 L1470 540 L1600 540 L1580 600 Z" fill="#1d120b" stroke="#3d2716" stroke-width="3"/>
    <path d="M1460 600 Q1480 570 1510 600 Q1530 575 1560 600" fill="#4a1c1a"/>
    <path d="M1470 600 Q1470 650 1455 690" stroke="#6b5130" stroke-width="3" fill="none"/>
    <!-- туфля -->
    <path d="M520 820 Q540 800 580 808 L600 820 L596 830 L525 830 Z" fill="#2a0c0c"/>
    <line x1="596" y1="830" x2="600" y2="850" stroke="#1a0707" stroke-width="4"/>
    <!-- упавшая вешалка -->
    <path d="M700 800 L760 780 L820 800 Z M760 780 q0 -12 8 -14" stroke="#4a3624" stroke-width="3" fill="none"/>
    <!-- листы сценария -->
    <rect x="860" y="810" width="60" height="42" fill="#b9ab98" opacity=".22" transform="rotate(12 890 830)"/>
    <rect x="890" y="826" width="60" height="42" fill="#b9ab98" opacity=".16" transform="rotate(-18 920 846)"/>
    <rect x="240" y="820" width="55" height="38" fill="#b9ab98" opacity=".14" transform="rotate(-6 268 840)"/>
    <!-- коробка -->
    <rect x="30" y="760" width="80" height="60" fill="#23160d" stroke="#140c07" stroke-width="2"/>
    <path d="M30 760 L10 740 M110 760 L130 742" stroke="#23160d" stroke-width="6"/>
</g>
</svg>
</div>
<div class="shade"></div>
<canvas id="dust"></canvas>
<div class="grain"></div>
</div>
`;

// ============================================================
// Итоги раунда 4: Артур
// ============================================================
export const THEATRE_RESULT_4_HTML = `
<style>
.th-r4{position:absolute;inset:0;overflow:hidden}
.th-r4{--bg:#110c0a; --text:#efe6dc; --muted:#a89a8e; --accent:#d0735a;
            --line:rgba(255,236,220,.12); --card:rgba(20,15,13,.74);}
.th-r4 *{box-sizing:border-box;margin:0;padding:0}
.th-r4,.th-r4{height:100%}
.th-r4{background:var(--bg);color:var(--text);font-family:Inter,sans-serif;overflow-x:hidden;min-height:100vh}
.th-r4 .scene{position:fixed;inset:0;z-index:0;overflow:hidden}
.th-r4 .scene svg{position:absolute;inset:0;width:100%;height:100%}
.th-r4 .chand-glow{animation:flicker 5s ease-in-out infinite}
.th-r4 .door-glow{animation:flicker 7s ease-in-out infinite reverse}
@keyframes flicker{0%,100%{opacity:.9}40%{opacity:.75}55%{opacity:1}70%{opacity:.82}}
.th-r4 .spot{animation:spot 9s ease-in-out infinite}
@keyframes spot{0%,100%{opacity:.55}50%{opacity:.7}}
.th-r4 .flash{opacity:0;animation:flash 7s infinite}
.th-r4 .flash.f2{animation-delay:3.3s}
.th-r4 .flash.f3{animation-delay:5.6s}
@keyframes flash{0%,91%,100%{opacity:0}92%{opacity:1}94%{opacity:.2}95%{opacity:.8}97%{opacity:0}}
.th-r4 .shade{position:absolute;inset:0;pointer-events:none;
            background:
              linear-gradient(180deg,rgba(12,8,7,.94) 0%,rgba(12,8,7,.7) 22%,rgba(12,8,7,.15) 50%,rgba(12,8,7,.35) 80%,rgba(12,8,7,.9) 100%),
              radial-gradient(ellipse at 50% 60%,transparent 35%,rgba(5,3,3,.85) 100%);}
.th-r4 .grain{position:absolute;inset:-50%;pointer-events:none;opacity:.09;mix-blend-mode:overlay;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            animation:grain 1.2s steps(4) infinite}
@keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}}
.th-r4 .particles{position:absolute;inset:0;pointer-events:none}
.th-r4 .dust{position:absolute;border-radius:50%;background:#f3cf9c;opacity:0;animation:dust linear infinite}
@keyframes dust{0%{transform:translate(0,0);opacity:0}15%{opacity:.55}85%{opacity:.4}100%{transform:translate(var(--dx),-160px);opacity:0}}
.th-r4 .petal{position:absolute;top:-20px;width:9px;height:6px;border-radius:60% 0 60% 0;background:#6e1c1a;opacity:.7;animation:fall linear infinite}
@keyframes fall{0%{transform:translate(0,0) rotate(0)}100%{transform:translate(var(--dx),110vh) rotate(540deg)}}
.th-r4 .card{margin-top:38px;padding:40px 44px;border:1px solid var(--line);border-radius:18px;background:var(--card);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);animation:rise .6s ease both}
@keyframes rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.th-r4 .tag{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--muted)}
.th-r4 .modal{position:fixed;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(6,4,3,.7);opacity:0;pointer-events:none;transition:.3s}
.th-r4 .modal.open{opacity:1;pointer-events:auto}
.th-r4 .row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-top:1px solid var(--line);font-size:14px;color:#d7cbc0}
@media(max-width:640px){.th-r4 .card{padding:28px 22px}}
</style>
<div class="th-r4">
<div class="scene" aria-hidden="true">
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
    <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#140d0b"/><stop offset=".6" stop-color="#22160f"/><stop offset="1" stop-color="#1a110d"/>
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1e140f"/><stop offset="1" stop-color="#080505"/>
        </linearGradient>
        <radialGradient id="doorLight" cx=".5" cy=".75" r=".7">
            <stop offset="0" stop-color="#e9a15c" stop-opacity=".55"/><stop offset=".5" stop-color="#8a4a24" stop-opacity=".25"/><stop offset="1" stop-color="#2a150c" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="chandGlow">
            <stop offset="0" stop-color="#f6c98a" stop-opacity=".55"/><stop offset=".35" stop-color="#b8682f" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="windowLight" cx=".5" cy=".3" r=".8">
            <stop offset="0" stop-color="#3b4a5a" stop-opacity=".45"/><stop offset="1" stop-color="#0d1116" stop-opacity=".2"/>
        </radialGradient>
        <linearGradient id="spotG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffd9a3" stop-opacity=".0"/><stop offset=".3" stop-color="#ffd9a3" stop-opacity=".12"/><stop offset="1" stop-color="#ffcf8f" stop-opacity=".22"/>
        </linearGradient>
        <radialGradient id="spotFloor">
            <stop offset="0" stop-color="#f1b877" stop-opacity=".35"/><stop offset="1" stop-color="#f1b877" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="curtain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#2a0909"/><stop offset=".2" stop-color="#4a1211"/><stop offset=".4" stop-color="#220707"/><stop offset=".6" stop-color="#43100f"/><stop offset=".8" stop-color="#1c0606"/><stop offset="1" stop-color="#3a0e0d"/>
        </linearGradient>
        <linearGradient id="column" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#140d0a"/><stop offset=".45" stop-color="#2e2018"/><stop offset="1" stop-color="#0f0907"/>
        </linearGradient>
        <radialGradient id="flashG">
            <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".2" stop-color="#fff3dc" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
        </radialGradient>

        <symbol id="man" viewBox="0 0 100 260">
            <circle cx="50" cy="28" r="17"/>
            <path d="M50 46C30 46 17 55 13 74L6 196 20 198 27 112 29 260 71 260 73 112 80 198 94 196 87 74C83 55 70 46 50 46Z"/>
        </symbol>
        <symbol id="woman" viewBox="0 0 100 260">
            <circle cx="50" cy="30" r="15"/>
            <path d="M34 20C36 6 64 6 66 20L68 40 32 40Z"/>
            <path d="M50 46C34 46 23 54 20 72L12 180 24 182 30 110 14 260 86 260 70 110 76 182 88 180 80 72C77 54 66 46 50 46Z"/>
        </symbol>
        <symbol id="cheer" viewBox="0 0 100 260" overflow="visible">
            <circle cx="50" cy="28" r="17"/>
            <path d="M50 46C30 46 17 55 13 74L6 196 20 198 27 112 29 260 71 260 73 112 80 198 94 196 87 74C83 55 70 46 50 46Z"/>
            <path d="M78 64L96 -4 84 -8 70 60Z"/>
            <circle cx="91" cy="-9" r="8"/>
        </symbol>
        <symbol id="actor" viewBox="0 0 100 260" overflow="visible">
            <circle cx="50" cy="26" r="17"/>
            <path d="M50 44C30 44 16 54 12 72L-6 20-18 26 2 94 27 112 26 260 74 260 73 112 98 94 118 26 106 20 88 72C84 54 70 44 50 44Z"/>
            <path d="M27 190 16 250 30 250 Z M73 190 84 250 70 250Z"/>
        </symbol>
        <g id="bouquet">
            <path d="M0 26L-15 -8 15 -8Z" fill="#2b2320"/>
            <path d="M0 26L-15 -8 -4 -8Z" fill="#3a302b"/>
            <circle cx="-10" cy="-12" r="6" fill="#1d2616"/>
            <circle cx="11" cy="-13" r="6" fill="#1d2616"/>
            <circle cx="-6" cy="-18" r="7" fill="#6b1b19"/>
            <circle cx="6" cy="-20" r="7" fill="#7f2420"/>
            <circle cx="0" cy="-12" r="6" fill="#591513"/>
            <circle cx="-13" cy="-22" r="5" fill="#8c2b24"/>
            <circle cx="13" cy="-24" r="5" fill="#5f1715"/>
            <circle cx="1" cy="-28" r="5" fill="#9a6a32"/>
            <circle cx="-3" cy="-21" r="2" fill="#c07a4a" opacity=".6"/>
        </g>
    </defs>

    <!-- wall -->
    <rect width="1600" height="900" fill="url(#wall)"/>
    <!-- cornice -->
    <rect x="0" y="128" width="1600" height="22" fill="#2a1c14"/>
    <rect x="0" y="150" width="1600" height="4" fill="#0c0806"/>
    <rect x="0" y="118" width="1600" height="10" fill="#1d130e"/>

    <!-- side windows -->
    <g>
        <path d="M150 700V300A70 70 0 0 1 290 300V700Z" fill="url(#windowLight)"/>
        <path d="M1310 700V300A70 70 0 0 1 1450 300V700Z" fill="url(#windowLight)"/>
        <g stroke="#0e0907" stroke-width="5" fill="none">
            <path d="M150 700V300A70 70 0 0 1 290 300V700Z"/><path d="M220 230V700M150 420H290M150 560H290"/>
            <path d="M1310 700V300A70 70 0 0 1 1450 300V700Z"/><path d="M1380 230V700M1310 420H1450M1310 560H1450"/>
        </g>
    </g>

    <!-- posters -->
    <g>
        <rect x="445" y="300" width="110" height="160" fill="#1a100c" stroke="#6b5230" stroke-width="3" opacity=".9"/>
        <rect x="458" y="314" width="84" height="132" fill="#3a1412"/>
        <circle cx="500" cy="360" r="20" fill="#1d0a09"/>
        <rect x="468" y="400" width="64" height="4" fill="#9b7a4a" opacity=".7"/>
        <rect x="476" y="412" width="48" height="3" fill="#9b7a4a" opacity=".5"/>
        <rect x="1045" y="300" width="110" height="160" fill="#1a100c" stroke="#6b5230" stroke-width="3" opacity=".9"/>
        <rect x="1058" y="314" width="84" height="132" fill="#2a1512"/>
        <path d="M1075 430L1100 340 1125 430Z" fill="#150908"/>
        <rect x="1068" y="324" width="64" height="4" fill="#9b7a4a" opacity=".7"/>
    </g>

    <!-- central auditorium doors -->
    <ellipse class="door-glow" cx="800" cy="600" rx="340" ry="300" fill="url(#doorLight)"/>
    <path d="M670 700V430A130 130 0 0 1 930 430V700Z" fill="#3a2214"/>
    <path d="M690 700V432A110 110 0 0 1 910 432V700Z" fill="#7a4524" opacity=".7"/>
    <path d="M690 700V432A110 110 0 0 1 910 432V700Z" fill="url(#doorLight)"/>
    <path d="M670 700V430A130 130 0 0 1 930 430V700" fill="none" stroke="#5a3f24" stroke-width="6"/>
    <rect x="796" y="322" width="8" height="378" fill="#1e120b"/>

    <!-- columns -->
    <g>
        <rect x="338" y="160" width="44" height="540" fill="url(#column)"/><rect x="328" y="154" width="64" height="16" fill="#2e2018"/><rect x="328" y="684" width="64" height="16" fill="#1a110c"/>
        <rect x="598" y="160" width="44" height="540" fill="url(#column)"/><rect x="588" y="154" width="64" height="16" fill="#2e2018"/><rect x="588" y="684" width="64" height="16" fill="#1a110c"/>
        <rect x="958" y="160" width="44" height="540" fill="url(#column)"/><rect x="948" y="154" width="64" height="16" fill="#2e2018"/><rect x="948" y="684" width="64" height="16" fill="#1a110c"/>
        <rect x="1218" y="160" width="44" height="540" fill="url(#column)"/><rect x="1208" y="154" width="64" height="16" fill="#2e2018"/><rect x="1208" y="684" width="64" height="16" fill="#1a110c"/>
    </g>

    <!-- floor -->
    <rect x="0" y="700" width="1600" height="200" fill="url(#floor)"/>
    <g stroke="#2a1c14" stroke-width="1" opacity=".5">
        <path d="M800 700L-400 900M800 700L0 900M800 700L400 900M800 700L800 900M800 700L1200 900M800 700L1600 900M800 700L2000 900"/>
        <path d="M0 730H1600M0 775H1600M0 840H1600"/>
    </g>
    <ellipse cx="800" cy="760" rx="260" ry="40" fill="url(#spotFloor)"/>

    <!-- chandelier -->
    <circle class="chand-glow" cx="800" cy="130" r="330" fill="url(#chandGlow)"/>
    <g fill="#2a1a10" stroke="#6b4b28" stroke-width="1.5">
        <line x1="800" y1="0" x2="800" y2="70" stroke="#3a2818" stroke-width="3"/>
        <ellipse cx="800" cy="80" rx="18" ry="10"/>
        <path d="M720 130Q800 190 880 130" fill="none" stroke-width="4"/>
        <path d="M680 118Q800 210 920 118" fill="none" stroke-width="3"/>
        <path d="M800 85V175" stroke-width="4"/>
        <ellipse cx="800" cy="182" rx="10" ry="12"/>
    </g>
    <g fill="#ffd79a" class="chand-glow">
        <circle cx="720" cy="124" r="4"/><circle cx="760" cy="146" r="4"/><circle cx="800" cy="152" r="4"/><circle cx="840" cy="146" r="4"/><circle cx="880" cy="124" r="4"/>
        <circle cx="680" cy="112" r="3.5"/><circle cx="920" cy="112" r="3.5"/>
    </g>
    <g stroke="#b8905a" stroke-width="1" opacity=".5">
        <line x1="740" y1="140" x2="740" y2="165"/><line x1="780" y1="152" x2="780" y2="180"/><line x1="820" y1="152" x2="820" y2="180"/><line x1="860" y1="140" x2="860" y2="165"/>
    </g>

    <!-- spotlight on actor -->
    <polygon class="spot" points="770,150 830,150 960,770 640,770" fill="url(#spotG)"/>

    <!-- back crowd -->
    <g fill="#241813">
        <use href="#man" width="100" height="260" transform="translate(400 530) scale(.72)"/>
        <use href="#woman" width="100" height="260" transform="translate(455 540) scale(.7)"/>
        <use href="#cheer" width="100" height="260" transform="translate(515 528) scale(.73)"/>
        <use href="#man" width="100" height="260" transform="translate(575 535) scale(.72)"/>
        <use href="#woman" width="100" height="260" transform="translate(630 532) scale(.72)"/>
        <use href="#man" width="100" height="260" transform="translate(900 532) scale(.72)"/>
        <use href="#cheer" width="100" height="260" transform="translate(955 530) scale(.73)"/>
        <use href="#woman" width="100" height="260" transform="translate(1015 538) scale(.7)"/>
        <use href="#man" width="100" height="260" transform="translate(1075 530) scale(.72)"/>
        <use href="#woman" width="100" height="260" transform="translate(1135 540) scale(.7)"/>
        <use href="#man" width="100" height="260" transform="translate(290 545) scale(.68)"/>
        <use href="#man" width="100" height="260" transform="translate(1240 545) scale(.68)"/>
    </g>

    <!-- camera flashes -->
    <circle class="flash" cx="540" cy="560" r="70" fill="url(#flashG)"/>
    <circle class="flash f2" cx="1040" cy="575" r="80" fill="url(#flashG)"/>
    <circle class="flash f3" cx="610" cy="600" r="60" fill="url(#flashG)"/>

    <!-- actor -->
    <g>
        <use href="#actor" width="100" height="260" transform="translate(752 500) scale(.96)" fill="#0d0908"/>
        <use href="#actor" width="100" height="260" transform="translate(752 500) scale(.96)" fill="none" stroke="#e7b073" stroke-width="2.2" opacity=".45"/>
        <path d="M792 548L800 555 808 548 808 560 800 555 792 560Z" fill="#b9864f" opacity=".8"/>
        <rect x="796" y="560" width="8" height="30" fill="#3a2a20" opacity=".6"/>
    </g>

    <!-- middle crowd with bouquets -->
    <g fill="#120c0a">
        <use href="#woman" width="100" height="260" transform="translate(520 555) scale(.95)"/>
        <use href="#man" width="100" height="260" transform="translate(620 550) scale(.98)"/>
        <use href="#man" width="100" height="260" transform="translate(890 550) scale(.98)"/>
        <use href="#cheer" width="100" height="260" transform="translate(990 555) scale(.96)"/>
        <use href="#woman" width="100" height="260" transform="translate(1080 560) scale(.94)"/>
        <use href="#man" width="100" height="260" transform="translate(420 565) scale(.94)"/>
    </g>
    <!-- arms holding bouquets toward actor -->
    <path d="M700 620L738 600" stroke="#120c0a" stroke-width="14" stroke-linecap="round"/>
    <use href="#bouquet" transform="translate(744 596) rotate(-28) scale(1.3)"/>
    <path d="M902 624L866 604" stroke="#120c0a" stroke-width="14" stroke-linecap="round"/>
    <use href="#bouquet" transform="translate(860 600) rotate(26) scale(1.25)"/>
    <!-- third bouquet held high in the crowd -->
    <use href="#bouquet" transform="translate(1072 548) rotate(10) scale(1.05)"/>

    <!-- front silhouettes -->
    <g fill="#070504">
        <use href="#man" width="100" height="260" transform="translate(60 520) scale(1.55)"/>
        <use href="#woman" width="100" height="260" transform="translate(210 560) scale(1.45)"/>
        <use href="#man" width="100" height="260" transform="translate(1280 560) scale(1.45)"/>
        <use href="#cheer" width="100" height="260" transform="translate(1410 520) scale(1.55)"/>
        <use href="#woman" width="100" height="260" transform="translate(360 640) scale(1.2)"/>
        <use href="#man" width="100" height="260" transform="translate(1150 640) scale(1.2)"/>
    </g>

    <!-- curtains -->
    <path d="M0 0H210Q150 180 120 420Q100 640 40 900H0Z" fill="url(#curtain)"/>
    <path d="M1600 0H1390Q1450 180 1480 420Q1500 640 1560 900H1600Z" fill="url(#curtain)"/>
    <path d="M0 0H1600V40Q1400 70 1200 45Q1000 75 800 45Q600 75 400 45Q200 70 0 40Z" fill="#300b0a"/>
    <path d="M0 40Q200 70 400 45Q600 75 800 45Q1000 75 1200 45Q1400 70 1600 40" fill="none" stroke="#6b5230" stroke-width="2" opacity=".6"/>
</svg>
    <div class="particles" id="particles"></div>
    <div class="shade"></div>
    <div class="grain"></div>
</div>
</div>
`;

// ============================================================
// Разгадка: Вадим (убийца)
// ============================================================
export const THEATRE_END_HTML = `
<style>
.th-end{position:absolute;inset:0;overflow:hidden}
.th-end *{margin:0;padding:0;box-sizing:border-box}
.th-end,.th-end{min-height:100%;background:#0d0a09;color:#e9e1d6;font-family:Inter,sans-serif}
.th-end{overflow-x:hidden}
.th-end .scene{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;
            background:
                radial-gradient(ellipse 60% 50% at 50% 38%, rgba(120,52,30,.20), transparent 70%),
                radial-gradient(ellipse 120% 80% at 50% 110%, #1a0d0a 0%, transparent 60%),
                linear-gradient(180deg,#120d0b 0%,#0d0a09 55%,#0a0706 100%);}
.th-end .office{position:absolute;inset:0;width:100%;height:100%;opacity:.6;filter:saturate(.85)}
.th-end .office .screen{animation:flick2 5s infinite}
.th-end .office .rec{animation:rec 1.2s steps(2) infinite}
@keyframes rec{0%{opacity:1}100%{opacity:.15}}
.th-end .mirror .bulb{animation:flick 6s infinite}
.th-end .mirror .bulb:nth-child(3n){animation-delay:-2s}
.th-end .mirror .bulb:nth-child(4n){animation:flick2 4s infinite}
@keyframes flick{0%,100%{opacity:.9}92%{opacity:.9}93%{opacity:.2}95%{opacity:.8}96%{opacity:.3}}
@keyframes flick2{0%,60%,100%{opacity:.6}62%{opacity:.1}64%{opacity:.7}}
.th-end .spot{position:absolute;left:50%;top:-20%;width:70vw;height:130vh;transform:translateX(-50%);
            background:conic-gradient(from 180deg at 50% 0%,transparent 165deg,rgba(230,160,110,.06) 175deg,rgba(230,170,120,.09) 180deg,rgba(230,160,110,.06) 185deg,transparent 195deg);
            animation:spot 10s ease-in-out infinite}
@keyframes spot{0%,100%{opacity:.8}50%{opacity:1}}
.th-end .desk .lamp-glow{animation:spot 10s ease-in-out infinite}
@media(max-width:700px){.th-end .office{opacity:.4}}
.th-end #fx{position:absolute;inset:0;width:100%;height:100%}
.th-end .flash{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 0%,rgba(190,200,220,.18),transparent 60%);opacity:0}
.th-end .flash.on{animation:flash 1.2s ease-out}
@keyframes flash{0%{opacity:0}5%{opacity:1}10%{opacity:.2}16%{opacity:.8}100%{opacity:0}}
.th-end .vignette{position:absolute;inset:0;background:radial-gradient(ellipse 75% 70% at 50% 45%,transparent 40%,rgba(0,0,0,.85) 100%)}
.th-end .grain{position:absolute;inset:-50%;opacity:.07;
            background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
            animation:grain 1s steps(6) infinite}
@keyframes grain{0%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-4%)}60%{transform:translate(-4%,-1%)}80%{transform:translate(3%,3%)}}
</style>
<div class="th-end">
<div class="scene">
        <div class="spot"></div>
        <svg class="office" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" fill="none">
            <defs>
                <pattern id="wp" width="48" height="48" patternUnits="userSpaceOnUse">
                    <rect width="48" height="48" fill="#1b1310"/>
                    <path d="M0 0 V48" stroke="#231814" stroke-width="10"/>
                    <path d="M24 18 L30 24 L24 30 L18 24Z" fill="#2a1d17"/>
                </pattern>
                <pattern id="scan" width="4" height="3" patternUnits="userSpaceOnUse">
                    <rect width="4" height="1" fill="rgba(0,0,0,.35)"/>
                </pattern>
                <pattern id="clap" width="20" height="14" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
                    <rect width="20" height="14" fill="#141414"/><rect width="10" height="14" fill="#d9cfbf"/>
                </pattern>
                <linearGradient id="scr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#1c1116"/><stop offset="1" stop-color="#07060a"/>
                </linearGradient>
                <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#0a0d14"/><stop offset="1" stop-color="#161a22"/>
                </linearGradient>
            </defs>

            <!-- стены -->
            <rect width="1600" height="900" fill="url(#wp)"/>
            <rect width="1600" height="34" fill="#120b08"/>
            <rect y="34" width="1600" height="4" fill="#3a2418" opacity=".6"/>
            <rect y="560" width="1600" height="260" fill="#22140d"/>
            <rect y="552" width="1600" height="10" fill="#3a2418"/>
            <g stroke="#3a2418" stroke-width="2">
                <rect x="20" y="585" width="130" height="200" rx="3"/><rect x="180" y="585" width="130" height="200" rx="3"/>
                <rect x="340" y="585" width="130" height="200" rx="3"/><rect x="500" y="585" width="130" height="200" rx="3"/>
                <rect x="660" y="585" width="130" height="200" rx="3"/><rect x="820" y="585" width="130" height="200" rx="3"/>
                <rect x="980" y="585" width="130" height="200" rx="3"/><rect x="1140" y="585" width="130" height="200" rx="3"/>
                <rect x="1300" y="585" width="130" height="200" rx="3"/><rect x="1460" y="585" width="130" height="200" rx="3"/>
            </g>
            <rect y="810" width="1600" height="12" fill="#170d09"/>
            <rect y="822" width="1600" height="78" fill="#0e0806"/>

            <!-- окно с дождём -->
            <rect x="720" y="100" width="260" height="380" fill="url(#night)"/>
            <g fill="#e8b07a" opacity=".5">
                <rect x="740" y="420" width="4" height="4"/><rect x="770" y="400" width="3" height="3"/><rect x="800" y="430" width="4" height="3"/>
                <rect x="880" y="410" width="3" height="4"/><rect x="920" y="425" width="4" height="4"/><rect x="950" y="395" width="3" height="3"/>
            </g>
            <g stroke="#9aa6b8" stroke-width="1" opacity=".25">
                <path d="M745 230 v40"/><path d="M790 300 v30"/><path d="M830 250 v50"/><path d="M880 320 v35"/>
                <path d="M915 240 v45"/><path d="M955 330 v30"/><path d="M760 380 v25"/><path d="M900 400 v28"/>
            </g>
            <g stroke="#2a1a12" stroke-width="6">
                <path d="M720 110 H980"/><path d="M720 122 H980"/><path d="M720 134 H980"/><path d="M720 146 H980"/>
                <path d="M720 158 H980"/><path d="M720 170 H980"/><path d="M720 182 H980"/><path d="M720 194 H980"/>
            </g>
            <path d="M850 100 V480 M720 290 H980" stroke="#2e1c12" stroke-width="8"/>
            <rect x="720" y="100" width="260" height="380" stroke="#2e1c12" stroke-width="12"/>
            <rect x="706" y="480" width="288" height="12" fill="#3a2418"/>

            <!-- подложка разбитого зеркала над столом -->
            <rect x="210" y="120" width="320" height="440" rx="10" fill="#15100e"/>

        <svg class="mirror" x="170" y="80" width="400" height="520" viewBox="0 0 400 520" fill="none">
            <rect x="40" y="40" width="320" height="440" rx="10" stroke="#8a6a55" stroke-width="3"/>
            <rect x="56" y="56" width="288" height="408" rx="4" fill="rgba(160,140,130,.05)" stroke="#5a463a"/>
            <g id="bulbs"></g>
            <g stroke="#d8cfc6" stroke-width="1.2" opacity=".85">
                <path d="M210 230 L150 120 L130 70"/><path d="M210 230 L290 140 L330 90"/>
                <path d="M210 230 L320 260 L344 250"/><path d="M210 230 L260 360 L280 464"/>
                <path d="M210 230 L140 330 L80 420"/><path d="M210 230 L70 220 L56 200"/>
                <path d="M150 120 L190 110"/><path d="M290 140 L300 190"/><path d="M140 330 L190 350"/>
                <path d="M260 360 L310 340"/><path d="M190 110 L210 230"/><path d="M300 190 L320 260"/>
                <circle cx="210" cy="230" r="6"/>
            </g>
        </svg>
        <svg class="desk" x="80" y="540" width="600" height="320" viewBox="0 0 600 320" fill="none">
            <defs>
                <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#4a2c1c"/><stop offset="1" stop-color="#2e1b11"/>
                </linearGradient>
                <radialGradient id="deskLight" cx=".5" cy=".3" r=".6">
                    <stop offset="0" stop-color="rgba(230,170,120,.18)"/><stop offset="1" stop-color="rgba(230,170,120,0)"/>
                </radialGradient>
            </defs>
            <!-- ножки -->
            <rect x="40" y="228" width="16" height="92" fill="#1e120b"/>
            <rect x="544" y="228" width="16" height="92" fill="#1e120b"/>
            <rect x="90" y="222" width="10" height="98" fill="#170d08"/>
            <rect x="500" y="222" width="10" height="98" fill="#170d08"/>
            <!-- столешница -->
            <polygon points="60,150 540,150 590,208 10,208" fill="url(#wood)"/>
            <g stroke="#5a3624" stroke-width=".8" opacity=".5">
                <path d="M70 162 C200 158 380 166 530 160"/>
                <path d="M45 178 C220 172 390 182 555 176"/>
                <path d="M28 194 C200 190 400 198 572 192"/>
            </g>
            <rect x="10" y="208" width="580" height="20" fill="#24150d"/>
            <rect x="10" y="208" width="580" height="2" fill="#6a4430" opacity=".6"/>
            <ellipse class="lamp-glow" cx="300" cy="175" rx="260" ry="40" fill="url(#deskLight)"/>

            <!-- папка бухгалтерии -->
            <g transform="translate(150,152) skewX(-18) scale(1,.34)">
                <rect x="10" y="8" width="250" height="160" rx="3" fill="#000" opacity=".35"/>
                <rect x="14" y="-6" width="226" height="150" fill="#d9cfbf"/>
                <rect x="22" y="-12" width="220" height="150" fill="#e8dfd0"/>
                <g stroke="#8d8278" stroke-width="2" opacity=".6">
                    <path d="M40 10 H200"/><path d="M40 26 H220"/><path d="M40 42 H180"/>
                </g>
                <path d="M0 20 H70 L84 4 H150 L160 20 H250 V172 H0 Z" fill="#6b3a28"/>
                <path d="M0 20 H250 V172 H0 Z" fill="#7a4430"/>
                <rect x="60" y="72" width="130" height="42" rx="2" fill="#e9e1d6"/>
                <text x="125" y="102" text-anchor="middle" font-family="Cormorant Garamond, serif" font-weight="600" font-size="22" letter-spacing="2" fill="#2a1a15">БУХГАЛТЕРИЯ</text>
                <path d="M0 140 H250" stroke="#4a2419" stroke-width="3"/>
                <rect x="112" y="150" width="26" height="14" rx="2" fill="#c8643f"/>
            </g>

            <!-- конверты -->
            <g transform="translate(395,158) skewX(-14) scale(1,.36) rotate(-8)">
                <rect x="6" y="10" width="150" height="96" fill="#000" opacity=".35"/>
                <rect x="0" y="0" width="150" height="96" fill="#d8cdb9"/>
                <path d="M0 0 L75 54 L150 0" stroke="#9c8f7c" stroke-width="2"/>
                <path d="M0 96 L58 44 M150 96 L92 44" stroke="#b5a893" stroke-width="1.5"/>
            </g>
            <g transform="translate(420,166) skewX(-14) scale(1,.36) rotate(6)">
                <rect x="6" y="10" width="150" height="96" fill="#000" opacity=".35"/>
                <rect x="0" y="0" width="150" height="96" fill="#e6dccb"/>
                <path d="M0 0 L75 54 L150 0 Z" fill="#d4c8b2" stroke="#9c8f7c" stroke-width="2"/>
                <circle cx="75" cy="52" r="12" fill="#8e2a22"/>
                <circle cx="75" cy="52" r="6" fill="#6e1e18"/>
                <g stroke="#7a6e60" stroke-width="2" opacity=".7">
                    <path d="M92 74 H138"/><path d="M92 84 H130"/>
                </g>
            </g>
            <g transform="translate(360,176) skewX(-14) scale(1,.34) rotate(-18)">
                <rect x="0" y="0" width="120" height="78" fill="#cfc3ad"/>
                <path d="M0 0 L60 44 L120 0" stroke="#9c8f7c" stroke-width="2"/>
            </g>

            <!-- настольная лампа -->
            <ellipse cx="72" cy="170" rx="24" ry="6" fill="#2a1a10"/>
            <rect x="70" y="120" width="4" height="50" fill="#8a6a45"/>
            <path d="M40 124 Q72 98 104 124 Z" fill="#34443a"/>
            <ellipse cx="72" cy="124" rx="32" ry="4" fill="rgba(240,200,150,.35)"/>

            <!-- осколки зеркала на столе -->
            <g fill="rgba(220,226,236,.3)" stroke="rgba(255,255,255,.55)" stroke-width=".8">
                <polygon points="250,166 272,160 266,176"/>
                <polygon points="300,184 330,178 318,196"/>
                <polygon points="210,190 226,184 232,198 214,200"/>
                <polygon points="350,170 362,166 358,178"/>
                <polygon points="120,196 140,190 136,204"/>
                <polygon points="280,198 292,194 290,204"/>
            </g>
        </svg>

            <!-- режиссёрский пульт -->
            <rect x="1070" y="650" width="10" height="168" fill="#140c08"/>
            <rect x="1500" y="650" width="10" height="168" fill="#140c08"/>
            <rect x="1050" y="636" width="480" height="16" fill="#2a1a11"/>
            <rect x="1050" y="636" width="480" height="2" fill="#6a4430" opacity=".6"/>
            <polygon points="1090,636 1490,636 1470,592 1110,592" fill="#18181b" stroke="#2c2c30"/>
            <g id="faders"></g>

            <!-- мониторы -->
            <rect x="1189" y="556" width="12" height="38" fill="#1a1a1c"/>
            <rect x="1389" y="556" width="12" height="38" fill="#1a1a1c"/>
            <rect x="1100" y="430" width="190" height="126" rx="4" fill="#0b0b0d" stroke="#2a2a2e" stroke-width="4"/>
            <g class="screen">
                <rect x="1110" y="440" width="170" height="106" fill="url(#scr)"/>
                <polygon points="1195,440 1160,546 1230,546" fill="rgba(240,190,140,.22)"/>
                <rect x="1110" y="530" width="170" height="16" fill="#2a1410"/>
                <circle cx="1195" cy="504" r="5" fill="#0a0706"/>
                <rect x="1190" y="509" width="10" height="24" rx="2" fill="#0a0706"/>
                <rect x="1110" y="440" width="170" height="106" fill="url(#scan)"/>
                <text x="1117" y="454" font-family="Inter,sans-serif" font-size="9" fill="#e9e1d6" opacity=".75">CAM 1 · СЦЕНА</text>
            </g>
            <rect x="1300" y="430" width="190" height="126" rx="4" fill="#0b0b0d" stroke="#2a2a2e" stroke-width="4"/>
            <g class="screen" style="animation-delay:-2s">
                <rect x="1310" y="440" width="170" height="106" fill="#0c0f13"/>
                <circle class="rec" cx="1322" cy="452" r="4" fill="#d0392b"/>
                <text x="1331" y="456" font-family="Inter,sans-serif" font-size="9" fill="#e9e1d6" opacity=".8">REC</text>
                <text id="tc" x="1395" y="500" text-anchor="middle" font-family="monospace" font-size="20" fill="#e8b07a">23:12:00:00</text>
                <polyline points="1320,528 1335,522 1348,532 1362,516 1378,530 1392,520 1408,534 1424,518 1440,528 1456,522 1470,528" stroke="#c8643f" stroke-width="1.2"/>
                <rect x="1310" y="440" width="170" height="106" fill="url(#scan)"/>
            </g>

            <!-- хлопушка -->
            <g transform="translate(1100,752) rotate(-8)">
                <rect x="0" y="-15" width="110" height="13" fill="url(#clap)"/>
                <rect x="0" y="0" width="110" height="70" fill="#141414" stroke="#2a2a2a"/>
                <text x="10" y="24" font-family="Cormorant Garamond,serif" font-weight="600" font-size="14" fill="#d9cfbf">ГРАНД</text>
                <text x="10" y="44" font-family="Inter,sans-serif" font-size="8" fill="#a89c90">СЦЕНА 7 · ДУБЛЬ 3</text>
                <path d="M10 54 H100" stroke="#3a3a3a"/>
            </g>

            <!-- кинокамера на штативе -->
            <path d="M1525 430 L1470 818 M1525 430 L1528 818 M1525 430 L1585 818" stroke="#1c1c1f" stroke-width="7" stroke-linecap="round"/>
            <rect x="1508" y="414" width="34" height="18" fill="#1c1c1f"/>
            <circle cx="1497" cy="322" r="30" fill="#19191c" stroke="#34343a" stroke-width="3"/>
            <circle cx="1553" cy="322" r="30" fill="#19191c" stroke="#34343a" stroke-width="3"/>
            <circle cx="1497" cy="322" r="6" fill="#34343a"/><circle cx="1553" cy="322" r="6" fill="#34343a"/>
            <rect x="1475" y="350" width="100" height="66" rx="6" fill="#202024" stroke="#34343a"/>
            <rect x="1440" y="366" width="36" height="34" rx="3" fill="#19191c"/>
            <ellipse cx="1440" cy="383" rx="6" ry="18" fill="#0a0a0c" stroke="#3a3a40"/>
            <circle class="rec" cx="1564" cy="362" r="3" fill="#d0392b"/>
        </svg>
        <canvas id="fx"></canvas>
        <div class="flash" id="flash"></div>
        <div class="vignette"></div>
        <div class="grain"></div>
    </div>
</div>
`;

