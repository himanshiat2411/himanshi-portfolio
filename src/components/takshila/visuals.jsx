import { useState } from 'react';

import promptExpert from '../../assets/takshila/prompt-expert.webp';
import promptNone from '../../assets/takshila/prompt-none.webp';
import promptStuck from '../../assets/takshila/prompt-stuck.webp';
import { Screen } from './basics';

// ---------- Small strips ----------

// Connected nodes on a gold line (the Q4 audit path).
export const NodeStrip = ({ items }) => (
  <ol className="tk-strip" data-reveal>
    {items.map((item, i) => (
      <li key={item} style={{ '--i': i }}>
        <span className="tk-strip-dot" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ol>
);

// Design rounds as a loop: three rounds sit on a ring of arrows that turns clockwise, 1 → 2 → 3 →
// back to 1. Hovering (or focusing) a round, or its note, highlights both.
const RING = { c: 150, r: 112 };
const point = deg => {
  const a = (deg * Math.PI) / 180;
  return [RING.c + RING.r * Math.cos(a), RING.c + RING.r * Math.sin(a)];
};
const arc = (from, to) => {
  const [x1, y1] = point(from);
  const [x2, y2] = point(to);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${RING.r} ${RING.r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};
const ROUND_ANGLES = [-90, 30, 150];

export const RoundsStrip = ({ rounds, caption }) => {
  const [on, setOn] = useState(null);
  const hold = i => ({
    onMouseEnter: () => setOn(i),
    onMouseLeave: () => setOn(null),
    onFocus: () => setOn(i),
    onBlur: () => setOn(null)
  });

  return (
    <div className="tk-rounds" data-reveal>
      <div className="tk-rounds-loop">
        <svg className="tk-rounds-ring" viewBox="0 0 300 300" aria-hidden="true" data-active={on === null ? undefined : ''}>
          <defs>
            <marker id="tk-rounds-arrow" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="3" markerHeight="3" orient="auto">
              <path d="M0 0l10 5-10 5z" fill="var(--tk-plum)" />
            </marker>
          </defs>
          {ROUND_ANGLES.map((a, i) => (
            <path key={a} className="tk-rounds-arc" d={arc(a + 27, a + 120 - 36)} data-on={on === i ? '' : undefined} markerEnd="url(#tk-rounds-arrow)" />
          ))}
        </svg>
        {rounds.map((r, i) => {
          const [x, y] = point(ROUND_ANGLES[i]);
          return (
            <button
              key={r.label}
              type="button"
              className="tk-rounds-node"
              style={{ left: `${(x / 300) * 100}%`, top: `${(y / 300) * 100}%` }}
              data-on={on === i ? '' : undefined}
              aria-describedby={`tk-round-${i}`}
              {...hold(i)}
            >
              {r.label}
            </button>
          );
        })}
        <span className="tk-rounds-centre">{caption}</span>
      </div>
      <ol>
        {rounds.map((r, i) => (
          <li key={r.label} id={`tk-round-${i}`} data-on={on === i ? '' : undefined} {...hold(i)}>
            <span className="tk-rounds-label">{r.label}</span>
            <p>{r.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

// The redesigned product page with a hover tour: hovering (or tapping, or focusing) a section
// spotlights it, dims the rest of the page, and shows a short note on what changed.
const PAGE = { w: 1440, h: 2852 };
const pct = (v, total) => `${(v / total) * 100}%`;
const boxStyle = ([x, y, w, h]) => ({
  left: pct(x - 10, PAGE.w),
  top: pct(y - 10, PAGE.h),
  width: pct(w + 20, PAGE.w),
  height: pct(h + 20, PAGE.h)
});

export const ProductPageTour = ({ src, alt, zones }) => {
  const [on, setOn] = useState(null);
  const zone = zones.find(z => z.id === on);
  return (
    <div className="tk-tour" data-active={zone ? '' : undefined} onMouseLeave={() => setOn(null)}>
      <img src={src} alt={alt} width={PAGE.w} height={PAGE.h} loading="lazy" />
      {zone && <span className="tk-tour-spot" aria-hidden="true" style={boxStyle(zone.box)} />}
      {zones.map((z, i) => (
        <button
          key={z.id}
          type="button"
          className="tk-tour-zone"
          data-on={on === z.id ? '' : undefined}
          style={boxStyle(z.box)}
          aria-label={`${z.title}: ${z.text}`}
          onMouseEnter={() => setOn(z.id)}
          onFocus={() => setOn(z.id)}
          onBlur={() => setOn(null)}
          onClick={() => setOn(o => (o === z.id ? null : z.id))}
        >
          <span className="tk-tour-pin">{i + 1}</span>
        </button>
      ))}
      {zone && (
        <div
          className="tk-tour-note"
          data-side={zone.box[0] > PAGE.w / 2 ? 'left' : 'right'}
          style={{ top: pct(zone.box[1] - 10, PAGE.h), '--below': pct(zone.box[1] + zone.box[3] + 18, PAGE.h) }}
          role="status"
        >
          <strong>{zone.title}</strong>
          <p>{zone.text}</p>
        </div>
      )}
    </div>
  );
};

// ---------- Small line illustrations (plum lines, gold accents) ----------

const Art = ({ children, label }) => (
  <svg className="tk-art" viewBox="0 0 80 80" role="img" aria-label={label}>
    <g fill="none" stroke="var(--tk-plum)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </g>
  </svg>
);

// Users: a customer holding the ring they co-designed, a designer sketching, an artisan at the bench.
export const USER_ART = {
  Customers: (
    <Art label="A customer with the ring they co-designed">
      <circle cx="34" cy="22" r="9" />
      <path d="M16 62c0-11 8-19 18-19s18 8 18 19" />
      <circle cx="56" cy="46" r="8" fill="var(--tk-bg)" />
      <path d="M52 38l4-5 4 5-4 3z" fill="var(--tk-gold)" stroke="var(--tk-gold)" />
    </Art>
  ),
  Designers: (
    <Art label="A designer sketching a ring">
      <rect x="12" y="16" width="42" height="50" rx="4" />
      <circle cx="33" cy="44" r="10" strokeDasharray="3 3" />
      <path d="M29 33l4-5 4 5-4 3z" fill="var(--tk-gold)" stroke="var(--tk-gold)" />
      <path d="M50 58l16-26 5 3-16 26-6 3z" />
      <path d="M62 16l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="var(--tk-gold)" stroke="var(--tk-gold)" />
    </Art>
  ),
  Artisans: (
    <Art label="An artisan hammering a ring on a mandrel">
      <path d="M12 60h40" />
      <path d="M18 60l6-12h16l6 12" />
      <path d="M22 44h26l10-3" />
      <circle cx="38" cy="40" r="4" />
      <path d="M50 16l14 8-4 7-14-8z" fill="var(--tk-tint-gold)" />
      <path d="M53 27l-6 11" />
      <path d="M26 34l-2-4M32 32v-4M38 33l2-4" stroke="var(--tk-gold)" />
    </Art>
  )
};

// Prompting users: whether they have an idea, and whether they can put it into a prompt.
const Tick = ({ on }) => (
  <span className="tk-tick" data-on={on ? '' : undefined} aria-label={on ? 'Yes' : 'No'}>
    {on ? '✓' : '✕'}
  </span>
);

// ---------- Redesigned order tracking (rebuilt from the Figma design, aligned on one grid) ----------

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 12.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Small line icons for each stage.
const STAGE_ICONS = {
  gem: 'M7 4h10l4 5-9 11L3 9z M3 9h18 M9 4l3 5 3-5 M12 9v11',
  ring: 'M9 3h6l-1.5 3h-3z M12 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z',
  badge: 'M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12z M8.5 14l-2 7 5.5-3 5.5 3-2-7',
  truck: 'M3 6h11v10H3z M14 10h4l3 3v3h-7 M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  box: 'M12 3l8 4.5v9L12 21l-8-4.5v-9z M4 7.5l8 4.5 8-4.5 M12 12v9'
};

const StageIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={STAGE_ICONS[name]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// One row of the journey: marker, stage name, date pill, "View Details" and its status check.
// Every row uses the same columns, so the pills and links line up down the whole card.
const JourneyRow = ({ stage, sub }) => (
  <li className="tk-jr-row" data-state={stage.state} data-sub={sub ? '' : undefined}>
    <span className="tk-jr-marker">
      {!sub && (stage.state === 'done' ? <CheckIcon /> : <StageIcon name={stage.icon} />)}
    </span>
    <span className="tk-jr-name">{stage.name}</span>
    <span className="tk-jr-pill">
      {stage.date ? (
        <>
          {stage.state === 'current' ? <CheckIcon /> : <i />}
          {stage.date}
          <b>•</b>
          {stage.time}
        </>
      ) : (
        'Pending'
      )}
    </span>
    <span className="tk-jr-link">View Details</span>
    <span className="tk-jr-check">
      <CheckIcon />
    </span>
  </li>
);

export const OrderJourney = ({ order, thumb }) => (
  <div className="tk-journey">
    <div className="tk-jr-head">
      <span className="tk-jr-id">{order.id}</span>
      <span className="tk-jr-status">✦ {order.status}</span>
    </div>
    <div className="tk-jr-product">
      <img src={thumb} alt="" />
      <div className="tk-jr-info">
        <span className="tk-jr-title">{order.product}</span>
        <span className="tk-jr-by">By {order.maker}</span>
        <span className="tk-jr-date">Ordered on {order.ordered}</span>
        <span className="tk-jr-actions">
          <span>Customize</span>
          <span>View NFT</span>
          <span data-primary="">Track Order</span>
        </span>
      </div>
      <div className="tk-jr-price">
        <span>{order.price}</span>
        <span className="tk-jr-link">View Details</span>
      </div>
    </div>
    <ol className="tk-jr-stages">
      {order.stages.map(stage =>
        stage.steps ? (
          <li key={stage.name} className="tk-jr-group">
            <ol>
              <JourneyRow stage={stage} />
              {stage.steps.map(step => (
                <JourneyRow key={step.name} stage={step} sub />
              ))}
            </ol>
          </li>
        ) : (
          <JourneyRow key={stage.name} stage={stage} />
        )
      )}
    </ol>
  </div>
);

// ---------- Decision visuals ----------

// Ask before you generate: the three kinds of people who prompt, side by side. Each is an
// illustration plus the same two answers as yes / no marks. The middle one is the focus group.
const PROMPT_IMAGES = {
  none: { src: promptNone, alt: 'Someone at a laptop surrounded by question marks, with no idea yet' },
  stuck: { src: promptStuck, alt: 'Someone picturing a pendant but unable to put it into words' },
  expert: { src: promptExpert, alt: 'Someone describing a pendant in detail and getting matching designs' }
};

export const VisualAskFirst = ({ users, focusLabel }) => (
  <div className="tk-vis">
    <p className="tk-vis-title">Three kinds of people who prompt</p>
    <ul className="tk-prompt-users">
      {users.map(u => (
        <li key={u.key} data-focus={u.focus ? '' : undefined}>
          <img className="tk-prompt-img" src={PROMPT_IMAGES[u.key].src} alt={PROMPT_IMAGES[u.key].alt} loading="lazy" />
          <strong>{u.title}</strong>
          <span className="tk-prompt-ticks">
            <span>
              <Tick on={u.idea} /> Idea
            </span>
            <span>
              <Tick on={u.prompt} /> Prompt
            </span>
          </span>
          {u.focus && <span className="tk-vis-chosen">{focusLabel}</span>}
        </li>
      ))}
    </ul>
  </div>
);

// Why three options: one to four-plus, with three chosen (and the real screen, once added).
export const VisualThree = ({ screen, caption }) => (
  <div className="tk-vis">
    <ol className="tk-vis-counts">
      <li>
        <strong>1</strong> Isn’t a choice
      </li>
      <li>
        <strong>2</strong> Feels like a test
      </li>
      <li data-on="">
        <strong>3</strong> A real range <span className="tk-vis-chosen">Chosen</span>
      </li>
      <li>
        <strong>4+</strong> Turns into browsing
      </li>
    </ol>
    {screen && <Screen src={screen} alt="Design Studio screen showing three design directions to explore" caption={caption} />}
  </div>
);

// Infinite scroll with a checkpoint.
export const VisualCheckpoint = () => (
  <div className="tk-vis">
    <div className="tk-vis-phone">
      <span className="tk-vis-post" />
      <span className="tk-vis-post" />
      <span className="tk-vis-post" />
      <span className="tk-vis-scroll">↓ scroll ↓</span>
      <span className="tk-vis-checkpoint">Checkpoint — Load more</span>
      <span className="tk-vis-fork">
        <span>Keep scrolling</span>
        <span>Go make something</span>
      </span>
    </div>
    <p className="tk-caption">Not a wall — a fork.</p>
  </div>
);
