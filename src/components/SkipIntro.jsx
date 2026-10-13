import './SkipIntro.css';

// "Skip intro" pill at the bottom of the case study intros. `tone` is the backdrop it sits on:
// 'dark' gives a light pill, 'light' a dark one.
const SkipIntro = ({ onSkip, tone = 'dark' }) => (
  <button
    type="button"
    className="skip-intro"
    data-tone={tone}
    onClick={e => {
      e.stopPropagation();
      onSkip();
    }}
  >
    Skip intro
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path d="M3 3l6 5-6 5zM10 3h2v10h-2z" fill="currentColor" />
    </svg>
  </button>
);

export default SkipIntro;
