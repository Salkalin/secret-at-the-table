import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { getSocket } from '../socket';
import { useSpeech } from '../SpeechContext';

export default function Screen() {
  const { code } = useParams();
  const [state, setState] = useState<any>(null);
  const [qr, setQr] = useState('');
  const [busy, setBusy] = useState(false);
  const sock = useRef(getSocket());
  const speech = useSpeech();

  useEffect(() => {
    const s = sock.current;
    s.emit('screen:join', { code }, (res: any) => {
      if (res?.state) setState(res.state);
      if (res?.error) alert('Сессия не найдена');
    });
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
      width: 380,
      margin: 1,
      color: { dark: '#ece5da', light: '#110f0e' }
    }).then(setQr);
  }, [state?.code, code]);

  const advance = () => {
    if (busy) return;
    setBusy(true);
    sock.current.emit('host:advance', { code }, () => setBusy(false));
  };

  const goBack = () => {
    if (busy) return;
    setBusy(true);
    sock.current.emit('host:prev', { code }, (res: any) => {
      setBusy(false);
      if (res?.error === 'no_prev') alert('Назад уже нельзя');
    });
  };

  const reset = () => {
    if (busy) return;
    setBusy(true);
    sock.current.emit('host:reset', { code }, (res: any) => {
      setBusy(false);
      if (res?.error) alert('Ошибка: ' + res.error);
    });
  };

  const say = (text: string) => {
    speech.speak(text);
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
    roundDurationSec
  } = state;

  return (
    <div className="min-h-screen p-8 max-w-[1400px] mx-auto">
      <header className="flex justify-between items-center border-b border-line pb-4 mb-8">
        <div className="font-serif text-2xl">{scenario.title}</div>
        <div className="flex items-center gap-3 text-sm">
          {speech.supported && (
            <button
              onClick={() => speech.setEnabled(!speech.enabled)}
              className={
                'border rounded-full px-3 py-1 transition ' +
                (speech.enabled
                  ? 'border-accent text-accent'
                  : 'border-line text-muted hover:text-text')
              }
              title={speech.enabled ? 'Отключить озвучку' : 'Включить озвучку'}
            >
              {speech.enabled ? '🔊' : '🔇'}
            </button>
          )}
          <span className="border border-line rounded-full px-3 py-1">{phase}</span>
          <span className="border border-line rounded-full px-3 py-1">
            Раунд {round} / {totalRounds}
          </span>
          <span className="border border-line rounded-full px-3 py-1">
            Команд: {teams.length}
          </span>
        </div>
      </header>

      {phase === 'lobby' && (
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-6xl mb-4">Сканируйте QR</h1>
            <p className="text-muted max-w-md">
              Один телефон на стол — это капитан команды. Остальные подключаются
              к своей команде как зрители.
            </p>
            <div className="mt-6 text-3xl font-mono">
              Код: <span className="text-accent">{code}</span>
            </div>
            <div className="mt-8">
              <button
                onClick={advance}
                className="px-6 py-3 rounded-lg bg-accent text-white"
              >
                Начать игру
              </button>
            </div>
          </div>
          <div className="grid place-items-center">
            {qr && (
              <img src={qr} alt="QR" className="rounded-xl border border-line" />
            )}
          </div>
        </div>
      )}

      {phase === 'intro' && (
        <div className="max-w-3xl">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">
            Дело открыто
          </div>
          <h1 className="text-6xl mb-3">{scenario.title}</h1>
          <p className="text-muted mb-6 max-w-2xl">{scenario.description}</p>
          <dl className="space-y-3 mb-8">
            <div>
              <dt className="text-xs uppercase tracking-widest text-accent">Преступление</dt>
              <dd className="text-muted">{scenario.crime}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-accent">Жертва</dt>
              <dd className="text-muted">{scenario.victim}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-accent">Место</dt>
              <dd className="text-muted">{scenario.location}</dd>
            </div>
          </dl>
          <NavBar onBack={goBack} onNext={advance} nextLabel="Начать первый раунд" busy={busy} />
        </div>
      )}

      {phase === 'story' && chapter && (
        <div className="max-w-3xl">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">
            Глава {round}
          </div>
          <h1 className="text-6xl mb-3">{chapter.title}</h1>
          <div className="mono text-muted mb-6">{chapter.atmosphere}</div>
          <p className="text-xl leading-relaxed border-l-2 border-line pl-6">
            {chapter.text}
          </p>

          {speech.supported && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() =>
                  say(chapter.title + '. ' + chapter.atmosphere + '. ' + chapter.text)
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

          <NavBar onBack={goBack} onNext={advance} nextLabel="Показать улики" busy={busy} />
        </div>
      )}

      {phase === 'clues' && (
        <div>
          <h2 className="text-4xl mb-6">Улики раунда {round}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {clues.map((c: any, i: number) => (
              <div key={i} className="bg-paper text-ink rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-ink text-paper grid place-items-center">
                    <i className={'fa-solid ' + c.icon} />
                  </div>
                  <div className="font-medium">{c.name}</div>
                </div>
                <div className="mono text-sm">{c.desc}</div>
              </div>
            ))}
          </div>

          {speech.supported && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => say(clues.map((c: any) => c.name + '. ' + c.desc).join(' '))}
                className="px-4 py-2 rounded-lg border border-line bg-panel hover:bg-panel2 text-sm"
              >
                🔊 Озвучить улики
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

          <NavBar onBack={goBack} onNext={advance} nextLabel="К обсуждению" busy={busy} />
        </div>
      )}

      {phase === 'discussion' && (
        <DiscussionView
          roundStartedAt={roundStartedAt}
          duration={roundDurationSec}
          onAdvance={advance}
          onBack={goBack}
          suspects={scenario.suspects}
          busy={busy}
        />
      )}

      {phase === 'voting' && (
        <div>
          <div className="text-center">
            <h2 className="text-5xl mb-4">Голосование</h2>
            <p className="text-muted mb-8">
              Капитаны команд выбирают подозреваемого на своих телефонах.
            </p>
            <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8">
              {scenario.suspects.map((s: any) => (
                <div key={s.id} className="border border-line rounded-lg p-4 text-left">
                  <div className="text-lg">{s.name}</div>
                  <div className="text-muted text-sm">{s.role}</div>
                </div>
              ))}
            </div>
          </div>
          <NavBar onBack={goBack} onNext={advance} nextLabel="Подвести итоги" busy={busy} center />
        </div>
      )}

      {phase === 'results' && lastResult && (
        <ResultsView
          result={lastResult}
          teams={teams}
          onAdvance={advance}
          round={round}
          totalRounds={totalRounds}
          busy={busy}
        />
      )}

      {phase === 'end' && <EndView state={state} code={code} onReset={reset} />}
    </div>
  );
}

