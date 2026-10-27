import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import CaseNav from '../components/LineSidebar/CaseNav';
import { ScreenViewerProvider, SectionLabel, useOpenScreen, useReveal } from '../components/takshila/basics';
import { NodeStrip } from '../components/takshila/visuals';
import { DECISIONS, FLOW, GALLERIES, HERO, PRINCIPLES, PROBLEM, PRODUCT, REFLECTION, STORIES } from '../content/sylus';
import '../components/takshila/takshila-parts.css';
import './Takshila.css';
import './Sylus.css';

// Sylus AI case study page (/work/sylus-ai). It reuses the Takshila case study's layout and parts,
// recoloured in Sylus's plum-to-coral gradient (see Sylus.css).
const SHOTS = import.meta.glob('../assets/sylus/*.webp', { eager: true, import: 'default' });
const shot = key => SHOTS[`../assets/sylus/${key}.webp`];

const NAV = [
  { label: 'Overview', selector: '#sy-overview' },
  { label: 'Product', selector: '#sy-product' },
  { label: 'Problem', selector: '#sy-problem' },
  { label: 'Onboarding', selector: '#sy-flow' },
  { label: 'Decisions', selector: '#sy-decisions' },
  ...STORIES.map((s, i) => ({ label: `Story ${String(i + 1).padStart(2, '0')}`, selector: `#${s.id}` })),
  ...GALLERIES.map(g => ({ label: g.label, selector: `#${g.id}` })),
  { label: 'Reflection', selector: '#sy-reflection' }
];

const NAV_THEME = { accent: '#8a2c7a', text: 'rgba(36, 12, 46, 0.6)', marker: 'rgba(36, 12, 46, 0.22)', panel: '#f8f5fa' };

// A screen that opens full size on click.
const Shot = ({ img, alt, caption }) => {
  const open = useOpenScreen();
  const src = shot(img);
  return (
    <figure className="sy-shot">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-haspopup="dialog"
        onClick={e => {
          e.preventDefault();
          open({ src, alt, label: caption || alt });
        }}
      >
        <img src={src} alt={alt} loading="lazy" />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

// One decision story: Title, Hook, Before, Decision, After, Result, plus the micro decisions inside
// it (strategic down to micro shows depth).
const Story = ({ story, n }) => (
  <article className="sy-story" id={story.id} data-reveal>
    <header className="sy-story-head">
      <span className="sy-story-num">{String(n).padStart(2, '0')}</span>
      <span className="sy-kind" data-kind={story.kind.toLowerCase()}>
        {story.kind}
      </span>
    </header>
    <h3 className="sy-story-title">{story.title}</h3>
    <p className="sy-hook">{story.hook}</p>
    <div className="sy-ba">
      <div>
        <p className="sy-step">Before</p>
        <p>{story.before.text}</p>
        {story.before.img && <Shot img={story.before.img} alt={story.before.alt} />}
      </div>
      <div>
        <p className="sy-step">Decision</p>
        <p>{story.decision}</p>
        <Shot img={story.after.img} alt={story.after.alt} />
      </div>
    </div>
    {story.micro && (
      <ul className="sy-micro" aria-label="Micro decisions inside it">
        {story.micro.map(m => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    )}
    <p className="sy-result">
      <span className="sy-step">Result</span>
      {story.result}
    </p>
  </article>
);

const Sylus = () => {
  const pageRef = useRef(null);
  useReveal(pageRef);

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
      <div className="tk sy">
        <article className="tk-page" ref={pageRef}>
          {/* Hero */}
          <header id="sy-overview" className="tk-hero">
            <Link className="tk-back" to="/#work">
              ← Back to work
            </Link>
            <p className="sy-wordmark">Sylus AI</p>
            <h1 className="tk-title">
              {HERO.headline} <strong>{HERO.headlineEmphasis}</strong>
            </h1>
            <p className="tk-lead">{HERO.intro}</p>
            <dl className="tk-meta">
              {HERO.meta.map(m => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
            <div className="sy-hero-shot">
              <Shot img="dashboard" alt="The Sylus AI dashboard for one brand" />
            </div>
          </header>

          {/* What Sylus does */}
          <section className="tk-section" id="sy-product">
            <SectionLabel>{PRODUCT.label}</SectionLabel>
            <h2>{PRODUCT.heading}</h2>
            <ol className="sy-product">
              {PRODUCT.items.map((p, i) => (
                <li key={p.title} data-reveal style={{ '--i': i }}>
                  <span className="sy-product-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <Shot img={p.img} alt={p.title} />
                </li>
              ))}
            </ol>
          </section>

          {/* Problem */}
          <section className="tk-section" id="sy-problem">
            <SectionLabel>{PROBLEM.label}</SectionLabel>
            <h2>{PROBLEM.heading}</h2>
            <p>{PROBLEM.text}</p>
            <p className="sy-goal">{PROBLEM.goal}</p>
          </section>

          {/* Flow */}
          <section className="tk-section" id="sy-flow">
            <SectionLabel>{FLOW.label}</SectionLabel>
            <h2>{FLOW.heading}</h2>
            <NodeStrip items={FLOW.steps} />
            <p className="tk-caption tk-strip-note">{FLOW.note}</p>
            <div className="sy-grid">
              {FLOW.shots.map(s => (
                <Shot key={s.img} img={s.img} alt={s.alt} caption={s.caption} />
              ))}
            </div>
          </section>

          {/* Every decision, sorted */}
          <section className="tk-section" id="sy-decisions">
            <SectionLabel>{DECISIONS.label}</SectionLabel>
            <h2>{DECISIONS.heading}</h2>
            <p>{DECISIONS.sub}</p>
            <div className="sy-sort">
              {['strategic', 'micro'].map(kind => (
                <div key={kind} className="sy-sort-col" data-kind={kind}>
                  <h3>{kind === 'strategic' ? 'Strategic' : 'Micro'}</h3>
                  <p className="sy-sort-sub">{kind === 'strategic' ? 'Shapes the product' : 'Shapes a screen'}</p>
                  <ul>
                    {DECISIONS.items
                      .filter(d => d.kind === kind)
                      .map(d => (
                        <li key={d.text} data-star={d.star ? '' : undefined}>
                          {d.text}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Decision stories */}
          <section className="tk-section">
            <SectionLabel>Decision stories</SectionLabel>
            <h2>The four that shaped the product</h2>
            <div className="sy-stories">
              {STORIES.map((s, i) => (
                <Story key={s.id} story={s} n={i + 1} />
              ))}
            </div>
          </section>

          {/* The rest of the product, by workspace */}
          {GALLERIES.map(g => (
            <section key={g.id} className="tk-section" id={g.id}>
              <SectionLabel>{g.label}</SectionLabel>
              <h2>{g.heading}</h2>
              <div className="sy-grid">
                {g.items.map(s => (
                  <Shot key={s.img} img={s.img} alt={s.caption} caption={s.caption} />
                ))}
              </div>
            </section>
          ))}

          {/* Principles */}
          <section className="tk-section">
            <h2>{PRINCIPLES.heading}</h2>
            <ol className="tk-principles">
              {PRINCIPLES.items.map(p => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Reflection */}
          <section className="tk-section tk-band" data-band="blush" id="sy-reflection">
            <SectionLabel>{REFLECTION.label}</SectionLabel>
            <h2>{REFLECTION.heading}</h2>
            <ul className="tk-checks">
              {REFLECTION.items.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="tk-honesty">{REFLECTION.honesty}</p>
          </section>
        </article>
      </div>
    </ScreenViewerProvider>
  );
};

export default Sylus;
