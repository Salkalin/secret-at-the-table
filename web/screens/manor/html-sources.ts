// ============================================================
// INTRO: Полночь у Вороновых (начало)
// ============================================================
export const MANOR_INTRO_HTML = `
<style>
.mn-intro{--bg:#0e0b0a; --text:#ece6de; --muted:#a39a90; --dim:#6f665d;
            --accent:#c65a3a; --line:rgba(236,230,222,.12); --card:rgba(22,18,16,.72);}
.mn-intro *{box-sizing:border-box;margin:0;padding:0}
.mn-intro,.mn-intro{height:100%}
.mn-intro{background:var(--bg);color:var(--text);font-family:Inter,sans-serif;line-height:1.55;overflow-x:hidden}
.mn-intro .scene{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.mn-intro .scene svg{position:absolute;inset:-3%;width:106%;height:106%;transition:transform .6s ease-out}
.mn-intro #fx{position:absolute;inset:0;width:100%;height:100%}
.mn-intro .shade{position:absolute;inset:0;
            background:
              linear-gradient(90deg,rgba(14,11,10,.94) 0%,rgba(14,11,10,.82) 35%,rgba(14,11,10,.35) 62%,rgba(14,11,10,.08) 100%),
              linear-gradient(180deg,rgba(14,11,10,.85) 0%,rgba(14,11,10,0) 22%,rgba(14,11,10,0) 75%,rgba(14,11,10,.7) 100%);}
.mn-intro .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 68% 55%,transparent 30%,rgba(0,0,0,.65) 100%)}
.mn-intro .grain{position:absolute;inset:0;opacity:.07;mix-blend-mode:overlay;
            background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.mn-intro .flash{position:absolute;inset:0;background:#b9c3d6;opacity:0;mix-blend-mode:soft-light}
.mn-intro .flash.on{animation:flash .9s ease-out}
@keyframes flash{0%{opacity:0}8%{opacity:.55}16%{opacity:.1}24%{opacity:.4}100%{opacity:0}}
.mn-intro .win-rain{animation:rainfall .7s linear infinite}
@keyframes rainfall{from{transform:translateY(0)}to{transform:translateY(520px)}}
.mn-intro .flicker{animation:flicker 4s ease-in-out infinite}
@keyframes flicker{0%,100%{opacity:.85}45%{opacity:1}50%{opacity:.7}55%{opacity:.95}}
.mn-intro .glint{animation:glint 3.5s ease-in-out infinite}
@keyframes glint{0%,100%{opacity:.15}50%{opacity:.8}}
@media(max-width:860px){.mn-intro .shade{background:linear-gradient(180deg,rgba(14,11,10,.9),rgba(14,11,10,.7) 60%,rgba(14,11,10,.5))}}
</style>
<div class="mn-intro">
<div class="scene" aria-hidden="true">
<svg id="room" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#140f0d"/><stop offset="1" stop-color="#1f1714"/>
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1a1210"/><stop offset="1" stop-color="#0b0807"/>
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2a3140"/><stop offset=".6" stop-color="#1a1f2a"/><stop offset="1" stop-color="#11141b"/>
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#aab4c8" stop-opacity=".16"/><stop offset="1" stop-color="#aab4c8" stop-opacity=".02"/>
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#cfd8e6" stop-opacity=".16"/><stop offset=".5" stop-color="#cfd8e6" stop-opacity=".04"/><stop offset="1" stop-color="#cfd8e6" stop-opacity=".12"/>
        </linearGradient>
        <radialGradient id="lamp" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#e79a5c" stop-opacity=".45"/><stop offset="1" stop-color="#e79a5c" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="moonGlow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#dfe5ee" stop-opacity=".5"/><stop offset="1" stop-color="#dfe5ee" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="blood" cx=".5" cy=".5" r=".5">
            <stop offset="0" stop-color="#5a1410" stop-opacity=".75"/><stop offset="1" stop-color="#3a0c0a" stop-opacity="0"/>
        </radialGradient>
        <clipPath id="winClip"><path d="M1080 560 V210 A130 130 0 0 1 1340 210 V560 Z"/></clipPath>
        <clipPath id="floorClip"><rect x="0" y="640" width="1600" height="260"/></clipPath>
        <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="blur2"><feGaussianBlur stdDeviation="1.5"/></filter>
    </defs>

    <!-- wall -->
    <rect width="1600" height="640" fill="url(#wall)"/>
    <g stroke="#2a201c" stroke-width="2" fill="none" opacity=".6">
        <line x1="0" y1="560" x2="1600" y2="560"/>
        <rect x="420" y="580" width="180" height="50"/><rect x="640" y="580" width="180" height="50"/><rect x="860" y="580" width="180" height="50"/>
    </g>

    <!-- window -->
    <path d="M1066 574 V210 A144 144 0 0 1 1354 210 V574 Z" fill="#0c0908"/>
    <g clip-path="url(#winClip)">
        <rect x="1080" y="60" width="260" height="520" fill="url(#sky)"/>
        <circle cx="1255" cy="235" r="90" fill="url(#moonGlow)"/>
        <circle cx="1255" cy="235" r="34" fill="#dcd8cc" opacity=".85"/>
        <circle cx="1245" cy="228" r="6" fill="#b9b4a6" opacity=".5"/><circle cx="1266" cy="244" r="4" fill="#b9b4a6" opacity=".5"/>
        <g fill="#0f1218" opacity=".9" filter="url(#blur6)">
            <ellipse cx="1150" cy="270" rx="120" ry="22"/><ellipse cx="1320" cy="200" rx="90" ry="18"/><ellipse cx="1220" cy="330" rx="140" ry="20"/>
        </g>
        <!-- distant trees / Kamenny island -->
        <path d="M1080 560 V470 Q1100 440 1115 465 Q1130 420 1150 455 Q1170 430 1185 470 L1200 480 Q1230 450 1250 475 Q1275 430 1300 468 Q1320 445 1340 470 V560Z" fill="#0a0c10"/>
        <g id="winRain" class="win-rain" stroke="#b8c4d8" stroke-width="1" opacity=".35"></g>
    </g>
    <g stroke="#0c0908" stroke-width="10" fill="none">
        <path d="M1080 560 V210 A130 130 0 0 1 1340 210 V560 Z" stroke-width="12"/>
        <line x1="1210" y1="80" x2="1210" y2="560"/>
        <line x1="1080" y1="300" x2="1340" y2="300"/>
        <line x1="1080" y1="430" x2="1340" y2="430"/>
    </g>
    <rect x="1050" y="560" width="320" height="16" fill="#241a16"/>
    <!-- curtains -->
    <path d="M1020 60 Q1040 300 1030 640 L1082 640 Q1070 360 1090 70 Z" fill="#2a0f0d" opacity=".9"/>
    <path d="M1400 60 Q1380 300 1392 640 L1340 640 Q1352 360 1332 70 Z" fill="#2a0f0d" opacity=".9"/>
    <rect x="1000" y="52" width="420" height="10" rx="5" fill="#3a2a22"/>

    <!-- bookshelves -->
    <g id="shelfL"></g>
    <g id="shelfR"></g>
    <g id="shelfM" opacity=".75"></g>

    <!-- floor -->
    <rect x="0" y="640" width="1600" height="260" fill="url(#floor)"/>
    <g id="planks" clip-path="url(#floorClip)" stroke="#000" stroke-opacity=".45" stroke-width="1.5"></g>
    <!-- rug -->
    <path d="M760 700 L1380 700 L1520 900 L600 900 Z" fill="#2a100e" opacity=".55"/>
    <path d="M790 712 L1360 712 L1480 890 L640 890 Z" fill="none" stroke="#6b2a1c" stroke-opacity=".35" stroke-width="2"/>

    <!-- moonlight beam -->
    <path d="M1080 330 L1340 330 L1420 900 L760 900 Z" fill="url(#beam)" style="mix-blend-mode:screen"/>
    <path d="M1000 760 L1360 760 L1440 880 L900 880 Z" fill="#aab4c8" opacity=".045"/>

    <!-- blood & chalk outline -->
    <ellipse cx="930" cy="812" rx="70" ry="20" fill="url(#blood)"/>
    <g fill="none" stroke="#e8e2d6" stroke-opacity=".42" stroke-width="2.4" stroke-linejoin="round" stroke-dasharray="14 3 6 2" filter="url(#blur2)">
        <ellipse cx="880" cy="800" rx="22" ry="13"/>
        <path d="M902 790 L935 772 L975 750 L993 744 L997 752 L982 762 L952 782 L1000 790 L1060 778 L1102 784 L1102 793 L1062 793 L1030 806 L1080 826 L1100 832 L1096 843 L1072 839 L1015 821 L960 823 L930 835 L906 843 L900 834 L924 819 L905 809 Z"/>
    </g>

    <!-- overturned chair -->
    <g fill="#120c0a" stroke="#2c211c" stroke-width="2">
        <path d="M720 760 L820 740 L828 752 L728 774 Z"/>
        <path d="M735 770 L700 838" /><path d="M810 752 L800 830"/>
        <path d="M720 760 L680 700 L692 696 L732 757 Z"/>
        <path d="M680 700 L770 682 L778 694 L692 712"/>
    </g>

    <!-- display case -->
    <g>
        <ellipse cx="1240" cy="728" rx="110" ry="14" fill="#000" opacity=".5"/>
        <rect x="1170" y="600" width="140" height="124" fill="#1d1411" stroke="#35271f" stroke-width="2"/>
        <rect x="1160" y="592" width="160" height="12" fill="#3a2a20"/>
        <rect x="1182" y="620" width="116" height="84" fill="none" stroke="#2c1f19" stroke-width="2"/>
        <!-- empty cushion -->
        <path d="M1200 590 Q1240 572 1280 590 Z" fill="#4a1512"/>
        <ellipse cx="1240" cy="586" rx="10" ry="3" fill="#2a0b09"/>
        <!-- glass box -->
        <path d="M1166 592 L1166 480 L1314 480 L1314 592" fill="url(#glass)" stroke="#c9d3e2" stroke-opacity=".35" stroke-width="1.5"/>
        <!-- broken front pane -->
        <path d="M1190 592 L1196 540 L1215 555 L1228 505 L1246 548 L1262 518 L1272 560 L1292 536 L1296 592 Z" fill="#0e0b0a" opacity=".55"/>
        <path d="M1190 592 L1196 540 L1215 555 L1228 505 L1246 548 L1262 518 L1272 560 L1292 536 L1296 592" fill="none" stroke="#dfe6f0" stroke-opacity=".55" stroke-width="1.2"/>
        <path d="M1228 505 L1210 482 M1262 518 L1284 484 M1196 540 L1170 520" stroke="#dfe6f0" stroke-opacity=".3" stroke-width="1"/>
        <line x1="1172" y1="486" x2="1182" y2="580" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
        <rect x="1160" y="474" width="160" height="8" fill="#3a2a20"/>
        <!-- shards -->
        <g fill="#cfd8e6" fill-opacity=".22" stroke="#e6ecf4" stroke-opacity=".4" stroke-width=".8">
            <path d="M1150 752 L1172 744 L1162 760 Z"/><path d="M1200 770 L1224 762 L1216 778 Z"/>
            <path d="M1262 756 L1290 750 L1278 766 Z"/><path d="M1320 780 L1336 768 L1340 786 Z"/>
            <path d="M1110 790 L1128 782 L1122 798 Z"/><path d="M1240 800 L1258 792 L1254 806 Z"/>
            <path d="M1180 738 L1192 734 L1188 744 Z"/><path d="M1300 740 L1314 736 L1310 748 Z"/>
        </g>
        <g fill="#fff">
            <circle class="glint" cx="1164" cy="750" r="1.6"/>
            <circle class="glint" cx="1280" cy="755" r="1.6" style="animation-delay:1.2s"/>
            <circle class="glint" cx="1250" cy="798" r="1.4" style="animation-delay:2.1s"/>
            <circle class="glint" cx="1330" cy="776" r="1.4" style="animation-delay:.6s"/>
        </g>
    </g>

    <!-- evidence markers -->
    <g font-family="Inter,sans-serif" font-size="13" font-weight="600" text-anchor="middle">
        <path d="M1128 770 L1146 770 L1140 746 L1134 746 Z" fill="#c65a3a" opacity=".9"/>
        <text x="1137" y="765" fill="#1a0e0a">1</text>
        <path d="M990 850 L1010 850 L1003 823 L997 823 Z" fill="#c65a3a" opacity=".9"/>
        <text x="1000" y="845" fill="#1a0e0a">2</text>
        <path d="M1364 812 L1384 812 L1377 785 L1371 785 Z" fill="#c65a3a" opacity=".9"/>
        <text x="1374" y="807" fill="#1a0e0a">3</text>
    </g>

    <!-- dropped key & magnifier -->
    <g stroke="#9a7a4a" stroke-width="2.4" fill="none" opacity=".75">
        <circle cx="1060" cy="866" r="6"/><path d="M1066 866 L1090 866 M1082 866 L1082 872 M1088 866 L1088 871"/>
    </g>

    <!-- side table lamp -->
    <circle cx="1490" cy="560" r="170" fill="url(#lamp)" class="flicker"/>
    <g>
        <rect x="1450" y="610" width="90" height="10" fill="#2b1f19"/>
        <path d="M1460 620 L1462 720 M1530 620 L1528 720" stroke="#2b1f19" stroke-width="5"/>
        <rect x="1486" y="560" width="6" height="50" fill="#3a2a20"/>
        <path d="M1464 562 L1514 562 L1502 528 L1476 528 Z" fill="#6b3b22" class="flicker"/>
        <ellipse cx="1489" cy="562" rx="25" ry="4" fill="#f0b27a" opacity=".6" class="flicker"/>
    </g>

    <!-- locked door (left, dim) -->
    <g opacity=".7">
        <rect x="430" y="250" width="170" height="390" fill="#150e0c" stroke="#2c211c" stroke-width="3"/>
        <rect x="450" y="275" width="130" height="150" fill="none" stroke="#2c211c" stroke-width="2"/>
        <rect x="450" y="450" width="130" height="170" fill="none" stroke="#2c211c" stroke-width="2"/>
        <circle cx="580" cy="450" r="6" fill="#6a5334"/>
        <rect x="574" y="462" width="12" height="18" rx="2" fill="#3b2d1d"/>
    </g>
</svg>
<canvas id="fx"></canvas>
<div class="flash" id="flash"></div>
<div class="shade"></div>
<div class="vignette"></div>
<div class="grain"></div>
</div>
</div>
`;
// ============================================================
// CHAPTER 1: Часы остановились
// ============================================================
export const MANOR_CH1_HTML = `
<style>
.mn-ch1 *{box-sizing:border-box;margin:0;padding:0}
.mn-ch1,.mn-ch1{height:100%}
.mn-ch1{background:#0d0a09;color:#e9e1d6;font-family:Inter,sans-serif;overflow-x:hidden;min-height:100vh}
.mn-ch1 .bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;
            background:radial-gradient(120% 90% at 70% 30%,#1a1412 0%,#110d0c 45%,#0a0808 100%)}
.mn-ch1 .scene{position:absolute;inset:0;width:100%;height:100%;
            -webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.35) 30%,#000 60%);
                    mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.35) 30%,#000 60%);
            opacity:.9}
.mn-ch1 .lamp{position:absolute;left:-10vw;bottom:-20vh;width:70vw;height:80vh;
            background:radial-gradient(closest-side,rgba(196,110,60,.16),rgba(196,110,60,.05) 55%,transparent);
            animation:flicker 5s infinite ease-in-out}
@keyframes flicker{0%,100%{opacity:1}42%{opacity:.85}45%{opacity:.95}70%{opacity:.8}}
.mn-ch1 #winrain line{animation:winrain linear infinite}
@keyframes winrain{from{transform:translate(0,0)}to{transform:translate(-8px,470px)}}
.mn-ch1 .flash{position:absolute;inset:0;background:radial-gradient(60% 70% at 72% 35%,rgba(170,185,200,.18),transparent 70%);opacity:0}
.mn-ch1 .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 40%,rgba(0,0,0,.75) 100%)}
.mn-ch1 .grain{position:absolute;inset:-50%;width:200%;height:200%;opacity:.07;
            background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
            animation:grain 1s steps(6) infinite}
@keyframes grain{0%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}100%{transform:translate(0,0)}}
.mn-ch1 .gclock{position:absolute;bottom:0;left:2vw;height:min(88vh,920px);aspect-ratio:240/1000;pointer-events:none}
.mn-ch1 .gclock .pend{transform-origin:120px 330px}
.mn-ch1 .gclock .fl{transition:opacity .08s}
.mn-ch1 .dust{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(230,180,130,.5);animation:float linear infinite}
@keyframes float{from{transform:translate(0,0);opacity:0}15%{opacity:.8}85%{opacity:.6}to{transform:translate(40px,-220px);opacity:0}}
@media(max-width:760px){.mn-ch1 .gclock{height:62vh;left:6px;opacity:.4}}
.mn-ch1 .btn{background:#c85a3a;color:#fff4ec;border:0;border-radius:10px;padding:16px 24px;font:600 15px Inter;display:flex;align-items:center;gap:12px;cursor:pointer;transition:background .25s,transform .25s}
.mn-ch1 .btn:hover{background:#d8683f;transform:translateY(-1px)}
.mn-ch1 .clues{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;margin-top:40px;max-height:0;overflow:hidden;opacity:0;transition:max-height .6s ease,opacity .5s ease}
.mn-ch1 .clues.open{max-height:900px;opacity:1}
@media(max-width:640px){.mn-ch1 .scene{-webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,.4),rgba(0,0,0,.7));mask-image:linear-gradient(to bottom,rgba(0,0,0,.4),rgba(0,0,0,.7))}}
</style>
<div class="mn-ch1">
<div class="bg">
        <svg class="scene" viewBox="0 0 1000 800" preserveAspectRatio="xMaxYMax slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#1c2328"/><stop offset="1" stop-color="#0c0f12"/>
                </linearGradient>
                <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#140f0d"/><stop offset="1" stop-color="#070505"/>
                </linearGradient>
                <radialGradient id="face"><stop offset="0" stop-color="#d9c7a8"/><stop offset=".75" stop-color="#b09a7a"/><stop offset="1" stop-color="#7a6650"/></radialGradient>
                <radialGradient id="clockglow"><stop offset="0" stop-color="rgba(230,170,110,.28)"/><stop offset=".5" stop-color="rgba(230,170,110,.08)"/><stop offset="1" stop-color="rgba(230,170,110,0)"/></radialGradient>
                <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#2a1a13"/><stop offset=".5" stop-color="#4a2e20"/><stop offset="1" stop-color="#2a1a13"/>
                </linearGradient>
                <clipPath id="winclip"><path d="M430 560 V230 Q430 130 525 130 Q620 130 620 230 V560 Z"/></clipPath>
            </defs>
            <!-- wall panels -->
            <g stroke="#1d1715" stroke-width="2" fill="none">
                <rect x="30" y="600" width="220" height="130"/><rect x="270" y="600" width="140" height="130"/>
            </g>
            <!-- window -->
            <path d="M430 560 V230 Q430 130 525 130 Q620 130 620 230 V560 Z" fill="url(#sky)"/>
            <g clip-path="url(#winclip)">
                <circle cx="580" cy="200" r="60" fill="rgba(160,175,185,.06)"/>
                <path d="M430 520 L470 470 L505 500 L545 440 L585 490 L620 460 V560 H430Z" fill="#0a0c0e"/>
                <rect id="winflash" x="430" y="130" width="190" height="430" fill="#b9c6d2" opacity="0"/>
                <g id="winrain" stroke="rgba(170,185,195,.25)" stroke-width="1"></g>
            </g>
            <g stroke="#0e0b0a" stroke-width="7" fill="none">
                <path d="M430 560 V230 Q430 130 525 130 Q620 130 620 230 V560 Z"/>
                <line x1="525" y1="130" x2="525" y2="560"/>
                <line x1="430" y1="300" x2="620" y2="300"/><line x1="430" y1="430" x2="620" y2="430"/>
            </g>
            <rect x="418" y="556" width="214" height="12" fill="#0e0b0a"/>
            <!-- curtains -->
            <path d="M405 110 Q420 330 398 590 L440 590 Q455 330 440 110 Z" fill="#1f1210"/>
            <path d="M645 110 Q630 330 652 590 L610 590 Q595 330 610 110 Z" fill="#1f1210"/>
            <rect x="390" y="100" width="270" height="10" rx="4" fill="#120d0b"/>
            <!-- bookshelves -->
            <rect x="670" y="60" width="330" height="700" fill="#120d0b"/>
            <g id="books"></g>
            <!-- floor -->
            <rect x="0" y="730" width="1000" height="70" fill="url(#floor)"/>
            <!-- armchair + table -->
            <g fill="#0b0807">
                <path d="M520 730 V610 Q520 560 560 552 Q600 546 640 552 Q680 560 680 610 V730 Z"/>
                <path d="M505 730 V650 Q505 628 528 628 Q545 628 545 650 V730Z" fill="#100b09"/>
                <path d="M655 730 V650 Q655 628 675 628 Q695 628 695 650 V730Z" fill="#100b09"/>
                <rect x="440" y="660" width="54" height="6" fill="#140e0c"/>
                <rect x="464" y="666" width="6" height="64" fill="#140e0c"/>
                <path d="M458 660 Q455 640 460 632 H474 Q479 640 476 660Z" fill="none" stroke="rgba(200,140,90,.35)" stroke-width="1.5"/>
                <path d="M459 650 Q467 654 475 650 L476 660 H458Z" fill="rgba(160,80,40,.35)"/>
            </g>
        </svg>
        <div class="lamp"></div>

        <!-- grandfather clock (left, stopped at 00:14) -->
        <svg class="gclock" viewBox="0 0 240 1000" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" aria-label="Напольные часы, остановились на 00:14">
            <defs>
                <linearGradient id="gcWood" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#2e1c13"/><stop offset=".3" stop-color="#5a3826"/><stop offset=".55" stop-color="#6e4630"/><stop offset="1" stop-color="#2a1911"/>
                </linearGradient>
                <linearGradient id="gcWoodDark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#22150e"/><stop offset=".5" stop-color="#452a1c"/><stop offset="1" stop-color="#1e120c"/>
                </linearGradient>
                <radialGradient id="gcFace" cx=".45" cy=".4"><stop offset="0" stop-color="#eadbbd"/><stop offset=".7" stop-color="#c9b28b"/><stop offset="1" stop-color="#8f7757"/></radialGradient>
                <radialGradient id="gcGlow"><stop offset="0" stop-color="rgba(230,170,110,.30)"/><stop offset=".5" stop-color="rgba(230,170,110,.08)"/><stop offset="1" stop-color="rgba(230,170,110,0)"/></radialGradient>
                <linearGradient id="gcBrass" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#e2c48c"/><stop offset=".5" stop-color="#b08a55"/><stop offset="1" stop-color="#6e5232"/>
                </linearGradient>
                <linearGradient id="gcGlass" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#120a07"/><stop offset=".5" stop-color="#1c110c"/><stop offset="1" stop-color="#0e0806"/>
                </linearGradient>
            </defs>
            <circle cx="120" cy="245" r="170" fill="url(#gcGlow)"/>
            <!-- crown -->
            <path d="M34 168 Q120 70 206 168 V182 H34Z" fill="url(#gcWood)" stroke="#8a6444" stroke-width="1.5"/>
            <path d="M52 166 Q120 94 188 166" fill="none" stroke="#2a1911" stroke-width="2"/>
            <circle cx="120" cy="96" r="7" fill="url(#gcBrass)"/>
            <rect x="117" y="100" width="6" height="12" fill="#8a6444"/>
            <circle cx="40" cy="158" r="5" fill="url(#gcBrass)"/>
            <circle cx="200" cy="158" r="5" fill="url(#gcBrass)"/>
            <rect x="30" y="180" width="180" height="8" fill="#2a1911"/>
            <!-- hood -->
            <rect x="42" y="188" width="156" height="128" fill="url(#gcWood)" stroke="#8a6444" stroke-width="1.5"/>
            <rect x="48" y="192" width="8" height="120" fill="#2a1911"/><rect x="184" y="192" width="8" height="120" fill="#2a1911"/>
            <circle cx="120" cy="252" r="62" fill="url(#gcBrass)"/>
            <circle cx="120" cy="252" r="57" fill="url(#gcFace)"/>
            <g id="gcTicks" stroke="#2a1c14" stroke-linecap="round"></g>
            <g id="gcNums" fill="#2a1c14" font-family="Cormorant Garamond,serif" font-weight="700" font-size="11" text-anchor="middle" dominant-baseline="central"></g>
            <!-- hands: 00:14 -->
            <path d="M120 264 L115.5 252 L120 218 L124.5 252 Z" fill="#1a100b" transform="rotate(7 120 252)"/>
            <path d="M120 268 L117.5 252 L120 199 L122.5 252 Z" fill="#1a100b" transform="rotate(84 120 252)"/>
            <line x1="120" y1="262" x2="120" y2="203" stroke="#c85a3a" stroke-width="1" transform="rotate(252 120 252)"/>
            <circle cx="120" cy="252" r="3.5" fill="#c85a3a"/>
            <circle cx="120" cy="252" r="1.3" fill="#1a100b"/>
            <path d="M82 222 Q100 204 124 200" fill="none" stroke="rgba(255,240,215,.28)" stroke-width="3" stroke-linecap="round"/>
            <rect x="36" y="316" width="168" height="10" fill="#2a1911" stroke="#8a6444" stroke-width="1"/>
            <!-- waist -->
            <rect x="62" y="326" width="116" height="452" fill="url(#gcWood)" stroke="#6b4a32" stroke-width="1.5"/>
            <path d="M84 740 V372 Q84 346 120 346 Q156 346 156 372 V740 Z" fill="url(#gcGlass)" stroke="url(#gcBrass)" stroke-width="2"/>
            <!-- weights -->
            <line x1="98" y1="330" x2="98" y2="470" stroke="#b08a55" stroke-width="1"/>
            <line x1="142" y1="330" x2="142" y2="500" stroke="#b08a55" stroke-width="1"/>
            <rect x="92" y="470" width="12" height="54" rx="2" fill="url(#gcBrass)"/>
            <rect x="136" y="500" width="12" height="54" rx="2" fill="url(#gcBrass)"/>
            <!-- pendulum: still -->
            <g class="pend">
                <line x1="120" y1="330" x2="120" y2="656" stroke="url(#gcBrass)" stroke-width="2.5"/>
                <circle cx="120" cy="680" r="25" fill="url(#gcBrass)" stroke="#e2c48c" stroke-width="1.5"/>
                <circle cx="120" cy="680" r="16" fill="none" stroke="rgba(60,40,20,.45)" stroke-width="1"/>
                <circle cx="113" cy="672" r="6" fill="rgba(255,235,200,.45)"/>
            </g>
            <line x1="92" y1="380" x2="92" y2="720" stroke="rgba(255,240,215,.08)" stroke-width="3"/>
            <!-- base -->
            <rect x="46" y="778" width="148" height="10" fill="#2a1911" stroke="#8a6444" stroke-width="1"/>
            <rect x="40" y="788" width="160" height="176" fill="url(#gcWoodDark)" stroke="#6b4a32" stroke-width="1.5"/>
            <rect x="58" y="808" width="124" height="136" fill="none" stroke="#6b4a32" stroke-width="1.2"/>
            <rect x="92" y="862" width="56" height="18" rx="2" fill="url(#gcBrass)"/>
            <text x="120" y="872" fill="#2a1a10" font-family="JetBrains Mono,monospace" font-size="9" text-anchor="middle" dominant-baseline="central">00:14</text>
            <rect x="30" y="964" width="180" height="16" fill="url(#gcWood)" stroke="#8a6444" stroke-width="1"/>
            <rect x="36" y="980" width="22" height="20" fill="#1e120c"/><rect x="182" y="980" width="22" height="20" fill="#1e120c"/>
            <!-- lightning highlight -->
            <rect id="gcFlash" class="fl" x="30" y="90" width="180" height="910" fill="#b9c6d2" opacity="0"/>
        </svg>

        <div class="flash" id="flash"></div>
        <div class="vignette"></div>
        <div class="grain"></div>
        <div id="dust"></div>
    </div>
</div>
`;

