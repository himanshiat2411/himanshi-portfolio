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

// A decision, argued in short labelled points, with its proof beside it.
export const DecisionBlock = ({ id, tag, heading, points, principles = [], flip, visual }) => (
  <article className="tk-decision-block" id={id} data-flip={flip ? '' : undefined} data-reveal>
    <div className="tk-decision-text">
      <p className="tk-tag">{tag}</p>
      <h4>{heading}</h4>
      <dl className="tk-points">
        {points.map(p => (
          <div key={p.label}>
            <dt>{p.label}</dt>
            <dd>{p.text}</dd>
          </div>
        ))}
      </dl>
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
    </div>
    <div className="tk-decision-visual">{visual}</div>
  </article>
);

// The three phase cards; each links to its phase. The last (current) one is plum.
export const PhaseCards = ({ phases }) => (
  <ol className="tk-problems-flow">
    {phases.map((p, i) => (
      <li
        key={p.to}
        className="tk-problem"
        data-current={i === phases.length - 1 ? '' : undefined}
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
