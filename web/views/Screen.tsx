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
    roundDurationSec,
    clueTimesSec,
    eliminatedSuspects
  } = state;

  const aliveSuspects = scenario.suspects.filter(
    (s: any) => !(eliminatedSuspects || []).includes(s.id)
  );

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
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="grid place-items-center">
            {qr && (
              <div className="text-center">
                <img src={qr} alt="QR" className="rounded-xl border border-line" />
                <div className="mt-4 text-2xl font-mono">
                  Код: <span className="text-accent">{code}</span>
                </div>
                <p className="text-muted text-sm mt-4 max-w-sm">
                  Один телефон на стол — капитан команды. Остальные подключаются к своей команде
                  как зрители.
                </p>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl mb-4">Участники</h2>
            {teams.length === 0 && (
              <div className="text-muted text-sm">Пока никто не подключился…</div>
            )}
            <div className="space-y-2">
              {teams.map((t: any) => (
                <div
                  key={t.id}
                  className="flex items-center gap-4 border border-line rounded-lg p-3 bg-panel"
                >
                  <span className="w-10 h-10 rounded-full grid place-items-center bg-panel2 text-accent border border-line font-medium">
                    {t.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-muted">капитан подключён</div>
                  </div>
                  <div className="text-xs text-muted">очки: {t.score}</div>
                </div>
              ))}
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
        </div>
      )}

      {phase === 'intro' && (
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
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
          <RulesBlock />
        </div>
      )}

      {phase === 'story' && !chapter && (
        <div className="max-w-3xl">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">
            Финальный раунд
          </div>
          <h1 className="text-6xl mb-3">Последний шанс</h1>
          <p className="text-xl leading-relaxed border-l-2 border-line pl-6 mb-6">
            Все улики собраны. Пересмотрите показания, обсудите версии и назовите имя убийцы.
            Осталось двое подозреваемых — кто из них виновен?
          </p>
          <NavBar onBack={goBack} onNext={advance} nextLabel="К обсуждению" busy={busy} />
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

          <NavBar onBack={goBack} onNext={advance} nextLabel="К обсуждению" busy={busy} />
        </div>
      )}

      {phase === 'discussion' && (
        <DiscussionView
          roundStartedAt={roundStartedAt}
          duration={roundDurationSec}
          clueTimesSec={clueTimesSec}
          clues={clues}
          onAdvance={advance}
          onBack={goBack}
          busy={busy}
          speech={speech}
        />
      )}

      {phase === 'voting' && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-5xl mb-4">Голосование</h2>
            <p className="text-muted">
              Капитаны команд выбирают подозреваемого на своих телефонах.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-3 max-w-6xl mx-auto mb-8">
            {aliveSuspects.map((s: any) => (
              <FullSuspectCard key={s.id} s={s} />
            ))}
          </div>
          <NavBar onBack={goBack} onNext={advance} nextLabel="Подвести итоги" busy={busy} center />
        </div>
      )}

      {phase === 'results' && !lastResult && (
        <div className="text-center p-10">
          <div className="text-muted mb-6">Загрузка результатов…</div>
          <button
            onClick={advance}
            disabled={busy}
            className="px-6 py-3 rounded-lg bg-accent text-white disabled:opacity-40"
          >
            Продолжить
          </button>
        </div>
      )}

      {phase === 'results' && lastResult && (
        <ResultsView
          result={lastResult}
          teams={teams}
          suspects={scenario.suspects}
          onAdvance={advance}
          round={round}
          totalRounds={totalRounds}
          busy={busy}
        />
      )}

      {phase === 'end' && (
        <EndView state={state} code={code} onReset={reset} speech={speech} />
      )}
    </div>
  );
}

