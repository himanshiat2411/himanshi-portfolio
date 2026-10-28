import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CaseNav from '../components/LineSidebar/CaseNav';
import { ScreenViewerProvider, useOpenScreen } from '../components/takshila/basics';
import { FEATURES, INTRO, NEXT } from '../content/sylus';
import './Takshila.css';
import './Sylus.css';

// Sylus AI case study page (/work/sylus-ai). A plain, editorial layout: one narrow column of short
// paragraphs and large screens. Each feature's screen has tabs underneath to step through its states.
// (Takshila.css is only for the shared full-size screen viewer.)
const SHOTS = import.meta.glob('../assets/sylus/*.webp', { eager: true, import: 'default' });
const shot = key => SHOTS[`../assets/sylus/${key}.webp`];

const NAV = [{ label: 'Overview', selector: '#sy-overview' }, ...FEATURES.map(f => ({ label: f.title, selector: `#${f.id}` })), { label: 'Next', selector: '#sy-next' }];

const NAV_THEME = { accent: '#141b34', text: '#8b90a3', marker: '#d0ccdb', panel: '#ffffff' };

// A screen that opens full size on click.
const Screen = ({ img, alt }) => {
  const open = useOpenScreen();
  const src = shot(img);
  return (
    <a
      className="sy-screen"
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup="dialog"
      onClick={e => {
        e.preventDefault();
        open({ src, alt, label: alt });
      }}
    >
      <img src={src} alt={alt} loading="lazy" />
    </a>
  );
};

// One feature's screens as a slideshow: it moves to the next screen on its own while in view, and the
// tabs and arrows let people take over. A manual pick pauses the autoplay for a while; hovering or
// focusing it pauses it too. The caption follows the screen.
const SLIDE_MS = 3600;
const RESUME_MS = 9000;

const Switcher = ({ screens }) => {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const pausedUntil = useRef(0);
  const ref = useRef(null);
  const n = screens.length;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (n < 2 || !inView || held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setI(k => (k + 1) % n);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [n, inView, held]);

  const pick = k => {
    pausedUntil.current = Date.now() + RESUME_MS;
    setI((k + n) % n);
  };
  const s = screens[i];
  const playing = n > 1 && inView && !held;

  return (
    <figure
      ref={ref}
      className="sy-switch"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <Screen img={s.img} alt={s.alt} key={s.img} />
      {n > 1 && (
        <div className="sy-controls">
          <div className="sy-tabs" role="tablist" aria-label="Screens">
            {screens.map((t, k) => (
              <button
                key={t.img}
                type="button"
                role="tab"
                aria-selected={k === i}
                onClick={() => pick(k)}
                style={k === i && playing ? { '--slide': `${SLIDE_MS}ms` } : undefined}
                data-playing={k === i && playing ? '' : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="sy-arrows">
            <button type="button" aria-label="Previous screen" onClick={() => pick(i - 1)}>
              ←
            </button>
            <button type="button" aria-label="Next screen" onClick={() => pick(i + 1)}>
              →
            </button>
          </div>
        </div>
      )}
      <figcaption>{s.alt}</figcaption>
    </figure>
  );
};

// A short zoom walkthrough of the feature, looping silently. Phones get the portrait cut.
const VIDEOS = import.meta.glob('../assets/sylus/video/*.mp4', { eager: true, import: 'default' });
const usePhone = () => {
  const [phone, setPhone] = useState(() => window.matchMedia('(max-width: 720px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const on = () => setPhone(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return phone;
};

const Walkthrough = ({ name, label }) => {
  const phone = usePhone();
  const src = VIDEOS[`../assets/sylus/video/${name}${phone ? '-portrait' : ''}.mp4`];
  if (!src) return null;
  return (
    <figure className="sy-video" data-portrait={phone ? '' : undefined}>
      <video key={src} src={src} autoPlay muted loop playsInline preload="metadata" aria-label={label} />
      <figcaption>{label}</figcaption>
    </figure>
  );
};

const Sylus = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Sylus AI — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <ScreenViewerProvider>
      <CaseNav sections={NAV} theme={NAV_THEME} />
      <div className="sy">
        <article className="sy-page">
          <header id="sy-overview" className="sy-head">
            <p className="sy-crumb">
              <Link to="/#work">Work</Link> / Sylus AI
            </p>
            <h1>{INTRO.title}</h1>
            <p className="sy-tags">
              {INTRO.tags.map(t => (
                <span key={t}>{t}</span>
              ))}
            </p>
            <figure className="sy-cover">
              <Screen img={INTRO.cover.img} alt={INTRO.cover.alt} />
            </figure>
            {INTRO.paragraphs.map(p => (
              <p key={p}>{p}</p>
            ))}
            <dl className="sy-facts">
              {INTRO.facts.map(f => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          {FEATURES.map(f => (
            <section key={f.id} id={f.id} className="sy-feature">
              <h2>{f.title}</h2>
              <p>{f.what}</p>
              {f.video && <Walkthrough name={f.video} label={f.videoLabel} />}
              <h3>Why</h3>
              <p>{f.why}</p>
              {f.notes?.map(n => (
                <p key={n}>{n}</p>
              ))}
              <Switcher screens={f.screens} />
            </section>
          ))}

          <section id="sy-next" className="sy-feature">
            <h2>{NEXT.title}</h2>
            {NEXT.paragraphs.map(p => (
              <p key={p}>{p}</p>
            ))}
          </section>
        </article>
      </div>
    </ScreenViewerProvider>
  );
};

export default Sylus;
