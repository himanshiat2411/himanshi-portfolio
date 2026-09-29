import { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './FeedbackWidget.css';

const HEARTED_KEY = 'portfolio-hearted-on';
const NUDGED_KEY = 'portfolio-nudged';
const NUDGE_AT = 0.6; // share of a case study scrolled before the bubble appears
const today = () => new Date().toISOString().slice(0, 10);

// Session storage, so the bubble shows at most once per visit.
const nudgedThisVisit = () => {
  try {
    return sessionStorage.getItem(NUDGED_KEY) === '1';
  } catch {
    return false;
  }
};

const markNudged = () => {
  try {
    sessionStorage.setItem(NUDGED_KEY, '1');
  } catch {
    // Storage blocked: the bubble may show again on the next case study, which is harmless.
  }
};

const readHearted = () => {
  try {
    return localStorage.getItem(HEARTED_KEY) === today();
  } catch {
    return false;
  }
};

const Heart = ({ filled }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      d="M12 20.5s-7.5-4.6-9.6-9.2C.9 8 2.9 4 6.6 4c2.2 0 3.6 1.2 4.4 2.4h2C13.8 5.2 15.2 4 17.4 4c3.7 0 5.7 4 4.2 7.3-2.1 4.6-9.6 9.2-9.6 9.2Z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const EMPTY_FORM = { message: '', name: '', email: '', website: '' };

const FeedbackWidget = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(null);
  const [hearted, setHearted] = useState(readHearted);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [nudge, setNudge] = useState(false);
  const [hoverNudge, setHoverNudge] = useState(false);
  const hideTimer = useRef(0);
  const rootRef = useRef(null);
  const panelId = useId();

  // Pop the bubble once per visit, when a case study is 60% scrolled, unless they already gave feedback.
  // A page can mark where it should appear instead (e.g. Takshila's Reflection section), so it never
  // covers the case study's main content.
  useEffect(() => {
    if (!pathname.startsWith('/work/') || hearted || status === 'sent' || nudgedThisVisit()) return undefined;
    const marker = document.querySelector('[data-feedback-nudge]');
    if (marker) {
      const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        markNudged();
        setNudge(true);
        io.disconnect();
      });
      io.observe(marker);
      return () => io.disconnect();
    }
    const onScroll = () => {
      const { scrollHeight } = document.documentElement;
      if ((window.scrollY + window.innerHeight) / scrollHeight < NUDGE_AT) return;
      markNudged();
      setNudge(true);
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname, hearted, status]);

  // Hovering the heart (or the bubble itself) shows the bubble; it lingers 0.4s after the mouse leaves.
  const showHoverNudge = () => {
    clearTimeout(hideTimer.current);
    setHoverNudge(true);
  };
  const hideHoverNudge = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setHoverNudge(false), 400);
  };
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const closeNudge = () => {
    clearTimeout(hideTimer.current);
    setNudge(false);
    setHoverNudge(false);
  };

  const openPanel = () => {
    closeNudge();
    setOpen(true);
  };

  const showBubble = (nudge || hoverNudge) && !open;

  useEffect(() => {
    fetch('/api/hearts')
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => setCount(data.count))
      .catch(() => setCount(null));
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = e => e.key === 'Escape' && setOpen(false);
    const onClick = e => rootRef.current && !rootRef.current.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onClick);
    };
  }, [open]);

  if (pathname === '/feedback') return null;

  const giveHeart = async () => {
    if (hearted) return;
    setHearted(true);
    setCount(c => (c === null ? c : c + 1));
    try {
      localStorage.setItem(HEARTED_KEY, today());
    } catch {
      // Private mode or blocked storage: the server still limits one heart per day.
    }
    try {
      const r = await fetch('/api/hearts', { method: 'POST' });
      if (r.ok) setCount((await r.json()).count);
    } catch {
      // Keep the optimistic count; the next visit reloads the real one.
    }
  };

  const update = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const r = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page: pathname })
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('sent');
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus('idle');
      setError(err.message);
    }
  };

  return (
    <div className="fb" ref={rootRef}>
      {open && (
        <div className="fb-panel" id={panelId} role="dialog" aria-label="Feedback">
          <p className="fb-title">Enjoying the portfolio?</p>
          <p className="fb-sub">Leave a heart, or tell me what could be better.</p>

          <button type="button" className="fb-heart" data-on={hearted ? '' : undefined} onClick={giveHeart} disabled={hearted}>
            <Heart filled={hearted} />
            {hearted ? 'Thanks for the heart!' : 'Leave a heart'}
          </button>

          {status === 'sent' ? (
            <div className="fb-done">
              <p>Thank you! I read every suggestion.</p>
              <button type="button" className="fb-link" onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <form className="fb-form" onSubmit={submit}>
              <label className="fb-label">
                Suggestion
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  rows={4}
                  maxLength={1000}
                  required
                  placeholder="What did you like, or what would you change?"
                />
              </label>
              <div className="fb-row">
                <label className="fb-label">
                  Name <span>(optional)</span>
                  <input value={form.name} onChange={update('name')} maxLength={80} autoComplete="name" />
                </label>
                <label className="fb-label">
                  Email <span>(optional)</span>
                  <input type="email" value={form.email} onChange={update('email')} maxLength={120} autoComplete="email" />
                </label>
              </div>
              {/* Honeypot: hidden from people, bots tend to fill it in. */}
              <input className="fb-hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} aria-hidden="true" />
              {error && <p className="fb-error" role="alert">{error}</p>}
              <button type="submit" className="fb-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send suggestion'}
              </button>
            </form>
          )}
        </div>
      )}

      {showBubble && (
        <div className="fb-nudge" role="status" onMouseEnter={showHoverNudge} onMouseLeave={hideHoverNudge}>
          <button type="button" className="fb-nudge-body" onClick={openPanel}>
            <strong>Enjoying my work? 👋</strong>
            Drop a heart or a suggestion — it’d make my day!
          </button>
          <button type="button" className="fb-nudge-close" aria-label="Dismiss" onClick={closeNudge}>
            ✕
          </button>
        </div>
      )}

      <button
        type="button"
        className="fb-toggle"
        data-on={hearted ? '' : undefined}
        data-nudge={showBubble ? '' : undefined}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? setOpen(false) : openPanel())}
        onMouseEnter={showHoverNudge}
        onMouseLeave={hideHoverNudge}
      >
        <Heart filled={hearted} />
        {count !== null ? <span>{count}</span> : <span className="fb-sr">Feedback</span>}
      </button>
    </div>
  );
};

export default FeedbackWidget;
