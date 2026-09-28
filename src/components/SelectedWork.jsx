import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import finworldBg from '../assets/work/finworld-bg.webp';
import finworldLaptop from '../assets/work/finworld-laptop.webp';
import grubNGrabBg from '../assets/work/grub-n-grab-bg.webp';
import grubNGrabPhones from '../assets/work/grub-n-grab-phones.webp';
import takshilaBg from '../assets/work/takshila-bg.webp';
import takshilaScreenCentre from '../assets/work/takshila-screen-centre.webp';
import takshilaScreenLeft from '../assets/work/takshila-screen-left.webp';
import takshilaScreenRight from '../assets/work/takshila-screen-right.webp';
import './SelectedWork.css';

// Each thumbnail is a stack of same-size layers over a background (`ratio` is their width / height).
// On hover, layers with a `from` offset (a percentage of the thumbnail) rise from there into place,
// after an optional `delay`; `shadow` gives a cut-out layer a soft drop shadow. `zoom` scales the
// thumbnail within its tile, with `backdrop` filling any edge it uncovers.
const PROJECTS = [
  {
    title: 'Takshila',
    to: '/work/takshila',
    ratio: '3 / 2',
    layers: [
      { src: takshilaBg },
      { src: takshilaScreenLeft, from: '0 60%', delay: 120 },
      { src: takshilaScreenRight, from: '0 60%', delay: 120 },
      { src: takshilaScreenCentre, from: '0 60%' }
    ]
  },
  {
    title: 'Finworld',
    to: '/work/finworld',
    wide: true,
    ratio: '1100 / 917',
    zoom: 0.995,
    backdrop: '#dcdcdc',
    layers: [{ src: finworldBg }, { src: finworldLaptop, from: '0 75%' }]
  },
  {
    title: 'Grub’n Grab',
    to: '/work/grub-n-grab',
    wide: true,
    ratio: '1100 / 666',
    layers: [{ src: grubNGrabBg }, { src: grubNGrabPhones, from: '0 85%', shadow: true }]
  },
  { title: 'Sylus AI' }
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
      <span className="work-stage" style={{ '--ratio': project.ratio, '--zoom': project.zoom }}>
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
    </span>
  );
};

// Bento grid of project tiles (after 21st.dev's ConditionGrid). At rest each tile sits under a
// dark veil with its name; hovering lifts the veil and plays the tile's build-in. Each tile
// also rises in the first time it scrolls into view.
const SelectedWork = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll('.work-tile');
    if (!tiles?.length) return undefined;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.dataset.shown = '';
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    tiles.forEach(tile => observer.observe(tile));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="work" id="work">
      <div className="container">
        <h2 className="work-heading">Selected work</h2>
        <ul ref={gridRef} className="work-grid">
          {PROJECTS.map(project => {
            const body = (
              <>
                <Thumb project={project} />
                <span className="work-veil" aria-hidden="true">
                  <span className="work-veil-title">{project.title}</span>
                </span>
                <span className="work-bar">
                  <span className="work-name">{project.title}</span>
                  {project.to ? (
                    <span className="work-arrow">
                      <ArrowUpRight />
                    </span>
                  ) : (
                    <span className="work-soon">Coming soon</span>
                  )}
                </span>
              </>
            );
            return (
              <li key={project.title} className={`work-tile${project.wide ? ' work-tile--wide' : ''}`}>
                {project.to ? (
                  <Link to={project.to} className="work-card" aria-label={`${project.title} case study`}>
                    {body}
                  </Link>
                ) : (
                  <div className="work-card work-card--soon" tabIndex={0} aria-label={`${project.title}, coming soon`}>
                    {body}
                  </div>
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
