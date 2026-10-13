import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import dashboard from '../../assets/finworld/intro/dashboard.webp';
import mark from '../../assets/finworld/intro/mark.svg';
import { ExpensesCard, NovaCard, RevenueCard } from './cards';
import SkipIntro from '../SkipIntro';
import './Intro.css';

// Opening film for the Finworld case study: one continuous camera move through the real
// dashboard. A glint draws the logo out of nothing, the camera leaves the logo's own slot for
// Total Revenue (the number resolves, the line draws), glides to Expenses (the donut assembles),
// then to Nova (its suggestions arrive), and pulls back to the whole dashboard with one line.
// Every value is a pure function of the time `t`, so any moment can be frozen with `?fwi=2.4`.
const TOTAL = 8.2;
const W = 1440;
const H = 1024;

const lerp = (a, b, p) => a + (b - a) * p;
const clamp01 = v => Math.min(1, Math.max(0, v));
const expoOut = p => (p >= 1 ? 1 : 1 - 2 ** (-10 * p));
const inOut = p => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
// Progress through the window [a, b], eased (0 before, 1 after).
const span = (t, a, b, ease = expoOut) => ease(clamp01((t - a) / (b - a)));

const pad = (r, p) => ({ x: r.x - p, y: r.y - p, w: r.w + p * 2, h: r.h + p * 2 });

/* World rectangles, in dashboard pixels (from the Figma frame). */
const LOGO = { x: 87, y: 30, w: 118, h: 22 };
const REV = { x: 350, y: 138, w: 313, h: 283 };
const EXP = { x: 346, y: 556, w: 436, h: 210 };
const NOVA = { x: 1088, y: 439, w: 324, h: 263 };

// A camera keyframe: which world rectangle to frame, how much of the window it fills, and where
// its centre sits on screen (fractions of the window).
const shot = (rect, fill, ax, ay) => ({ rect, fill, ax, ay });

const cameras = narrow => {
  const side = narrow ? 0.5 : 0.65;
  const hy = narrow ? 0.4 : 0.5;
  const logo = shot({ x: 70, y: 18, w: 152, h: 46 }, narrow ? 0.62 : 0.34, 0.5, 0.5);
  return [
    [0, logo],
    [0.95, logo],
    [1.75, shot(pad(REV, 14), 0.74, side, hy)],
    [2.75, shot(pad(REV, 14), 0.74, side, hy)],
    [3.45, shot(pad(EXP, 14), 0.56, side, hy)],
    [4.35, shot(pad(EXP, 14), 0.56, side, hy)],
    [5.05, shot(pad(NOVA, 14), 0.72, side, hy)],
    [5.85, shot(pad(NOVA, 14), 0.72, side, hy)],
    [6.85, shot({ x: 0, y: 0, w: W, h: H }, narrow ? 0.94 : 0.8, 0.5, narrow ? 0.42 : 0.45)]
  ];
};

// Turn a shot into a transform for the window size.
const frame = (s, vw, vh) => ({
  scale: Math.min((s.fill * vw) / s.rect.w, (s.fill * vh) / s.rect.h),
  cx: s.rect.x + s.rect.w / 2,
  cy: s.rect.y + s.rect.h / 2,
  sx: s.ax * vw,
  sy: s.ay * vh
});

const cameraAt = (t, vw, vh, narrow) => {
  const keys = cameras(narrow);
  const i = keys.findIndex(([kt]) => kt > t);
  if (i === 0) return frame(keys[0][1], vw, vh);
  if (i === -1) return frame(keys[keys.length - 1][1], vw, vh);
  const [t0, s0] = keys[i - 1];
  const [t1, s1] = keys[i];
  const a = frame(s0, vw, vh);
  const b = frame(s1, vw, vh);
  const p = inOut((t - t0) / (t1 - t0));
  return {
    // Zoom in log space, so a big push feels even.
    scale: Math.exp(lerp(Math.log(a.scale), Math.log(b.scale), p)),
    cx: lerp(a.cx, b.cx, p),
    cy: lerp(a.cy, b.cy, p),
    sx: lerp(a.sx, b.sx, p),
    sy: lerp(a.sy, b.sy, p)
  };
};

/* One line of copy per idea. Each arrives and leaves as a single object. */
const LINES = [
  { from: 1.55, to: 2.95, text: ['Every ', 'number', '.'] },
  { from: 3.35, to: 4.55, text: ['Every ', 'expense', '.'] },
  { from: 4.95, to: 6.0, text: ['Every ', 'next move', '.'] }
];

const Copy = ({ t }) =>
  LINES.map(line => {
    const inP = span(t, line.from, line.from + 0.55);
    const outP = span(t, line.to, line.to + 0.35, inOut);
    if (inP <= 0 || outP >= 1) return null;
    return (
      <p
        key={line.from}
        className="fwf-copy"
        style={{ opacity: inP * (1 - outP), transform: `translateY(${(1 - inP) * 18 - outP * 14}px)` }}
      >
        {line.text[0]}
        <em>{line.text[1]}</em>
        {line.text[2]}
      </p>
    );
  });

