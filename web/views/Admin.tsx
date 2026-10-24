import { useEffect, useState } from 'react';
import { api } from '../api';
import { Card, Input, PrimaryBtn, Btn } from '../ui';

type Host = { id: string; email: string; active: boolean; createdAt: string };
type SessionRow = {
  id: string; code: string; scenario: string; status: string;
  createdAt: string; endedAt: string | null;
  hostEmail: string | null; playersCount: number; logsCount: number;
  metrics?: {
    avgDiscussionSec: number | null;
    correctVotes: number;
    totalVotes: number;
    correctVotesPercent: number | null;
    avgVoteDelaySec: number | null;
    avgTeamSize: number | null;
  };
};
type LogRow = {
  id: string; level: string; event: string; actor: string | null;
  payload: any; createdAt: string;
};

export default function Admin() {
  const [tab, setTab] = useState<'hosts' | 'logs'>('hosts');
  return (
    <div className="max-w-[1200px] mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-4xl">Админ-панель</h1>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setTab('hosts')}
            className={
              'px-4 py-2 rounded-lg border text-sm font-medium transition ' +
              (tab === 'hosts' ? 'bg-accent text-white border-accent' : 'bg-panel border-line')
            }
          >
            Ведущие
          </button>
          <button
            onClick={() => setTab('logs')}
            className={
              'px-4 py-2 rounded-lg border text-sm font-medium transition ' +
              (tab === 'logs' ? 'bg-accent text-white border-accent' : 'bg-panel border-line')
            }
          >
            Мониторинг игр
          </button>
          <Btn onClick={async () => { await api('/api/logout', { method: 'POST' }); location.href = '/login'; }}>
            Выйти
          </Btn>
        </div>
      </div>

      {tab === 'hosts' && <HostsTab />}
      {tab === 'logs' && <LogsTab />}
    </div>
  );
}

function HostsTab() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const load = () =>
    api<Host[]>('/api/admin/hosts').then(setHosts).catch(() => (location.href = '/login'));

  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    try {
      await api('/api/admin/hosts', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setEmail(''); setPassword(''); setMsg('Ведущий создан'); load();
    } catch (e: any) { setMsg('Ошибка: ' + e.message); }
  }
  async function toggle(id: string) {
    await api(`/api/admin/hosts/${id}/toggle`, { method: 'POST' }); load();
  }

  return (
    <>
      <Card>
        <h2 className="text-2xl mb-4">Создать ведущего</h2>
        <form onSubmit={create} className="space-y-3">
          <Input placeholder="Email ведущего" value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Пароль" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <PrimaryBtn type="submit">Создать</PrimaryBtn>
          {msg && <div className="text-sm text-muted">{msg}</div>}
        </form>
      </Card>

      <Card>
        <h2 className="text-2xl mb-4">Ведущие ({hosts.length})</h2>
        <div className="space-y-2">
          {hosts.map(h => (
            <div key={h.id} className="flex items-center justify-between border border-line rounded-lg p-3">
              <div>
                <div className="font-medium">{h.email}</div>
                <div className="text-xs text-muted">{new Date(h.createdAt).toLocaleString('ru')}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={h.active ? 'text-green-400 text-sm' : 'text-accent text-sm'}>
                  {h.active ? 'активен' : 'заблокирован'}
                </span>
                <Btn onClick={() => toggle(h.id)}>{h.active ? 'Заблокировать' : 'Разблокировать'}</Btn>
              </div>
            </div>
          ))}
          {!hosts.length && <div className="text-muted text-sm">Пока никого нет</div>}
        </div>
      </Card>
    </>
  );
}

