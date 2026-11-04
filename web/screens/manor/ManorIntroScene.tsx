import { useIsDesktop, useLightning } from './shared';

export function ManorIntroScene() {
  const isDesktop = useIsDesktop(640);
  const flash = useLightning();

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-10] bg-[#0e0b0a] overflow-hidden">
      <div className="absolute inset-0 bg-[#b9c6d2] transition-opacity duration-75 pointer-events-none z-10" style={{ opacity: flash * 0.35 }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMaxYMax slice">
        {/* Упрощённый вариант сцены витрины (как в макете) */}
        <rect width="1000" height="800" fill="#140f0d" />
        <rect x="700" y="300" width="260" height="300" fill="#1d1411" stroke="#35271f" strokeWidth="2" />
        <ellipse cx="830" cy="600" rx="130" ry="20" fill="#000" opacity=".5" />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,10,9,0.95)_0%,rgba(13,10,9,0.8)_30%,rgba(13,10,9,0.2)_60%,transparent_100%)] pointer-events-none" />
    </div>
  );
}