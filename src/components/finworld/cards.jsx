// The three hero cards of the Finworld dashboard, rebuilt from the Figma file (node ids in
// comments) so they stay sharp when the camera pushes in. Each takes progress values (0 – 1)
// for its own build-in, so the film decides when things happen.
import revArrow from '../../assets/finworld/intro/rev/arrow-up.svg';
import revDivider from '../../assets/finworld/intro/rev/divider.svg';
import revGrid from '../../assets/finworld/intro/rev/grid.svg';
import revLine from '../../assets/finworld/intro/rev/line.svg';
import revTick from '../../assets/finworld/intro/rev/tick.svg';
import expDivider from '../../assets/finworld/intro/exp/divider.svg';
import dotMarketing from '../../assets/finworld/intro/exp/dot-marketing.svg';
import dotOperations from '../../assets/finworld/intro/exp/dot-operations.svg';
import dotRent from '../../assets/finworld/intro/exp/dot-rent.svg';
import dotSalaries from '../../assets/finworld/intro/exp/dot-salaries.svg';
import dotTech from '../../assets/finworld/intro/exp/dot-tech.svg';
import seg1 from '../../assets/finworld/intro/exp/seg-1.svg';
import seg2 from '../../assets/finworld/intro/exp/seg-2.svg';
import seg3 from '../../assets/finworld/intro/exp/seg-3.svg';
import seg4 from '../../assets/finworld/intro/exp/seg-4.svg';
import seg5 from '../../assets/finworld/intro/exp/seg-5.svg';
import chatAi from '../../assets/finworld/intro/nova/chat-ai.svg';
import forecast from '../../assets/finworld/intro/nova/forecast.svg';
import risk from '../../assets/finworld/intro/nova/risk.svg';
import send from '../../assets/finworld/intro/nova/send.svg';
import settingsEdit from '../../assets/finworld/intro/nova/settings-edit.svg';

const rise = p => ({ opacity: p, transform: `translateY(${(1 - p) * 6}px)` });
const money = n => `₹ ${Math.round(n).toLocaleString('en-US')}`;

/* Total Revenue (226:8280), 313 × 283. */
const GRID_TOPS = [16.17, 38.83, 61.5, 84.17];
const Y_LABELS = [
  ['400', 13.67],
  ['200', 36.33],
  ['0', 59],
  ['-200', 81.67]
];
const X_LABELS = [
  ['Apr', 29.49],
  ['Jul', 38.41],
  ['Oct', 46.54],
  ['Apr', 63.75],
  ['Jul', 72.67],
  ['Oct', 80.8]
];
const TICKS = [23.62, 32.12, 40.62, 49.12, 57.87, 66.37, 74.87, 83.37];

export const RevenueCard = ({ count = 1, line = 1, chrome = 1, foot = 1 }) => (
  <div className="fwc fwc-rev">
    <div className="fwc-rev-head" style={rise(chrome)}>
      <div>
        <p className="fwc-rev-label">Total Revenue</p>
        <p className="fwc-rev-value">{money(2490000 * count)}</p>
      </div>
      <span className="fwc-badge" style={{ opacity: foot }}>
        <img src={revArrow} alt="" width="8" height="8" /> 89.5 %
      </span>
    </div>
    <div className="fwc-rev-chart">
      {GRID_TOPS.map(top => (
        <img key={top} className="fwc-grid" src={revGrid} alt="" width="195" height="1" style={{ top: `${top}%`, opacity: chrome }} />
      ))}
      {TICKS.map(left => (
        <img key={left} className="fwc-tick" src={revTick} alt="" width="1" height="3" style={{ left: `${left}%`, opacity: chrome }} />
      ))}
      {Y_LABELS.map(([text, top]) => (
        <span key={text} className="fwc-axis fwc-axis-y" style={{ top: `${top}%`, opacity: chrome }}>
          {text}
        </span>
      ))}
      {X_LABELS.map(([text, left], i) => (
        <span key={i} className="fwc-axis" style={{ left: `${left}%`, opacity: chrome }}>
          {text}
        </span>
      ))}
      <span className="fwc-axis fwc-year" style={{ left: '19.39%', opacity: chrome }}>
        2020
      </span>
      <span className="fwc-axis fwc-year" style={{ left: '54%', opacity: chrome }}>
        2021
      </span>
      {/* The line draws in from the left. */}
      <img
        className="fwc-rev-line"
        src={revLine}
        alt=""
        width="196"
        height="104"
        style={{ clipPath: `inset(-4px ${(1 - line) * 100}% -4px -4px)` }}
      />
    </div>
    <div className="fwc-foot" style={rise(foot)}>
      <img src={revDivider} alt="" width="265" height="1" />
      <p>
        <span>Highest in July ’20</span>
        <strong>₹ 360,000</strong>
      </p>
    </div>
  </div>
);

