import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CaseNav from '../components/LineSidebar/CaseNav';
import FilmIntro from '../components/finworld/FilmIntro';
import sylusFilm from '../assets/sylus/film/intro.mp4';
import sylusFilmPortrait from '../assets/sylus/film/intro-portrait.mp4';
import { ScreenViewerProvider, useOpenScreen } from '../components/takshila/basics';
import { DECISIONS, FEATURES, INTRO, NEXT } from '../content/sylus';
import './Takshila.css';
import './Sylus.css';

// Sylus AI case study page (/work/sylus-ai). A plain, editorial layout: one narrow column of short
// paragraphs and large screens. Each feature's screen has tabs underneath to step through its states.
// (Takshila.css is only for the shared full-size screen viewer.)
const SHOTS = import.meta.glob('../assets/sylus/*.webp', { eager: true, import: 'default' });
const shot = key => SHOTS[`../assets/sylus/${key}.webp`];

const NAV = [{ label: 'Overview', selector: '#sy-overview' }, ...FEATURES.map(f => ({ label: f.title, selector: `#${f.id}` })), { label: 'Next', selector: '#sy-next' }];

const NAV_THEME = { accent: '#ffffff', text: '#8f8a9e', marker: '#3a3446', panel: '#000000' };

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

// A short zoom walkthrough of the feature, looping silently. It keeps the screen's own shape on
// every device, so on phones it sits at the column width like the screens around it.
const VIDEOS = import.meta.glob('../assets/sylus/video/*.mp4', { eager: true, import: 'default' });

// One decision told as a story: the hook, what was there before, what I chose, and what it changed.
const Decision = ({ d }) =>
  d ? (
    <div className="sy-decision">
      <p className="sy-decision-label">Decision</p>
      <p className="sy-decision-hook">{d.hook}</p>
      <dl>
        <div>
          <dt>Before</dt>
          <dd>{d.before}</dd>
        </div>
        <div>
          <dt>Decision</dt>
          <dd>{d.decision}</dd>
        </div>
        <div>
          <dt>Result</dt>
          <dd>{d.result}</dd>
        </div>
      </dl>
    </div>
  ) : null;

const Walkthrough = ({ name, label }) => {
  const src = VIDEOS[`../assets/sylus/video/${name}.mp4`];
  if (!src) return null;
  return (
    <figure className="sy-video">
      <video src={src} autoPlay muted loop playsInline preload="metadata" aria-label={label} />
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
      <FilmIntro film={sylusFilm} portrait={sylusFilmPortrait} background="#000000" />
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
            <p className="sy-hook">{INTRO.hook}</p>
            <dl className="sy-stats">
              {INTRO.stats.map(st => (
                <div key={st.label}>
                  <dt>{st.value}</dt>
                  <dd>{st.label}</dd>
                </div>
              ))}
            </dl>
            <figure className="sy-cover">
              <Screen img={INTRO.cover.img} alt={INTRO.cover.alt} />
            </figure>
            <div className="sy-overview">
              {INTRO.overview.map(o => (
                <div key={o.label}>
                  <h3>{o.label}</h3>
                  <p>{o.text}</p>
                </div>
              ))}
            </div>
            {INTRO.paragraphs.map(p => (
              <p key={p}>{p}</p>
            ))}
            <section className="sy-glance" aria-label="Key decisions">
              <h3>Key decisions</h3>
              <div>
                <p className="sy-glance-kind">Strategic</p>
                <ul>
                  {DECISIONS.strategic.map(d => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="sy-glance-kind">Micro</p>
                <ul>
                  {DECISIONS.micro.map(d => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </section>
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
              <Decision d={f.decision} />
              {f.micro?.length > 0 && (
                <>
                  <h3>Smaller decisions</h3>
                  <ul className="sy-micro">
                    {f.micro.map(m => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </>
              )}
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
