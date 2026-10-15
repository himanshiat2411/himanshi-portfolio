import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import SkipIntro from './SkipIntro';
import useEdgeColor from './useEdgeColor';
import './VideoIntro.css';

// Full-screen intro that plays a video once before a case study, then slides up out of view.
// Click to skip; visitors who prefer reduced motion skip it.
const VideoIntro = ({ src, background, label }) => {
  const [state, setState] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'playing'
  );

  const videoRef = useRef(null);
  const backdrop = useEdgeColor(videoRef, background, state !== 'done');

  useEffect(() => {
    if (state === 'done') return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [state]);

  useEffect(() => {
    if (state !== 'leaving') return undefined;
    const id = setTimeout(() => setState('done'), 600);
    return () => clearTimeout(id);
  }, [state]);

  // Safety net in case the video never ends (blocked autoplay, failed load).
  useEffect(() => {
    if (state !== 'playing') return undefined;
    const id = setTimeout(() => setState('leaving'), 12000);
    return () => clearTimeout(id);
  }, [state]);

  if (state === 'done') return null;

  const leave = () => setState(s => (s === 'playing' ? 'leaving' : s));

  return createPortal(
    <div
      className={`video-intro${state === 'leaving' ? ' is-leaving' : ''}`}
      style={{ background: backdrop }}
      onClick={leave}
    >
      <video ref={videoRef} src={src} autoPlay muted playsInline onEnded={leave} onError={leave} aria-label={label} />
      <SkipIntro onSkip={leave} />
    </div>,
    document.body
  );
};

export default VideoIntro;
