import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSocket } from '../socket';
import { useSpeech } from '../SpeechContext';

// ============================================================
// УТИЛИТЫ
// ============================================================

const initials = (n: string) =>
  n
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const fmt = (s: number) => {
  s = Math.max(0, s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

// ============================================================
// RAIN CANVAS
// ============================================================

function RainCanvas({ opacity = 0.5, lightning = false }: { opacity?: number; lightning?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const x = c.getContext('2d');
    if (!x) return;
    const cv = c;
    const cx = x;
    const root = document.documentElement;

    let w = 0, h = 0;
    type Drop = { x: number; y: number; l: number; s: number; a: number };
    let drops: Drop[] = [];
    type Bolt = { x1: number; y1: number; x2: number; y2: number };
    let boltPoints: Bolt[] = [];
    let boltOpacity = 0;
    let flash = 0;
    let nextStrike = 2.5;
    let secondAt = 0;
    let elapsed = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.floor((w * h) / 9000) }, mk);
    }
    function mk(): Drop {
      const z = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        l: 8 + z * 16,
        s: 4 + z * 6,
        a: 0.05 + Math.random() * 0.15
      };
    }

    function makeBolt() {
      boltPoints = [];
      function branch(sx: number, sy: number, length: number, dir: number, depth: number) {
        const steps = 14 - depth * 4;
        const seg = length / steps;
        let px = sx;
        let py = sy;
        for (let i = 0; i < steps; i++) {
          const nx = px + (Math.random() - 0.5) * seg * 1.6 + dir * seg * 0.35;
          const ny = py - seg * (0.7 + Math.random() * 0.5);
          boltPoints.push({ x1: px, y1: py, x2: nx, y2: ny });
          if (depth < 2 && Math.random() < 0.2) {
            branch(nx, ny, length * 0.45, Math.random() < 0.5 ? -1 : 1, depth + 1);
          }
          px = nx;
          py = ny;
        }
      }
      const startX = w * (0.25 + Math.random() * 0.5);
      branch(startX, h * 0.05, h * 0.7, (Math.random() - 0.5) * 0.5, 0);
    }

    let lastT = performance.now();
    let raf = 0;

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      elapsed += dt;

      if (lightning) {
        if (elapsed > nextStrike) {
          const power = 0.6 + Math.random() * 0.4;
          makeBolt();
          boltOpacity = power;
          flash = power;
          secondAt = Math.random() < 0.65 ? elapsed + 0.12 + Math.random() * 0.18 : 0;
          nextStrike = elapsed + 7 + Math.random() * 11;
        }
        if (secondAt && elapsed > secondAt) {
          flash = Math.max(flash, 0.75);
          boltOpacity = 0.85;
          secondAt = 0;
        }
        flash = Math.max(0, flash - dt * 2.4);
        boltOpacity = Math.max(0, boltOpacity - dt * 3.5);
        root.style.setProperty('--flash', flash.toFixed(3));
      }

      cx.clearRect(0, 0, w, h);
      cx.lineWidth = 1;

      cx.strokeStyle = `rgba(190, 200, 215, ${0.18 + flash * 0.4})`;
      for (const d of drops) {
        cx.beginPath();
        cx.moveTo(d.x, d.y);
        cx.lineTo(d.x - 1, d.y + d.l);
        cx.stroke();
        d.y += d.s * dt * 60;
        if (d.y > h) {
          d.y = -d.l;
          d.x = Math.random() * w;
        }
      }

      if (lightning && boltOpacity > 0.01 && boltPoints.length > 0) {
        const offsets = [0, 0.8, -0.8];
        cx.lineCap = 'round';
        cx.lineJoin = 'round';
        for (const offset of offsets) {
          cx.strokeStyle = `rgba(220, 235, 255, ${
            boltOpacity * (offset === 0 ? 1 : 0.45)
          })`;
          cx.lineWidth = offset === 0 ? 1.6 : 1;
          cx.beginPath();
          cx.moveTo(boltPoints[0].x1 + offset, boltPoints[0].y1);
          for (const p of boltPoints) cx.lineTo(p.x2 + offset, p.y2);
          cx.stroke();
        }
      }
    }

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      root.style.removeProperty('--flash');
    };
  }, [lightning]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity }}
      aria-hidden="true"
    />
  );
}

// ============================================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ============================================================

