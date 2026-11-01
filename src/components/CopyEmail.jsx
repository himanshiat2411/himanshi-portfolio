import { useEffect, useState } from 'react';

import { EMAIL } from '../links';

// A small button beside the email that copies it to the clipboard, then shows a tick and
// "Copied" for a moment.
const CopyEmail = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Older browsers or non-secure pages: copy through a hidden text field.
      const field = document.createElement('textarea');
      field.value = EMAIL;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
  };

  return (
    <button type="button" className={`copy-email ${className}`} onClick={copy} aria-label={copied ? 'Email copied' : 'Copy email'}>
      {copied ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span className="copy-email-tip" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
};

export default CopyEmail;
