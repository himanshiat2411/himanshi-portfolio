// The "Selected work" / "AI concepts" switch above the project cards, shared by the desktop deck and
// the phone grid. AI concepts holds the speculative projects (for now, Sutra).
export const AI_CONCEPTS = ['Sutra', 'If I Were a Flower'];
export const inTab = (tab, title) => (tab === 'ai') === AI_CONCEPTS.includes(title);

const TABS = [
  { id: 'work', label: 'Selected work' },
  { id: 'ai', label: 'AI concepts' }
];

const WorkTabs = ({ tab, onTab, className }) => (
  <div className={`work-tabs ${className}`} role="tablist" aria-label="Projects">
    {TABS.map(t => (
      <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => onTab(t.id)}>
        {t.label}
      </button>
    ))}
  </div>
);

export default WorkTabs;