function NavBar({
  onBack,
  onNext,
  nextLabel,
  busy,
  center
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
  busy?: boolean;
  center?: boolean;
}) {
  return (
    <div className={'mt-8 flex gap-3 ' + (center ? 'justify-center' : '')}>
      <button
        onClick={onBack}
        disabled={busy}
        className="px-5 py-3 rounded-lg border border-line bg-panel hover:bg-panel2 text-muted disabled:opacity-40"
      >
        ← Назад
      </button>
      <button
        onClick={onNext}
        disabled={busy}
        className="px-6 py-3 rounded-lg bg-accent text-white disabled:opacity-40"
      >
        {busy ? '…' : nextLabel}
      </button>
    </div>
  );
}

function DiscussionView({ roundStartedAt, duration, onAdvance, onBack, suspects, busy }: any) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);
  const elapsed = Math.floor((now - (roundStartedAt || now)) / 1000);
  const left = Math.max(0, duration - elapsed);
  const mm = String(Math.floor(left / 60));
  const ss = String(left % 60).padStart(2, '0');
  const pct = (100 * left) / duration;

  return (
    <div>
      <div className="border border-line rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs tracking-widest uppercase text-accent mb-2">
              Обсуждение
            </div>
            <div className="text-muted">Капитаны готовятся к голосованию.</div>
          </div>
          <div className="text-6xl font-serif tabular-nums">
            {mm}:{ss}
          </div>
        </div>
        <div className="h-1 bg-line rounded mt-5 overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: pct + '%' }} />
        </div>
      </div>

      <h3 className="text-3xl mb-4">Подозреваемые</h3>
      <div className="grid md:grid-cols-3 gap-3">
        {suspects.map((s: any) => (
          <div key={s.id} className="border border-line rounded-xl p-5">
            <div className="text-2xl font-serif mb-1">{s.name}</div>
            <div className="text-xs tracking-widest uppercase text-muted mb-3">
              {s.role}
            </div>
            <div className="text-sm text-muted mb-3">{s.description}</div>
            <div className="text-xs text-muted">Мотив: {s.motive}</div>
            <div className="text-xs text-muted">Алиби: {s.alibi}</div>
          </div>
        ))}
      </div>

      <NavBar onBack={onBack} onNext={onAdvance} nextLabel="Перейти к голосованию" busy={busy} />
    </div>
  );
}

