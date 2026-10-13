import { useEffect, useRef, useState } from 'react';

import './LineSidebar.css';

// A vertical list of labels, each with a tick on its left. Items near the pointer slide right
// (up to `maxShift` px within `proximityRadius` px, eased by `falloff`), and the active item's
// tick grows to full `markerLength` in `accentColor`. Pass `active` to drive it from outside
// (e.g. scroll position); otherwise it tracks clicks starting from `defaultActive`.
// `smoothing` is roughly how many milliseconds the shift takes to catch up with the pointer.
const FALLOFFS = {
  linear: x => 1 - x,
  smooth: x => 1 - x * x * (3 - 2 * x),
  sharp: x => (1 - x) ** 3
};

const LineSidebar = ({
  items = [],
  accentColor = '#A855F7',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = false,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = 0,
  active,
  onItemClick,
  className = '',
  style
}) => {
  const [ownActive, setOwnActive] = useState(defaultActive);
  const current = active ?? ownActive;
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const pointer = useRef(null);
  const shifts = useRef([]);

  // Ease each item's shift toward its target every frame; write straight to the DOM.
  useEffect(() => {
    let raf;
    let last = performance.now();
    const ease = FALLOFFS[falloff] || FALLOFFS.smooth;
    const tick = now => {
      const dt = now - last;
      last = now;
      const k = smoothing > 0 ? 1 - Math.exp(-dt / (smoothing / 3)) : 1;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        let target = 0;
        if (pointer.current !== null) {
          const r = el.getBoundingClientRect();
          const d = Math.abs(pointer.current - (r.top + r.height / 2));
          if (d < proximityRadius) target = maxShift * ease(d / proximityRadius);
        }
        const prev = shifts.current[i] || 0;
        const next = prev + (target - prev) * k;
        shifts.current[i] = Math.abs(next) < 0.01 ? 0 : next;
        el.style.setProperty('--ls-shift', `${shifts.current[i]}px`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [falloff, maxShift, proximityRadius, smoothing]);

  const select = (i, label) => {
    setOwnActive(i);
    onItemClick?.(i, label);
  };

  return (
    <nav
      ref={listRef}
      className={`line-sidebar ${className}`}
      style={{
        '--ls-accent': accentColor,
        '--ls-text': textColor,
        '--ls-marker': markerColor,
        '--ls-marker-length': `${markerLength}px`,
        '--ls-marker-gap': `${markerGap}px`,
        '--ls-tick-scale': scaleTick ? tickScale : 1,
        '--ls-gap': `${itemGap}px`,
        '--ls-font': `${fontSize}rem`,
        ...style
      }}
      onPointerMove={e => {
        pointer.current = e.clientY;
      }}
      onPointerLeave={() => {
        pointer.current = null;
      }}
    >
      <ol>
        {items.map((label, i) => (
          <li key={label} ref={el => (itemRefs.current[i] = el)} data-active={i === current ? '' : undefined}>
            <button type="button" onClick={() => select(i, label)} aria-current={i === current ? 'true' : undefined}>
              {showMarker && <span className="line-sidebar-marker" aria-hidden="true" />}
              {showIndex && <span className="line-sidebar-index">{String(i + 1).padStart(2, '0')}</span>}
              <span className="line-sidebar-label">{label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default LineSidebar;
