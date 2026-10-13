import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import introVideo from '../assets/intro/intro.mp4';
import './IntroVideoModal.css';

const IntroVideoModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="ivm-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Intro video">
      <div className="ivm-panel" onClick={(e) => e.stopPropagation()}>
        <video className="ivm-video" src={introVideo} autoPlay controls playsInline />
        <button type="button" className="ivm-close" onClick={onClose} aria-label="Close video">
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};

export default IntroVideoModal;
