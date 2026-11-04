// ============================================================
// INTRO: Полночь у Вороновых (начало)
// ============================================================
export const MANOR_INTRO_HTML = `
<style>
  .bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:radial-gradient(120% 90% at 70% 30%,#1a1412 0%,#110d0c 45%,#0a0808 100%)}
  .scene{position:absolute;inset:0;width:100%;height:100%;-webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.35) 30%,#000 60%);mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.35) 30%,#000 60%);opacity:.9}
  .lamp{position:absolute;left:-10vw;bottom:-20vh;width:70vw;height:80vh;background:radial-gradient(closest-side,rgba(196,110,60,.16),rgba(196,110,60,.05) 55%,transparent);animation:flicker 5s infinite ease-in-out}
  @keyframes flicker{0%,100%{opacity:1}42%{opacity:.85}45%{opacity:.95}70%{opacity:.8}}
  #winrain line{animation:winrain linear infinite}
  @keyframes winrain{from{transform:translate(0,0)}to{transform:translate(-8px,470px)}}
  .flash{position:absolute;inset:0;background:radial-gradient(60% 70% at 72% 35%,rgba(170,185,200,.18),transparent 70%);opacity:0}
  .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 40%,rgba(0,0,0,.75) 100%)}
  .grain{position:absolute;inset:-50%;width:200%;height:200%;opacity:.07;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");animation:grain 1s steps(6) infinite}
  @keyframes grain{0%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}100%{transform:translate(0,0)}}
    .gclock{position:absolute;bottom:0;left:5vw;height:min(88vh,920px);aspect-ratio:240/1000;pointer-events:none}
  .gclock .pend{transform-origin:120px 330px}
  .dust{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(230,180,130,.5);animation:float linear infinite}
  @keyframes float{from{transform:translate(0,0);opacity:0}15%{opacity:.8}85%{opacity:.6}to{transform:translate(40px,-220px);opacity:0}}
</style>
<div class="bg">
  <svg class="scene" viewBox="0 0 1000 800" preserveAspectRatio="xMaxYMax slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2328"/><stop offset="1" stop-color="#0c0f12"/>
      </linearGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#140f0d"/><stop offset="1" stop-color="#070505"/>
      </linearGradient>
      <clipPath id="winclip"><path d="M430 560 V230 Q430 130 525 130 Q620 130 620 230 V560 Z"/></clipPath>
    </defs>
    <g stroke="#1d1715" stroke-width="2" fill="none">
      <rect x="30" y="600" width="220" height="130"/><rect x="270" y="600" width="140" height="130"/>
    </g>
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
    <path d="M405 110 Q420 330 398 590 L440 590 Q455 330 440 110 Z" fill="#1f1210"/>
    <path d="M645 110 Q630 330 652 590 L610 590 Q595 330 610 110 Z" fill="#1f1210"/>
    <rect x="390" y="100" width="270" height="10" rx="4" fill="#120d0b"/>
    <rect x="670" y="60" width="330" height="700" fill="#120d0b"/>
    <g id="books"></g>
    <rect x="0" y="730" width="1000" height="70" fill="url(#floor)"/>
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
  <div class="flash" id="flash"></div><div class="vignette"></div><div class="grain"></div><div id="dust"></div>
</div>
`;
// ============================================================
// CHAPTER 1: Часы остановились
// ============================================================
export const MANOR_CH1_HTML = `
<style>
  .bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:radial-gradient(120% 90% at 70% 30%,#1a1412 0%,#110d0c 45%,#0a0808 100%)}
  .scene{position:absolute;inset:0;width:100%;height:100%;-webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.35) 30%,#000 60%);mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,.35) 30%,#000 60%);opacity:.9}
  .lamp{position:absolute;left:-10vw;bottom:-20vh;width:70vw;height:80vh;background:radial-gradient(closest-side,rgba(196,110,60,.16),rgba(196,110,60,.05) 55%,transparent);animation:flicker 5s infinite ease-in-out}
  @keyframes flicker{0%,100%{opacity:1}42%{opacity:.85}45%{opacity:.95}70%{opacity:.8}}
  #winrain line{animation:winrain linear infinite}
  @keyframes winrain{from{transform:translate(0,0)}to{transform:translate(-8px,470px)}}
  .flash{position:absolute;inset:0;background:radial-gradient(60% 70% at 72% 35%,rgba(170,185,200,.18),transparent 70%);opacity:0}
  .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 40%,rgba(0,0,0,.75) 100%)}
  .grain{position:absolute;inset:-50%;width:200%;height:200%;opacity:.07;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");animation:grain 1s steps(6) infinite}
  @keyframes grain{0%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}100%{transform:translate(0,0)}}
  .gclock{position:absolute;bottom:0;left:2vw;height:min(88vh,920px);aspect-ratio:240/1000;pointer-events:none}
  .gclock .pend{transform-origin:120px 330px}
  .dust{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(230,180,130,.5);animation:float linear infinite}
  @keyframes float{from{transform:translate(0,0);opacity:0}15%{opacity:.8}85%{opacity:.6}to{transform:translate(40px,-220px);opacity:0}}
</style>
<div class="bg">
  <svg class="scene" viewBox="0 0 1000 800" preserveAspectRatio="xMaxYMax slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2328"/><stop offset="1" stop-color="#0c0f12"/>
      </linearGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#140f0d"/><stop offset="1" stop-color="#070505"/>
      </linearGradient>
      <clipPath id="winclip"><path d="M280 560 V230 Q280 130 375 130 Q470 130 470 230 V560 Z"/></clipPath>
    </defs>

    <!-- Окно -->
    <path d="M280 560 V230 Q280 130 375 130 Q470 130 470 230 V560 Z" fill="url(#sky)"/>
    <g clip-path="url(#winclip)">
      <circle cx="430" cy="200" r="60" fill="rgba(160,175,185,.06)"/>
      <path d="M280 520 L320 470 L355 500 L395 440 L435 490 L470 460 V560 H280Z" fill="#0a0c0e"/>
      <rect id="winflash" x="280" y="130" width="190" height="430" fill="#b9c6d2" opacity="0"/>
      <g id="winrain" stroke="rgba(170,185,195,.25)" stroke-width="1"></g>
    </g>
    <g stroke="#0e0b0a" stroke-width="7" fill="none">
      <path d="M280 560 V230 Q280 130 375 130 Q470 130 470 230 V560 Z"/>
      <line x1="375" y1="130" x2="375" y2="560"/>
      <line x1="280" y1="300" x2="470" y2="300"/><line x1="280" y1="430" x2="470" y2="430"/>
    </g>
    <rect x="268" y="556" width="214" height="12" fill="#0e0b0a"/>

    <!-- Шторы -->
    <path d="M255 110 Q270 330 248 590 L290 590 Q305 330 290 110 Z" fill="#1f1210"/>
    <path d="M495 110 Q480 330 502 590 L460 590 Q445 330 460 110 Z" fill="#1f1210"/>
    <rect x="240" y="100" width="270" height="10" rx="4" fill="#120d0b"/>

    <!-- КНИЖНЫЕ ПОЛКИ (СВЕТЛЫЕ, С РАЗНОЦВЕТНЫМИ КНИГАМИ) -->
    <rect x="520" y="60" width="400" height="700" fill="#2b1d14"/>
    
    <!-- Полка 1 -->
    <rect x="530" y="80" width="16" height="60" fill="#5c2e2a"/><rect x="548" y="85" width="12" height="55" fill="#3a4a3a"/><rect x="562" y="75" width="14" height="65" fill="#4a3a2a"/><rect x="578" y="82" width="14" height="58" fill="#5c2e2a"/>
    <rect x="594" y="78" width="12" height="62" fill="#3a4a3a"/><rect x="608" y="86" width="16" height="54" fill="#4a3a2a"/><rect x="626" y="80" width="12" height="60" fill="#5c2e2a"/><rect x="640" y="84" width="14" height="56" fill="#3a4a3a"/>
    <rect x="656" y="76" width="16" height="64" fill="#4a3a2a"/><rect x="674" y="88" width="12" height="52" fill="#5c2e2a"/><rect x="688" y="78" width="14" height="62" fill="#3a4a3a"/><rect x="704" y="82" width="12" height="58" fill="#4a3a2a"/>
    <rect x="718" y="80" width="16" height="60" fill="#5c2e2a"/><rect x="736" y="86" width="12" height="54" fill="#3a4a3a"/><rect x="750" y="76" width="14" height="64" fill="#4a3a2a"/><rect x="766" y="84" width="14" height="56" fill="#5c2e2a"/>
    <rect x="782" y="78" width="12" height="62" fill="#3a4a3a"/><rect x="796" y="82" width="16" height="58" fill="#4a3a2a"/><rect x="814" y="86" width="12" height="54" fill="#5c2e2a"/><rect x="828" y="80" width="14" height="60" fill="#3a4a3a"/>
    <rect x="844" y="88" width="16" height="52" fill="#4a3a2a"/><rect x="862" y="76" width="12" height="64" fill="#5c2e2a"/><rect x="876" y="82" width="14" height="58" fill="#3a4a3a"/><rect x="892" y="86" width="12" height="54" fill="#4a3a2a"/>
    <rect x="510" y="140" width="420" height="6" fill="#4a3424"/>

    <!-- Полка 2 -->
    <rect x="530" y="170" width="14" height="70" fill="#4a3a2a"/><rect x="546" y="175" width="16" height="65" fill="#5c2e2a"/><rect x="564" y="165" width="12" height="75" fill="#3a4a3a"/><rect x="578" y="172" width="14" height="68" fill="#4a3a2a"/>
    <rect x="594" y="168" width="16" height="72" fill="#5c2e2a"/><rect x="612" y="176" width="12" height="64" fill="#3a4a3a"/><rect x="626" y="170" width="14" height="70" fill="#4a3a2a"/><rect x="642" y="174" width="14" height="66" fill="#5c2e2a"/>
    <rect x="658" y="166" width="16" height="74" fill="#3a4a3a"/><rect x="676" y="178" width="12" height="62" fill="#4a3a2a"/><rect x="690" y="168" width="14" height="72" fill="#5c2e2a"/><rect x="706" y="172" width="14" height="68" fill="#3a4a3a"/>
    <rect x="722" y="170" width="12" height="70" fill="#4a3a2a"/><rect x="736" y="176" width="16" height="64" fill="#5c2e2a"/><rect x="754" y="166" width="14" height="74" fill="#3a4a3a"/><rect x="770" y="174" width="12" height="66" fill="#4a3a2a"/>
    <rect x="784" y="168" width="16" height="72" fill="#5c2e2a"/><rect x="802" y="172" width="14" height="68" fill="#3a4a3a"/><rect x="818" y="176" width="12" height="64" fill="#4a3a2a"/><rect x="832" y="170" width="16" height="70" fill="#5c2e2a"/>
    <rect x="850" y="178" width="14" height="62" fill="#3a4a3a"/><rect x="866" y="166" width="12" height="74" fill="#4a3a2a"/><rect x="880" y="172" width="16" height="68" fill="#5c2e2a"/><rect x="898" y="174" width="14" height="66" fill="#3a4a2a"/>
    <rect x="510" y="240" width="420" height="6" fill="#4a3424"/>

    <!-- Полка 3 -->
    <rect x="530" y="270" width="16" height="60" fill="#3a4a3a"/><rect x="548" y="275" width="12" height="55" fill="#5c2e2a"/><rect x="562" y="265" width="14" height="65" fill="#4a3a2a"/><rect x="578" y="272" width="14" height="58" fill="#3a4a3a"/>
    <rect x="594" y="268" width="12" height="62" fill="#5c2e2a"/><rect x="608" y="276" width="16" height="54" fill="#4a3a2a"/><rect x="626" y="270" width="12" height="60" fill="#3a4a3a"/><rect x="640" y="274" width="14" height="56" fill="#5c2e2a"/>
    <rect x="656" y="266" width="16" height="64" fill="#4a3a2a"/><rect x="674" y="278" width="12" height="52" fill="#3a4a3a"/><rect x="688" y="268" width="14" height="62" fill="#5c2e2a"/><rect x="704" y="272" width="12" height="58" fill="#4a3a2a"/>
    <rect x="718" y="270" width="16" height="60" fill="#3a4a3a"/><rect x="736" y="276" width="12" height="54" fill="#5c2e2a"/><rect x="750" y="266" width="14" height="64" fill="#4a3a2a"/><rect x="766" y="274" width="14" height="56" fill="#3a4a3a"/>
    <rect x="782" y="268" width="12" height="62" fill="#5c2e2a"/><rect x="796" y="272" width="16" height="58" fill="#4a3a2a"/><rect x="814" y="276" width="12" height="54" fill="#3a4a3a"/><rect x="828" y="270" width="14" height="60" fill="#5c2e2a"/>
    <rect x="844" y="278" width="16" height="52" fill="#4a3a2a"/><rect x="862" y="266" width="12" height="64" fill="#3a4a3a"/><rect x="876" y="272" width="14" height="58" fill="#5c2e2a"/><rect x="892" y="276" width="12" height="54" fill="#4a3a2a"/>
    <rect x="510" y="340" width="420" height="6" fill="#4a3424"/>

    <!-- Полка 4 -->
    <rect x="530" y="370" width="14" height="70" fill="#5c2e2a"/><rect x="546" y="375" width="16" height="65" fill="#3a4a3a"/><rect x="564" y="365" width="12" height="75" fill="#4a3a2a"/><rect x="578" y="372" width="14" height="68" fill="#5c2e2a"/>
    <rect x="594" y="368" width="16" height="72" fill="#3a4a3a"/><rect x="612" y="376" width="12" height="64" fill="#4a3a2a"/><rect x="626" y="370" width="14" height="70" fill="#5c2e2a"/><rect x="642" y="374" width="14" height="66" fill="#3a4a3a"/>
    <rect x="658" y="366" width="16" height="74" fill="#4a3a2a"/><rect x="676" y="378" width="12" height="62" fill="#5c2e2a"/><rect x="690" y="368" width="14" height="72" fill="#3a4a3a"/><rect x="706" y="372" width="14" height="68" fill="#4a3a2a"/>
    <rect x="722" y="370" width="12" height="70" fill="#5c2e2a"/><rect x="736" y="376" width="16" height="64" fill="#3a4a3a"/><rect x="754" y="366" width="14" height="74" fill="#4a3a2a"/><rect x="770" y="374" width="12" height="66" fill="#5c2e2a"/>
    <rect x="784" y="368" width="16" height="72" fill="#3a4a3a"/><rect x="802" y="372" width="14" height="68" fill="#4a3a2a"/><rect x="818" y="376" width="12" height="64" fill="#5c2e2a"/><rect x="832" y="370" width="16" height="70" fill="#3a4a3a"/>
    <rect x="850" y="378" width="14" height="62" fill="#4a3a2a"/><rect x="866" y="366" width="12" height="74" fill="#5c2e2a"/><rect x="880" y="372" width="16" height="68" fill="#3a4a3a"/><rect x="898" y="374" width="14" height="66" fill="#4a3a2a"/>
    <rect x="510" y="450" width="420" height="6" fill="#4a3424"/>

    <!-- Полка 5 -->
    <rect x="530" y="480" width="16" height="60" fill="#4a3a2a"/><rect x="548" y="485" width="12" height="55" fill="#5c2e2a"/><rect x="562" y="475" width="14" height="65" fill="#3a4a3a"/><rect x="578" y="482" width="14" height="58" fill="#4a3a2a"/>
    <rect x="594" y="478" width="12" height="62" fill="#5c2e2a"/><rect x="608" y="486" width="16" height="54" fill="#3a4a3a"/><rect x="626" y="480" width="12" height="60" fill="#4a3a2a"/><rect x="640" y="484" width="14" height="56" fill="#5c2e2a"/>
    <rect x="656" y="476" width="16" height="64" fill="#3a4a3a"/><rect x="674" y="488" width="12" height="52" fill="#4a3a2a"/><rect x="688" y="478" width="14" height="62" fill="#5c2e2a"/><rect x="704" y="482" width="12" height="58" fill="#3a4a3a"/>
    <rect x="718" y="480" width="16" height="60" fill="#4a3a2a"/><rect x="736" y="486" width="12" height="54" fill="#5c2e2a"/><rect x="750" y="476" width="14" height="64" fill="#3a4a3a"/><rect x="766" y="484" width="14" height="56" fill="#4a3a2a"/>
    <rect x="782" y="478" width="12" height="62" fill="#5c2e2a"/><rect x="796" y="482" width="16" height="58" fill="#3a4a3a"/><rect x="814" y="486" width="12" height="54" fill="#4a3a2a"/><rect x="828" y="480" width="14" height="60" fill="#5c2e2a"/>
    <rect x="844" y="488" width="16" height="52" fill="#3a4a3a"/><rect x="862" y="476" width="12" height="64" fill="#4a3a2a"/><rect x="876" y="482" width="14" height="58" fill="#5c2e2a"/><rect x="892" y="486" width="12" height="54" fill="#3a4a3a"/>
    <rect x="510" y="540" width="420" height="6" fill="#4a3424"/>

    <!-- Пол и кресло -->
    <rect x="0" y="730" width="1000" height="70" fill="url(#floor)"/>
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
  
  <!-- Напольные часы (00:14) -->
  <svg class="gclock" viewBox="0 0 240 1000" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
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
    <path d="M34 168 Q120 70 206 168 V182 H34Z" fill="url(#gcWood)" stroke="#8a6444" stroke-width="1.5"/>
    <path d="M52 166 Q120 94 188 166" fill="none" stroke="#2a1911" stroke-width="2"/>
    <circle cx="120" cy="96" r="7" fill="url(#gcBrass)"/>
    <rect x="117" y="100" width="6" height="12" fill="#8a6444"/>
    <circle cx="40" cy="158" r="5" fill="url(#gcBrass)"/>
    <circle cx="200" cy="158" r="5" fill="url(#gcBrass)"/>
    <rect x="30" y="180" width="180" height="8" fill="#2a1911"/>
    <rect x="42" y="188" width="156" height="128" fill="url(#gcWood)" stroke="#8a6444" stroke-width="1.5"/>
    <rect x="48" y="192" width="8" height="120" fill="#2a1911"/><rect x="184" y="192" width="8" height="120" fill="#2a1911"/>
    <circle cx="120" cy="252" r="62" fill="url(#gcBrass)"/>
    <circle cx="120" cy="252" r="57" fill="url(#gcFace)"/>
    <path d="M120 264 L115.5 252 L120 218 L124.5 252 Z" fill="#1a100b" transform="rotate(7 120 252)"/>
    <path d="M120 268 L117.5 252 L120 199 L122.5 252 Z" fill="#1a100b" transform="rotate(84 120 252)"/>
    <line x1="120" y1="262" x2="120" y2="203" stroke="#c85a3a" stroke-width="1" transform="rotate(252 120 252)"/>
    <circle cx="120" cy="252" r="3.5" fill="#c85a3a"/>
    <circle cx="120" cy="252" r="1.3" fill="#1a100b"/>
    <path d="M82 222 Q100 204 124 200" fill="none" stroke="rgba(255,240,215,.28)" stroke-width="3" stroke-linecap="round"/>
    <rect x="36" y="316" width="168" height="10" fill="#2a1911" stroke="#8a6444" stroke-width="1"/>
    <rect x="62" y="326" width="116" height="452" fill="url(#gcWood)" stroke="#6b4a32" stroke-width="1.5"/>
    <path d="M84 740 V372 Q84 346 120 346 Q156 346 156 372 V740 Z" fill="url(#gcGlass)" stroke="url(#gcBrass)" stroke-width="2"/>
    <line x1="98" y1="330" x2="98" y2="470" stroke="#b08a55" stroke-width="1"/>
    <line x1="142" y1="330" x2="142" y2="500" stroke="#b08a55" stroke-width="1"/>
    <rect x="92" y="470" width="12" height="54" rx="2" fill="url(#gcBrass)"/>
    <rect x="136" y="500" width="12" height="54" rx="2" fill="url(#gcBrass)"/>
    <g class="pend">
      <line x1="120" y1="330" x2="120" y2="656" stroke="url(#gcBrass)" stroke-width="2.5"/>
      <circle cx="120" cy="680" r="25" fill="url(#gcBrass)" stroke="#e2c48c" stroke-width="1.5"/>
      <circle cx="120" cy="680" r="16" fill="none" stroke="rgba(60,40,20,.45)" stroke-width="1"/>
      <circle cx="113" cy="672" r="6" fill="rgba(255,235,200,.45)"/>
    </g>
    <rect x="46" y="778" width="148" height="10" fill="#2a1911" stroke="#8a6444" stroke-width="1"/>
    <rect x="40" y="788" width="160" height="176" fill="url(#gcWoodDark)" stroke="#6b4a32" stroke-width="1.5"/>
    <rect x="58" y="808" width="124" height="136" fill="none" stroke="#6b4a32" stroke-width="1.2"/>
    <rect x="92" y="862" width="56" height="18" rx="2" fill="url(#gcBrass)"/>
    <text x="120" y="872" fill="#2a1a10" font-family="JetBrains Mono,monospace" font-size="9" text-anchor="middle" dominant-baseline="central">00:14</text>
    <rect x="30" y="964" width="180" height="16" fill="url(#gcWood)" stroke="#8a6444" stroke-width="1"/>
    <rect x="36" y="980" width="22" height="20" fill="#1e120c"/><rect x="182" y="980" width="22" height="20" fill="#1e120c"/>
  </svg>
  <div class="flash" id="flash"></div>
  <div class="vignette"></div>
  <div class="grain"></div>
  <div id="dust"></div>
</div>
`;

