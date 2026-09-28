import { useState } from 'react';

import './CompetitorMap.css';

// Content read from the Takshila competitor analysis. Coordinates are in the diagram's
// 1620×1354 space: `at` is the competitor's circle, `noteAt` where its callout starts,
// `line` the connector from the callout to the circle.
const COMPETITORS = [
  {
    id: 'arcade',
    name: ['Arcade'],
    threat: 5,
    note: ['Closest rival. AI-powered', 'design-your-own products,', '800K+ designs created.'],
    at: [849, 608],
    noteAt: [148, 118],
    line: 'M 330 245 Q 720 250 826 556'
  },
  {
    id: 'clarity',
    name: ['With', 'Clarity'],
    threat: 2,
    note: ['Custom jewelry retailer, but', 'no creator community or', 'provenance story.'],
    at: [1027, 449],
    noteAt: [1150, 178],
    line: 'M 1230 306 Q 1200 400 1076 424'
  },
  {
    id: 'brilliant',
    name: ['Brilliant', 'Earth'],
    threat: 3,
    note: ['Premium fine jewelry with', 'showrooms, but no peer-to-', 'peer or co-creation model.'],
    at: [614, 572],
    noteAt: [30, 498],
    line: 'M 200 632 Q 420 640 560 590'
  },
  {
    id: 'etsy',
    name: ['Etsy'],
    threat: 4,
    note: ['Huge brand and SEO reach,', 'but it’s a listing site with', 'no co-creation network.'],
    at: [737, 732],
    noteAt: [40, 866],
    line: 'M 250 868 Q 560 872 690 760'
  },
  {
    id: 'depop',
    name: ['Depop'],
    threat: 3,
    note: ['Strong peer-to-peer social', 'pull with Gen Z, but resale', 'only, with no creation.'],
    at: [959, 806],
    noteAt: [1236, 916],
    line: 'M 1008 836 Q 1200 846 1300 912'
  },
  {
    id: 'stockx',
    name: ['StockX &', 'Grailed'],
    threat: 1,
    note: ['Fashion resale markets.', 'No direct overlap with', 'Takshila.'],
    at: [584, 917],
    noteAt: [90, 1150],
    line: 'M 541 972 Q 500 1170 330 1180'
  }
];

const CENTRE = [800, 677];
// Nested rounded diamonds (square side, corner radius), outermost first.
const LAYERS = [
  { side: 704, r: 70, className: 'ca-layer ca-layer-1' },
  { side: 477, r: 56, className: 'ca-layer ca-layer-2' },
  { side: 266, r: 40, className: 'ca-layer ca-layer-3' }
];

const Meter = ({ value }) => (
  <span className="ca-meter" aria-hidden="true">
    {[1, 2, 3, 4, 5].map(n => (
      <i key={n} data-on={n <= value ? '' : undefined} />
    ))}
  </span>
);

const CompetitorMap = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="ca" data-active={active ? '' : undefined}>
      <svg className="ca-svg" viewBox="0 0 1620 1354" aria-hidden="true">
        {LAYERS.map(l => (
          <rect
            key={l.className}
            className={l.className}
            x={CENTRE[0] - l.side / 2}
            y={CENTRE[1] - l.side / 2}
            width={l.side}
            height={l.side}
            rx={l.r}
            transform={`rotate(45 ${CENTRE[0]} ${CENTRE[1]})`}
          />
        ))}

        {COMPETITORS.map(c => (
          <g
            key={c.id}
            className="ca-item"
            data-on={active === c.id ? '' : undefined}
            onMouseEnter={() => setActive(c.id)}
            onMouseLeave={() => setActive(null)}
          >
            {/* Invisible, generous hover areas: the whole callout block and a ring around the circle. */}
            <rect className="ca-hit" x={c.noteAt[0] - 16} y={c.noteAt[1] - 34} width="390" height="160" rx="12" />
            <circle className="ca-hit" cx={c.at[0]} cy={c.at[1]} r="84" />
            <path className="ca-line" d={c.line} pathLength="1" />
            <text className="ca-note" x={c.noteAt[0]} y={c.noteAt[1]}>
              <tspan className="ca-threat" x={c.noteAt[0]} dy="0">
                Threat {c.threat}/5
              </tspan>
              {c.note.map((line, i) => (
                <tspan key={line} x={c.noteAt[0]} dy={i === 0 ? 40 : 33}>
                  {line}
                </tspan>
              ))}
            </text>
            <g transform={`translate(${c.at[0]} ${c.at[1]})`}>
              <g className="ca-node">
                <circle r="58" />
                <text className="ca-name" textAnchor="middle" y={c.name.length === 1 ? 8 : -6}>
                  {c.name.map((part, i) => (
                    <tspan key={part} x="0" dy={i === 0 ? 0 : 26}>
                      {part}
                    </tspan>
                  ))}
                </text>
              </g>
            </g>
          </g>
        ))}
      </svg>

      {/* The same content as a list: shown on small screens, read by screen readers everywhere. */}
      <ul className="ca-list">
        {[...COMPETITORS]
          .sort((a, b) => b.threat - a.threat)
          .map(c => (
            <li key={c.id}>
              <p className="ca-list-name">{c.name.join(' ')}</p>
              <p className="ca-list-threat">
                Threat {c.threat}/5 <Meter value={c.threat} />
              </p>
              <p className="ca-list-note">{c.note.join(' ').replace('peer-to- peer', 'peer-to-peer')}</p>
            </li>
          ))}
      </ul>

      <p className="ca-footnote">Closer to the centre = bigger threat to Takshila</p>
    </div>
  );
};

export default CompetitorMap;
