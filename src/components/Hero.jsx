import TechText from './TechText/TechText';
import './Hero.css';

const Hero = () => (
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
  </section>
);

export default Hero;