// ============================================================
// CHAPTER 2: Номер четырнадцать
// ============================================================
export const MANOR_CH2_HTML = `
<style>
  .bg{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:radial-gradient(120% 90% at 70% 30%,#1a1412 0%,#110d0c 45%,#0a0808 100%)}
  .bg-window{position:absolute;right:6vw;top:10vh;width:min(360px,30vw);height:auto;opacity:.5;filter:blur(.4px)}
  .bg-moonlight{position:absolute;right:0;top:0;width:70vw;height:100vh;background:linear-gradient(200deg,rgba(150,170,190,.06) 0%,transparent 45%);clip-path:polygon(70% 8%,100% 8%,60% 100%,10% 100%)}
  .bg-painting{position:absolute;right:calc(6vw + min(360px,30vw) + 60px);top:15vh;width:300px;opacity:.5}
  .bg-painting .frame{border:12px solid #5e432a;outline:2px solid #8a6a45;outline-offset:-6px;box-shadow:0 0 0 2px #2a1c12,0 20px 40px rgba(0,0,0,.5);line-height:0}
  .bg-painting svg{width:100%;height:auto;display:block}
  .bg-painting .plate{margin:14px auto 0;width:max-content;padding:6px 16px;border:1px solid #8a6a45;border-radius:2px;background:#2a1d13;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:28px;color:#d9b384;letter-spacing:.08em}
  .bg-painting .note{position:absolute;left:-150px;top:20px;width:160px;transform:rotate(-8deg);line-height:0}
  .bg-painting .note svg{width:100%;height:auto;display:block;overflow:visible}
  .bg-painting .note text{font-family:'Caveat',cursive;font-weight:700}
  .bg-fire{position:absolute;left:-10vw;bottom:-20vh;width:70vw;height:70vh;background:radial-gradient(closest-side,rgba(200,85,40,.22),rgba(140,50,20,.08) 55%,transparent 100%);animation:flicker 3.2s infinite ease-in-out}
  @keyframes flicker{0%,100%{opacity:.85;transform:scale(1)}20%{opacity:1}35%{opacity:.7;transform:scale(1.03)}55%{opacity:.95}75%{opacity:.75;transform:scale(.98)}}
  .bg-vignette{position:absolute;inset:0;background:radial-gradient(120% 100% at 50% 40%,transparent 45%,rgba(0,0,0,.75) 100%)}
  .bg-grain{position:absolute;inset:-50%;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:grain 1s steps(4) infinite}
  @keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}}
</style>
<div class="bg" aria-hidden="true">
  <div class="bg-window">
    <svg viewBox="0 0 300 520">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b333c"/><stop offset=".6" stop-color="#171b20"/><stop offset="1" stop-color="#0e1013"/></linearGradient>
        <radialGradient id="moon"><stop offset="0" stop-color="#cfd6dc" stop-opacity=".55"/><stop offset="1" stop-color="#cfd6dc" stop-opacity="0"/></radialGradient>
        <clipPath id="glass"><path d="M30 520V150A120 120 0 0 1 270 150V520Z"/></clipPath>
      </defs>
      <g clip-path="url(#glass)">
        <rect width="300" height="520" fill="url(#sky)"/>
        <circle cx="195" cy="120" r="70" fill="url(#moon)"/>
        <circle cx="195" cy="120" r="14" fill="#c7cdd2" opacity=".35"/>
        <path d="M30 430 L80 400 L90 360 L100 400 L150 385 L190 410 L230 380 L270 400 L270 520 L30 520Z" fill="#07080a"/>
        <g stroke="#07080a" stroke-width="3" fill="none" stroke-linecap="round">
          <path d="M60 520 C62 420 55 360 70 300 M68 340 C50 320 40 300 36 280 M70 310 C90 290 100 270 104 240 M66 380 C85 370 100 360 118 330"/>
          <path d="M250 520 C246 430 252 380 240 320 M244 360 C262 340 268 320 272 300 M241 330 C222 310 214 290 212 262"/>
        </g>
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
  </div>
  <div class="bg-moonlight"></div>
  <div class="bg-painting">
    <div class="frame">
      <svg viewBox="0 0 300 200">
        <defs>
          <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d8b96"/><stop offset=".7" stop-color="#c9d0d3"/><stop offset="1" stop-color="#e3e6e4"/></linearGradient>
          <linearGradient id="wice" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9b6bd"/><stop offset="1" stop-color="#8795a0"/></linearGradient>
        </defs>
        <rect width="300" height="200" fill="url(#wsky)"/>
        <circle cx="228" cy="52" r="16" fill="#f1e6cf" opacity=".7"/>
        <path d="M0 110 L40 82 L78 100 L120 70 L165 98 L210 76 L255 96 L300 80 L300 130 L0 130Z" fill="#b8c2c7"/>
        <path d="M0 118 C50 104 100 112 150 106 C200 100 250 112 300 104 L300 140 L0 140Z" fill="#e8ecec"/>
        <path d="M60 200 C90 160 150 140 190 138 C230 136 270 142 300 146 L300 162 C250 156 200 158 160 170 C120 182 100 192 96 200Z" fill="url(#wice)"/>
        <path d="M0 140 C60 132 140 136 190 138 C150 142 100 160 60 200 L0 200Z" fill="#f2f4f2"/>
        <path d="M96 200 C110 188 150 172 200 164 C240 158 275 160 300 162 L300 200Z" fill="#eef1f0"/>
        <g fill="#2e3a36"><path d="M30 150 L40 110 L50 150Z"/><path d="M34 132 L40 98 L46 132Z"/><path d="M58 158 L70 108 L82 158Z"/><path d="M63 136 L70 94 L77 136Z"/><path d="M235 170 L246 128 L257 170Z"/><path d="M239 150 L246 116 L253 150Z"/><path d="M262 176 L272 140 L282 176Z"/></g>
        <g fill="#f4f6f5" opacity=".85"><path d="M36 128 L40 112 L44 128Z"/><path d="M66 132 L70 110 L74 132Z"/><path d="M242 146 L246 130 L250 146Z"/></g>
        <g><rect x="150" y="112" width="26" height="18" fill="#5b4636"/><path d="M146 113 L163 100 L180 113Z" fill="#f2f4f2"/><rect x="158" y="118" width="6" height="6" fill="#e6b865"/><rect x="171" y="101" width="3" height="8" fill="#3d2f25"/></g>
        <g fill="#ffffff" opacity=".8"><circle cx="20" cy="30" r="1.2"/><circle cx="90" cy="20" r="1"/><circle cx="130" cy="50" r="1.3"/><circle cx="180" cy="28" r="1"/><circle cx="270" cy="30" r="1.2"/><circle cx="110" cy="80" r="1"/><circle cx="200" cy="70" r="1.1"/><circle cx="50" cy="60" r="1"/></g>
      </svg>
    </div>
    <div class="plate">№ 14</div>
    <div class="note">
      <svg viewBox="0 0 160 220">
        <defs>
          <linearGradient id="blood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3130e"/><stop offset=".6" stop-color="#7e0b08"/><stop offset="1" stop-color="#4d0504"/></linearGradient>
          <filter id="bloodrough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation=".35" result="b"/>
            <feSpecularLighting in="b" surfaceScale="2" specularConstant=".5" specularExponent="18" lighting-color="#ff9a8a" result="s"><feDistantLight azimuth="235" elevation="55"/></feSpecularLighting>
            <feComposite in="s" in2="b" operator="in" result="sh"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="sh"/></feMerge>
          </filter>
        </defs>
        <g filter="url(#bloodrough)" fill="url(#blood)">
          <text x="80" y="118" font-size="120" text-anchor="middle">?</text>
          <text x="80" y="178" font-size="38" text-anchor="middle">копия?</text>
          <path class="drip" d="M80 108 C80.8 118 79.6 128 80.4 140 C78 141 77.6 145 80.2 147 C83 147 83.4 142 81.8 140 C82.4 128 83 118 84 108Z"/>
          <path class="drip d2" d="M86 58 C86.5 66 85.8 72 86.3 80 C84.6 81 84.5 84 86.3 85 C88.2 85 88.4 81 87.4 80 C87.8 72 88.2 66 89 58Z"/>
          <path class="drip d3" d="M46 172 C46.6 182 45.8 190 46.3 200 C44.2 201 44 205 46.2 206 C48.6 206 48.8 201 47.6 200 C48 190 48.4 182 49.2 172Z"/>
          <path class="drip d4" d="M73 174 C73.4 180 72.8 186 73.2 192 C71.6 193 71.5 196 73.2 197 C75 197 75.1 193 74.2 192 C74.5 186 74.8 180 75.4 174Z"/>
          <path class="drip d5" d="M103 172 C103.6 184 102.8 196 103.4 212 C101 213 100.8 217 103.2 218 C105.8 218 106 213 104.6 212 C105 196 105.4 184 106.2 172Z"/>
          <circle cx="122" cy="96" r="2.2"/><circle cx="128" cy="104" r="1.2"/><circle cx="36" cy="60" r="1.6"/><circle cx="130" cy="150" r="1.4"/>
        </g>
      </svg>
    </div>
  </div>
  <div class="bg-fire"></div>
  <div class="bg-vignette"></div>
  <div class="bg-grain"></div>
</div>
`;

