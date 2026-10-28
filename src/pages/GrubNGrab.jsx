import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CaseNav from '../components/LineSidebar/CaseNav';
import VideoIntro from '../components/VideoIntro';
import { ScreenViewerProvider, useOpenScreen } from '../components/takshila/basics';
import { COMPETITORS, DECISIONS, FEATURES, INTRO, NEXT, RESEARCH, TEST } from '../content/grubngrab';
import introFilm from '../assets/grub-n-grab/videos/1.mp4';
import prototypeVideo from '../assets/grub-n-grab/videos/2.mp4';
import './Takshila.css';
import './Sylus.css';
import './GrubNGrab.css';

// Grub'n Grab case study page (/work/grub-n-grab). Built like the Sylus page: black, one narrow
// column of real text, and each part of the app told as a decision. Its screens are phones, so they
// show as a row of phones that steps on its own, rather than one wide screen.
const SHOTS = import.meta.glob('../assets/grub-n-grab/screens/*.webp', { eager: true, import: 'default' });
const shot = key => SHOTS[`../assets/grub-n-grab/screens/${key}.webp`];

const NAV = [
  { label: 'Overview', selector: '#gg-overview' },
  { label: 'Research', selector: '#gg-research' },
  ...FEATURES.map(f => ({ label: f.title, selector: `#${f.id}` })),
  { label: 'Testing', selector: '#gg-test' },
  { label: 'Learnings', selector: '#gg-next' }
];

const NAV_THEME = { accent: '#ffffff', text: '#8c958f', marker: '#2b3a33', panel: '#000000' };

const Phone = ({ img, alt, active }) => {
  const open = useOpenScreen();
  const src = shot(img);
  return (
    <a
      className="gg-phone"
      data-active={active ? '' : undefined}
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

// A feature's phones side by side. While in view, the highlight moves along them on its own; the
// tabs let people pick one. The caption follows the highlighted phone.
const SLIDE_MS = 3200;

const Phones = ({ screens }) => {
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

  return (
    <figure
      ref={ref}
      className="gg-phones"
      data-count={n}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      <div className="gg-phones-row">
        {screens.map((s, k) => (
          <Phone key={s.img} img={s.img} alt={s.alt} active={n > 1 && k === i} />
        ))}
      </div>
      {n > 1 && (
        <div className="sy-tabs" role="tablist" aria-label="Screens">
          {screens.map((s, k) => (
            <button key={s.img} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}>
              {s.label}
            </button>
          ))}
        </div>
      )}
      <figcaption>{screens[i].alt}</figcaption>
    </figure>
  );
};

const Decision = ({ d, solves }) => (
  <div className="sy-decision">
    {solves && (
      <p className="gg-solves">
        <span>Solves · {solves.theme}</span>
        {solves.problem}
      </p>
    )}
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

const GrubNGrab = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Grub’n Grab — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <ScreenViewerProvider>
      <VideoIntro src={introFilm} background="#000000" label="Grub’n Grab intro animation" />
      <CaseNav sections={NAV} theme={NAV_THEME} />
      <div className="sy gg">
        <article className="sy-page">
          <header id="gg-overview">
            <p className="sy-crumb">
              <Link to="/#work">Work</Link> / Grub’n Grab
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
            <figure className="sy-video">
              <video src={prototypeVideo} autoPlay muted loop playsInline preload="metadata" aria-label="Grub’n Grab prototype walkthrough" />
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

          <section id="gg-research" className="sy-feature">
            <h2>{RESEARCH.title}</h2>
            <p>{RESEARCH.text}</p>
            <ul className="gg-insights">
              {RESEARCH.insights.map(r => (
                <li key={r.quote}>
                  <p className="gg-theme">{r.theme}</p>
                  <p className="gg-quote">“{r.quote}”</p>
                  <p>{r.then}</p>
                </li>
              ))}
            </ul>

            <h3>{COMPETITORS.title}</h3>
            <p>{COMPETITORS.text}</p>
            <div className="gg-table-wrap">
              <table className="gg-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="gg-sr">Feature</span>
                    </th>
                    {COMPETITORS.cols.map(c => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.rows.map(([label, ...cells]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {cells.map((v, k) => (
                        <td key={COMPETITORS.cols[k]} data-yes={v ? '' : undefined}>
                          {v ? '✓' : '–'}
                          <span className="gg-sr">{v ? 'Yes' : 'No'}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {FEATURES.map(f => (
            <section key={f.id} id={f.id} className="sy-feature">
              <h2>{f.title}</h2>
              <p>{f.what}</p>
              <Phones screens={f.screens} />
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

          <section id="gg-test" className="sy-feature">
            <h2>{TEST.title}</h2>
            <p>{TEST.text}</p>
            <ul className="sy-micro">
              {TEST.tasks.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section id="gg-next" className="sy-feature">
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

export default GrubNGrab;
