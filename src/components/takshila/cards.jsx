import { useEffect, useRef, useState } from 'react';

import { APPROACH } from '../../content/takshila';
import { JumpLink } from './basics';

const principleName = id => APPROACH.principles.find(p => p.id === id)?.name;

// A research insight: number, title, one line and the quote.
export const InsightCard = ({ id, index, title, text, quote }) => (
  <li className="tk-insight" id={id} data-reveal>
    <span className="tk-index">{index}</span>
    <div>
      <h4>{title}</h4>
      <p>{text}</p>
      <blockquote>“{quote}”</blockquote>
    </div>
  </li>
);

// A decision, argued in short labelled points, with its proof beside it. With `visualAfter`
// (a point's label), the proof sits in the text instead, right after that point. `footer` closes the
// card (e.g. the real screen).
const Points = ({ points }) => (
  <dl className="tk-points">
    {points.map(p => (
      <div key={p.label}>
        <dt>{p.label}</dt>
        <dd>{p.text}</dd>
      </div>
    ))}
  </dl>
);

export const DecisionBlock = ({ id, tag, heading, points, principles = [], flip, visual, visualAfter, footer }) => {
  const split = visualAfter ? points.findIndex(p => p.label === visualAfter) + 1 : 0;
  return (
    <article
      className="tk-decision-block"
      id={id}
      data-flip={flip ? '' : undefined}
      data-inline={split ? '' : undefined}
      data-reveal
    >
      <div className="tk-decision-text">
        <p className="tk-tag">{tag}</p>
        <h4>{heading}</h4>
        {split ? (
          <>
            <Points points={points.slice(0, split)} />
            <div className="tk-decision-inline">{visual}</div>
            <Points points={points.slice(split)} />
          </>
        ) : (
          <Points points={points} />
        )}
        {principles.length > 0 && (
          <p className="tk-chips">
            <span>Principle used</span>
            {principles.map(pid => (
              <JumpLink key={pid} to={pid} className="tk-chip">
                {principleName(pid)}
              </JumpLink>
            ))}
          </p>
        )}
        {footer}
      </div>
      {!split && <div className="tk-decision-visual">{visual}</div>}
    </article>
  );
};

// Old and redesigned screen in one frame, split by a divider you drag (arrow keys move it too).
// Both show the top of the page, in the frame's shape (`ratio`). The "after" side is an image, or
// coded markup (`after.node`). On phones the pair stacks.
export const BeforeAfter = ({ before, after, name, ratio = '1440 / 666' }) => {
  const [pos, setPos] = useState(50);
  const frameRef = useRef(null);
  const dragging = useRef(false);

  const moveTo = clientX => {
    const r = frameRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="tk-ba">
      <div
        className="tk-ba-frame"
        ref={frameRef}
        style={{ '--pos': `${pos}%`, aspectRatio: ratio }}
        onPointerDown={e => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={e => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => {
          dragging.current = false;
        }}
      >
        {after.node ? (
          <div className="tk-ba-after" role="img" aria-label={after.alt}>
            {after.node}
          </div>
        ) : (
          <img className="tk-ba-after" src={after.src} alt={after.alt} loading="lazy" />
        )}
        <img className="tk-ba-before" src={before.src} alt={before.alt} loading="lazy" />
        <span className="tk-ba-tag" data-side="before">
          Before
        </span>
        <span className="tk-ba-tag" data-side="after">
          After
        </span>
        <span
          className="tk-ba-handle"
          role="slider"
          tabIndex={0}
          aria-label={`Compare the old and redesigned ${name} screen`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 5));
            if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 5));
          }}
        />
      </div>
      <div className="tk-ba-stack">
        <figure style={{ aspectRatio: ratio }}>
          <span className="tk-ba-tag">Before</span>
          <img src={before.src} alt={before.alt} loading="lazy" />
        </figure>
        <figure style={{ aspectRatio: ratio }}>
          <span className="tk-ba-tag">After</span>
          {after.node ? (
            <div className="tk-ba-after" role="img" aria-label={after.alt}>
              {after.node}
            </div>
          ) : (
            <img src={after.src} alt={after.alt} loading="lazy" />
          )}
        </figure>
      </div>
    </div>
  );
};

// All the before / after comparisons, stacked one after another at full width. Each has a
// "Full screen" button that opens it large over the page; Esc or Close returns.
const Comparison = ({ item }) => {
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (!full) return undefined;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape') setFull(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [full]);

  return (
    <li
      className="tk-compare-item"
      data-full={full ? '' : undefined}
      role={full ? 'dialog' : undefined}
      aria-modal={full ? 'true' : undefined}
      aria-label={full ? `${item.name}: before and after` : undefined}
    >
      <div className="tk-ct-bar">
        <h4 className="tk-ct-name">{item.name}</h4>
        <button type="button" className="tk-ct-full" onClick={() => setFull(f => !f)}>
          {full ? 'Close' : 'Full screen'}
        </button>
      </div>
      <div className="tk-ct-panel">
        <BeforeAfter name={item.name} before={item.before} after={item.after} ratio={item.ratio} />
        <p className="tk-caption">{item.caption}</p>
      </div>
    </li>
  );
};

export const CompareStack = ({ items }) => (
  <ol className="tk-compare-stack">
    {items.map(item => (
      <Comparison key={item.name} item={item} />
    ))}
  </ol>
);

// The three phase cards; each links to its phase. The last (current) one is plum.
export const PhaseCards = ({ phases }) => (
  <ol className="tk-problems-flow">
    {phases.map((p, i) => (
      <li
        key={p.to}
        className="tk-problem"
        data-current={p.current ? '' : undefined}
        data-reveal
        style={{ '--i': i }}
      >
        <JumpLink to={p.to} className="tk-problem-link">
          <span className="tk-problem-step">{p.num}</span>
          <h3 className="tk-problem-title">{p.title}</h3>
          <p className="tk-problem-about">{p.about}</p>
          <p className="tk-problem-line">{p.problem}</p>
        </JumpLink>
      </li>
    ))}
  </ol>
);
