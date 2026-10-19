import CaseStudy from '../components/CaseStudy';
import FilmIntro from '../components/finworld/FilmIntro';
import walkthrough from '../assets/finworld/walkthrough.mp4';
import walkthroughPoster from '../assets/finworld/walkthrough-poster.webp';

// Sections of the Figma case study (1728px-wide render), top to bottom.
// Section 04 is the walkthrough frame; the narrated video plays inside its blue box.
const images = import.meta.glob('../assets/finworld/*.webp', { eager: true, import: 'default' });
const img = n => images[`../assets/finworld/${n}.webp`];

// Note sections designed in Figma (frames "Note · …" beside the case study).
const notes = import.meta.glob('../assets/finworld/notes/*.png', { eager: true, import: 'default' });
const note = (n, h, alt) => ({ src: notes[`../assets/finworld/notes/${n}.png`], h, alt });

// Slices 01, 15 and 18 are split (01a/01b, …) so the notes sit in the gaps between cards.
const SECTIONS = [
  { src: img('01a'), h: 1218, alt: 'Finworld, a financial modeling dashboard, on a laptop' },
  note('glance', 673, 'Finworld at a glance: problem, role, what I made, key idea, and the constraints'),
  { src: img('01b'), h: 382, alt: 'Problem statement' },
  { src: img('02'), h: 1619, alt: 'Problem statement: financial modeling today is either too complex or too limited. Project details and a 55-hour timeline' },
  { src: img('03'), h: 1161, alt: '3 core issues with current financial models: lack of clarity, poor collaboration and a steep learning curve' },
  {
    src: img('04'),
    h: 1005,
    alt: 'Narrated walkthrough of the Finworld project',
    player: { video: walkthrough, poster: walkthroughPoster, box: { x: 204, y: 16, w: 1356, h: 971 }, radius: 54 }
  },
  { src: img('05'), h: 1018, alt: 'User persona, the Explorer: Riya Sharma, junior investment analyst' },
  { src: img('06'), h: 1364, alt: 'User persona, the Builder: Aryan Gupta, senior financial analyst' },
  { src: img('07'), h: 1637, alt: 'Stakeholder map, and the start of the information architecture' },
  { src: img('08'), h: 1811, alt: 'Information architecture, and the dashboard screen' },
  { src: img('09'), h: 1585, alt: 'Dashboard screen and its components' },
  note('d1', 577, 'Key decision 01: one dashboard for beginners and experts'),
  note('d2', 577, 'Key decision 02: revenue, net profit and cash forecast first'),
  { src: img('10'), h: 1600, alt: 'Home screen' },
  { src: img('11'), h: 1432, alt: 'Home screen components, and the model analysis tool introduction' },
  { src: img('12'), h: 1777, alt: 'Model analysis tool and its components' },
  { src: img('13'), h: 1591, alt: 'Data import flow: the upload step' },
  { src: img('14'), h: 1601, alt: 'Data import flow: the preview and map columns steps' },
  { src: img('15a'), h: 1364, alt: 'AI integration with the Nova assistant' },
  note('d3', 577, 'Key decision 03: a Map columns step in the import flow'),
  note('d4', 577, 'Key decision 04: Nova as a side panel'),
  { src: img('15b'), h: 76, alt: '' },
  { src: img('16'), h: 1728, alt: 'Finworld dashboard on a laptop, and wireframes' },
  { src: img('17'), h: 1631, alt: 'Wireframes, and how the fonts and colours were chosen' },
  { src: img('18a'), h: 543, alt: 'Inter typography' },
  note('test', 577, 'How I would test it: what, who, and what success looks like'),
  note('reflect', 577, 'Reflection: what went well and what I would do differently'),
  { src: img('18b'), h: 977, alt: 'Thank you' }
];
const at = n => SECTIONS.findIndex(s => s.src === img(n) || s.src === notes[`../assets/finworld/notes/${n}.png`]);

// Sidebar sections: where each one starts in SECTIONS.
const NAV = [
  { label: 'Overview', at: at('01a') },
  { label: 'Problem', at: at('01b') },
  { label: 'Walkthrough', at: at('04') },
  { label: 'Personas', at: at('05') },
  { label: 'Stakeholders & IA', at: at('07') },
  { label: 'Dashboard', at: at('09') },
  { label: 'Home', at: at('10') },
  { label: 'Model analysis', at: at('12') },
  { label: 'Data import', at: at('13') },
  { label: 'Nova AI', at: at('15a') },
  { label: 'Wireframes', at: at('16') },
  { label: 'Visual design', at: at('17') },
  { label: 'Test plan', at: at('test') },
  { label: 'Reflection', at: at('reflect') }
];

const NAV_THEME = { accent: '#2265ff', text: '#54555a', marker: '#c9ccd6', panel: 'rgba(255, 255, 255, 0.88)' };

// Shown at 1020px wide on large screens, so the design's content (inset ~120px at 1728) lines up
// with the Takshila case study's 880px column; the sides carry each section's own colours.
const Finworld = () => (
  <>
    <FilmIntro background="#ffffff" flatBands />
    <CaseStudy
      title="Finworld"
      width={1728}
      displayWidth={1020}
      pageColor="#ffffff"
      sections={SECTIONS}
      barColor="#d8d8d8"
      linkColor="#1a213d"
      nav={NAV}
      navTheme={NAV_THEME}
    />
  </>
);

export default Finworld;
