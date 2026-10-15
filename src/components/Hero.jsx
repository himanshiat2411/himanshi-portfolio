import { useRef, useState } from 'react';
import TechText from './TechText/TechText';
import SculptureHero from './ui/liquid-sculpture-hero';
import sculpture from '../assets/hero/sculpture-green.webp';
import sculptureMobile from '../assets/hero/sculpture-green-mobile.webp';
import IntroVideoModal from './IntroVideoModal';
import './Hero.css';

// Behind the name: a neon-green liquid sculpture (liquid-sculpture-hero) that turns to flowing
// particles under the cursor. The layer ignores the pointer itself (so the name keeps its own
// hover effect); the hero passes its pointer events on to it instead.
const POINTER_EVENTS = ['pointermove', 'pointerdown', 'pointerup', 'pointercancel', 'pointerleave'];
const NO_LINK = { label: '', href: '' };

const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const liquidRef = useRef(null);

  const forward = e => {
    const target = liquidRef.current?.querySelector('.sh-root');
    if (!target || !POINTER_EVENTS.includes(e.type)) return;
    target.dispatchEvent(new PointerEvent(e.type, e.nativeEvent));
  };

  return (
  <section
    className="hero"
    onPointerMove={forward}
    onPointerDown={forward}
    onPointerUp={forward}
    onPointerCancel={forward}
    onPointerLeave={forward}
  >
    <div ref={liquidRef} className="hero-liquid" aria-hidden="true">
      <SculptureHero
        src={sculpture}
        darkSrc={sculpture}
        mobileSrc={sculptureMobile}
        mobileDarkSrc={sculptureMobile}
        theme="dark"
        darkBackground="#0a0a0a"
        showNav={false}
        themeToggle={false}
        eyebrow=""
        headline=""
        headlineAccent=""
        body=""
        primaryCta={NO_LINK}
        secondaryCta={NO_LINK}
        hint=""
        hintTouch=""
        backdropText=""
        showCredit={false}
        loadFonts={false}
        height="100%"
        sculptureScale={0.82}
        sculptureY={-4}
      />
    </div>
    <div className="hero-wordmark">
      <TechText
        text="Himanshi"
        fontFamily="'Inter', sans-serif"
        fontWeight={600}
        fontSize={150}
        color="#ffffff"
        accentColor="#C6FF3D"
        reveal="letter"
        dashLength={4}
        dashGap={2}
        specks={15}
      />
    </div>
    <p className="hero-tagline">
      <span className="hero-dot" aria-hidden="true" />
      Product Designer and UX Researcher
    </p>
    <button type="button" className="hero-intro-btn" onClick={() => setVideoOpen(true)}>
      <span className="hero-intro-play" aria-hidden="true" />
      Watch my intro
    </button>
    <IntroVideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
  </section>
  );
};

export default Hero;