function ResultsView({ result, teams, onAdvance, round, totalRounds, busy }: any) {
  return (
    <div>
      <h2 className="text-5xl mb-8">Итоги раунда {round}</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {teams.map((t: any) => {
          const correct = result?.correctTeamIds?.includes(t.id);
          return (
            <div
              key={t.id}
              className={
                'border rounded-xl p-5 ' +
                (correct ? 'border-accent bg-panel2' : 'border-line bg-panel')
              }
            >
              <div className="flex justify-between items-center">
                <div className="text-xl">{t.name}</div>
                <div className="font-serif text-3xl">{t.score}</div>
              </div>
              <div className="text-muted text-sm mt-1">
                {t.vote ? (correct ? 'Верное обвинение' : 'Ошибка') : 'Не голосовали'}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={onAdvance}
        disabled={busy}
        className="px-6 py-3 rounded-lg bg-accent text-white disabled:opacity-40"
      >
        {round >= totalRounds ? 'Финальная разгадка' : 'Следующая глава'}
      </button>
    </div>
  );
}

function EndView({ state, code, onReset }: any) {
  const speech = useSpeech();
  const solution = state.solution;
  const sorted = [...state.teams].sort((a: any, b: any) => b.score - a.score);
  return (
    <div>
      <h1 className="text-6xl mb-6">Разгадка</h1>
      <div className="bg-panel border-l-2 border-accent rounded-xl p-6 mb-8 max-w-3xl text-lg leading-relaxed">
        {solution}
      </div>

      {speech.supported && (
        <div className="mb-8 flex gap-3">
          <button
            onClick={() => speech.speak(solution)}
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

      <h3 className="text-3xl mb-4">Итоговый счёт</h3>
      <div className="grid md:grid-cols-3 gap-3 max-w-4xl mb-10">
        {sorted.map((t: any, i: number) => (
          <div
            key={t.id}
            className={
              'border rounded-xl p-5 ' + (i === 0 ? 'border-accent bg-panel2' : 'border-line')
            }
          >
            <div className="text-xl">{t.name}</div>
            <div className="font-serif text-4xl">{t.score}</div>
            {i === 0 && (
              <div className="text-accent text-xs uppercase tracking-widest mt-2">
                Победитель
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-lg bg-accent text-white hover:opacity-90"
        >
          Сыграть это дело снова
        </button>
        <a
          href="/host"
          className="px-6 py-3 rounded-lg border border-line bg-panel hover:bg-panel2 text-muted"
        >
          Новое дело
        </a>
      </div>
    </div>
  );
}