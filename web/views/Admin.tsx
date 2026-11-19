import { useEffect, useState } from 'react';
import { api } from '../api';
import { Card, Input, PrimaryBtn, Btn } from '../ui';
import { ScenariosTab } from './admin/ScenariosTab';

// ============================================================
// TYPES
// ============================================================

type Host = {
  id: string;
  email: string;
  active: boolean;
  createdAt: string;
  firstName: string | null;
  lastName: string | null;
  expiresAt: string | null;
  description: string | null;
  phone: string | null;
  address: string | null;
};

type SessionRow = {
  id: string; code: string; scenario: string; status: string;
  createdAt: string; endedAt: string | null;
  hostEmail: string | null; playersCount: number; logsCount: number;
};

type LogRow = {
  id: string; level: string; event: string; actor: string | null;
  payload: any; createdAt: string;
};

// ============================================================
// ROOT
// ============================================================

export default function Admin() {
  const [tab, setTab] = useState<'hosts' | 'logs' | 'scenarios'>('hosts');

  return (
    <div className="max-w-[1400px] mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-4xl">Админ-панель</h1>
        <div className="flex gap-2 flex-wrap">
          <TabBtn active={tab === 'hosts'} onClick={() => setTab('hosts')}>
            Ведущие
          </TabBtn>
          <TabBtn active={tab === 'logs'} onClick={() => setTab('logs')}>
            Мониторинг игр
          </TabBtn>
          <TabBtn active={tab === 'scenarios'} onClick={() => setTab('scenarios')}>
            Сценарии
          </TabBtn>
          <Btn
            onClick={async () => {
              await api('/api/logout', { method: 'POST' });
              location.href = '/';
            }}
          >
            Выйти
          </Btn>
        </div>
      </div>

      {tab === 'hosts' && <HostsTab />}
      {tab === 'logs' && <LogsTab />}
      {tab === 'scenarios' && <ScenariosTab />}
    </div>
  );
}

function TabBtn({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={
        'px-4 py-2 rounded-lg border text-sm font-medium transition ' +
        (active ? 'bg-accent text-white border-accent' : 'bg-panel border-line')
      }
    >
      {children}
    </button>
  );
}

// ============================================================
// HOSTS (unchanged)
// ============================================================