export default function Play() {
  const { code } = useParams();
  const [state, setState] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [wantCaptain, setWantCaptain] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isCaptain, setIsCaptain] = useState(false);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const sock = useRef(getSocket());
  const speech = useSpeech();
  const didReconnect = useRef(false);
  const lastStateRef = useRef<any>(null);
  const joinedRef = useRef(false);

  // Хелпер для трейсов (безопасен, если code ещё нет)
  const trace = (event: string, data?: any) => {
    if (!code) return;
    try {
      sock.current.emit('client:trace', { code, event, data });
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const s = sock.current;
    const onState = (st: any) => {
      setState(st);
      if (lastStateRef.current?.phase !== st?.phase) {
        trace('phase_changed', {
          from: lastStateRef.current?.phase,
          to: st?.phase,
          round: st?.round
        });
      }
      lastStateRef.current = st;
    };
    s.on('state', onState);

    const onKill = () => {
      setJoined(false);
      setTeamId(null);
      setState(null);
      setIsCaptain(false);
      if (code) localStorage.removeItem(`team_${code}`);
    };
    s.on('session:kill', onKill);

    return () => {
      s.off('state', onState);
      s.off('session:kill', onKill);
    };
  }, [code]);

  useEffect(() => {
    const saved = localStorage.getItem('detective_name');
    if (saved) setNickname(saved);
  }, []);

  // Авто-реконнект (только один раз)
  useEffect(() => {
    if (joined || !code || didReconnect.current) return;
    didReconnect.current = true;

    const savedName = localStorage.getItem('detective_name');
    const savedTeam = localStorage.getItem(`team_${code}`);
    if (!savedName || !savedTeam) return;

    setNickname(savedName);
    trace('auto_reconnect_attempt', { savedTeam });

    const t = setTimeout(() => {
      sock.current.emit(
        'player:join',
        {
          code,
          nickname: savedName,
          wantCaptain: false,
          reconnectTeamId: savedTeam
        },
        (res: any) => {
          if (res?.error) {
            trace('auto_reconnect_failed', { error: res.error });
            // Если команда не найдена, чистим localStorage
            if (res.error === 'not_found') localStorage.removeItem(`team_${code}`);
            return;
          }
          setJoined(true);
          setIsCaptain(res.isCaptain);
          setTeamId(res.teamId);
          setState(res.state);
          trace('auto_reconnect_success', { teamId: res.teamId });
        }
      );
    }, 400);

    return () => clearTimeout(t);
  }, [code, joined]);

  function join() {
    setErr('');
    const v = nickname.trim();
    if (v.length < 2) {
      setErr('Имя должно содержать минимум 2 символа');
      return;
    }
    if (joinedRef.current) return; // защита от двойного клика
    joinedRef.current = true;

    localStorage.setItem('detective_name', v);
    trace('join_attempt', { wantCaptain });

    // Если уже есть сохранённая команда для этой сессии — пытаемся реконнектиться
    const stored = localStorage.getItem(`team_${code}`);
    const reconnectTeamId = stored || undefined;

    sock.current.emit(
      'player:join',
      { code, nickname: v, wantCaptain, reconnectTeamId },
      (res: any) => {
        joinedRef.current = false;
        if (res?.error) {
          setErr(res.error === 'no_teams' ? 'Сначала создайте стол капитаном' : res.error);
          trace('join_failed', { error: res.error });
          return;
        }
        setJoined(true);
        setIsCaptain(res.isCaptain);
        setTeamId(res.teamId);
        setState(res.state);
        if (res.teamId) localStorage.setItem(`team_${code}`, res.teamId);
        trace('join_success', { teamId: res.teamId, isCaptain: res.isCaptain });
      }
    );
  }

  function vote(suspectId: string) {
    trace('vote_attempt', { suspectId });
    sock.current.emit('team:vote', { code, suspectId }, (res: any) => {
      if (res?.error) {
        setErr(res.error);
        trace('vote_failed', { error: res.error, suspectId });
      } else {
        trace('vote_success', { suspectId });
      }
    });
  }

  // --- Экран входа ---
  if (!joined) {
    return (
      <JoinScreen
        code={code}
        nickname={nickname}
        setNickname={setNickname}
        wantCaptain={wantCaptain}
        setWantCaptain={setWantCaptain}
        onJoin={join}
        err={err}
      />
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted">
        Ожидание…
      </div>
    );
  }

  const {
    phase,
    scenario,
    chapter,
    clues,
    teams,
    round,
    totalRounds,
    lastResult,
    roundStartedAt,
    clueTimesSec,
    eliminatedSuspects
  } = state;

  const myTeam = teams.find((t: any) => t.id === teamId);
  const eliminated: string[] = eliminatedSuspects || [];
  const aliveSuspects = scenario.suspects.filter(
    (s: any) => !eliminated.includes(s.id)
  );
  const elimId = lastResult?.eliminatedId;
  const elimSuspect = elimId
    ? scenario.suspects.find((s: any) => s.id === elimId)
    : null;

  if (phase === 'lobby') {
    return <LobbyScreen scenario={scenario} round={round} isCaptain={isCaptain} />;
  }
  if (phase === 'intro') {
    return <IntroScreen scenario={scenario} isCaptain={isCaptain} />;
  }
  if (phase === 'story') {
    return <StoryScreen scenario={scenario} round={round} />;
  }
  if (phase === 'discussion') {
    return (
      <DiscussionScreen
        scenario={scenario}
        round={round}
        isCaptain={isCaptain}
        eliminatedSuspects={eliminatedSuspects}
      />
    );
  }
  if (phase === 'voting') {
    return (
      <VotingScreen
        scenario={scenario}
        round={round}
        aliveSuspects={aliveSuspects}
        isCaptain={isCaptain}
        myTeam={myTeam}
        teams={teams}
        onVote={vote}
      />
    );
  }
  if (phase === 'results') {
    return (
      <ResultsScreen
        scenario={scenario}
        round={round}
        lastResult={lastResult}
        myTeam={myTeam}
        elimSuspect={elimSuspect}
      />
    );
  }
  if (phase === 'end' || phase === 'results-final') {
    if (code) localStorage.removeItem(`team_${code}`);
    return <EndScreen scenario={scenario} />;
  }

  return null;
}

// ============================================================
// ЭКРАН 1: ВХОД
// ============================================================

