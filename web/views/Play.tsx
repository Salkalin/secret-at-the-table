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
          setErr(res.error === 'no_teams' ? 'Сначала создайте стол капитаном' : res.error);
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
    roundStartedAt,
    roundDurationSec,
    lastResult
  } = state;
  const myTeam = teams.find((t: any) => t.id === teamId);

  return (
    <div className="min-h-screen p-4 max-w-lg mx-auto">
      <div className="text-xs text-muted mb-2 flex justify-between">
        <span>{scenario.title}</span>
        <span>Раунд {round}</span>
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

      {phase === 'story' && chapter && (
        <Card>
          <div className="text-accent text-xs uppercase tracking-widest mb-1">
            Глава {round}
          </div>
          <h2 className="text-3xl mb-3">{chapter.title}</h2>
          <p className="text-sm leading-relaxed">{chapter.text}</p>
        </Card>
      )}

      {phase === 'clues' && (
        <div className="space-y-3">
          {clues.map((c: any, i: number) => (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-2">
                <i className={'fa-solid ' + c.icon + ' text-accent'} />
                <div className="font-medium">{c.name}</div>
              </div>
              <div className="mono text-sm text-muted">{c.desc}</div>
            </Card>
          ))}
        </div>
      )}

      {phase === 'discussion' && (
        <Card>
          <h2 className="text-2xl mb-3">Обсуждение</h2>
          <Countdown startedAt={roundStartedAt} duration={roundDurationSec} />
          <div className="space-y-2 mt-4">
            {scenario.suspects.map((s: any) => (
              <div key={s.id} className="border border-line rounded-lg p-3">
                <div className="font-medium">{s.name}</div>
                <div className="text-muted text-xs">
                  {s.role} · {s.motive}
                </div>
              </div>
            ))}
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
            <div className="space-y-2">
              {scenario.suspects.map((s: any) => (
                <button
                  key={s.id}
                  onClick={() => vote(s.id)}
                  className="w-full text-left border border-line rounded-lg p-3 hover:border-accent"
                >
                  <div className="font-medium">{s.name}</div>
                  <div className="text-muted text-xs">{s.role}</div>
                </button>
              ))}
            </div>
          )}
          {isCaptain && myTeam?.vote && (
            <div className="text-accent">Ваш голос принят.</div>
          )}
        </Card>
      )}

      {phase === 'results' && lastResult && (
        <Card>
          <h2 className="text-2xl mb-3">Итог раунда</h2>
          <div className="text-muted text-sm">
            Верных ответов: {lastResult.correctTeamIds?.length || 0} · Ошибок:{' '}
            {lastResult.wrongTeamIds?.length || 0}
          </div>
          {myTeam && (
            <div className="mt-3">
              <div className="text-xl">{myTeam.name}</div>
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
