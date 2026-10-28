import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CaseNav from '../components/LineSidebar/CaseNav';
import FilmIntro from '../components/finworld/FilmIntro';
import sylusFilm from '../assets/sylus/film/intro.mp4';
import sylusFilmPortrait from '../assets/sylus/film/intro-portrait.mp4';
import { ScreenViewerProvider, useOpenScreen } from '../components/takshila/basics';
import { DECISIONS, FEATURES, INTRO, METHOD, NEXT, REFLECTION } from '../content/sylus';
import './Takshila.css';
import './Sylus.css';

// Sylus AI case study page (/work/sylus-ai). A plain, editorial layout: one narrow column of short
// paragraphs and large screens. Each feature's screen has tabs underneath to step through its states.
// (Takshila.css is only for the shared full-size screen viewer.)
const SHOTS = import.meta.glob('../assets/sylus/*.webp', { eager: true, import: 'default' });
const shot = key => SHOTS[`../assets/sylus/${key}.webp`];

const NAV = [{ label: 'Overview', selector: '#sy-overview' }, { label: 'How I decided', selector: '#sy-method' }, ...FEATURES.map(f => ({ label: f.title, selector: `#${f.id}` })), { label: 'Reflection', selector: '#sy-reflect' }];

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
      {d.principle && (
        <p className="sy-principle">
          <span>Principle used · {d.principle.name}</span>
          {d.principle.why}
        </p>
      )}
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
            <section className="sy-context" aria-label="Context">
              <dl>
                {INTRO.context.facts.map(f => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p>
                <strong>Constraint:</strong> {INTRO.context.constraint}
              </p>
            </section>
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
          </header>

          <section id="sy-method" className="sy-feature">
            <h2>{METHOD.title}</h2>
            <p>{METHOD.text}</p>
            <ul className="sy-method">
              {METHOD.items.map(m => (
                <li key={m.label}>
                  <strong>{m.label}</strong> {m.text}
                </li>
              ))}
            </ul>
          </section>

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
                    {f.micro.map(m =>
                      typeof m === 'string' ? (
                        <li key={m}>{m}</li>
                      ) : (
                        <li key={m.text}>
                          {m.text} <span className="sy-tag">{m.principle}</span>
                        </li>
                      )
                    )}
                  </ul>
                </>
              )}
              <Switcher screens={f.screens} />
            </section>
          ))}

          <section id="sy-reflect" className="sy-feature">
            <h2>{REFLECTION.title}</h2>
            <div className="sy-glance sy-reflect">
              <div>
                <p className="sy-glance-kind">What went well</p>
                <ul>
                  {REFLECTION.well.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="sy-glance-kind">What I’d do differently</p>
                <ul>
                  {REFLECTION.differently.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            <h3>{NEXT.title}</h3>
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