// ============================================================
// CHAPTER 3: Свежий лак
// ============================================================
export const MANOR_CH3_HTML = `
<style>
  .bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(0,0,0,.35) 0 2px,rgba(255,255,255,.012) 2px 4px,transparent 4px 150px),linear-gradient(180deg,#130e0b 0%,#1a130f 55%,#0e0a08 100%)}
  .room{position:absolute;right:0;bottom:0;width:min(1040px,82vw);height:auto;overflow:visible}
  .uvhum{animation:hum 3.4s ease-in-out infinite}
  .uvcone{mix-blend-mode:screen;animation:cone 5s ease-in-out infinite}
  @keyframes hum{0%,100%{opacity:.8}50%{opacity:1}}
  @keyframes cone{0%,100%{opacity:.85}47%{opacity:.85}49%{opacity:.6}51%{opacity:.9}}
  .vignette{position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,8,7,.94) 0%,rgba(10,8,7,.72) 38%,rgba(10,8,7,.15) 70%,transparent 100%),radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.65) 100%)}
  .grain{position:absolute;inset:-50%;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:grain 1s steps(4) infinite}
  @keyframes grain{25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}}
</style>
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

        <ellipse class="uvhum" cx="550" cy="175" rx="340" ry="230" fill="url(#wallGlow)"/>

        <path d="M440 58 L550 18 L660 58" fill="none" stroke="#2a1d15" stroke-width="1.5"/>
        <circle cx="550" cy="18" r="3" fill="#2a1d15"/>
        <rect x="366" y="56" width="368" height="243" rx="3" fill="#24160f"/>
        <rect x="376" y="66" width="348" height="223" fill="#3a2518"/>
        <rect x="386" y="76" width="328" height="203" fill="#0d0a0c"/>
        <g clip-path="url(#pc)">
            <image href="https://storage.yandexcloud.net/timenote/dl/69e2a8548123560001911cda/codeblock/2026-09/6ab9b5b713f64f5330a08ad4.webp"
                   x="378" y="70" width="344" height="216" preserveAspectRatio="xMidYMid slice" filter="url(#uvf)"/>
            <rect class="uvhum" x="390" y="80" width="320" height="195" fill="url(#varnish)" style="mix-blend-mode:screen"/>
        </g>
        <rect x="366" y="56" width="368" height="243" rx="3" fill="none" stroke="#b3a3ff" stroke-opacity=".12"/>

        <polygon class="uvcone" points="292,293 385,52 745,110 745,305 311,320" fill="url(#cone)"/>

        <rect x="-2400" y="448" width="5600" height="220" fill="url(#wood)"/>
        <rect x="-2400" y="448" width="5600" height="5" fill="#2e1e14"/>
        <rect x="-2400" y="470" width="5600" height="1" fill="#000" opacity=".5"/>
        <ellipse class="uvhum" cx="330" cy="452" rx="190" ry="9" fill="#a898ff" opacity=".18" filter="url(#blur2)"/>

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

        <path d="M520 450 L520 386 Q520 362 534 354 L536 320 L546 320 L548 354 Q562 362 562 386 L562 450 Z" fill="url(#btl)"/>
        <rect x="534" y="306" width="14" height="15" rx="2" fill="#3b2a1d"/>
        <rect x="533" y="318" width="16" height="4" fill="#6b4a2a"/>
        <rect x="526" y="396" width="30" height="28" rx="1" fill="#1a1410" stroke="#c9a978" stroke-opacity=".3"/>
        <line x1="531" y1="405" x2="551" y2="405" stroke="#c9a978" stroke-opacity=".35"/>
        <line x1="533" y1="412" x2="549" y2="412" stroke="#c9a978" stroke-opacity=".2"/>
        <path d="M524 382 Q524 368 533 360" fill="none" stroke="#b9a9ff" stroke-opacity=".45" stroke-width="1.5"/>
        <line x1="524" y1="388" x2="524" y2="444" stroke="#b9a9ff" stroke-opacity=".3" stroke-width="1.5"/>

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
`;