// Фоны экранов «Итоги раундов» и «Разгадка» (макеты Данияра, архив «подозреваемые ...»).
// Только слой фона; анимации — в ./result-effects.ts. Стили ограничены корневым классом сцены.

// ============================================================
// Итоги раунда 1: Нина
// ============================================================
export const MANOR_RESULT_1_HTML = `
<style>
.mn-r1{position:absolute;inset:0;overflow:hidden}
.mn-r1 *{margin:0;padding:0;box-sizing:border-box}
.mn-r1,.mn-r1{height:100%}
.mn-r1{background:#0a0706;color:#e8dfd6;font-family:'Inter',sans-serif;overflow-x:hidden;line-height:1.55}
.mn-r1 .scene{position:fixed;inset:0;z-index:0;overflow:hidden}
.mn-r1 .scene svg{position:absolute;inset:-2%;width:104%;height:104%;transition:transform .6s ease-out}
.mn-r1 #dust{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.mn-r1 .shade{position:absolute;inset:0;pointer-events:none;
            background:
              linear-gradient(180deg,rgba(10,7,6,.92) 0%,rgba(10,7,6,.55) 32%,rgba(10,7,6,0) 55%),
              radial-gradient(ellipse at 60% 60%,transparent 30%,rgba(5,3,2,.85) 100%)}
.mn-r1 .grain{position:absolute;inset:-50%;opacity:.07;pointer-events:none;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            animation:grain 1.2s steps(6) infinite}
@keyframes grain{0%{transform:translate(0,0)}33%{transform:translate(-3%,2%)}66%{transform:translate(2%,-3%)}100%{transform:translate(0,0)}}
.mn-r1 .flicker{animation:flick 4s infinite}
@keyframes flick{0%,100%{opacity:1}42%{opacity:.93}44%{opacity:.78}46%{opacity:.95}70%{opacity:.9}}
.mn-r1 .fire{animation:fire 1.6s ease-in-out infinite alternate}
@keyframes fire{from{opacity:.55}to{opacity:1}}
.mn-r1 .rain{animation:rain .7s linear infinite}
@keyframes rain{from{transform:translateY(-60px)}to{transform:translateY(60px)}}
.mn-r1 .sway{transform-origin:1000px 0;animation:sway 7s ease-in-out infinite}
@keyframes sway{0%,100%{transform:rotate(-.6deg)}50%{transform:rotate(.6deg)}}
.mn-r1 .knead{transform-origin:1010px 420px;animation:knead 2.4s ease-in-out infinite}
@keyframes knead{0%,100%{transform:rotate(0)}50%{transform:rotate(3deg) translateY(4px)}}
</style>
<div class="mn-r1">
<div class="scene" id="scene">
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" id="svg">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#120c0a"/><stop offset="1" stop-color="#1e140f"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c252c"/><stop offset="1" stop-color="#0c1115"/></linearGradient>
    <radialGradient id="lamp" cx="1000" cy="430" r="520" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e3a066" stop-opacity=".42"/><stop offset=".35" stop-color="#b86a3c" stop-opacity=".16"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <radialGradient id="fireG" cx="1425" cy="690" r="200" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ff8a3d" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <radialGradient id="moonG" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#dfe4e2" stop-opacity=".8"/><stop offset=".4" stop-color="#b9c2c4" stop-opacity=".25"/><stop offset="1" stop-color="#b9c2c4" stop-opacity="0"/></radialGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b261a"/><stop offset=".5" stop-color="#1a110c"/><stop offset="1" stop-color="#0a0605"/></linearGradient>
    <linearGradient id="dough" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2c79c"/><stop offset="1" stop-color="#8a6c4a"/></linearGradient>
    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c7d0d2" stop-opacity=".09"/><stop offset="1" stop-color="#c7d0d2" stop-opacity="0"/></linearGradient>
    <pattern id="tiles" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#1a110d"/><rect x="1" y="1" width="38" height="38" fill="#20150f"/></pattern>
    <clipPath id="glassClip"><rect x="192" y="182" width="256" height="306"/></clipPath>
    <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>

  <!-- стены и пол -->
  <rect width="1600" height="900" fill="url(#wall)"/>
  <rect y="520" width="1600" height="190" fill="url(#tiles)" opacity=".8"/>
  <rect y="516" width="1600" height="6" fill="#2a1b13"/>
  <rect y="700" width="1600" height="200" fill="#0c0806"/>
  <g stroke="#1a110c" stroke-width="2">
    <line x1="0" y1="740" x2="1600" y2="740"/><line x1="0" y1="790" x2="1600" y2="790"/><line x1="0" y1="850" x2="1600" y2="850"/>
  </g>

  <!-- окно -->
  <rect x="176" y="166" width="288" height="338" fill="#0e0907"/>
  <rect x="192" y="182" width="256" height="306" fill="url(#glass)"/>
  <circle cx="380" cy="240" r="90" fill="url(#moonG)"/>
  <circle cx="380" cy="240" r="22" fill="#d4dad8" opacity=".55" filter="url(#blur2)"/>
  <g clip-path="url(#glassClip)" stroke="#9fb0b8" stroke-opacity=".22" stroke-width="1">
    <g class="rain">
      <line x1="210" y1="150" x2="204" y2="190"/><line x1="240" y1="230" x2="234" y2="270"/><line x1="275" y1="170" x2="269" y2="210"/>
      <line x1="300" y1="300" x2="294" y2="340"/><line x1="330" y1="200" x2="324" y2="240"/><line x1="360" y1="360" x2="354" y2="400"/>
      <line x1="395" y1="160" x2="389" y2="200"/><line x1="420" y1="280" x2="414" y2="320"/><line x1="225" y1="400" x2="219" y2="440"/>
      <line x1="345" y1="440" x2="339" y2="480"/><line x1="435" y1="420" x2="429" y2="460"/><line x1="260" y1="330" x2="254" y2="370"/>
    </g>
  </g>
  <rect x="316" y="182" width="8" height="306" fill="#0e0907"/>
  <rect x="192" y="330" width="256" height="8" fill="#0e0907"/>
  <rect x="164" y="500" width="312" height="14" fill="#1c130e"/>
  <polygon points="192,182 448,182 900,900 300,900" fill="url(#beam)"/>

  <!-- часы: почти полночь -->
  <g transform="translate(660,190)">
    <circle r="36" fill="#1a110c" stroke="#3a281c" stroke-width="4"/>
    <circle r="2.5" fill="#8a6f58"/>
    <line x1="0" y1="0" x2="-2" y2="-20" stroke="#8a6f58" stroke-width="3" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="-5" y2="-28" stroke="#8a6f58" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- полка с банками -->
  <rect x="540" y="330" width="280" height="8" fill="#2a1b13"/>
  <g fill="#1d140f" stroke="#3a281c" stroke-width="1">
    <rect x="560" y="286" width="32" height="44" rx="4"/><rect x="604" y="298" width="26" height="32" rx="3"/>
    <rect x="642" y="276" width="36" height="54" rx="5"/><rect x="740" y="292" width="30" height="38" rx="3"/>
    <path d="M700 330 q-6 -30 12 -40 q18 10 12 40z"/>
  </g>
  <g fill="#2e1f16"><rect x="560" y="280" width="32" height="8" rx="2"/><rect x="642" y="270" width="36" height="8" rx="2"/></g>

  <!-- печь -->
  <rect x="1455" y="0" width="34" height="440" fill="#120c09"/>
  <rect x="1330" y="430" width="200" height="370" rx="6" fill="#150e0b" stroke="#2a1c14" stroke-width="3"/>
  <rect x="1320" y="422" width="220" height="16" fill="#23170f"/>
  <rect x="1380" y="640" width="96" height="84" rx="4" fill="#0a0605"/>
  <rect class="fire" x="1388" y="690" width="80" height="26" rx="3" fill="#b8521f" opacity=".8" filter="url(#blur2)"/>
  <g stroke="#1a110c" stroke-width="3"><line x1="1392" y1="650" x2="1392" y2="720"/><line x1="1410" y1="650" x2="1410" y2="720"/><line x1="1428" y1="650" x2="1428" y2="720"/><line x1="1446" y1="650" x2="1446" y2="720"/><line x1="1464" y1="650" x2="1464" y2="720"/></g>
  <rect class="fire" x="1100" y="500" width="500" height="400" fill="url(#fireG)"/>
  <!-- чугунок на плите -->
  <path d="M1370 422 q0 -40 40 -40 h30 q40 0 40 40z" fill="#0f0a08" stroke="#3a2a1e"/>

  <!-- свет лампы -->
  <g class="flicker"><rect width="1600" height="900" fill="url(#lamp)"/>
    <polygon points="960,338 1040,338 1300,700 700,700" fill="#e2a064" opacity=".05"/></g>

  <!-- кухарка (силуэт) -->
  <g>
    <path d="M880 800 q-10 -120 30 -230 h170 q40 110 30 230z" fill="#0d0806"/>
    <path d="M930 408 q-50 20 -58 100 q-6 60 22 92 h176 q30 -40 10 -110 q-14 -60 -60 -82 q-40 -14 -90 0z" fill="url(#body)"/>
    <path d="M938 470 q52 -14 100 0 l10 130 h-120z" fill="#2c1f17" opacity=".7"/>
    <path d="M936 470 q54 -14 104 0" stroke="#7a5a40" stroke-width="2" fill="none" opacity=".6"/>
    <path d="M950 412 q30 -8 60 0" stroke="#d09160" stroke-width="3" fill="none" opacity=".35"/>
    <rect x="958" y="385" width="36" height="30" rx="10" fill="#1e140e"/>
    <circle cx="976" cy="360" r="34" fill="#2a1b13"/>
    <path d="M940 356 q2 -44 38 -44 q38 0 40 42 q-8 -16 -40 -18 q-30 0 -38 20z" fill="#4a2e20"/>
    <path d="M944 350 q30 -38 70 -6" stroke="#d99a66" stroke-width="3" fill="none" opacity=".45"/>
    <path d="M944 372 q-16 6 -14 22 q12 -4 18 -14z" fill="#3a2419"/>
    <g class="knead">
      <path d="M1022 420 q34 20 44 70 q8 44 26 78" stroke="#1a110c" stroke-width="30" stroke-linecap="round" fill="none"/>
      <path d="M1026 414 q34 20 44 70" stroke="#c88958" stroke-width="3" fill="none" opacity=".3"/>
      <circle cx="1094" cy="572" r="14" fill="#3a2419"/>
    </g>
    <path d="M934 430 q-30 40 -10 100 q14 34 50 46" stroke="#150e0a" stroke-width="28" stroke-linecap="round" fill="none"/>
  </g>

  <!-- стол -->
  <rect x="740" y="590" width="540" height="20" fill="#2c1b12"/>
  <rect x="740" y="588" width="540" height="4" fill="#7a4f33" opacity=".7"/>
  <rect x="760" y="610" width="22" height="190" fill="#1a100b"/><rect x="1238" y="610" width="22" height="190" fill="#1a100b"/>
  <rect x="740" y="610" width="540" height="30" fill="#1d130d"/>
  <ellipse cx="960" cy="588" rx="140" ry="8" fill="#e8dcc6" opacity=".14"/>
  <!-- миска с опарой -->
  <path d="M1116 546 q10 -38 60 -40 q50 2 60 40z" fill="url(#dough)"/>
  <path d="M1136 520 q20 -10 40 -6" stroke="#fff3dc" stroke-width="2" fill="none" opacity=".4"/>
  <path d="M1106 544 h140 q-6 44 -70 46 q-64 -2 -70 -46z" fill="#3b2a20" stroke="#6b4a33" stroke-width="2"/>
  <!-- скалка и мука -->
  <rect x="830" y="576" width="120" height="12" rx="6" fill="#6a4630"/>
  <rect x="816" y="579" width="20" height="6" rx="3" fill="#4a3022"/><rect x="944" y="579" width="20" height="6" rx="3" fill="#4a3022"/>
  <path d="M1000 588 q-4 -26 16 -30 h10 q20 4 16 30z" fill="#4a3a2c"/>

  <!-- лампа -->
  <g class="sway">
    <line x1="1000" y1="0" x2="1000" y2="300" stroke="#1a110c" stroke-width="3"/>
    <path d="M968 300 h64 l24 40 h-112z" fill="#1c130e"/>
    <path d="M944 340 h112" stroke="#8a5a3a" stroke-width="2"/>
    <ellipse class="flicker" cx="1000" cy="344" rx="26" ry="8" fill="#ffd29a" filter="url(#blur2)"/>
    <circle class="flicker" cx="1000" cy="360" r="60" fill="#e8a868" opacity=".25" filter="url(#blur8)"/>
  </g>
</svg>
<canvas id="dust"></canvas>
<div class="shade"></div>
<div class="grain"></div>
</div>
</div>
`;