function RulesBlock() {
  return (
    <div className="border border-line rounded-xl p-6 bg-panel">
      <h3 className="text-2xl mb-4">Правила игры</h3>
      <ul className="space-y-3 text-sm text-muted">
        <li>
          <span className="text-accent">•</span> В игре <b className="text-text">4 раунда</b>.
          В каждом раунде — глава истории, обсуждение и голосование.
        </li>
        <li>
          <span className="text-accent">•</span> Улики появляются постепенно:{' '}
          <b className="text-text">на 3, 5, 7 и 9 минуте</b> обсуждения.
        </li>
        <li>
          <span className="text-accent">•</span> На обсуждение отводится{' '}
          <b className="text-text">10 минут</b>.
        </li>
        <li>
          <span className="text-accent">•</span> Голосует{' '}
          <b className="text-text">только капитан команды</b>, со своего телефона.
        </li>
        <li>
          <span className="text-accent">•</span> Верное обвинение:{' '}
          <b className="text-text">+500 очков</b>. Ошибка:{' '}
          <b className="text-text">−200 очков</b>.
        </li>
        <li>
          <span className="text-accent">•</span> После каждого раунда{' '}
          <b className="text-text">выбывает один подозреваемый</b> — тот, кого назвало
          большинство (кроме настоящего убийцы).
        </li>
        <li>
          <span className="text-accent">•</span> К 4-му раунду остаются{' '}
          <b className="text-text">двое подозреваемых</b>. Один из них — убийца.
        </li>
        <li>
          <span className="text-accent">•</span> Если убийцу так и не назвали — он уходит от
          правосудия. Побеждает команда с наибольшим счётом.
        </li>
      </ul>
    </div>
  );
}

