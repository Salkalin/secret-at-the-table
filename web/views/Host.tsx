import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { Card, PrimaryBtn, Btn } from '../ui';

type Scen = { id: string; title: string; description: string };
type SessionRow = {
  id: string;
  code: string;
  scenario: string;
  status: string;
  createdAt: string;
};

export default function Host() {
  const [scens, setScens] = useState<Scen[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [sessions, setSessions] = useState<SessionRow[]>([]);

  useEffect(() => {
    api<Scen[]>('/api/scenarios').then(s => {
      setScens(s);
      setSelected(s[0]?.id || '');
    });
    loadSessions();
  }, []);

  const loadSessions = () =>
    api<SessionRow[]>('/api/host/sessions')
      .then(setSessions)
      .catch(() => (location.href = '/login'));

  async function createSession() {
    const r = await api<{ code: string }>('/api/host/sessions', {
      method: 'POST',
      body: JSON.stringify({ scenarioId: selected })
    });
    location.href = `/screen/${r.code}`;
  }

  async function logout() {
    await api('/api/logout', { method: 'POST' });
    location.href = '/login';
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Панель ведущего</h1>
        <Btn onClick={logout}>Выйти</Btn>
      </div>

      <Card>
        <h2 className="text-2xl mb-4">Новая игра</h2>
        <div className="space-y-2 mb-4">
          {scens.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={
                'w-full text-left p-3 rounded-lg border ' +
                (selected === s.id ? 'border-accent bg-panel2' : 'border-line bg-panel')
              }
            >
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-muted">{s.description}</div>
            </button>
          ))}
        </div>
        <PrimaryBtn onClick={createSession} disabled={!selected}>
          Запустить сессию
        </PrimaryBtn>
      </Card>

      <Card>
        <h2 className="text-2xl mb-4">Мои сессии</h2>
        <div className="space-y-2">
          {sessions.map(s => (
            <div
              key={s.id}
              className="flex items-center justify-between border border-line rounded-lg p-3"
            >
              <div>
                <div className="font-mono text-lg">{s.code}</div>
                <div className="text-xs text-muted">
                  {new Date(s.createdAt).toLocaleString('ru')} · {s.status}
                </div>
              </div>
              <Link to={`/screen/${s.code}`} className="text-accent">
                Открыть экран →
              </Link>
            </div>
          ))}
          {!sessions.length && <div className="text-muted text-sm">Пока пусто</div>}
        </div>
      </Card>
    </div>
  );
}
