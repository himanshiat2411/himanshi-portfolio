import { useEffect, useState } from 'react';

import LatticeLoader from './LatticeLoader/LatticeLoader';
import './Preloader.css';

const DURATION = 2000;
const FADE = 500;

const Preloader = ({ onDone }) => {
  const [percent, setPercent] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = now => {
      const next = Math.min(100, Math.floor(((now - start) / DURATION) * 100));
      setPercent(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else setLeaving(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!leaving) return undefined;
    const id = setTimeout(onDone, FADE);
    return () => clearTimeout(id);
  }, [leaving, onDone]);

  return (
    <div className="preloader" data-leaving={leaving ? '' : undefined} style={{ '--fade': `${FADE}ms` }}>
      <div className="preloader-row">
        <LatticeLoader
          status="working"
          label="Loading"
          pattern="orbit"
          grid={3}
          shape="round"
          color="#ffffff"
          idleOpacity={0.25}
          cellSize={8}
          gap={3}
          fontSize={18}
          showTimer={false}
        />
        <span className="preloader-percent" aria-hidden="true">
          {percent}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
