import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './GrubNGrab.css';

// Sections of the Figma case study (1420px-wide render), top to bottom.
// Entries marked `video` are where the video files will replace the still frame.
// The Prototype video will go between sections 12 and 13.
const images = import.meta.glob('../assets/grub-n-grab/*.webp', { eager: true, import: 'default' });
const src = n => images[`../assets/grub-n-grab/${n}.webp`];

const WIDTH = 1420;
const SECTIONS = [
  { n: '01', h: 1700, alt: 'Grub’n Grab, a campus thrift app: app mockups and project overview — role, 16 weeks, tools, C2C marketplace, mobile app' },
  { n: '02', h: 770, alt: 'Grub’n Grab intro animation', video: true },
  { n: '03', h: 681, alt: 'The problem: students struggle to find affordable, trustworthy second-hand items on campus, and why it matters' },
  { n: '04', h: 826, alt: 'Design process: Empathize, Define, Ideate, Prototype, Test' },
  { n: '05', h: 1276, alt: 'User research: interviews with 8 college students and 2 recent graduates, key insights and interview notes' },
  { n: '06', h: 1115, alt: 'Affinity diagram grouping interview quotes into themes' },
  { n: '07', h: 1636, alt: 'Competitor analysis comparing OLX, FreeUp, Depop, WhatsApp groups and Grub’n Grab' },
  { n: '08', h: 2058, alt: 'User persona Akash Sharma, a seller, and his user journey map' },
  { n: '09', h: 2338, alt: 'User persona Rashmi Krishnan, a buyer, her user journey map, and the start of the user flow' },
  { n: '10', h: 1979, alt: 'User flow and information architecture' },
  { n: '11', h: 2121, alt: 'Low-fidelity wireframes' },
  { n: '12', h: 300, alt: 'Prototype' },
  { n: '13', h: 1200, alt: 'Design system: primary, secondary and semantic colour palette' },
  { n: '14', h: 1528, alt: 'Typography (Inter), components and iconography' },
  { n: '15', h: 829, alt: 'High-fidelity splash screen on a phone', video: true },
  { n: '16', h: 2061, alt: 'High-fidelity screens: splash, welcome, login, sign up, verification and document upload' },
  { n: '17', h: 1682, alt: 'Verification loading and submitted screens, and the annotated home screen' },
  { n: '18', h: 1718, alt: 'Home screen annotations and the annotated product page' },
  { n: '19', h: 900, alt: 'Product flow demo', video: true },
  { n: '20', h: 2343, alt: 'Other screens: swap listing and list-an-item, plus overlays' },
  { n: '21', h: 802, alt: 'Error states overview' },
  { n: '22', h: 1137, alt: 'Error states: invalid roll number and missing college selection' },
  { n: '23', h: 950, alt: 'Error states: file too large, verification failed and documents rejected' },
  { n: '24', h: 818, alt: 'Thank you for scrolling' }
];

const GrubNGrab = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Grub’n Grab — Himanshi';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <article className="case">
      <div className="case-bar">
        <div className="case-bar-inner">
          <Link className="case-back" to="/#work">
            ← Back to work
          </Link>
        </div>
      </div>
      <div className="case-body">
        {SECTIONS.map((section, i) => (
          <img
            key={section.n}
            className="case-img"
            src={src(section.n)}
            width={WIDTH}
            height={section.h}
            alt={section.alt}
            loading={i < 2 ? 'eager' : 'lazy'}
            decoding="async"
            data-video={section.video ? '' : undefined}
          />
        ))}
      </div>
    </article>
  );
};

export default GrubNGrab;