function HostsTab() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: '',
    expiresAt: '', description: '', phone: '', address: ''
  });
  const [msg, setMsg] = useState('');
  const [editing, setEditing] = useState<Host | null>(null);
  const [editForm, setEditForm] = useState({
    email: '', password: '', firstName: '', lastName: '',
    expiresAt: '', description: '', phone: '', address: ''
  });

  const load = () =>
    api<Host[]>('/api/admin/hosts').then(setHosts).catch(() => (location.href = '/'));

  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    try {
      await api('/api/admin/hosts', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName || null,
          lastName: form.lastName || null,
          expiresAt: form.expiresAt || null,
          description: form.description || null,
          phone: form.phone || null,
          address: form.address || null
        })
      });
      setForm({
        email: '', password: '', firstName: '', lastName: '',
        expiresAt: '', description: '', phone: '', address: ''
      });
      setMsg('Ведущий создан');
      load();
    } catch (e: any) {
      setMsg('Ошибка: ' + e.message);
    }
  }

  async function toggle(id: string) {
    await api(`/api/admin/hosts/${id}/toggle`, { method: 'POST' });
    load();
  }

  async function remove(id: string, email: string) {
    if (!confirm(`Удалить аккаунт «${email}»?\nЕсли у него есть сессии или платежи — он будет деактивирован.`)) return;
    try {
      const r = await api<any>(`/api/admin/hosts/${id}`, { method: 'DELETE' });
      setMsg(r?.softDeleted ? 'Аккаунт деактивирован (есть связанные данные)' : 'Аккаунт удалён');
      load();
    } catch (e: any) {
      setMsg('Ошибка: ' + e.message);
    }
  }

    async function saveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    try {
      await api(`/api/admin/hosts/${editing.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          email: editForm.email,
          password: editForm.password || undefined,
          firstName: editForm.firstName || null,
          lastName: editForm.lastName || null,
          expiresAt: editForm.expiresAt || null,
          description: editForm.description || null,
          phone: editForm.phone || null,
          address: editForm.address || null
        })
      });
      setEditing(null);
      setMsg('Сохранено');
      load();
    } catch (e: any) {
      setMsg('Ошибка: ' + e.message);
    }
  }

  return (
    <>
      <Card>
        <h2 className="text-2xl mb-4">Создать ведущего</h2>
        <form onSubmit={create} className="space-y-3">
          <Input placeholder="Email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} required />
          <Input type="password" placeholder="Пароль" value={form.password} onChange={(e: any) => setForm({ ...form, password: e.target.value })} required />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Имя" value={form.firstName} onChange={(e: any) => setForm({ ...form, firstName: e.target.value })} />
            <Input placeholder="Фамилия" value={form.lastName} onChange={(e: any) => setForm({ ...form, lastName: e.target.value })} />
          </div>
          <div>
  <label className="block text-xs text-muted mb-1">Срок действия</label>
  <select
    value={form.expiresAt}
    onChange={(e: any) => setForm({ ...form, expiresAt: e.target.value })}
    className="w-full bg-panel border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
  >
    <option value="">Бессрочно</option>
    <option value={addMonths(1)}>1 месяц</option>
    <option value={addMonths(3)}>3 месяца</option>
    <option value={addMonths(6)}>6 месяцев</option>
    <option value={addMonths(12)}>1 год</option>
  </select>
  {form.expiresAt && (
    <div className="text-xs text-muted mt-1">
      Аккаунт будет активен до <b className="text-text">{new Date(form.expiresAt).toLocaleDateString('ru')}</b>
    </div>
  )}
</div>
          <Input placeholder="Описание (для какого заведения)" value={form.description} onChange={(e: any) => setForm({ ...form, description: e.target.value })} />
          <Input placeholder="Телефон" value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value })} />
          <Input placeholder="Адрес" value={form.address} onChange={(e: any) => setForm({ ...form, address: e.target.value })} />
          <PrimaryBtn type="submit">Создать</PrimaryBtn>
          {msg && <div className="text-sm text-muted">{msg}</div>}
        </form>
      </Card>

      <Card>
        <h2 className="text-2xl mb-4">Ведущие ({hosts.length})</h2>
        <div className="space-y-2">
          {hosts.map(h => {
            const expired = h.expiresAt && new Date(h.expiresAt) < new Date();
            const name = [h.firstName, h.lastName].filter(Boolean).join(' ');
            return (
              <div key={h.id} className="border border-line rounded-lg p-4">
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">
                      {h.email}
                      {name && <span className="text-muted ml-2">· {name}</span>}
                    </div>
                    {h.description && <div className="text-sm text-text">{h.description}</div>}
                    {h.phone && (
                      <div className="text-xs text-muted">
                        <i className="fa-solid fa-phone mr-1" /> {h.phone}
                      </div>
                    )}
                    {h.address && (
                      <div className="text-xs text-muted">
                        <i className="fa-solid fa-location-dot mr-1" /> {h.address}
                      </div>
                    )}
                    <div className="text-xs text-muted mt-1">
                      Создан: {new Date(h.createdAt).toLocaleDateString('ru')}
                      {h.expiresAt && (
                        <>
                          {' · '}
                          <span className={expired ? 'text-accent font-medium' : ''}>
                            {expired ? 'Истёк ' : 'Истекает '}
                            {new Date(h.expiresAt).toLocaleDateString('ru')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={
                      !h.active ? 'text-accent text-sm'
                      : expired ? 'text-accent text-sm'
                      : 'text-green-400 text-sm'
                    }>
                      {!h.active ? 'заблокирован' : expired ? 'истёк' : 'активен'}
                    </span>
                    <Btn onClick={() => {
                      setEditing(h);
                      setEditForm({
                        email: h.email,
                        password: '',
                        firstName: h.firstName || '',
                        lastName: h.lastName || '',
                        expiresAt: h.expiresAt ? h.expiresAt.slice(0, 10) : '',
                        description: h.description || '',
                        phone: h.phone || '',
                        address: h.address || ''
                      });
                    }}>Редактировать</Btn>
                    <Btn onClick={() => toggle(h.id)}>
                      {h.active ? 'Заблокировать' : 'Разблокировать'}
                    </Btn>
                    <Btn onClick={() => remove(h.id, h.email)} className="!bg-red-500/20 !text-red-400">Удалить</Btn>
                  </div>
                </div>
              </div>
            );
          })}
          {!hosts.length && <div className="text-muted text-sm">Пока никого нет</div>}
        </div>
      </Card>

      {editing && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) setEditing(null); }}
        >
          <div className="bg-panel border border-line rounded-2xl p-6 max-w-lg w-full my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif">Редактировать ведущего</h3>
              <button onClick={() => setEditing(null)} className="text-muted hover:text-text text-2xl leading-none">×</button>
            </div>

            <form onSubmit={saveEdit} className="space-y-3">
              <Input placeholder="Email" value={editForm.email} onChange={(e: any) => setEditForm({ ...editForm, email: e.target.value })} required />
              <Input type="password" placeholder="Новый пароль (оставь пустым, чтобы не менять)" value={editForm.password} onChange={(e: any) => setEditForm({ ...editForm, password: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Имя" value={editForm.firstName} onChange={(e: any) => setEditForm({ ...editForm, firstName: e.target.value })} />
                <Input placeholder="Фамилия" value={editForm.lastName} onChange={(e: any) => setEditForm({ ...editForm, lastName: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Срок действия</label>
                <input
                  type="date"
                  value={editForm.expiresAt}
                  onChange={(e: any) => setEditForm({ ...editForm, expiresAt: e.target.value })}
                  className="w-full bg-panel border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                />
                {editForm.expiresAt && (
                  <div className="text-xs text-muted mt-1">
                    Аккаунт будет активен до <b className="text-text">{new Date(editForm.expiresAt).toLocaleDateString('ru')}</b>
                  </div>
                )}
              </div>
              <Input placeholder="Описание (для какого заведения)" value={editForm.description} onChange={(e: any) => setEditForm({ ...editForm, description: e.target.value })} />
              <Input placeholder="Телефон" value={editForm.phone} onChange={(e: any) => setEditForm({ ...editForm, phone: e.target.value })} />
              <Input placeholder="Адрес" value={editForm.address} onChange={(e: any) => setEditForm({ ...editForm, address: e.target.value })} />

              <div className="flex gap-2 justify-end pt-2">
                <Btn type="button" onClick={() => setEditing(null)}>Отмена</Btn>
                <PrimaryBtn type="submit">Сохранить</PrimaryBtn>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}

// ============================================================
// LOGS (unchanged)
// ============================================================

function LogsTab() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [selected, setSelected] = useState<SessionRow | null>(null);
  const [logs, setLogs] = useState<LogRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api<SessionRow[]>('/api/admin/sessions').then(setSessions).catch(() => {});
  }, []);

  async function openSession(s: SessionRow) {
    setSelected(s);
    setLoading(true);
    try {
      const r = await api<{ session: any; logs: LogRow[] }>(
        `/api/admin/sessions/${s.code}/logs`
      );
      setLogs(r.logs);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <h2 className="text-2xl mb-4">Последние сессии</h2>
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
                  {s.scenario} · {new Date(s.createdAt).toLocaleString('ru')} ·{' '}
                  {s.hostEmail ?? 'host'}
                </div>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">
              Лог сессии <span className="font-mono text-accent">{selected.code}</span>
            </h2>
            <Btn onClick={() => setSelected(null)}>Закрыть</Btn>
          </div>
          {loading && <div className="text-muted">Загрузка…</div>}
          {!loading && logs.length === 0 && <div className="text-muted">Событий не найдено</div>}
          {!loading && logs.length > 0 && (
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-2">
              {logs.map(l => {
                const color =
                  l.level === 'error'
                    ? 'text-red-400'
                    : l.level === 'warn'
                    ? 'text-amber-400'
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
function addMonths(months: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}