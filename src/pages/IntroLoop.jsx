import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import FinworldIntro from '../components/finworld/Intro';
import './IntroLoop.css';

// A case study's intro animation replayed on repeat, with no site chrome. The Selected work
// tiles show this page in a scaled-down iframe. `ms` is one run of the intro plus a short hold.
// With `?hold=<ms>` the page pauses that long between runs and tells the tile (via postMessage)
// so it can show the project thumbnail in the gap.
const INTROS = {
  finworld: { Intro: FinworldIntro, ms: 8600, background: '#f4f6fb' }
};

const tell = phase => window.parent?.postMessage({ introLoop: phase }, window.location.origin);

const IntroLoop = () => {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const hold = Number(params.get('hold')) || 0;
  const intro = INTROS[slug];
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!intro) return undefined;
    tell('play');
    let id;
    if (hold) {
      id = setTimeout(() => {
        setPlaying(false);
        tell('hold');
        id = setTimeout(() => {
          setPlaying(true);
          setRun(r => r + 1);
        }, hold);
      }, intro.ms);
    } else {
      id = setTimeout(() => setRun(r => r + 1), intro.ms);
    }
    return () => clearTimeout(id);
  }, [intro, hold, run]);

  if (!intro) return null;
  const { Intro, background } = intro;
  return (
    <div className="intro-loop" style={{ background }}>
      {playing && <Intro key={run} />}
    </div>
  );
};

export default IntroLoop;
