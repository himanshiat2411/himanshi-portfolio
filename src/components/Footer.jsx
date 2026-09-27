import { BEHANCE_URL, EMAIL, EMAIL_COMPOSE_URL, LINKEDIN_URL, RESUME_URL } from '../links';
import openCompose from '../openCompose';
import './Footer.css';

const SOCIALS = [
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'Behance', href: BEHANCE_URL },
  { label: 'Resume', href: RESUME_URL }
];

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="container">
      <h2 className="footer-heading">
        Let’s build something
        <br />
        <em>worth the detail.</em>
      </h2>

      <div className="footer-row">
        <a
          className="footer-email"
          href={EMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={openCompose}
        >
          {EMAIL}
        </a>
        <nav className="footer-links" aria-label="Social">
          {SOCIALS.map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="footer-copy">© 2026 Himanshi</p>
    </div>
  </footer>
);

export default Footer;
