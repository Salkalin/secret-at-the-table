import { useRef, useState } from 'react';
import ThreeScene from './ThreeScene';
import Nav from './Nav';
import Hero from './Hero';
import Marquee from './Marquee';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Numbers from './Numbers';
import Gallery from './Gallery';
import Videos from './Videos';
import Reviews from './Reviews';
import PartnerForm from './PartnerForm';
import FinalCta from './FinalCta';
import Footer from './Footer';
import Lightbox, { LightboxState } from './Lightbox';
import LoginModal from './LoginModal';
import { VIDEOS } from './data';

export default function Landing() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lb, setLb] = useState<LightboxState | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPhoto = (index: number) => {
    setLb({ mode: 'photo', listIndex: index, videoIndex: 0, title: '' });
  };

  const openVideo = (videoIndex: number) => {
    const v = VIDEOS[videoIndex];
    setLb({
      mode: v.src ? 'video' : 'reel',
      listIndex: 0,
      videoIndex,
      title: v.t
    });
  };

  const lbPrev = () => {
    if (!lb) return;
    if (lb.mode === 'photo') {
      setLb({ ...lb, listIndex: (lb.listIndex - 1 + 8) % 8 });
    }
  };

  const lbNext = () => {
    if (!lb) return;
    if (lb.mode === 'photo') {
      setLb({ ...lb, listIndex: (lb.listIndex + 1) % 8 });
    }
  };

  return (
    <div className="relative bg-lnd-ink text-lnd-text font-sans min-h-screen">
      <ThreeScene />

      <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_70%_35%,transparent_0%,rgba(8,4,3,.2)_50%,rgba(8,4,3,.75)_100%)]" />

      <div
        ref={scrollRef}
        className="relative z-[2] h-screen overflow-y-auto overflow-x-hidden"
      >
        <Nav onCabinet={() => setLoginOpen(true)} onGo={goTo} onTop={toTop} />

        <div className="max-w-[1160px] mx-auto px-6 md:px-8 pb-20">
          <Hero onCabinet={() => setLoginOpen(true)} onReel={() => openVideo(0)} />
        </div>

        <Marquee />

        <div className="max-w-[1160px] mx-auto px-6 md:px-8">
          <HowItWorks />
          <Features />
          <Numbers />
          <Gallery onOpen={openPhoto} />
          <Videos onOpen={openVideo} />
          <Reviews />
          <PartnerForm />
          <FinalCta onCabinet={() => setLoginOpen(true)} />
          <Footer />
        </div>
      </div>

      <Lightbox
        state={lb}
        onClose={() => setLb(null)}
        onPrev={lbPrev}
        onNext={lbNext}
      />

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}