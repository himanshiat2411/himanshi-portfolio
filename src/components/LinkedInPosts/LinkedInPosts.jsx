import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import CONTENT from '../../assets/linkedin/posts.json';
import ProfileCard from '../ProfileCard/ProfileCard';
import './LinkedInPosts.css';

// Every image of every post, saved locally as <post>-<n>.webp; posts.json holds each post's full
// text and its image file names, in order.
const FILES = import.meta.glob('../../assets/linkedin/*.webp', { eager: true, import: 'default' });
const imagesOf = key => CONTENT[key].images.map(f => FILES[`../../assets/linkedin/${f}`]);

const PROFILE = 'https://www.linkedin.com/in/himanshi-meena-714543231/';
const POST = slug => `https://www.linkedin.com/posts/himanshi-meena-714543231_${slug}/`;

// My LinkedIn posts, in the order I want them shown. `key` points into posts.json.
const POSTS = [
  {
    title: 'UX Day 2026 at Microsoft',
    line: 'Being you is the only differentiator.',
    date: 'May 2026',
    key: 'ux-day',
    href: POST('uxday2026-microsoft-uxdesign-activity-7458486693005021184-kLvt')
  },
  {
    title: 'Config: Friends of Figma, Jaipur',
    line: 'People don’t buy interfaces. Notes from the day.',
    date: 'Jun 2026',
    key: 'config',
    href: POST('config-friendsoffigma-uxdesign-ugcPost-7477367308743663618-c54k')
  },
  {
    title: 'Is AI replacing designers?',
    line: 'AI can design a UI. It can’t understand a human.',
    date: 'Nov 2025',
    key: 'ai-designers',
    href: POST('uxdesign-aidesign-designthinking-ugcPost-7393633664292753408-kLwo')
  },
  {
    title: 'Research, presented my way',
    line: 'No slides, no fixed format, just the findings.',
    date: 'May 2026',
    key: 'present-your-way',
    href: POST('uxdesign-uiux-designthinking-ugcPost-7456169973665796096-wj-M')
  },
  {
    title: 'Designing for System 1 thinking',
    line: 'What Thinking, Fast and Slow taught me about friction.',
    date: 'Jul 2026',
    key: 'system-1',
    href: POST('uxdesign-productdesign-userexperience-share-7480350198897065984-OaBd')
  },
  {
    title: 'Indian Railways in 2050',
    line: 'A 4.5-hour live design sprint.',
    date: 'Feb 2026',
    key: 'railways-2050',
    href: POST('interactiondesign-accessibility-designsprint-ugcPost-7429878941751943168-1JSL')
  },
  {
    title: 'Invisible accessibility',
    line: 'The Braille on a train seat number.',
    date: 'Apr 2026',
    key: 'braille',
    href: POST('designthinking-accessibility-userexperience-share-7447261460847747073-BPBx')
  },
  {
    title: 'Anchoring bias in pricing',
    line: 'How a Sony LIV plan page nudged my choice.',
    date: 'Jun 2026',
    key: 'anchoring',
    href: POST('uxdesign-uxresearch-uxpsychology-share-7470752069793128448-Ugah')
  },
  {
    title: 'Variable rewards',
    line: 'Atomic Habits, and why some UI keeps us coming back.',
    date: 'May 2026',
    key: 'variable-rewards',
    href: POST('uiux-uxdesign-productdesign-ugcPost-7461288436457508865-pw8W')
  },
  {
    title: 'Induced scarcity',
    line: 'An art exhibition, through a UX psychology lens.',
    date: 'Jan 2026',
    key: 'scarcity',
    href: POST('uxdesign-uxpsychology-productdesign-ugcPost-7415361820825190400-0x-O')
  }
].map(p => ({ ...p, images: imagesOf(p.key), text: CONTENT[p.key].body }));

