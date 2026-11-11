import './LiveApp.css';

// Link to the working Finworld app. `variant` picks where it sits:
// - 'inline': a card at the top of the case study.
// - 'side': a small panel fixed in the empty space on the right of the case study; on phones,
//   where there is no side space, the same card sits inline instead.
export const LIVE_URL = 'https://finworld-phi.vercel.app';

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const Card = ({ className = '' }) => (
  <aside className={`live-card ${className}`} aria-label="Try the working Finworld app">
    <p className="live-kicker">Working prototype · V1</p>
    <p className="live-title">Try the real Finworld</p>
    <p className="live-text">
      I vibe coded the whole idea into a working app. Upload an Excel or CSV file and it builds the dashboard, and Nova, the AI helper, guides you along the way. It is a basic first version, built to test that the ideas work.
    </p>
    <a className="live-cta" href={LIVE_URL} target="_blank" rel="noopener noreferrer">
      Open the live app <Arrow />
    </a>
  </aside>
);

const LiveApp = ({ variant = 'inline' }) =>
  variant === 'side' ? (
    <>
      <a className="live-side" href={LIVE_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the working Finworld app">
        <span className="live-side-dot" aria-hidden="true" />
        <span className="live-side-kicker">Working V1</span>
        <span className="live-side-title">Try the live app</span>
        <span className="live-side-text">Upload a spreadsheet, get the dashboard, ask Nova.</span>
        <span className="live-side-cta">
          Open <Arrow />
        </span>
      </a>
      <Card className="live-card--phone" />
    </>
  ) : (
    <Card />
  );

export default LiveApp;
