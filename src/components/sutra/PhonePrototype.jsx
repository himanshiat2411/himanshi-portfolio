import { useEffect, useRef, useState } from 'react';

import './PhonePrototype.css';

// The Moon onboarding prototype inside an iPhone frame. Each screen has tap areas over its real
// buttons, as fractions of the screen [x, y, w, h], and says where they lead. The steps list beside
// the phone jumps to any screen; "Show tap areas" briefly outlines what can be tapped.
const SCREENS = [
  { key: 'signup', label: 'Sign up', spots: [{ box: [0.04, 0.745, 0.92, 0.15], to: 1, name: 'Continue' }] },
  { key: 'checkin', label: 'A gentle check-in', spots: [{ box: [0.08, 0.46, 0.84, 0.32], to: 2, name: 'Pick an answer', pick: true }, { box: [0.02, 0.07, 0.14, 0.05], to: 0, name: 'Back' }] },
  { key: 'love', label: 'Love and connection', spots: [{ box: [0.08, 0.46, 0.84, 0.32], to: 3, name: 'Pick an answer', pick: true }, { box: [0.02, 0.07, 0.14, 0.05], to: 1, name: 'Back' }] },
  { key: 'goodday', label: 'A good day outside', spots: [{ box: [0.08, 0.46, 0.84, 0.32], to: 4, name: 'Pick an answer', pick: true }, { box: [0.02, 0.07, 0.14, 0.05], to: 2, name: 'Back' }] },
  { key: 'reveal', label: 'The reveal', hold: 5, spots: [] },
  { key: 'hello', label: 'Hello, Moon', spots: [{ box: [0.07, 0.865, 0.86, 0.085], to: 6, name: 'Say hello' }] },
  { key: 'words', label: 'First words', spots: [{ box: [0.07, 0.875, 0.86, 0.085], to: 7, name: 'Step outside' }] },
  {
    key: 'home',
    label: 'Home',
    spots: [
      { box: [0.05, 0.14, 0.9, 0.16], to: 8, name: 'Plan my day' },
      { box: [0.26, 0.91, 0.22, 0.08], to: 8, name: 'Map' }
    ]
  },
  {
    key: 'map',
    label: 'Today’s map',
    spots: [
      { box: [0.02, 0.06, 0.14, 0.06], to: 7, name: 'Back' },
      { box: [0.05, 0.9, 0.55, 0.08], to: 'done', name: 'Take me there' }
    ]
  }
];

const IMAGES = import.meta.glob('../../assets/sutra/screen-*.webp', { eager: true, import: 'default' });
const img = key => IMAGES[`../../assets/sutra/screen-${key}.webp`];

const HOLD_MS = 700;

const PhonePrototype = () => {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const [hints, setHints] = useState(false);
  const [picked, setPicked] = useState(null);
  const [holding, setHolding] = useState(false);
  const holdTimer = useRef(null);
  const touched = useRef(false);
  const screen = SCREENS[i];

  // Load every screen up front so taps never flash blank.
  useEffect(() => {
    SCREENS.forEach(s => {
      const im = new Image();
      im.src = img(s.key);
    });
  }, []);

  useEffect(() => {
    if (!hints) return undefined;
    const id = setTimeout(() => setHints(false), 1600);
    return () => clearTimeout(id);
  }, [hints, i]);

  const go = to => {
    setPicked(null);
    if (to === 'done') setDone(true);
    else {
      setDone(false);
      setI(to);
    }
  };

  const tap = (spot, e) => {
    if (spot.pick) {
      // Answer rows: highlight the row that was tapped, then move on, like the real flow.
      const r = e.currentTarget.getBoundingClientRect();
      const row = Math.max(0, Math.min(3, Math.floor(((e.clientY - r.top) / r.height) * 4)));
      setPicked(row);
      setTimeout(() => go(spot.to), 380);
    } else go(spot.to);
  };

  const startHold = () => {
    if (!screen.hold) return;
    setHolding(true);
    holdTimer.current = setTimeout(() => {
      setHolding(false);
      go(screen.hold);
    }, HOLD_MS);
  };
  const stopHold = () => {
    clearTimeout(holdTimer.current);
    setHolding(false);
  };

  return (
    <div className="pp">
      <div className="pp-phone">
        <div className="pp-screen">
          <img key={screen.key} src={img(screen.key)} alt={`${screen.label} screen of the Moon prototype`} draggable="false" />
          {screen.spots.map(s => (
            <button
              key={s.name}
              type="button"
              className="pp-spot"
              data-hint={hints ? '' : undefined}
              style={{ left: `${s.box[0] * 100}%`, top: `${s.box[1] * 100}%`, width: `${s.box[2] * 100}%`, height: `${s.box[3] * 100}%` }}
              aria-label={s.name}
              onPointerUp={e => {
                // Act on the finger lifting, so phones don't wait for (or lose) the click.
                if (e.pointerType !== 'mouse') {
                  e.preventDefault();
                  tap(s, e);
                }
              }}
              onClick={e => {
                if (e.detail === 0 || !touched.current) tap(s, e);
                touched.current = false;
              }}
              onPointerDown={e => {
                touched.current = e.pointerType !== 'mouse';
              }}
            >
              {s.pick && picked !== null && <span className="pp-picked" style={{ top: `${picked * 25}%` }} />}
            </button>
          ))}
          {screen.hold && (
            <button
              type="button"
              className="pp-hold"
              data-holding={holding ? '' : undefined}
              data-hint={hints ? '' : undefined}
              aria-label="Tap and hold to meet Moon"
              onPointerDown={e => {
                e.preventDefault();
                startHold();
              }}
              onPointerUp={stopHold}
              onPointerCancel={stopHold}
              onPointerLeave={stopHold}
              onContextMenu={e => e.preventDefault()}
              onDoubleClick={() => go(screen.hold)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && go(screen.hold)}
            />
          )}
          {done && (
            <div className="pp-done">
              <p>Moon is on its way to the chai stall.</p>
              <button type="button" onClick={() => go(0)}>
                Start again
              </button>
            </div>
          )}
          <span className="pp-island" aria-hidden="true" />
        </div>
      </div>

      <div className="pp-side">
        <p className="pp-tip">{screen.hold ? 'Press and hold the screen to meet Moon.' : 'Tap the buttons on the screen, just like on a phone.'}</p>
        <ol className="pp-steps">
          {SCREENS.map((s, k) => (
            <li key={s.key}>
              <button type="button" aria-current={k === i && !done ? 'step' : undefined} onClick={() => go(k)}>
                <span>{String(k + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
        <div className="pp-actions">
          <button type="button" onClick={() => setHints(true)}>
            Show tap areas
          </button>
          <button type="button" onClick={() => go(0)}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhonePrototype;
