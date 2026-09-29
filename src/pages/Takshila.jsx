import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import heroChain from '../assets/takshila/hero-chain.webp';
import logoMask from '../assets/takshila/logo-mask.png';
import screenCommunity from '../assets/takshila/screen-community.webp';
import screenEditProduct from '../assets/takshila/screen-edit-product.webp';
import screenMaterial from '../assets/takshila/screen-material.webp';
import screenMyActivity from '../assets/takshila/screen-my-activity.webp';
import screenProfileFeed from '../assets/takshila/screen-profile-feed.webp';
import screenPrompt from '../assets/takshila/screen-prompt.webp';
import CompetitorMap from '../components/CompetitorMap';
import StakeholderMap from '../components/StakeholderMap';
import './Takshila.css';

// A phase heading: "Phase 1 · Title" shows "Phase 1" as a small gold label above the title,
// like Takshila's own "STEP 3 OF 3 / Choose Materials".
const PhaseHeading = ({ children }) => {
  const [phase, title] = children.split(' · ');
  return (
    <h2 className="tk-phase">
      <span className="tk-eyebrow">{phase}</span>
      <span className="tk-visually-hidden"> · </span>
      {title}
    </h2>
  );
};

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Redesigned screens (Phase 1). Each opens in the screen pop-up.
const SCREENS = [
  { src: screenProfileFeed, alt: 'Profile and feed screen' },
  { src: screenCommunity, alt: 'Community screen' },
  { src: screenMyActivity, alt: 'My activity screen' },
  { src: screenPrompt, alt: 'Design prompt screen' },
  { src: screenMaterial, alt: 'Material selection screen' },
  { src: screenEditProduct, alt: 'Edit product screen' }
];

const FINDINGS = [
  {
    title: 'People still don’t fully trust buying jewellery online.',
    text: 'Jewellery is personal and costly. Without touching or seeing it in person, buyers stay doubtful.',
    quote: 'When I buy jewellery online, I want to feel sure about what I’m getting, so I don’t regret spending my money.'
  },
  {
    title: 'Users don’t trust AI to design alone.',
    text: 'Most people are not good at writing prompts. They want a companion or a professional to guide them while they design.',
    quote: 'When I design my own piece, I want someone to guide me, so I can get what I imagined without struggling with prompts.'
  },
  {
    title: 'Delivery causes anxiety.',
    text: 'Custom pieces are usually made for special occasions. So buyers need a clear timeline and exact updates on their order.',
    quote: 'When I order a piece for a special occasion, I want clear timelines and updates, so I know it will arrive on time.'
  },
  {
    title: 'Easy returns build trust.',
    text: 'Buyers wanted a simple return process. Knowing they can return a piece makes them trust the company more.',
    quote: 'When I buy custom jewellery, I want an easy way to return it, so I feel safe placing the order.'
  },
  {
    title: 'The business wants buyers to feel ownership.',
    text: 'Takshila wants buyers to feel they made the piece. That feeling of “I made this” is what makes them proud of it.',
    quote: 'When a buyer receives their piece, we want them to feel they created it, so they feel proud and come back again.'
  }
];

const PARTICIPANTS = [
  { count: 9, label: 'buyers' },
  { count: 4, label: 'sellers' },
  { count: 2, label: 'artisans' }
];

const VIEWER_EXIT_MS = 180;

