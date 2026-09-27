import { useEffect, useRef } from 'react';

// A silent, looping video that behaves like a GIF: it only plays while on screen.
// Visitors who prefer reduced motion get the poster and play controls instead.
const LoopVideo = ({ src, poster, label, className, style }) => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      video.controls = true;
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
};

export default LoopVideo;
