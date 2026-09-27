import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// On navigation: go to the #hash target if there is one, otherwise to the top.
// Jumps instantly when the page changes, scrolls smoothly within the same page.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const lastPath = useRef(pathname);

  useLayoutEffect(() => {
    const behavior = lastPath.current === pathname ? 'smooth' : 'instant';
    lastPath.current = pathname;
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollManager;
