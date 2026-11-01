// Renders copy with **double-starred** phrases highlighted, so content files can mark the few words
// a skimming reader should catch. Everything else stays plain text.
const Rich = ({ text }) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i} className="hl">{part}</strong> : part));

export default Rich;
