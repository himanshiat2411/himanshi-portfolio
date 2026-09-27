import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { RESUME_URL } from '../links';
import './Navbar.css';

const Navbar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  // Only the home page opens on the dark hero; elsewhere the nav needs its backdrop from the start.
  const solid = scrolled || pathname !== '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav" data-scrolled={solid ? '' : undefined}>
      <div className="nav-inner container">
        <Link className="nav-logo" to="/">
          Himanshi
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link to="/#work">Work</Link>
          <Link to="/about">About me</Link>
          <Link to={{ hash: '#contact' }}>Contact</Link>
        </nav>
        <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>
    </header>
  );
};

export default Navbar;
