import { Link } from 'react-router-dom';

import availableDot from '../assets/available-dot.svg';
import portrait from '../assets/portrait.png';
import { EMAIL_COMPOSE_URL } from '../links';
import openCompose from '../openCompose';
import './Intro.css';

const Intro = () => (
  <section className="intro" id="about">
    <div className="intro-art" aria-hidden="true">
      <p className="intro-ghost">Himanshi</p>
      <div className="intro-portrait">
        <img src={portrait} alt="" />
      </div>
      <div className="intro-fade intro-fade--top" />
      <div className="intro-fade intro-fade--left" />
      <div className="intro-fade intro-fade--right" />
    </div>

    <div className="intro-content container">
      <div className="intro-main">
        <p className="intro-available">
          <img src={availableDot} width="8" height="8" alt="" />
          Available for product design roles
        </p>
        <h2 className="intro-headline">
          Designing for the
          <br />
          details people <em>feel</em>
          <br />
          <em>but never</em> notice.
        </h2>
      </div>

      <div className="intro-side">
        <p className="intro-bio">
          Product Designer and UX Researcher based in Delhi NCR, with an engineering background. I show the thinking,
          research and decisions behind every project — including the calls I made and why.
        </p>
        <Link className="intro-more" to="/about">
          More about me →
        </Link>
        <div className="intro-ctas">
          <a className="intro-cta intro-cta--primary" href="#work">
            <span>See selected work</span> ↓
          </a>
          <a
            className="intro-cta intro-cta--secondary"
            href={EMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={openCompose}
          >
            Let’s talk →
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Intro;