function FullSuspectCard({ s }: any) {
  return (
    <div className="border border-line rounded-xl p-5 bg-panel">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-12 h-12 rounded-full grid place-items-center bg-panel2 border border-line text-accent text-lg">
          <i className={'fa-solid ' + s.icon} />
        </span>
        <div>
          <div className="text-2xl font-serif leading-tight">{s.name}</div>
          <div className="text-xs tracking-widest uppercase text-muted">{s.role}</div>
        </div>
      </div>
      <div className="text-sm text-muted mb-3">{s.description}</div>
      <div className="text-xs text-muted">
        <div className="mb-1">
          <span className="text-accent">Мотив:</span> {s.motive}
        </div>
        <div>
          <span className="text-accent">Алиби:</span> {s.alibi}
        </div>
      </div>
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

function DiscussionView({
  roundStartedAt,
  duration,
  clueTimesSec,
  clues,
  onAdvance,
  onBack,
  busy,
  speech
}: any) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsed = Math.floor((now - (roundStartedAt || now)) / 1000);
  const left = Math.max(0, duration - elapsed);
  const mm = String(Math.floor(left / 60));
  const ss = String(left % 60).padStart(2, '0');
  const pct = (100 * left) / duration;

  const times: number[] = clueTimesSec || [180, 300, 420, 540];
  const nextClueIn = times.find(t => t > elapsed);

  return (
    <div>
      <div className="border border-line rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs tracking-widest uppercase text-accent mb-2">
              Обсуждение
            </div>
            <div className="text-muted">
              Улики открываются постепенно. Капитаны готовятся к голосованию.
            </div>
            {nextClueIn && (
              <div className="text-xs text-muted mt-2">
                Следующая улика через {Math.max(0, nextClueIn - elapsed)} сек
              </div>
            )}
          </div>
          <div className="text-6xl font-serif tabular-nums">
            {mm}:{ss}
          </div>
        </div>
        <div className="h-1 bg-line rounded mt-5 overflow-hidden">
          <div className="h-full bg-accent transition-all" style={{ width: pct + '%' }} />
        </div>
      </div>

      <div className="sec-h mb-4 flex items-baseline justify-between">
        <h3 className="text-3xl">Улики раунда</h3>
        <span className="text-muted text-sm">
          {clues.length} из {times.length}
        </span>
      </div>

      {clues.length === 0 && (
        <div className="text-muted text-sm border border-dashed border-line rounded-lg p-6 text-center">
          Пока улик нет. Первая появится через {Math.max(0, (times[0] || 180) - elapsed)} сек.
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
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

      {speech.supported && clues.length > 0 && (
        <div className="mt-2 mb-6 flex gap-3">
          <button
            onClick={() => speech.speak(clues.map((c: any) => c.name + '. ' + c.desc).join(' '))}
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

      <NavBar onBack={onBack} onNext={onAdvance} nextLabel="Перейти к голосованию" busy={busy} />
    </div>
  );
}

function ResultsView({ result, teams, suspects, onAdvance, round, totalRounds, busy }: any) {
  const elimId = result?.eliminatedId;
  const safeSuspects = suspects || [];
  const elimSuspect = elimId ? safeSuspects.find((s: any) => s.id === elimId) : null;
  const isLast = round >= totalRounds;

  return (
    <div>
      <h2 className="text-5xl mb-8">Итоги раунда {round}</h2>

      {elimSuspect && (
        <div className="border border-line rounded-xl p-6 bg-panel mb-8 max-w-2xl">
          <div className="text-accent text-xs tracking-widest uppercase mb-2">
            Снят с подозрений
          </div>
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-full grid place-items-center bg-panel2 border border-line text-accent text-xl">
              <i className={'fa-solid ' + elimSuspect.icon} />
            </span>
            <div>
              <div className="text-3xl font-serif leading-tight">{elimSuspect.name}</div>
              <div className="text-xs tracking-widest uppercase text-muted">
                {elimSuspect.role}
              </div>
            </div>
          </div>
          <p className="text-muted text-sm mt-3">
            Большинство команд назвало этого подозреваемого — но это не убийца. Он выбывает из
            расследования.
          </p>
        </div>
      )}

      <h3 className="text-3xl mb-4">Очки команд</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {teams.map((t: any) => {
          const correct = result?.correctTeamIds?.includes(t.id);
          const wrong = result?.wrongTeamIds?.includes(t.id);
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
                {correct ? 'Верное обвинение (+500)' : wrong ? 'Ошибка (−200)' : 'Не голосовали'}
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
        {isLast ? 'Финальная разгадка' : 'Следующая глава'}
      </button>
    </div>
  );
}

function EndView({ state, code, onReset, speech }: any) {
  const solution = state.solution;
  const sorted = [...state.teams].sort((a: any, b: any) => b.score - a.score);
  const best = sorted[0];
  const killer = (state.fullSuspects || []).find((s: any) => s.isGuilty);
  const lastResult = state.lastResult;
  const someoneRight =
    lastResult && lastResult.correctTeamIds && lastResult.correctTeamIds.length > 0;

  return (
    <div>
      <h1 className="text-6xl mb-6">Разгадка</h1>

      {killer && (
        <div className="flex items-center gap-4 mb-6">
          <span className="w-16 h-16 rounded-full grid place-items-center bg-panel2 border border-accent text-accent text-2xl">
            <i className={'fa-solid ' + killer.icon} />
          </span>
          <div>
            <div className="text-4xl font-serif">{killer.name}</div>
            <div className="text-xs tracking-widest uppercase text-accent">
              {killer.role} · убийца
            </div>
          </div>
        </div>
      )}

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

      <div
        className={
          'border rounded-xl p-6 mb-8 max-w-3xl ' +
          (someoneRight ? 'border-accent bg-panel2' : 'border-line bg-panel')
        }
      >
        {someoneRight ? (
          <>
            <h3 className="text-3xl mb-2">Убийца раскрыт</h3>
            <p className="text-muted">
              Команды, назвавшие правильное имя, получают очки. Победитель — на табло ниже.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-3xl mb-2">Убийца ушёл от правосудия</h3>
            <p className="text-muted">
              Ни одна команда не назвала правильное имя. Лучше всех оказалась{' '}
              <b className="text-accent">{best?.name || '—'}</b> — она была ближе всех к
              разгадке.
            </p>
          </>
        )}
      </div>

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
                {someoneRight ? 'Победитель' : 'Ближе всех к разгадке'}
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