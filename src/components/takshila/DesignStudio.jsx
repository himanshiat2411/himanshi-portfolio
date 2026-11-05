import { useState } from 'react';

import ringImg from '../../assets/takshila/opt-main.webp';
import roseImg from '../../assets/takshila/opt-rose.webp';
import whiteImg from '../../assets/takshila/opt-white.webp';
import yellowImg from '../../assets/takshila/opt-yellow-3.webp';
import './DesignStudio.css';

// The Takshila "Design Studio" story as a run of visual panels: one idea, one visual and one short
// caption each. The visuals are drawn in code from the Studio's design rules, not product screenshots.

export const Panel = ({ n, title, caption, children }) => (
  <section className="ds-panel">
    <header>
      {n && <span className="ds-num">{String(n).padStart(2, '0')}</span>}
      <h3>{title}</h3>
    </header>
    <div className="ds-visual">{children}</div>
    <p className="ds-caption">{caption}</p>
  </section>
);

const Bubble = ({ children, from = 'user' }) => <p className={`ds-bubble ds-bubble--${from}`}>{children}</p>;

const Arrow = () => (
  <span className="ds-arrow" aria-hidden="true">
    →
  </span>
);

// Rose gold leaf hoops; `size` scales them, so a version change is visible.
const Hoops = ({ size = 1 }) => (
  <svg viewBox="0 0 240 150" className="ds-hoops" role="img" aria-label="A pair of rose gold leaf hoop earrings">
    {[64, 176].map(x => (
      <g key={x} transform={`translate(${x} 75) scale(${size})`}>
        <circle r="38" fill="none" stroke="#c98f78" strokeWidth="6" />
        {[0, 60, 120, 180, 240, 300].map(a => (
          <ellipse key={a} cx="38" cy="0" rx="9" ry="4" fill="#b87a64" transform={`rotate(${a}) rotate(35 38 0)`} />
        ))}
      </g>
    ))}
  </svg>
);

const JOURNEY = [
  { step: 'Describe', note: 'Say it your way', thumb: 'chat' },
  { step: 'Understand', note: 'Idea becomes tags', thumb: 'chips' },
  { step: 'Questions', note: 'Only if vague', thumb: 'ask', optional: true },
  { step: 'Directions', note: 'Three to choose', thumb: 'three' },
  { step: 'Refine', note: 'Edit by chatting', thumb: 'version' },
  { step: 'Materials', note: 'Metal sets price', thumb: 'swatch' },
  { step: 'Checkout', note: 'Made to order', thumb: 'pay' }
];

const SPEC = ['Category', 'Shape', 'Stone', 'Gem colour', 'Metal', 'Style', 'Occasion', 'Details'];
const FOUND = {
  Category: 'Earrings',
  Metal: 'Rose gold',
  Style: 'Nature-inspired',
  Occasion: 'Gift for her'
};

const RULES = [
  { icon: '✋', text: 'A chip never sends a message on its own' },
  { icon: '①', text: 'One answer per question' },
  { icon: '✦', text: '“Surprise me” is always offered' },
  { icon: '⌨', text: '36px min height, keyboard reachable, aria-pressed' }
];

const DIRECTIONS = [
  { name: 'Timeless', img: ringImg, text: 'A classic oval on a slim band.' },
  { name: 'Modern', img: whiteImg, text: 'Cool metal, clean and bright.', crop: true },
  { name: 'Signature', img: roseImg, text: 'Warm rose gold, one of a kind.', crop: true }
];

const METALS = [
  { img: yellowImg, name: 'Yellow' },
  { img: whiteImg, name: 'White' },
  { img: roseImg, name: 'Rose' }
];

const CARDS = ['Understand', 'Questions', 'Generating', 'Directions', 'Version', 'Name', 'Materials', 'Summary', 'Review', 'Published'];
const VERSIONS = [1, 1.1, 1.2, 1.3];