function JoinScreen({
  code,
  nickname,
  setNickname,
  wantCaptain,
  setWantCaptain,
  onJoin,
  err
}: any) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  function copy() {
    const t = String(code || '').toUpperCase();
    (navigator.clipboard
      ? navigator.clipboard.writeText(t)
      : Promise.reject()
    )
      .catch(() => {
        const ta = document.createElement('textarea');
        ta.value = t;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
        } catch {}
        ta.remove();
      })
      .finally(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    onJoin();
    setTimeout(() => setBusy(false), 1200);
  }

  return (
    <div className="relative min-h-screen flex justify-center bg-[#0d0b0a] text-[#e9e2da] overflow-hidden">
      <RainCanvas opacity={0.6} lightning />

      <div
        className="fixed top-[-20vh] left-1/2 -translate-x-1/2 w-[140vw] h-[80vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(170,110,60,.13), transparent 60%)',
          animation: 'flicker 7s infinite'
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_45%,transparent_35%,rgba(0,0,0,.85)_100%)]" />

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1 }
          46% { opacity: 1 } 47% { opacity: .6 } 48% { opacity: 1 }
          72% { opacity: .92 } 73% { opacity: .5 } 74% { opacity: .94 }
        }
      `}</style>

      <main className="relative z-[4] min-h-screen w-full max-w-[440px] flex flex-col justify-center px-5 py-8">
        <div className="text-center mb-7">
          <i className="fa-solid fa-user-secret text-[22px] text-[#a8998c] mb-3 block" />
          <span className="text-[11px] tracking-[.35em] uppercase text-[#8d837b]">
            Дело открыто
          </span>
        </div>

        <form
          onSubmit={submit}
          autoComplete="off"
          className="relative rounded-2xl border border-[#2a2421] p-7 pb-6"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,22,20,.92), rgba(18,15,14,.94))'
          }}
        >
          <div className="absolute top-[18px] right-4 rotate-[12deg] border-[1.5px] border-[#9b3f2c8c] text-[#b24a33bf] text-[9px] font-semibold tracking-[.2em] uppercase px-2 py-1 rounded-[3px]">
            Секретно
          </div>

          <h1 className="font-['Cormorant_Garamond'] font-semibold text-[34px] leading-[1.1] text-[#f1e9df] mb-1.5 pr-[60px]">
            Подключение к игре
          </h1>
          <p className="font-['Cormorant_Garamond'] italic text-[17px] text-[#8d837b] mb-6">
            Город спит. Улики — нет.
          </p>

          <div className="flex items-center justify-between px-3.5 py-3 border border-[#2a2421] rounded-[10px] bg-black/25 mb-5">
            <div>
              <div className="text-[12px] text-[#8d837b] mb-0.5">Код сессии</div>
              <b className="font-['JetBrains_Mono'] text-[18px] tracking-[.25em] text-[#d0664d]">
                {String(code || '').toUpperCase()}
              </b>
            </div>
            <button
              type="button"
              onClick={copy}
              className="w-[38px] h-[38px] rounded-[9px] border border-[#2a2421] text-[#a8998c] hover:text-[#e9e2da] hover:border-[#4a3e38] transition"
              aria-label="Скопировать код"
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} text-sm`} />
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder=" "
              maxLength={24}
              className="w-full h-[56px] bg-black/30 border border-[#2a2421] rounded-[10px] pt-[18px] pb-1 pr-4 pl-11 text-[#e9e2da] text-[16px] font-medium outline-none focus:border-[#5a3a30] transition peer"
            />
            <i className="fa-solid fa-feather-pointed absolute left-4 top-1/2 -translate-y-1/2 text-[#6f655e] text-sm peer-focus:text-[#c05a42] transition" />
            <label className="absolute left-11 top-1/2 -translate-y-1/2 text-[#8d837b] text-[15px] pointer-events-none transition peer-focus:top-[17px] peer-focus:text-[11px] peer-focus:tracking-[.04em] peer-[:not(:placeholder-shown)]:top-[17px] peer-[:not(:placeholder-shown)]:text-[11px]">
              Ваше имя
            </label>
          </div>

          {err && <div className="text-[12px] text-[#c96a52] mb-3">{err}</div>}

          <label className="flex gap-3 items-start cursor-pointer mb-6 select-none">
            <input
              type="checkbox"
              checked={wantCaptain}
              onChange={e => setWantCaptain(e.target.checked)}
              className="hidden peer"
            />
            <span className="flex-none w-[22px] h-[22px] border border-[#3d342f] rounded-md grid place-items-center bg-black/30 mt-0.5 peer-checked:bg-[#9b3f2c] peer-checked:border-[#9b3f2c] transition">
              <i className="fa-solid fa-check text-[11px] text-white scale-0 peer-checked:scale-100 transition" />
            </span>
            <p className="text-[14px] leading-snug text-[#b8aea5]">
              Я капитан команды
              <em className="block not-italic text-[12px] text-[#8d837b]">
                Будет создан новый стол
              </em>
            </p>
          </label>

          <button
            type="submit"
            disabled={nickname.trim().length < 2 || busy}
            className="w-full h-[54px] rounded-[10px] bg-[#9b3f2c] text-[#f6ece4] text-[15px] font-semibold tracking-[.06em] flex items-center justify-center gap-2.5 hover:bg-[#b24a33] active:scale-[.98] disabled:bg-[#3a2621] disabled:text-[#7d6760] disabled:cursor-not-allowed transition"
          >
            <span>
              {busy ? 'Подключаемся…' : wantCaptain ? 'Создать стол' : 'Войти'}
            </span>
            <i
              className={`fa-solid ${
                busy ? 'fa-circle-notch animate-spin' : 'fa-arrow-right'
              } text-sm`}
            />
          </button>
        </form>

        <p className="text-center mt-6 text-[12px] text-[#5f5650]">
          <i className="fa-solid fa-cloud-rain mr-1.5" />
          Не доверяйте никому
        </p>
      </main>
    </div>
  );
}

// ============================================================
// ЭКРАН 2: ЛОББИ
// ============================================================