/* Expenses Breakdown (226:8101), 436 × 210. */
const SEGMENTS = [
  { src: seg1, inset: '50% 15% 15% 34.81%', w: 93, h: 65 },
  { src: seg2, inset: '37.43% 58.68% 18.47% 15%', w: 49, h: 82 },
  { src: seg3, inset: '15.01% 50.41% 57.18% 17.33%', w: 60, h: 52 },
  { src: seg4, inset: '15% 21.35% 61.49% 49.29%', w: 55, h: 44 },
  { src: seg5, inset: '29.89% 15% 50% 66.37%', w: 35, h: 37 }
];
const ROWS = [
  [dotSalaries, 'Salaries', 267400, '42%'],
  [dotMarketing, 'Marketing', 487441, '43%'],
  [dotOperations, 'Operations', 653518, '36%'],
  [dotRent, 'Rent & Utilities', 558612, '38%'],
  [dotTech, 'Technology', 449003, '34%']
];

export const ExpensesCard = ({ segments = [1, 1, 1, 1, 1], rows = [1, 1, 1, 1, 1], foot = 1 }) => (
  <div className="fwc fwc-exp">
    <div className="fwc-pie">
      <p className="fwc-exp-title">Expenses Breakdown</p>
      {SEGMENTS.map((s, i) => (
        <img
          key={i}
          className="fwc-seg"
          src={s.src}
          alt=""
          width={s.w}
          height={s.h}
          style={{
            inset: s.inset,
            opacity: segments[i],
            transform: `scale(${0.92 + segments[i] * 0.08})`
          }}
        />
      ))}
    </div>
    <div className="fwc-legend">
      {ROWS.map(([dot, name, value, pct], i) => (
        <div key={name} className="fwc-legend-row" style={rise(rows[i])}>
          <span className="fwc-legend-name">
            <img src={dot} alt="" width="6" height="6" /> {name}
          </span>
          <span className="fwc-legend-value">₹{value}</span>
          <span className="fwc-legend-pct">{pct}</span>
        </div>
      ))}
    </div>
    <div className="fwc-foot fwc-exp-foot" style={rise(foot)}>
      <img src={expDivider} alt="" width="397" height="1" />
      <p>
        <span>Total Expenses</span>
        <strong>₹ 360,000</strong>
      </p>
    </div>
  </div>
);

/* Nova AI Assistant (179:10508), 324 × 263. */
const SUGGESTIONS = [
  [settingsEdit, 'Optimize Ad speed allocation', 22],
  [risk, 'Cash reserves low in 6 months', 20],
  [forecast, 'Forecast : Adjust Q4 projection', 22]
];

export const NovaCard = ({ head = 1, items = [1, 1, 1], ask = 1, focus = -1 }) => (
  <div className="fwc fwc-nova">
    <div className="fwc-nova-head" style={rise(head)}>
      <img src={chatAi} alt="" width="22" height="23" />
      <strong>Nova</strong>
      <span>AI Assistant</span>
    </div>
    <div className="fwc-nova-list">
      {SUGGESTIONS.map(([icon, text, size], i) => (
        <div key={text} className="fwc-nova-item" data-focus={focus === i ? '' : undefined} style={rise(items[i])}>
          <img src={icon} alt="" width={size} height={size} />
          {text}
        </div>
      ))}
    </div>
    <div className="fwc-nova-ask" style={rise(ask)}>
      <span>Ask Nova anything</span>
      <img src={send} alt="" width="12" height="12" />
    </div>
  </div>
);
