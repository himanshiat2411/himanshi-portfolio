import CaseStudy from '../components/CaseStudy';

// Sections of the Figma case study (1728px-wide render), top to bottom.
// Section 04 is the walkthrough frame; its video will replace the still.
const images = import.meta.glob('../assets/finworld/*.webp', { eager: true, import: 'default' });
const img = n => images[`../assets/finworld/${n}.webp`];

const SECTIONS = [
  { src: img('01'), h: 1600, alt: 'Finworld, a financial modeling dashboard, on a laptop, and what the project is about' },
  { src: img('02'), h: 1619, alt: 'Project details (FinTech financial modeling platform, 2026) and timeline: a 55-hour design sprint through discovery, strategy and solutions' },
  { src: img('03'), h: 1161, alt: '3 core issues with current financial models: lack of clarity, poor collaboration and a steep learning curve' },
  { src: img('04'), h: 1005, alt: 'A quick walkthrough of the project' },
  { src: img('05'), h: 1018, alt: 'User persona, the Explorer: Riya Sharma, junior investment analyst' },
  { src: img('06'), h: 1364, alt: 'User persona, the Builder: Aryan Gupta, senior financial analyst' },
  { src: img('07'), h: 1637, alt: 'Stakeholder map, and the start of the information architecture' },
  { src: img('08'), h: 1811, alt: 'Information architecture, and the dashboard screen' },
  { src: img('09'), h: 1585, alt: 'Dashboard screen and its components' },
  { src: img('10'), h: 1600, alt: 'Home screen' },
  { src: img('11'), h: 1432, alt: 'Home screen components, and the model analysis tool introduction' },
  { src: img('12'), h: 1777, alt: 'Model analysis tool and its components' },
  { src: img('13'), h: 1591, alt: 'Data import flow: the upload step' },
  { src: img('14'), h: 1601, alt: 'Data import flow: the preview and map columns steps' },
  { src: img('15'), h: 1440, alt: 'AI integration with the Nova assistant' },
  { src: img('16'), h: 1728, alt: 'Finworld dashboard on a laptop, and wireframes' },
  { src: img('17'), h: 1631, alt: 'Wireframes, and how the fonts and colours were chosen' },
  { src: img('18'), h: 1520, alt: 'Colour palette, Inter typography, and thank you' }
];

const Finworld = () => (
  <CaseStudy title="Finworld" width={1728} sections={SECTIONS} barColor="#d8d8d8" linkColor="#1a213d" />
);

export default Finworld;
