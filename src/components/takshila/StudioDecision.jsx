import ringImg from '../../assets/takshila/opt-main.webp';
import roseImg from '../../assets/takshila/opt-rose.webp';
import whiteImg from '../../assets/takshila/opt-white.webp';
import './DesignStudio.css';

// Key decision 01 of Project North Star, told as one card: the problem first, then the decision,
// how the Design Studio works, and what it cost. A short version of the Design Studio panels
// (DesignStudio.jsx), with a single visual.
const PEOPLE = [
  { name: 'No idea yet', text: 'Doesn’t know what they want.' },
  { name: 'Has an idea, can’t prompt it', text: 'Our focus group.', focus: true },
  { name: 'Has an idea and can prompt it', text: 'Describes it well.' }
];

const STEPS = ['Describe', 'Understand', 'Questions', 'Directions', 'Refine', 'Materials', 'Checkout'];

const RULES = [
  'Ask only for what’s missing, and never more than three questions.',
  'Show three directions, so nobody fixates on the first AI result.',
  'Every edit is a new version, so nothing is ever lost.',
  'The price follows the materials, not the picture.'
];

const DIRECTIONS = [
  { name: 'Timeless', img: ringImg },
  { name: 'Modern', img: whiteImg, crop: true },
  { name: 'Signature', img: roseImg, crop: true }
];

const StudioDecision = () => (
  <div className="ds sd">
    <section className="ds-panel">
      <div className="sd-block">
        <p className="sd-label">The problem</p>
        <p className="sd-lead">
          People know what they want but can’t put it into a prompt. When the AI shows a design straight away, they settle for its first result.
        </p>
        <div className="sd-people">
          {PEOPLE.map(p => (
            <div key={p.name} data-focus={p.focus ? '' : undefined}>
              <b>{p.name}</b>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sd-block">
        <p className="sd-label">The decision</p>
        <p className="sd-lead">Read the idea first, ask only about what’s missing, then show three directions to choose from.</p>
        <ol className="sd-steps">
          {STEPS.map(s => (
            <li key={s} data-optional={s === 'Questions' ? '' : undefined}>
              {s}
            </li>
          ))}
        </ol>
        <div className="sd-directions">
          {DIRECTIONS.map(d => (
            <figure key={d.name}>
              <span className="ds-img">
                <img src={d.img} alt={`${d.name} direction`} loading="lazy" data-crop={d.crop ? '' : undefined} />
              </span>
              <figcaption>{d.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="sd-block">
        <p className="sd-label">How it stays clear</p>
        <ul className="sd-rules">
          {RULES.map(r => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      <dl className="sd-result">
        <div>
          <dt>Why</dt>
          <dd>Their answers describe their own idea, so they judge our design against it.</dd>
        </div>
        <div>
          <dt>Trade-off</dt>
          <dd>An extra step, which complete prompts skip.</dd>
        </div>
      </dl>
    </section>
  </div>
);

export default StudioDecision;