// Pop-up for one screen: scroll it top to bottom; click outside it (or press Esc) to close.
const ScreenViewer = ({ shot, onClose }) => {
  const [leaving, setLeaving] = useState(false);
  const panelRef = useRef(null);

  const close = () => setLeaving(true);

  useEffect(() => {
    if (!leaving) return undefined;
    const id = setTimeout(onClose, VIEWER_EXIT_MS);
    return () => clearTimeout(id);
  }, [leaving, onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    const onKey = e => e.key === 'Escape' && setLeaving(true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      previousFocus?.focus?.();
    };
  }, []);

  return (
    <div
      className="tk-viewer"
      data-leaving={leaving ? '' : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={e => e.target === e.currentTarget && close()}
    >
      <div className="tk-viewer-panel" ref={panelRef} tabIndex={-1}>
        <img src={shot.src} alt={shot.alt} />
      </div>
    </div>
  );
};

// Takshila case study page (/work/takshila), with the site nav above and footer below.
const Takshila = () => {
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    const previous = document.title;
    document.title = 'Takshila — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="tk">
      <article className="tk-page">
        <header className="tk-hero tk-band" data-band="blush">
          <Link className="tk-back" to="/#work">
            ← Back to work
          </Link>
          <div className="tk-logo" role="img" aria-label="Takshila" style={{ '--tk-logo': `url(${logoMask})` }} />
          <h1 className="tk-title" id="tk-title">
            Takshila is a handcrafted jewelry marketplace with no playbook to follow,{' '}
            <strong>so we built one around its users.</strong>
          </h1>
          <p className="tk-lead">
            Takshila is a social-commerce marketplace for handcrafted jewelry. As a pioneer in this space, there was no set
            path to follow. I started with research, including JTBD interviews, to understand what users actually need. We
            then redesigned the existing screens, optimised the platform for Q4 festive sales, and began Project North Star,
            the next version of Takshila, for which I defined the PRD, user flows, and information architecture.
          </p>
          <dl className="tk-meta">
            <div>
              <dt>My role</dt>
              <dd>Product Design Intern</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>6 Months</dd>
            </div>
          </dl>
          {/* Hero banner, like the reference: the chain photo under a dark veil, the logo, and screens rising from below. */}
          <div className="tk-hero-banner" style={{ '--tk-hero-photo': `url(${heroChain})` }}>
            <div className="tk-hero-logo" role="img" aria-label="Takshila" style={{ '--tk-logo': `url(${logoMask})` }} />
            <div className="tk-hero-screens">
              <img src={screenCommunity} alt="Takshila community screen" data-pos="side" />
              <img src={screenProfileFeed} alt="Takshila profile and feed screen" data-pos="centre" />
              <img src={screenMaterial} alt="Takshila material selection screen" data-pos="side" />
            </div>
          </div>
        </header>

        <section className="tk-section">
          <h2>What is Takshila</h2>
          <p>
            Takshila is the world&apos;s first peer-to-peer co-fabrication platform. It connects buyers, designers, and
            artisans so they can create jewellery together — with no middlemen. Buyers co-design with AI, and a named artisan
            makes it by hand.
          </p>
        </section>

        <section className="tk-section">
          <h2>Understanding the jobs users hire Takshila for</h2>
          <p>
            Since Takshila was new, we couldn&apos;t copy what others were doing. So we went straight to people. We ran
            detailed Jobs-To-Be-Done (JTBD) interviews with 15 people from around the globe, and I personally led 5 of them
            one-on-one.
          </p>
          <ul className="tk-stats">
            {PARTICIPANTS.map(p => (
              <li key={p.label}>
                <span className="tk-stat-num">{p.count}</span>
                <span className="tk-stat-label">{p.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="tk-section tk-band" data-band="blush">
          <h2>What we learned</h2>
          <ol className="tk-findings">
            {FINDINGS.map((f, i) => (
              <li key={f.title}>
                <span className="tk-index">{i + 1}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <blockquote>“{f.quote}”</blockquote>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="tk-section">
          <h2>Competitor analysis</h2>
          <CompetitorMap />
        </section>

        <section className="tk-section tk-band" data-band="blush">
          <h2>Stakeholder map</h2>
          <StakeholderMap />
        </section>

        <section className="tk-section">
          <PhaseHeading>Phase 1 · Redesigning the old Takshila website</PhaseHeading>
          <p>We started by redesigning the existing screens to make them simpler and easier to use.</p>
          <ul className="tk-screens">
            {SCREENS.map(shot => (
              <li key={shot.src}>
                <a
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-haspopup="dialog"
                  onClick={e => {
                    e.preventDefault();
                    setScreen(shot);
                  }}
                >
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  <span className="tk-screen-btn" aria-hidden="true">
                    <ExpandIcon />
                    View screen
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="tk-section">
          <PhaseHeading>Phase 2 · Getting Takshila ready for Q4 sales</PhaseHeading>
          <p>
            Before the US festive season (Halloween, Thanksgiving, Christmas and New Year), I did a full sales audit of the
            website. I checked the homepage, discovery feed, product page, cart and checkout. The goal was to find what
            stopped people from buying, fix it, and make them want to come back.
          </p>
          <div className="tk-decision">
            <p className="tk-decision-label">Key decision</p>
            <h3>Bringing the Shop forward</h3>
            <p>
              Takshila was positioned only as a community. People could browse and engage, but buying wasn&apos;t the focus.
              Before the festive season, I pushed for the Shop to become a main feature, so the platform could drive sales and
              not just engagement.
            </p>
          </div>
        </section>

        <section className="tk-section">
          <PhaseHeading>Phase 3 · Project North Star</PhaseHeading>
          <p>
            North Star is a complete rebuild of Takshila. For this, I wrote the PRD and defined the user flows and information
            architecture.
          </p>
          <div className="tk-decision">
            <p className="tk-decision-label">Other decisions</p>
            <ul className="tk-bullets">
              <li>
                <strong>Two ways to design.</strong> Buyers get an AI-guided flow, while designers can upload their own work and
                add details by hand. This answers a JTBD finding: people don&apos;t trust AI alone and aren&apos;t good at
                prompting.
              </li>
              <li>
                <strong>“Make it” as the main button.</strong> “Publish” is a second option. This keeps the focus on turning a
                design into a real piece.
              </li>
              <li>
                <strong>“Maker” instead of “Artisan.”</strong> Many people don&apos;t understand the word “artisan,” so we
                suggested “Maker.” This still needs to be tested with users.
              </li>
            </ul>
          </div>
        </section>
      </article>

      {screen && <ScreenViewer shot={screen} onClose={() => setScreen(null)} />}
    </div>
  );
};

export default Takshila;
