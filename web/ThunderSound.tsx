import { useEffect, useRef, useState } from 'react';

type Props = {
  trigger: number;
};

export default function ThunderSound({ trigger }: Props) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const rainRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    return () => {
      try {
        rainRef.current?.stop();
        ctxRef.current?.close();
      } catch {}
    };
  }, []);

  function initAudio() {
    if (ctxRef.current) return;
    const Ctx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    const sr = ctx.sampleRate;
    const buf = ctx.createBuffer(1, sr * 3, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const hp = ctx.createBiquadFilter();
    hp.type = 'bandpass';
    hp.frequency.value = 2400;
    hp.Q.value = 0.4;

    const g = ctx.createGain();
    g.gain.value = 0.06;

    src.connect(hp).connect(g).connect(master);
    src.start();
    rainRef.current = src;
  }

  function thunder() {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master || !enabled) return;
    if (ctx.state === 'suspended') ctx.resume();

    const dur = 4 + Math.random() * 2.5;
    const sr = ctx.sampleRate;
    const buf = ctx.createBuffer(1, sr * dur, sr);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      data[i] = last * 3.5;
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;
    const t0 = ctx.currentTime;

    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(250 + Math.random() * 900, t0);
    lp.frequency.exponentialRampToValueAtTime(90, t0 + dur);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.7, t0 + 0.07);
    g.gain.exponentialRampToValueAtTime(0.3, t0 + 0.6);
    g.gain.exponentialRampToValueAtTime(0.5, t0 + 1.1 + Math.random() * 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    src.connect(lp).connect(g).connect(master);
    src.start(t0);
    src.stop(t0 + dur);
  }

  useEffect(() => {
    if (trigger > 0) thunder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  function toggle() {
    if (!ctxRef.current) initAudio();
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const next = !enabled;
    setEnabled(next);
    masterRef.current?.gain.setTargetAtTime(next ? 1 : 0, ctx.currentTime, 0.2);
  }

  return (
    <button
      onClick={toggle}
      className="fixed right-5 bottom-5 z-20 px-3.5 py-2 rounded-full border border-line bg-panel/90 text-text text-xs font-semibold flex items-center gap-2 hover:border-text/30 transition"
      title={enabled ? 'Выключить звук' : 'Включить звук грозы'}
    >
      <i
        className={`fa-solid ${
          enabled ? 'fa-volume-high' : 'fa-volume-xmark'
        } text-accent`}
      />
      {enabled ? 'Звук включён' : 'Звук грозы'}
    </button>
  );
}