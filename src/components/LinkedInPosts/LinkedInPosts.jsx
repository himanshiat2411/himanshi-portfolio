import { useEffect, useRef } from 'react';

import aiDesigners from '../../assets/linkedin/ai-designers.webp';
import anchoring from '../../assets/linkedin/anchoring.webp';
import braille from '../../assets/linkedin/braille.webp';
import config from '../../assets/linkedin/config.webp';
import presentYourWay from '../../assets/linkedin/present-your-way.webp';
import railways from '../../assets/linkedin/railways-2050.webp';
import scarcity from '../../assets/linkedin/scarcity.webp';
import uxDay from '../../assets/linkedin/ux-day.webp';
import system1 from '../../assets/linkedin/system-1.webp';
import variableRewards from '../../assets/linkedin/variable-rewards.webp';
import './LinkedInPosts.css';

const PROFILE = 'https://www.linkedin.com/in/himanshi-meena-714543231/';
const POST = slug => `https://www.linkedin.com/posts/himanshi-meena-714543231_${slug}/`;

// My LinkedIn posts, newest first. Images are the posts' own, saved locally.
const POSTS = [
  {
    title: 'Designing for System 1 thinking',
    line: 'What Thinking, Fast and Slow taught me about friction.',
    date: 'Jul 2026',
    img: system1,
    href: POST('uxdesign-productdesign-userexperience-share-7480350198897065984-OaBd')
  },
  {
    title: 'Config: Friends of Figma, Jaipur',
    line: 'People don’t buy interfaces. Notes from the day.',
    date: 'Jun 2026',
    img: config,
    href: POST('config-friendsoffigma-uxdesign-ugcPost-7477367308743663618-c54k')
  },
  {
    title: 'Anchoring bias in pricing',
    line: 'How a Sony LIV plan page nudged my choice.',
    date: 'Jun 2026',
    img: anchoring,
    href: POST('uxdesign-uxresearch-uxpsychology-share-7470752069793128448-Ugah')
  },
  {
    title: 'Variable rewards',
    line: 'Atomic Habits, and why some UI keeps us coming back.',
    date: 'May 2026',
    img: variableRewards,
    href: POST('uiux-uxdesign-productdesign-ugcPost-7461288436457508865-pw8W')
  },
  {
    title: 'UX Day 2026 at Microsoft',
    line: 'Being you is the only differentiator.',
    date: 'May 2026',
    img: uxDay,
    href: POST('uxday2026-microsoft-uxdesign-activity-7458486693005021184-kLvt')
  },
  {
    title: 'Research, presented my way',
    line: 'No slides, no fixed format, just the findings.',
    date: 'May 2026',
    img: presentYourWay,
    href: POST('uxdesign-uiux-designthinking-ugcPost-7456169973665796096-wj-M')
  },
  {
    title: 'Invisible accessibility',
    line: 'The Braille on a train seat number.',
    date: 'Apr 2026',
    img: braille,
    href: POST('designthinking-accessibility-userexperience-share-7447261460847747073-BPBx')
  },
  {
    title: 'Indian Railways in 2050',
    line: 'A 4.5-hour live design sprint.',
    date: 'Feb 2026',
    img: railways,
    href: POST('interactiondesign-accessibility-designsprint-ugcPost-7429878941751943168-1JSL')
  },
  {
    title: 'Induced scarcity',
    line: 'An art exhibition, through a UX psychology lens.',
    date: 'Jan 2026',
    img: scarcity,
    href: POST('uxdesign-uxpsychology-productdesign-ugcPost-7415361820825190400-0x-O')
  },
  {
    title: 'Is AI replacing designers?',
    line: 'AI can design a UI. It can’t understand a human.',
    date: 'Nov 2025',
    img: aiDesigners,
    href: POST('uxdesign-aidesign-designthinking-ugcPost-7393633664292753408-kLwo')
  }
];

const Card = ({ post, hidden }) => (
  <li className="li-card">
    <a href={post.href} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>
      <span className="li-card-img">
        <img src={post.img} alt="" decoding="async" />
      </span>
      <span className="li-card-body">
        <span className="li-card-date">{post.date}</span>
        <span className="li-card-title">{post.title}</span>
        <span className="li-card-line">{post.line}</span>
        <span className="li-card-more">Read on LinkedIn ↗</span>
      </span>
    </a>
  </li>
);

// A row of post cards drifting sideways on a loop (a second copy makes it seamless). People can also
// move it themselves: drag it with the mouse, or scroll it sideways (trackpad, or Shift + wheel).
// It pauses while hovered or focused and picks up again from wherever it was left.
const SPEED = 0.5; // px per frame

const LinkedInPosts = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let paused = false;
    let drag = null;
    let frame = 0;

    // The position is kept as a float (scrollLeft may round to whole pixels), and inside the first
    // copy so the row loops without a jump. If the person moved the row, carry on from there.
    let pos = 0;
    const tick = () => {
      if (Math.abs(track.scrollLeft - pos) > 1) pos = track.scrollLeft;
      if (!paused && !drag && !still) pos += SPEED;
      const loop = track.firstElementChild.offsetWidth;
      if (pos >= loop) pos -= loop;
      else if (pos <= 0) pos += loop;
      track.scrollLeft = pos;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const pause = () => (paused = true);
    const resume = () => (paused = track.contains(document.activeElement));
    const onDown = e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false };
    };
    const onMove = e => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) {
        drag.moved = true;
        track.classList.add('is-dragging');
      }
      track.scrollLeft = drag.left - dx;
    };
    const onUp = () => {
      if (!drag) return;
      const { moved } = drag;
      drag = null;
      track.classList.remove('is-dragging');
      // A drag shouldn't also open the post it ended on.
      if (moved) track.addEventListener('click', e => e.preventDefault(), { capture: true, once: true });
    };
    // Sideways wheel (trackpad or Shift + wheel) moves the row; plain vertical scrolling stays with the page.
    const onWheel = e => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      e.stopPropagation();
      track.scrollLeft += dx;
    };

    track.addEventListener('pointerenter', pause);
    track.addEventListener('pointerleave', resume);
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', resume);
    track.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    track.addEventListener('wheel', onWheel, { passive: false });
    track.addEventListener('dragstart', e => e.preventDefault());
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('pointerenter', pause);
      track.removeEventListener('pointerleave', resume);
      track.removeEventListener('focusin', pause);
      track.removeEventListener('focusout', resume);
      track.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      track.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div className="li-posts">
      <div ref={trackRef} className="li-track">
        <ul className="li-row">
          {POSTS.map(p => (
            <Card key={p.href} post={p} />
          ))}
        </ul>
        <ul className="li-row" aria-hidden="true">
          {POSTS.map(p => (
            <Card key={p.href} post={p} hidden />
          ))}
        </ul>
      </div>
      <a className="li-profile" href={PROFILE} target="_blank" rel="noopener noreferrer">
        See more on LinkedIn ↗
      </a>
    </div>
  );
};

export default LinkedInPosts;
