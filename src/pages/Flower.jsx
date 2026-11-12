import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// If I Were a Flower (/work/if-i-were-a-flower): the live site (deployed from the GitHub repo
// himanshiat2411/if-i-were-a-flower), shown full screen so every change there shows here at once.
const SITE = 'https://if-i-were-a-flower.vercel.app';
const Flower = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'If I Were a Flower - Himanshi';
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.title = previous;
      document.body.style.overflow = overflow;
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#000' }}>
      <iframe
        src={SITE}
        title="If I Were a Flower, a scroll story"
        style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      />
      <Link
        to="/#work"
        style={{
          position: 'fixed', left: 16, bottom: 16, zIndex: 1001, minHeight: 44, display: 'inline-flex',
          alignItems: 'center', padding: '0 16px', borderRadius: 999, background: '#262626', color: '#f2f2f2',
          font: '500 14px Manrope, system-ui, sans-serif', textDecoration: 'none'
        }}
      >
        ← Back to work
      </Link>
    </div>
  );
};

export default Flower;
