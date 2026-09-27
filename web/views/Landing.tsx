import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl mb-4">
          Тайна<span className="text-accent">.</span> за столом
        </h1>
        <p className="text-muted mb-8">
          Интерактивный детектив для кафе и компаний. Ведущий запускает игру,
          гости сканируют QR и играют командами.
        </p>
        <Link to="/login" className="inline-block px-5 py-3 rounded-lg bg-accent text-white">
          Войти
        </Link>
      </div>
    </div>
  );
}