const FinworldIntro = () => {
  const [t, setT] = useState(0);
  const [done, setDone] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [view, setView] = useState({ vw: 1440, vh: 900 });

  useLayoutEffect(() => {
    const fit = () => setView({ vw: window.innerWidth, vh: window.innerHeight });
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    if (done) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // `?fwi=2.4` freezes the film at that second, for checking stills.
    const hold = parseFloat(new URLSearchParams(window.location.search).get('fwi'));
    let raf;
    if (Number.isFinite(hold)) setT(hold);
    else {
      const start = performance.now();
      const tick = now => {
        const next = (now - start) / 1000;
        if (next >= TOTAL) {
          setDone(true);
          return;
        }
        setT(next);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previous;
    };
  }, [done]);

  if (done) return null;

  const { vw, vh } = view;
  const narrow = vw < 760;
  const cam = cameraAt(t, vw, vh, narrow);

  // Logo: a glint crosses the mark and the wordmark is drawn out behind it.
  const markIn = span(t, 0.1, 0.55);
  const glint = span(t, 0.12, 0.75, inOut);
  const word = span(t, 0.3, 0.95);

  // The dashboard around the cards: out of focus while the camera is close, sharp at the end.
  const room = span(t, 0.95, 1.7);
  const reveal = span(t, 5.85, 6.85, inOut);
  const baseOpacity = lerp(room * 0.4, 1, reveal);
  const baseBlur = lerp(2.2, 0, reveal);
  const sweep = clamp01((t - 6.9) / 0.9);

  const final = span(t, 6.6, 7.2);
  const lift = span(t, TOTAL - 0.6, TOTAL, inOut) * 100;

  return createPortal(
    <div className="fwf" onClick={() => setDone(true)} style={{ transform: `translateY(${-lift}%)` }}>
      <div className="fwf-light" style={{ opacity: 0.6 + room * 0.4 }} />
      <div
        className="fwf-world"
        style={{
          transform: `translate(${cam.sx - cam.cx * cam.scale}px, ${cam.sy - cam.cy * cam.scale}px) scale(${cam.scale})`
        }}
      >
        <div className="fwf-tilt">
          <div className="fwf-board" style={{ opacity: room }}>
            <img
              className="fwf-base"
              src={dashboard}
              alt=""
              width={W}
              height={H}
              style={{ opacity: baseOpacity, filter: baseBlur > 0.05 ? `blur(${baseBlur}px)` : 'none' }}
            />
            <span
              className="fwf-sheen"
              style={{ opacity: sweep > 0 && sweep < 1 ? 1 : 0, transform: `translateX(${lerp(-40, 120, sweep)}%)` }}
            />
          </div>

          <div className="fwf-logo" style={{ left: LOGO.x, top: LOGO.y }}>
            <span className="fwf-mark" style={{ opacity: markIn, transform: `scale(${0.96 + markIn * 0.04})` }}>
              <img src={mark} alt="" width="14" height="18" />
              <span className="fwf-glint" style={{ transform: `translateX(${lerp(-120, 140, glint)}%)` }} />
            </span>
            <span className="fwf-word" style={{ clipPath: `inset(-4px ${(1 - word) * 100}% -4px 0)` }}>
              FINWORLD
            </span>
          </div>

          <div className="fwf-card" style={{ left: REV.x, top: REV.y, width: REV.w, height: REV.h, opacity: span(t, 1.05, 1.5) }}>
            <RevenueCard
              chrome={span(t, 1.3, 1.8)}
              count={span(t, 1.45, 2.5)}
              line={span(t, 1.6, 2.65, inOut)}
              foot={span(t, 2.35, 2.75)}
            />
          </div>

          <div className="fwf-card" style={{ left: EXP.x, top: EXP.y, width: EXP.w, height: EXP.h, opacity: span(t, 2.9, 3.3) }}>
            <ExpensesCard
              segments={[0, 1, 2, 3, 4].map(i => span(t, 3.2 + i * 0.11, 3.65 + i * 0.11))}
              rows={[0, 1, 2, 3, 4].map(i => span(t, 3.4 + i * 0.08, 3.8 + i * 0.08))}
              foot={span(t, 3.9, 4.3)}
            />
          </div>

          <div
            className="fwf-card"
            style={{ left: NOVA.x, top: NOVA.y, width: NOVA.w, height: NOVA.h, opacity: span(t, 4.55, 4.95) }}
          >
            <NovaCard
              head={span(t, 4.75, 5.15)}
              items={[0, 1, 2].map(i => span(t, 4.9 + i * 0.13, 5.3 + i * 0.13))}
              ask={span(t, 5.35, 5.7)}
              focus={t > 5.55 && t < 6.2 ? 1 : -1}
            />
          </div>
        </div>
      </div>

      <div className="fwf-scrim" style={{ opacity: room * (1 - reveal) }} />
      <Copy t={t} />

      <p className="fwf-payoff" style={{ opacity: final, transform: `translate(-50%, ${(1 - final) * 14}px)` }}>
        <img src={mark} alt="" width="22" height="28" />
        <span>FINWORLD</span>
        <em>Your finances, finally in one place.</em>
      </p>
      <SkipIntro onSkip={() => setDone(true)} tone="light" />
    </div>,
    document.body
  );
};

export default FinworldIntro;
