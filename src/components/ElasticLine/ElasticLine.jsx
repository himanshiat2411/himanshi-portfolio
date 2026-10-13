import { useEffect, useRef } from 'react';

import './ElasticLine.css';

// A horizontal line you can pluck. Near the pointer its middle bends toward it; pull further
// than `releaseThreshold` px and it lets go, springing back with a damped wobble. It draws in
// from the centre the first time it scrolls into view. Everything runs on one animation frame
// loop writing straight to the SVG, so React doesn't re-render while it moves.
const STIFFNESS = 300;
const DAMPING = 12;

const ElasticLine = ({ releaseThreshold = 50, strokeWidth = 1, grabDistance = 24, className = '' }) => {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = wrap.clientWidth;
    const mid = 30; // the line sits in the middle of a 60px tall box
    const state = { x: width / 2, y: 0, vy: 0, grabbed: false, drawn: reduced ? 1 : 0, visible: false };
    const pointer = { x: 0, y: 0, inside: false };

    const draw = () => {
      const half = (width / 2) * state.drawn;
      const x0 = width / 2 - half;
      const x1 = width / 2 + half;
      const cx = Math.min(x1, Math.max(x0, state.x));
      // A quadratic curve through the bend point: control point at twice the offset.
      path.setAttribute('d', `M${x0},${mid} Q${cx},${mid + state.y * 2} ${x1},${mid}`);
    };

    path.parentNode.setAttribute('viewBox', `0 0 ${width} 60`);
    draw();
    let raf;
    let last = performance.now();
    const tick = now => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      if (state.visible && state.drawn < 1) state.drawn = Math.min(1, state.drawn + dt / 0.9);

      if (pointer.inside && !reduced) {
        const off = pointer.y - mid;
        if (!state.grabbed && Math.abs(off) < grabDistance) state.grabbed = true;
        if (state.grabbed && Math.abs(off) > releaseThreshold) state.grabbed = false;
      } else {
        state.grabbed = false;
      }

      if (state.grabbed) {
        state.x = pointer.x;
        state.y = pointer.y - mid;
        state.vy = 0;
      } else {
        // Damped spring back to straight.
        const accel = -STIFFNESS * state.y - DAMPING * state.vy;
        state.vy += accel * dt;
        state.y += state.vy * dt;
        if (Math.abs(state.y) < 0.05 && Math.abs(state.vy) < 0.05) {
          state.y = 0;
          state.vy = 0;
        }
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = e => {
      const r = wrap.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = pointer.x >= 0 && pointer.x <= r.width && pointer.y >= -releaseThreshold && pointer.y <= r.height + releaseThreshold;
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    const onResize = () => {
      width = wrap.clientWidth;
      path.parentNode.setAttribute('viewBox', `0 0 ${width} 60`);
      draw();
    };

    const seen = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) state.visible = true;
    });
    seen.observe(wrap);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      seen.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [releaseThreshold, grabDistance]);

  return (
    <div ref={wrapRef} className={`elastic-line ${className}`} aria-hidden="true">
      <svg preserveAspectRatio="none">
        <path ref={pathRef} fill="none" stroke="currentColor" strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
};

export default ElasticLine;
