import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Input, PrimaryBtn, Card } from '../ui';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    try {
      const r = await api<{ role: 'ADMIN' | 'HOST' }>('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      nav(r.role === 'ADMIN' ? '/admin' : '/host');
    } catch {
      setErr('Неверный логин или пароль');
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <h2 className="text-3xl mb-6">Вход</h2>
        <form onSubmit={submit} className="space-y-3">
          <Input placeholder="Email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Пароль" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          {err && <div className="text-accent text-sm">{err}</div>}
          <PrimaryBtn type="submit" className="w-full">Войти</PrimaryBtn>
        </form>
      </Card>
    </div>
  );
}
