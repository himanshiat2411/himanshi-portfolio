import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import film from '../../assets/finworld/film/intro.mp4';
import SkipIntro from '../SkipIntro';
import './FilmIntro.css';

// Opening film for the Finworld case study: the motion film plays full screen, with its music,
// then lifts away to reveal the page. Browsers only allow sound after a click, which arriving
// from the Selected work tile is; if sound is still blocked the film plays muted with a
// "Sound on" button. Clicking anywhere (or Skip intro) ends it early.
const FilmIntro = () => {
  const videoRef = useRef(null);
  const [done, setDone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [muted, setMuted] = useState(false);

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

  if (done) return null;

  return createPortal(
    <div
      className={`fwfilm${leaving ? ' is-leaving' : ''}`}
      onClick={finish}
    >
      <video ref={videoRef} src={film} playsInline preload="auto" onEnded={finish} />
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
