import { createPortal } from 'react-dom';

import './ReplayIntro.css';

// A small tab on the right edge of a case study that plays its intro film again. Shown once the
// intro has closed; the intro components render it in place of themselves.
const ReplayIntro = ({ onPlay }) =>
  createPortal(
    <button type="button" className="replay-intro" onClick={onPlay} aria-label="Watch the intro video">
      <span aria-hidden="true">▶</span> Intro
    </button>,
    document.body
  );

export default ReplayIntro;
