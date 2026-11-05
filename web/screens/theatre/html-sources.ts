// Фоны сюжета «Финальный занавес» (макеты из архива «Сюжеты 2 и 3»).
// Только слой фона; анимации — в ./effects.ts. Стили ограничены корневым классом сцены.

// ============================================================
// INTRO: Финальный занавес (начало)
// ============================================================
export const THEATRE_INTRO_HTML = `
<style>
.th-intro{--bg:#0c0908;
            --text:#ece4da;
            --muted:#a39a90;
            --accent:#c65d3f;
            --line:rgba(236,228,218,.09);
            --card:rgba(18,13,12,.84);}
.th-intro *{box-sizing:border-box;margin:0;padding:0}
.th-intro,.th-intro{min-height:100%}
.th-intro{background:var(--bg);
            color:var(--text);
            font-family:'Inter',sans-serif;
            line-height:1.55;
            overflow-x:hidden;
            min-height:100vh;}
.th-intro .scene{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.th-intro .scene .base{position:absolute;inset:0;
            background:
                radial-gradient(120% 80% at 50% 110%, #1a0f0c 0%, transparent 60%),
                radial-gradient(80% 60% at 50% 0%, #1b1311 0%, #0c0908 70%);}
.th-intro .scene .wall{position:absolute;inset:0;
            background:repeating-linear-gradient(90deg, rgba(255,255,255,.012) 0 1px, transparent 1px 140px);
            opacity:.9;}
.th-intro .stage{position:absolute;left:50%;top:0;transform:translateX(-50%);width:min(1600px,96vw);height:62vh}
.th-intro .arch{position:absolute;inset:0;background:linear-gradient(180deg,#130b09,#0d0807)}
.th-intro .arch::before{content:"";position:absolute;inset:14px 22px 0;
            border:1px solid rgba(200,160,110,.07);border-bottom:none;border-radius:8px 8px 0 0;}
.th-intro .drape{position:absolute;left:44px;right:44px;top:30px;bottom:0;overflow:hidden;
            background:
                linear-gradient(180deg, rgba(0,0,0,.6), transparent 25%, transparent 60%, rgba(0,0,0,.7)),
                radial-gradient(55% 70% at 50% 50%, rgba(255,190,140,.09), transparent 70%),
                repeating-linear-gradient(90deg,#2a0a0b 0,#4a1215 18px,#5a191a 28px,#3a0e10 42px,#1e0607 60px);
            filter:brightness(.62) saturate(.85);
            animation:drape 11s ease-in-out infinite;}
.th-intro .drape::after{content:"";position:absolute;top:0;bottom:0;left:50%;width:18px;transform:translateX(-50%);
            background:linear-gradient(90deg,transparent,rgba(0,0,0,.75),transparent);}
@keyframes drape{0%,100%{background-position:0 0,0 0,0 0}50%{background-position:0 0,0 0,5px 0}}
.th-intro .pelmet{position:absolute;left:30px;right:30px;top:18px;height:72px;
            background:
                radial-gradient(60px 36px at 60px 0, #3d0e10 98%, transparent 100%),
                linear-gradient(180deg,#240708,#3d0e10);
            background-size:120px 72px, 100% 36px;
            background-repeat:repeat-x,no-repeat;
            filter:brightness(.6);}
.th-intro .apron{position:absolute;left:50%;top:62vh;transform:translateX(-50%);
            width:min(1700px,104vw);height:4.5vh;
            background:linear-gradient(180deg,#24160f,#0f0907);
            clip-path:polygon(3% 0,97% 0,100% 100%,0 100%);}
.th-intro .footlights{position:absolute;left:50%;top:calc(62vh - 3px);transform:translateX(-50%);
            width:min(1480px,88vw);height:8px;
            background:radial-gradient(circle, rgba(255,200,140,.32) 0 2px, transparent 3px) 0 0/64px 8px repeat-x;
            filter:blur(.3px);}
.th-intro #hall{position:absolute;inset:0;width:100%;height:100%}
.th-intro .shade{position:absolute;inset:0;
            background:linear-gradient(90deg, rgba(10,7,6,.55), rgba(10,7,6,.2) 50%, rgba(10,7,6,.5));}
.th-intro .spot{position:absolute;top:-10vh;left:50%;width:90vw;height:130vh;transform:translateX(-50%);
            background:conic-gradient(from 180deg at 50% 0%, transparent 162deg, rgba(255,214,170,.04) 172deg, rgba(255,222,185,.065) 180deg, rgba(255,214,170,.04) 188deg, transparent 198deg);
            -webkit-mask-image:linear-gradient(180deg,#000 30%,transparent 95%);
            mask-image:linear-gradient(180deg,#000 30%,transparent 95%);
            animation:flicker 7s infinite;}
@keyframes flicker{
            0%,100%{opacity:1}
            42%{opacity:1}43%{opacity:.55}44%{opacity:1}
            46%{opacity:.7}47%{opacity:1}
            80%{opacity:.9}
        }
.th-intro #dust{position:absolute;inset:0;width:100%;height:100%}
.th-intro .grain{position:absolute;inset:-50%;
            background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>");
            opacity:.07;
            animation:grain 1s steps(4) infinite;}
@keyframes grain{
            0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}
            50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}100%{transform:translate(0,0)}
        }
.th-intro .vignette{position:absolute;inset:0;
            background:radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(0,0,0,.75) 100%);}
</style>
<div class="th-intro">
<div class="scene" aria-hidden="true">
        <div class="base"></div>
        <div class="wall"></div>
        <div class="stage">
            <div class="arch"></div>
            <div class="drape"></div>
            <div class="pelmet"></div>
        </div>
        <div class="apron"></div>
        <div class="footlights"></div>
        <div class="spot"></div>
        <canvas id="hall"></canvas>
        <canvas id="dust"></canvas>
        <div class="shade"></div>
        <div class="vignette"></div>
        <div class="grain"></div>
    </div>
</div>
`;

