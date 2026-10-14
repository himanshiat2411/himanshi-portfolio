import { useEffect, useMemo, useRef } from 'react';
import './PassageGallery.css';

// A tunnel of photos: floor, ceiling and walls are ruled into square cells, some holding
// a photo. The camera glides forward on its own, forever. Scrolling the wheel over the
// tunnel moves through it instead of scrolling the page (up runs it backward). The layout repeats every PERIOD cells, so wrapping
// the camera back by one period is seamless.
const CELL = 300;     // cell size in px
const COLS = 4;       // floor/ceiling cells across
const ROWS = 2;       // wall cells high
const PERIOD = 14;    // cells before the pattern repeats
const AHEAD = 14;     // extra cells built so the far end is never empty
const DEPTH = PERIOD + AHEAD;
const SPEED = 90;     // idle glide, px per second
const W = COLS * CELL;
const H = ROWS * CELL;

// Deterministic scatter so the layout is the same every render.
const rand = seed => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const buildCells = photos => {
  // Decide each cell of one period once, then repeat it down the tunnel.
  const pattern = new Map();
  let p = 0;
  const pick = slot => {
    if (!pattern.has(slot)) {
      const seed = pattern.size + 1;
      pattern.set(slot, photos.length && rand(seed) < 0.32 ? photos[p++ % photos.length] : null);
    }
    return pattern.get(slot);
  };

  const cells = [];
  for (let d = 0; d < DEPTH; d++) {
    const z = -(d + 0.5) * CELL;
    const k = d % PERIOD;
    for (let c = 0; c < COLS; c++) {
      const x = -W / 2 + (c + 0.5) * CELL;
      cells.push({ key: `f${d}-${c}`, photo: pick(`f${k}-${c}`), transform: `translate3d(${x}px, ${H / 2}px, ${z}px) rotateX(90deg)` });
      cells.push({ key: `c${d}-${c}`, photo: pick(`c${k}-${c}`), transform: `translate3d(${x}px, ${-H / 2}px, ${z}px) rotateX(-90deg)` });
    }
    for (let r = 0; r < ROWS; r++) {
      const y = -H / 2 + (r + 0.5) * CELL;
      cells.push({ key: `l${d}-${r}`, photo: pick(`l${k}-${r}`), transform: `translate3d(${-W / 2}px, ${y}px, ${z}px) rotateY(90deg)` });
      cells.push({ key: `r${d}-${r}`, photo: pick(`r${k}-${r}`), transform: `translate3d(${W / 2}px, ${y}px, ${z}px) rotateY(-90deg)` });
    }
  }
  return cells;
};

const PassageGallery = ({ items = [] }) => {
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const cells = useMemo(() => buildCells(items), [items]);

  useEffect(() => {
    const world = worldRef.current;
    const stage = stageRef.current;
    const loop = PERIOD * CELL;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let offset = 0;
    let boost = 0;          // extra velocity from the wheel, decays back to 0
    let last = performance.now();
    let visible = true;
    let frame = 0;

    // While the whole tunnel is on screen and the pointer is over it, the wheel drives the
    // tunnel, not the page. If it's only partly on screen, the page scrolls as usual.
    const onWheel = e => {
      const rect = stage.getBoundingClientRect();
      if (rect.top < -2 || rect.bottom > window.innerHeight + 2) return;
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      boost = Math.max(-6000, Math.min(6000, boost + dy * 6));
    };

    const tick = now => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        offset += ((reduced ? 0 : SPEED) + boost) * dt;
        boost *= Math.pow(0.04, dt); // ease the scroll push out over ~1s
        offset = ((offset % loop) + loop) % loop;
        world.style.transform = `translateZ(${offset}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    // Only animate while the tunnel is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(stage);
    stage.addEventListener('wheel', onWheel, { passive: false });
    frame = requestAnimationFrame(tick);
    return () => {
      observer.disconnect();
      stage.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stageRef} className="passage-stage">
      <div ref={worldRef} className="passage-world">
        {cells.map(({ key, transform, photo }) => (
          <div key={key} className="passage-cell" style={{ transform }}>
            {photo && <img src={photo.img} alt={photo.alt} draggable="false" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassageGallery;
