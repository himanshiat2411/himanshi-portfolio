import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import finworldBg from '../assets/work/finworld-bg.webp';
import finworldLaptop from '../assets/work/finworld-laptop.webp';
import grubNGrabBg from '../assets/work/grub-n-grab-bg.webp';
import grubNGrabPhones from '../assets/work/grub-n-grab-phones.webp';
import takshilaThumb from '../assets/work/takshila-thumb.webp';
import grubNGrabIntro from '../assets/grub-n-grab/videos/1.mp4';
import grubNGrabPrototype from '../assets/grub-n-grab/videos/2.mp4';
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
    caption: 'Takshila — handcrafted jewelry marketplace',
    tag: 'Product design · 6 months',
    loop: { page: '/loop/takshila?hold=3500' },
    ratio: '491 / 420',
    layers: [{ src: takshilaThumb }],
    mobile: { ratio: '358 / 240', src: takshilaThumbMobile }
  },
  {
    title: 'Finworld',
    to: '/work/finworld',
    caption: 'Finworld — financial modeling dashboard',
    tag: 'Design sprint · 2026',
    loop: { page: '/loop/finworld' },
    wide: true,
    ratio: '1100 / 917',
    zoom: 0.995,
    backdrop: '#dcdcdc',
    layers: [{ src: finworldBg }, { src: finworldLaptop, from: '0 75%' }]
  },
  {
    title: 'Grub’n Grab',
    to: '/work/grub-n-grab',
    caption: 'Grub’n Grab — campus thrift app',
    tag: 'Mobile app · 16 weeks',
    loop: { videos: [grubNGrabIntro, grubNGrabPrototype], background: '#034a3e' },
    wide: true,
    ratio: '1100 / 666',
    layers: [{ src: grubNGrabBg }, { src: grubNGrabPhones, from: '0 85%', shadow: true }]
  },
  { title: 'Sylus AI', caption: 'Sylus AI', tag: 'Coming soon' }
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

// The case study's own intro, looping silently over the thumbnail. Videos play one after another
// and repeat. An animated intro runs on its /loop page, shown in an iframe drawn at desktop size
// and scaled down to the tile so it looks the same as on the case study; when that page says it
// is holding between runs, the layer fades out so the thumbnail shows in the gap.
const FRAME_W = 1440;
const FRAME_H = 900;

const IntroLoopLayer = ({ loop }) => {
  const boxRef = useRef(null);
  const frameRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [clip, setClip] = useState(0);
  const [holding, setHolding] = useState(false);

  useEffect(() => {
    if (!loop.page || !boxRef.current) return undefined;
    const box = boxRef.current;
    const fit = () => setScale(Math.max(box.clientWidth / FRAME_W, box.clientHeight / FRAME_H));
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    const onMessage = e => {
      if (e.source !== frameRef.current?.contentWindow || !e.data?.introLoop) return;
      setHolding(e.data.introLoop === 'hold');
    };
    window.addEventListener('message', onMessage);
    return () => {
      observer.disconnect();
      window.removeEventListener('message', onMessage);
    };
  }, [loop.page]);

  return (
    <span
      ref={boxRef}
      className={`work-loop${holding ? ' is-holding' : ''}`}
      style={{ background: loop.background }}
      aria-hidden="true"
    >
      {loop.videos ? (
        <video
          key={clip}
          src={loop.videos[clip]}
          autoPlay
          muted
          playsInline
          loop={loop.videos.length === 1}
          onEnded={() => setClip(c => (c + 1) % loop.videos.length)}
        />
      ) : (
        scale > 0 && (
          <iframe
            ref={frameRef}
            src={loop.page}
            title=""
            tabIndex={-1}
            loading="lazy"
            style={{ width: FRAME_W, height: FRAME_H, transform: `translate(-50%, -50%) scale(${scale})` }}
          />
        )
      )}
    </span>
  );
};

// A ruled two-column grid: each cell is a large media box over a caption bar with the project
// on the left and a lime tag on the right. The box loops the case study's intro; hovering
// fades the loop away to show the thumbnail.
const SelectedWork = () => (
  <section className="work" id="work">
    <div className="container">
      <h2 className="work-heading">Selected work</h2>
      <ul className="work-grid">
        {PROJECTS.map(project => {
          const body = (
            <>
              <span className="work-media">
                <Thumb project={project} />
                {project.loop && <IntroLoopLayer loop={project.loop} />}
                {project.to && (
                  <span className="work-arrow">
                    <ArrowUpRight />
                  </span>
                )}
              </span>
              <span className="work-caption">
                <span className="work-name">{project.caption}</span>
                <span className="work-tag">{project.tag}</span>
              </span>
            </>
          );
          return (
            <li key={project.title} className="work-cell">
              {project.to ? (
                <Link to={project.to} className="work-card" aria-label={`${project.title} case study`}>
                  {body}
                </Link>
              ) : (
                <div className="work-card work-card--soon">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default SelectedWork;
