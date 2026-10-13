import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import './Intro.css';

const TOTAL = 5150;
const DOTS = ['Customer', 'Buyer', 'Designer'];

// Opening animation for the Takshila case study: a drop falls and splits into three
// orbiting dots (customer, buyer, designer), they merge and flood the screen, then the name.
const TakshilaIntro = () => {
  const [done, setDone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (done) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = setTimeout(() => setDone(true), TOTAL);
    return () => {
      clearTimeout(id);
      document.body.style.overflow = previous;
    };
  }, [done]);

  if (done) return null;

  return createPortal(
    <div className="tki" aria-hidden="true" onClick={() => setDone(true)}>
      <span className="tki-drop" />
      <div className="tki-orbit">
        {DOTS.map((label, i) => (
          <span key={label} className="tki-arm" style={{ '--i': i }}>
            <span className="tki-dot" />
          </span>
        ))}
      </div>
      <p className="tki-roles">
        {DOTS.map(label => (
          <span key={label}>{label}</span>
        ))}
      </p>
      <div className="tki-screen">
        <div className="tki-lockup">
          <span className="tki-name">
            Takshila
            <span className="tki-frame">
              <span className="tki-corner tki-tl" />
              <span className="tki-corner tki-tr" />
              <span className="tki-corner tki-bl" />
              <span className="tki-corner tki-br" />
            </span>
          </span>
          <span className="tki-line">
            <span>Customer. Buyer. Designer.</span>
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TakshilaIntro;
