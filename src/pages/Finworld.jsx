import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CaseNav from '../components/LineSidebar/CaseNav';
import FilmIntro from '../components/finworld/FilmIntro';
import { ScreenViewerProvider, useOpenScreen } from '../components/takshila/basics';
import { DECISIONS, FEATURES, INTRO, ISSUES, REFLECTION, TASK, TEST, USERS } from '../content/finworld';
import walkthrough from '../assets/finworld/walkthrough.mp4';
import coreIssues from '../assets/finworld/core-issues.webp';
import walkthroughPoster from '../assets/finworld/walkthrough-poster.webp';
import './Takshila.css';
import './Sylus.css';
import './GrubNGrab.css';
import './Finworld.css';

// Finworld case study page (/work/finworld). Same layout as Sylus and Grub'n Grab: black, one narrow
// column of real text, the screens as a slideshow, and each tool told as a decision tied to one of
// the three problems. (GrubNGrab.css brings the shared "Solves" line and theme cards.)
const SHOTS = import.meta.glob('../assets/finworld/screens/*.webp', { eager: true, import: 'default' });
const shot = key => SHOTS[`../assets/finworld/screens/${key}.webp`];

const NAV = [
  { label: 'Overview', selector: '#fw-overview' },
  { label: 'Problem', selector: '#fw-problem' },
  { label: 'One task', selector: '#fw-task' },
  ...FEATURES.map(f => ({ label: f.title, selector: `#${f.id}` })),
  { label: 'Testing', selector: '#fw-test' },
  { label: 'Reflection', selector: '#fw-reflect' }
];

const NAV_THEME = { accent: '#ffffff', text: '#8b90a3', marker: '#26304d', panel: '#000000' };

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

// A feature's screens, stepping on their own while in view; tabs let people pick one.
const SLIDE_MS = 3600;

const Switcher = ({ screens }) => {
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const ref = useRef(null);
  const n = screens.length;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (n < 2 || !inView || held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI(k => (k + 1) % n), SLIDE_MS);
    return () => clearInterval(id);
  }, [n, inView, held]);

  const s = screens[i];
  return (
    <figure ref={ref} className="sy-switch" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)}>
      <Screen img={s.img} alt={s.alt} key={s.img} />
      {n > 1 && (
        <div className="sy-tabs" role="tablist" aria-label="Screens" style={{ marginTop: 10 }}>
          {screens.map((t, k) => (
            <button key={t.img} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}>
              {t.label}
            </button>
          ))}
        </div>
      )}
      <figcaption>{s.alt}</figcaption>
    </figure>
  );
};

const Decision = ({ d, solves }) => (
  <div className="sy-decision">
    <p className="gg-solves">
      <span>Solves · {solves.theme}</span>
      {solves.problem}
    </p>
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
);

const Finworld = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Finworld — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <ScreenViewerProvider>
      <FilmIntro background="#ffffff" flatBands />
      <CaseNav sections={NAV} theme={NAV_THEME} />
      <div className="sy gg fw">
        <article className="sy-page">
          <header id="fw-overview">
            <p className="sy-crumb">
              <Link to="/#work">Work</Link> / Finworld
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
              <Screen img="dashboard" alt="The Finworld dashboard: revenue, net profit and cash forecast, with Nova beside it" />
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

          <section id="fw-problem" className="sy-feature">
            <h2>{ISSUES.title}</h2>
            <figure className="fw-issues-img">
              <img src={coreIssues} alt="3 core issues with current financial models: lack of clarity, poor collaboration and a steep learning curve" loading="lazy" />
            </figure>
            <ul className="gg-insights fw-issues">
              {ISSUES.items.map(it => (
                <li key={it.theme}>
                  <p className="gg-theme">{it.theme}</p>
                  <p>{it.text}</p>
                </li>
              ))}
            </ul>

            <h3>{USERS.title}</h3>
            <ul className="gg-insights">
              {USERS.items.map(u => (
                <li key={u.name}>
                  <p className="gg-quote">{u.name}</p>
                  <p className="fw-role">{u.role}</p>
                  <p>{u.thinks}</p>
                  <p>Needs: {u.needs}</p>
                </li>
              ))}
            </ul>

            <figure className="sy-video">
              <video src={walkthrough} poster={walkthroughPoster} controls playsInline preload="metadata" aria-label="Narrated walkthrough of Finworld" />
              <figcaption>A narrated walkthrough of the project.</figcaption>
            </figure>
          </section>

          <section id="fw-task" className="sy-feature">
            <h2>{TASK.title}</h2>
            <p className="fw-question">{TASK.question}</p>
            <ol className="fw-steps">
              {TASK.steps.map(s => (
                <li key={s.label}>
                  <span>{s.label}</span>
                  {s.text}
                </li>
              ))}
            </ol>
          </section>

          {FEATURES.map(f => (
            <section key={f.id} id={f.id} className="sy-feature">
              <h2>{f.title}</h2>
              <p>{f.what}</p>
              <Switcher screens={f.screens} />
              <Decision d={f.decision} solves={f.solves} />
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
            </section>
          ))}

          <section id="fw-test" className="sy-feature">
            <h2>{TEST.title}</h2>
            <p>{TEST.text}</p>
            <ul className="sy-micro">
              {TEST.tasks.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section id="fw-reflect" className="sy-feature">
            <h2>{REFLECTION.title}</h2>
            <div className="sy-glance fw-reflect">
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
          </section>
        </article>
      </div>
    </ScreenViewerProvider>
  );
};

export default Finworld;
