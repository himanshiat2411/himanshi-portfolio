import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import finworldDashboard from '../assets/finworld/intro/dashboard.webp';
import finworldFilm from '../assets/finworld/film/tile.mp4';
import finworldLaptop from '../assets/work/finworld-laptop.webp';
import grubNGrabIntro from '../assets/grub-n-grab/videos/1.mp4';
import grubNGrabPrototype from '../assets/grub-n-grab/videos/2.mp4';
import grubNGrabPhones from '../assets/work/grub-n-grab-phones.webp';
import takshilaFilm from '../assets/takshila/film/tile.mp4';
import takshilaAsk from '../assets/takshila/screen-ask-first.webp';
import takshilaThumb from '../assets/work/takshila-thumb.webp';
import sylusAgency from '../assets/sylus/agency-overview.webp';
import sylusThumb from '../assets/work/sylus-thumb.webp';
import sylusVibe from '../assets/sylus/brand-vibe.webp';
import SelectedWorkGrid from './SelectedWorkGrid';
import './SelectedWork.css';

// One full card per case study, in the project's own colours. `media` is a big looping film or
// video followed by two stills.
const PROJECTS = [
  {
    title: 'Takshila',
    to: '/work/takshila',
    headline: 'Jewelry anyone can design, with AI.',
    tag: 'Product design · 6 months',
    text: 'Redesigned key screens like the product page for easier flows, led 5 JTBD interviews, audited 11 flows and wrote 2 PRDs.',
    theme: { bg: '#2b1016', fg: '#f5efe7', accent: '#c09435' },
    media: [{ video: takshilaFilm }, { img: takshilaAsk }, { img: takshilaThumb }]
  },
  {
    title: 'Finworld',
    to: '/work/finworld',
    headline: 'Financial models anyone can read.',
    tag: 'Design sprint · 2026',
    text: 'Designed a full financial modeling dashboard in a 55-hour sprint, built around 3 core problems and 2 personas.',
    theme: { bg: '#2265ff', fg: '#ffffff', accent: '#c6ff3d' },
    media: [{ video: finworldFilm }, { img: finworldDashboard }, { img: finworldLaptop, bg: '#dcdcdc' }]
  },
  {
    title: 'Grub’n Grab',
    to: '/work/grub-n-grab',
    headline: 'Campus thrift, built on what students said.',
    tag: 'Mobile app · 16 weeks',
    text: 'Turned 10 user interviews and a 5-competitor analysis into a design system and complete error states.',
    theme: { bg: '#034a3e', fg: '#eaf6e2', accent: '#c6ff3d' },
    media: [{ video: grubNGrabIntro }, { video: grubNGrabPrototype }, { img: grubNGrabPhones, bg: '#d0edc5' }]
  },
  {
    title: 'Sylus AI',
    to: '/work/sylus-ai',
    headline: 'Paste your website. Get a month of posts.',
    tag: 'Product design · AI platform',
    text: 'Designed an AI marketing platform end to end: onboarding that learns your brand, AI post creation and planning, and an agency workspace for many clients.',
    theme: { bg: '#2a0b3a', fg: '#f7eef8', accent: '#e2685c' },
    media: [{ img: sylusThumb }, { img: sylusVibe }, { img: sylusAgency }]
  }
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const Media = ({ item }) =>
  item.video ? (
    <video src={item.video} autoPlay muted loop playsInline preload="metadata" />
  ) : (
    <img src={item.img} alt="" loading="lazy" style={item.bg ? { background: item.bg } : undefined} />
  );

// Phones keep the earlier grid; the deck below is for larger screens.
const PHONE = '(max-width: 720px)';
const usePhone = () => {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const onChange = () => setPhone(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return phone;
};

const SelectedWork = () => (usePhone() ? <SelectedWorkGrid /> : <SelectedWorkDeck />);

// A deck of cards that stays pinned while you scroll: the front card slides up and away, and the
// next one, already peeking out underneath, comes forward.
const SelectedWorkDeck = () => {
  const stackRef = useRef(null);
  const cursorRef = useRef(null);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const count = PROJECTS.length;

  // Over a card with a case study, a "View case study" pill follows the pointer in place of the
  // cursor, and a click anywhere on the card opens it. What's under the pointer is checked on every
  // move and scroll, so the pill goes away as soon as the pointer is off the cards.
  useEffect(() => {
    const stack = stackRef.current;
    const pill = cursorRef.current;
    let x = -1;
    let y = -1;
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = x < 0 ? null : document.elementFromPoint(x, y);
      const card = el && stack.contains(el) ? el.closest('.work-card[data-link]') : null;
      setHover(card ? PROJECTS[Number(card.dataset.index)] : null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const onMove = e => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      pill.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      schedule();
    };
    const onOut = e => {
      if (!e.relatedTarget) {
        x = -1;
        schedule();
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    document.addEventListener('pointerout', onOut);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
      document.removeEventListener('pointerout', onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const stack = stackRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = stack.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const t = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      const p = t * (count - 1);
      stack.style.setProperty('--p', p);
      setActive(Math.round(p));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  return (
    <section className="work" id="work">
      <div className="container">
        <h2 className="work-heading">Selected work</h2>
      </div>
      <div ref={stackRef} className="work-stack" style={{ '--count': count }}>
        <div className="work-pin">
          <ol className="work-deck">
            {PROJECTS.map((project, i) => {
              const n = String(i + 1).padStart(2, '0');
              const style = { '--i': i, '--bg': project.theme.bg, '--fg': project.theme.fg, '--acc': project.theme.accent, zIndex: count - i };
              return (
                <li
                  key={project.title}
                  className="work-card"
                  style={style}
                  aria-current={i === active ? 'true' : undefined}
                  data-link={project.to ? '' : undefined}
                  data-index={i}
                  onClick={e => {
                    if (project.to && !e.target.closest('a')) navigate(project.to);
                  }}
                >
                  <div className="work-card-top">
                    <h3 className="work-headline">{project.headline}</h3>
                    <span className="work-num">({n})</span>
                  </div>
                  <p className="work-text">{project.text}</p>
                  <div className="work-card-bottom">
                    <div className="work-meta">
                      <span className="work-name">{project.title}</span>
                      <span className="work-tag">{project.tag}</span>
                      {project.to ? (
                        <Link to={project.to} className="work-cta" aria-label={`${project.title} case study`}>
                          View case study <Arrow />
                        </Link>
                      ) : (
                        <span className="work-cta work-cta--soon">Coming soon</span>
                      )}
                    </div>
                    {project.media.length > 0 && (
                      <div className="work-media">
                        {project.media.map((m, k) => (
                          <span key={k} className={`work-thumb${k === 0 ? ' work-thumb--lead' : ''}`}>
                            <Media item={m} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <span
        ref={cursorRef}
        className="work-cursor"
        data-on={hover ? '' : undefined}
        style={hover ? { '--bg': hover.theme.bg, '--acc': hover.theme.accent } : undefined}
        aria-hidden="true"
      >
        <span className="work-cursor-pill">
          View case study <Arrow />
        </span>
      </span>
    </section>
  );
};

export default SelectedWork;