// ============================================================
// CHAPTER 1: Овация
// ============================================================
export const THEATRE_CH1_HTML = `
<style>
.th-ch1 *{box-sizing:border-box;margin:0;padding:0}
.th-ch1{--accent:#c45a3c;--text:#ece4da;--muted:#8a7f76;--line:rgba(236,228,218,.1)}
.th-ch1,.th-ch1{height:100%}
.th-ch1{background:#0c0908;color:var(--text);font-family:Inter,sans-serif;overflow-x:hidden;min-height:100vh}
.th-ch1 .scene{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.th-ch1 .wall{position:absolute;inset:0;
            background:
              radial-gradient(ellipse 55% 60% at 74% 42%, rgba(120,62,30,.28), transparent 70%),
              radial-gradient(ellipse 80% 50% at 50% 110%, rgba(60,20,14,.5), transparent 70%),
              repeating-linear-gradient(90deg, rgba(255,255,255,.012) 0 2px, transparent 2px 90px),
              linear-gradient(180deg,#140e0c 0%,#0e0a09 60%,#0a0706 100%);}
.th-ch1 .wall::after{content:"";position:absolute;inset:0;opacity:.05;
            background-image:radial-gradient(circle at 50% 50%, #d9a77a 1px, transparent 1.5px);
            background-size:34px 34px}
.th-ch1 .floor{position:absolute;left:0;right:0;bottom:0;height:22vh;
            background:linear-gradient(180deg,rgba(0,0,0,0),rgba(20,10,8,.9) 30%,#070504);
            border-top:1px solid rgba(160,90,50,.06)}
.th-ch1 .curtain{position:absolute;top:-2vh;bottom:-2vh;width:13vw;min-width:90px;
            background:
              repeating-linear-gradient(90deg,
                #2a0a0b 0px,#4a1214 18px,#5c1719 26px,#3a0e10 40px,#1c0607 56px);
            filter:saturate(.8) brightness(.75)}
.th-ch1 .curtain.left{left:-3vw;transform-origin:top left;animation:sway 9s ease-in-out infinite;
            -webkit-mask:linear-gradient(90deg,#000 55%,transparent);mask:linear-gradient(90deg,#000 55%,transparent)}
.th-ch1 .curtain.right{right:-3vw;transform-origin:top right;animation:sway 11s ease-in-out infinite reverse;
            -webkit-mask:linear-gradient(270deg,#000 55%,transparent);mask:linear-gradient(270deg,#000 55%,transparent)}
.th-ch1 .curtain::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.6),transparent 30%,transparent 70%,rgba(0,0,0,.8))}
.th-ch1 .valance{position:absolute;top:0;left:0;right:0;height:46px;
            background:repeating-radial-gradient(ellipse at 50% -10px,#3a0e10 0 20px,#1a0506 20px 44px);
            background-size:88px 60px;opacity:.55;
            -webkit-mask:linear-gradient(180deg,#000,transparent);mask:linear-gradient(180deg,#000,transparent)}
@keyframes sway{0%,100%{transform:skewX(0)}50%{transform:skewX(.6deg)}}
.th-ch1 .glow{position:absolute;right:4vw;top:8vh;width:60vw;height:90vh;
            background:radial-gradient(ellipse 50% 45% at 70% 40%, rgba(255,184,110,.09), transparent 70%);
            animation:breathe 6s ease-in-out infinite}
@keyframes breathe{0%,100%{opacity:1}50%{opacity:.75}}
.th-ch1 .vanity{position:absolute;right:9vw;top:17vh;width:340px;height:430px}
.th-ch1 .frame{position:absolute;inset:0;border-radius:8px;
            background:linear-gradient(145deg,#3b2a1c,#1c130c 60%,#2c1f14);
            box-shadow:0 30px 80px rgba(0,0,0,.7), inset 0 0 0 1px rgba(210,160,100,.12)}
.th-ch1 .glass{position:absolute;inset:38px;border-radius:3px;overflow:hidden;
            background:
              radial-gradient(ellipse at 40% 30%, rgba(210,190,170,.14), transparent 60%),
              linear-gradient(160deg,#27201d,#120e0d 70%);
            box-shadow:inset 0 0 40px rgba(0,0,0,.9)}
.th-ch1 .glass::before{content:"";position:absolute;inset:0;
            background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.06) 42%,transparent 48%)}
.th-ch1 .chair{position:absolute;left:50%;bottom:-10px;transform:translateX(-50%);width:120px;height:150px;
            background:radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,0,0,.55), transparent 70%),
                       linear-gradient(180deg,transparent 40%,rgba(0,0,0,.5));border-radius:60px 60px 0 0;opacity:.8}
.th-ch1 .cracks{position:absolute;inset:0;width:100%;height:100%}
.th-ch1 .bulb{position:absolute;width:16px;height:16px;border-radius:50%;
            background:radial-gradient(circle at 40% 35%,#fff6e0,#ffcf88 45%,#b36a2a 100%);
            box-shadow:0 0 10px 2px rgba(255,190,110,.35),0 0 28px 6px rgba(255,160,80,.12);
            transform:translate(-50%,-50%)}
.th-ch1 .bulb.dead{background:radial-gradient(circle at 40% 35%,#6d5c4c,#2a211b);box-shadow:none}
.th-ch1 .bulb.flicker{animation:flicker 4s infinite}
@keyframes flicker{
            0%,18%,22%,60%,64%,100%{opacity:1}
            20%,62%{opacity:.15}
            21%{opacity:.7}
            63%{opacity:.3}}
.th-ch1 .table{display:block;position:absolute;left:-40px;right:-40px;bottom:-34px;height:22px;border-radius:3px;
            background:linear-gradient(180deg,#2e2016,#140d08);box-shadow:0 20px 40px rgba(0,0,0,.8)}
.th-ch1 .champ{position:absolute;right:-6px;bottom:-12px;width:26px;height:64px}
.th-ch1 .champ .bowl{position:absolute;top:0;left:3px;width:20px;height:30px;border:1px solid rgba(255,240,220,.3);border-top:none;border-radius:0 0 10px 10px;
            background:linear-gradient(180deg,transparent 20%,rgba(230,190,110,.35) 22%)}
.th-ch1 .champ .stem{position:absolute;top:30px;left:12px;width:1px;height:22px;background:rgba(255,240,220,.3)}
.th-ch1 .champ .base{position:absolute;bottom:0;left:4px;width:18px;height:2px;border-radius:2px;background:rgba(255,240,220,.3)}
.th-ch1 .rose{position:absolute;left:10px;bottom:-14px;color:#5a1418;font-size:22px;transform:rotate(-70deg);opacity:.9}
.th-ch1 .shards{position:absolute;right:6vw;bottom:9vh;width:420px;height:60px}
.th-ch1 .shard{position:absolute;background:linear-gradient(135deg,rgba(255,230,200,.35),rgba(255,255,255,.04));
            clip-path:polygon(0 30%,60% 0,100% 70%,30% 100%)}
.th-ch1 #fx{position:absolute;inset:0;width:100%;height:100%}
.th-ch1 .vignette{position:absolute;inset:0;background:radial-gradient(ellipse 75% 70% at 55% 45%, transparent 40%, rgba(0,0,0,.85) 100%)}
.th-ch1 .grain{position:absolute;inset:-50%;opacity:.07;animation:grain 1s steps(4) infinite;
            background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
@keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}100%{transform:translate(0,0)}}
.th-ch1 .btn{background:var(--accent);color:#fff;border:none;font:600 15px Inter,sans-serif;padding:15px 24px;border-radius:8px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:background .25s,transform .25s}
.th-ch1 .btn i{color:#fff}
.th-ch1 .btn:hover{background:#d86a4a;transform:translateY(-1px)}
.th-ch1 .hint{font-size:13px;color:var(--muted)}
.th-ch1 .clues{max-width:720px;display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin-top:0;max-height:0;overflow:hidden;opacity:0;transition:all .5s ease}
.th-ch1 .clues.open{max-height:600px;opacity:1;margin-top:32px}
@media (max-width:980px){.th-ch1 .vanity{right:-60px;opacity:.35;transform:scale(.85)}
.th-ch1 .shards{opacity:.4}}
</style>
<div class="th-ch1">
<div class="scene">
        <div class="wall"></div>
        <div class="glow"></div>
        <div class="vanity" id="vanity">
            <div class="frame"></div>
            <div class="glass">
                <div class="chair"></div>
                <svg class="cracks" viewBox="0 0 264 354" preserveAspectRatio="none">
                    <g stroke="rgba(255,240,225,.38)" stroke-width="1" fill="none">
                        <path d="M150 150 L20 40"/><path d="M150 150 L90 0"/><path d="M150 150 L210 0"/>
                        <path d="M150 150 L264 90"/><path d="M150 150 L264 230"/><path d="M150 150 L190 354"/>
                        <path d="M150 150 L70 354"/><path d="M150 150 L0 250"/><path d="M150 150 L0 140"/>
                        <path d="M120 125 L140 110 L170 118 L182 145 L172 178 L140 186 L118 168 Z"/>
                        <path d="M85 95 L120 60 L185 70 L225 120 L220 200 L175 250 L110 245 L65 200 L60 130 Z" stroke="rgba(255,240,225,.18)"/>
                    </g>
                    <polygon points="140,110 170,118 182,145 150,150" fill="#0a0706"/>
                    <polygon points="118,168 140,186 150,150" fill="#0a0706" opacity=".8"/>
                </svg>
            </div>
            <div class="table"></div>
            <i class="fa-solid fa-spa rose"></i>
            <div class="champ"><div class="bowl"></div><div class="stem"></div><div class="base"></div></div>
        </div>
        <div class="floor"></div>
        <div class="shards" id="shards"></div>
        <canvas id="fx"></canvas>
        <div class="curtain left"></div>
        <div class="curtain right"></div>
        <div class="valance"></div>
        <div class="vignette"></div>
        <div class="grain"></div>
    </div>
</div>
`;

