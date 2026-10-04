import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import LoopVideo from './LoopVideo';
import './CaseStudy.css';

// A case study page built from full-width sections exported from Figma.
// Each section is { src, h, alt } for an image, or { video, h, alt, poster } for a looping
// video. `h` is the section's height at the design `width`; a video with no `h` keeps its
// own shape (`ratio`), otherwise it fills the section like Figma's video fill.
// An image section can also carry `player`: a click-to-play video (with sound and controls)
// laid over part of it. `player.box` is { x, y, w, h } in design pixels within the section.
// With `extendEdges`, on screens wider than the design each section's left and right edges are
// stretched out to the sides of the window, so there's no dark frame around the design.
const CaseStudy = ({ title, width, sections, barColor, linkColor, extendEdges }) => {
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
      <div className={`case-body${extendEdges ? ' case-body--bands' : ''}`}>
        {sections.map((section, i) => {
          const media = section.video ? (
            <LoopVideo
              key={i}
              className="case-media case-video"
              style={{ aspectRatio: section.h ? `${width} / ${section.h}` : section.ratio }}
              src={section.video}
              poster={section.poster}
              label={section.alt}
            />
          ) : section.player ? (
            <div key={i} className="case-player-wrap">
              <img className="case-media" src={section.src} width={width} height={section.h} alt="" loading="lazy" decoding="async" />
              <video
                className="case-player"
                style={{
                  left: `${(section.player.box.x / width) * 100}%`,
                  top: `${(section.player.box.y / section.h) * 100}%`,
                  width: `${(section.player.box.w / width) * 100}%`,
                  height: `${(section.player.box.h / section.h) * 100}%`,
                  borderRadius: `${(section.player.radius / section.player.box.w) * 100}% / ${(section.player.radius / section.player.box.h) * 100}%`
                }}
                src={section.player.video}
                poster={section.player.poster}
                controls
                playsInline
                preload="none"
                aria-label={section.alt}
              />
            </div>
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
          );
          if (!extendEdges) return media;
          const edge = section.src || section.poster;
          return (
            <div key={i} className="case-band" style={edge ? { '--edge': `url(${edge})` } : undefined}>
              {media}
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default CaseStudy;