// ============================================================
// CHAPTER 2: Номер четырнадцать
// ============================================================
export const MANOR_CH2_HTML = `
<style>
.mn-ch2 *{margin:0;padding:0;box-sizing:border-box}
.mn-ch2,.mn-ch2{height:100%}
.mn-ch2{background:#0d0907;color:#e8dfd4;font-family:'Inter',sans-serif;overflow-x:hidden;min-height:100vh}
.mn-ch2 .bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.mn-ch2 .bg-base{position:absolute;inset:0;
            background:
                radial-gradient(120% 90% at 78% 20%, #1a1512 0%, transparent 60%),
                radial-gradient(90% 70% at 10% 110%, #2a140b 0%, transparent 55%),
                linear-gradient(180deg,#120d0b 0%,#0e0a08 55%,#0a0706 100%)}
.mn-ch2 .bg-wall{position:absolute;inset:0;opacity:.35;
            background:repeating-linear-gradient(90deg,rgba(255,235,210,.012) 0 2px,transparent 2px 64px),
                       repeating-linear-gradient(90deg,rgba(0,0,0,.25) 0 32px,transparent 32px 64px)}
.mn-ch2 .bg-window{position:absolute;right:6vw;top:10vh;width:min(360px,30vw);height:auto;opacity:.5;
            filter:blur(.4px);transition:opacity .15s}
.mn-ch2 .bg-window.flash{opacity:.95}
.mn-ch2 #skyflash{opacity:0;transition:opacity .08s}
.mn-ch2 .bg-window.flash #skyflash{opacity:.45}
.mn-ch2 .bg-moonlight{position:absolute;right:0;top:0;width:70vw;height:100vh;
            background:linear-gradient(200deg,rgba(150,170,190,.06) 0%,transparent 45%);
            clip-path:polygon(70% 8%,100% 8%,60% 100%,10% 100%)}
.mn-ch2 .bg-painting{position:absolute;right:calc(6vw + min(360px,30vw) + 60px);top:15vh;width:300px;opacity:.5}
.mn-ch2 .bg-painting .frame{border:12px solid #5e432a;outline:2px solid #8a6a45;outline-offset:-6px;box-shadow:0 0 0 2px #2a1c12,0 20px 40px rgba(0,0,0,.5);line-height:0}
.mn-ch2 .bg-painting svg{width:100%;height:auto;display:block}
.mn-ch2 .bg-painting .plate{margin:14px auto 0;width:max-content;padding:6px 16px;border:1px solid #8a6a45;border-radius:2px;background:#2a1d13;
            font-family:'JetBrains Mono',monospace;font-weight:700;font-size:28px;color:#d9b384;letter-spacing:.08em}
.mn-ch2 .bg-painting .note{position:absolute;left:-150px;top:20px;width:160px;transform:rotate(-8deg);line-height:0}
.mn-ch2 .bg-painting .note svg{width:100%;height:auto;display:block;overflow:visible}
.mn-ch2 .bg-painting .note text{font-family:'Caveat',cursive;font-weight:700}
.mn-ch2 .drip{transform-box:fill-box;transform-origin:50% 0;animation:drip 9s cubic-bezier(.3,.1,.4,1) infinite alternate}
.mn-ch2 .drip.d2{animation-duration:12s;animation-delay:-3s}
.mn-ch2 .drip.d3{animation-duration:10s;animation-delay:-6s}
.mn-ch2 .drip.d4{animation-duration:14s;animation-delay:-2s}
.mn-ch2 .drip.d5{animation-duration:11s;animation-delay:-8s}
@keyframes drip{0%{transform:scaleY(.55)}100%{transform:scaleY(1)}}
.mn-ch2 .bg-fire{position:absolute;left:-10vw;bottom:-20vh;width:70vw;height:70vh;
            background:radial-gradient(closest-side,rgba(200,85,40,.22),rgba(140,50,20,.08) 55%,transparent 100%);
            animation:flicker 3.2s infinite ease-in-out}
@keyframes flicker{0%,100%{opacity:.85;transform:scale(1)}20%{opacity:1}35%{opacity:.7;transform:scale(1.03)}55%{opacity:.95}75%{opacity:.75;transform:scale(.98)}}
.mn-ch2 #fx{position:absolute;inset:0;width:100%;height:100%}
.mn-ch2 .bg-vignette{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 40%,transparent 45%,rgba(0,0,0,.75) 100%)}
.mn-ch2 .bg-grain{position:absolute;inset:-50%;opacity:.07;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            animation:grain 1s steps(4) infinite}
@keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}}
.mn-ch2 .clues{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;margin-top:40px;max-height:0;overflow:hidden;opacity:0;transition:max-height .5s,opacity .4s}
.mn-ch2 .clues.open{max-height:800px;opacity:1}
@media (max-width:760px){.mn-ch2 .bg-window{opacity:.22;width:50vw;right:-8vw}
.mn-ch2 .bg-painting{display:none}}
</style>
<div class="mn-ch2">
<div class="bg" aria-hidden="true">
        <div class="bg-base"></div>
        <div class="bg-wall"></div>
        <div class="bg-moonlight"></div>
        <svg class="bg-window" id="win" viewBox="0 0 300 520">
            <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#2b333c"/><stop offset=".6" stop-color="#171b20"/><stop offset="1" stop-color="#0e1013"/>
                </linearGradient>
                <radialGradient id="moon"><stop offset="0" stop-color="#cfd6dc" stop-opacity=".55"/><stop offset="1" stop-color="#cfd6dc" stop-opacity="0"/></radialGradient>
                <clipPath id="glass"><path d="M30 520V150A120 120 0 0 1 270 150V520Z"/></clipPath>
            </defs>
            <g clip-path="url(#glass)">
                <rect width="300" height="520" fill="url(#sky)"/>
                <rect id="skyflash" width="300" height="520" fill="#c9d5e2"/>
                <circle cx="195" cy="120" r="70" fill="url(#moon)"/>
                <circle cx="195" cy="120" r="14" fill="#c7cdd2" opacity=".35"/>
                <!-- bare trees & raven-ish roofline -->
                <path d="M30 430 L80 400 L90 360 L100 400 L150 385 L190 410 L230 380 L270 400 L270 520 L30 520Z" fill="#07080a"/>
                <g stroke="#07080a" stroke-width="3" fill="none" stroke-linecap="round">
                    <path d="M60 520 C62 420 55 360 70 300 M68 340 C50 320 40 300 36 280 M70 310 C90 290 100 270 104 240 M66 380 C85 370 100 360 118 330"/>
                    <path d="M250 520 C246 430 252 380 240 320 M244 360 C262 340 268 320 272 300 M241 330 C222 310 214 290 212 262"/>
                </g>
                <g id="streaks" stroke="#9aa7b3" stroke-opacity=".25" stroke-width="1"></g>
            </g>
            <g fill="none" stroke="#2a1f18" stroke-width="10">
                <path d="M30 520V150A120 120 0 0 1 270 150V520Z"/>
            </g>
            <g stroke="#2a1f18" stroke-width="6">
                <line x1="150" y1="30" x2="150" y2="520"/>
                <line x1="30" y1="200" x2="270" y2="200"/>
                <line x1="30" y1="340" x2="270" y2="340"/>
            </g>
        </svg>
        <div class="bg-painting">
            <div class="frame">
                <svg viewBox="0 0 300 200">
                    <defs>
                        <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stop-color="#7d8b96"/><stop offset=".7" stop-color="#c9d0d3"/><stop offset="1" stop-color="#e3e6e4"/>
                        </linearGradient>
                        <linearGradient id="wice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stop-color="#a9b6bd"/><stop offset="1" stop-color="#8795a0"/>
                        </linearGradient>
                    </defs>
                    <rect width="300" height="200" fill="url(#wsky)"/>
                    <circle cx="228" cy="52" r="16" fill="#f1e6cf" opacity=".7"/>
                    <path d="M0 110 L40 82 L78 100 L120 70 L165 98 L210 76 L255 96 L300 80 L300 130 L0 130Z" fill="#b8c2c7"/>
                    <path d="M0 118 C50 104 100 112 150 106 C200 100 250 112 300 104 L300 140 L0 140Z" fill="#e8ecec"/>
                    <path d="M60 200 C90 160 150 140 190 138 C230 136 270 142 300 146 L300 162 C250 156 200 158 160 170 C120 182 100 192 96 200Z" fill="url(#wice)"/>
                    <path d="M0 140 C60 132 140 136 190 138 C150 142 100 160 60 200 L0 200Z" fill="#f2f4f2"/>
                    <path d="M96 200 C110 188 150 172 200 164 C240 158 275 160 300 162 L300 200Z" fill="#eef1f0"/>
                    <g fill="#2e3a36">
                        <path d="M30 150 L40 110 L50 150Z"/><path d="M34 132 L40 98 L46 132Z"/>
                        <path d="M58 158 L70 108 L82 158Z"/><path d="M63 136 L70 94 L77 136Z"/>
                        <path d="M235 170 L246 128 L257 170Z"/><path d="M239 150 L246 116 L253 150Z"/>
                        <path d="M262 176 L272 140 L282 176Z"/>
                    </g>
                    <g fill="#f4f6f5" opacity=".85">
                        <path d="M36 128 L40 112 L44 128Z"/><path d="M66 132 L70 110 L74 132Z"/><path d="M242 146 L246 130 L250 146Z"/>
                    </g>
                    <g>
                        <rect x="150" y="112" width="26" height="18" fill="#5b4636"/>
                        <path d="M146 113 L163 100 L180 113Z" fill="#f2f4f2"/>
                        <rect x="158" y="118" width="6" height="6" fill="#e6b865"/>
                        <rect x="171" y="101" width="3" height="8" fill="#3d2f25"/>
                    </g>
                    <g fill="#ffffff" opacity=".8">
                        <circle cx="20" cy="30" r="1.2"/><circle cx="90" cy="20" r="1"/><circle cx="130" cy="50" r="1.3"/><circle cx="180" cy="28" r="1"/>
                        <circle cx="270" cy="30" r="1.2"/><circle cx="110" cy="80" r="1"/><circle cx="200" cy="70" r="1.1"/><circle cx="50" cy="60" r="1"/>
                    </g>
                </svg>
            </div>
            <div class="plate">№ 14</div>
            <div class="note">
                <svg viewBox="0 0 160 220">
                    <defs>
                        <linearGradient id="blood" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stop-color="#a3130e"/>
                            <stop offset=".6" stop-color="#7e0b08"/>
                            <stop offset="1" stop-color="#4d0504"/>
                        </linearGradient>
                        <filter id="bloodrough" x="-20%" y="-20%" width="140%" height="140%">
                            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/>
                            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="d"/>
                            <feGaussianBlur in="d" stdDeviation=".35" result="b"/>
                            <feSpecularLighting in="b" surfaceScale="2" specularConstant=".5" specularExponent="18" lighting-color="#ff9a8a" result="s">
                                <feDistantLight azimuth="235" elevation="55"/>
                            </feSpecularLighting>
                            <feComposite in="s" in2="b" operator="in" result="sh"/>
                            <feMerge><feMergeNode in="b"/><feMergeNode in="sh"/></feMerge>
                        </filter>
                    </defs>
                    <g filter="url(#bloodrough)" fill="url(#blood)">
                        <text x="80" y="118" font-size="120" text-anchor="middle">?</text>
                        <text x="80" y="178" font-size="38" text-anchor="middle">копия?</text>
                        <!-- drips from "?" -->
                        <path class="drip" d="M80 108 C80.8 118 79.6 128 80.4 140 C78 141 77.6 145 80.2 147 C83 147 83.4 142 81.8 140 C82.4 128 83 118 84 108Z"/>
                        <path class="drip d2" d="M86 58 C86.5 66 85.8 72 86.3 80 C84.6 81 84.5 84 86.3 85 C88.2 85 88.4 81 87.4 80 C87.8 72 88.2 66 89 58Z"/>
                        <!-- drips from "копия?" -->
                        <path class="drip d3" d="M46 172 C46.6 182 45.8 190 46.3 200 C44.2 201 44 205 46.2 206 C48.6 206 48.8 201 47.6 200 C48 190 48.4 182 49.2 172Z"/>
                        <path class="drip d4" d="M73 174 C73.4 180 72.8 186 73.2 192 C71.6 193 71.5 196 73.2 197 C75 197 75.1 193 74.2 192 C74.5 186 74.8 180 75.4 174Z"/>
                        <path class="drip d5" d="M103 172 C103.6 184 102.8 196 103.4 212 C101 213 100.8 217 103.2 218 C105.8 218 106 213 104.6 212 C105 196 105.4 184 106.2 172Z"/>
                        <!-- splatter -->
                        <circle cx="122" cy="96" r="2.2"/><circle cx="128" cy="104" r="1.2"/><circle cx="36" cy="60" r="1.6"/><circle cx="130" cy="150" r="1.4"/>
                    </g>
                </svg>
            </div>
        </div>
        <div class="bg-fire"></div>
        <canvas id="fx"></canvas>

        <div class="bg-vignette"></div>
        <div class="bg-grain"></div>
    </div>
</div>
`;

