import { WORK_CARDS } from '../content/workCards';
import './WorkImpact.css';

// The body of a Selected work card: the situation, what was broken, what I did and what changed.
const List = ({ title, items, kind }) => (
  <div className="wi-col" data-kind={kind}>
    <h4>{title}</h4>
    <ul>
      {items.map(t => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </div>
);

const WorkImpact = ({ title }) => {
  const card = WORK_CARDS[title];
  if (!card) return null;
  return (
    <div className="wi">
      <p className="wi-line">{card.line}</p>
      <div className="wi-cols">
        <List title="What was broken" items={card.broken} kind="broken" />
        <List title="What I did" items={card.did} kind="did" />
      </div>
      <div className="wi-changed">
        <h4>What changed</h4>
        <dl>
          {card.changed.map(c => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default WorkImpact;
