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

// ---------- Decision visuals ----------

// Ask before you generate: the three kinds of people who prompt the AI (the middle one is the
// focus group), then asking for the missing specs before generating.
export const VisualAskFirst = ({ users, focusLabel }) => {
  const [ref, inView] = useInView();
  return (
    <div className="tk-vis" ref={ref} data-in={inView ? '' : undefined}>
      <p className="tk-vis-title">Three kinds of people who prompt</p>
      <ul className="tk-prompt-users">
        {users.map(u => (
          <li key={u.title} data-focus={u.focus ? '' : undefined}>
            {u.focus && <span className="tk-vis-chosen">{focusLabel}</span>}
            <strong>{u.title}</strong>
            <span>{u.text}</span>
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
