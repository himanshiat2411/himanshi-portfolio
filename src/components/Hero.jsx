import { useState } from 'react';
import TechText from './TechText/TechText';
import IntroVideoModal from './IntroVideoModal';
import './Hero.css';

const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
  <section className="hero">
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
