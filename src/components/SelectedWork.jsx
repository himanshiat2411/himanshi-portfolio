import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import finworldBg from '../assets/work/finworld-bg.webp';
import finworldLaptop from '../assets/work/finworld-laptop.webp';
import grubNGrabBg from '../assets/work/grub-n-grab-bg.webp';
import grubNGrabPhones from '../assets/work/grub-n-grab-phones.webp';
import takshilaThumb from '../assets/work/takshila-thumb.webp';
import takshilaThumbMobile from '../assets/work/takshila-thumb-mobile.webp';
import './SelectedWork.css';

// Each thumbnail is a stack of same-size layers over a background (`ratio` is their width / height).
// On hover, layers with a `from` offset (a percentage of the thumbnail) rise from there into place,
// after an optional `delay`; `shadow` gives a cut-out layer a soft drop shadow. `zoom` scales the
// thumbnail within its tile, with `backdrop` filling any edge it uncovers. `mobile` swaps in a
// single image made for the phone tile's shape.
const PROJECTS = [
  {
    title: 'Takshila',
    to: '/work/takshila',
    kind: 'Social commerce · Jewelry',
    text: 'A handcrafted jewelry marketplace with no playbook, so we built one around its users.',
    stats: [['6 months', 'Timeline'], ['Intern', 'Product Design'], ['JTBD', 'Research']],
    ratio: '491 / 420',
    layers: [{ src: takshilaThumb }],
    mobile: { ratio: '358 / 240', src: takshilaThumbMobile }
  },
  {
    title: 'Finworld',
    to: '/work/finworld',
    kind: 'FinTech · Dashboard',
    text: 'A financial modeling platform made clear, collaborative and easy to learn.',
    stats: [['55 hrs', 'Design sprint'], ['2', 'Personas'], ['AI', 'Nova assistant']],
    wide: true,
    ratio: '1100 / 917',
    zoom: 0.995,
    backdrop: '#dcdcdc',
    layers: [{ src: finworldBg }, { src: finworldLaptop, from: '0 75%' }]
  },
  {
    title: 'Grub’n Grab',
    to: '/work/grub-n-grab',
    kind: 'C2C marketplace · Mobile app',
    text: 'A campus thrift app for finding affordable, trustworthy second-hand items.',
    stats: [['16 weeks', 'Timeline'], ['10', 'Interviews'], ['5', 'Competitors studied']],
    wide: true,
    ratio: '1100 / 666',
    layers: [{ src: grubNGrabBg }, { src: grubNGrabPhones, from: '0 85%', shadow: true }]
  },
  {
    title: 'Sylus AI',
    kind: 'AI product',
    text: 'In progress. The case study is on its way.',
    stats: []
  }
];

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 5h6v6" />
    <path d="M19 5 5 19" />
  </svg>
);

const Thumb = ({ project }) => {
  if (!project.layers) return <span className="work-thumb work-thumb--empty" aria-hidden="true" />;
  return (
    <span className="work-thumb" aria-hidden="true" style={{ background: project.backdrop }}>
      <span
        className={`work-stage${project.mobile ? ' work-stage--desktop' : ''}`}
        style={{ '--ratio': project.ratio, '--zoom': project.zoom }}
      >
        {project.layers.map(layer => (
          <img
            key={layer.src}
            className={`work-layer${layer.shadow ? ' work-layer--shadow' : ''}`}
            src={layer.src}
            alt=""
            loading="lazy"
            data-moves={layer.from ? '' : undefined}
            style={layer.from ? { '--from': layer.from, '--delay': `${layer.delay || 0}ms` } : undefined}
          />
        ))}
      </span>
      {project.mobile && (
        <span className="work-stage work-stage--mobile" style={{ '--ratio': project.mobile.ratio }}>
          <img className="work-layer" src={project.mobile.src} alt="" loading="lazy" />
        </span>
      )}
    </span>
  );
};

// Stacking cards (after Khoa Phan's StackingCards): each card sticks near the top of the screen
// and the next one slides over it; cards underneath shrink and dim as more pile on.
const SelectedWork = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const items = [...(listRef.current?.querySelectorAll('.stack-item') || [])];
    if (!items.length) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const tops = items.map(item => item.getBoundingClientRect().top);
      items.forEach((item, i) => {
        // how many cards have slid over this one (fractional while one is arriving)
        let over = 0;
        for (let j = i + 1; j < items.length; j++) over += Math.min(1, Math.max(0, 1 - (tops[j] - j * 24) / vh));
        item.style.setProperty('--over', over.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="work" id="work">
      <div className="container">
        <h2 className="work-heading">Selected work</h2>
        <ul ref={listRef} className="stack">
          {PROJECTS.map((project, i) => {
            const body = (
              <>
                <div className="stack-info">
                  <span className="stack-num">{String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
                  <span className="stack-kind">{project.kind}</span>
                  <h3 className="stack-title">{project.title}</h3>
                  <p className="stack-text">{project.text}</p>
                  {project.stats.length > 0 && (
                    <dl className="stack-stats">
                      {project.stats.map(([value, label]) => (
                        <div key={label}>
                          <dt>{value}</dt>
                          <dd>{label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {project.to ? (
                    <span className="stack-cta">
                      View case study <ArrowUpRight />
                    </span>
                  ) : (
                    <span className="work-soon">Coming soon</span>
                  )}
                </div>
                <div className="stack-media">
                  <Thumb project={project} />
                </div>
              </>
            );
            return (
              <li key={project.title} className="stack-item" style={{ '--i': i }}>
                {project.to ? (
                  <Link to={project.to} className="stack-card" aria-label={`${project.title} case study`}>
                    {body}
                  </Link>
                ) : (
                  <div className="stack-card stack-card--soon">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SelectedWork;
