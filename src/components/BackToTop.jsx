import './BackToTop.css';

// "Back to top" link at the end of a case study: scrolls smoothly to the top of the page.
const BackToTop = () => (
  <div className="back-to-top">
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      }
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
      Back to top
    </button>
  </div>
);

export default BackToTop;
