import { useEffect, useRef, useState } from 'react';

import photo from '../assets/about-photo.webp';
import Masonry from '../components/Masonry/Masonry';
import './About.css';

const EDUCATION = [
  { degree: 'M.Des, Interaction Design', school: 'Delhi Technological University (DTU)', year: 'Graduating 2027' },
  { degree: 'Chemical Engineering', school: 'National Institute of Technology (NIT) Agartala', year: '2025' }
];

// Placeholder tiles until the gallery photos arrive: swap `img` for real photos and
// `height` for each photo's display height (the grid halves it).
const tile = shade =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="${shade}"/></svg>`)}`;
const GALLERY = [400, 250, 600, 350, 500, 300, 450, 550, 280, 380, 520, 320].map((height, i) => ({
  id: String(i + 1),
  img: tile(['#1c1c1c', '#232323', '#2a2a2a'][i % 3]),
  height
}));

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

          <div className="about-photo" aria-hidden="true">
            <div className="about-photo-back" />
            <div className="about-photo-card">
              <img src={photo} alt="" />
            </div>
          </div>
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
          <h2 className="about-eyebrow">Gallery</h2>
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
