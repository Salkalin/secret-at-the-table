import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { getSocket } from '../socket';
import { useSpeech } from '../SpeechContext';
import { ROMAN, GAME_RULES, GAME_NOTE, REVEAL_MARKS, ROUND_SECONDS } from '../landing/data';
import {
  IntroScene,
  Chapter1Scene,
  Chapter2Scene,
  Chapter3Scene,
  FinalScene,
  OlegScene,
  DmitryScene,
  MariaScene,
  ViktorScene,
  ElenaScene
} from '../screens';

const fmt = (s: number) => {
  s = Math.max(0, s);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

const pad = (n: number) => String(n).padStart(2, '0');

const initials = (n: string) =>
  n
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function Screen() {
  const { code } = useParams();
  const [state, setState] = useState<any>(null);
  const [qr, setQr] = useState('');
  const [busy, setBusy] = useState(false);
  const [accuseOpen, setAccuseOpen] = useState(false);
  const sock = useRef(getSocket());
  const speech = useSpeech();
  const [bgUrl, setBgUrl] = useState<string>('');
  const joinedRef = useRef(false); // защита от дублирующегося screen:join (StrictMode)

  // Хелпер для клиентских трейсов
  const trace = (event: string, data?: any) => {
    if (!code) return;
    sock.current.emit('client:trace', { code, event, data });
  };

  useEffect(() => {
    if (!state) return;
    const sc = state.scenario;
    const ch = state.chapter;
    const showBg = ['intro', 'story'].includes(state.phase);
    const url = showBg ? ch?.bg || sc?.bg || '' : '';
    setBgUrl(url);
  }, [state?.phase, state?.round, state?.chapter?.bg, state?.scenario?.bg]);

  useEffect(() => {
    const s = sock.current;
    if (!joinedRef.current) {
      joinedRef.current = true;
      s.emit('screen:join', { code }, (res: any) => {
        if (res?.state) setState(res.state);
        if (res?.error) {
          trace('screen_join_failed', { error: res.error });
          alert('Сессия не найдена');
        }
      });
    }
    const onState = (st: any) => setState(st);
    s.on('state', onState);
    return () => {
      s.off('state', onState);
    };
  }, [code]);

  useEffect(() => {
    if (!state) return;
    const url = `${location.origin}/play/${code}`;
    QRCode.toDataURL(url, {
      width: 320,
      margin: 1,
      color: { dark: '#1a0f0a', light: '#f3e6cf' }
    }).then(setQr);
  }, [state?.code, code]);

  const advance = () => {
    if (busy) return;
    setBusy(true);
    trace('host_advance_click', { phase: state?.phase, round: state?.round });
    sock.current.emit('host:advance', { code }, () => setBusy(false));
  };

  const goBack = () => {
    if (busy) return;
    setBusy(true);
    trace('host_prev_click', { phase: state?.phase, round: state?.round });
    sock.current.emit('host:prev', { code }, (res: any) => {
      setBusy(false);
      if (res?.error === 'no_prev') {
        trace('host_prev_blocked', {});
        alert('Назад уже нельзя');
      }
    });
  };
  const togglePause = () => {
    trace('host_toggle_pause_click', { phase: state?.phase, round: state?.round });
    sock.current.emit('host:toggle-pause', { code }, () => {});
  };

  const reset = () => {
    if (busy) return;
    setBusy(true);
    trace('host_reset_click', { phase: state?.phase });
    sock.current.emit('host:reset', { code }, (res: any) => {
      setBusy(false);
      if (res?.error) alert('Ошибка: ' + res.error);
    });
  };

  if (!state) return <div className="p-10 text-muted">Подключение к сессии…</div>;

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
    eliminatedSuspects,
    revealedClueIndices
  } = state;

  const eliminated: string[] = eliminatedSuspects || [];
  const aliveSuspects = scenario.suspects.filter((s: any) => !eliminated.includes(s.id));

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-[1200px] mx-auto">
      {bgUrl && (
        <div
          className="fixed inset-0 -z-20 transition-opacity duration-700"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.25) saturate(0.6)'
          }}
        />
      )}

      {/* SVG-сцены по фазам */}
      {phase === 'intro' && <IntroScene />}
      {phase === 'story' && round === 1 && <Chapter1Scene />}
      {phase === 'story' && round === 2 && <Chapter2Scene />}
      {phase === 'story' && round === 3 && <Chapter3Scene />}
      {phase === 'story' && round >= 4 && <FinalScene />}
      {phase === 'results' && round === 1 && <OlegScene />}
      {phase === 'results' && round === 2 && <DmitryScene />}
      {phase === 'results' && round === 3 && <MariaScene />}
      {phase === 'results' && round >= 4 && <ViktorScene />}
      {phase === 'end' && <ElenaScene />}

      <Header
        phase={phase}
        scenario={scenario}
        round={round}
        totalRounds={totalRounds}
        teamsCount={teams.length}
        cluesCount={clues.length}
        speech={speech}
      />

      {phase === 'lobby' && (
        <Lobby
          code={code}
          qr={qr}
          teams={teams}
          advance={advance}
          goBack={goBack}
          busy={busy}
          sock={sock}
          trace={trace}
        />
      )}

      {phase === 'intro' && (
        <Intro
          scenario={scenario}
          advance={advance}
          goBack={goBack}
          busy={busy}
        />
      )}

      {phase === 'story' && (
        <Story
          chapter={chapter}
          round={round}
          advance={advance}
          goBack={goBack}
          busy={busy}
          speech={speech}
          scenario={scenario}
        />
      )}

      {phase === 'discussion' && (
        <Discussion
          scenario={scenario}
          chapter={chapter}
          clues={clues}
          revealedClueIndices={revealedClueIndices || []}
          round={round}
          roundStartedAt={roundStartedAt}
          roundPausedAt={state.roundPausedAt}
          roundPausedTotalMs={state.roundPausedTotalMs}
          roundDurationSec={state.roundDurationSec}
          clueTimesSec={clueTimesSec || REVEAL_MARKS}
          advance={advance}
          goBack={goBack}
          busy={busy}
          speech={speech}
          onAccuse={() => setAccuseOpen(true)}
          onTogglePause={togglePause}
        />
      )}

      {phase === 'voting' && (
        <div>
          <div className="text-center mb-10">
            <h2 className="font-serif text-[clamp(36px,5vw,56px)] leading-none text-text font-semibold mb-3">
              Голосование
            </h2>
            <p className="text-muted max-w-[560px] mx-auto">
              Капитаны команд выбирают подозреваемого <b>на своих телефонах</b>.
            </p>
            <div className="mt-4 text-2xl font-mono text-accent tabular-nums">
              <VotingCountdown />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto mb-10">
            {aliveSuspects.map((s: any) => (
              <div
                key={s.id}
                className="bg-panel border border-line rounded-2xl p-5 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-12 h-12 rounded-full grid place-items-center bg-panel2 border border-line text-accent text-lg flex-none">
                    <i className={`fa-solid ${s.icon}`} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-serif text-xl text-text leading-tight">
                      {s.name}
                    </div>
                    <div className="text-[10.5px] tracking-wider uppercase text-muted">
                      {s.role}
                    </div>
                  </div>
                </div>
                <div className="text-[13px] text-muted leading-snug mb-3">
                  {s.description}
                </div>
                <div className="text-[12px] text-muted mt-auto pt-3 border-t border-line/60">
                  <div>
                    <span className="text-accent">Мотив:</span> {s.motive}
                  </div>
                  <div className="mt-1">
                    <span className="text-accent">Алиби:</span> {s.alibi}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={advance}
              disabled={busy}
              className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
            >
              Подвести итоги <i className="fa-solid fa-gavel" />
            </button>
          </div>
        </div>
      )}

      {phase === 'results' && lastResult && (
        <Results
          result={lastResult}
          teams={teams}
          suspects={scenario.suspects}
          advance={advance}
          round={round}
          totalRounds={totalRounds}
          busy={busy}
        />
      )}

      {phase === 'end' && (
        <EndView
          state={state}
          onReset={reset}
          speech={speech}
          onShowResults={advance}
          code={code}
          sock={sock}
          trace={trace}
        />
      )}

      {phase === 'results-final' && (
        <ResultsFinal
          teams={teams}
          onReset={reset}
          code={code}
          sock={sock}
          trace={trace}
        />
      )}

      {accuseOpen && phase === 'discussion' && (
        <AccuseModal
          suspects={aliveSuspects}
          onClose={() => setAccuseOpen(false)}
          onConfirm={() => setAccuseOpen(false)}
        />
      )}
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================

function Header({
  phase,
  scenario,
  round,
  totalRounds,
  teamsCount,
  cluesCount,
  speech
}: any) {
  const phaseLabel: Record<string, string> = {
    lobby: 'Лобби',
    intro: 'Дело открыто',
    story: 'Глава',
    discussion: 'Обсуждение',
    voting: 'Голосование',
    results: 'Итоги',
    'results-final': 'Итоги расследования',
    end: 'Разгадка'
  };

  return (
    <div className="flex justify-between items-center gap-4 pb-5 mb-8 border-b border-line flex-wrap">
      <div className="flex items-center gap-3.5 flex-wrap">
        <b className="font-serif text-2xl text-text">{scenario.title}</b>
        <span className="w-1 h-1 rounded-full bg-accent" />
        <span className="text-[13px] text-muted">{scenario.location}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {speech.supported && (
          <button
            onClick={() => speech.setEnabled(!speech.enabled)}
            className={
              'px-3.5 py-2 rounded-full border text-[11px] font-bold tracking-wider uppercase transition ' +
              (speech.enabled
                ? 'border-accent text-accent'
                : 'border-line text-muted hover:text-text')
            }
            title={speech.enabled ? 'Отключить озвучку' : 'Включить озвучку'}
          >
            {speech.enabled ? '🔊' : '🔇'}
          </button>
        )}
        {phase !== 'lobby' && phase !== 'end' && (
          <span className="px-3.5 py-2 rounded-full border border-line bg-panel text-[11px] font-bold tracking-wider uppercase">
            <i className="fa-solid fa-layer-group text-accent mr-2" />
            Раунд {round} / {totalRounds}
          </span>
        )}
        <span className="px-3.5 py-2 rounded-full border border-accent bg-panel text-[11px] font-bold tracking-wider uppercase">
          {phaseLabel[phase] || phase}
        </span>
        {phase !== 'lobby' && phase !== 'intro' && (
          <span className="px-3.5 py-2 rounded-full border border-line bg-panel text-[11px] font-bold tracking-wider uppercase">
            <i className="fa-solid fa-fingerprint text-accent mr-2" />
            Улики {cluesCount}
          </span>
        )}
        <span className="px-3.5 py-2 rounded-full border border-line bg-panel text-[11px] font-bold tracking-wider uppercase">
          <i className="fa-solid fa-users text-accent mr-2" />
          Команд: {teamsCount}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// LOBBY
// ============================================================

function Lobby({ code, qr, teams, advance, goBack, busy, sock, trace }: any) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start mt-4">
      <div>
        <div className="text-[11px] font-bold tracking-[.2em] uppercase text-accent mb-3">
          Подключение к сессии
        </div>
        <h1 className="font-serif text-[clamp(40px,5.5vw,64px)] leading-none text-text font-semibold mb-4">
          Сканируйте QR
        </h1>
        <p className="text-[15px] text-muted leading-relaxed max-w-[420px] mb-6">
          Один телефон на стол — это капитан команды. Остальные подключаются к своей
          команде как зрители.
        </p>

        <div className="w-full max-w-[280px] p-3 rounded-2xl bg-[#f3e6cf] border border-line mb-5">
          {qr && <img src={qr} alt="QR" className="block w-full aspect-square rounded" />}
        </div>

        <div className="font-mono text-xl text-text mb-6 flex items-baseline gap-3">
          Код: <b className="text-accent tracking-widest font-medium">{code}</b>
        </div>

        <ul className="space-y-2.5 mb-8 list-none p-0">
          <li className="flex gap-3 text-[13.5px] text-[#cdbca8] leading-snug">
            <i className="fa-solid fa-camera text-accent mt-1 w-3.5" />
            <span>Наведите камеру телефона на QR или введите код вручную</span>
          </li>
          <li className="flex gap-3 text-[13.5px] text-[#cdbca8] leading-snug">
            <i className="fa-solid fa-user-tie text-accent mt-1 w-3.5" />
            <span>Первый вошедший за столом становится капитаном</span>
          </li>
          <li className="flex gap-3 text-[13.5px] text-[#cdbca8] leading-snug">
            <i className="fa-solid fa-eye text-accent mt-1 w-3.5" />
            <span>Зрители видят улики, но голосует только капитан</span>
          </li>
        </ul>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={advance}
            disabled={busy || !teams.length}
            className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
          >
            Начать игру <i className="fa-solid fa-play" />
          </button>

          <button
            onClick={async () => {
              try {
                await fetch('/api/logout', { method: 'POST' });
              } catch {}
              trace('host_close_click', {});
              sock.current.emit('host:close', { code });
              window.location.href = '/host';
            }}
            className="px-6 py-3.5 rounded-xl border border-line bg-panel text-muted hover:bg-panel2 text-[15px]"
          >
            ← К выбору дела
          </button>
        </div>
      </div>

      <div className="bg-panel border border-line rounded-2xl p-6 md:p-7">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-serif text-[26px] text-text flex items-center gap-3 m-0">
            <i className="fa-solid fa-user-group text-accent text-base" />
            Участники
          </h3>
          <span className="text-[11px] font-bold tracking-wider uppercase text-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Ожидание
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                  #
                </th>
                <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                  Команда
                </th>
                <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                  Капитан
                </th>
                <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold pb-3 px-2 border-b border-line">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-muted text-sm">
                    <i className="fa-solid fa-qrcode block text-2xl text-accent/60 mb-3" />
                    Пока никто не подключился.
                    <br />
                    Ждём первую команду…
                  </td>
                </tr>
              )}
              {teams.map((t: any, i: number) => (
                <tr key={t.id} className="border-b border-line last:border-0">
                  <td className="py-3.5 px-2 font-mono text-muted text-xs">
                    {pad(i + 1)}
                  </td>
                  <td className="py-3.5 px-2">
                    <div className="flex items-center gap-3 text-text font-bold">
                      <span className="w-8 h-8 rounded-full grid place-items-center bg-white/5 border border-accent text-accent font-serif text-sm font-bold">
                        {t.name[0]}
                      </span>
                      {t.name}
                    </div>
                  </td>
                  <td className="py-3.5 px-2 text-text">{t.captainName || '—'}</td>
                  <td className="py-3.5 px-2">
                    {now - (t.joinedAt || 0) < 2500 ? (
                      <span className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full border border-line text-[#d9c49a]">
                        <i className="fa-solid fa-spinner fa-spin" />
                        Входит
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-400/35 text-green-300">
                        <i className="fa-solid fa-circle-check" />
                        Готов
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INTRO (Дело открыто)
// ============================================================

function Intro({ scenario, advance, goBack, busy }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div>
        <div className="text-[11px] font-bold tracking-[.2em] uppercase text-accent mb-3">
          Дело № 001 · классический режим
        </div>
        <h1 className="font-serif text-[clamp(44px,5.5vw,72px)] leading-none text-text font-semibold mb-4">
          {scenario.title}
        </h1>
        <p className="text-[16px] text-[#cdbca8] leading-relaxed mb-8">
          {scenario.description}
        </p>

        <dl className="space-y-5 m-0">
          <div>
            <dt className="text-[10.5px] tracking-[.2em] uppercase text-accent font-bold mb-1.5">
              Преступление
            </dt>
            <dd className="m-0 text-[15px] text-text">{scenario.crime}</dd>
          </div>
          <div>
            <dt className="text-[10.5px] tracking-[.2em] uppercase text-accent font-bold mb-1.5">
              Жертва
            </dt>
            <dd className="m-0 text-[15px] text-text">{scenario.victim}</dd>
          </div>
          <div>
            <dt className="text-[10.5px] tracking-[.2em] uppercase text-accent font-bold mb-1.5">
              Место
            </dt>
            <dd className="m-0 text-[15px] text-text">{scenario.location}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-accent">Формат</dt>
            <dd className="text-muted">
              4 раунда расследования · {scenario.suspects.length} подозреваемых
              {scenario.clues ? ` · ${scenario.clues.length} улик` : ''}
            </dd>
          </div>
        </dl>

        <div className="flex gap-3 mt-10 flex-wrap">
          <button
            onClick={advance}
            disabled={busy}
            className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
          >
            Начать первый раунд <i className="fa-solid fa-arrow-right" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-[26px] text-text flex items-center gap-3 m-0 mb-4">
          <i className="fa-solid fa-scroll text-accent text-base" />
          Правила игры
        </h3>
        <ol className="list-none p-0 m-0 space-y-2.5">
          {GAME_RULES.map(r => (
            <li
              key={r.n}
              className="flex gap-4 p-4 rounded-xl bg-panel border border-line hover:border-line/80 hover:translate-x-1 transition"
            >
              <span className="flex-none w-8 h-8 rounded-full border border-accent text-accent grid place-items-center text-[11px] font-bold">
                {r.n}
              </span>
              <div>
                <h4 className="text-[14.5px] text-text font-bold m-0 mb-1">{r.title}</h4>
                <p className="text-[13px] text-[#b9a898] leading-snug m-0">{r.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ============================================================
// STORY (Глава)
// ============================================================

function Story({ chapter, round, advance, goBack, busy, speech }: any) {
  const hasChapter = !!chapter;

  if (!hasChapter) {
    return (
      <div className="w-full mt-6 flex flex-col items-center justify-center text-center">
        <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-accent mb-3">
          Финал
        </div>
        <h1 className="font-serif text-[clamp(44px,6vw,72px)] leading-none text-text font-semibold mb-6">
          Последнее слово
        </h1>

        <p className="my-8 text-[18px] leading-[1.75] text-text max-w-[680px]">
          Улики закончились. Каждый оставшийся детектив называет имя убийцы.
          <br />
          Кто угадает — выиграл дело.
        </p>

        <div className="flex items-center justify-center gap-5 mt-8 flex-wrap">
          <button
            onClick={advance}
            disabled={busy}
            className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
          >
            К обсуждению <i className="fa-solid fa-hourglass-start" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[780px] mt-6">
      <div className="text-[11px] font-bold tracking-[0.22em] uppercase text-accent mb-3">
        Глава {ROMAN[round - 1] || round}
      </div>
      <h1 className="font-serif text-[clamp(44px,6vw,72px)] leading-none text-text font-semibold mb-4">
        {chapter.title}
      </h1>
      {chapter.atmosphere && (
        <div className="flex items-center gap-2.5 font-mono text-[12.5px] text-muted mb-8">
          <i className="fa-solid fa-feather-pointed text-accent text-[13px]" />
          <span>{chapter.atmosphere}</span>
        </div>
      )}

      <p className="my-8 pl-7 border-l-2 border-accent text-[18px] leading-[1.75] text-text max-w-[680px]">
        {chapter.text}
      </p>

      {speech.supported && (
        <div className="mt-6 mb-4 flex gap-3 flex-wrap">
          <button
            onClick={() =>
              speech.speak(
                chapter.title + '. ' + chapter.atmosphere + '. ' + chapter.text,
                { rate: 0.9, pitch: 0.9 }
              )
            }
            className="px-4 py-2 rounded-lg border border-line bg-panel hover:bg-panel2 text-sm"
          >
            🔊 Озвучить главу
          </button>
          {speech.speaking && (
            <button
              onClick={speech.stop}
              className="px-4 py-2 rounded-lg border border-accent text-accent text-sm"
            >
              ⏹ Остановить
            </button>
          )}
        </div>
      )}

      <div className="flex items-center gap-5 mt-8 flex-wrap">
        <button
          onClick={advance}
          disabled={busy}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
        >
          Перейти к главе <i className="fa-solid fa-hourglass-start" />
        </button>
        <button
          onClick={goBack}
          disabled={busy}
          className="px-5 py-3.5 rounded-xl border border-line bg-panel text-muted hover:bg-panel2 text-sm disabled:opacity-40"
        >
          ← Назад
        </button>
        <span className="text-[13px] text-muted">
          ведущий читает главу вслух — затем запустите таймер раунда
        </span>
      </div>
    </div>
  );
}

// ============================================================
// DISCUSSION (обсуждение с доской улик)
// ============================================================

function Discussion({
  scenario,
  chapter,
  clues,
  revealedClueIndices,
  round,
  roundStartedAt,
  roundPausedAt,
  roundPausedTotalMs,
  roundDurationSec,
  clueTimesSec,
  advance,
  goBack,
  busy,
  speech,
  onAccuse,
  onTogglePause
}: any) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const pausedNow = roundPausedAt ? Date.now() - roundPausedAt : 0;
  const elapsed = Math.floor(
    (now - (roundStartedAt || now) - (roundPausedTotalMs || 0) - pausedNow) / 1000
  );
  const isPaused = !!roundPausedAt;
  const duration = roundDurationSec || ROUND_SECONDS;
  const elapsedCapped = Math.min(elapsed, duration);
  const left = Math.max(0, duration - elapsed);
  const running = left > 0 && !!roundStartedAt;

  const allClues = scenario.clues || [];
  const roundClues =
    round >= 4
      ? allClues.map((c: any, i: number) => ({ c, i }))
      : allClues
          .map((c: any, i: number) => ({ c, i }))
          .filter((x: any) => x.c.round === round);

  const nextMark = clueTimesSec.find((t: number) => t > elapsedCapped);

  const archiveClues =
    round >= 4
      ? []
      : allClues
          .map((c: any, i: number) => ({ c, i }))
          .filter(
            (x: any) => x.c.round < round && revealedClueIndices.includes(x.i)
          );

  return (
    <div>
      <div
        className={
          'grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 items-center mt-2 mb-8 p-6 md:p-7 rounded-2xl bg-panel border transition ' +
          (left <= 0 ? 'border-accent' : 'border-line')
        }
      >
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-line text-text bg-panel">
            <i className="fa-solid fa-hourglass-half text-accent" />
            Совещание детективов
          </span>
          <p className="mt-3.5 mb-0 text-[14px] text-[#b9a898] leading-snug whitespace-nowrap overflow-hidden text-ellipsis">
            {left <= 0
              ? 'Время раунда вышло'
              : isPaused
              ? 'Таймер на паузе'
              : round >= 4
              ? 'Все улики на доске'
              : nextMark
              ? `Следующая улика через ${fmt(nextMark - elapsedCapped)}`
              : 'Все улики на доске'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={
              'font-serif text-[clamp(44px,5.5vw,68px)] leading-none tabular-nums transition ' +
              (left <= 0 ? 'text-accent' : isPaused ? 'text-muted' : 'text-text')
            }
          >
            {fmt(left)}
          </div>
          <button
            onClick={onTogglePause}
            disabled={left <= 0}
            className="w-10 h-10 rounded-full border border-line bg-panel hover:bg-panel2 disabled:opacity-40 transition"
            title={isPaused ? 'Продолжить' : 'Пауза'}
          >
            <i
              className={`fa-solid ${
                isPaused ? 'fa-play text-accent' : 'fa-pause'
              } text-sm`}
            />
          </button>
        </div>

        <div className="md:col-span-2 relative h-[3px] rounded bg-white/8 my-3">
          <i
            className="absolute left-0 top-0 bottom-0 rounded bg-accent transition-all duration-1000"
            style={{ width: `${(elapsedCapped / duration) * 100}%` }}
          />
          {round < 4 && (
            <div className="absolute inset-0">
              {clueTimesSec.map((t: number, i: number) => (
                <span
                  key={i}
                  className={
                    'absolute top-1/2 w-[11px] h-[11px] -mt-[5.5px] -ml-[5.5px] rounded-full border-1.5 transition ' +
                    (elapsedCapped >= t
                      ? 'bg-accent border-accent'
                      : 'bg-[#1a110d] border-line')
                  }
                  style={{ left: `${(t / duration) * 100}%` }}
                >
                  <em
                    className={
                      'absolute top-4 left-1/2 -translate-x-1/2 not-italic font-mono text-[10.5px] whitespace-nowrap ' +
                      (elapsed >= t ? 'text-text' : 'text-muted')
                    }
                  >
                    {fmt(t)}
                  </em>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-baseline gap-4 mb-4 flex-wrap">
        <h3 className="font-serif text-[26px] text-text flex items-center gap-3 m-0">
          <i className="fa-solid fa-thumbtack text-accent text-base" />
          Доска улик
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roundClues.map(({ c, i }: any) => {
          const revealed = revealedClueIndices.includes(i);
          const markTime =
            clueTimesSec[roundClues.findIndex((x: any) => x.i === i)] || 0;

          if (revealed) {
            return (
              <div
                key={i}
                className="rounded-lg p-5 text-[#2a1c14] flex flex-col min-h-[190px]"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, transparent 0 31px, rgba(80,50,30,.06) 31px 32px), radial-gradient(ellipse at 20% 0%, #fbf1dd, #f1e4cb 60%)',
                  boxShadow: '0 16px 40px -22px rgba(0,0,0,.8)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#1d120c] text-[#efe3cc] grid place-items-center">
                    <i className={`fa-solid ${c.icon} text-[13px]`} />
                  </span>
                  <b className="text-[14.5px] text-[#1d120c] font-bold">
                    {c.name}
                  </b>
                </div>
                <p className="m-0 flex-1 font-mono text-[13px] leading-relaxed text-[#3a281c]">
                  {c.desc}
                </p>
                <small className="mt-3.5 pt-3 border-t border-dashed border-[rgba(42,28,20,.22)] text-[10px] tracking-[.16em] uppercase text-[#8a6a52] font-bold">
                  Глава {ROMAN[c.round - 1] || c.round} · открыта на {fmt(markTime)}
                </small>
              </div>
            );
          }

          return (
            <div
              key={i}
              className="rounded-lg min-h-[190px] flex flex-col items-center justify-center gap-2.5 text-center p-5 border border-dashed border-line bg-panel/40"
            >
              <i className="fa-solid fa-lock text-accent text-lg opacity-70" />
              <b className="font-mono text-2xl text-text font-medium tabular-nums">
                {fmt(Math.max(0, markTime - elapsedCapped))}
              </b>
              <span className="text-[12px] text-muted tracking-wide">
                до улики {pad(i + 1)}
              </span>
            </div>
          );
        })}
      </div>
      {archiveClues.length > 0 && (
        <>
          <div className="mt-10 text-[11px] tracking-[.2em] uppercase text-muted font-bold">
            Из прошлых глав
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3.5">
            {archiveClues.map(({ c, i }: any) => (
              <div
                key={i}
                className="rounded-lg p-5 text-[#2a1c14] flex flex-col min-h-[190px] opacity-80"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, transparent 0 31px, rgba(80,50,30,.06) 31px 32px), radial-gradient(ellipse at 20% 0%, #fbf1dd, #f1e4cb 60%)',
                  boxShadow: '0 16px 40px -22px rgba(0,0,0,.6)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#1d120c] text-[#efe3cc] grid place-items-center">
                    <i className={`fa-solid ${c.icon} text-[13px]`} />
                  </span>
                  <b className="text-[14.5px] text-[#1d120c] font-bold">
                    {c.name}
                  </b>
                </div>
                <p className="m-0 flex-1 font-mono text-[13px] leading-relaxed text-[#3a281c]">
                  {c.desc}
                </p>
                <small className="mt-3.5 pt-3 border-t border-dashed border-[rgba(42,28,20,.22)] text-[10px] tracking-[.16em] uppercase text-[#8a6a52] font-bold">
                  Глава {ROMAN[c.round - 1] || c.round}
                </small>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex gap-3 mt-10 pt-6 border-t border-line flex-wrap">
        <button
          onClick={advance}
          disabled={busy}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
        >
          {round >= 4 ? 'Финальная разгадка' : 'Голосование'}{' '}
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// VOTING (заглушка с инструкцией)
// ============================================================

function Voting({ scenario, aliveSuspects, advance, goBack, busy }: any) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="font-serif text-[clamp(36px,5vw,56px)] leading-none text-text font-semibold mb-3">
          Итоги расследования
        </h2>
        <p className="text-muted max-w-[560px] mx-auto">
          Капитаны команд выбирают подозреваемого <b>на своих телефонах</b>. Ведущий
          дожидается всех и подводит итоги.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1000px] mx-auto mb-8">
        {aliveSuspects.map((s: any) => (
          <div key={s.id} className="bg-panel border border-line rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12 h-12 rounded-full grid place-items-center bg-panel2 border border-line text-accent text-lg">
                <i className={`fa-solid ${s.icon}`} />
              </span>
              <div>
                <div className="font-serif text-xl text-text leading-tight">{s.name}</div>
                <div className="text-[10.5px] tracking-wider uppercase text-muted">
                  {s.role}
                </div>
              </div>
            </div>
            <div className="text-[13px] text-muted leading-snug mb-2">{s.description}</div>
            <div className="text-[12px] text-muted">
              <div>
                <span className="text-accent">Мотив:</span> {s.motive}
              </div>
              <div>
                <span className="text-accent">Алиби:</span> {s.alibi}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={advance}
          disabled={busy}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
        >
          Подвести итоги <i className="fa-solid fa-gavel" />
        </button>
        <button
          onClick={goBack}
          disabled={busy}
          className="px-6 py-3.5 rounded-xl border border-line bg-panel text-muted hover:bg-panel2 text-[15px] disabled:opacity-40"
        >
          ← Назад
        </button>
      </div>
    </div>
  );
}

// ============================================================
// RESULTS (итоги раунда)
// ============================================================

function Results({
  result,
  teams,
  suspects,
  advance,
  round,
  totalRounds,
  busy
}: any) {
  const elimId = result?.eliminatedId;
  const safeSuspects = suspects || [];
  const elimSuspect = elimId ? safeSuspects.find((s: any) => s.id === elimId) : null;
  const isLast = round >= totalRounds;

  if (isLast) {
    return (
      <div>
        <h2 className="font-serif text-[clamp(36px,5vw,56px)] leading-none text-text font-semibold mb-8">
          Вердикт следствия
        </h2>

        <div className="bg-panel border border-line rounded-2xl p-8 md:p-12 mb-10">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-4">
            Подозрения сняты
          </div>
          <div className="flex items-center gap-5 mb-5 flex-wrap">
            <span className="w-20 h-20 rounded-full grid place-items-center bg-panel2 border border-accent text-accent text-3xl">
              <i className="fa-solid fa-briefcase" />
            </span>
            <div>
              <div className="font-serif text-4xl md:text-5xl leading-tight text-text">
                Виктор
              </div>
              <div className="text-[12px] tracking-wider uppercase text-muted mt-1">
                Бывший партнёр
              </div>
            </div>
          </div>
          <p className="text-[15px] text-muted leading-relaxed m-0">
            {suspects.find((s: any) => s.id === 's5')?.verdict || ''}
          </p>
        </div>

        <button
          onClick={advance}
          disabled={busy}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
        >
          Финальная разгадка <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">
        Вердикт следствия
      </div>
      <h2 className="font-serif text-[clamp(44px,6vw,72px)] leading-none text-text font-semibold mb-10">
        Итоги раунда {round}
      </h2>

      {elimSuspect && (
        <div className="bg-panel border border-line rounded-2xl p-8 md:p-12 mb-10">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-4">
            Вердикт следствия
          </div>
          <div className="flex items-center gap-5 mb-5 flex-wrap">
            <span className="w-20 h-20 rounded-full grid place-items-center bg-panel2 border border-accent text-accent text-3xl">
              <i className={`fa-solid ${elimSuspect.icon}`} />
            </span>
            <div>
              <div className="font-serif text-4xl md:text-5xl leading-tight text-text">
                {elimSuspect.name}
              </div>
              <div className="text-[12px] tracking-wider uppercase text-muted mt-1">
                {elimSuspect.role}
              </div>
            </div>
          </div>
          <p className="text-[15px] text-muted leading-relaxed m-0">
            {elimSuspect.verdict ||
              'Большинство команд назвало этого подозреваемого — но это не убийца. Он выбывает из расследования.'}
          </p>
        </div>
      )}

      <button
        onClick={advance}
        disabled={busy}
        className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90 disabled:opacity-40 transition"
      >
        Следующая глава <i className="fa-solid fa-arrow-right" />
      </button>
    </div>
  );
}

// ============================================================
// END (разгадка)
// ============================================================

function EndView({ state, onReset, speech, onShowResults, code, sock, trace }: any) {
  const solution = state.solution;
  const killer = (state.fullSuspects || []).find((s: any) => s.isGuilty);

  return (
    <div>
      <h1 className="font-serif text-[clamp(44px,5.5vw,72px)] leading-none text-text font-semibold mb-6">
        Разгадка
      </h1>

      {killer && (
        <div className="flex items-center gap-4 mb-6">
          <span className="w-16 h-16 rounded-full grid place-items-center bg-panel2 border border-accent text-accent text-2xl">
            <i className={`fa-solid ${killer.icon}`} />
          </span>
          <div>
            <div className="font-serif text-4xl text-text">{killer.name}</div>
            <div className="text-[10.5px] tracking-wider uppercase text-accent">
              {killer.role} · убийца
            </div>
          </div>
        </div>
      )}

      <div className="bg-panel border-l-2 border-accent rounded-2xl p-6 mb-8 max-w-[820px] text-[17px] leading-relaxed text-text">
        {solution}
      </div>

      {speech.supported && (
        <div className="mb-8 flex gap-3 flex-wrap">
          <button
            onClick={() => speech.speak(solution, { rate: 0.92, pitch: 1.05 })}
            className="px-4 py-2 rounded-lg border border-line bg-panel hover:bg-panel2 text-sm"
          >
            🔊 Озвучить разгадку
          </button>
          {speech.speaking && (
            <button
              onClick={speech.stop}
              className="px-4 py-2 rounded-lg border border-accent text-accent text-sm"
            >
              ⏹ Остановить
            </button>
          )}
        </div>
      )}

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => {
            trace?.('show_results_click', {});
            if (onShowResults) onShowResults();
          }}
          className="px-6 py-3.5 rounded-xl border border-accent text-accent font-bold text-[15px] inline-flex items-center gap-2.5 hover:bg-accent/10 transition"
        >
          <i className="fa-solid fa-trophy" />
          Показать итоги расследования
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90"
        >
          Сыграть это дело снова
        </button>
        <button
          onClick={async () => {
            try {
              await fetch('/api/logout', { method: 'POST' });
            } catch {}
            trace?.('host_close_click', {});
            sock.current.emit('host:close', { code });
            window.location.href = '/host';
          }}
          className="px-6 py-3.5 rounded-xl border border-line bg-panel text-muted hover:bg-panel2 text-[15px] inline-flex items-center"
        >
          Новое дело
        </button>
      </div>
    </div>
  );
}

// ============================================================
// ACCUSE MODAL (модалка обвинения)
// ============================================================

function AccuseModal({
  suspects,
  onClose,
  onConfirm
}: {
  suspects: any[];
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [pick, setPick] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-30 bg-[rgba(8,4,3,.85)] grid place-items-center p-5 overflow-y-auto"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-[760px] w-full bg-[#1a110d] border border-line rounded-[22px] p-8 md:p-9 my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-9 h-9 rounded-full border border-line bg-white/[.04] grid place-items-center text-text hover:bg-white/10"
        >
          <i className="fa-solid fa-xmark text-sm" />
        </button>

        <div className="text-[11px] font-bold tracking-[.2em] uppercase text-accent mb-2">
          Обвинение только одно
        </div>
        <h2 className="font-serif text-4xl text-text font-semibold mb-3 m-0">
          Кто убийца?
        </h2>
        <p className="text-[14px] text-[#b9a898] m-0 mb-6">
          {pick
            ? `Вы обвиняете: ${suspects.find(s => s.id === pick)?.name}. Уверены?`
            : 'Выберите подозреваемого, которого обвиняете. Второго шанса не будет.'}
        </p>

        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {suspects.map((s: any) => (
            <button
              key={s.id}
              onClick={() => setPick(s.id)}
              className={
                'text-left w-full p-4 rounded-2xl border bg-panel flex gap-3.5 transition ' +
                (pick === s.id
                  ? 'border-accent bg-panel2'
                  : 'border-line hover:border-accent/60')
              }
            >
              <span className="flex-none w-11 h-11 rounded-full grid place-items-center font-serif text-lg font-bold text-[#1a0f0a] bg-gradient-to-br from-accent to-[#f3e6cf]">
                {initials(s.name)}
              </span>
              <div>
                <div className="text-[15px] text-text font-bold m-0">{s.name}</div>
                <div className="text-[12.5px] text-accent font-semibold mb-2">{s.role}</div>
                <div className="text-[12.5px] text-[#c3b2a2] leading-snug">
                  <div>
                    <b className="text-[#e6d6c0]">Мотив:</b> {s.motive}
                  </div>
                  <div>
                    <b className="text-[#e6d6c0]">Алиби:</b> {s.alibi}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onConfirm}
            disabled={!pick}
            className="px-6 py-3.5 rounded-xl bg-red-500 text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:bg-red-400 disabled:opacity-40 transition"
          >
            <i className="fa-solid fa-gavel" />
            Обвинить
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-xl border border-line bg-panel text-muted hover:bg-panel2 text-[15px]"
          >
            Отмена
          </button>
        </div>
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
  return <span>0:{String(left).padStart(2, '0')}</span>;
}

function ResultsFinal({ teams, onReset, code, sock, trace }: any) {
  const sorted = [...(teams || [])].sort((a: any, b: any) => b.score - a.score);
  const fmtScore = (n: number) => (n > 0 ? `+${n}` : `${n}`);
  return (
    <div>
      <h1 className="font-serif text-[clamp(44px,5.5vw,72px)] leading-none text-text font-semibold mb-3">
        Итоги расследования
      </h1>
      <p className="text-[15px] text-[#b3a698] leading-snug max-w-[720px] mb-8">
        С вами были <b className="text-accent font-semibold">ваш ресторан</b> и{' '}
        <b className="text-accent font-semibold">Тайна за столом</b>. До встречи в новых
        расследованиях!
      </p>

      <div className="bg-panel border border-line rounded-2xl overflow-x-auto mb-10">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr>
              <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold p-4 border-b border-line">Место</th>
              <th className="text-left text-[10.5px] tracking-wider uppercase text-muted font-bold p-4 border-b border-line">Команда</th>
              <th className="text-right text-[10.5px] tracking-wider uppercase text-muted font-bold p-4 border-b border-line">Р1</th>
              <th className="text-right text-[10.5px] tracking-wider uppercase text-muted font-bold p-4 border-b border-line">Р2</th>
              <th className="text-right text-[10.5px] tracking-wider uppercase text-muted font-bold p-4 border-b border-line">Р3</th>
              <th className="text-right text-[10.5px] tracking-wider uppercase text-muted font-bold p-4 border-b border-line">Р4</th>
              <th className="text-right text-[10.5px] tracking-wider uppercase text-muted font-bold p-4 border-b border-line">Итого</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t: any, i: number) => {
              const rs = t.roundScores || [0, 0, 0, 0];
              return (
                <tr key={t.id} className="border-b border-line last:border-0">
                  <td className="p-4">
                    {i === 0 ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white">
                        <i className="fa-solid fa-crown text-[12px]" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-panel2 text-muted font-semibold text-[13px]">
                        {i + 1}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-text">{t.name}</td>
                  {[0, 1, 2, 3].map(ri => (
                    <td key={ri} className={'p-4 text-right tabular-nums ' + (rs[ri] < 0 ? 'text-accent' : rs[ri] > 0 ? 'text-green-400' : 'text-muted')}>
                      {rs[ri] === 0 ? '—' : fmtScore(rs[ri])}
                    </td>
                  ))}
                  <td className="p-4 text-right font-serif text-2xl font-bold text-text tabular-nums">{t.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onReset}
          className="px-6 py-3.5 rounded-xl bg-accent text-white font-bold text-[15px] inline-flex items-center gap-2.5 hover:opacity-90"
        >
          Сыграть это дело снова
        </button>
        <button
          onClick={async () => {
            try {
              await fetch('/api/logout', { method: 'POST' });
            } catch {}
            trace?.('host_close_click', {});
            sock.current.emit('host:close', { code });
            window.location.href = '/host';
          }}
          className="px-6 py-3.5 rounded-xl border border-line bg-panel text-muted hover:bg-panel2 text-[15px] inline-flex items-center"
        >
          Новое дело
        </button>
      </div>
    </div>
  );
}