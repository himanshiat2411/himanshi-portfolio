import { useState } from 'react';

import './StakeholderMap.css';

// Content read from the Takshila stakeholder map (circle version). Each stakeholder's
// position is its centre in the diagram, as a percentage of the rings' box.
const LAYERS = [
  {
    id: 'core',
    name: 'Layer 1 · Core Stakeholders',
    note: 'The three-sided peer network at the heart of Takshila',
    ring: 'Core stakeholders',
    people: [
      { label: 'Customers / Consumers', x: 50, y: 34 },
      { label: 'Designers / Creators', x: 34, y: 59 },
      { label: 'Artisans / Makers', x: 66, y: 59 }
    ]
  },
  {
    id: 'demand',
    name: 'Layer 2 · Demand & Distribution',
    note: 'Drives discovery, engagement and sales',
    ring: 'Demand & distribution',
    people: [
      { label: 'Sellers / Entrepreneurs', x: 31, y: 31 },
      { label: 'Creators / Influencers', x: 69, y: 31 },
      { label: 'Community Members', x: 21, y: 56 },
      { label: 'Collectors / Enthusiasts', x: 79, y: 56 }
    ]
  },
  {
    id: 'infra',
    name: 'Layer 3 · Physical & Digital Infrastructure',
    note: 'Makes the co-fabrication promise possible',
    ring: 'Infrastructure',
    people: [
      { label: 'Material Suppliers', x: 50, y: 14 },
      { label: 'Payment Infrastructure', x: 17, y: 32 },
      { label: 'Fabrication Partners', x: 83, y: 32 },
      { label: 'Verification & Trust', x: 17, y: 68 },
      { label: 'Logistics & Fulfilment', x: 83, y: 68 }
    ]
  },
  {
    id: 'company',
    name: 'Layer 4 · Company & Capital',
    note: 'Builds, funds and grows the ecosystem',
    ring: 'Company & capital',
    people: [
      { label: 'Takshila Internal Team', x: 19, y: 15 },
      { label: 'Investors', x: 81, y: 15 },
      { label: 'Strategic Partners', x: 92, y: 50 }
    ]
  }
];

const OUTCOMES = [
  { title: 'Unique personalised products', note: 'Designed by people, made for people' },
  { title: 'Direct collaboration', note: 'No traditional middlemen' },
  { title: 'Transparent & ethical supply chains', note: 'Know who made it and where it came from' },
  { title: 'Creator empowerment', note: 'Fair chances and global reach' },
  { title: 'Community & cultural impact', note: 'Reviving craft and supporting artisans' }
];

// Ring label positions (bottom of each ring), innermost first.
const RING_LABEL_Y = { core: 66, demand: 76.5, infra: 86.5, company: 96 };

// Hovering a stakeholder, or a layer in the legend, lights up that whole layer:
// its ring is outlined, its chips lift, and the other layers fade back.
const StakeholderMap = () => {
  const [layer, setLayer] = useState(null);
  const [person, setPerson] = useState(null);
  const leave = () => {
    setLayer(null);
    setPerson(null);
  };

  return (
  <div className="sm" data-active={layer || undefined}>
    <p className="sm-lead">A connected ecosystem for co-creation, craftsmanship and conscious commerce.</p>

    <div className="sm-body">
      <div className="sm-side">
        <ol className="sm-layers">
          {LAYERS.map(layer => (
            <li
              key={layer.id}
              className="sm-layer"
              data-layer={layer.id}
              onMouseEnter={() => setLayer(layer.id)}
              onMouseLeave={leave}
            >
              <span className="sm-swatch" aria-hidden="true" />
              <div>
                <p className="sm-layer-name">{layer.name}</p>
                <p className="sm-note">{layer.note}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="sm-outcome">
          <h3>The Outcome</h3>
          <p className="sm-note">A thriving ecosystem where imagination meets craft.</p>
          <ul>
            {OUTCOMES.map(o => (
              <li key={o.title}>
                <p className="sm-outcome-title">{o.title}</p>
                <p className="sm-note">{o.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="sm-diagram" aria-hidden="true">
        <div className="sm-rings">
          {/* Each ring is also a hover target for its layer (inner rings sit on top of outer ones). */}
          {['company', 'infra', 'demand', 'core'].map(id => (
            <span key={id} className="sm-ring" data-layer={id} onMouseEnter={() => setLayer(id)} onMouseLeave={leave} />
          ))}
          <span className="sm-centre">
            <strong>Takshila</strong>
            <small>
              Design · Collaborate
              <br />
              Create · Own
            </small>
          </span>
          {LAYERS.map(layer => (
            <span key={`${layer.id}-label`} className="sm-ring-label" style={{ top: `${RING_LABEL_Y[layer.id]}%` }}>
              {layer.ring}
            </span>
          ))}
          {LAYERS.flatMap(layer =>
            layer.people.map(p => (
              <span
                key={p.label}
                className="sm-chip"
                data-layer={layer.id}
                data-on={person === p.label ? '' : undefined}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onMouseEnter={() => {
                  setLayer(layer.id);
                  setPerson(p.label);
                }}
                onMouseLeave={leave}
              >
                <i aria-hidden="true" />
                {p.label}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default StakeholderMap;