// ============================================================
// CHAPTER 3: Свежий лак
// ============================================================
export const MANOR_CH3_HTML = `
<style>
.mn-ch3 *{box-sizing:border-box;margin:0;padding:0}
.mn-ch3{--accent:#c65a3a;--text:#ebe3d6;--muted:#8d847a;--line:rgba(198,90,58,.28)}
.mn-ch3,.mn-ch3{height:100%}
.mn-ch3{background:#0c0a09;color:var(--text);font-family:Inter,sans-serif;overflow-x:hidden;min-height:100vh}
.mn-ch3 .bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;
            background:
              repeating-linear-gradient(90deg,rgba(0,0,0,.35) 0 2px,rgba(255,255,255,.012) 2px 4px,transparent 4px 150px),
              linear-gradient(180deg,#130e0b 0%,#1a130f 55%,#0e0a08 100%)}
.mn-ch3 .room{position:absolute;right:0;bottom:0;width:min(1040px,82vw);height:auto;overflow:visible}
.mn-ch3 .uvhum{animation:hum 3.4s ease-in-out infinite}
.mn-ch3 .uvcone{mix-blend-mode:screen;animation:cone 5s ease-in-out infinite}
@keyframes hum{0%,100%{opacity:.8}50%{opacity:1}}
@keyframes cone{0%,100%{opacity:.85}47%{opacity:.85}49%{opacity:.6}51%{opacity:.9}}
.mn-ch3 .vignette{position:absolute;inset:0;background:
            linear-gradient(90deg,rgba(10,8,7,.94) 0%,rgba(10,8,7,.72) 38%,rgba(10,8,7,.15) 70%,transparent 100%),
            radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.65) 100%)}
.mn-ch3 .grain{position:absolute;inset:-50%;opacity:.07;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            animation:grain 1s steps(4) infinite}
@keyframes grain{25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}}
.mn-ch3 .view{animation:fade .5s ease}
@keyframes fade{from{opacity:0;transform:translateY(8px)}}
.mn-ch3 .kicker{font-size:11px;letter-spacing:.2em;color:var(--accent);text-transform:uppercase}
.mn-ch3 .scene{font-family:"JetBrains Mono",monospace;font-size:11.5px;color:var(--muted);display:flex;gap:8px;align-items:center}
.mn-ch3 .actions{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.mn-ch3 .btn{display:inline-flex;align-items:center;gap:12px;background:var(--accent);color:#fff4ec;border:none;border-radius:8px;padding:15px 24px;font:600 15px Inter,sans-serif;cursor:pointer;transition:.25s}
.mn-ch3 .btn:hover{background:#d4694a;transform:translateY(-1px)}
.mn-ch3 .btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.15);color:var(--text)}
.mn-ch3 .btn.ghost:hover{border-color:var(--accent)}
.mn-ch3 .hint{font-size:13px;color:var(--muted)}
.mn-ch3 .clues{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;margin:30px 0 34px}
.mn-ch3 .clue{position:relative;padding:22px;border-radius:10px;border:1px solid rgba(255,255,255,.08);background:rgba(18,15,13,.72);cursor:pointer;transition:.3s;min-height:150px}
.mn-ch3 .clue:hover{border-color:var(--line)}
.mn-ch3 .clue .ic{width:36px;height:36px;border-radius:8px;display:grid;place-items:center;background:rgba(198,90,58,.12);margin-bottom:14px}
.mn-ch3 .clue .lock{font-family:"JetBrains Mono",monospace;font-size:11px;color:#6b635b;display:flex;gap:8px;align-items:center}
.mn-ch3 .clue.open{border-color:var(--line)}
@media(max-width:640px){.mn-ch3 .room{width:150vw;right:-45%;opacity:.5}}
</style>
<div class="mn-ch3">
<div class="bg">
        <svg class="room" viewBox="0 0 800 600" preserveAspectRatio="xMaxYMax meet">
            <defs>
                <filter id="uvf"><feColorMatrix type="matrix" values="0.20 0.30 0.08 0 0.02  0.14 0.22 0.06 0 0.01  0.34 0.54 0.16 0 0.08  0 0 0 1 0"/></filter>
                <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
                <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
                <clipPath id="pc"><rect x="390" y="80" width="320" height="195"/></clipPath>
                <radialGradient id="wallGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stop-color="#8f7fe0" stop-opacity=".22"/>
                    <stop offset="1" stop-color="#8f7fe0" stop-opacity="0"/>
                </radialGradient>
                <radialGradient id="varnish" cx="45%" cy="40%" r="70%">
                    <stop offset="0" stop-color="#c9bbff" stop-opacity=".45"/>
                    <stop offset=".6" stop-color="#9d8cf0" stop-opacity=".18"/>
                    <stop offset="1" stop-color="#6a5bc0" stop-opacity=".05"/>
                </radialGradient>
                <linearGradient id="cone" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stop-color="#b9a9ff" stop-opacity=".42"/>
                    <stop offset=".5" stop-color="#9483ec" stop-opacity=".14"/>
                    <stop offset="1" stop-color="#7a6ad8" stop-opacity=".04"/>
                </linearGradient>
                <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#22160f"/>
                    <stop offset="1" stop-color="#0a0706"/>
                </linearGradient>
                <linearGradient id="btl" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="#1d0c05"/>
                    <stop offset=".35" stop-color="#5a2a10"/>
                    <stop offset=".6" stop-color="#3a1a09"/>
                    <stop offset="1" stop-color="#140803"/>
                </linearGradient>
            </defs>

            <!-- UV glow on wall -->
            <ellipse class="uvhum" cx="550" cy="175" rx="340" ry="230" fill="url(#wallGlow)"/>

            <!-- painting -->
            <path d="M440 58 L550 18 L660 58" fill="none" stroke="#2a1d15" stroke-width="1.5"/>
            <circle cx="550" cy="18" r="3" fill="#2a1d15"/>
            <rect x="366" y="56" width="368" height="243" rx="3" fill="#24160f"/>
            <rect x="376" y="66" width="348" height="223" fill="#3a2518"/>
            <rect x="386" y="76" width="328" height="203" fill="#0d0a0c"/>
            <g clip-path="url(#pc)">
                <g transform="translate(378 70) scale(1.1467 1.08)" filter="url(#uvf)">
                    <defs>
                        <linearGradient id="wsky3" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stop-color="#7d8b96"/><stop offset=".7" stop-color="#c9d0d3"/><stop offset="1" stop-color="#e3e6e4"/>
                        </linearGradient>
                        <linearGradient id="wice3" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stop-color="#a9b6bd"/><stop offset="1" stop-color="#8795a0"/>
                        </linearGradient>
                    </defs>
                    <rect width="300" height="200" fill="url(#wsky3)"/>
                    <circle cx="228" cy="52" r="16" fill="#f1e6cf" opacity=".7"/>
                    <path d="M0 110 L40 82 L78 100 L120 70 L165 98 L210 76 L255 96 L300 80 L300 130 L0 130Z" fill="#b8c2c7"/>
                    <path d="M0 118 C50 104 100 112 150 106 C200 100 250 112 300 104 L300 140 L0 140Z" fill="#e8ecec"/>
                    <path d="M60 200 C90 160 150 140 190 138 C230 136 270 142 300 146 L300 162 C250 156 200 158 160 170 C120 182 100 192 96 200Z" fill="url(#wice3)"/>
                    <path d="M0 140 C60 132 140 136 190 138 C150 142 100 160 60 200 L0 200Z" fill="#f2f4f2"/>
                    <path d="M96 200 C110 188 150 172 200 164 C240 158 275 160 300 162 L300 200Z" fill="#eef1f0"/>
                    <g fill="#2e3a36">
                        <path d="M30 150 L40 110 L50 150Z"/><path d="M34 132 L40 98 L46 132Z"/>
                        <path d="M58 158 L70 108 L82 158Z"/><path d="M63 136 L70 94 L77 136Z"/>
                        <path d="M235 170 L246 128 L257 170Z"/><path d="M239 150 L246 116 L253 150Z"/>
                        <path d="M262 176 L272 140 L282 176Z"/>
                    </g>
                    <g fill="#f4f6f5" opacity=".85">
                        <path d="M36 128 L40 112 L44 128Z"/><path d="M66 132 L70 110 L74 132Z"/><path d="M242 146 L246 130 L250 146Z"/>
                    </g>
                    <g>
                        <rect x="150" y="112" width="26" height="18" fill="#5b4636"/>
                        <path d="M146 113 L163 100 L180 113Z" fill="#f2f4f2"/>
                        <rect x="158" y="118" width="6" height="6" fill="#e6b865"/>
                        <rect x="171" y="101" width="3" height="8" fill="#3d2f25"/>
                    </g>
                    <g fill="#ffffff" opacity=".8">
                        <circle cx="20" cy="30" r="1.2"/><circle cx="90" cy="20" r="1"/><circle cx="130" cy="50" r="1.3"/><circle cx="180" cy="28" r="1"/>
                        <circle cx="270" cy="30" r="1.2"/><circle cx="110" cy="80" r="1"/><circle cx="200" cy="70" r="1.1"/><circle cx="50" cy="60" r="1"/>
                    </g>
                </g>
                <rect class="uvhum" x="390" y="80" width="320" height="195" fill="url(#varnish)" style="mix-blend-mode:screen"/>
            </g>
            <rect x="366" y="56" width="368" height="243" rx="3" fill="none" stroke="#b3a3ff" stroke-opacity=".12"/>

            <!-- UV light cone -->
            <polygon class="uvcone" points="292,293 385,52 745,110 745,305 311,320" fill="url(#cone)"/>

            <!-- desk -->
            <rect x="-2400" y="448" width="5600" height="220" fill="url(#wood)"/>
            <rect x="-2400" y="448" width="5600" height="5" fill="#2e1e14"/>
            <rect x="-2400" y="470" width="5600" height="1" fill="#000" opacity=".5"/>
            <ellipse class="uvhum" cx="330" cy="452" rx="190" ry="9" fill="#a898ff" opacity=".18" filter="url(#blur2)"/>

            <!-- lamp -->
            <ellipse cx="230" cy="449" rx="44" ry="6" fill="#080606"/>
            <path d="M196 448 Q198 436 230 434 Q262 436 264 448 Z" fill="#1a1512"/>
            <path d="M230 436 L204 372" stroke="#1f1a17" stroke-width="5" stroke-linecap="round"/>
            <path d="M204 372 L280 322" stroke="#1f1a17" stroke-width="5" stroke-linecap="round"/>
            <circle cx="204" cy="372" r="6" fill="#2a2420"/>
            <circle cx="230" cy="436" r="5" fill="#2a2420"/>
            <g transform="translate(285 318) rotate(-35)">
                <path d="M-12 -8 L20 -16 L20 16 L-12 8 Z" fill="#1c1714" stroke="#3a322c" stroke-width="1"/>
                <circle cx="-12" cy="0" r="5" fill="#2a2420"/>
            </g>
            <line x1="292" y1="293" x2="311" y2="320" stroke="#c9bcff" stroke-width="8" opacity=".6" filter="url(#blur6)" class="uvhum"/>
            <line x1="292" y1="293" x2="311" y2="320" stroke="#e2dbff" stroke-width="2.5" stroke-linecap="round"/>

            <!-- cognac bottle -->
            <path d="M520 450 L520 386 Q520 362 534 354 L536 320 L546 320 L548 354 Q562 362 562 386 L562 450 Z" fill="url(#btl)"/>
            <rect x="534" y="306" width="14" height="15" rx="2" fill="#3b2a1d"/>
            <rect x="533" y="318" width="16" height="4" fill="#6b4a2a"/>
            <rect x="526" y="396" width="30" height="28" rx="1" fill="#1a1410" stroke="#c9a978" stroke-opacity=".3"/>
            <line x1="531" y1="405" x2="551" y2="405" stroke="#c9a978" stroke-opacity=".35"/>
            <line x1="533" y1="412" x2="549" y2="412" stroke="#c9a978" stroke-opacity=".2"/>
            <path d="M524 382 Q524 368 533 360" fill="none" stroke="#b9a9ff" stroke-opacity=".45" stroke-width="1.5"/>
            <line x1="524" y1="388" x2="524" y2="444" stroke="#b9a9ff" stroke-opacity=".3" stroke-width="1.5"/>

            <!-- rocks glass -->
            <path d="M592 437 L626 437 L624.5 448 L593.5 448 Z" fill="#7a3d16" opacity=".85"/>
            <ellipse cx="609" cy="437" rx="17" ry="2" fill="#a2561f" opacity=".7"/>
            <path d="M589 416 L629 416 L626 450 L592 450 Z" fill="#d8d0f0" fill-opacity=".06" stroke="#d4caff" stroke-opacity=".38" stroke-width="1.2"/>
            <rect x="592" y="446" width="34" height="4" fill="#d4caff" opacity=".12"/>
            <ellipse cx="609" cy="416" rx="20" ry="2.8" fill="none" stroke="#d4caff" stroke-opacity=".45" stroke-width="1.2"/>
            <line x1="593" y1="420" x2="595" y2="444" stroke="#e2dbff" stroke-opacity=".35"/>
        </svg>
        <div class="vignette"></div>
        <div class="grain"></div>
    </div>
</div>
`;