// ============================================================
// Итоги раунда 2: Лидия
// ============================================================
export const MANOR_RESULT_2_HTML = `
<style>
.mn-r2{position:absolute;inset:0;overflow:hidden}
.mn-r2 *{margin:0;padding:0;box-sizing:border-box}
.mn-r2,.mn-r2{height:100%}
.mn-r2{background:#0b0807;color:#e9e1d6;font-family:'Inter',sans-serif;overflow-x:hidden;min-height:100vh}
.mn-r2 .scene{position:fixed;inset:0;z-index:0;overflow:hidden}
.mn-r2 .scene svg{width:100%;height:100%;display:block}
.mn-r2 .veil{position:fixed;inset:0;z-index:1;pointer-events:none;
            background:
              linear-gradient(180deg,rgba(11,8,7,.92) 0%,rgba(11,8,7,.55) 22%,rgba(11,8,7,0) 45%,rgba(11,8,7,0) 75%,rgba(11,8,7,.75) 100%),
              radial-gradient(ellipse at 55% 60%,transparent 35%,rgba(5,3,3,.8) 100%);}
.mn-r2 .dust{position:fixed;inset:0;z-index:1;pointer-events:none}
.mn-r2 .flicker{animation:flick 3.2s infinite ease-in-out;transform-origin:center;transform-box:fill-box}
@keyframes flick{0%,100%{opacity:.9}20%{opacity:.7}35%{opacity:1}55%{opacity:.75}70%{opacity:.95}85%{opacity:.8}}
.mn-r2 .flame{animation:flame 1.4s infinite ease-in-out;transform-origin:50% 100%;transform-box:fill-box}
@keyframes flame{0%,100%{transform:scale(1,1) skewX(0)}30%{transform:scale(.92,1.08) skewX(3deg)}60%{transform:scale(1.05,.95) skewX(-3deg)}}
.mn-r2 .breath{animation:breath 5s infinite ease-in-out;transform-origin:50% 100%;transform-box:fill-box}
@keyframes breath{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.025)}}
.mn-r2 .pendulum{animation:swing 2s infinite ease-in-out;transform-origin:50% 0;transform-box:fill-box}
@keyframes swing{0%,100%{transform:rotate(7deg)}50%{transform:rotate(-7deg)}}
.mn-r2 .rain line{animation:rain .9s linear infinite}
@keyframes rain{from{transform:translateY(-40px)}to{transform:translateY(380px)}}
.mn-r2 .card{margin-top:40px;padding:38px 30px 34px;border-radius:14px;border:1px solid rgba(233,225,214,.12);background:rgba(18,14,12,.72);backdrop-filter:blur(3px);max-width:1200px;transition:opacity .35s,transform .35s}
.mn-r2 .card.hidden{opacity:0;transform:translateY(-10px);pointer-events:none}
</style>
<div class="mn-r2">
<div class="scene">
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1412"/><stop offset="1" stop-color="#140e0c"/></linearGradient>
    <pattern id="damask" width="70" height="100" patternUnits="userSpaceOnUse">
        <path d="M35 10 C50 25 50 40 35 50 C20 40 20 25 35 10Z M35 55 C45 65 45 80 35 90 C25 80 25 65 35 55Z" fill="#2a1d18" opacity=".55"/>
        <circle cx="0" cy="50" r="4" fill="#2a1d18" opacity=".5"/><circle cx="70" cy="50" r="4" fill="#2a1d18" opacity=".5"/>
    </pattern>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c120c"/><stop offset="1" stop-color="#0a0605"/></linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#27313c"/><stop offset="1" stop-color="#0e131a"/></linearGradient>
    <radialGradient id="moonGlow"><stop offset="0" stop-color="#e9e0c8" stop-opacity=".5"/><stop offset="1" stop-color="#e9e0c8" stop-opacity="0"/></radialGradient>
    <linearGradient id="beam" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d4e0" stop-opacity=".16"/><stop offset="1" stop-color="#c9d4e0" stop-opacity="0"/></linearGradient>
    <radialGradient id="candle"><stop offset="0" stop-color="#f0a860" stop-opacity=".45"/><stop offset=".4" stop-color="#c8674a" stop-opacity=".15"/><stop offset="1" stop-color="#c8674a" stop-opacity="0"/></radialGradient>
    <linearGradient id="curtain" x1="0" x2="1"><stop offset="0" stop-color="#2a0f0e"/><stop offset=".3" stop-color="#401714"/><stop offset=".55" stop-color="#220b0a"/><stop offset=".8" stop-color="#3a1512"/><stop offset="1" stop-color="#1f0a09"/></linearGradient>
    <linearGradient id="wood" x1="0" x2="1"><stop offset="0" stop-color="#1a0f0a"/><stop offset=".5" stop-color="#2b1a11"/><stop offset="1" stop-color="#170d08"/></linearGradient>
    <linearGradient id="blanket" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4a4a"/><stop offset="1" stop-color="#261b1c"/></linearGradient>
    <linearGradient id="drape" x1="0" x2="1"><stop offset="0" stop-color="#3a1a18" stop-opacity=".85"/><stop offset=".5" stop-color="#2a100f" stop-opacity=".55"/><stop offset="1" stop-color="#3a1a18" stop-opacity=".85"/></linearGradient>
    <linearGradient id="doorLight" x1="0" x2="1"><stop offset="0" stop-color="#e6a45e" stop-opacity=".5"/><stop offset="1" stop-color="#e6a45e" stop-opacity="0"/></linearGradient>
</defs>

<!-- стена -->
<rect width="1600" height="660" fill="url(#wall)"/>
<rect width="1600" height="490" fill="url(#damask)"/>
<rect y="480" width="1600" height="175" fill="#130d0a"/>
<rect y="476" width="1600" height="8" fill="#241712"/>
<g fill="none" stroke="#221611" stroke-width="2">
    <rect x="20" y="500" width="180" height="130"/><rect x="230" y="500" width="180" height="130"/><rect x="440" y="500" width="180" height="130"/><rect x="650" y="500" width="180" height="130"/><rect x="860" y="500" width="180" height="130"/><rect x="1070" y="500" width="180" height="130"/><rect x="1280" y="500" width="180" height="130"/><rect x="1490" y="500" width="180" height="130"/>
</g>
<rect y="645" width="1600" height="14" fill="#1f130d"/>

<!-- пол -->
<rect y="658" width="1600" height="242" fill="url(#floor)"/>
<g stroke="#0b0705" stroke-width="2" opacity=".8">
    <line x1="0" y1="690" x2="1600" y2="690"/><line x1="0" y1="730" x2="1600" y2="730"/><line x1="0" y1="780" x2="1600" y2="780"/><line x1="0" y1="840" x2="1600" y2="840"/>
    <line x1="120" y1="658" x2="60" y2="690"/><line x1="420" y1="690" x2="380" y2="730"/><line x1="700" y1="730" x2="660" y2="780"/><line x1="980" y1="658" x2="960" y2="690"/><line x1="1240" y1="690" x2="1220" y2="730"/><line x1="1450" y1="730" x2="1430" y2="780"/><line x1="300" y1="780" x2="260" y2="840"/><line x1="1100" y1="780" x2="1080" y2="840"/><line x1="560" y1="840" x2="520" y2="900"/>
</g>
<!-- ковёр -->
<ellipse cx="820" cy="790" rx="500" ry="78" fill="#2a0f0d"/>
<ellipse cx="820" cy="790" rx="470" ry="66" fill="none" stroke="#4a1f18" stroke-width="3"/>
<ellipse cx="820" cy="790" rx="420" ry="52" fill="none" stroke="#3a1712" stroke-width="2" stroke-dasharray="6 8"/>
<ellipse cx="820" cy="790" rx="200" ry="24" fill="#34130f"/>

<!-- шкаф -->
<g>
    <rect x="50" y="170" width="240" height="520" fill="url(#wood)"/>
    <path d="M40 170 L300 170 L290 150 L50 150Z" fill="#26170f"/>
    <path d="M110 150 Q170 115 230 150Z" fill="#26170f"/>
    <rect x="70" y="195" width="95" height="420" fill="none" stroke="#120a06" stroke-width="3"/>
    <rect x="175" y="195" width="95" height="420" fill="none" stroke="#120a06" stroke-width="3"/>
    <rect x="85" y="215" width="65" height="170" fill="none" stroke="#342015" stroke-width="1.5"/>
    <rect x="190" y="215" width="65" height="170" fill="none" stroke="#342015" stroke-width="1.5"/>
    <rect x="85" y="410" width="65" height="185" fill="none" stroke="#342015" stroke-width="1.5"/>
    <rect x="190" y="410" width="65" height="185" fill="none" stroke="#342015" stroke-width="1.5"/>
    <circle cx="160" cy="400" r="4" fill="#8a6a3e"/><circle cx="180" cy="400" r="4" fill="#8a6a3e"/>
    <rect x="60" y="630" width="220" height="40" fill="#1a0f09"/>
    <rect x="60" y="690" width="16" height="16" fill="#120a06"/><rect x="264" y="690" width="16" height="16" fill="#120a06"/>
</g>

<!-- портрет -->
<g>
    <rect x="690" y="235" width="150" height="190" fill="#3b2a15"/>
    <rect x="702" y="247" width="126" height="166" fill="#161010"/>
    <ellipse cx="765" cy="310" rx="24" ry="30" fill="#2a2020"/>
    <path d="M722 413 Q725 355 765 345 Q805 355 808 413Z" fill="#1f1818"/>
    <path d="M745 290 Q765 270 785 290 Q780 280 765 278 Q750 280 745 290Z" fill="#0f0b0b"/>
    <rect x="740" y="428" width="50" height="8" fill="#5a4220" opacity=".7"/>
</g>

<!-- окно -->
<g>
    <rect x="1180" y="100" width="230" height="380" fill="#1a110d"/>
    <rect x="1192" y="112" width="206" height="356" fill="url(#sky)"/>
    <circle cx="1330" cy="180" r="90" fill="url(#moonGlow)"/>
    <circle cx="1330" cy="180" r="28" fill="#e6dcc2"/>
    <circle cx="1320" cy="172" r="5" fill="#cfc4a8"/><circle cx="1338" cy="190" r="3.5" fill="#cfc4a8"/>
    <path d="M1192 330 L1230 300 L1260 318 L1290 280 L1300 250 L1310 280 L1340 300 L1398 290 L1398 468 L1192 468Z" fill="#080a0e"/>
    <path d="M1286 285 L1300 240 L1314 285Z" fill="#080a0e"/>
    <g class="rain" stroke="#9fb0c0" stroke-width="1" opacity=".25">
        <line x1="1210" y1="112" x2="1206" y2="130"/><line x1="1250" y1="140" x2="1246" y2="158"/><line x1="1290" y1="120" x2="1286" y2="138" style="animation-delay:.3s"/><line x1="1360" y1="130" x2="1356" y2="148" style="animation-delay:.5s"/><line x1="1385" y1="115" x2="1381" y2="133" style="animation-delay:.2s"/><line x1="1230" y1="118" x2="1226" y2="136" style="animation-delay:.6s"/><line x1="1320" y1="125" x2="1316" y2="143" style="animation-delay:.75s"/>
    </g>
    <g stroke="#1a110d" stroke-width="7"><line x1="1295" y1="112" x2="1295" y2="468"/><line x1="1192" y1="230" x2="1398" y2="230"/><line x1="1192" y1="350" x2="1398" y2="350"/></g>
    <rect x="1168" y="478" width="254" height="14" fill="#24160f"/>
    <path d="M1150 70 L1180 70 Q1200 250 1170 490 Q1190 560 1160 650 L1120 650 Q1150 520 1130 420 Q1150 250 1150 70Z" fill="url(#curtain)"/>
    <path d="M1410 70 L1450 70 Q1440 250 1455 420 Q1440 520 1470 650 L1425 650 Q1400 560 1420 490 Q1395 250 1410 70Z" fill="url(#curtain)"/>
    <rect x="1130" y="60" width="350" height="12" rx="6" fill="#3a2a16"/>
    <circle cx="1130" cy="66" r="10" fill="#4a361c"/><circle cx="1480" cy="66" r="10" fill="#4a361c"/>
</g>

<!-- дверь приоткрыта -->
<g>
    <rect x="1490" y="170" width="130" height="490" fill="#120b08"/>
    <polygon points="1500,180 1512,180 1512,655 1500,655" fill="#e6a45e" opacity=".55"/>
    <polygon points="1512,655 1500,655 1380,900 1470,900" fill="url(#doorLight)" opacity=".35"/>
    <path d="M1512 180 L1600 170 L1600 665 L1512 655Z" fill="#1d120c"/>
    <path d="M1530 215 L1590 210 L1590 400 L1530 402Z M1530 440 L1590 440 L1590 620 L1530 616Z" fill="none" stroke="#2c1b12" stroke-width="2"/>
    <circle cx="1522" cy="420" r="4" fill="#8a6a3e"/>
</g>

<!-- часы (полночь) -->
<g>
    <rect x="1030" y="250" width="80" height="440" fill="url(#wood)"/>
    <path d="M1022 250 L1118 250 L1110 225 Q1070 200 1030 225Z" fill="#26170f"/>
    <circle cx="1070" cy="295" r="30" fill="#c8bca0" opacity=".85"/>
    <circle cx="1070" cy="295" r="30" fill="none" stroke="#3b2a15" stroke-width="4"/>
    <g stroke="#1a0f0a" stroke-width="3" stroke-linecap="round"><line x1="1070" y1="295" x2="1070" y2="272"/><line x1="1070" y1="295" x2="1071" y2="278"/></g>
    <g fill="#1a0f0a"><circle cx="1070" cy="270" r="1.6"/><circle cx="1095" cy="295" r="1.6"/><circle cx="1070" cy="320" r="1.6"/><circle cx="1045" cy="295" r="1.6"/></g>
    <rect x="1045" y="345" width="50" height="220" fill="#0d0806"/>
    <g class="pendulum"><line x1="1070" y1="350" x2="1070" y2="520" stroke="#8a6a3e" stroke-width="2"/><circle cx="1070" cy="528" r="13" fill="#8a6a3e"/></g>
    <rect x="1024" y="670" width="92" height="22" fill="#1a0f09"/>
</g>

<!-- тумбочка и свеча -->
<g>
    <circle class="flicker" cx="375" cy="525" r="260" fill="url(#candle)"/>
    <rect x="320" y="570" width="120" height="140" fill="url(#wood)"/>
    <rect x="312" y="560" width="136" height="14" fill="#2e1c12"/>
    <rect x="334" y="592" width="92" height="40" fill="none" stroke="#120a06" stroke-width="2"/>
    <circle cx="380" cy="612" r="3.5" fill="#8a6a3e"/>
    <rect x="326" y="708" width="10" height="14" fill="#120a06"/><rect x="424" y="708" width="10" height="14" fill="#120a06"/>
    <!-- подсвечник -->
    <ellipse cx="360" cy="560" rx="20" ry="5" fill="#8a6a3e"/>
    <rect x="354" y="512" width="12" height="46" fill="#e8dcc4"/>
    <path d="M354 512 Q356 522 358 516Z" fill="#d6c8ad"/>
    <line x1="360" y1="512" x2="360" y2="504" stroke="#1a0f0a" stroke-width="1.5"/>
    <path class="flame" d="M360 480 Q370 495 364 505 Q360 509 356 505 Q350 495 360 480Z" fill="#f4b266"/>
    <path class="flame" d="M360 490 Q364 498 361 503 Q360 505 359 503 Q356 498 360 490Z" fill="#fff0c8"/>
    <!-- стакан воды -->
    <rect x="395" y="535" width="18" height="25" fill="#9fb0c0" opacity=".22"/>
    <rect x="395" y="545" width="18" height="15" fill="#9fb0c0" opacity=".18"/>
    <!-- пузырёк с микстурой -->
    <rect x="420" y="540" width="14" height="20" rx="2" fill="#4a2a14"/>
    <rect x="423" y="533" width="8" height="8" fill="#1a0f0a"/>
    <!-- платок -->
    <path d="M318 560 Q330 550 342 558 L346 562 L316 562Z" fill="#d9d0c2" opacity=".75"/>
</g>

<!-- кровать с балдахином -->
<g>
    <!-- столбы -->
    <rect x="462" y="190" width="14" height="530" fill="#1f130c"/>
    <rect x="1000" y="190" width="14" height="530" fill="#1f130c"/>
    <rect x="450" y="182" width="576" height="18" fill="#26170f"/>
    <path d="M450 200 L1026 200 L1026 222 Q990 238 950 222 Q910 238 870 222 Q830 238 790 222 Q750 238 710 222 Q670 238 630 222 Q590 238 550 222 Q510 238 450 222Z" fill="#3a1614"/>
    <path d="M476 222 Q470 400 488 560 L506 560 Q496 400 520 222Z" fill="url(#drape)"/>
    <path d="M1000 222 Q1010 380 994 520 L1010 520 Q1020 380 1000 222Z" fill="url(#drape)"/>
    <!-- изголовье -->
    <path d="M470 700 L470 400 Q470 350 520 340 L520 700Z" fill="#2a1a10"/>
    <path d="M478 690 L478 410 Q480 368 512 360 L512 690Z" fill="none" stroke="#3b2618" stroke-width="2"/>
    <!-- матрас и рама -->
    <rect x="490" y="600" width="530" height="72" fill="#22150d"/>
    <rect x="490" y="600" width="530" height="8" fill="#301d12"/>
    <rect x="490" y="560" width="520" height="44" rx="10" fill="#8a8078"/>
    <rect x="490" y="560" width="520" height="44" rx="10" fill="#3a302c" opacity=".55"/>
    <rect x="500" y="672" width="16" height="48" fill="#1a0f09"/><rect x="990" y="672" width="16" height="48" fill="#1a0f09"/>
    <!-- изножье -->
    <path d="M994 700 L994 490 Q1010 470 1030 490 L1030 700Z" fill="#2a1a10"/>
    <circle cx="1012" cy="182" r="10" fill="#3b2618"/><circle cx="469" cy="182" r="10" fill="#3b2618"/>
    <!-- подушки -->
    <path d="M510 548 Q505 520 530 515 L630 515 Q650 520 645 548 Q650 572 625 572 L530 572 Q505 572 510 548Z" fill="#b8b0a4"/>
    <path d="M510 548 Q505 520 530 515 L630 515 Q650 520 645 548 Q650 572 625 572 L530 572 Q505 572 510 548Z" fill="#2a2426" opacity=".45"/>
    <path d="M540 540 Q560 530 590 538" stroke="#6e665e" stroke-width="1.5" fill="none" opacity=".6"/>

    <!-- девушка: волосы -->
    <path d="M580 522 Q556 516 540 530 Q526 548 540 562 Q556 575 574 568 Q560 585 530 580 Q560 592 590 575 Q600 560 598 540 Q596 525 580 522Z" fill="#3a1d14"/>
    <path d="M572 540 Q545 548 522 570" stroke="#2a130d" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M578 556 Q560 570 536 584" stroke="#4a2619" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- лицо -->
    <ellipse cx="604" cy="540" rx="19" ry="23" fill="#bda493" transform="rotate(-18 604 540)"/>
    <ellipse cx="604" cy="540" rx="19" ry="23" fill="#384050" opacity=".25" transform="rotate(-18 604 540)"/>
    <path d="M586 526 Q594 512 612 518 Q598 520 590 532Z" fill="#3a1d14"/>
    <path d="M606 533 Q611 536 616 533" stroke="#4a3228" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M620 540 Q624 544 621 548" stroke="#8a7060" stroke-width="1.3" fill="none"/>
    <path d="M610 552 Q614 554 617 552" stroke="#7a4a40" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- одеяло с дыханием -->
    <g class="breath">
        <path d="M615 568 Q630 540 670 536 Q720 532 760 546 Q820 530 880 546 Q930 548 960 552 Q990 548 1004 560 L1010 640 Q900 660 760 652 Q650 650 600 640 Q590 600 615 568Z" fill="url(#blanket)"/>
        <path d="M615 568 Q630 540 670 536 Q690 535 700 537 L690 560 Q650 565 630 580Z" fill="#d6cfc4" opacity=".75"/>
        <path d="M700 580 Q760 575 800 600" stroke="#1d1415" stroke-width="2" fill="none" opacity=".6"/>
        <path d="M850 570 Q900 585 930 620" stroke="#1d1415" stroke-width="2" fill="none" opacity=".6"/>
        <path d="M620 640 Q800 660 1010 640" stroke="#6a5a58" stroke-width="2" fill="none" opacity=".5"/>
    </g>
    <!-- рука поверх одеяла -->
    <path d="M640 562 Q680 555 720 568 Q745 574 770 570" stroke="#b09888" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M640 562 Q680 555 720 568 Q745 574 770 570" stroke="#384050" stroke-width="12" fill="none" stroke-linecap="round" opacity=".25"/>
    <ellipse cx="776" cy="570" rx="9" ry="6" fill="#b09888"/>
</g>

<!-- лунный луч -->
<polygon points="1192,112 1398,112 1100,900 520,900" fill="url(#beam)" style="mix-blend-mode:screen"/>
<!-- тень под кроватью -->
<ellipse cx="760" cy="722" rx="330" ry="14" fill="#000" opacity=".45"/>
</svg>
</div>
<div class="veil"></div>
<div class="dust" id="dust"></div>
</div>
`;