// ============================================================
// CHAPTER 2: Вычеркнутое имя
// ============================================================
export const THEATRE_CH2_HTML = `
<style>
.th-ch2{--bg:#0e0a08; --text:#ece3d8; --muted:#8f8177; --line:#2c221d; --accent:#c65a3e;}
.th-ch2 *{box-sizing:border-box;margin:0;padding:0}
.th-ch2,.th-ch2{height:100%}
.th-ch2{background:var(--bg);color:var(--text);font-family:Inter,sans-serif;overflow-x:hidden;min-height:100vh}
.th-ch2 .scene{position:fixed;inset:0;overflow:hidden;z-index:0;pointer-events:none}
.th-ch2 .backwall{position:absolute;inset:0;
            background:
              radial-gradient(ellipse 38% 52% at 70% 34%, rgba(214,150,90,.16), transparent 70%),
              repeating-linear-gradient(90deg, rgba(0,0,0,0) 0 46px, rgba(0,0,0,.30) 46px 50px, rgba(0,0,0,0) 50px 96px),
              radial-gradient(circle at 24px 30px, rgba(130,80,55,.10) 0 5px, transparent 6px) 0 0/48px 60px,
              linear-gradient(180deg,#110b09 0%,#1c1310 48%,#150e0b 76%,#0a0706 100%)}
.th-ch2 .wainscot{position:absolute;left:0;right:0;bottom:0;height:24vh;border-top:6px solid #22170f;
            background:
              linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,.7)),
              repeating-linear-gradient(90deg,#1a110c 0 150px,#0b0706 150px 154px)}
.th-ch2 .mirror{position:absolute;left:3vw;top:16vh;width:24vw;min-width:180px;height:40vh;border:14px solid #1a120e;border-radius:4px;
            background:linear-gradient(135deg,#0d0a09 0%,#16110f 40%,#0b0807 60%,#141010 100%);box-shadow:0 20px 40px rgba(0,0,0,.6)}
.th-ch2 .mirror::before{content:"";position:absolute;left:-10px;right:-10px;top:-24px;height:14px;
            background:radial-gradient(circle,#6b5238 0 5px,transparent 6px) 0 0/36px 14px repeat-x;opacity:.6}
.th-ch2 .mirror::after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,230,200,.04) 38%,transparent 46%)}
.th-ch2 .cord{position:absolute;left:70%;top:0;width:2px;height:6vh;transform:translateX(-50%);background:#070504}
.th-ch2 .bulb{position:absolute;left:70%;top:6vh;width:18px;height:24px;transform:translateX(-50%);border-radius:50% 50% 45% 45%;
            background:radial-gradient(circle at 50% 45%,#fff6e0,#f3c27e 40%,#b86a2e 80%);animation:flicker 7s infinite}
.th-ch2 .glow{position:absolute;left:70%;top:8vh;width:120vmin;height:120vmin;transform:translate(-50%,-50%);
            background:radial-gradient(circle,rgba(255,196,120,.30) 0,rgba(230,150,80,.10) 12%,rgba(200,110,60,.04) 30%,transparent 55%);
            animation:flicker 7s infinite;mix-blend-mode:screen}
@keyframes flicker{0%,100%{opacity:1}42%{opacity:1}43%{opacity:.72}44%{opacity:.95}45%{opacity:.8}46%{opacity:1}78%{opacity:.93}80%{opacity:1}}
.th-ch2 .poster{position:absolute;left:70%;top:13vh;transform:translateX(-50%) rotate(1.6deg);width:min(30vw,400px);min-width:260px;
            padding:clamp(22px,2.4vw,34px) clamp(20px,2.2vw,30px);color:#2a1d14;font-family:'Cormorant Garamond',serif;
            background:
              radial-gradient(circle at 82% 78%,rgba(120,80,40,.18) 0 30px,transparent 60px),
              radial-gradient(ellipse at 50% 0%,rgba(255,244,220,.25),transparent 60%),
              linear-gradient(172deg,#e4d3b3,#d0ba92 60%,#b9a077);
            box-shadow:0 18px 40px rgba(0,0,0,.65),0 2px 0 rgba(0,0,0,.2)}
.th-ch2 .poster::after{content:"";position:absolute;inset:0;pointer-events:none;
            background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(20,10,5,.42) 100%),linear-gradient(90deg,rgba(0,0,0,.12),transparent 12%,transparent 88%,rgba(0,0,0,.16))}
.th-ch2 .pin{position:absolute;left:50%;top:10px;width:16px;height:16px;transform:translateX(-50%);border-radius:50%;z-index:2;
            background:radial-gradient(circle at 35% 30%,#e98a6c,#c65a3e 45%,#6e2515);box-shadow:3px 5px 5px rgba(0,0,0,.45)}
.th-ch2 .p-top{text-align:center;font:600 clamp(9px,.75vw,10px) Inter,sans-serif;letter-spacing:.24em;color:#5a4130;margin-top:8px}
.th-ch2 .p-title{text-align:center;font-size:clamp(24px,2.3vw,32px);font-style:italic;font-weight:600;color:#2a1a10;margin-top:6px;line-height:1.1}
.th-ch2 .p-date{text-align:center;font-size:clamp(12px,1vw,14px);color:#5a4130;margin-top:4px}
.th-ch2 .p-orn{display:flex;align-items:center;gap:10px;margin:12px 0 6px}
.th-ch2 .p-orn span{flex:1;height:1px;background:#7a5c44}
.th-ch2 .p-orn i{font-size:7px;color:#7a3a26}
.th-ch2 .p-list{list-style:none}
.th-ch2 .p-list li{position:relative;display:grid;grid-template-columns:34px 1fr;align-items:baseline;padding:clamp(5px,.6vw,8px) 0;border-bottom:1px dotted rgba(70,45,28,.35)}
.th-ch2 .p-list .n{font-weight:600;font-size:clamp(13px,1.1vw,15px);color:#7a3a26}
.th-ch2 .p-list b{position:relative;display:inline-block;font-weight:600;font-size:clamp(16px,1.45vw,20px);color:#22160e;line-height:1.2}
.th-ch2 .p-list small{display:block;font-style:italic;font-size:clamp(12px,1vw,14px);color:#5c4432}
.th-ch2 .scratch{position:absolute;left:-5%;top:18%;width:110%;height:64%;overflow:visible}
.th-ch2 .hand{position:absolute;right:-6px;top:-10px;font-family:Caveat,cursive;font-weight:600;font-size:clamp(20px,1.8vw,26px);color:#35343a;transform:rotate(-6deg);opacity:.9}
.th-ch2 .p-foot{margin-top:12px;text-align:center;font-style:italic;font-size:clamp(11px,.9vw,13px);color:#5c4432}
.th-ch2 .crowd{position:absolute;left:40%;right:0;bottom:0;height:46vh}
.th-ch2 .crowd svg{width:100%;height:100%;display:block}
.th-ch2 .floorfog{position:absolute;left:0;right:0;bottom:0;height:18vh;background:linear-gradient(0deg,rgba(6,4,3,.9),transparent)}
.th-ch2 canvas#fx{position:absolute;inset:0;width:100%;height:100%}
.th-ch2 .shade{position:absolute;inset:0;background:
              linear-gradient(90deg,rgba(10,7,6,.92) 0%,rgba(10,7,6,.7) 35%,rgba(10,7,6,.1) 60%,transparent 100%),
              radial-gradient(ellipse at 60% 50%,transparent 40%,rgba(0,0,0,.75) 100%)}
.th-ch2 .grain{position:absolute;inset:-50%;opacity:.08;animation:grain 1.2s steps(4) infinite;
            background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
@keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}100%{transform:translate(0,0)}}
.th-ch2 .btn{display:inline-flex;align-items:center;gap:12px;padding:16px 24px;border:0;border-radius:8px;background:var(--accent);color:#fff;font:600 15px Inter,sans-serif;cursor:pointer;transition:background .25s,transform .25s}
.th-ch2 .btn:hover{background:#d8684a;transform:translateY(-1px)}
.th-ch2 .btn i{color:#fff}
.th-ch2 .clues{margin-top:40px;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;max-width:760px;
            max-height:0;overflow:hidden;opacity:0;transition:max-height .5s ease,opacity .4s ease}
.th-ch2 .clues.open{max-height:800px;opacity:1}
@media (max-width:720px){.th-ch2 .poster{left:74%;opacity:.45}
.th-ch2 .crowd{left:10%}
.th-ch2 .mirror{display:none}}
</style>
<div class="th-ch2">
<div class="scene" aria-hidden="true">
        <div class="backwall"></div>
        <div class="wainscot"></div>
        <div class="mirror"></div>
        <div class="glow"></div>
        <div class="cord"></div><div class="bulb"></div>
        <div class="poster">
            <span class="pin"></span>
            <div class="p-top">ТЕАТР «ГРАНД» · БОЛЬШАЯ СЦЕНА</div>
            <div class="p-title">Программа вечера</div>
            <div class="p-date">Суббота, 14 ноября · начало в 19:00</div>
            <div class="p-orn"><span></span><i class="fa-solid fa-diamond"></i><span></span></div>
            <ol class="p-list">
                <li><span class="n">I.</span><div><b>Аркадий Вельский</b><small>Пролог. Слово конферансье</small></div></li>
                <li><span class="n">II.</span><div><b>Софья Ренн</b><small>Романс «Ночные фиалки»</small></div></li>
                <li><span class="n">III.</span><div><b>Регина Алмазова<svg class="scratch" viewBox="0 0 200 20" preserveAspectRatio="none"><path d="M2 11 C40 6 80 14 120 9 S180 13 198 8 M4 14 C60 9 120 16 196 11" fill="none" stroke="#2b2a2e" stroke-width="1.8" stroke-linecap="round" opacity=".85"/></svg></b><small>Ария «Последний акт»</small></div><span class="hand">Вера Лесницкая</span></li>
                <li><span class="n">IV.</span><div><b>Лев Остроумов</b><small>Монолог из «Гамлета»</small></div></li>
                <li><span class="n">V.</span><div><b>Анна и Илья Гарт</b><small>Дуэт «Под часами»</small></div></li>
                <li><span class="n">VI.</span><div><b>Кордебалет «Гранд»</b><small>Финальный выход</small></div></li>
            </ol>
            <div class="p-foot">Дирекция оставляет за собой право замены исполнителей</div>
        </div>
        <canvas id="fx"></canvas>
        <div class="crowd"><svg id="crowd" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMax slice"></svg></div>
        <div class="floorfog"></div>
        <div class="shade"></div>
        <div class="grain"></div>
    </div>
</div>
`;

