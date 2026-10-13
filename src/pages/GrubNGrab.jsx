import CaseStudy from '../components/CaseStudy';
import VideoIntro from '../components/VideoIntro';
import video1 from '../assets/grub-n-grab/videos/1.mp4';
import video2 from '../assets/grub-n-grab/videos/2.mp4';
import video3 from '../assets/grub-n-grab/videos/3.mp4';
import video4 from '../assets/grub-n-grab/videos/4.mp4';

// Sections of the Figma case study (1420px-wide render), top to bottom.
// The journey maps and the User Flow & IA section were removed from the render.
const images = import.meta.glob('../assets/grub-n-grab/*.webp', { eager: true, import: 'default' });
const img = n => images[`../assets/grub-n-grab/${n}.webp`];

const SECTIONS = [
  { src: img('01'), h: 1700, alt: 'Grub’n Grab, a campus thrift app: app mockups and project overview — role, 16 weeks, tools, C2C marketplace, mobile app' },
  { src: img('03'), h: 681, alt: 'The problem: students struggle to find affordable, trustworthy second-hand items on campus, and why it matters' },
  { src: img('04'), h: 826, edgeColor: 'linear-gradient(90deg, #024a3f 50%, #09483e 50%)', alt: 'Design process: Empathize, Define, Ideate, Prototype, Test' },
  { src: img('05'), h: 1276, alt: 'User research: interviews with 8 college students and 2 recent graduates, key insights and interview notes' },
  { src: img('06'), h: 1115, alt: 'Affinity diagram grouping interview quotes into themes' },
  { src: img('07'), h: 1636, alt: 'Competitor analysis comparing OLX, FreeUp, Depop, WhatsApp groups and Grub’n Grab' },
  { src: img('08'), h: 1465, alt: 'User personas: Akash Sharma, a 4th-year seller, and Rashmi Krishnan, a 1st-year buyer' },
  { src: img('09'), h: 2121, alt: 'Low-fidelity wireframes' },
  { src: img('10'), h: 300, alt: 'Prototype' },
  { video: video2, ratio: '1980 / 1080', edgeColor: '#d0edc5', alt: 'Grub’n Grab prototype walkthrough' },
  { src: img('11'), h: 1200, alt: 'Design system: primary, secondary and semantic colour palette' },
  { src: img('12'), h: 1528, alt: 'Typography (Inter), components and iconography' },
  { video: video3, poster: img('13'), h: 829, alt: 'High-fidelity splash screen on a phone' },
  { src: img('14'), h: 2061, alt: 'High-fidelity screens: splash, welcome, login, sign up, verification and document upload' },
  { src: img('15'), h: 1682, alt: 'Verification loading and submitted screens, and the annotated home screen' },
  { src: img('16'), h: 1718, alt: 'Home screen annotations and the annotated product page' },
  { video: video4, poster: img('17'), h: 900, alt: 'Grub’n Grab app demo' },
  { src: img('18'), h: 2343, alt: 'Other screens: swap listing and list-an-item, plus overlays' },
  { src: img('19'), h: 802, alt: 'Error states overview' },
  { src: img('20'), h: 1137, alt: 'Error states: invalid roll number and missing college selection' },
  { src: img('21'), h: 950, alt: 'Error states: file too large, verification failed and documents rejected' },
  { src: img('22'), h: 818, alt: 'Thank you for scrolling' }
];

// Sidebar sections: where each one starts in SECTIONS.
const NAV = [
  { label: 'Overview', at: 0 },
  { label: 'Problem', at: 1 },
  { label: 'Process', at: 2 },
  { label: 'Research', at: 3 },
  { label: 'Personas', at: 6 },
  { label: 'Wireframes', at: 7 },
  { label: 'Prototype', at: 8 },
  { label: 'Design system', at: 10 },
  { label: 'High fidelity', at: 12 },
  { label: 'Error states', at: 18 }
];

const NAV_THEME = { accent: '#c1f1a9', text: 'rgba(255, 255, 255, 0.72)', marker: 'rgba(255, 255, 255, 0.3)', panel: 'rgba(2, 74, 63, 0.86)' };

// Shown at 1060px wide on large screens, so the design's content (inset ~120px at 1420) lines up
// with the Takshila case study's 880px column.
const GrubNGrab = () => (
  <>
    <VideoIntro src={video1} background="#034a3e" label="Grub’n Grab intro animation" />
    <CaseStudy title="Grub’n Grab" width={1420} displayWidth={1060} sections={SECTIONS} barColor="#024a3f" linkColor="#c1f1a9" extendEdges nav={NAV} navTheme={NAV_THEME} />
  </>
);

export default GrubNGrab;