// ============================================================
// Итоги раунда 3: Алиса
// ============================================================
export const MANOR_RESULT_3_HTML = `
<style>
.mn-r3{position:absolute;inset:0;overflow:hidden}
.mn-r3 *{box-sizing:border-box;margin:0;padding:0}
.mn-r3,.mn-r3{height:100%}
.mn-r3{background:#0b0807;color:#e8dfd6;font-family:'Inter',sans-serif;overflow-x:hidden;min-height:100vh}
.mn-r3 .scene{position:fixed;inset:0;z-index:0}
.mn-r3 .scene svg{width:100%;height:100%;display:block}
.mn-r3 .shade{position:fixed;inset:0;z-index:1;pointer-events:none;
            background:
              linear-gradient(180deg,rgba(11,8,7,.92) 0%,rgba(11,8,7,.55) 22%,rgba(11,8,7,0) 45%,rgba(11,8,7,0) 75%,rgba(11,8,7,.7) 100%),
              radial-gradient(ellipse at 60% 65%,transparent 30%,rgba(5,3,2,.75) 100%);
            transition:opacity .6s}
.mn-r3 .flicker{animation:flick 5s infinite}
@keyframes flick{0%,100%{opacity:1}42%{opacity:1}43%{opacity:.82}44%{opacity:1}71%{opacity:.93}72%{opacity:1}}
.mn-r3 .rain line{stroke:#8ea0b4;stroke-width:1.2;opacity:.35;stroke-dasharray:24 180;animation:rain 1.1s linear infinite}
@keyframes rain{to{stroke-dashoffset:-204}}
.mn-r3 .dust{animation:dust 9s ease-in-out infinite}
@keyframes dust{0%,100%{transform:translate(0,0);opacity:.2}50%{transform:translate(12px,-26px);opacity:.8}}
.mn-r3 .hand{transform-origin:931px 596px;animation:work 3.2s ease-in-out infinite}
@keyframes work{0%,100%{transform:rotate(0)}50%{transform:rotate(-4deg)}}
.mn-r3 .pendulum{transform-origin:330px 318px;animation:swing 2s ease-in-out infinite}
@keyframes swing{0%,100%{transform:rotate(9deg)}50%{transform:rotate(-9deg)}}
.mn-r3.view .ui{opacity:0;transform:translateY(-10px);pointer-events:none}
.mn-r3.view .shade{opacity:.35}
.mn-r3 .results{max-height:0;overflow:hidden;transition:max-height .45s ease,margin .45s;}
.mn-r3 .results.open{max-height:400px;margin-top:22px}
.mn-r3.view .back{opacity:1;pointer-events:auto}
</style>
<div class="mn-r3">
<div class="scene">
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#150e0b"/><stop offset="1" stop-color="#241610"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1c110c"/><stop offset="1" stop-color="#080504"/>
    </linearGradient>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0c1219"/><stop offset="1" stop-color="#1a2330"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffb46a" stop-opacity=".55"/>
      <stop offset=".45" stop-color="#d8703f" stop-opacity=".18"/>
      <stop offset="1" stop-color="#d8703f" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffcf8f" stop-opacity=".45"/>
      <stop offset="1" stop-color="#ffb46a" stop-opacity=".05"/>
    </linearGradient>
    <radialGradient id="moon" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#dfe6ee" stop-opacity=".9"/>
      <stop offset=".3" stop-color="#9fb0c2" stop-opacity=".25"/>
      <stop offset="1" stop-color="#9fb0c2" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="win"><path d="M140 720 V300 Q140 180 260 180 Q380 180 380 300 V720 Z"/></clipPath>
  </defs>

  <!-- wall -->
  <rect width="1600" height="900" fill="url(#wall)"/>
  <g stroke="#0d0806" stroke-width="3" opacity=".7">
    <line x1="480" y1="0" x2="480" y2="740"/><line x1="760" y1="0" x2="760" y2="740"/>
    <line x1="1400" y1="0" x2="1400" y2="740"/>
  </g>
  <rect x="0" y="560" width="1600" height="6" fill="#0f0907"/>
  <g fill="none" stroke="#1d130e" stroke-width="2">
    <rect x="500" y="590" width="240" height="130"/><rect x="1420" y="590" width="170" height="130"/>
  </g>

  <!-- window -->
  <path d="M140 720 V300 Q140 180 260 180 Q380 180 380 300 V720 Z" fill="url(#night)"/>
  <g clip-path="url(#win)">
    <circle cx="300" cy="270" r="120" fill="url(#moon)"/>
    <circle cx="300" cy="270" r="22" fill="#d7dee6" opacity=".85"/>
    <path d="M140 620 L180 560 L205 590 L240 520 L262 545 L300 470 L318 500 L345 460 L380 540 V720 H140Z" fill="#070a0e"/>
    <g class="rain">
      <line x1="160" y1="170" x2="150" y2="740" style="animation-delay:-.2s"/>
      <line x1="190" y1="170" x2="180" y2="740" style="animation-delay:-.7s"/>
      <line x1="222" y1="170" x2="212" y2="740" style="animation-delay:-.4s"/>
      <line x1="250" y1="170" x2="240" y2="740" style="animation-delay:-.9s"/>
      <line x1="280" y1="170" x2="270" y2="740" style="animation-delay:-.1s"/>
      <line x1="310" y1="170" x2="300" y2="740" style="animation-delay:-.6s"/>
      <line x1="340" y1="170" x2="330" y2="740" style="animation-delay:-.3s"/>
      <line x1="368" y1="170" x2="358" y2="740" style="animation-delay:-.8s"/>
    </g>
  </g>
  <g fill="none" stroke="#0a0605" stroke-width="10">
    <path d="M140 720 V300 Q140 180 260 180 Q380 180 380 300 V720 Z"/>
  </g>
  <g stroke="#0a0605" stroke-width="6"><line x1="260" y1="180" x2="260" y2="720"/><line x1="140" y1="440" x2="380" y2="440"/></g>
  <rect x="120" y="716" width="280" height="16" fill="#0e0806"/>
  <!-- moonlight on floor -->
  <path d="M150 740 L390 740 L640 900 L260 900Z" fill="#9fb0c2" opacity=".05"/>

  <!-- wall clock (3 AM) -->
  <g transform="translate(330,240)">
    <rect x="-30" y="0" width="60" height="150" rx="6" fill="#120b08" stroke="#2a1a12" stroke-width="2" transform="translate(630,-40)"/>
  </g>
  <g transform="translate(960,230)">
    <rect x="-34" y="-40" width="68" height="190" rx="8" fill="#110a07" stroke="#2c1c13" stroke-width="2"/>
    <circle cx="0" cy="0" r="26" fill="#1d130d" stroke="#6b4a33" stroke-width="2"/>
    <line x1="0" y1="0" x2="14" y2="0" stroke="#b58b62" stroke-width="2.5"/>
    <line x1="0" y1="0" x2="0" y2="-20" stroke="#b58b62" stroke-width="1.6"/>
    <g transform="translate(-630,0)"><g class="pendulum"><line x1="630" y1="88" x2="630" y2="128" stroke="#6b4a33" stroke-width="2" transform="translate(-300,230) translate(-330,-318)"/></g></g>
    <line x1="0" y1="40" x2="0" y2="112" stroke="#6b4a33" stroke-width="2"/>
    <circle cx="0" cy="118" r="8" fill="#8a603f"/>
  </g>

  <!-- tool pegboard -->
  <g transform="translate(1110,250)">
    <rect x="0" y="0" width="270" height="200" rx="4" fill="#1b110c" stroke="#2a1a12" stroke-width="2"/>
    <g fill="#2f1f16">
      <rect x="30" y="30" width="8" height="100" rx="2"/><rect x="22" y="22" width="24" height="16" rx="3"/>
      <path d="M75 30 L85 30 L85 110 L95 140 L65 140 L75 110Z"/>
      <circle cx="140" cy="60" r="28" fill="none" stroke="#2f1f16" stroke-width="6"/>
      <rect x="190" y="30" width="6" height="120"/><rect x="210" y="30" width="6" height="95"/><rect x="230" y="30" width="6" height="110"/>
      <path d="M110 120 h60 v12 h-60z"/>
    </g>
  </g>

  <!-- shelf with jars & books -->
  <g transform="translate(1420,160)">
    <rect x="0" y="80" width="180" height="8" fill="#2a1a12"/>
    <rect x="0" y="200" width="180" height="8" fill="#2a1a12"/>
    <g fill="#1f140e"><rect x="12" y="30" width="18" height="50"/><rect x="32" y="40" width="14" height="40"/><rect x="48" y="24" width="20" height="56"/><rect x="72" y="36" width="16" height="44" transform="rotate(8 80 80)"/></g>
    <g fill="#2a1d15" opacity=".9"><rect x="110" y="44" width="26" height="36" rx="6"/><rect x="142" y="54" width="22" height="26" rx="5"/><rect x="20" y="160" width="30" height="40" rx="6"/><rect x="62" y="150" width="20" height="50" rx="4"/></g>
  </g>

  <!-- floor -->
  <rect x="0" y="740" width="1600" height="160" fill="url(#floor)"/>
  <g stroke="#0b0705" stroke-width="2" opacity=".6">
    <line x1="0" y1="790" x2="1600" y2="790"/><line x1="0" y1="850" x2="1600" y2="850"/>
  </g>

  <!-- warm glow -->
  <g class="flicker">
    <ellipse cx="990" cy="590" rx="520" ry="360" fill="url(#glow)"/>
    <ellipse cx="990" cy="770" rx="360" ry="40" fill="#d8703f" opacity=".12"/>
  </g>

  <!-- chair -->
  <g fill="#0c0806">
    <rect x="770" y="470" width="14" height="200" rx="4"/>
    <rect x="770" y="640" width="110" height="14" rx="3"/>
    <rect x="776" y="654" width="10" height="100"/><rect x="866" y="654" width="10" height="100"/>
  </g>

  <!-- workbench -->
  <g>
    <rect x="890" y="600" width="480" height="22" fill="#2a1a11"/>
    <rect x="890" y="600" width="480" height="4" fill="#8a5a36" opacity=".8" class="flicker"/>
    <rect x="905" y="622" width="18" height="140" fill="#140c08"/>
    <rect x="1335" y="622" width="18" height="140" fill="#140c08"/>
    <rect x="905" y="700" width="448" height="10" fill="#120b07"/>
    <!-- mechanism on bench -->
    <g transform="translate(975,578)">
      <circle cx="0" cy="0" r="20" fill="#3b2617" stroke="#c48a55" stroke-width="2"/>
      <circle cx="0" cy="0" r="6" fill="#c48a55"/>
      <circle cx="32" cy="8" r="12" fill="#2e1d12" stroke="#a87444" stroke-width="2"/>
    </g>
    <!-- mannequin / dress form, she is a seamstress-artisan -->
    <g fill="#1a110c">
      <rect x="1250" y="560" width="6" height="40"/>
      <path d="M1225 470 Q1253 450 1281 470 L1276 520 Q1253 530 1230 520Z"/>
      <path d="M1230 520 Q1253 540 1276 520 L1270 560 H1236Z"/>
    </g>
    <path d="M1276 475 L1272 520" stroke="#c48a55" stroke-width="2" opacity=".35" class="flicker"/>
    <!-- papers & candle stub -->
    <rect x="1080" y="592" width="80" height="8" fill="#3a2a1e" transform="rotate(-3 1120 596)"/>
    <rect x="1180" y="584" width="10" height="16" fill="#cbb9a2"/>
    <ellipse cx="1185" cy="578" rx="3" ry="7" fill="#ffc47a" class="flicker"/>
  </g>

  <!-- desk lamp -->
  <g class="flicker">
    <polygon points="1000,488 1052,470 1060,600 930,600" fill="url(#cone)"/>
  </g>
  <g fill="#0f0906" stroke="#3a2618" stroke-width="1.5">
    <ellipse cx="1090" cy="598" rx="26" ry="6"/>
    <line x1="1090" y1="596" x2="1070" y2="520" stroke-width="5"/>
    <line x1="1070" y1="520" x2="1030" y2="470" stroke-width="5"/>
    <path d="M995 492 L1040 455 L1062 478 Z"/>
  </g>
  <circle cx="1026" cy="484" r="6" fill="#ffe0a8" class="flicker"/>

  <!-- girl -->
  <g>
    <!-- body -->
    <path d="M846 498 Q818 500 800 522 Q788 560 796 612 L800 644 L874 648 Q882 634 872 624 L830 620 Q836 580 850 548 Q860 520 846 498Z" fill="#0d0806"/>
    <!-- legs -->
    <path d="M806 640 L880 636 Q896 640 896 658 L890 758 L874 758 L872 664 L808 664Z" fill="#0a0605"/>
    <!-- head, hair, bun -->
    <circle cx="856" cy="474" r="25" fill="#0d0806"/>
    <circle cx="834" cy="452" r="14" fill="#0d0806"/>
    <path d="M846 494 Q852 500 858 498 L852 512 L842 508Z" fill="#0d0806"/>
    <!-- strands -->
    <path d="M838 480 Q832 505 840 520" stroke="#0d0806" stroke-width="4" fill="none"/>
    <!-- arm -->
    <g class="hand">
      <path d="M848 516 Q868 548 882 572 Q900 590 932 594 L934 600 Q896 602 874 584 Q852 560 838 528Z" fill="#0d0806"/>
      <line x1="930" y1="596" x2="958" y2="584" stroke="#c9a57a" stroke-width="2"/>
    </g>
    <!-- rim light from lamp -->
    <g class="flicker" fill="none" stroke="#ffb46a" stroke-linecap="round" opacity=".75">
      <path d="M866 452 Q882 466 878 488" stroke-width="2.5"/>
      <path d="M858 500 Q866 530 852 552" stroke-width="1.6" opacity=".6"/>
      <path d="M884 574 Q904 590 930 592" stroke-width="2"/>
      <path d="M876 640 Q894 642 894 660" stroke-width="1.6" opacity=".6"/>
      <path d="M842 440 Q848 444 846 452" stroke-width="1.4" opacity=".5"/>
    </g>
  </g>

  <!-- floating dust in light -->
  <g fill="#ffd9a3">
    <circle class="dust" cx="1010" cy="540" r="1.6"/>
    <circle class="dust" cx="1040" cy="560" r="1.2" style="animation-delay:-3s"/>
    <circle class="dust" cx="980" cy="520" r="1.4" style="animation-delay:-5s"/>
    <circle class="dust" cx="1025" cy="505" r="1" style="animation-delay:-7s"/>
    <circle class="dust" cx="960" cy="560" r="1.3" style="animation-delay:-2s"/>
  </g>

  <!-- long shadow of the girl on floor -->
  <path d="M780 758 L900 758 L720 830 L540 830Z" fill="#000" opacity=".35"/>
</svg>
</div>
<div class="shade"></div>
</div>
`;

