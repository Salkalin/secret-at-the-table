import { useEffect, useState } from 'react';
import { api } from '../api';
import { Card, Input, PrimaryBtn, Btn } from '../ui';

type Host = { id: string; email: string; active: boolean; createdAt: string };

export default function Admin() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const load = () =>
    api<Host[]>('/api/admin/hosts')
      .then(setHosts)
      .catch(() => (location.href = '/login'));

  useEffect(() => {
    load();
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    try {
      await api('/api/admin/hosts', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      setEmail('');
      setPassword('');
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

  async function logout() {
    await api('/api/logout', { method: 'POST' });
    location.href = '/login';
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl">Админ-панель</h1>
        <Btn onClick={logout}>Выйти</Btn>
      </div>

      <Card>
        <h2 className="text-2xl mb-4">Создать ведущего</h2>
        <form onSubmit={create} className="space-y-3">
          <Input
            placeholder="Email ведущего"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <PrimaryBtn type="submit">Создать</PrimaryBtn>
          {msg && <div className="text-sm text-muted">{msg}</div>}
        </form>
      </Card>

      <Card>
        <h2 className="text-2xl mb-4">Ведущие ({hosts.length})</h2>
        <div className="space-y-2">
          {hosts.map(h => (
            <div
              key={h.id}
              className="flex items-center justify-between border border-line rounded-lg p-3"
            >
              <div>
                <div className="font-medium">{h.email}</div>
                <div className="text-xs text-muted">
                  {new Date(h.createdAt).toLocaleString('ru')}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={h.active ? 'text-green-400 text-sm' : 'text-accent text-sm'}>
                  {h.active ? 'активен' : 'заблокирован'}
                </span>
                <Btn onClick={() => toggle(h.id)}>
                  {h.active ? 'Заблокировать' : 'Разблокировать'}
                </Btn>
              </div>
            </div>
          ))}
          {!hosts.length && <div className="text-muted text-sm">Пока никого нет</div>}
        </div>
      </Card>
    </div>
  );
}