function LogsTab() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [selected, setSelected] = useState<SessionRow | null>(null);
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const reload = () => {
    api<SessionRow[]>('/api/admin/sessions').then(setSessions).catch(() => {});
  };

  useEffect(() => {
    reload();
    if (!autoRefresh) return;
    const t = setInterval(reload, 10000);
    return () => clearInterval(t);
  }, [autoRefresh]);

  async function openSession(s: SessionRow) {
    setSelected(s); setLoading(true);
    try {
      const r = await api<{ session: any; logs: LogRow[] }>(`/api/admin/sessions/${s.code}/logs`);
      setLogs(r.logs);
    } finally { setLoading(false); }
  }

  function downloadCSV() {
    if (!selected || !logs.length) return;
    const headers = ['time', 'event', 'actor', 'level', 'payload'];
    const rows = logs.map(l => [
      new Date(l.createdAt).toISOString(),
      l.event,
      l.actor ?? '',
      l.level,
      JSON.stringify(l.payload ?? {})
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${selected.code}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredLogs = filter.trim()
    ? logs.filter(l =>
        l.event.toLowerCase().includes(filter.toLowerCase()) ||
        (l.actor ?? '').toLowerCase().includes(filter.toLowerCase())
      )
    : logs;

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-2xl">Последние сессии</h2>
          <label className="flex items-center gap-2 text-sm text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={e => setAutoRefresh(e.target.checked)}
            />
            Автообновление (10 сек)
          </label>
        </div>
        {!sessions.length && <div className="text-muted text-sm">Пока не было сессий</div>}
        <div className="space-y-2">
          {sessions.map(s => (
            <button
              key={s.id}
              onClick={() => openSession(s)}
              className="w-full text-left flex items-center justify-between border border-line rounded-lg p-3 hover:border-accent transition"
            >
              <div>
                <div className="font-mono text-lg text-accent">{s.code}</div>
                <div className="text-xs text-muted">
                  {s.scenario} · {new Date(s.createdAt).toLocaleString('ru')} · {s.hostEmail ?? 'host'}
                </div>
                {s.metrics && (
                  <div className="flex gap-3 mt-1 text-[11px] text-muted">
                    {s.metrics.avgDiscussionSec != null && (
                      <span>⏱ {s.metrics.avgDiscussionSec}с обсужд.</span>
                    )}
                    {s.metrics.avgVoteDelaySec != null && (
                      <span>🗳 {s.metrics.avgVoteDelaySec}с до голоса</span>
                    )}
                    {s.metrics.correctVotesPercent != null && (
                      <span>✓ {s.metrics.correctVotesPercent}% верных</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="border border-line rounded px-2 py-1">{s.status}</span>
                <span className="text-muted">👥 {s.playersCount}</span>
                <span className="text-muted">📜 {s.logsCount}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {selected && (
        <Card>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h2 className="text-2xl">
              Лог сессии <span className="font-mono text-accent">{selected.code}</span>
            </h2>
            <div className="flex gap-2">
              <Btn onClick={downloadCSV} className="!px-3 !py-1.5 !text-xs">
                📥 CSV
              </Btn>
              <Btn onClick={() => setSelected(null)} className="!px-3 !py-1.5 !text-xs">Закрыть</Btn>
            </div>
          </div>

          <input
            type="text"
            placeholder="Фильтр по event или actor…"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full mb-3 bg-panel border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          />

          {loading && <div className="text-muted">Загрузка…</div>}
          {!loading && filteredLogs.length === 0 && (
            <div className="text-muted">{logs.length ? 'Ничего не найдено по фильтру' : 'Событий не найдено'}</div>
          )}
          {!loading && filteredLogs.length > 0 && (
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-2">
              {filteredLogs.map(l => {
                const color =
                  l.level === 'error' ? 'text-red-400'
                  : l.level === 'warn' ? 'text-amber-400'
                  : l.event.startsWith('client:') ? 'text-sky-400'
                  : 'text-green-300';
                return (
                  <div key={l.id} className="border border-line rounded-lg p-2.5 text-sm">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className={color + ' font-mono'}>{l.event}</span>
                        {l.actor && <span className="text-muted"> · {l.actor}</span>}
                      </div>
                      <span className="text-xs text-muted whitespace-nowrap">
                        {new Date(l.createdAt).toLocaleTimeString('ru', { hour12: false })}
                      </span>
                    </div>
                    {l.payload && (
                      <pre className="text-[11px] text-muted mt-1.5 overflow-x-auto whitespace-pre-wrap break-words">
                        {JSON.stringify(l.payload, null, 0)}
                      </pre>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}
    </>
  );
}
