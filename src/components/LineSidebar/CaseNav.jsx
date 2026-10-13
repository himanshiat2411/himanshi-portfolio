import { useEffect, useRef, useState } from 'react';

import LineSidebar from './LineSidebar';

// Section navigation for a case study, fixed on the left on wide screens. `sections` is a list
// of { label, selector }; the active item follows the scroll position and a click scrolls to
// that section. `theme` sets { accent, text, marker, panel } to match the case study.
const OFFSET = 96;

const CaseNav = ({ sections, theme }) => {
  const [active, setActive] = useState(0);
  // Images above the target can load mid-scroll and push it down, so a jump re-aims when the
  // scroll settles, a few times at most.
  const pending = useRef(null);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35;
      let next = 0;
      sections.forEach((s, i) => {
        const el = document.querySelector(s.selector);
        if (el && el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sections]);

  const aim = () => {
    const el = pending.current && document.querySelector(sections[pending.current.index].selector);
    if (!el) return false;
    const off = el.getBoundingClientRect().top - OFFSET;
    if (Math.abs(off) < 4 || pending.current.tries > 3) {
      pending.current = null;
      return false;
    }
    pending.current.tries += 1;
    window.scrollTo({ top: window.scrollY + off, behavior: 'smooth' });
    return true;
  };

  useEffect(() => {
    let timer;
    // Once scrolling pauses, check the target is still where we aimed.
    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => pending.current && aim(), 120);
    };
    window.addEventListener('scroll', settle, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', settle);
    };
  });

  const go = i => {
    pending.current = { index: i, tries: 0 };
    aim();
  };

  return (
    <div className="case-nav" style={{ '--case-nav-panel': theme.panel || 'transparent' }} data-panel={theme.panel ? '' : undefined}>
      <LineSidebar
        items={sections.map(s => s.label)}
        accentColor={theme.accent}
        textColor={theme.text}
        markerColor={theme.marker}
        showIndex
        showMarker
        proximityRadius={100}
        maxShift={30}
        falloff="smooth"
        markerLength={36}
        markerGap={0}
        tickScale={0.5}
        scaleTick
        itemGap={14}
        fontSize={0.85}
        smoothing={100}
        active={active}
        onItemClick={go}
      />
    </div>
  );
};

export default CaseNav;