function LobbyScreen({ scenario, round, isCaptain }: any) {
  return (
    <div className="relative min-h-screen flex justify-center bg-[#100e0c] text-[#d8d2c8] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wallL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15120f" />
            <stop offset="1" stopColor="#211c17" />
          </linearGradient>
          <linearGradient id="floorL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1511" />
            <stop offset="1" stopColor="#0a0807" />
          </linearGradient>
          <linearGradient id="moonL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2c3640" />
            <stop offset="1" stopColor="#141a20" />
          </linearGradient>
          <linearGradient id="coneL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8b86a" stopOpacity=".32" />
            <stop offset="1" stopColor="#e8b86a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="poolL" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#d9a45a" stopOpacity=".55" />
            <stop offset="1" stopColor="#d9a45a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tableL" cx=".5" cy=".4" r=".6">
            <stop offset="0" stopColor="#5a3c22" />
            <stop offset=".7" stopColor="#2e1f13" />
            <stop offset="1" stopColor="#1a110a" />
          </radialGradient>
          <radialGradient id="vigL" cx=".5" cy=".5" r=".75">
            <stop offset=".45" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".85" />
          </radialGradient>
        </defs>

        <rect width="390" height="844" fill="url(#wallL)" />
        <g stroke="#ffffff06" strokeWidth="1">
          <line x1="100" y1="0" x2="100" y2="480" />
          <line x1="200" y1="0" x2="200" y2="480" />
          <line x1="300" y1="0" x2="300" y2="480" />
        </g>
        <rect y="470" width="390" height="130" fill="#1b1612" />
        <rect y="468" width="390" height="5" fill="#2a2119" />

        <rect x="30" y="132" width="126" height="186" fill="#0d0b09" />
        <rect x="38" y="140" width="110" height="170" fill="url(#moonL)" />
        <g fill="#0f0d0b" opacity=".85">
          {[146, 160, 174, 188, 202, 216, 230, 244, 258, 272, 286, 300].map(y => (
            <rect key={y} x="38" y={y} width="110" height="5" />
          ))}
        </g>
        <rect x="91" y="140" width="4" height="170" fill="#0d0b09" />
        <rect x="26" y="316" width="134" height="7" fill="#241c15" />

        <rect x="222" y="150" width="150" height="112" fill="#2a1e14" stroke="#150f0a" strokeWidth="5" />
        <g opacity=".75">
          <rect x="236" y="164" width="30" height="38" fill="#b8ad98" transform="rotate(-4 251 183)" />
          <rect x="286" y="160" width="36" height="26" fill="#a39884" />
          <rect x="334" y="170" width="26" height="34" fill="#b0a590" transform="rotate(5 347 187)" />
          <rect x="248" y="216" width="40" height="30" fill="#9c917d" />
          <polyline points="251,168 304,164 347,174 324,216 268,220 251,168" fill="none" stroke="#8a2a22" strokeWidth="1.2" />
          <g fill="#a2382d">
            <circle cx="251" cy="168" r="2.2" />
            <circle cx="304" cy="164" r="2.2" />
            <circle cx="347" cy="174" r="2.2" />
            <circle cx="324" cy="216" r="2.2" />
            <circle cx="268" cy="220" r="2.2" />
          </g>
        </g>

        <rect x="318" y="420" width="72" height="190" fill="#1f1b17" />
        <g stroke="#0d0b09" strokeWidth="2" fill="none">
          <rect x="324" y="428" width="60" height="54" />
          <rect x="324" y="488" width="60" height="54" />
          <rect x="324" y="548" width="60" height="54" />
        </g>

        <rect y="600" width="390" height="244" fill="url(#floorL)" />
        <g stroke="#000" strokeOpacity=".35" strokeWidth="1">
          <line x1="195" y1="600" x2="-120" y2="844" />
          <line x1="195" y1="600" x2="20" y2="844" />
          <line x1="195" y1="600" x2="140" y2="844" />
          <line x1="195" y1="600" x2="250" y2="844" />
          <line x1="195" y1="600" x2="370" y2="844" />
          <line x1="195" y1="600" x2="510" y2="844" />
        </g>

        <line x1="195" y1="0" x2="195" y2="318" stroke="#0a0908" strokeWidth="2" />
        <g>
          <polygon points="172,340 218,340 360,660 30,660" fill="url(#coneL)" />
          <ellipse cx="195" cy="660" rx="190" ry="70" fill="url(#poolL)" />
        </g>

        <g fill="#1c140e">
          <rect x="92" y="560" width="54" height="80" rx="6" />
          <rect x="244" y="560" width="54" height="80" rx="6" />
        </g>

        <rect x="185" y="660" width="20" height="110" fill="#1a110a" />
        <ellipse cx="195" cy="652" rx="158" ry="44" fill="#140d08" />
        <ellipse cx="195" cy="645" rx="158" ry="42" fill="url(#tableL)" />
        <rect x="150" y="628" width="44" height="30" fill="#c9bea6" opacity=".75" transform="rotate(-12 172 643)" />
        <rect x="200" y="634" width="52" height="28" fill="#6b4a2b" transform="rotate(8 226 648)" />

        <polygon points="172,318 218,318 234,342 156,342" fill="#2a2520" />
        <ellipse cx="195" cy="342" rx="39" ry="5" fill="#f3cc85" />

        <rect width="390" height="844" fill="url(#vigL)" />
      </svg>

      <header className="absolute top-0 left-0 right-0 z-[3] flex justify-between items-center px-5 py-3.5 bg-gradient-to-b from-[#0b0a09e6] to-transparent text-[13px]">
        <div className="flex items-center gap-2 text-[#cfc7bb]">
          <i className="fa-solid fa-magnifying-glass text-[#c8964a] text-xs" />
          {scenario.title}
        </div>
        <div className="px-2.5 py-1 border border-white/10 rounded-full text-[#a39b8f] bg-[#0f0d0bb3]">
          Раунд {round} / 4
        </div>
      </header>

      <main className="relative z-[2] flex items-center justify-center w-full px-5">
        <div
          className="w-full max-w-[360px] rounded-[18px] border border-[#ffebc81a] p-7 pb-6 text-center backdrop-blur-sm"
          style={{ background: 'rgba(20,18,16,.78)' }}
        >
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[.14em] uppercase text-[#c8964a] mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-[#c8964a] animate-pulse" />
            Ожидание
          </div>
          <h1 className="font-['Cormorant_Garamond'] font-semibold text-[34px] leading-[1.1] text-[#f1ebe1] mb-3">
            Ждём старт
          </h1>
          <p className="text-[15px] leading-snug text-[#a9a195]">
            {isCaptain
              ? 'Вы капитан команды. Дождитесь начала.'
              : 'Вы присоединились как зритель. Решение принимает капитан.'}
          </p>
          <div className="mt-5 pt-4 border-t border-white/[.06] flex justify-center items-center gap-2.5 text-[13px] text-[#8d857a]">
            <i className="fa-solid fa-user-tie text-[#c8964a]" />
            Игроки собираются
            <span className="flex gap-0.5">
              <span className="w-1 h-1 rounded-full bg-[#8d857a] animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-[#8d857a] animate-pulse" style={{ animationDelay: '.2s' }} />
              <span className="w-1 h-1 rounded-full bg-[#8d857a] animate-pulse" style={{ animationDelay: '.4s' }} />
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// ЭКРАН 3: INTRO
// ============================================================

function IntroScreen({ scenario, isCaptain }: any) {
  return (
    <div className="relative min-h-screen flex justify-center bg-[#0e0d0c] text-[#e8e2d6] overflow-hidden">
      <RainCanvas opacity={0.4} lightning />
      <main className="relative z-[2] flex flex-col justify-center w-full max-w-[480px] px-7 py-10 text-center">
        <i className="fa-solid fa-user-secret text-[28px] text-[#b9a898] mb-7 opacity-85" />
        <div className="text-[12px] tracking-[.4em] uppercase text-[#8c7f74] mb-7">
          Дело открыто
        </div>
        <h1 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(34px,6vw,60px)] leading-tight text-[#f1e9df] mb-5">
          {scenario.title}
        </h1>
        <p className="font-['Cormorant_Garamond'] italic text-[clamp(17px,2.4vw,21px)] text-[#9c8f84] mb-4">
          {scenario.description}
        </p>
        <div className="text-[13px] text-[#8c7f74] space-y-1 mt-2">
          <div>
            <span className="text-[#b0584a]">Преступление:</span> {scenario.crime}
          </div>
          <div>
            <span className="text-[#b0584a]">Жертва:</span> {scenario.victim}
          </div>
          <div>
            <span className="text-[#b0584a]">Место:</span> {scenario.location}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-12">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b0584a] animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#b0584a] animate-pulse" style={{ animationDelay: '.25s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#b0584a] animate-pulse" style={{ animationDelay: '.5s' }} />
        </div>
        <div className="mt-12 text-[13px] text-[#6f645c]">
          <i className="fa-solid fa-cloud-rain mr-1.5" />
          Не доверяйте никому
        </div>
      </main>
    </div>
  );
}

// ============================================================
// ЭКРАН 4: STORY
// ============================================================

function StoryScreen({ scenario, round }: any) {
  return (
    <div className="relative min-h-screen flex justify-center bg-[#0e0d0c] text-[#e8e2d6] overflow-hidden">
      <RainCanvas opacity={0.5} lightning />
      <main className="relative z-[2] flex flex-col justify-center w-full max-w-[720px] px-6 py-10 text-center">
        <i className="fa-solid fa-user-secret text-[28px] text-[#b9a898] mb-7 opacity-85" />
        <div className="text-[12px] tracking-[.4em] uppercase text-[#8c7f74] mb-7">
          Дело открыто · Глава {round}
        </div>
        <h1 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(34px,6vw,60px)] leading-[1.15] text-[#f1e9df]">
          Идёт повествование сюжета на экране
        </h1>
        <p className="font-['Cormorant_Garamond'] italic text-[clamp(17px,2.4vw,21px)] text-[#9c8f84] mt-5">
          Смотрите на главный экран и слушайте внимательно.
        </p>
        <div className="flex justify-center gap-2 mt-11">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b0584a] animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#b0584a] animate-pulse" style={{ animationDelay: '.25s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#b0584a] animate-pulse" style={{ animationDelay: '.5s' }} />
        </div>
        <div className="mt-12 text-[13px] text-[#6f645c]">
          <i className="fa-solid fa-cloud-rain mr-1.5" />
          Не доверяйте никому
        </div>
      </main>
    </div>
  );
}

// ============================================================
// ЭКРАН 5: DISCUSSION
// ============================================================

function DiscussionScreen({ scenario, round, isCaptain, eliminatedSuspects }: any) {
  const eliminated: string[] = eliminatedSuspects || [];
  const aliveSuspects = scenario.suspects.filter(
    (s: any) => !eliminated.includes(s.id)
  );
  return (
    <div className="relative min-h-screen flex justify-center bg-[#0d0c0b] text-[#e8e2d6] overflow-hidden">
      <RainCanvas opacity={0.35} lightning />
      <main className="relative z-[2] w-full max-w-[480px] px-5 py-6">
        <div className="flex justify-between items-center mb-6 text-[12px] text-[#8c7f74]">
          <span>{scenario.title}</span>
          <span>Раунд {round} / 4</span>
        </div>

        <h2 className="font-['Cormorant_Garamond'] text-[32px] font-semibold text-[#f1e9df] mb-3">
          Досье
        </h2>
        <p className="text-[14px] text-[#a79f93] leading-snug mb-6">
          Изучите подозреваемых. Голосование откроется на следующем этапе.
        </p>

        <div className="flex flex-col gap-3.5">
          {aliveSuspects.map((s: any, i: number) => (
            <article
              key={s.id}
              className="relative border border-[#2c2821] bg-[#16140f] rounded p-5 pb-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex-none w-[46px] h-[46px] rounded-full grid place-items-center border border-[#3a342a] bg-[#0f0e0c]">
                  <i className={`fa-solid ${s.icon} text-[17px] text-[#a79d8b]`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-['IBM_Plex_Mono'] text-[10px] tracking-[.16em] text-[#6f675a] uppercase">
                    Подозреваемый № 0{i + 1}
                  </div>
                  <div className="font-['Playfair_Display'] text-[24px] font-bold leading-tight mt-0.5">
                    {s.name}
                  </div>
                  <div className="text-[13px] text-[#a79d8b] mt-0.5">{s.role}</div>
                </div>
              </div>

              <p className="mt-4 font-['Playfair_Display'] italic text-[16px] leading-snug">
                «{s.description}»
              </p>

              <dl className="mt-3.5 pt-3 border-t border-dashed border-[#3a342a] grid gap-2.5">
                <div className="grid grid-cols-[62px_1fr] gap-2.5 text-[13.5px]">
                  <dt className="font-['IBM_Plex_Mono'] text-[10px] tracking-[.14em] uppercase text-[#6f675a] pt-0.5">
                    Мотив
                  </dt>
                  <dd className="text-[#a79d8b]">
                    <span className="inline-block font-['IBM_Plex_Mono'] text-[10px] tracking-[.1em] uppercase text-[#ece4d4] border border-[#3a342a] px-1.5 py-px rounded-sm mr-1.5">
                      {s.motive.split(':')[0]}
                    </span>
                    {s.motive.split(':').slice(1).join(':').trim()}
                  </dd>
                </div>
                <div className="grid grid-cols-[62px_1fr] gap-2.5 text-[13.5px]">
                  <dt className="font-['IBM_Plex_Mono'] text-[10px] tracking-[.14em] uppercase text-[#6f675a] pt-0.5">
                    Алиби
                  </dt>
                  <dd className="text-[#a79d8b]">{s.alibi}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

// ============================================================
// ЭКРАН 6: VOTING
// ============================================================

function VotingScreen({
  scenario,
  round,
  aliveSuspects,
  isCaptain,
  myTeam,
  teams,
  onVote
}: any) {
  const [selected, setSelected] = useState<number | null>(null);
  const voted = !!myTeam?.vote;
  const totalTeams = teams.length;
  const votedCount = teams.filter((t: any) => t.vote).length;

  function select(i: number) {
    if (voted || !isCaptain) return;
    setSelected(selected === i ? null : i);
  }

  function submit() {
    if (selected === null || voted) return;
    onVote(aliveSuspects[selected].id);
  }

  const s = selected !== null ? aliveSuspects[selected] : null;
  const hint = voted
    ? 'Голос принят'
    : !isCaptain
    ? 'Решение принимает капитан'
    : s
    ? `Ваш выбор: ${s.name}`
    : 'Выберите подозреваемого';

  if (voted) {
    return (
      <VoteAcceptedScreen
        scenario={scenario}
        round={round}
        votedCount={votedCount}
        totalTeams={totalTeams}
        teams={teams}
        myTeam={myTeam}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0d0c0b] text-[#ece4d4] overflow-hidden">
      <div
        className="fixed top-[-10%] right-[-40%] w-[120%] h-[70%] pointer-events-none -rotate-[24deg]"
        style={{
          background:
            'repeating-linear-gradient(180deg, rgba(236,228,212,.035) 0 26px, transparent 26px 48px)',
          maskImage: 'radial-gradient(closest-side, #000, transparent)'
        }}
      />
      <main className="relative max-w-[480px] mx-auto px-5 pb-[140px]">
        <header className="sticky top-0 z-10 flex justify-between items-center py-4 bg-gradient-to-b from-[#0d0c0b] via-[#0d0c0b] to-transparent">
          <div className="flex items-center gap-2.5">
            <i className="fa-solid fa-utensils text-[#b3261e] text-sm" />
            <span className="font-['Playfair_Display'] italic text-[17px]">
              {scenario.title}
            </span>
          </div>
          <div className="font-['IBM_Plex_Mono'] text-[11px] tracking-[.14em] uppercase text-[#a79d8b] border border-[#3a342a] px-2.5 py-1 rounded-sm">
            Раунд <b className="text-[#ece4d4] font-medium">{round}</b> / 4
          </div>
        </header>

        <section className="py-6 border-b border-[#2c2821]">
          <div className="font-['IBM_Plex_Mono'] text-[11px] tracking-[.18em] uppercase text-[#b3261e] flex items-center gap-2.5 mb-3.5">
            <span className="w-5 h-px bg-[#b3261e]" />
            Дело · {scenario.location}
          </div>
          <h1 className="font-['Playfair_Display'] font-bold text-[36px] leading-[1.05] tracking-[-.01em]">
            Голосование
            <br />
            <em className="italic font-medium text-[#a79d8b]">
              кто убил?
            </em>
          </h1>
          <p className="mt-3.5 text-[#a79d8b] text-[14px] max-w-[34ch]">
            Изучите досье. У каждого был мотив — но только один солгал об алиби.
          </p>
        </section>

        {!isCaptain && (
          <div className="mt-5 p-4 border border-[#3a342a] rounded text-[13px] text-[#a79d8b]">
            Решение принимает капитан команды. Вы наблюдаете.
          </div>
        )}

        <div className="flex flex-col gap-3.5 pt-6">
          {aliveSuspects.map((s: any, i: number) => (
            <article
              key={s.id}
              onClick={() => select(i)}
              className={
                'relative border rounded cursor-pointer transition p-5 pb-4 ' +
                (selected === i
                  ? 'border-[#b3261e] bg-[#1c1914]'
                  : 'border-[#2c2821] bg-[#16140f]')
              }
            >
              {selected === i && (
                <span className="absolute left-0 top-5 bottom-5 w-0.5 bg-[#b3261e]" />
              )}
              <div className="flex items-start gap-3.5">
                <div
                  className={
                    'flex-none w-[46px] h-[46px] rounded-full grid place-items-center border transition ' +
                    (selected === i
                      ? 'border-[#b3261e]'
                      : 'border-[#3a342a] bg-[#0f0e0c]')
                  }
                >
                  <i
                    className={`fa-solid ${s.icon} text-[17px] ${
                      selected === i ? 'text-[#b3261e]' : 'text-[#a79d8b]'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-['IBM_Plex_Mono'] text-[10px] tracking-[.16em] text-[#6f675a] uppercase">
                    Подозреваемый № 0{i + 1}
                  </div>
                  <div className="font-['Playfair_Display'] text-[24px] font-bold leading-tight mt-0.5">
                    {s.name}
                  </div>
                  <div className="text-[13px] text-[#a79d8b] mt-0.5">{s.role}</div>
                </div>
                <div
                  className={
                    'flex-none w-6 h-6 rounded-full border grid place-items-center mt-1 transition ' +
                    (selected === i
                      ? 'bg-[#b3261e] border-[#b3261e]'
                      : 'border-[#3a342a]')
                  }
                >
                  <i
                    className={`fa-solid fa-check text-[11px] ${
                      selected === i ? 'text-white' : 'text-transparent'
                    }`}
                  />
                </div>
              </div>

              <p className="mt-4 font-['Playfair_Display'] italic text-[16px] leading-snug">
                «{s.description}»
              </p>

              <dl className="mt-3.5 pt-3 border-t border-dashed border-[#3a342a] grid gap-2.5">
                <div className="grid grid-cols-[62px_1fr] gap-2.5 text-[13.5px]">
                  <dt className="font-['IBM_Plex_Mono'] text-[10px] tracking-[.14em] uppercase text-[#6f675a] pt-0.5">
                    Мотив
                  </dt>
                  <dd className="text-[#a79d8b]">
                    <span
                      className={
                        'inline-block font-[\'IBM_Plex_Mono\'] text-[10px] tracking-[.1em] uppercase text-[#ece4d4] border px-1.5 py-px rounded-sm mr-1.5 transition ' +
                        (selected === i ? 'border-[#b3261e80]' : 'border-[#3a342a]')
                      }
                    >
                      {s.motive.split(':')[0]}
                    </span>
                    {s.motive.split(':').slice(1).join(':').trim()}
                  </dd>
                </div>
                <div className="grid grid-cols-[62px_1fr] gap-2.5 text-[13.5px]">
                  <dt className="font-['IBM_Plex_Mono'] text-[10px] tracking-[.14em] uppercase text-[#6f675a] pt-0.5">
                    Алиби
                  </dt>
                  <dd className="text-[#a79d8b]">{s.alibi}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </main>

      <div className="fixed left-0 right-0 bottom-0 z-20 px-5 pt-4 pb-[calc(18px_+_env(safe-area-inset-bottom))] bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b] to-transparent">
        <div className="max-w-[440px] mx-auto">
          <div className="font-['IBM_Plex_Mono'] text-[11px] tracking-[.08em] text-center text-[#6f675a] mb-2.5 min-h-[17px] flex items-center justify-center gap-3">
            <span>{hint}</span>
            {!voted && (
              <span className="text-[#b3261e]">
                <i className="fa-regular fa-clock mr-1" />
                <VotingCountdown />
              </span>
            )}
          </div>
          <button
            onClick={submit}
            disabled={selected === null || !isCaptain}
            className={
              'w-full h-[56px] rounded flex items-center justify-center gap-2.5 font-semibold text-[15px] transition ' +
              (selected !== null && isCaptain
                ? 'bg-[#b3261e] text-white active:scale-[.98]'
                : 'bg-[#2c2821] text-[#6f675a] cursor-not-allowed')
            }
          >
            <i className="fa-solid fa-gavel text-sm" />
            <span>
              {selected !== null && isCaptain
                ? `Обвинить: ${aliveSuspects[selected].name}`
                : 'Обвинить'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ЭКРАН 7: ГОЛОС ПРИНЯТ
// ============================================================

function VoteAcceptedScreen({
  scenario,
  round,
  votedCount,
  totalTeams,
  teams,
  myTeam
}: any) {
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (votedCount >= totalTeams) setWaiting(false);
  }, [votedCount, totalTeams]);

  return (
    <div className="relative min-h-screen flex justify-center bg-[#0e0d0c] text-[#e8e2d6] overflow-hidden">
      <RainCanvas opacity={0.4} lightning />
      <div className="relative z-[2] w-full max-w-[480px] min-h-screen flex flex-col">
        <header className="flex justify-between items-center px-5 py-4 text-[13px] text-[#9a9388] border-b border-white/[.06]">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-wine-glass text-[#b5553f] text-xs" />
            {scenario.title}
          </div>
          <div>
            Раунд <b className="text-[#e8e2d6] font-medium">{round}</b> / 4
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center px-7 py-10">
          <div className="relative w-[92px] h-[92px] rounded-full border border-[#b5553f73] grid place-items-center mb-9">
            <div className="absolute inset-2 rounded-full border border-dashed border-[#b5553f4d] animate-spin" style={{ animationDuration: '24s' }} />
            <i className={`fa-solid ${waiting ? 'fa-envelope-circle-check' : 'fa-magnifying-glass'} text-[30px] text-[#b5553f]`} />
          </div>
          <div className="text-[11px] tracking-[.32em] uppercase text-[#7d766b] mb-3.5">
            Голосование
          </div>
          <h1 className="font-['Cormorant_Garamond'] font-medium text-[44px] leading-[1.05] text-[#f1ebdf] mb-4">
            Ваш голос
            <br />
            <em className="text-[#c7654d] italic">принят</em>
          </h1>
          <div className="w-12 h-px bg-[#b5553f] mb-5" />
          <div className="text-[15px] text-[#a79f93]">
            {waiting ? (
              <>
                Ожидание результата
                <span className="inline-flex gap-0.5 ml-0.5">
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse" style={{ animationDelay: '.2s' }}>.</span>
                  <span className="animate-pulse" style={{ animationDelay: '.4s' }}>.</span>
                </span>
              </>
            ) : (
              'Все голоса собраны. Результат готов.'
            )}
          </div>

          <div className="mt-11 w-full max-w-[280px]">
            <div className="flex justify-between text-[12px] text-[#7d766b] mb-2.5">
              <span>Проголосовали</span>
              <span>
                <b className="text-[#e8e2d6] font-medium">{votedCount}</b> из {totalTeams}
              </span>
            </div>
            <div className="h-0.5 bg-white/[.08] rounded overflow-hidden">
              <div
                className="h-full bg-[#b5553f] transition-all duration-500"
                style={{ width: `${(votedCount / Math.max(1, totalTeams)) * 100}%` }}
              />
            </div>
            <div className="flex justify-center gap-2.5 mt-5">
              {teams.map((t: any, i: number) => (
                <div
                  key={t.id}
                  className={
                    'w-[34px] h-[34px] rounded-full border flex items-center justify-center transition ' +
                    (t.vote
                      ? 'border-[#b5553f99] bg-[#b5553f14]'
                      : 'border-white/[.12]')
                  }
                >
                  <i
                    className={`fa-solid fa-user-secret text-[13px] ${
                      t.vote ? 'text-[#c7654d]' : 'text-[#4d4842]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="px-5 pb-7 text-center">
          <p className="font-['Cormorant_Garamond'] italic text-[17px] text-[#6f685e] leading-snug mb-5">
            «В этом городе у каждого есть тайна. Вопрос лишь — чья окажется тяжелее.»
          </p>
        </footer>
      </div>
    </div>
  );
}

// ============================================================
// ЭКРАН 8: RESULTS
// ============================================================

function ResultsScreen({
  scenario,
  round,
  lastResult,
  myTeam,
  elimSuspect
}: any) {
  return (
    <div className="relative min-h-screen flex justify-center bg-[#0e0d0c] text-[#e8e2d6] overflow-hidden">
      <RainCanvas opacity={0.4} lightning />
      <main className="relative z-[2] w-full max-w-[480px] px-6 py-10">
        <div className="text-[11px] tracking-[.32em] uppercase text-[#7d766b] text-center mb-2">
          Итог раунда
        </div>
        <h1 className="font-['Cormorant_Garamond'] font-medium text-[42px] leading-[1.05] text-[#f1ebdf] text-center mb-7">
          Раунд {round}
        </h1>

        {elimSuspect ? (
          <div className="border border-[#2c2821] rounded-lg p-5 mb-6">
            <div className="text-[10px] tracking-[.2em] uppercase text-[#b5553f] mb-2">
              Вердикт следствия
            </div>
            <div className="flex items-center gap-2.5 mb-2">
              <i className={`fa-solid ${elimSuspect.icon} text-[#c7654d]`} />
              <div className="font-['Cormorant_Garamond'] text-[26px] text-[#f1ebdf]">
                {elimSuspect.name}
              </div>
            </div>
            <div className="text-[13px] text-[#a79f93] mb-2">{elimSuspect.role}</div>
            <div className="text-[13px] text-[#a79f93] leading-snug">
              {elimSuspect.verdict ||
                'Большинство команд назвало его, но это не убийца. Он выбывает из расследования.'}
            </div>
          </div>
        ) : (
          <div className="text-center text-[#a79f93] text-sm mb-6">
            Никто не выбывает в этом раунде.
          </div>
        )}

        {myTeam && (
          <div className="border-t border-[#2c2821] pt-4 text-center text-[12px] text-[#7d766b]">
            {myTeam.vote
              ? lastResult?.correctTeamIds?.includes(myTeam.id)
                ? 'Ваш голос был верным'
                : 'Ваш голос был ошибочным'
              : 'Команда не голосовала'}
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================
// ЭКРАН 9: END
// ============================================================

function EndScreen({ scenario }: any) {
  return (
    <div className="relative min-h-screen flex justify-center bg-[#0e0d0c] text-[#e8e2d6] overflow-hidden">
      <div
        className="absolute inset-[-20%] pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(115deg, rgba(255,244,220,.035) 0 22px, transparent 22px 54px)',
          maskImage:
            'radial-gradient(ellipse 60% 45% at 65% 35%, #000 0%, transparent 75%)'
        }}
      />
      <div className="relative z-[2] w-full max-w-[480px] min-h-screen flex flex-col">
        <header className="flex justify-between items-center px-5 py-4 text-[13px] text-[#9a9388] border-b border-white/[.06]">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-wine-glass text-[#b5553f] text-xs" />
            {scenario.title}
          </div>
          <div className="font-bold text-[#e8e2d6]">Финал</div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center px-7 py-10">
          <div className="relative w-[92px] h-[92px] rounded-full border border-[#b5553f73] grid place-items-center mb-9">
            <div
              className="absolute inset-2 rounded-full border border-dashed border-[#b5553f4d] animate-spin"
              style={{ animationDuration: '24s' }}
            />
            <i className="fa-solid fa-star text-[30px] text-[#b5553f]" />
          </div>
          <div className="text-[11px] tracking-[.32em] uppercase text-[#7d766b] mb-3.5">
            Дело закрыто
          </div>
          <h1 className="font-['Cormorant_Garamond'] font-medium text-[44px] leading-[1.05] text-[#f1ebdf] mb-6">
            Вы были сегодня
            <br />
            <em className="text-[#c7654d] italic">великолепны</em>
          </h1>
          <div className="w-12 h-px bg-[#b5553f] mb-6" />
          <p className="font-['Cormorant_Garamond'] italic text-[19px] text-[#a79f93] leading-snug max-w-[340px]">
            «Каждая история заканчивается. Но у хорошего детектива всегда есть следующее
            дело.»
          </p>
        </main>
      </div>
    </div>
  );
}

function VotingCountdown() {
  const [left, setLeft] = useState(30);
  useEffect(() => {
    const t = setInterval(() => setLeft(l => Math.max(0, l - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-['IBM_Plex_Mono'] tabular-nums">
      0:{String(left).padStart(2, '0')}
    </span>
  );
}