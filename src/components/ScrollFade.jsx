import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Site-wide fade-in on scroll: the blocks inside each section start transparent and fade in
// as they come into view (once). Opacity only, so sticky and full-screen pieces keep working.
const TARGETS = 'main section .container > *, main section > :not(.container)';

const ScrollFade = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    // Wait a tick so the new page has rendered.
    const timer = setTimeout(() => {
      document.querySelectorAll(TARGETS).forEach(el => {
        if (el.classList.contains('fade-in')) return;
        el.classList.add('fade');
        observer.observe(el);
      });
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

export default ScrollFade;
