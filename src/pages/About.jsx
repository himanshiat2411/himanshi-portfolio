import { useEffect, useRef, useState } from 'react';

import photoDoorway from '../assets/about-photo-doorway.webp';
import photo from '../assets/about-photo.webp';
import Masonry from '../components/Masonry/Masonry';
import './About.css';

// The two prints beside the intro; the first starts in front. `focus` is the crop within the frame.
const PRINTS = [
  { src: photo, focus: 'center bottom' },
  { src: photoDoorway, focus: 'center 70%' }
];

// Clicking (or pressing Enter/Space on) the print behind shuffles it to the front:
// it slides out to the right, rises over the other one and settles in the front spot.
const PhotoStack = () => {
  const [front, setFront] = useState(0);
  const [rising, setRising] = useState(null);

  // Unlock even if animationend never fires (e.g. the tab was hidden mid-shuffle).
  useEffect(() => {
    if (rising === null) return undefined;
    const id = setTimeout(() => setRising(null), 900);
    return () => clearTimeout(id);
  }, [rising]);

  const bringForward = index => {
    if (index === front || rising !== null) return;
    setFront(index);
    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setRising(index);
  };

  return (
    <div className="about-photo">
      {PRINTS.map((print, i) => {
        const isBack = i !== front;
        return (
          <div
            key={print.src}
            className="about-print"
            data-role={isBack ? 'back' : 'front'}
            data-motion={rising === null ? undefined : i === rising ? 'rise' : 'sink'}
            onAnimationEnd={() => setRising(null)}
            onClick={isBack ? () => bringForward(i) : undefined}
            onKeyDown={
              isBack
                ? e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      bringForward(i);
                    }
                  }
                : undefined
            }
            role={isBack ? 'button' : undefined}
            tabIndex={isBack ? 0 : undefined}
            aria-label={isBack ? 'Bring the other photo to the front' : undefined}
          >
            <img src={print.src} alt="" style={{ objectPosition: print.focus }} />
          </div>
        );
      })}
    </div>
  );
};

const EDUCATION = [
  { degree: 'M.Des, Interaction Design', school: 'Delhi Technological University (DTU)', year: 'Graduating 2027' },
  { degree: 'B.Tech, Chemical Engineering', school: 'National Institute of Technology (NIT) Agartala', year: '2025' }
];

// Gallery photos (src/assets/gallery). `height` is the tile height the grid uses (it halves
// it); varied heights give the masonry its rhythm, and tiles crop to fill. Clicking opens the photo.
const photos = import.meta.glob('../assets/gallery/*.webp', { eager: true, import: 'default' });
const galleryPhoto = n => photos[`../assets/gallery/${n}.webp`];
const GALLERY = [
  { n: '01', height: 860, alt: 'A hand holding a carved leather notebook on a market street' },
  { n: '02', height: 640, alt: 'A café lit up at night under a deep blue sky' },
  { n: '03', height: 820, alt: 'Looking up at ornate palace balconies against a blue sky' },
  { n: '04', height: 700, alt: 'Snow-capped mountains above a green valley' },
  { n: '05', height: 760, alt: 'A phone capturing the sunset over fort walls' },
  { n: '06', height: 700, alt: 'A lit-up building on a busy street at night' },
  { n: '07', height: 760, alt: 'A tower of string lights by the sea at dusk' },
  { n: '08', height: 820, alt: 'Birds circling a golden fort in a blue sky' },
  { n: '09', height: 620, alt: 'A golden fort town seen from above' },
  { n: '10', height: 700, alt: 'Colourful textiles hung along a stone wall' },
  { n: '11', height: 640, alt: 'A camel resting on desert sand' },
  { n: '12', height: 760, alt: 'A colourful temple tower against the sky' }
].map(({ n, height, alt }) => ({ id: n, img: galleryPhoto(n), url: galleryPhoto(n), height, alt }));

// Mount the gallery only once it scrolls into view, so its entrance animation is seen.
const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

const About = () => {
  const [galleryRef, galleryInView] = useInView();

  useEffect(() => {
    const previous = document.title;
    document.title = 'About — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-inner container">
          <div className="about-text">
            <div className="about-heading">
              <h1 className="about-title">
                I see stories
                <br />
                <em>in small details</em>
              </h1>
              <p className="about-script">And i design experience around them</p>
            </div>
            <div className="about-bio">
              <p>
                I'm Himanshi — a Product Designer and UX Researcher with an engineering background. I like stepping into
                messy, unclear problems, asking the right questions, and slowly shaping them into something simple and easy
                to use.
              </p>
              <p>
                A lot of how I design comes from empathy. I don't just want to know what people do — I want to know why.
                That usually means going deep into research and behavior, then turning what I learn into experiences that
                feel natural and human.
              </p>
            </div>
          </div>

          <PhotoStack />
        </div>
      </section>

      <section className="about-section" id="education">
        <div className="container">
          <h2 className="about-eyebrow">Education</h2>
          <ol className="edu-list">
            {EDUCATION.map((item, i) => (
              <li key={item.school} className="edu-row">
                <span className="edu-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="edu-degree">{item.degree}</span>
                <span className="edu-school">{item.school}</span>
                <span className="edu-year">{item.year}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-section about-gallery" id="gallery">
        <div className="container">
          <h2 className="about-eyebrow">Beside design, you will find me here</h2>
          <div ref={galleryRef} className="about-gallery-grid">
            {galleryInView && (
              <Masonry
                items={GALLERY}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover
                hoverScale={0.95}
                blurToFocus
                colorShiftOnHover={false}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
