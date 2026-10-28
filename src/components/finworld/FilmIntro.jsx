import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import finworldFilm from '../../assets/finworld/film/intro.mp4';
import finworldPortrait from '../../assets/finworld/film/intro-portrait.mp4';
import ReplayIntro from '../ReplayIntro';
import SkipIntro from '../SkipIntro';
import useEdgeExtend from '../useEdgeExtend';
import './FilmIntro.css';

// Opening film for a case study (Finworld by default; pass `film`, `portrait` and `background`
// for another): the motion film plays full screen, with its music
// (the tall cut on portrait screens like phones), then lifts away to reveal the page. Browsers only allow sound after a click, which arriving
// from the Selected work tile is; if sound is still blocked the film plays muted with a
// "Sound on" button. Clicking anywhere (or Skip intro) ends it early.
const FilmIntro = ({ film = finworldFilm, portrait = finworldPortrait, background, coverUntil = 0, flatBands = false }) => {
  const videoRef = useRef(null);
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [muted, setMuted] = useState(false);
  // Fill the whole screen (cropping the edges) for the film's first `coverUntil` seconds, e.g. a
  // full-bleed opener; after that the whole frame is shown.
  const [cover, setCover] = useState(coverUntil > 0);
  const bandsRef = useRef(null);
  // flatBands: each band takes the colour of the film's edge beside it, point by point (for films
  // on plain backgrounds), instead of extending the edges with a fade
  useEdgeExtend(videoRef, bandsRef, !done, flatBands ? 'flat' : 'extend');
  const [src] = useState(() => (window.matchMedia('(orientation: portrait)').matches ? portrait : film));

  // Lift away (no transition, so no transitionend, with reduced motion: just close).
  const finish = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? setDone(true) : setLeaving(true);

  useEffect(() => {
    if (done) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const video = videoRef.current;
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      video.play().catch(finish);
    });
    return () => {
      document.body.style.overflow = previous;
    };
  }, [done]);

  // Once it starts lifting away: fade the music out and remove the overlay after the slide.
  useEffect(() => {
    if (!leaving) return undefined;
    const video = videoRef.current;
    const fade = setInterval(() => {
      video.volume = Math.max(0, video.volume - 0.1);
    }, 50);
    const end = setTimeout(() => setDone(true), 650);
    return () => {
      clearInterval(fade);
      clearTimeout(end);
    };
  }, [leaving]);

  // Closed: offer to play it again from the start.
  if (done)
    return (
      <ReplayIntro
        onPlay={() => {
          setLeaving(false);
          setCover(coverUntil > 0);
          setDone(false);
        }}
      />
    );

  return createPortal(
    <div
      className={`fwfilm${leaving ? ' is-leaving' : ''}`}
      style={{ background: background || '#ffffff' }}
      onClick={finish}
    >
      <canvas ref={bandsRef} className="film-bands" aria-hidden="true" />
      <video
        ref={videoRef}
        src={src}
        className={cover ? 'is-cover' : undefined}
        onTimeUpdate={e => cover && e.currentTarget.currentTime >= coverUntil && setCover(false)}
        playsInline
        preload="auto"
        onEnded={finish}
      />
      {muted && (
        <button
          type="button"
          className="fwfilm-sound"
          onClick={e => {
            e.stopPropagation();
            videoRef.current.muted = false;
            setMuted(false);
          }}
        >
          Sound on
        </button>
      )}
      <SkipIntro onSkip={finish} tone="light" />
    </div>,
    document.body
  );
};

export default FilmIntro;
