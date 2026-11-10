import { useEffect, useRef, useState } from 'react';

import './Prototype.css';

// A clickable prototype of real screens inside a phone or laptop frame. Each screen lists tap areas
// over its real buttons as fractions of the screen image [x, y, w, h] and where they lead: another
// screen's key, or { done: 'message' } to end with a note. A screen can also move on by itself
// (`auto`), or sit as a sheet over another screen (`under`). Tall screens scroll inside the frame.
// The steps list beside the frame jumps to any screen; "Show tap areas" lights them up briefly.
//
// Taps act on the finger lifting, so phones never wait for, or lose, the click.
const Prototype = ({ screens, start, steps, device = 'phone', title }) => {
  const [key, setKey] = useState(start);
  const [done, setDone] = useState(null);
  const [hints, setHints] = useState(false);
  // Laptop screens: the frame takes the shape of the screen, and very tall ones scroll inside it.
  const [ratio, setRatio] = useState(16 / 10);
  const viewRef = useRef(null);
  const touched = useRef(false);
  const screen = screens[key];

  // Load every screen up front so taps never flash blank.
  useEffect(() => {
    Object.values(screens).forEach(s => {
      const im = new Image();
      im.src = s.src;
    });
  }, [screens]);

  // Each new screen starts at its top, and timed screens move on by themselves.
  useEffect(() => {
    viewRef.current?.scrollTo(0, 0);
    if (!screen.auto) return undefined;
    const id = setTimeout(() => setKey(screen.auto.to), screen.auto.ms);
    return () => clearTimeout(id);
  }, [key, screen]);

  useEffect(() => {
    if (!hints) return undefined;
    const id = setTimeout(() => setHints(false), 1600);
    return () => clearTimeout(id);
  }, [hints, key]);

  const go = to => {
    if (to && typeof to === 'object') setDone(to.done);
    else {
      setDone(null);
      setKey(to);
    }
  };

  const base = screen.under ? screens[screen.under] : null;
  const spotProps = s => ({
    type: 'button',
    className: 'pt-spot',
    'data-hint': hints ? '' : undefined,
    style: { left: `${s.box[0] * 100}%`, top: `${s.box[1] * 100}%`, width: `${s.box[2] * 100}%`, height: `${s.box[3] * 100}%` },
    'aria-label': s.name,
    onPointerDown: e => {
      touched.current = e.pointerType !== 'mouse';
    },
    onPointerUp: e => {
      if (e.pointerType !== 'mouse') {
        e.preventDefault();
        go(s.to);
      }
    },
    onClick: e => {
      if (e.detail === 0 || !touched.current) go(s.to);
      touched.current = false;
    }
  });

  const layer = (s, spots) => (
    <div className="pt-layer">
      <img
        src={s.src}
        alt={`${s.label} screen`}
        draggable="false"
        onLoad={e => spots && setRatio(Math.max(4 / 3, e.currentTarget.naturalWidth / e.currentTarget.naturalHeight))}
      />
      {spots && s.spots.map(sp => <button key={sp.name} {...spotProps(sp)} />)}
    </div>
  );

  return (
    <div className="pt" data-device={device}>
      <div className="pt-device">
        <div className="pt-frame" style={device === 'laptop' ? { aspectRatio: ratio } : undefined}>
          <div ref={viewRef} className="pt-view">
            {base ? (
              <>
                {layer(base, false)}
                <div className="pt-sheet">{layer(screen, true)}</div>
              </>
            ) : (
              <div key={key} className="pt-in">
                {layer(screen, true)}
              </div>
            )}
          </div>
          {done && (
            <div className="pt-done">
              <p>{done}</p>
              <button type="button" onClick={() => go(start)}>
                Start again
              </button>
            </div>
          )}
          {device === 'phone' && <span className="pt-island" aria-hidden="true" />}
        </div>
        {device === 'laptop' && <span className="pt-base" aria-hidden="true" />}
      </div>

      <div className="pt-side">
        {title && <p className="pt-title">{title}</p>}
        <p className="pt-tip">Tap the buttons on the screen, just like the real product.</p>
        <ol className="pt-steps">
          {steps.map((k, i) => (
            <li key={k}>
              <button type="button" aria-current={k === key && !done ? 'step' : undefined} onClick={() => go(k)}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {screens[k].label}
              </button>
            </li>
          ))}
        </ol>
        <div className="pt-actions">
          <button type="button" onClick={() => setHints(true)}>
            Show tap areas
          </button>
          <button type="button" onClick={() => go(start)}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Prototype;
