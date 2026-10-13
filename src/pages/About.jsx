import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import photoDoorway from '../assets/about-photo-doorway.webp';
import photo from '../assets/about-photo.webp';
import Masonry from '../components/Masonry/Masonry';import './About.css';

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

// Newest first; `to` links the company to its case study.
const EXPERIENCE = [
  { role: 'Product Designer', company: 'Takshila', dates: 'May 2026 – Present', to: '/work/takshila' },
  { role: 'UI/UX Designer', company: 'Sylus AI', dates: 'Jun 2026 – Jul 2026' }
];

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

// Drop a cover into src/assets/books/<slug>.webp (or .jpg/.png) and it shows when the book opens.
const covers = import.meta.glob('../assets/books/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' });
const bookCover = slug => Object.entries(covers).find(([path]) => path.includes(`/${slug}.`))?.[1];

const BOOKS = [
  { title: 'The Psychology of Money', slug: 'psychology-of-money', bg: '#f4f1ea', fg: '#1a1a1a', accent: '#6f927c', author: 'Morgan Housel', h: 92, note: 'Behaviour beats spreadsheets. I design for how people actually decide, not how they should.' },
  { title: 'The Monk Who Sold His Ferrari', slug: 'monk-who-sold-his-ferrari', bg: '#f08224', fg: '#141414', accent: '#ffffff', author: 'Robin Sharma', h: 84, note: 'Clarity comes from removing, not adding. Same for screens.' },
  { title: "Don't Believe Everything You Think", slug: 'dont-believe-everything-you-think', bg: '#ffffff', fg: '#e4623a', accent: '#e4623a', author: 'Joseph Nguyen', h: 76, note: 'My first idea is a guess. Research decides, not ego.' },
  { title: 'The Power of Your Subconscious Mind', slug: 'power-of-your-subconscious-mind', bg: '#ffffff', fg: '#111111', accent: '#e2262b', author: 'Joseph Murphy', h: 88, note: 'Most choices happen before we notice. Good defaults matter.' },
  { title: 'Think and Grow Rich', slug: 'think-and-grow-rich', bg: '#151515', fg: '#f2b134', accent: '#f2b134', author: 'Napoleon Hill', h: 80, note: 'A clear goal turns effort into progress. Every project starts with one.' },
  { title: 'The Courage to Be Disliked', slug: 'courage-to-be-disliked', bg: '#ffffff', fg: '#d42a20', accent: '#d42a20', author: 'Kishimi & Koga', h: 94, note: 'I can defend a design decision without needing everyone to love it.' },
  { title: 'Atomic Habits', slug: 'atomic-habits', bg: '#fbf7ee', fg: '#1a1a1a', accent: '#b8893a', author: 'James Clear', h: 82, note: 'Small, repeated improvements win. I design and iterate the same way.' },
  { title: 'The Art of Laziness', slug: 'art-of-laziness', bg: '#f7f7f5', fg: '#1d1b3a', accent: '#c98a2e', author: 'Library Mindset', h: 72, note: 'The easiest path is the one people take. Make the right path the easy one.' },
  { title: 'Deep Work', slug: 'deep-work', bg: '#f6eed2', fg: '#3a3d45', accent: '#c9a23a', author: 'Cal Newport', h: 86, note: 'My best work comes from long, quiet focus, so I protect it.' },
  { title: 'Thinking, Fast and Slow', slug: 'thinking-fast-and-slow', bg: '#f1ede6', fg: '#1a1a1a', accent: '#e8b928', author: 'Daniel Kahneman', h: 96, note: 'Users run on System 1. Interfaces should not make them think twice.' },
  { title: 'Who Will Cry When You Die?', slug: 'who-will-cry-when-you-die', bg: '#2fb4ea', fg: '#101820', accent: '#ffffff', author: 'Robin Sharma', h: 78, note: 'Work that helps people outlasts work that just looks good.' },
  { title: 'The Alchemist', slug: 'the-alchemist', bg: '#f08a24', fg: '#b3261e', accent: '#ffffff', author: 'Paulo Coelho', h: 74, note: 'The journey is the lesson. Every project teaches me something new.' },
  { title: 'The Kite Runner', slug: 'the-kite-runner', bg: '#a9cdea', fg: '#a52a1f', accent: '#1e3f7a', author: 'Khaled Hosseini', h: 90, note: 'Empathy starts with understanding someone else’s story. That is research.' },
  { title: 'Rich Dad Poor Dad', slug: 'rich-dad-poor-dad', bg: '#4b2a7a', fg: '#f5c518', accent: '#ffffff', author: 'Robert Kiyosaki', h: 84, note: 'Build assets, not just output. I make systems that keep paying off.' },
  { title: 'Show Your Work!', slug: 'show-your-work', bg: '#f7d117', fg: '#111111', accent: '#111111', author: 'Austin Kleon', h: 70, note: 'Share the process, not just the result. That is why my case studies show the messy middle.' },
  { title: 'Keep Going', slug: 'keep-going', bg: '#1f5fb8', fg: '#ffffff', accent: '#f7d117', author: 'Austin Kleon', h: 66, note: 'Creativity is a daily practice, not a lightning strike.' },
  { title: 'Steal Like an Artist', slug: 'steal-like-an-artist', bg: '#111111', fg: '#ffffff', accent: '#e2262b', author: 'Austin Kleon', h: 74, note: 'Nothing is original. I study great work and remix it into something new.' },
  { title: 'Everything Is F*cked', slug: 'everything-is-fcked', bg: '#13b5c0', fg: '#0b0b0b', accent: '#ffffff', author: 'Mark Manson', h: 88, note: 'Hope is fragile, honesty is not. I would rather show a real problem than a pretty one.' }
];

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

      <section className="about-section" id="experience">
        <div className="container">
          <h2 className="about-eyebrow">Experience</h2>
          <ol className="edu-list">
            {EXPERIENCE.map((item, i) => (
              <li key={item.company} className="edu-row">
                <span className="edu-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="edu-degree">{item.role}</span>
                <span className="edu-school">
                  {item.to ? (
                    <Link to={item.to} className="exp-link">
                      {item.company} <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    item.company
                  )}
                </span>
                <span className="edu-year">{item.dates}</span>
              </li>
            ))}
          </ol>
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

      <section className="about-section" id="books">
        <div className="container">
          <h2 className="about-eyebrow">You are 90% of the books you read</h2>
          <p className="books-lede">
            Here&rsquo;s my version. <em>Hover a spine to see what it taught me.</em>
          </p>
          <ul className="books-shelf">
            {BOOKS.map((book, i) => (
              <li key={book.title} className="book" style={{ '--h': `${book.h}%`, '--book-bg': book.bg, '--book-fg': book.fg, '--book-accent': book.accent }} tabIndex={0}>
                <span className="book-spine">
                  <span className="book-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="book-title">{book.title}</span>
                </span>
                <span className="book-open">
                  {bookCover(book.slug) && (
                    <img className="book-cover" src={bookCover(book.slug)} alt={`${book.title} cover`} loading="lazy" />
                  )}
                  <span className="book-open-title">{book.title}</span>
                  <span className="book-author">{book.author}</span>
                  <span className="book-note">{book.note}</span>
                </span>
              </li>
            ))}
          </ul>
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
