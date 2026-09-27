import { useEffect, useState } from 'react';

import { RESUME_URL } from '../links';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="nav" data-scrolled={scrolled ? '' : undefined}>
      <div className="nav-inner container">
        <a className="nav-logo" href="#top">
          Himanshi
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#about">About me</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>
    </header>
  );
};

export default Navbar;
