import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import CaseNav from './LineSidebar/CaseNav';
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
// A section with no image to take its edges from (a video without a poster), or whose edges
// carry artwork that would smear when stretched, can set `edgeColor` (any CSS background).
// `displayWidth` shows the design narrower than its design `width` on large screens (phones are
// unaffected, since the design already fills their width).
// A section can instead be `{ node, edgeColor }`: a block of page content (text) shown at the
// design's width, with `edgeColor` behind it.
// `nav` adds the section sidebar: [{ label, at }] where `at` is the index of the section it
// starts at, styled by `navTheme` ({ accent, text, marker, panel }).
const CaseStudy = ({ title, width, displayWidth, sections, barColor, linkColor, extendEdges, pageColor, nav, navTheme }) => {
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — Himanshi`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <article
      className="case"
      style={{
        background: pageColor,
        // A plain page colour leaves the last section's edge bare, so give it room before the footer.
        paddingBottom: pageColor ? 'clamp(40px, 6vw, 96px)' : undefined,
        '--case-width': `${displayWidth || width}px`,
        '--edge-size': `${width * 100}px`,
        // Keep "Back to work" in line with the design's content when it's shown narrower.
        '--case-pad': displayWidth ? `${Math.round((120 * displayWidth) / width)}px` : undefined
      }}
    >
      <div className="case-bar" style={{ background: barColor }}>
        <div className="case-bar-inner">
          <Link className="case-back" to="/#work" style={{ color: linkColor }}>
            ← Back to work
          </Link>
        </div>
      </div>
      <div className={`case-body${extendEdges ? ' case-body--bands' : ''}`}>
        {sections.map((section, i) => {
          const media = section.node ? (
            <div key={i} className="case-node" data-case-index={i}>
              {section.node}
            </div>
          ) : section.video ? (
            <LoopVideo
              key={i}
              data-case-index={i}
              className="case-media case-video"
              style={{
                aspectRatio: section.h ? `${width} / ${section.h}` : section.ratio,
                background: section.edgeColor
              }}
              src={section.video}
              poster={section.poster}
              label={section.alt}
            />
          ) : section.player ? (
            <div key={i} className="case-player-wrap" data-case-index={i}>
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
              data-case-index={i}
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
          const edge = section.edgeColor ? null : section.src || section.poster;
          return (
            <div
              key={i}
              className="case-band"
              style={edge ? { '--edge': `url(${edge})` } : { background: section.edgeColor }}
            >
              {media}
            </div>
          );
        })}
      </div>
      {nav && <CaseNav sections={nav.map(n => ({ label: n.label, selector: `[data-case-index="${n.at}"]` }))} theme={navTheme} />}
    </article>
  );
};

export default CaseStudy;