// ============================================================
// Итоги раунда 4: Герман
// ============================================================
export const MANOR_RESULT_4_HTML = `
<style>
.mn-r4{position:absolute;inset:0;overflow:hidden}
.mn-r4 *{margin:0;padding:0;box-sizing:border-box}
.mn-r4,.mn-r4{min-height:100%;background:#0c0908;color:#e9e1d6;font-family:'Inter',sans-serif;overflow-x:hidden}
.mn-r4 .scene{position:absolute;left:0;right:0;bottom:0;width:100%;height:62vh;min-height:340px}
.mn-r4 .win{fill:#d98a4a}
.mn-r4 .win.dim{fill:#2a1d16}
.mn-r4 .flicker{animation:flick 4s infinite}
@keyframes flick{0%,100%{opacity:.85}45%{opacity:.6}48%{opacity:.95}52%{opacity:.4}55%{opacity:.8}}
.mn-r4 .glow{filter:url(#soft)}
.mn-r4 .fog{position:absolute;left:-20%;width:140%;height:40vh;bottom:-6vh;
            background:radial-gradient(ellipse at 30% 60%,rgba(70,58,52,.35),transparent 60%),
                       radial-gradient(ellipse at 75% 70%,rgba(70,58,52,.3),transparent 55%);
            filter:blur(20px);animation:fog 40s ease-in-out infinite alternate}
.mn-r4 .fog.f2{bottom:4vh;opacity:.6;animation-duration:60s;animation-direction:alternate-reverse}
@keyframes fog{from{transform:translateX(-4%)}to{transform:translateX(4%)}}
.mn-r4 #rain{position:absolute;inset:0;width:100%;height:100%}
.mn-r4 .flash{position:absolute;inset:0;background:#cfc6bb;opacity:0;mix-blend-mode:soft-light}
.mn-r4 .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,transparent 35%,rgba(5,3,3,.85) 100%)}
.mn-r4 .grain{position:absolute;inset:-50%;opacity:.07;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            animation:grain 1s steps(4) infinite}
@keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}100%{transform:translate(0,0)}}
.mn-r4 .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,9,8,.55) 0%,rgba(12,9,8,.25) 40%,rgba(12,9,8,.1) 100%)}
</style>
<div class="mn-r4">
<svg class="scene" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMax slice">
            <defs>
                <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
                <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#1a1310"/><stop offset="1" stop-color="#080605"/>
                </linearGradient>
            </defs>
            <!-- far shore -->
            <path d="M0 420 Q200 395 420 410 T880 405 T1300 400 T1600 410 V520 H0Z" fill="#110c0a"/>
            <!-- far trees -->
            <path d="M0 420 C40 360 80 380 110 330 C140 370 170 340 200 380 C230 350 260 360 300 410 Z" fill="#0d0908"/>
            <path d="M1250 410 C1290 340 1330 370 1360 320 C1400 360 1430 330 1470 370 C1510 340 1560 360 1600 390 V420Z" fill="#0d0908"/>

            <g fill="#0a0706">
                <!-- orangery -->
                <path d="M350 470 V420 Q415 370 480 420 V470Z"/>
                <!-- left tower -->
                <rect x="480" y="250" width="100" height="220"/>
                <polygon points="470,252 530,150 590,252"/>
                <rect x="526" y="120" width="4" height="34"/>
                <!-- main body -->
                <rect x="580" y="300" width="460" height="170"/>
                <polygon points="565,302 800,228 1055,302"/>
                <rect x="640" y="240" width="22" height="50"/>
                <rect x="950" y="245" width="22" height="50"/>
                <!-- clock tower -->
                <rect x="760" y="170" width="80" height="140"/>
                <polygon points="750,172 800,100 850,172"/>
                <!-- right wing -->
                <rect x="1040" y="340" width="170" height="130"/>
                <polygon points="1030,342 1120,300 1220,342"/>
                <!-- gates & fence -->
                <rect x="250" y="440" width="1100" height="3"/>
                <rect x="1260" y="410" width="12" height="60"/>
                <rect x="1320" y="410" width="12" height="60"/>
            </g>
            <g fill="#0a0706" id="fence"></g>

            <!-- clock stopped at 00:14 -->
            <circle cx="800" cy="215" r="20" fill="#241913"/>
            <circle cx="800" cy="215" r="20" fill="none" stroke="#5a3e2c" stroke-width="2"/>
            <line x1="800" y1="215" x2="800" y2="203" stroke="#c8643c" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="800" y1="215" x2="815" y2="209" stroke="#c8643c" stroke-width="1.6" stroke-linecap="round"/>

            <!-- orangery glow -->
            <path class="win flicker glow" d="M365 468 V425 Q415 385 465 425 V468Z" opacity=".35"/>
            <path class="win flicker" d="M365 468 V425 Q415 385 465 425 V468Z" opacity=".22"/>
            <g id="windows"></g>

            <!-- water / reflection -->
            <rect x="0" y="470" width="1600" height="50" fill="url(#water)"/>
            <g id="reflect" opacity=".12"></g>

            <!-- foreground trees -->
            <path d="M0 520 V250 C30 230 50 270 70 240 C100 280 120 250 150 300 C170 330 190 320 210 380 C230 420 240 470 260 520Z" fill="#050303"/>
            <path d="M1600 520 V220 C1570 200 1550 250 1520 230 C1490 270 1470 250 1440 300 C1420 340 1390 360 1380 420 C1370 470 1360 500 1350 520Z" fill="#050303"/>
        </svg>

        <div class="fog"></div>
        <div class="fog f2"></div>
        <canvas id="rain"></canvas>
        <div class="flash" id="flash"></div>
        <div class="shade"></div>
        <div class="vignette"></div>
        <div class="grain"></div>
    </div>
</div>
`;