const DesignStudio = () => {
  const [version, setVersion] = useState(1);
  const [compare, setCompare] = useState(false);

  return (
    <div className="ds">
      <Panel n={1} title="The problem" caption="Custom jewelry usually means long forms and back-and-forth with a jeweller. People know what they want but can’t spec it.">
        <div className="ds-row">
          <div className="ds-form" role="img" aria-label="A long form, crossed out">
            {['Metal type', 'Karat', 'Stone shape', 'Carat weight', 'Setting', 'Band width'].map(f => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <Arrow />
          <Bubble>Something like my grandmother’s ring</Bubble>
        </div>
      </Panel>

      <Panel n={2} title="The solution in one line" caption="Describe it in your own words. Get a priced, made-to-order piece.">
        <div className="ds-row">
          <Bubble>An oval diamond ring in yellow gold with a hidden halo</Bubble>
          <Arrow />
          <figure className="ds-product">
            <img src={ringImg} alt="An oval diamond ring in yellow gold" loading="lazy" />
            <figcaption>
              Oval halo ring <b>$1,240</b>
            </figcaption>
          </figure>
        </div>
      </Panel>

      <Panel n={3} title="The 7-step journey" caption="Seven steps from an idea to an order. Questions appear only when the idea is vague.">
        <ol className="ds-journey">
          {JOURNEY.map(j => (
            <li key={j.step} data-optional={j.optional ? '' : undefined}>
              <span className={`ds-thumb ds-thumb--${j.thumb}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <b>{j.step}</b>
              <small>{j.note}</small>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel n={4} title="How the chat understands you" caption="Every new message only changes what it mentions — nothing said earlier is lost.">
        <Bubble>rose gold leaf hoops for my sister</Bubble>
        <div className="ds-spec">
          {SPEC.map(field => (
            <span key={field} className="ds-spec-chip" data-on={FOUND[field] ? '' : undefined}>
              <small>{field}</small>
              {FOUND[field] || '—'}
            </span>
          ))}
        </div>
      </Panel>

      <Panel n={5} title="When the chat asks questions" caption="Ask only for the gaps. Never more than three.">
        <div className="ds-tree">
          <p className="ds-tree-q">
            Is the brief vague?
            <small>No category, or fewer than 2 of: style, stone/shape, metal, details</small>
          </p>
          <div className="ds-tree-branches">
            <div>
              <b>No</b>
              <p>Go straight to 3 directions</p>
            </div>
            <div>
              <b>Yes</b>
              <p>Ask max 3 questions, in order:</p>
              <ol>
                <li>What are we making?</li>
                <li>What feeling?</li>
                <li>Which stone?</li>
                <li>Who is it for?</li>
              </ol>
            </div>
          </div>
        </div>
      </Panel>

      <Panel n={6} title="Chip design rules" caption="Small rules that keep every answer deliberate and reachable.">
        <div className="ds-chips">
          <span className="ds-chip">Default</span>
          <span className="ds-chip ds-chip--hover">Hover</span>
          <span className="ds-chip ds-chip--on">Selected</span>
          <span className="ds-chip">✦ Surprise me</span>
          <span className="ds-chip">Other…</span>
        </div>
        <ul className="ds-rules">
          {RULES.map(r => (
            <li key={r.text}>
              <span aria-hidden="true">{r.icon}</span>
              {r.text}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel n={7} title="Three directions, not one" caption="Showing several directions avoids people fixating on the first AI result.">
        <div className="ds-directions">
          {DIRECTIONS.map(d => (
            <article key={d.name}>
              <span className="ds-img">
                <img src={d.img} alt={`${d.name} direction ring`} loading="lazy" data-crop={d.crop ? '' : undefined} />
              </span>
              <b>{d.name}</b>
              <p>{d.text}</p>
              <span className="ds-cta">Choose this direction</span>
            </article>
          ))}
        </div>
        <div className="ds-chips">
          <span className="ds-chip ds-chip--on">Show 3 new</span>
          {['Simpler', 'Bolder', 'More vintage', 'More classic'].map(t => (
            <span key={t} className="ds-chip">
              {t}
            </span>
          ))}
        </div>
      </Panel>

      <Panel n={8} title="Refine with versions" caption="Every edit is a new version. Nothing is ever lost.">
        <Bubble>make the hoops a little bigger</Bubble>
        <Bubble from="ai">Here’s v2. Everything else is kept.</Bubble>
        <div className="ds-stage">
          {compare && (
            <figure>
              <Hoops size={VERSIONS[0]} />
              <figcaption>v1</figcaption>
            </figure>
          )}
          <figure>
            <Hoops size={VERSIONS[version]} />
            <figcaption>v{version + 1}</figcaption>
          </figure>
        </div>
        <div className="ds-versions">
          {VERSIONS.map((_, i) => (
            <button key={i} type="button" aria-pressed={i === version} onClick={() => setVersion(i)}>
              v{i + 1}
            </button>
          ))}
          <button type="button" className="ds-compare" aria-pressed={compare} onClick={() => setCompare(c => !c)}>
            Compare with v1
          </button>
        </div>
      </Panel>

      <Panel n={9} title="Materials and live price" caption="Price follows the materials, not the picture.">
        <div className="ds-materials">
          <div>
            <small>Metal</small>
            <div className="ds-metals">
              {METALS.map((m, i) => (
                <span key={m.name} data-on={i === 0 ? '' : undefined}>
                  <span className="ds-img">
                    <img src={m.img} alt="" loading="lazy" data-crop="" />
                  </span>
                  {m.name}
                </span>
              ))}
            </div>
            <small>Karat</small>
            <div className="ds-chips">
              <span className="ds-chip">10K</span>
              <span className="ds-chip ds-chip--on">14K</span>
              <span className="ds-chip">18K</span>
            </div>
            <small>Size and stone</small>
            <div className="ds-chips">
              <span className="ds-chip">Size 7</span>
              <span className="ds-chip">Oval diamond</span>
            </div>
          </div>
          <aside>
            <small>Live price</small>
            <strong>$1,240</strong>
            <p>Showing your earlier materials</p>
            <span className="ds-cta">Update design</span>
          </aside>
        </div>
      </Panel>

      <Panel n={10} title="Every AI reply is a card" caption="The AI fills cards — it never draws the interface. That keeps the experience predictable and on-brand.">
        <ul className="ds-cards">
          {CARDS.map(c => (
            <li key={c}>
              <span aria-hidden="true">
                <i />
                <i />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel n={11} title="Two users, one chat" caption="The same conversation serves someone buying a piece and someone publishing one.">
        <div className="ds-users">
          <div>
            <b>Buyer</b>
            <p>
              Idea / photo / remix <Arrow /> Design <Arrow /> Buy now
            </p>
          </div>
          <div>
            <b>Designer</b>
            <p>
              Idea <Arrow /> Design <Arrow /> Name <Arrow /> Review <Arrow /> Published
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default DesignStudio;