// ============================================================
// CHAPTER 3: Роль без дублёра
// ============================================================
export const THEATRE_CH3_HTML = `
<style>
.th-ch3 *{margin:0;padding:0;box-sizing:border-box}
.th-ch3{--bg:#0e0a09;--text:#efe6dc;--muted:#9d8f84;--accent:#c85f3f;--line:rgba(200,95,63,.28)}
.th-ch3,.th-ch3{height:100%}
.th-ch3{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;overflow-x:hidden;min-height:100vh}
.th-ch3 .scene{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none}
.th-ch3 .room{position:absolute;inset:0;background:
  radial-gradient(55% 55% at 68% 28%,#2c1b14 0%,#170f0c 55%,#0b0706 100%)}
.th-ch3 .wallpaper{position:absolute;left:0;right:0;top:0;bottom:43%;opacity:.55;
  background:repeating-linear-gradient(90deg,rgba(0,0,0,.35) 0 1px,transparent 1px 38px,rgba(200,95,63,.05) 38px 40px,transparent 40px 78px)}
.th-ch3 .molding{position:absolute;left:0;right:0;bottom:43%;height:8px;background:#1c120e;border-top:1px solid rgba(239,230,220,.06)}
.th-ch3 .floor{position:absolute;left:0;right:0;bottom:0;height:43%;background:linear-gradient(180deg,#140c09,#070504)}
.th-ch3 .curtain{position:absolute;left:0;top:0;bottom:0;width:90px;opacity:.5;
  background:repeating-linear-gradient(90deg,#1c0b09 0 14px,#2a100c 14px 24px,#160807 24px 34px);
  -webkit-mask-image:linear-gradient(90deg,#000,transparent);mask-image:linear-gradient(90deg,#000,transparent)}
.th-ch3 .doorset{position:absolute;left:60%;top:7%;bottom:43%;width:28vh}
.th-ch3 .frame{position:absolute;inset:0;border:1.4vh solid #1d130f;border-bottom:none;overflow:hidden;
  background:linear-gradient(180deg,#f2cf98 0%,#e2a86a 45%,#b77444 78%,#5e3520 100%);
  box-shadow:0 0 140px 30px rgba(232,160,99,.16)}
.th-ch3 .foyer-floor{position:absolute;left:0;right:0;bottom:0;height:20%;
  background:linear-gradient(180deg,#7a4a2c,#3a2014)}
.th-ch3 .bokeh{position:absolute;border-radius:50%;filter:blur(3px);
  background:radial-gradient(circle,rgba(255,248,225,.95),rgba(255,220,160,0) 70%)}
.th-ch3 .b1{width:5vh;height:5vh;left:12%;top:6%}
.th-ch3 .b2{width:3.5vh;height:3.5vh;left:55%;top:3%}
.th-ch3 .b3{width:4.5vh;height:4.5vh;left:74%;top:14%}
.th-ch3 .b4{width:2.5vh;height:2.5vh;left:34%;top:18%}
.th-ch3 .figure{position:absolute;bottom:14%;border-radius:40% 40% 10% 10%;background:rgba(40,22,14,.55);filter:blur(5px)}
.th-ch3 .f1{left:-4%;width:7vh;height:26vh}
.th-ch3 .f2{right:-2%;width:6vh;height:22vh}
.th-ch3 .pyramid{position:absolute;left:8%;right:8%;bottom:6%;filter:blur(1.3px)}
.th-ch3 .pyramid svg{display:block;width:100%;height:auto}
.th-ch3 .leaf{position:absolute;left:100%;top:-3%;bottom:-2%;width:10vh;
  background:linear-gradient(90deg,#2b1a12,#150d09);clip-path:polygon(0 3%,100% 0,100% 100%,0 98%)}
.th-ch3 .leaf::before{content:"";position:absolute;left:22%;right:14%;top:12%;height:30%;border:1px solid rgba(255,200,150,.08)}
.th-ch3 .leaf::after{content:"";position:absolute;left:18%;top:52%;width:.9vh;height:2.6vh;border-radius:3px;background:#6b4a33}
.th-ch3 .spill{position:absolute;left:calc(60% - 8vh);width:46vh;bottom:36%;height:10%;border-radius:50%;
  background:radial-gradient(ellipse,rgba(240,170,100,.28),transparent 70%)}
.th-ch3 .mirror{position:absolute;right:0;top:4%;bottom:43%;width:9vh;
  background:linear-gradient(90deg,#1c120e,#2a1a13);border-left:1px solid rgba(239,230,220,.06);
  display:flex;flex-direction:column;justify-content:space-around;align-items:flex-start;padding-left:2vh}
.th-ch3 .mirror span{width:2.6vh;height:2.6vh;border-radius:50%;
  background:radial-gradient(circle at 40% 35%,#fff6e2,#f0b870 70%);
  box-shadow:0 0 22px 6px rgba(255,200,130,.3)}
.th-ch3 .table{display:block;position:absolute;left:0;right:0;bottom:0;height:40%;
  background:
   linear-gradient(180deg,rgba(255,190,120,.10) 0%,transparent 30%),
   repeating-linear-gradient(177deg,rgba(0,0,0,.18) 0 2px,transparent 2px 11px),
   linear-gradient(180deg,#3a2217 0%,#24140d 45%,#120906 100%);
  border-top:1px solid rgba(255,200,150,.18)}
.th-ch3 .phoneglow{position:absolute;right:6%;bottom:0;width:70vh;height:34vh;border-radius:50%;
  background:radial-gradient(ellipse,rgba(255,238,215,.14),transparent 68%)}
.th-ch3 .tglass{position:absolute;right:1%;bottom:12%;height:48vh;filter:blur(1.1px)}
.th-ch3 .tglass svg{height:100%;width:auto;display:block}
.th-ch3 .plates{position:absolute;left:2%;bottom:3vh;display:flex;align-items:flex-end;gap:1vh;filter:blur(.9px)}
.th-ch3 .plate{height:40vh}
.th-ch3 .plate.cheese{height:36vh;margin-bottom:0;margin-left:-4vh}
.th-ch3 .plate svg{height:100%;width:auto;display:block}
.th-ch3 .phone-wrap{position:absolute;right:16%;bottom:-8vh;width:34vh;height:68vh;perspective:1100px}
.th-ch3 .phone{position:absolute;inset:0;border-radius:4.6vh;padding:1.2vh;
  background:linear-gradient(135deg,#232124,#060607);
  transform:rotateX(54deg) rotateZ(-18deg);transform-origin:50% 100%;
  box-shadow:0 4vh 6vh rgba(0,0,0,.7),inset 0 0 0 1px rgba(255,255,255,.08)}
.th-ch3 .screen{position:relative;height:100%;border-radius:3.6vh;overflow:hidden;padding:2vh 2.4vh;
  background:#f3ede4;color:#2a211c;font-family:'Inter',sans-serif}
.th-ch3 .screen::after{content:"";position:absolute;inset:0;
  background:linear-gradient(125deg,rgba(255,255,255,.35) 0%,transparent 35%,transparent 70%,rgba(255,220,180,.12) 100%)}
.th-ch3 .notch{position:absolute;left:50%;top:1.2vh;transform:translateX(-50%);width:9vh;height:2.4vh;border-radius:2vh;background:#0a0a0b}
.th-ch3 .status{display:flex;justify-content:space-between;align-items:center;font-size:1.5vh;font-weight:600;color:#2a211c}
.th-ch3 .status i{color:#2a211c;margin-left:.6vh;font-size:1.3vh}
.th-ch3 .navrow{display:flex;justify-content:space-between;align-items:center;margin-top:3vh;font-size:1.6vh;color:var(--accent)}
.th-ch3 .navrow .send{width:3.4vh;height:3.4vh;border-radius:50%;background:var(--accent);display:grid;place-items:center}
.th-ch3 .navrow .send i{color:#fff6ef;font-size:1.5vh}
.th-ch3 .draft-title{font-size:2.8vh;font-weight:600;margin:2vh 0 1.2vh;color:#1e1713}
.th-ch3 .field{display:flex;gap:1vh;align-items:center;padding:1.1vh 0;border-bottom:1px solid rgba(42,33,28,.12);font-size:1.5vh;color:#8a7c72}
.th-ch3 .field .blur{filter:blur(2.4px);color:#2a211c}
.th-ch3 .body{margin-top:1.8vh;font-size:1.65vh;line-height:1.65;color:#3a2f28;filter:blur(2.8px)}
.th-ch3 .body p{margin-bottom:1.2vh}
.th-ch3 .cursor{display:inline-block;width:2px;height:2vh;background:var(--accent);animation:blink 1s steps(2) infinite;margin-left:.5vh}
@keyframes blink{50%{opacity:0}}
.th-ch3 .saved{position:absolute;left:0;right:0;bottom:2.2vh;text-align:center;font:400 1.3vh 'JetBrains Mono',monospace;color:#9d8f84}
.th-ch3 .grain{position:absolute;inset:-50%;opacity:.07;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:grain 1s steps(4) infinite}
@keyframes grain{0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-1%)}}
.th-ch3 .vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 45% 45%,transparent 45%,rgba(0,0,0,.75) 100%)}
.th-ch3 .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,10,9,.85) 0%,rgba(14,10,9,.45) 45%,transparent 70%)}
.th-ch3 #dust{position:absolute;inset:0;width:100%;height:100%}
.th-ch3 .btn{display:inline-flex;align-items:center;gap:12px;padding:16px 24px;border:none;border-radius:8px;cursor:pointer;
  background:var(--accent);color:#fff6ef;font:600 15px 'Inter',sans-serif;transition:background .25s,transform .25s}
.th-ch3 .btn i{color:#fff6ef}
.th-ch3 .btn:hover{background:#d66d4b;transform:translateY(-2px)}
.th-ch3 .evidence{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px;margin-top:40px;
  max-height:0;overflow:hidden;opacity:0;transition:max-height .6s ease,opacity .4s ease}
.th-ch3 .evidence.open{max-height:900px;opacity:1}
@media (max-width:900px){.th-ch3 .mirror{display:none}
.th-ch3 .shade{background:rgba(14,10,9,.6)}
.th-ch3 .doorset{left:45%}
.th-ch3 .phone-wrap{right:4%}
.th-ch3 .tglass{display:none}
.th-ch3 .plates{left:0;bottom:2vh;transform:scale(.7);transform-origin:left bottom}}
</style>
<div class="th-ch3">
<div class="scene" aria-hidden="true">
  <div class="room"></div>
  <div class="wallpaper"></div>
  <div class="floor"></div>
  <div class="molding"></div>
  <div class="curtain"></div>
  <div class="spill"></div>

  <div class="doorset">
    <div class="frame">
      <i class="bokeh b1"></i><i class="bokeh b2"></i><i class="bokeh b3"></i><i class="bokeh b4"></i>
      <div class="foyer-floor"></div>
      <i class="figure f1"></i><i class="figure f2"></i>
      <div class="pyramid">
        <svg viewBox="0 0 200 172" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#fff0b8"/><stop offset="1" stop-color="#e0a94a"/>
            </linearGradient>
            <symbol id="cp" viewBox="0 0 40 40">
              <path d="M3 6 C5 16 13 19 20 19 C27 19 35 16 37 6 Z" fill="url(#gold)" stroke="rgba(255,255,255,.75)" stroke-width=".8"/>
              <ellipse cx="20" cy="6" rx="17" ry="2.5" fill="rgba(255,248,225,.7)"/>
              <rect x="19.2" y="19" width="1.6" height="15" fill="rgba(255,255,255,.65)"/>
              <ellipse cx="20" cy="35" rx="8" ry="1.8" fill="rgba(255,255,255,.7)"/>
            </symbol>
          </defs>
          <use href="#cp" x="80" y="33" width="40" height="40"/>
          <use href="#cp" x="60" y="62" width="40" height="40"/><use href="#cp" x="100" y="62" width="40" height="40"/>
          <use href="#cp" x="40" y="91" width="40" height="40"/><use href="#cp" x="80" y="91" width="40" height="40"/><use href="#cp" x="120" y="91" width="40" height="40"/>
          <use href="#cp" x="20" y="120" width="40" height="40"/><use href="#cp" x="60" y="120" width="40" height="40"/><use href="#cp" x="100" y="120" width="40" height="40"/><use href="#cp" x="140" y="120" width="40" height="40"/>
          <rect x="8" y="157" width="184" height="15" fill="#f4e6d2" opacity=".85"/>
          <rect x="8" y="157" width="184" height="3" fill="#fff" opacity=".5"/>
        </svg>
      </div>
    </div>
    <div class="leaf"></div>
  </div>

  <div class="mirror"><span></span><span></span><span></span><span></span><span></span><span></span></div>

  <div class="table"></div>
  <div class="phoneglow"></div>

  <div class="tglass">
    <svg viewBox="0 0 100 124" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#c98d34"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="116" rx="34" ry="6" fill="rgba(0,0,0,.45)"/>
      <path d="M10 30 C14 52 34 58 50 58 C66 58 86 52 90 30 Z" fill="url(#gold2)" opacity=".92"/>
      <ellipse cx="50" cy="31" rx="38" ry="5" fill="#f7dc8e"/>
      <ellipse cx="50" cy="30" rx="40" ry="7" fill="none" stroke="rgba(255,245,230,.7)" stroke-width="1"/>
      <path d="M10 30 C14 52 34 58 50 58 C66 58 86 52 90 30" fill="none" stroke="rgba(255,245,230,.6)" stroke-width="1"/>
      <circle cx="40" cy="44" r="1.2" fill="#fff8e0"/><circle cx="55" cy="40" r="1" fill="#fff8e0"/><circle cx="62" cy="48" r="1.3" fill="#fff8e0"/>
      <rect x="48" y="57" width="4" height="50" fill="rgba(255,245,230,.55)"/>
      <ellipse cx="50" cy="110" rx="22" ry="5" fill="rgba(255,245,230,.55)"/>
      <path d="M18 34 C22 46 30 50 36 52" stroke="#fff" stroke-width="1.5" fill="none" opacity=".5"/>
    </svg>
  </div>

  <div class="plates">
    <div class="plate grapes">
      <svg viewBox="0 0 170 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grape" cx=".35" cy=".3" r=".75">
            <stop offset="0" stop-color="#c7a0d0"/><stop offset=".35" stop-color="#6e3456"/><stop offset="1" stop-color="#2a0f1f"/>
          </radialGradient>
          <radialGradient id="plateG" cx=".5" cy=".4" r=".7">
            <stop offset="0" stop-color="#f3e8d8"/><stop offset="1" stop-color="#bfae98"/>
          </radialGradient>
        </defs>
        <ellipse cx="85" cy="104" rx="78" ry="14" fill="rgba(0,0,0,.45)"/>
        <ellipse cx="85" cy="94" rx="76" ry="20" fill="url(#plateG)"/>
        <ellipse cx="85" cy="94" rx="56" ry="13" fill="#d6c6b0"/>
        <ellipse cx="85" cy="94" rx="76" ry="20" fill="none" stroke="rgba(255,250,240,.6)" stroke-width="1"/>
        <path d="M86 30 C84 22 88 14 96 10" stroke="#5c4a2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M92 16 C104 6 120 10 122 20 C110 24 100 22 92 16 Z" fill="#4f5a2c" opacity=".85"/>
        <g>
          <circle cx="72" cy="40" r="9" fill="url(#grape)"/><circle cx="88" cy="36" r="9" fill="url(#grape)"/><circle cx="104" cy="41" r="9" fill="url(#grape)"/>
          <circle cx="64" cy="55" r="9" fill="url(#grape)"/><circle cx="80" cy="52" r="9" fill="url(#grape)"/><circle cx="96" cy="53" r="9" fill="url(#grape)"/><circle cx="111" cy="56" r="9" fill="url(#grape)"/>
          <circle cx="58" cy="70" r="9" fill="url(#grape)"/><circle cx="74" cy="67" r="9" fill="url(#grape)"/><circle cx="90" cy="68" r="9" fill="url(#grape)"/><circle cx="106" cy="70" r="9" fill="url(#grape)"/><circle cx="120" cy="74" r="8" fill="url(#grape)"/>
          <circle cx="66" cy="84" r="9" fill="url(#grape)"/><circle cx="82" cy="82" r="9" fill="url(#grape)"/><circle cx="98" cy="84" r="9" fill="url(#grape)"/><circle cx="113" cy="87" r="8" fill="url(#grape)"/>
          <circle cx="44" cy="90" r="8" fill="url(#grape)"/><circle cx="130" cy="92" r="7" fill="url(#grape)"/>
        </g>
      </svg>
    </div>
    <div class="plate cheese">
      <svg viewBox="0 0 170 110" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cheeseTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffe39a"/><stop offset="1" stop-color="#e9b851"/>
          </linearGradient>
          <linearGradient id="cheeseSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#e2ac44"/><stop offset="1" stop-color="#b47f28"/>
          </linearGradient>
          <radialGradient id="plateC" cx=".5" cy=".4" r=".7">
            <stop offset="0" stop-color="#f3e8d8"/><stop offset="1" stop-color="#bfae98"/>
          </radialGradient>
        </defs>
        <ellipse cx="85" cy="94" rx="78" ry="14" fill="rgba(0,0,0,.45)"/>
        <ellipse cx="85" cy="84" rx="76" ry="20" fill="url(#plateC)"/>
        <ellipse cx="85" cy="84" rx="56" ry="13" fill="#d6c6b0"/>
        <ellipse cx="85" cy="84" rx="76" ry="20" fill="none" stroke="rgba(255,250,240,.6)" stroke-width="1"/>
        <!-- чеддер: веер ломтиков (задний ряд) -->
        <polygon points="82,54 112,47 122,52 92,59" fill="#f3a943"/>
        <polygon points="92,59 122,52 122,56 92,63" fill="#c4741c"/>
        <polygon points="76,58 106,51 116,56 86,63" fill="#f0a13a"/>
        <polygon points="86,63 116,56 116,60 86,67" fill="#c4741c"/>
        <polygon points="70,62 100,55 110,60 80,67" fill="#eea03a"/>
        <polygon points="80,67 110,60 110,64 80,71" fill="#b86a18"/>
        <path d="M70 62 L100 55" stroke="rgba(255,235,200,.6)" stroke-width=".8"/>
        <!-- маасдам: тонкие ломтики с дырочками -->
        <polygon points="26,74 58,65 66,70 34,80" fill="url(#cheeseTop)"/>
        <polygon points="34,80 66,70 66,73 34,83" fill="#d9a440"/>
        <ellipse cx="48" cy="70" rx="3" ry="1.5" fill="#d9a441"/>
        <polygon points="23,80 55,71 63,76 31,86" fill="url(#cheeseTop)"/>
        <polygon points="31,86 63,76 63,79 31,89" fill="#d9a440"/>
        <ellipse cx="40" cy="79" rx="3.4" ry="1.6" fill="#d9a441"/><ellipse cx="54" cy="76" rx="2" ry="1" fill="#d9a441"/>
        <polygon points="20,86 52,77 60,82 28,92" fill="url(#cheeseTop)"/>
        <polygon points="28,92 60,82 60,85 28,95" fill="url(#cheeseSide)"/>
        <ellipse cx="36" cy="86" rx="3.6" ry="1.7" fill="#d9a441"/><ellipse cx="50" cy="83" rx="2.4" ry="1.2" fill="#d9a441"/><ellipse cx="44" cy="89" rx="1.6" ry=".8" fill="#d9a441"/>
        <path d="M20 86 L52 77" stroke="rgba(255,250,230,.7)" stroke-width=".8"/>
        <!-- дор-блю: кусочки с прожилками -->
        <polygon points="66,72 84,68 92,73 74,77" fill="#f1ede1"/>
        <polygon points="74,77 92,73 92,86 74,90" fill="#dcd5c2"/>
        <polygon points="66,72 74,77 74,90 66,85" fill="#c9c1ab"/>
        <path d="M76 80 C80 82 84 78 89 80 M78 86 C81 84 85 87 90 83 M68 76 C70 80 69 83 72 86 M72 72 C76 73 80 70 86 72" stroke="#5a7090" stroke-width=".9" fill="none" opacity=".85"/>
        <circle cx="82" cy="82" r=".9" fill="#48607f"/><circle cx="86" cy="76" r=".7" fill="#48607f"/><circle cx="70" cy="80" r=".8" fill="#48607f"/>
        <polygon points="62,88 76,85 82,89 68,92" fill="#f1ede1"/>
        <polygon points="68,92 82,89 82,98 68,101" fill="#dcd5c2"/>
        <polygon points="62,88 68,92 68,101 62,97" fill="#c9c1ab"/>
        <path d="M70 94 C73 96 76 93 80 95 M64 90 C65 93 64 95 66 98 M66 88 C70 89 73 87 78 88" stroke="#5a7090" stroke-width=".8" fill="none" opacity=".85"/>
        <circle cx="75" cy="97" r=".7" fill="#48607f"/>
        <!-- бри: треугольные ломтики с корочкой -->
        <polygon points="96,80 128,68 134,76" fill="#f4e5bd"/>
        <polygon points="96,80 134,76 134,82 96,84" fill="#e6d3a2"/>
        <polygon points="128,68 134,76 134,82 128,74" fill="#fbf8ef"/>
        <path d="M128 68 L134 76" stroke="#fffdf7" stroke-width="1.4"/>
        <polygon points="98,92 134,82 140,90" fill="#f6e8c2"/>
        <polygon points="98,92 140,90 140,95 98,96" fill="#e6d3a2"/>
        <polygon points="134,82 140,90 140,95 134,87" fill="#fbf8ef"/>
        <path d="M134 82 L140 90" stroke="#fffdf7" stroke-width="1.4"/>
        <path d="M98 92 L134 82" stroke="rgba(255,252,240,.7)" stroke-width=".8"/>
      </svg>
    </div>
  </div>

  <div class="phone-wrap">
    <div class="phone">
      <div class="screen">
        <div class="notch"></div>
        <div class="status"><span>22:41</span><span><i class="fa-solid fa-signal"></i><i class="fa-solid fa-wifi"></i><i class="fa-solid fa-battery-quarter"></i></span></div>
        <div class="navrow"><span><i class="fa-solid fa-chevron-left" style="color:#c85f3f"></i> Отмена</span><span class="send"><i class="fa-solid fa-arrow-up"></i></span></div>
        <div class="draft-title">Черновик</div>
        <div class="field">Кому: <span class="blur">директору попечительского совета</span></div>
        <div class="field">Тема: <span class="blur">О средствах фонда театра</span></div>
        <div class="body">
          <p>Уважаемый Аркадий Львович, я долго не решалась написать это письмо, но после сегодняшней премьеры молчать больше не могу.</p>
          <p>Я не уйду из театра. Я знаю, куда делись деньги фонда, и у меня есть копии всех переводов за прошлый сезон.</p>
          <p>Прошу о встрече завтра утром, до репетиции. Никому не говорите об этом письме.</p>
        </div>
        <span class="cursor"></span>
        <div class="saved">Черновик сохранён · 22:41</div>
      </div>
    </div>
  </div>

  <canvas id="dust"></canvas>
  <div class="shade"></div>
  <div class="vignette"></div>
  <div class="grain"></div>
</div>
</div>
`;