// ============================================================
// Разгадка: Павел (убийца)
// ============================================================
export const MANOR_END_HTML = `
<style>
.mn-end{position:absolute;inset:0;overflow:hidden}
.mn-end *{margin:0;padding:0;box-sizing:border-box}
.mn-end,.mn-end{height:100%;background:#0a0807;color:#e9e1d6;font-family:'Inter',sans-serif;overflow:hidden}
.mn-end .scene{position:fixed;inset:0;width:100%;height:100%;display:block}
.mn-end .vignette{position:fixed;inset:0;pointer-events:none;
            background:radial-gradient(ellipse at 60% 55%,transparent 35%,rgba(5,3,2,.55) 75%,rgba(3,2,1,.9) 100%),
            linear-gradient(to bottom,rgba(8,6,5,.85) 0%,rgba(8,6,5,.25) 30%,transparent 50%)}
.mn-end .card{margin-top:38px;padding:34px 30px;border-radius:14px;background:rgba(22,19,17,.82);border:1px solid rgba(233,225,214,.1);backdrop-filter:blur(4px);transition:opacity .35s,transform .35s;max-width:1200px}
.mn-end .card.hidden{opacity:0;transform:translateY(-10px);pointer-events:none}
@keyframes steam{0%{opacity:0;transform:translateY(0)}30%{opacity:.35}100%{opacity:0;transform:translateY(-70px)}}
.mn-end .steam path{animation:steam 5s ease-out infinite}
.mn-end .steam path:nth-child(2){animation-delay:1.6s}
.mn-end .steam path:nth-child(3){animation-delay:3.2s}
@keyframes flicker{0%,100%{opacity:1}47%{opacity:1}48%{opacity:.75}50%{opacity:1}}
.mn-end .bulb{animation:flicker 6s infinite}
@keyframes drip{0%{transform:translateY(0);opacity:.8}100%{transform:translateY(40px);opacity:0}}
.mn-end .drip{animation:drip 1.8s ease-in infinite}
.mn-end .drip:nth-of-type(2){animation-delay:.6s}
.mn-end .drip:nth-of-type(3){animation-delay:1.2s}
@keyframes twinkle{0%,100%{opacity:.25}50%{opacity:.9}}
</style>
<div class="mn-end">
<svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#07070b"/>
            <stop offset=".55" stop-color="#14121a"/>
            <stop offset="1" stop-color="#231b18"/>
        </linearGradient>
        <radialGradient id="moonGlow">
            <stop offset="0" stop-color="#e8dcc0" stop-opacity=".35"/>
            <stop offset=".4" stop-color="#b9ad96" stop-opacity=".1"/>
            <stop offset="1" stop-color="#b9ad96" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="moonFace" cx=".4" cy=".4">
            <stop offset="0" stop-color="#f3ead4"/>
            <stop offset="1" stop-color="#cbbd9e"/>
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#110f0d"/>
            <stop offset="1" stop-color="#070605"/>
        </linearGradient>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#1a1714"/>
            <stop offset="1" stop-color="#14110f"/>
        </linearGradient>
        <linearGradient id="garageIn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#5a3620"/>
            <stop offset=".5" stop-color="#3a2415"/>
            <stop offset="1" stop-color="#1c120b"/>
        </linearGradient>
        <linearGradient id="spill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#d99a5c" stop-opacity=".32"/>
            <stop offset="1" stop-color="#d99a5c" stop-opacity="0"/>
        </linearGradient>
        <radialGradient id="bulbGlow">
            <stop offset="0" stop-color="#ffd9a0" stop-opacity=".9"/>
            <stop offset=".25" stop-color="#e8a45f" stop-opacity=".35"/>
            <stop offset="1" stop-color="#e8a45f" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2a2622"/>
            <stop offset=".45" stop-color="#15120f"/>
            <stop offset="1" stop-color="#0a0807"/>
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#3b3a44"/>
            <stop offset="1" stop-color="#121116"/>
        </linearGradient>
        <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
        <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
        <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
            <feColorMatrix values="0 0 0 0 .6  0 0 0 0 .55  0 0 0 0 .5  0 0 0 .08 0"/>
        </filter>
        <pattern id="fence" width="14" height="40" patternUnits="userSpaceOnUse">
            <rect x="6" y="4" width="2" height="36" fill="#090808"/>
            <path d="M7 0 L10 5 L4 5 Z" fill="#090808"/>
        </pattern>
    </defs>

    <!-- Небо -->
    <rect width="1600" height="900" fill="url(#sky)"/>
    <g id="stars"></g>

    <!-- Луна -->
    <circle cx="1270" cy="170" r="230" fill="url(#moonGlow)"/>
    <circle cx="1270" cy="170" r="54" fill="url(#moonFace)"/>
    <g fill="#b3a585" opacity=".45">
        <circle cx="1252" cy="155" r="10"/>
        <circle cx="1288" cy="188" r="7"/>
        <circle cx="1280" cy="150" r="4"/>
        <circle cx="1246" cy="190" r="5"/>
    </g>

    <!-- Облака -->
    <g filter="url(#blur6)" opacity=".55">
        <ellipse cx="1180" cy="210" rx="170" ry="10" fill="#2a2630"/>
        <ellipse cx="1360" cy="235" rx="120" ry="8" fill="#2a2630"/>
        <ellipse cx="420" cy="140" rx="220" ry="12" fill="#1d1a22"/>
    </g>

    <!-- Деревья вдали -->
    <path d="M0 590 Q30 520 70 545 Q100 480 150 525 Q190 470 230 520 L230 610 L0 610 Z
             M840 610 L840 520 Q880 470 920 510 Q960 450 1010 505 Q1050 470 1090 520 Q1120 500 1150 540 L1150 610 Z"
          fill="#0d0c0f"/>

    <!-- Особняк -->
    <g fill="#110f14">
        <rect x="290" y="440" width="560" height="175"/>
        <path d="M270 445 L400 380 L520 380 L520 445 Z"/>
        <path d="M620 445 L620 380 L740 380 L870 445 Z"/>
        <rect x="500" y="330" width="140" height="285"/>
        <path d="M490 335 L570 235 L650 335 Z"/>
        <rect x="566" y="205" width="8" height="32"/>
        <rect x="330" y="345" width="22" height="50"/>
        <rect x="780" y="350" width="22" height="50"/>
        <rect x="236" y="480" width="70" height="135"/>
        <path d="M228 484 L271 440 L314 484 Z"/>
        <rect x="834" y="480" width="70" height="135"/>
        <path d="M826 484 L869 440 L912 484 Z"/>
    </g>
    <!-- лунный контур крыш -->
    <path d="M490 335 L570 235 L650 335 M620 380 L740 380 L870 445 M826 484 L869 440 L912 484" stroke="#8a806e" stroke-opacity=".35" stroke-width="1.5" fill="none"/>
    <!-- окна -->
    <g fill="#1c1920">
        <rect x="320" y="470" width="22" height="38" rx="11"/>
        <rect x="370" y="470" width="22" height="38" rx="11"/>
        <rect x="420" y="470" width="22" height="38" rx="11"/>
        <rect x="690" y="470" width="22" height="38" rx="11"/>
        <rect x="790" y="470" width="22" height="38" rx="11"/>
        <rect x="320" y="540" width="22" height="42"/>
        <rect x="420" y="540" width="22" height="42"/>
        <rect x="690" y="540" width="22" height="42"/>
        <rect x="740" y="540" width="22" height="42"/>
        <rect x="790" y="540" width="22" height="42"/>
        <rect x="258" y="510" width="26" height="40"/>
        <rect x="856" y="510" width="26" height="40"/>
        <rect x="530" y="390" width="22" height="40" rx="11"/>
    </g>
    <g fill="#c98a4a">
        <rect x="740" y="470" width="22" height="38" rx="11" opacity=".75"/>
        <rect x="370" y="540" width="22" height="42" opacity=".55"/>
        <rect x="588" y="390" width="22" height="40" rx="11" opacity=".9"/>
    </g>
    <g fill="#c98a4a" filter="url(#blur6)" opacity=".4">
        <circle cx="751" cy="489" r="18"/>
        <circle cx="599" cy="410" r="20"/>
    </g>
    <!-- дверь -->
    <path d="M550 615 L550 560 Q570 540 590 560 L590 615 Z" fill="#0a090c"/>

    <!-- Земля -->
    <rect y="610" width="1600" height="290" fill="url(#ground)"/>
    <rect x="0" y="604" width="1600" height="40" fill="url(#fence)"/>
    <rect x="0" y="608" width="1600" height="2" fill="#090808"/>
    <!-- подъездная дорожка -->
    <path d="M540 644 L600 644 Q700 720 1180 800 L1600 830 L1600 900 L420 900 Q700 780 540 644 Z" fill="url(#road)"/>

    <!-- Гараж -->
    <g>
        <path d="M1150 480 L1375 400 L1600 480 L1600 840 L1150 840 Z" fill="#15110f"/>
        <path d="M1150 480 L1375 400 L1600 480" stroke="#8a806e" stroke-opacity=".35" stroke-width="2" fill="none"/>
        <path d="M1130 486 L1375 396 L1620 486" stroke="#0b0908" stroke-width="10" fill="none"/>
        <rect x="1205" y="580" width="340" height="260" fill="url(#garageIn)"/>
        <!-- полки и инструменты -->
        <g fill="#1a110b" opacity=".9">
            <rect x="1440" y="640" width="90" height="5"/>
            <rect x="1440" y="700" width="90" height="5"/>
            <rect x="1450" y="615" width="16" height="25"/>
            <rect x="1475" y="622" width="22" height="18"/>
            <rect x="1455" y="676" width="30" height="24"/>
            <rect x="1225" y="620" width="70" height="55" opacity=".6"/>
            <path d="M1240 632 L1240 660 M1255 630 L1255 664 M1272 634 L1272 656" stroke="#120b07" stroke-width="3"/>
            <rect x="1470" y="770" width="46" height="70"/>
        </g>
        <!-- лампа -->
        <line x1="1375" y1="580" x2="1375" y2="605" stroke="#0b0908" stroke-width="2"/>
        <g class="bulb">
            <circle cx="1375" cy="612" r="140" fill="url(#bulbGlow)"/>
            <circle cx="1375" cy="612" r="6" fill="#fff0cf"/>
        </g>
        <!-- поднятая дверь -->
        <rect x="1198" y="572" width="354" height="14" fill="#221a15"/>
        <rect x="1198" y="584" width="354" height="3" fill="#0b0908"/>
        <!-- рамка проёма -->
        <path d="M1198 840 L1198 572 L1552 572 L1552 840" stroke="#0b0908" stroke-width="8" fill="none"/>
        <!-- окошко -->
        <circle cx="1375" cy="470" r="18" fill="#0b0908"/>
        <circle cx="1375" cy="470" r="14" fill="#4a2e1b" opacity=".8"/>
    </g>
    <!-- свет из гаража -->
    <path d="M1205 840 L1545 840 L1640 900 L860 900 Z" fill="url(#spill)"/>
    <path d="M1205 830 L1100 900 L860 900 L1205 820 Z" fill="#d99a5c" opacity=".05"/>

    <!-- Шланг -->
    <path d="M1300 838 Q1250 870 1180 858 Q1120 848 1150 820 Q1170 800 1112 790" stroke="#2c3a2c" stroke-width="5" fill="none" stroke-linecap="round"/>

    <!-- Лужи -->
    <ellipse cx="820" cy="850" rx="210" ry="14" fill="#221e1c" opacity=".9"/>
    <ellipse cx="820" cy="850" rx="140" ry="6" fill="#8a806e" opacity=".12"/>
    <ellipse cx="1120" cy="860" rx="90" ry="9" fill="#2a1f17" opacity=".9"/>
    <ellipse cx="1130" cy="860" rx="50" ry="3" fill="#d99a5c" opacity=".25"/>

    <!-- Машина -->
    <g transform="translate(-60,0)">
        <ellipse cx="880" cy="842" rx="270" ry="10" fill="#050404" opacity=".8"/>
        <path d="M640,790 L645,760 Q650,740 690,735 L780,728 Q810,690 860,680 L980,678 Q1020,680 1050,722 L1110,730 Q1130,735 1132,760 L1134,795 Q1130,805 1115,805 L1075,805 A45,45 0 0 0 985,805 L785,805 A45,45 0 0 0 695,805 L655,805 Q640,803 640,790 Z" fill="url(#carBody)"/>
        <path d="M800,728 Q825,695 862,690 L915,688 L915,728 Z" fill="url(#glass)"/>
        <path d="M928,688 L978,688 Q1010,692 1035,726 L928,728 Z" fill="url(#glass)"/>
        <!-- блики луны и лампы -->
        <path d="M690,737 L780,730 Q810,692 860,682 L980,680 Q1020,682 1050,724" stroke="#b8ae9a" stroke-opacity=".45" stroke-width="1.5" fill="none"/>
        <path d="M1050,724 L1110,732 Q1130,737 1132,762 L1133,795" stroke="#e0a56a" stroke-opacity=".7" stroke-width="2" fill="none"/>
        <path d="M660 770 L1120 770" stroke="#3d3630" stroke-width="1"/>
        <path d="M830 704 L850 696" stroke="#ffffff" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>
        <rect x="1118" y="752" width="14" height="10" rx="3" fill="#c98a4a" opacity=".6"/>
        <rect x="642" y="755" width="10" height="12" rx="3" fill="#6b1d17"/>
        <line x1="900" y1="760" x2="920" y2="760" stroke="#3d3630" stroke-width="3" stroke-linecap="round"/>
        <!-- колёса -->
        <g>
            <circle cx="740" cy="805" r="38" fill="#080706"/>
            <circle cx="740" cy="805" r="18" fill="#1e1b18"/>
            <circle cx="740" cy="805" r="5" fill="#3a342e"/>
            <circle cx="1030" cy="805" r="38" fill="#080706"/>
            <circle cx="1030" cy="805" r="18" fill="#2a211a"/>
            <circle cx="1030" cy="805" r="5" fill="#5a4535"/>
        </g>
        <!-- пена -->
        <g fill="#ddd6ca" opacity=".75">
            <circle cx="1070" cy="742" r="9"/><circle cx="1084" cy="738" r="7"/><circle cx="1060" cy="748" r="6"/>
            <circle cx="1098" cy="746" r="6"/><circle cx="1076" cy="752" r="5"/>
            <circle cx="960" cy="690" r="5"/><circle cx="972" cy="688" r="4"/>
        </g>
        <!-- капли -->
        <g fill="#b8ae9a">
            <ellipse class="drip" cx="1100" cy="808" rx="1.5" ry="3"/>
            <ellipse class="drip" cx="1070" cy="810" rx="1.5" ry="3"/>
            <ellipse class="drip" cx="880" cy="808" rx="1.5" ry="3"/>
        </g>
    </g>

    <!-- Павел -->
    <g>
        <circle cx="1100" cy="660" r="14" fill="#0b0908"/>
        <path d="M1086 674 Q1100 668 1114 674 L1120 748 L1082 748 Z" fill="#0b0908"/>
        <path d="M1090 690 Q1070 700 1058 722" stroke="#0b0908" stroke-width="10" fill="none" stroke-linecap="round"/>
        <rect x="1044" y="716" width="18" height="12" rx="3" fill="#b88a3e"/>
        <path d="M1114 690 Q1122 720 1128 740" stroke="#0b0908" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M1084 746 L1080 830 L1094 830 L1100 756 L1104 830 L1118 830 L1118 746 Z" fill="#0b0908"/>
        <!-- контровой свет -->
        <path d="M1110 648 Q1116 660 1110 672 M1116 678 L1121 746 M1118 750 L1118 828" stroke="#e0a56a" stroke-opacity=".75" stroke-width="2" fill="none"/>
        <path d="M1086 650 Q1090 646 1098 646" stroke="#b8ae9a" stroke-opacity=".4" stroke-width="1.5" fill="none"/>
    </g>

    <!-- Ведро -->
    <path d="M1135 800 L1175 800 L1170 838 L1140 838 Z" fill="#2b2622"/>
    <path d="M1170 800 L1165 838" stroke="#e0a56a" stroke-opacity=".6" stroke-width="2"/>
    <ellipse cx="1155" cy="800" rx="20" ry="4" fill="#ddd6ca" opacity=".7"/>
    <path d="M1137 800 Q1155 780 1173 800" stroke="#3d3630" stroke-width="2" fill="none"/>

    <!-- Слив с паром (тёплая вода) -->
    <ellipse cx="1000" cy="872" rx="34" ry="8" fill="#050404"/>
    <g stroke="#2a2522" stroke-width="2">
        <line x1="978" y1="872" x2="1022" y2="872"/>
        <line x1="990" y1="866" x2="990" y2="878"/>
        <line x1="1000" y1="865" x2="1000" y2="879"/>
        <line x1="1010" y1="866" x2="1010" y2="878"/>
    </g>
    <g class="steam" stroke="#cfc6b8" stroke-width="3" fill="none" stroke-linecap="round" filter="url(#blur2)">
        <path d="M990 865 Q980 850 992 838 Q1004 826 994 812"/>
        <path d="M1004 865 Q1014 848 1002 836 Q992 822 1006 808"/>
        <path d="M1014 866 Q1004 852 1016 840"/>
    </g>

    <!-- Зерно -->
    <rect width="1600" height="900" filter="url(#grain)"/>
</svg>
<div class="vignette"></div>
</div>
`;

