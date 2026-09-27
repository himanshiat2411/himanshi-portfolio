import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './Feedback.css';

const KEY_STORAGE = 'portfolio-feedback-key';

const storedKey = () => {
  try {
    return sessionStorage.getItem(KEY_STORAGE) || '';
  } catch {
    return '';
  }
};

const formatDate = iso =>
  new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// Owner-only page: /feedback?key=YOUR_FEEDBACK_KEY (or type the key in).
const Feedback = () => {
  const [params, setParams] = useSearchParams();
  const [key, setKey] = useState(() => params.get('key') || storedKey());
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const previous = document.title;
    document.title = 'Feedback — Himanshi';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    return () => {
      document.title = previous;
      robots.remove();
    };
  }, []);

  // Keep the key out of the address bar once it has been read.
  useEffect(() => {
    if (params.has('key')) setParams({}, { replace: true });
  }, [params, setParams]);

  useEffect(() => {
    if (!key) return;
    setError('');
    fetch('/api/feedback', { headers: { 'x-feedback-key': key } })
      .then(async r => {
        if (r.status === 401) throw new Error('That key is not right.');
        if (!r.ok) throw new Error('Could not load feedback.');
        return r.json();
      })
      .then(result => {
        setData(result);
        try {
          sessionStorage.setItem(KEY_STORAGE, key);
        } catch {
          // Storage blocked: you'll just be asked for the key again next time.
        }
      })
      .catch(err => {
        setData(null);
        setError(err.message);
      });
  }, [key]);

  return (
    <section className="feedback">
      <div className="container">
        <h1 className="feedback-title">Feedback</h1>

        {!data && (
          <form
            className="feedback-key"
            onSubmit={e => {
              e.preventDefault();
              setKey(input.trim());
            }}
          >
            <input type="password" value={input} onChange={e => setInput(e.target.value)} placeholder="Feedback key" autoComplete="off" />
            <button type="submit">Open</button>
          </form>
        )}
        {error && <p className="feedback-error">{error}</p>}

        {data && (
          <>
            <div className="feedback-stats">
              <div>
                <span className="feedback-num">{data.hearts}</span>
                <span className="feedback-label">Hearts</span>
              </div>
              <div>
                <span className="feedback-num">{data.suggestions.length}</span>
                <span className="feedback-label">Suggestions</span>
              </div>
            </div>

            {data.suggestions.length === 0 ? (
              <p className="feedback-empty">No suggestions yet.</p>
            ) : (
              <ol className="feedback-list">
                {data.suggestions.map((s, i) => (
                  <li key={`${s.at}-${i}`} className="feedback-item">
                    <p className="feedback-message">{s.message}</p>
                    <p className="feedback-meta">
                      {s.name || 'Anonymous'}
                      {s.email && (
                        <>
                          {' · '}
                          <a href={`mailto:${s.email}`}>{s.email}</a>
                        </>
                      )}
                      {' · '}
                      {formatDate(s.at)}
                      {s.page && ` · on ${s.page}`}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Feedback;
