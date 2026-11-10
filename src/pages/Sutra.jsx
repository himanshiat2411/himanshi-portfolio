import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import BackToTop from '../components/BackToTop';
import CaseNav from '../components/LineSidebar/CaseNav';
import Rich from '../components/Rich';
import PhonePrototype from '../components/sutra/PhonePrototype';
import { ScreenViewerProvider, useOpenScreen } from '../components/takshila/basics';
import { CONCEPTS, DECISIONS, FEATURES, INTRO, JOURNEY, NEXT, PROCESS, PROTOTYPE, RESEARCH, RULES, WORLD } from '../content/sutra';
import film from '../assets/sutra/film.mp4';
import poster from '../assets/sutra/cover.webp';
import moon from '../assets/sutra/moon.webp';
import './Takshila.css';
import './Sylus.css';
import './GrubNGrab.css';
import './Sutra.css';

// Sutra case study page (/work/sutra). Same layout as Sylus, Grub'n Grab and Finworld: black, one
// narrow column of real text, and each part of the concept told as a decision tied to a research
// finding. The onboarding prototype is clickable, inside an iPhone frame.
const SHOTS = import.meta.glob('../assets/sutra/*.webp', { eager: true, import: 'default' });
const shot = key => SHOTS[`../assets/sutra/${key}.webp`];

const NAV = [
  { label: 'Overview', selector: '#su-overview' },
  { label: 'The world', selector: '#su-world' },
  { label: 'Research', selector: '#su-research' },
  { label: 'Concepts', selector: '#su-concepts' },
  ...FEATURES.map(f => ({ label: f.title, selector: `#${f.id}` })),
  { label: 'Prototype', selector: '#su-prototype' },
  { label: 'A day with Moon', selector: '#su-journey' },
  { label: 'Next', selector: '#su-next' }
];

const NAV_THEME = { accent: '#ffffff', text: '#938fa6', marker: '#2f2a45', panel: '#000000' };

// An image that opens full size on click.
const Shot = ({ img, alt, className = '' }) => {
  const open = useOpenScreen();
  const src = shot(img);
  return (
    <a
      className={`su-shot ${className}`}
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
        <dd>
          <Rich text={d.before} />
        </dd>
      </div>
      <div>
        <dt>Decision</dt>
        <dd>
          <Rich text={d.decision} />
        </dd>
      </div>
      <div>
        <dt>Result</dt>
        <dd>
          <Rich text={d.result} />
        </dd>
      </div>
    </dl>
  </div>
);

const MARK = ['✗', '~', '✓'];
const MARK_WORD = ['No', 'Partly', 'Yes'];

const Sutra = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Sutra — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <ScreenViewerProvider>
      <CaseNav sections={NAV} theme={NAV_THEME} />
      <div className="sy gg su">
        <article className="sy-page">
          <header id="su-overview">
            <p className="sy-crumb">
              <Link to="/#work">Work</Link> / Sutra
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
              <video src={film} poster={poster} controls playsInline preload="metadata" aria-label="Sutra: the concept film and walkthrough" />
              <figcaption>The concept film and walkthrough, 2 min 40 s, with sound.</figcaption>
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
                <strong>Brief:</strong> {INTRO.context.constraint}
              </p>
            </section>
            {INTRO.paragraphs.map(p => (
              <p key={p}>
                <Rich text={p} />
              </p>
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

          <section id="su-world" className="sy-feature">
            <h2>{WORLD.title}</h2>
            <ol className="su-rules">
              {WORLD.rules.map(r => (
                <li key={r.name}>
                  <b>{r.name}</b>
                  <p>{r.text}</p>
                </li>
              ))}
            </ol>
            <p className="su-note">{WORLD.note}</p>
          </section>

          <section id="su-research" className="sy-feature">
            <h2>{RESEARCH.title}</h2>
            <p>{RESEARCH.text}</p>
            <ul className="gg-insights">
              {RESEARCH.insights.map(r => (
                <li key={r.theme}>
                  <p className="gg-theme">{r.theme}</p>
                  <p className="gg-quote">
                    “{r.quote}” <small>— {r.who}</small>
                  </p>
                  <p>{r.then}</p>
                </li>
              ))}
            </ul>
            <p className="su-fine">{RESEARCH.backing}</p>
          </section>

          <section id="su-concepts" className="sy-feature">
            <h2>{CONCEPTS.title}</h2>
            <p>{CONCEPTS.text}</p>
            <div className="su-concepts">
              {CONCEPTS.options.map(o => (
                <figure key={o.name} data-chosen={o.chosen ? '' : undefined}>
                  <Shot img={o.img} alt={`Concept sketch: ${o.name}`} />
                  <figcaption>
                    <b>
                      {o.name}
                      {o.chosen && <span> · We chose this</span>}
                    </b>
                    {o.text}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="gg-table-wrap">
              <table className="gg-table su-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="gg-sr">Question</span>
                    </th>
                    {CONCEPTS.cols.map(c => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONCEPTS.rows.map(([label, ...cells]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {cells.map((v, k) => (
                        <td key={CONCEPTS.cols[k]} data-v={v}>
                          {MARK[v]}
                          <span className="gg-sr">{MARK_WORD[v]}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figure className="su-moon">
              <img src={moon} alt="Moon: a soft glowing dome with two eyes and floating tendrils" loading="lazy" />
              <figcaption>
                <b>Meet Moon.</b> A soft glowing dome, part jellyfish, part seed pod. It floats a hand’s height above you, starts small, and grows as it learns you.
              </figcaption>
            </figure>
          </section>

          {FEATURES.map(f => (
            <section key={f.id} id={f.id} className="sy-feature">
              <h2>{f.title}</h2>
              <p>
                <Rich text={f.what} />
              </p>
              {f.shots && (
                <div className={`su-shots${f.shots.length === 1 ? ' su-shots--one' : ''}`}>
                  {f.shots.map(s => (
                    <figure key={s.img}>
                      <Shot img={s.img} alt={s.label} />
                      <figcaption>{s.label}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
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

          <section id="su-prototype" className="sy-feature">
            <h2>{PROTOTYPE.title}</h2>
            <p>{PROTOTYPE.text}</p>
            <PhonePrototype />
          </section>

          <section id="su-journey" className="sy-feature">
            <h2>{JOURNEY.title}</h2>
            <p>{JOURNEY.text}</p>
            <ol className="su-journey">
              {JOURNEY.steps.map(s => (
                <li key={s.time}>
                  <Shot img={s.img} alt={`${s.time}: ${s.label}`} />
                  <small>{s.time}</small>
                  <b>{s.label}</b>
                </li>
              ))}
            </ol>
            <h3>{RULES.title}</h3>
            <ol className="su-rules su-rules--three">
              {RULES.items.map(r => (
                <li key={r.name}>
                  <b>{r.name}</b>
                  <p>{r.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="su-next" className="sy-feature">
            <h2>{PROCESS.title}</h2>
            <p>{PROCESS.text}</p>
            <p className="su-fine">{PROCESS.references}</p>
            <h3>{NEXT.title}</h3>
            <ol className="su-rules su-rules--three">
              {NEXT.items.map(r => (
                <li key={r.label}>
                  <b>{r.label}</b>
                  <p>{r.text}</p>
                </li>
              ))}
            </ol>
          </section>
          <BackToTop />
        </article>
      </div>
    </ScreenViewerProvider>
  );
};

export default Sutra;