// Each post is a React Bits ProfileCard: the post's image tilts toward the cursor with a holographic
// glare, its title and line sit over the image, and the footer has a Read button and the month. Clicking anywhere on the card (but not at the end of a drag) opens the popup.
const Card = ({ post, onOpen, hidden }) => (
  <li
    className="li-card"
    role="button"
    tabIndex={hidden ? -1 : 0}
    aria-haspopup="dialog"
    aria-label={`${post.title}, ${post.date}`}
    onClick={e => {
      if (!e.defaultPrevented) onOpen(post);
    }}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOpen(post);
      }
    }}
  >
    <ProfileCard
      avatarUrl={post.images[0]}
      name={post.title}
      title={post.line}
      backdropColor="#141414"
      theme="dark"
      radius={18}
      holo={0.5}
      glare={0.45}
      tiltStrength={8}
      parallax={6}
      intro={false}
      footer={
        <>
          <span className="profile-card__contact li-card-read">
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} strokeWidth={1.8} />
            Read
          </span>
          <span className="li-card-date">{post.date}</span>
        </>
      }
    />
  </li>
);

const LinkedInMark = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="currentColor" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

// The popup: the post's images on the left (one large, the rest as thumbnails to switch to), and a
// rounded card on the right with who posted it, the link, the post's full text and a way out to LinkedIn. Esc, the close button or a click
// outside closes it.
const PostModal = ({ post, onClose }) => {
  const closeRef = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.lenis?.stop?.();
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.lenis?.start?.();
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="li-modal" onClick={onClose}>
      <div className="li-modal-grid" role="dialog" aria-modal="true" aria-label={post.title} onClick={e => e.stopPropagation()}>
        <div className="li-modal-gallery" data-count={post.images.length}>
          <figure className="li-modal-img" style={{ '--fill': `url(${post.images[shown]})` }}>
            <img src={post.images[shown]} alt={`${post.title}, image ${shown + 1} of ${post.images.length}`} />
          </figure>
          {post.images.length > 1 && (
            <div className="li-modal-thumbs">
              {post.images.map((src, i) => (
                <button key={src} type="button" aria-label={`Show image ${i + 1}`} aria-pressed={i === shown} onClick={() => setShown(i)}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="li-modal-card" data-lenis-prevent="">
          <div className="li-modal-top">
            <span className="li-modal-avatar">H</span>
            <span className="li-modal-who">
              Himanshi <strong>Meena</strong>
            </span>
            <button ref={closeRef} type="button" className="li-modal-close" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
          <a className="li-modal-link" href={PROFILE} target="_blank" rel="noopener noreferrer">
            <LinkedInMark /> linkedin.com/in/himanshi-meena
          </a>
          <p className="li-modal-tag">
            {post.title} <span>· {post.date}</span>
          </p>
          <div className="li-modal-text">
            {post.text.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <a className="li-modal-more" href={post.href} target="_blank" rel="noopener noreferrer">
            Read more on LinkedIn ↗
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

// A row of post cards drifting sideways on a loop (a second copy makes it seamless). People can also
// move it themselves: drag it with the mouse, or scroll it sideways (trackpad, or Shift + wheel).
// It pauses while hovered or focused and picks up again from wherever it was left.
const SPEED = 0.5; // px per frame

const LinkedInPosts = () => {
  const trackRef = useRef(null);
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const track = trackRef.current;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let paused = false;
    let drag = null;
    let draggedAt = 0;
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
      if (moved) draggedAt = performance.now();
    };
    // A drag shouldn't also open the post it ended on.
    const onClick = e => {
      if (performance.now() - draggedAt < 300) e.preventDefault();
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
    track.addEventListener('click', onClick, true);
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
      track.removeEventListener('click', onClick, true);
    };
  }, []);

  return (
    <div className="li-posts">
      <div ref={trackRef} className="li-track">
        <ul className="li-row">
          {POSTS.map(p => (
            <Card key={p.href} post={p} onOpen={setOpen} />
          ))}
        </ul>
        <ul className="li-row" aria-hidden="true">
          {POSTS.map(p => (
            <Card key={p.href} post={p} onOpen={setOpen} hidden />
          ))}
        </ul>
      </div>
      <a className="li-profile" href={PROFILE} target="_blank" rel="noopener noreferrer">
        See more on LinkedIn ↗
      </a>
      {open && <PostModal post={open} onClose={close} />}
    </div>
  );
};

export default LinkedInPosts;
