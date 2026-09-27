import './SelectedWork.css';

const PROJECTS = [
  { title: 'Takshila', summary: 'Social commerce · co-fabrication', year: '2026', href: '#' },
  { title: 'Grub’n Grab', summary: 'Campus marketplace · research', year: '2026', href: '#' },
  { title: 'Finworld', summary: 'Fintech dashboard', year: '2025', href: '#' },
  { title: 'Sylus AI', summary: 'SaaS Product · CRM Platform', year: '2026', href: '#' }
];

const SelectedWork = () => (
  <section className="work" id="work">
    <div className="container">
      <h2 className="work-heading">Selected work</h2>
      <ol className="work-list">
        {PROJECTS.map((project, i) => (
          <li key={project.title}>
            <a className="work-row" href={project.href}>
              <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="work-title">{project.title}</span>
              <span className="work-summary">{project.summary}</span>
              <span className="work-year">{project.year}</span>
              <span className="work-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export default SelectedWork;
