import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0807);
    scene.fog = new THREE.FogExp2(0x0d0807, 0.028);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0.5, 10);

    scene.add(new THREE.AmbientLight(0x3a2418, 0.6));

    // ---- Стол ----
    const desk = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 30),
      new THREE.MeshStandardMaterial({ color: 0x2b1a11, roughness: 0.75, metalness: 0.05 })
    );
    desk.rotation.x = -Math.PI / 2;
    desk.position.y = -4.5;
    scene.add(desk);

    // ---- Лампа ----
    const lamp = new THREE.Group();
    scene.add(lamp);

    const cord = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 2.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    cord.position.y = -1.2;
    lamp.add(cord);

    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(1.15, 0.95, 48, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x1f5c46,
        metalness: 0.35,
        roughness: 0.4,
        side: THREE.FrontSide
      })
    );
    shade.position.y = -2.8;
    lamp.add(shade);

    const inner = new THREE.Mesh(
      new THREE.ConeGeometry(1.13, 0.93, 48, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xffc98a, side: THREE.BackSide })
    );
    inner.position.y = -2.8;
    lamp.add(inner);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.15, 0.035, 8, 64),
      new THREE.MeshStandardMaterial({ color: 0xc79a4a, metalness: 0.85, roughness: 0.3 })
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -3.27;
    lamp.add(rim);

    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 24, 16),
      new THREE.MeshBasicMaterial({ color: 0xfff1d6 })
    );
    bulb.position.y = -3.1;
    lamp.add(bulb);

    const point = new THREE.PointLight(0xffb35c, 1.6, 18, 2);
    point.position.y = -3.2;
    lamp.add(point);

    const spot = new THREE.SpotLight(0xffc27a, 3.2, 22, 0.52, 0.7, 1.2);
    spot.position.y = -3.2;
    lamp.add(spot);

    const spotTarget = new THREE.Object3D();
    spotTarget.position.y = -12;
    lamp.add(spotTarget);
    spot.target = spotTarget;

    // ---- Световой конус ----
    const beamGeo = new THREE.ConeGeometry(3.4, 9, 64, 1, true);
    beamGeo.translate(0, -4.5, 0);
    const beamMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xffc27a) },
        uTime: { value: 0 },
        uInt: { value: 1 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vN;
        varying vec3 vV;
        void main() {
          vUv = uv;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal);
          vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uInt;
        varying vec2 vUv;
        varying vec3 vN;
        varying vec3 vV;
        void main() {
          float f = pow(abs(dot(vN, vV)), 2.2);
          float a = pow(vUv.y, 2.0) * f * 0.32 * uInt;
          gl_FragColor = vec4(uColor, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = -3.2;
    lamp.add(beam);

    // ---- Текстура круга ----
    function dotTex() {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g = c.getContext('2d')!;
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(0.4, 'rgba(255,255,255,0.5)');
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }
    const tex = dotTex();

    // ---- Пыль в луче ----
    const DN = 520;
    const dPos = new Float32Array(DN * 3);
    const dSeed: number[] = [];
    for (let i = 0; i < DN; i++) {
      const h = Math.random() * 8.2;
      const r = Math.sqrt(Math.random()) * (h / 9) * 3.2;
      const a = Math.random() * Math.PI * 2;
      dPos[i * 3] = Math.cos(a) * r;
      dPos[i * 3 + 1] = -h;
      dPos[i * 3 + 2] = Math.sin(a) * r;
      dSeed.push(Math.random() * 10);
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.07,
      map: tex,
      color: 0xffd29a,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const dust = new THREE.Points(dGeo, dustMat);
    dust.position.y = -3.2;
    lamp.add(dust);

    // ---- Бумаги и лупа на столе ----
    const papers = new THREE.Group();
    scene.add(papers);
    const paperMat = new THREE.MeshStandardMaterial({ color: 0xe9d8b8, roughness: 0.9 });
    const paperPos: [number, number, number][] = [
      [-0.6, 0.3, 0.2],
      [0.7, -0.2, -0.4],
      [0.1, 0.9, 0.9],
      [-1.4, -0.6, -0.2]
    ];
    paperPos.forEach(([x, z, r], i) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.01, 2), paperMat);
      p.position.set(x, -4.49 + i * 0.012, z);
      p.rotation.y = r;
      papers.add(p);
    });

    const photo = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.012, 1.05),
      new THREE.MeshStandardMaterial({ color: 0x7a2e20, roughness: 0.6 })
    );
    photo.position.set(0.9, -4.43, 0.6);
    photo.rotation.y = -0.5;
    papers.add(photo);

    const brass = new THREE.MeshStandardMaterial({
      color: 0xc79a4a,
      metalness: 0.85,
      roughness: 0.3
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.05, 12, 48), brass);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(-0.3, -4.4, 1.2);
    papers.add(ring);

    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.07, 0.9, 12),
      new THREE.MeshStandardMaterial({ color: 0x3a1d12, roughness: 0.5 })
    );
    handle.rotation.z = Math.PI / 2;
    handle.rotation.y = 0.6;
    handle.position.set(-0.95, -4.4, 1.6);
    papers.add(handle);

    // ---- Панорамное окно ----
    const WZ = -9, WL = -0.5, WR = 16, WB = -3, WT = 7.5;
    const WC = (WL + WR) / 2, WW = WR - WL;
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1e140e, roughness: 0.95 });
    const walls: [number, number, number, number][] = [
      [WL + 60, 40, (WL - 60) / 2, 2],
      [60 - WR, 40, (WR + 60) / 2, 2],
      [WW, 20, WC, WT + 10],
      [WW, 12, WC, WB - 6]
    ];
    walls.forEach(([w, h, x, y]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
      m.position.set(x, y, WZ - 0.1);
      scene.add(m);
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0c,
      roughness: 0.6,
      metalness: 0.2
    });
    const bar = (w: number, h: number, x: number, y: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.4), frameMat);
      m.position.set(x, y, WZ);
      scene.add(m);
    };
    [0, 1, 2, 3].forEach(i =>
      bar(i === 0 || i === 3 ? 0.5 : 0.22, WT - WB, WL + (WW * i) / 3, (WT + WB) / 2)
    );
    bar(WW + 0.5, 0.5, WC, WT);
    bar(WW + 0.5, 0.3, WC, WB);
    bar(WW, 0.12, WC, 4.6);

    const sill = new THREE.Mesh(
      new THREE.BoxGeometry(WW + 1.4, 0.2, 1),
      new THREE.MeshStandardMaterial({ color: 0x2a1a11, roughness: 0.7 })
    );
    sill.position.set(WC, WB - 0.2, WZ + 0.45);
    scene.add(sill);

    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(WW, WT - WB),
      new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.03,
        depthWrite: false,
        fog: false
      })
    );
    glass.position.set(WC, (WT + WB) / 2, WZ + 0.05);
    scene.add(glass);

    // ---- Небо ----
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uFlash: { value: 0 },
        uFlashX: { value: 0.5 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime, uFlash, uFlashX;
        varying vec2 vUv;
        float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y);
        }
        float fbm(vec2 p) {
          float v = 0.0, a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * n(p); p *= 2.03; a *= 0.5; }
          return v;
        }
        void main() {
          vec2 uv = vUv;
          float g = mix(0.34, 0.015, smoothstep(0.3, 0.72, uv.y));
          float c = fbm(vec2(uv.x * 5.0 + uTime * 0.012, uv.y * 3.5 - uTime * 0.004));
          vec2 md = (uv - vec2(0.64, 0.6)) * vec2(170.0 / 60.0, 1.0);
          float ml = length(md);
          float moon = 1.0 - smoothstep(0.028, 0.031, ml);
          float halo = exp(-ml * 14.0) * 0.35;
          g += halo;
          float cl = smoothstep(0.45, 0.62, c);
          g = mix(g, g * 0.25, cl * smoothstep(0.3, 0.9, uv.y));
          g = max(g, moon * (1.0 - cl * 0.85));
          float d = 1.0 - smoothstep(0.0, 0.45, abs(uv.x - uFlashX));
          g += uFlash * (0.25 + 0.9 * d) * (0.3 + c * 1.2) * smoothstep(0.1, 0.7, uv.y);
          g = smoothstep(0.0, 1.0, clamp(g, 0.0, 1.0));
          gl_FragColor = vec4(vec3(g), 1.0);
        }
      `,
      fog: false,
      depthWrite: false
    });
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(170, 60), skyMat);
    sky.position.set(0, 12, -45);
    scene.add(sky);

    // ---- Город ----
    function cityTex(maxH: number, minH: number, body: string, cols: string[], dens: number) {
      const W = 2048, H = 512;
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const g = c.getContext('2d')!;
      for (let x = 0; x < W; ) {
        const bw = 26 + Math.random() * 90;
        const bh = H * (minH + Math.random() * (maxH - minH));
        g.fillStyle = body;
        g.fillRect(x, H - bh, bw, bh);
        if (Math.random() < 0.35) g.fillRect(x + bw * 0.2, H - bh - 14, bw * 0.6, 14);
        if (bh > H * 0.42 && Math.random() < 0.45) {
          g.fillRect(x + bw / 2 - 1, H - bh - 34, 2, 34);
          g.fillStyle = '#ff1f10';
          g.fillRect(x + bw / 2 - 2, H - bh - 36, 4, 4);
        }
        for (let wy = H - bh + 8; wy < H - 4; wy += 9)
          for (let wx = x + 5; wx < x + bw - 6; wx += 7)
            if (Math.random() < dens) {
              g.globalAlpha = 0.45 + Math.random() * 0.55;
              g.fillStyle = cols[Math.floor(Math.random() * cols.length)];
              g.fillRect(wx, wy, 3, 4);
            }
        g.globalAlpha = 1;
        x += bw + (Math.random() < 0.3 ? Math.random() * 14 : 0);
      }
      const t = new THREE.CanvasTexture(c);
      t.minFilter = THREE.LinearFilter;
      return t;
    }

    const farCity = new THREE.Mesh(
      new THREE.PlaneGeometry(120, 28),
      new THREE.MeshBasicMaterial({
        map: cityTex(0.62, 0.12, '#141414', ['#ffffff', '#d6d6d6', '#9a9a9a'], 0.18),
        transparent: true,
        fog: false,
        depthWrite: false,
        color: 0xbbbbbb
      })
    );
    farCity.position.set(0, 2, -34);
    scene.add(farCity);

    const nearCity = new THREE.Mesh(
      new THREE.PlaneGeometry(85, 22),
      new THREE.MeshBasicMaterial({
        map: cityTex(0.5, 0.1, '#000000', ['#ffffff', '#f2f2f2', '#bdbdbd', '#ffffff', '#ff1f10'], 0.12),
        transparent: true,
        fog: false,
        depthWrite: false
      })
    );
    nearCity.position.set(0, -1, -24);
    scene.add(nearCity);

    // ---- Дождь ----
    const RN = 1400;
    const rPos = new Float32Array(RN * 6);
    const rSpd = new Float32Array(RN);
    for (let i = 0; i < RN; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = Math.random() * 28 - 12;
      const z = -11 - Math.random() * 15;
      const l = 0.5 + Math.random() * 0.6;
      rPos.set([x, y, z, x - 0.12, y - l, z], i * 6);
      rSpd[i] = 14 + Math.random() * 9;
    }
    const rGeo = new THREE.BufferGeometry();
    rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3));
    const rainMat = new THREE.LineBasicMaterial({
      color: 0xf0f0f0,
      transparent: true,
      opacity: 0.45,
      fog: false
    });
    const rain = new THREE.LineSegments(rGeo, rainMat);
    scene.add(rain);

    // ---- Капли на стекле ----
    const GN = 260;
    const gPos = new Float32Array(GN * 3);
    const gSpd = new Float32Array(GN);
    for (let i = 0; i < GN; i++) {
      gPos.set([WL + Math.random() * (WR - WL), WB + Math.random() * (WT - WB), WZ + 0.1], i * 3);
      gSpd[i] = Math.random() < 0.25 ? 0.2 + Math.random() * 1.1 : 0;
    }
    const gGeo = new THREE.BufferGeometry();
    gGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    const dropMat = new THREE.PointsMaterial({
      size: 0.09,
      map: tex,
      color: 0xdddddd,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      fog: false
    });
    const drops = new THREE.Points(gGeo, dropMat);
    scene.add(drops);

    // ---- Молния ----
    const BOLT_N = 22;
    const boltGeo = new THREE.BufferGeometry();
    boltGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(BOLT_N * 3), 3));
    const boltMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      fog: false
    });
    const bolt = new THREE.Line(boltGeo, boltMat);
    scene.add(bolt);

    const stormLight = new THREE.DirectionalLight(0xffffff, 0);
    stormLight.position.set(8, 6, -25);
    scene.add(stormLight);

    let flash = 0;
    let nextStrike = 4;
    let echo = -1;

    function strike(t: number) {
      const bx = 4 + Math.random() * 36;
      const p = boltGeo.attributes.position.array as Float32Array;
      let x = bx;
      for (let i = 0; i < BOLT_N; i++) {
        x += (Math.random() - 0.5) * 1.6;
        p[i * 3] = x;
        p[i * 3 + 1] = 16 - i * (15 / (BOLT_N - 1));
        p[i * 3 + 2] = -36;
      }
      boltGeo.attributes.position.needsUpdate = true;
      skyMat.uniforms.uFlashX.value = 0.5 + bx / 150;
      flash = 0.9 + Math.random() * 0.3;
      echo = t + 0.12 + Math.random() * 0.12;
      nextStrike = t + 5 + Math.random() * 9;
    }

    // ---- Размер ----
    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const a = w / h;
      lamp.position.set(a < 1 ? 1.4 : Math.min(4.2, 2.2 * a), 6.2, 0);
      papers.position.x = lamp.position.x;
    }
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onMove);

    let flicker = 1;
    let nextFlicker = 3;

    const clock = new THREE.Clock();
    let raf = 0;

    function animate() {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      lamp.rotation.z = Math.sin(t * 0.55) * 0.035;
      lamp.rotation.x = Math.sin(t * 0.4 + 1) * 0.015;

      if (t > nextFlicker) {
        flicker = 0.35 + Math.random() * 0.3;
        nextFlicker = t + 4 + Math.random() * 7;
      }
      flicker += (1 - flicker) * dt * 6;
      point.intensity = 1.6 * flicker;
      spot.intensity = 3.2 * flicker;
      beamMat.uniforms.uInt.value = flicker;
      bulb.material.color.setRGB(1, 0.94 * flicker + 0.06, 0.84 * flicker + 0.1);

      const dp = dGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < DN; i++) {
        dp[i * 3 + 1] += Math.sin(t * 0.5 + dSeed[i]) * 0.0015 + 0.0025;
        if (dp[i * 3 + 1] > -0.3) dp[i * 3 + 1] = -8.2;
      }
      dGeo.attributes.position.needsUpdate = true;
      dust.rotation.y += dt * 0.04;

      const rp = rGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < RN; i++) {
        const d = rSpd[i] * dt;
        rp[i * 6 + 1] -= d;
        rp[i * 6 + 4] -= d;
        rp[i * 6] -= d * 0.2;
        rp[i * 6 + 3] -= d * 0.2;
        if (rp[i * 6 + 1] < -12) {
          const l = rp[i * 6 + 1] - rp[i * 6 + 4];
          const nx = (Math.random() - 0.5) * 60;
          rp[i * 6] = nx;
          rp[i * 6 + 3] = nx - 0.12;
          rp[i * 6 + 1] = 16;
          rp[i * 6 + 4] = 16 - l;
        }
      }
      rGeo.attributes.position.needsUpdate = true;

      const gp = gGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < GN; i++) {
        if (gSpd[i] === 0) continue;
        gp[i * 3 + 1] -= gSpd[i] * dt;
        gp[i * 3] += Math.sin(t * 3 + i) * 0.002;
        if (gp[i * 3 + 1] < WB) {
          gp[i * 3 + 1] = WT;
          gp[i * 3] = WL + Math.random() * (WR - WL);
        }
      }
      gGeo.attributes.position.needsUpdate = true;

      if (t > nextStrike) strike(t);
      if (echo > 0 && t > echo) {
        flash = Math.max(flash, 0.6 + Math.random() * 0.3);
        echo = -1;
      }
      flash *= Math.exp(-dt * 7);
      const fl = flash * (0.75 + Math.random() * 0.25);
      skyMat.uniforms.uTime.value = t;
      skyMat.uniforms.uFlash.value = fl;
      boltMat.opacity = Math.min(1, fl * 1.6);
      stormLight.intensity = fl * 1.4;
      rainMat.opacity = 0.45 + fl * 0.5;
      dropMat.opacity = 0.45 + fl * 0.5;

      camera.position.x += (mouse.x * 0.8 - camera.position.x) * dt * 2;
      camera.position.y += (0.5 - mouse.y * 0.5 - camera.position.y) * dt * 2;
      camera.lookAt(0, -0.4, 0);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      renderer.dispose();
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry?.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach(m => m.dispose());
          else mat?.dispose();
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full block"
      style={{ zIndex: 0 }}
    />
  );
}