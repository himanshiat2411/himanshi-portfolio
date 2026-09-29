import { createContext, useContext, useEffect, useRef, useState } from 'react';

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Small mono uppercase label in gold, above a section heading.
export const SectionLabel = ({ children }) => <p className="tk-label">{children}</p>;

// Scroll smoothly to an in-page anchor and move keyboard focus there.
export const jumpTo = id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
};

export const JumpLink = ({ to, className, children, ...rest }) => (
  <a
    href={`#${to}`}
    className={className}
    onClick={e => {
      e.preventDefault();
      jumpTo(to);
    }}
    {...rest}
  >
    {children}
  </a>
);

// Fade-and-rise on entering the viewport: any element inside `root` with [data-reveal] gets
// [data-in] once it's visible. Stagger comes from a `--i` custom property set by the caller.
export const useReveal = rootRef => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const els = root.querySelectorAll('[data-reveal]');
    if (reducedMotion()) {
      els.forEach(el => el.setAttribute('data-in', ''));
      return undefined;
    }
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-in', '');
          io.unobserve(entry.target);
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
};

// True once the element has scrolled into view (for one-shot animations like count-ups).
export const useInView = (options = { rootMargin: '0px 0px -15% 0px' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reducedMotion()) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
};

// ---------- Fullscreen screen viewer ----------
const ViewerContext = createContext(() => {});
export const useOpenScreen = () => useContext(ViewerContext);

const VIEWER_EXIT_MS = 180;

// Pop-up for one screen: scroll it top to bottom; click outside it (or press Esc) to close.
const ScreenViewer = ({ shot, onClose }) => {
  const [leaving, setLeaving] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!leaving) return undefined;
    const id = setTimeout(onClose, VIEWER_EXIT_MS);
    return () => clearTimeout(id);
  }, [leaving, onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    const onKey = e => e.key === 'Escape' && setLeaving(true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      previousFocus?.focus?.();
    };
  }, []);

  return (
    <div
      className="tk-viewer"
      data-leaving={leaving ? '' : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={e => e.target === e.currentTarget && setLeaving(true)}
    >
      <div className="tk-viewer-panel" ref={panelRef} tabIndex={-1}>
        <img src={shot.src} alt={shot.alt} />
      </div>
    </div>
  );
};

export const ScreenViewerProvider = ({ children }) => {
  const [shot, setShot] = useState(null);
  return (
    <ViewerContext.Provider value={setShot}>
      {children}
      {shot && <ScreenViewer shot={shot} onClose={() => setShot(null)} />}
    </ViewerContext.Provider>
  );
};

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// A screen in the rounded card with a soft shadow, a "View screen" button that opens the
// fullscreen viewer, and a caption saying what the screen proves.
export const Screen = ({ src, alt, caption, width, height, crop = true }) => {
  const open = useOpenScreen();
  return (
    <figure className="tk-screen" data-crop={crop ? '' : undefined}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-haspopup="dialog"
        onClick={e => {
          e.preventDefault();
          open({ src, alt });
        }}
      >
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
        <span className="tk-screen-btn" aria-hidden="true">
          <ExpandIcon />
          View screen
        </span>
      </a>
      <figcaption className="tk-caption">{caption}</figcaption>
    </figure>
  );
};
