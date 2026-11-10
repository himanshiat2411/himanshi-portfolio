// What each Selected work card says: what was broken, what I did and what changed. Keyed by project
// title and shared by the desktop deck and the phone grid. None of these products had live usage
// data, so `changed` holds design results and real scope, never invented growth numbers.
export const WORK_CARDS = {
  Takshila: {
    line: 'An AI jewelry marketplace heading into the US festive season, where buying was hard and the Shop was an afterthought.',
    broken: ['Checkout took 10–12 clicks', 'Customers had to sign up to buy', 'Built screens drifted from the design'],
    did: ['Led 5 of 15 JTBD interviews', 'Audited 11 flows, home to checkout', 'Pushed the Shop forward as a main feature', 'Wrote 2 North Star PRDs'],
    changed: [
      { value: '10–12 → 5–6', label: 'Clicks to check out' },
      { value: '11', label: 'Flows audited' },
      { value: '2', label: 'PRDs for the next version' }
    ]
  },
  Finworld: {
    line: 'A financial modeling tool that has to work for a nervous beginner and a demanding expert at once.',
    broken: ['Formulas buried in spreadsheets', 'Beginners lost, experts boxed in', 'One bad column quietly breaks every chart'],
    did: ['Designed import, model, dashboard and AI helper', 'Put one dashboard behind both users', 'Added a Map columns step at import'],
    changed: [
      { value: '55 hrs', label: 'Solo, start to finish' },
      { value: '4 tools', label: 'In one design language' },
      { value: '3 min', label: 'Target, file to dashboard' }
    ]
  },
  'Grub’n Grab': {
    line: 'A campus app to buy, sell and swap, because students don’t trust strangers in WhatsApp groups.',
    broken: ['Trading scattered across WhatsApp groups', 'No way to tell who is a real student', 'Useful things thrown away instead of swapped'],
    did: ['Interviewed 10 students and graduates', 'Designed ID and selfie verification', 'Built swap into one listing form'],
    changed: [
      { value: '10', label: 'Interviews behind the design' },
      { value: '1 form', label: 'To sell or to swap' },
      { value: '6', label: 'Error states, each with a fix' }
    ]
  },
  'Sylus AI': {
    line: 'An AI marketing CRM with a founder who needed it fast, and no time for user research.',
    broken: ['AI tools forget the brand every time', 'Setup meant a long form', 'Agencies juggling separate tools per client'],
    did: ['Sole designer, 30+ screens in 1.5 months', 'Designed Individual and Agency workspaces', 'Backed each decision with a UX principle'],
    changed: [
      { value: 'Form → 1 link', label: 'To set up a brand' },
      { value: '3 answers', label: 'To plan a month of posts' },
      { value: '30+', label: 'Screens in 1.5 months' }
    ]
  },
  Sutra: {
    line: 'A speculative city in 2080 that reshuffles its streets every night to bring people together, and Moon, the AI that guides you through it.',
    broken: ['In a moving city, maps and signs stop working', 'Change scares the people who need routine most', 'An AI that fails quietly loses trust'],
    did: ['Interviewed 5 people, from a rider to a child', 'Compared 3 concepts and chose Moon', 'Designed its moods, 3 modes and the onboarding'],
    changed: [
      { value: 'Map → Moon', label: 'Guidance with no screen' },
      { value: '5 moods', label: 'To show when it’s unsure' },
      { value: '9 screens', label: 'Prototype to meet Moon' }
    ]
  }
};
