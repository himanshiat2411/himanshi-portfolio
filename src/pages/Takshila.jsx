import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import beforeCommunity from '../assets/takshila/before-community.webp';
import beforeEdit from '../assets/takshila/before-edit.webp';
import beforeOrders from '../assets/takshila/before-orders.webp';
import beforeProfile from '../assets/takshila/before-profile.webp';
import beforeTracking from '../assets/takshila/before-tracking.webp';
import heroChain from '../assets/takshila/hero-chain.webp';
import interviewAmanda from '../assets/takshila/interview-amanda.webp';
import interviewGazi from '../assets/takshila/interview-gazi.webp';
import interviewJessica from '../assets/takshila/interview-jessica.webp';
import logoMask from '../assets/takshila/logo-mask.png';
import screenCommunity from '../assets/takshila/screen-community.webp';
import screenEditProduct from '../assets/takshila/screen-edit-product.webp';
import screenMaterial from '../assets/takshila/screen-material.webp';
import screenMyActivity from '../assets/takshila/screen-my-activity.webp';
import screenOrderTracking from '../assets/takshila/screen-order-tracking.webp';
import screenProductPage from '../assets/takshila/screen-product-page.webp';
import screenProfileFeed from '../assets/takshila/screen-profile-feed.webp';
import teamFunDay from '../assets/takshila/team-fun-day.webp';
import userArtisan from '../assets/takshila/user-artisan.webp';
import userCustomer from '../assets/takshila/user-customer.webp';
import userDesigner from '../assets/takshila/user-designer.webp';
import CompetitorMap from '../components/CompetitorMap';
import StakeholderMap from '../components/StakeholderMap';
import { ScreenViewerProvider, SectionLabel, useOpenScreen, useReveal } from '../components/takshila/basics';
import { CompareStack, DecisionBlock, InsightCard, PhaseCards } from '../components/takshila/cards';
import { NodeStrip, ProductPageTour, RoundsStrip, VisualAskFirst, VisualCheckpoint, VisualOptions } from '../components/takshila/visuals';
import { APPROACH, BUILD, CONTEXT, DECISIONS, FUN, HERO, IMPACT, PHASE_1, PHASE_2, PHASE_3, REFLECTION, RESEARCH, WORK } from '../content/takshila';
import '../components/takshila/takshila-parts.css';
import './Takshila.css';


// Context: an illustration for each of the three kinds of users.
const USER_IMAGES = {
  Customers: { src: userCustomer, alt: 'A customer prompting the AI for a gold leaf pendant' },
  Designers: { src: userDesigner, alt: 'A designer sketching the leaf pendant' },
  Artisans: { src: userArtisan, alt: 'An artisan making the pendant by hand at the bench' }
};

// Phase 1: the redesigned screens next to their old versions (frames from recordings of the old
// takshila.cloud site), stacked one after another.
const COMPARED = [
  { name: 'My Orders', before: beforeOrders, after: screenMyActivity },
  { name: 'Order tracking', before: beforeTracking, after: screenOrderTracking, ratio: '2000 / 1730' },
  { name: 'Edit product', before: beforeEdit, after: screenEditProduct },
  { name: 'Community', before: beforeCommunity, after: screenCommunity },
  { name: 'Profile', before: beforeProfile, after: screenProfileFeed }
].map(c => ({
  name: c.name,
  ratio: c.ratio,
  caption: `${c.name}: old website vs redesign · drag to compare`,
  before: { src: c.before, alt: `The old ${c.name} screen on takshila.cloud` },
  after: { src: c.after, alt: `The redesigned ${c.name} screen` }
}));

const INTERVIEWS = [
  { src: interviewJessica, label: 'Interview · Jessica', alt: 'Google Meet interview with Jessica, led by Himanshi Meena' },
  { src: interviewAmanda, label: 'Interview · Amanda', alt: 'Google Meet interview with Amanda, led by Himanshi Meena' },
  { src: interviewGazi, label: 'Interview · Ghazanfar', alt: 'Google Meet interview with Ghazanfar, led by Himanshi Meena' }
];

