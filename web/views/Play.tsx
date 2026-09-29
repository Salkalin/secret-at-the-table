import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSocket } from '../socket';
import { Card, Input, PrimaryBtn } from '../ui';

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

  useEffect(() => {
    const s = sock.current;
    const onState = (st: any) => setState(st);
    s.on('state', onState);
    return () => {
      s.off('state', onState);
    };
  }, []);

  function join() {
    setErr('');
    sock.current.emit(
      'player:join',
      { code, nickname: nickname.trim(), wantCaptain },
      (res: any) => {
        if (res?.error) {
          setErr(
            res.error === 'no_teams' ? 'Сначала создайте стол капитаном' : res.error
          );
          return;
        }
        setJoined(true);
        setIsCaptain(res.isCaptain);
        setTeamId(res.teamId);
        setState(res.state);
      }
    );
  }

  function vote(suspectId: string) {
    sock.current.emit('team:vote', { code, suspectId }, (res: any) => {
      if (res?.error) setErr(res.error);
    });
  }

  if (!joined) {
    return (
      <div className="min-h-screen grid place-items-center p-4">
        <Card className="w-full max-w-md">
          <h1 className="text-3xl mb-4">Подключение к игре</h1>
          <p className="text-muted text-sm mb-4">
            Код сессии: <span className="font-mono text-accent">{code}</span>
          </p>
          <Input
            placeholder="Ваше имя"
            value={nickname}
            onChange={(e: any) => setNickname(e.target.value)}
          />
          <label className="flex items-center gap-2 mt-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={wantCaptain}
              onChange={e => setWantCaptain(e.target.checked)}
            />
            Я капитан команды (создать новый стол)
          </label>
          {err && <div className="text-accent text-sm mt-2">{err}</div>}
          <PrimaryBtn
            className="w-full mt-4"
            onClick={join}
            disabled={!nickname.trim()}
          >
            Войти
          </PrimaryBtn>
        </Card>
      </div>
    );
  }

  if (!state) return <div className="p-8 text-muted">Ожидание…</div>;

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
  const myTeam = teams.find((t: any) => t.id === teamId);

  const aliveSuspects = scenario.suspects.filter(
    (s: any) => !(eliminatedSuspects || []).includes(s.id)
  );
  const elimId = lastResult?.eliminatedId;
  const elimSuspect = elimId
    ? scenario.suspects.find((s: any) => s.id === elimId)
    : null;

  return (
    <div className="min-h-screen p-4 max-w-lg mx-auto">
      <div className="text-xs text-muted mb-2 flex justify-between">
        <span>{scenario.title}</span>
        <span>Раунд {round} / {totalRounds}</span>
      </div>

      {phase === 'lobby' && (
        <Card>
          <h2 className="text-2xl mb-2">Ждём старт</h2>
          <p className="text-muted text-sm">
            {isCaptain
              ? 'Вы капитан команды. Дождитесь начала.'
              : 'Вы присоединились как зритель.'}
          </p>
        </Card>
      )}

      {phase === 'intro' && (
        <Card>
          <h2 className="text-2xl mb-2">{scenario.title}</h2>
          <p className="text-muted text-sm mb-3">{scenario.description}</p>
          <div className="text-xs text-muted">{scenario.location}</div>
        </Card>
      )}

      {phase === 'story' && !chapter && (
        <Card>
          <div className="text-accent text-xs uppercase tracking-widest mb-1">
            Финальный раунд
          </div>
          <h2 className="text-2xl mb-3">Последний шанс</h2>
          <p className="text-sm leading-relaxed">
            Все улики собраны. Обсудите версии и приготовьтесь назвать имя убийцы.
          </p>
        </Card>
      )}

      {phase === 'story' && chapter && (
        <Card>
          <div className="text-accent text-xs uppercase tracking-widest mb-1">
            Глава {round}
          </div>
          <h2 className="text-3xl mb-3">{chapter.title}</h2>
          <p className="text-sm leading-relaxed">{chapter.text}</p>
        </Card>
      )}

      {phase === 'discussion' && (
        <Card>
          <h2 className="text-2xl mb-3">Обсуждение</h2>
          <Countdown startedAt={roundStartedAt} duration={roundDurationSec} />

          <div className="mt-4 mb-4 text-xs text-muted">
            Улики открываются постепенно. Первая — на 3-й минуте, дальше на 5-й, 7-й и 9-й.
          </div>

          <div className="text-xs uppercase tracking-widest text-accent mb-2">
            Улики раунда ({clues.length})
          </div>

          {clues.length === 0 && (
            <div className="text-muted text-sm border border-dashed border-line rounded-lg p-4 text-center">
              Пока улик нет
            </div>
          )}

          <div className="space-y-3">
            {clues.map((c: any, i: number) => (
              <div key={i} className="bg-paper text-ink rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className={'fa-solid ' + c.icon} />
                  <div className="font-medium text-sm">{c.name}</div>
                </div>
                <div className="mono text-xs">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-muted italic">
            Подозреваемые появятся на этапе голосования.
          </div>
        </Card>
      )}

      {phase === 'voting' && (
        <Card>
          <h2 className="text-2xl mb-3">Голосование</h2>
          {!isCaptain && (
            <p className="text-muted text-sm mb-3">
              Решение принимает капитан команды.
            </p>
          )}
          {isCaptain && !myTeam?.vote && (
            <div className="space-y-3">
              {aliveSuspects.map((s: any) => (
                <button
                  key={s.id}
                  onClick={() => vote(s.id)}
                  className="w-full text-left border border-line rounded-lg p-3 hover:border-accent transition bg-panel"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <i className={'fa-solid ' + s.icon + ' text-accent'} />
                    <div className="font-medium">{s.name}</div>
                  </div>
                  <div className="text-xs text-muted mb-2">{s.role}</div>
                  <div className="text-xs text-muted mb-1">{s.description}</div>
                  <div className="text-[11px] text-muted">
                    <div>Мотив: {s.motive}</div>
                    <div>Алиби: {s.alibi}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {isCaptain && myTeam?.vote && (
            <div className="text-accent text-sm">Ваш голос принят.</div>
          )}
        </Card>
      )}

      {phase === 'results' && lastResult && (
        <Card>
          <h2 className="text-2xl mb-3">Итог раунда {round}</h2>

          {elimSuspect ? (
            <div className="border border-line rounded-lg p-4 mb-4">
              <div className="text-accent text-[10px] uppercase tracking-widest mb-1">
                Снят с подозрений
              </div>
              <div className="flex items-center gap-2 mb-1">
                <i className={'fa-solid ' + elimSuspect.icon + ' text-accent'} />
                <div className="font-medium">{elimSuspect.name}</div>
              </div>
              <div className="text-xs text-muted">{elimSuspect.role}</div>
              <div className="text-xs text-muted mt-2">
                Большинство команд назвало его, но это не убийца. Он выбывает из расследования.
              </div>
            </div>
          ) : (
            <div className="text-muted text-sm mb-4">
              Никто не выбывает в этом раунде.
            </div>
          )}

          <div className="text-xs text-muted">
            Верных обвинений: {lastResult.correctTeamIds?.length || 0} · Ошибок:{' '}
            {lastResult.wrongTeamIds?.length || 0}
          </div>

          {myTeam && (
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              <div>
                <div className="text-sm">{myTeam.name}</div>
                <div className="text-xs text-muted">
                  {myTeam.vote
                    ? lastResult.correctTeamIds?.includes(myTeam.id)
                      ? 'Верное обвинение (+500)'
                      : 'Ошибка (−200)'
                    : 'Не голосовали'}
                </div>
              </div>
              <div className="font-serif text-3xl">{myTeam.score}</div>
            </div>
          )}
        </Card>
      )}

      {phase === 'end' && (
        <Card>
          <h2 className="text-2xl mb-3">Игра завершена</h2>
          <p className="text-muted text-sm">
            Смотрите разгадку на большом экране.
          </p>
        </Card>
      )}
    </div>
  );
}

function Countdown({ startedAt, duration }: any) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(
    0,
    duration - Math.floor((now - (startedAt || now)) / 1000)
  );
  const m = String(Math.floor(left / 60));
  const s = String(left % 60).padStart(2, '0');
  return (
    <div className="font-serif text-4xl tabular-nums">
      {m}:{s}
    </div>
  );
}