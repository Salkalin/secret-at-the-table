import { useRef, useState } from 'react';
import ThreeScene from './ThreeScene';
import Nav from './Nav';
import Hero from './Hero';
import Cases from './Cases';
import LoginModal from './LoginModal';

export default function Landing() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-lnd-ink text-lnd-text font-sans min-h-screen">
      <ThreeScene />

      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_70%_35%,transparent_0%,rgba(8,4,3,.2)_50%,rgba(8,4,3,.75)_100%)]" />

      <div
        ref={scrollRef}
        className="relative z-[2] h-screen overflow-y-auto overflow-x-hidden"
      >
        <Nav
          onCabinet={() => setLoginOpen(true)}
          onGo={goTo}
          onTop={toTop}
        />

        <div className="max-w-[1160px] mx-auto px-6 md:px-8 pb-20">
          <Hero
            onCabinet={() => setLoginOpen(true)}
            onReel={() => setLoginOpen(true)}
          />

          <Cases />
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}