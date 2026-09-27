import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import LoopVideo from './LoopVideo';
import './CaseStudy.css';

// A case study page built from full-width sections exported from Figma.
// Each section is { src, h, alt } for an image, or { video, h, alt, poster } for a looping
// video. `h` is the section's height at the design `width`; a video with no `h` keeps its
// own shape (`ratio`), otherwise it fills the section like Figma's video fill.
const CaseStudy = ({ title, width, sections, barColor, linkColor }) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — Himanshi`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <article className="case" style={{ '--case-width': `${width}px` }}>
      <div className="case-bar" style={{ background: barColor }}>
        <div className="case-bar-inner">
          <Link className="case-back" to="/#work" style={{ color: linkColor }}>
            ← Back to work
          </Link>
        </div>
      </div>
      <div className="case-body">
        {sections.map((section, i) =>
          section.video ? (
            <LoopVideo
              key={i}
              className="case-media case-video"
              style={{ aspectRatio: section.h ? `${width} / ${section.h}` : section.ratio }}
              src={section.video}
              poster={section.poster}
              label={section.alt}
            />
          ) : (
            <img
              key={i}
              className="case-media"
              src={section.src}
              width={width}
              height={section.h}
              alt={section.alt}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
            />
          )
        )}
      </div>
    </article>
  );
};

export default CaseStudy;
