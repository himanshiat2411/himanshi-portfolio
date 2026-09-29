import { Screen, useInView } from './basics';

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

// Design rounds as steps on a gold line.
export const RoundsStrip = ({ rounds, caption }) => (
  <div className="tk-rounds" data-reveal>
    <ol>
      {rounds.map((r, i) => (
        <li key={r.label} style={{ '--i': i }}>
          <span className="tk-rounds-label">{r.label}</span>
          <p>{r.text}</p>
        </li>
      ))}
    </ol>
    <p className="tk-caption">{caption}</p>
  </div>
);

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

// Ask before you generate: the three kinds of people who prompt, each with an icon and two
// yes / no marks (has an idea, can prompt it) so they compare at a glance. The middle one is the
// focus group. Below: asking for the missing specs before generating.
const PROMPT_ART = {
  none: (
    <Art label="No idea yet">
      <circle cx="40" cy="36" r="20" />
      <path d="M33 30a7 7 0 1 1 10 6c-2 1-3 3-3 5" />
      <circle cx="40" cy="48" r="1.5" fill="var(--tk-plum)" />
    </Art>
  ),
  stuck: (
    <Art label="Has an idea but can’t prompt it">
      <path d="M40 14a16 16 0 0 0-9 29v7h18v-7a16 16 0 0 0-9-29z" fill="var(--tk-tint-gold)" />
      <path d="M33 56h14M35 62h10" />
      <path d="M58 30c4-4 8 4 12 0M58 38c4 4 8-4 12 0" stroke="var(--tk-gold)" />
    </Art>
  ),
  expert: (
    <Art label="Has an idea and can prompt it">
      <path d="M40 14a16 16 0 0 0-9 29v7h18v-7a16 16 0 0 0-9-29z" fill="var(--tk-tint-gold)" />
      <path d="M33 56h14M35 62h10" />
      <path d="M58 28h14M58 35h14M58 42h9" stroke="var(--tk-gold)" />
    </Art>
  )
};

export const VisualAskFirst = ({ users, focusLabel }) => {
  const [ref, inView] = useInView();
  return (
    <div className="tk-vis" ref={ref} data-in={inView ? '' : undefined}>
      <p className="tk-vis-title">Three kinds of people who prompt</p>
      <ul className="tk-prompt-users">
        {users.map(u => (
          <li key={u.key} data-focus={u.focus ? '' : undefined}>
            <span className="tk-prompt-art">{PROMPT_ART[u.key]}</span>
            <span className="tk-prompt-body">
              {u.focus && <span className="tk-vis-chosen">{focusLabel}</span>}
              <strong>{u.title}</strong>
              <span className="tk-prompt-text">{u.text}</span>
              <span className="tk-prompt-ticks">
                <span>
                  <Tick on={u.idea} /> Has an idea
                </span>
                <span>
                  <Tick on={u.prompt} /> Can prompt it
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>
      <div className="tk-vis-flows">
        <p className="tk-vis-flow" aria-label="Before: prompt, then image">
          <span>Prompt</span>→<span>Image</span>
        </p>
        <p className="tk-vis-flow" aria-label="After: prompt, then missing specs, then image">
          <span>Prompt</span>→<span className="tk-vis-pulse">Missing specs</span>→<span>Image</span>
        </p>
      </div>
    </div>
  );
};

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