const Interviews = () => {
  const open = useOpenScreen();
  return (
    <ul className="tk-calls">
      {INTERVIEWS.map(call => (
        <li key={call.src}>
          <a
            href={call.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-haspopup="dialog"
            onClick={e => {
              e.preventDefault();
              open(call);
            }}
          >
            <img src={call.src} alt={call.alt} width="1167" height="562" />
          </a>
          <span className="tk-call-label">{call.label}</span>
        </li>
      ))}
    </ul>
  );
};

const decisionVisual = d => {
  if (d.id === 'decision-a') return <VisualAskFirst users={PHASE_3.promptUsers} focusLabel={PHASE_3.focusLabel} />;
  if (d.id === 'decision-b') return <VisualOptions />;
  return <VisualCheckpoint />;
};

// Takshila case study page (/work/takshila), with the site nav above and footer below.
const Takshila = () => {
  const pageRef = useRef(null);
  useReveal(pageRef);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Takshila — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <ScreenViewerProvider>
      <div className="tk">
        <article className="tk-page" ref={pageRef}>
          {/* Hero */}
          <header className="tk-hero tk-band" data-band="blush">
            <Link className="tk-back" to="/#work">
              ← Back to work
            </Link>
            <div className="tk-logo" role="img" aria-label="Takshila" style={{ '--tk-logo': `url(${logoMask})` }} />
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
            {/* Hero banner: the chain photo under a dark veil, the logo, and screens rising from below. */}
            <div className="tk-hero-banner" style={{ '--tk-hero-photo': `url(${heroChain})` }}>
              <div className="tk-hero-logo" role="img" aria-label="Takshila" style={{ '--tk-logo': `url(${logoMask})` }} />
              <div className="tk-hero-screens">
                <img src={screenCommunity} alt="Takshila community screen" data-pos="side" />
                <img src={screenProfileFeed} alt="Takshila profile and feed screen" data-pos="centre" />
                <img src={screenMaterial} alt="Takshila material selection screen" data-pos="side" />
              </div>
            </div>
          </header>

          {/* Context: what Takshila is, its users, and who else it depends on */}
          <section className="tk-section" id="tk-context">
            <SectionLabel>{CONTEXT.label}</SectionLabel>
            <h2>{CONTEXT.heading}</h2>
            <p>{CONTEXT.what}</p>
            <ul className="tk-users">
              {CONTEXT.users.map((u, i) => (
                <li key={u.title} data-reveal style={{ '--i': i }}>
                  <img className="tk-user-img" src={USER_IMAGES[u.title].src} alt={USER_IMAGES[u.title].alt} loading="lazy" />
                  <h3>{u.title}</h3>
                  <p>{u.text}</p>
                </li>
              ))}
            </ul>
            <p className="tk-emphasis">{CONTEXT.coreProblem}</p>
            <div className="tk-subsection">
              <p className="tk-leadin">{CONTEXT.stakeholderLead}</p>
              <h3 className="tk-subhead">Stakeholder map</h3>
              <StakeholderMap />
            </div>
          </section>

          {/* Research: JTBD and the interviews */}
          <section className="tk-section">
            <SectionLabel>{RESEARCH.label}</SectionLabel>
            <h2>{RESEARCH.heading}</h2>
            <p>{RESEARCH.text}</p>
            <p className="tk-interviewed">{RESEARCH.interviewed}</p>
            <Interviews />
            <p className="tk-calls-note">{RESEARCH.callsNote}</p>
          </section>

          <section className="tk-section tk-band" data-band="blush">
            <h2>{RESEARCH.learnedHeading}</h2>
            <ol className="tk-insights">
              {RESEARCH.insights.map((ins, i) => (
                <InsightCard key={ins.id} index={i + 1} {...ins} />
              ))}
            </ol>
          </section>

          <section className="tk-section">
            <h2>Competitor analysis</h2>
            <CompetitorMap />
          </section>

          {/* What I worked on */}
          <section className="tk-section tk-problems">
            <h2>{WORK.heading}</h2>
            <p className="tk-problems-sub">{WORK.sub}</p>
            <PhaseCards phases={WORK.phases} />
          </section>

          {/* Design principles */}
          <section className="tk-section">
            <h2>{APPROACH.heading}</h2>
            <ol className="tk-principles">
              {APPROACH.principles.map(p => (
                <li key={p.id} id={p.id}>
                  <strong>{p.name}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ol>
            <p className="tk-principles-sum">
              {APPROACH.closing} <strong>{APPROACH.closingEmphasis}</strong>
            </p>
          </section>

          {/* Phase 1: Redesign */}
          <section className="tk-section" id="phase-1">
            <SectionLabel>{PHASE_1.label}</SectionLabel>
            <h2>{PHASE_1.heading}</h2>
            <p>{PHASE_1.intro}</p>
            <CompareStack items={COMPARED} />
            <RoundsStrip rounds={PHASE_1.rounds} caption={PHASE_1.roundsCaption} />
          </section>

          {/* Phase 2: Q4 sales */}
          <section className="tk-section" id="phase-2">
            <SectionLabel>{PHASE_2.label}</SectionLabel>
            <h2>{PHASE_2.heading}</h2>
            <p>{PHASE_2.intro}</p>
            <NodeStrip items={PHASE_2.audit} />
            <p className="tk-caption tk-strip-note">{PHASE_2.auditNote}</p>
            <div className="tk-decision" data-reveal>
              <p className="tk-decision-label">Key decision</p>
              <h3>{PHASE_2.keyDecision.title}</h3>
              <p>{PHASE_2.keyDecision.text}</p>
            </div>
            <div className="tk-subsection">
              <h3 className="tk-subhead">{PHASE_2.productPage.title}</h3>
              <p>{PHASE_2.productPage.text}</p>
              <ProductPageTour src={screenProductPage} alt={PHASE_2.productPage.alt} zones={PHASE_2.productPage.zones} />
            </div>
            <div className="tk-lite" data-reveal>
              <div>
                <p className="tk-points-label">Problem</p>
                <p>{PHASE_2.checkout.problem}</p>
              </div>
              <div>
                <p className="tk-proposed-tag">What I proposed</p>
                <p>{PHASE_2.checkout.proposed}</p>
              </div>
            </div>
          </section>

          {/* Phase 3: Project North Star */}
          <section className="tk-section" id="phase-3">
            <SectionLabel>{PHASE_3.label}</SectionLabel>
            <h2>{PHASE_3.heading}</h2>
            <p>{PHASE_3.intro}</p>
            <p className="tk-interviewed">{PHASE_3.sub}</p>
            <div className="tk-subsection">
              <h3 className="tk-subhead">{PHASE_3.decisionsHeading}</h3>
              {DECISIONS.map((d, i) => (
                <DecisionBlock key={d.id} {...d} flip={i % 2 === 1} visual={decisionVisual(d)} />
              ))}
            </div>
          </section>

          {/* Build */}
          <section className="tk-section">
            <SectionLabel>{BUILD.label}</SectionLabel>
            <h2>{BUILD.heading}</h2>
            <div className="tk-build" data-reveal>
              <div className="tk-build-card">
                <p className="tk-points-label">Problem</p>
                <p>{BUILD.problem}</p>
              </div>
              <span className="tk-build-arrow" aria-hidden="true">
                →
              </span>
              <div className="tk-build-card" data-changed="">
                <p className="tk-points-label">What I changed</p>
                <p>{BUILD.changed}</p>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section className="tk-section">
            <SectionLabel>{IMPACT.label}</SectionLabel>
            <h2>{IMPACT.heading}</h2>
            <ul className="tk-impact">
              {IMPACT.numbers.map((item, i) => (
                <li key={item.text} data-reveal style={{ '--i': i }}>
                  <span className="tk-impact-num">{item.value}</span>
                  <span className="tk-impact-text">{item.text}</span>
                </li>
              ))}
            </ul>
            <h3 className="tk-subhead">{IMPACT.pushedHeading}</h3>
            <ul className="tk-checks">
              {IMPACT.pushed.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="tk-honesty">{IMPACT.honesty}</p>
          </section>

          {/* Reflection */}
          <section className="tk-section tk-band" data-band="blush" id="tk-reflection">
            <SectionLabel>{REFLECTION.label}</SectionLabel>
            <h2>{REFLECTION.heading}</h2>
            <div className="tk-reflect">
              <div data-reveal>
                <h3>What went well</h3>
                <ul>
                  {REFLECTION.well.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div data-reveal style={{ '--i': 1 }}>
                <h3>What I’d do differently</h3>
                <ul>
                  {REFLECTION.differently.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="tk-closing" data-feedback-nudge="">
              {REFLECTION.closing}
            </p>
          </section>

          {/* My journey at Takshila */}
          <section className="tk-section tk-funday">
            <h2>{FUN.heading}</h2>
            <p>{FUN.text}</p>
            <figure className="tk-funday-photo">
              <img src={teamFunDay} alt={FUN.alt} width="1913" height="734" loading="lazy" />
            </figure>
          </section>
        </article>
      </div>
    </ScreenViewerProvider>
  );
};

export default Takshila;
