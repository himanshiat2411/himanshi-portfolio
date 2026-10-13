import './Books.css';

// Drop a cover into src/assets/books/<slug>.webp (or .jpg/.png) and it shows when the book opens.
const covers = import.meta.glob('../assets/books/*.{webp,jpg,jpeg,png}', { eager: true, import: 'default' });
const bookCover = slug => Object.entries(covers).find(([path]) => path.includes(`/${slug}.`))?.[1];

const BOOKS = [
  { title: 'The Psychology of Money', slug: 'psychology-of-money', bg: '#f4f1ea', fg: '#1a1a1a', accent: '#6f927c', author: 'Morgan Housel', h: 92, note: 'Behaviour beats spreadsheets. I design for how people actually decide, not how they should.' },
  { title: 'The Monk Who Sold His Ferrari', slug: 'monk-who-sold-his-ferrari', bg: '#f08224', fg: '#141414', accent: '#ffffff', author: 'Robin Sharma', h: 84, note: 'Clarity comes from removing, not adding. Same for screens.' },
  { title: "Don't Believe Everything You Think", slug: 'dont-believe-everything-you-think', bg: '#ffffff', fg: '#e4623a', accent: '#e4623a', author: 'Joseph Nguyen', h: 76, note: 'My first idea is a guess. Research decides, not ego.' },
  { title: 'The Power of Your Subconscious Mind', slug: 'power-of-your-subconscious-mind', bg: '#ffffff', fg: '#111111', accent: '#e2262b', author: 'Joseph Murphy', h: 88, note: 'Most choices happen before we notice. Good defaults matter.' },
  { title: 'Think and Grow Rich', slug: 'think-and-grow-rich', bg: '#151515', fg: '#f2b134', accent: '#f2b134', author: 'Napoleon Hill', h: 80, note: 'A clear goal turns effort into progress. Every project starts with one.' },
  { title: 'The Courage to Be Disliked', slug: 'courage-to-be-disliked', bg: '#ffffff', fg: '#d42a20', accent: '#d42a20', author: 'Kishimi & Koga', h: 94, note: 'I can defend a design decision without needing everyone to love it.' },
  { title: 'Atomic Habits', slug: 'atomic-habits', bg: '#fbf7ee', fg: '#1a1a1a', accent: '#b8893a', author: 'James Clear', h: 82, note: 'Small, repeated improvements win. I design and iterate the same way.' },
  { title: 'The Art of Laziness', slug: 'art-of-laziness', bg: '#f7f7f5', fg: '#1d1b3a', accent: '#c98a2e', author: 'Library Mindset', h: 72, note: 'The easiest path is the one people take. Make the right path the easy one.' },
  { title: 'Deep Work', slug: 'deep-work', bg: '#f6eed2', fg: '#3a3d45', accent: '#c9a23a', author: 'Cal Newport', h: 86, note: 'My best work comes from long, quiet focus, so I protect it.' },
  { title: 'Thinking, Fast and Slow', slug: 'thinking-fast-and-slow', bg: '#f1ede6', fg: '#1a1a1a', accent: '#e8b928', author: 'Daniel Kahneman', h: 96, note: 'Users run on System 1. Interfaces should not make them think twice.' },
  { title: 'Who Will Cry When You Die?', slug: 'who-will-cry-when-you-die', bg: '#2fb4ea', fg: '#101820', accent: '#ffffff', author: 'Robin Sharma', h: 78, note: 'Work that helps people outlasts work that just looks good.' },
  { title: 'The Alchemist', slug: 'the-alchemist', bg: '#f08a24', fg: '#b3261e', accent: '#ffffff', author: 'Paulo Coelho', h: 74, note: 'The journey is the lesson. Every project teaches me something new.' },
  { title: 'The Kite Runner', slug: 'the-kite-runner', bg: '#a9cdea', fg: '#a52a1f', accent: '#1e3f7a', author: 'Khaled Hosseini', h: 90, note: 'Empathy starts with understanding someone else’s story. That is research.' },
  { title: 'Rich Dad Poor Dad', slug: 'rich-dad-poor-dad', bg: '#4b2a7a', fg: '#f5c518', accent: '#ffffff', author: 'Robert Kiyosaki', h: 84, note: 'Build assets, not just output. I make systems that keep paying off.' },
  { title: 'Show Your Work!', slug: 'show-your-work', bg: '#f7d117', fg: '#111111', accent: '#111111', author: 'Austin Kleon', h: 70, note: 'Share the process, not just the result. That is why my case studies show the messy middle.' },
  { title: 'Keep Going', slug: 'keep-going', bg: '#1f5fb8', fg: '#ffffff', accent: '#f7d117', author: 'Austin Kleon', h: 66, note: 'Creativity is a daily practice, not a lightning strike.' },
  { title: 'Steal Like an Artist', slug: 'steal-like-an-artist', bg: '#111111', fg: '#ffffff', accent: '#e2262b', author: 'Austin Kleon', h: 74, note: 'Nothing is original. I study great work and remix it into something new.' },
  { title: 'Everything Is F*cked', slug: 'everything-is-fcked', bg: '#13b5c0', fg: '#0b0b0b', accent: '#ffffff', author: 'Mark Manson', h: 88, note: 'Hope is fragile, honesty is not. I would rather show a real problem than a pretty one.' }
];

// "You are 90% of the books you read": a shelf of spines; hovering or tapping one opens it.
const Books = () => (
  <section className="books-section" id="books">
    <div className="container">
      <h2 className="books-eyebrow">You are 90% of the books you read</h2>
      <p className="books-lede">
        Here&rsquo;s my version. <em className="books-hint-mouse">Hover a spine to see what it taught me.</em>
        <em className="books-hint-touch">Tap a spine to see what it taught me.</em>
      </p>
      <ul className="books-shelf">
        {BOOKS.map((book, i) => (
          <li key={book.title} className="book" style={{ '--h': `${book.h}%`, '--book-bg': book.bg, '--book-fg': book.fg, '--book-accent': book.accent }} tabIndex={0}>
            <span className="book-spine">
              <span className="book-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="book-title">{book.title}</span>
            </span>
            <span className="book-open">
              {bookCover(book.slug) && (
                <img className="book-cover" src={bookCover(book.slug)} alt={`${book.title} cover`} loading="lazy" />
              )}
              <span className="book-open-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
              <span className="book-note">{book.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Books;
