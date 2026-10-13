import { BEHANCE_URL, EMAIL, EMAIL_COMPOSE_URL, LINKEDIN_URL, RESUME_URL } from '../links';
import openCompose from '../openCompose';
import ElasticLine from './ElasticLine/ElasticLine';
import './Footer.css';

// Each link gets its own underline on hover: from the centre, or sweeping in from one side and
// out the other.
const SOCIALS = [
  { label: 'LinkedIn', href: LINKEDIN_URL, underline: 'center' },
  { label: 'Behance', href: BEHANCE_URL, underline: 'right' },
  { label: 'Resume', href: RESUME_URL, underline: 'left' }
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
          className="footer-email u-line"
          data-underline="swap"
          href={EMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={openCompose}
        >
          {EMAIL}
        </a>
        <nav className="footer-links" aria-label="Social">
          {SOCIALS.map(link => (
            <a
              key={link.label}
              className="u-line"
              data-underline={link.underline}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <ElasticLine className="footer-line" releaseThreshold={50} strokeWidth={1} />

      <p className="footer-copy">© 2026 Himanshi</p>
    </div>
  </footer>
);

export default Footer;
