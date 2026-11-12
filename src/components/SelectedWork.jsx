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
import sylusFilm from '../assets/sylus/film/tile.mp4';
import sylusCover from '../assets/work/sylus-cover.webp';
import sylusCoverHover from '../assets/work/sylus-cover-hover.webp';
import sylusVibe from '../assets/sylus/brand-vibe.webp';
import sutraFilm from '../assets/sutra/tile.mp4';
import sutraMoon from '../assets/sutra/moods.webp';
import sutraKamala from '../assets/sutra/kamala-6.webp';
import flowerLily from '../assets/work/flower-lily.webp';
import SelectedWorkGrid from './SelectedWorkGrid';
import WorkImpact from './WorkImpact';
import WorkTabs, { inTab } from './WorkTabs';
import './SelectedWork.css';

// One full card per case study, in the project's own colours (`surface` can swap the card's solid
// background for a gradient). `media` is a big looping film or
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
    theme: { bg: '#2265ff', fg: '#ffffff', accent: '#c6ff3d', tag: '#ffffff' },
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
    tag: 'Product design · AI-powered CRM',
    text: 'Designed an AI-powered marketing CRM end to end: onboarding that learns your brand, AI post creation and planning, and a CRM for agencies running many clients.',
    theme: { bg: '#7c3f7b', fg: '#ffffff', accent: '#ffd6c9', surface: 'linear-gradient(135deg, #7c3f7b 0%, #e0508f 55%, #ee8063 100%)' },
    media: [{ video: sylusFilm }, { img: sylusCover, hover: sylusCoverHover }, { img: sylusVibe }]
  },
  {
    title: 'Sutra',
    to: '/work/sutra',
    headline: 'A city that moves, and an AI that guides you.',
    tag: 'AI concept · Design competition',
    theme: { bg: '#17112f', fg: '#ffffff', accent: '#b9a6ff' },
    media: [{ video: sutraFilm }, { img: sutraMoon }, { img: sutraKamala }]
  },
  {
    title: 'If I Were a Flower',
    to: '/work/if-i-were-a-flower',
    headline: 'If I Were a Flower',
    tag: 'Scroll story · Visual storytelling',
    brief: {
      lead: 'A lily grows quietly for a long time before anyone sees it bloom. That’s my story too.',
      title: 'Why a lily',
      text: 'A lily spends months as a bulb in the dark. Then one stem rises, and the flower opens one petal at a time. My path went the same way: from chemical engineering to design, slow growth that only shows when it is ready.',
      how: 'Scroll the story and the lily grows with you: bulb, stem, bloom, pollen.'
    },
    theme: { bg: '#000000', fg: '#f2f2f2', accent: '#7c8cf0', border: '1px solid #ffffff' },
    media: [{ img: flowerLily, fit: 'lily' }]
  }
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

// `hover` swaps in a second image while the card is hovered.
const Media = ({ item }) =>
  item.hover ? (
    <span className="work-swap">
      <img src={item.img} alt="" loading="lazy" />
      <img src={item.hover} alt="" loading="lazy" data-hover="" />
    </span>
  ) : item.video ? (
    <video src={item.video} autoPlay muted loop playsInline preload="auto" />
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

const SelectedWork = () => {
  const [tab, setTab] = useState('work');
  const phone = usePhone();
  // The deck is keyed by tab, so its scroll-driven state starts fresh when the tab changes.
  return phone ? <SelectedWorkGrid tab={tab} onTab={setTab} /> : <SelectedWorkDeck key={tab} tab={tab} onTab={setTab} />;
};

// A deck of cards that stays pinned while you scroll: the front card slides up and away, and the
// next one, already peeking out underneath, comes forward.
const SelectedWorkDeck = ({ tab, onTab }) => {
  const projects = PROJECTS.filter(p => inTab(tab, p.title));
  const stackRef = useRef(null);
  const cursorRef = useRef(null);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const count = projects.length;

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
      setHover(card ? projects[Number(card.dataset.index)] : null);
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
        <h2 className="work-heading">
          <WorkTabs tab={tab} onTab={onTab} />
        </h2>
      </div>
      <div ref={stackRef} className="work-stack" style={{ '--count': count }}>
        <div className="work-pin">
          <ol className="work-deck">
            {projects.map((project, i) => {
              const n = String(i + 1).padStart(2, '0');
              const style = { '--i': i, '--bg': project.theme.bg, '--fg': project.theme.fg, '--acc': project.theme.accent, '--surface': project.theme.surface, '--tag': project.theme.tag, border: project.theme.border, zIndex: count - i };
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
                  <div className="work-card-body">
                    {project.brief ? (
                      <div className="work-brief">
                        <p className="work-brief-lead">{project.brief.lead}</p>
                        <h4>{project.brief.title}</h4>
                        <p>{project.brief.text}</p>
                        <p className="work-brief-how">{project.brief.how}</p>
                      </div>
                    ) : (
                      <WorkImpact title={project.title} />
                    )}
                    <div className="work-card-side">
                      <div className="work-media">
                        {project.media.map((m, k) => (
                          <span key={k} className={`work-thumb${k === 0 ? ' work-thumb--lead' : ''}${m.fit ? ` work-thumb--${m.fit}` : ''}`}>
                            <Media item={m} />
                          </span>
                        ))}
                      </div>
                      <div className="work-meta">
                        <Link to={project.to} className="work-name" aria-label={`${project.title} case study`}>
                          {project.title}
                        </Link>
                        <span className="work-tag">{project.tag}</span>
                      </div>
                    </div>
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
