// All copy for the Grub'n Grab case study (/work/grub-n-grab). Same shape as the Sylus page: a hook,
// a few numbers, an overview, then each part of the app told as a decision (Before / Decision /
// Result). Screens are keys into src/assets/grub-n-grab/screens.

export const INTRO = {
  title: 'Grub’n Grab, a campus app to buy, sell and swap with verified students',
  tags: ['Academic project', 'Mobile app', 'C2C marketplace'],
  hook: 'Buy, sell or swap, only with students you can trust.',
  stats: [
    { value: '10', label: 'students and graduates interviewed' },
    { value: '4', label: 'apps and groups compared' },
    { value: '1 ID + selfie', label: 'to become a verified seller' },
    { value: '6', label: 'error states designed' }
  ],
  overview: [
    { label: 'Problem', text: 'Students trade in messy WhatsApp groups with sellers nobody can verify.' },
    { label: 'Solution', text: 'A campus-only marketplace where every member is a verified student.' },
    { label: 'Result', text: 'A clickable prototype: sign up, verify, browse, offer and swap.' }
  ],
  paragraphs: [
    'Grub’n Grab is a mobile marketplace for one college campus. Students buy, sell or swap books, clothes and everyday items with each other.',
    'I did the research, the flows, the design system and the final screens on my own, as a 16-week academic project.'
  ],
  facts: [
    { label: 'Role', value: 'Sole designer and researcher' },
    { label: 'Duration', value: '16 weeks' },
    { label: 'Type', value: 'Academic project' }
  ]
};

// The headline decisions, listed near the top so a skim shows them first.
export const DECISIONS = {
  strategic: ['Campus-only, verified members', 'Swap built into the same listing form', 'Offers instead of fixed prices'],
  micro: ['Verify at sign-up, not later', 'Distance shown on every item', 'Clear fixes in every error']
};

export const RESEARCH = {
  title: 'What students told me',
  text: 'I interviewed 8 college students and 2 recent graduates about buying and selling on campus.',
  // The four themes that came up most, ordered by how often. `theme` is the big word on each card.
  insights: [
    { theme: 'Trust', quote: 'I don’t trust strangers from a WhatsApp group.', then: 'So every member is a verified student.' },
    { theme: 'Money', quote: 'Saving money matters more than anything.', then: 'So swapping is built in, for when nobody has cash.' },
    { theme: 'Access', quote: 'Juniors can’t reach seniors to buy their old things.', then: 'So the app shows everyone on campus, not just your friends.' },
    { theme: 'Waste', quote: 'Books and clothes pile up, and many get thrown away.', then: 'So listing an item takes one short form.' }
  ]
};

// Competitor comparison, rebuilt from the Figma table. WhatsApp groups get no tick for trust, since
// unverified sellers are the problem this project starts from.
export const COMPETITORS = {
  title: 'Where other options fall short',
  text: 'Big apps aren’t built for a campus. WhatsApp groups are, but nobody is verified.',
  cols: ['OLX', 'FreeUp', 'Depop', 'WhatsApp', 'Grub’n Grab'],
  rows: [
    ['Chat', 1, 1, 1, 1, 1],
    ['Swap', 0, 0, 0, 0, 1],
    ['Books and stationery', 1, 1, 0, 1, 1],
    ['Campus focused', 0, 0, 0, 1, 1],
    ['Student pricing', 0, 0, 0, 1, 1],
    ['Trust and safety', 0, 1, 1, 0, 1],
    ['Community feel', 0, 0, 0, 1, 1]
  ]
};

export const FEATURES = [
  {
    id: 'gg-verify',
    title: 'Sign up and verification',
    what: 'Sign up asks for a roll number, college and course, then a college ID and a selfie.',
    solves: { theme: 'Trust', problem: 'Buyers can’t tell who is really a student.' },
    decision: {
      hook: 'Verify at sign-up, not before the first sale',
      before: 'In WhatsApp groups, anyone can sell, and buyers can’t tell who is a student.',
      decision: 'Everyone verifies once, when they join. I also considered verifying only sellers, before their first sale.',
      result: 'Every profile is a real student, so buyers trust the whole app. The cost is a longer sign-up, so it’s split into two short steps.'
    },
    micro: ['A “Step 1 of 2” label shows how much is left.', 'Uploads show a tick and the file name, so people know it worked.', 'A clear “submitted” screen says how long the check takes.'],
    screens: [
      { label: 'Welcome', img: 'welcome', alt: 'Welcome screen with log in and sign up' },
      { label: 'Details', img: 'signup', alt: 'Sign up step 1: roll number, college, year and course' },
      { label: 'ID card', img: 'verify', alt: 'Sign up step 2: upload college ID and a selfie' },
      { label: 'Uploaded', img: 'submit', alt: 'Both documents uploaded, ready to submit' },
      { label: 'Submitted', img: 'submitted', alt: 'Verification submitted, with how long the check takes' }
    ]
  },
  {
    id: 'gg-browse',
    title: 'Finding an item',
    what: 'Home shows categories and nearby items. Each item page shows the price, distance, condition and the seller.',
    solves: { theme: 'Trust · Access', problem: 'Students can’t see what’s on campus or who is selling it.' },
    decision: {
      hook: 'Show distance and the seller up front',
      before: 'Students asked “where are you?” and “are you legit?” in every chat.',
      decision: 'Each item shows how far away it is, and the seller’s rating, swaps and verified badge.',
      result: 'The two questions people asked most are answered before they start a chat.'
    },
    micro: ['Categories match what students trade most: books, clothes, electronics, stationery.', '“Great deal” and “Recently added” tags help people scan.'],
    screens: [
      { label: 'Home', img: 'home', alt: 'Home: search, categories and nearby items' },
      { label: 'Item', img: 'product', alt: 'Item page: price, distance, condition and the verified seller' }
    ]
  },
  {
    id: 'gg-list',
    title: 'Listing an item',
    what: 'One form to sell or swap: photos, title, size, category, condition, then a price or what you want in return.',
    solves: { theme: 'Waste · Money', problem: 'Unused things get thrown away instead of sold or swapped.' },
    decision: {
      hook: 'One form, with a Sell / Swap switch',
      before: 'Selling and swapping could have been two separate flows to learn.',
      decision: 'The same form for both. A switch at the top swaps the price field for “Looking to swap for?”.',
      result: 'People learn one form. Swaps get their own feed, showing what each person wants in return.'
    },
    micro: ['Condition is a row of chips, not a dropdown, so it takes one tap.', 'Campus location is asked, since students meet in person.', 'Save Draft, so a listing can be finished later.'],
    screens: [
      { label: 'Sell', img: 'sell', alt: 'List an Item in Sell mode: photos, details, condition and price' },
      { label: 'Swap', img: 'swap-item', alt: 'List an Item in Swap mode: the price field becomes “Looking to swap for?”' },
      { label: 'Swap feed', img: 'swaps', alt: 'Swap Listing: each item shows what the owner wants in return' }
    ]
  },
  {
    id: 'gg-offer',
    title: 'Making an offer or a swap',
    what: 'Instead of a Buy button, people send a proposal: a price offer or a swap request, with a message.',
    solves: { theme: 'Money', problem: 'Students want to bargain, or trade when they have no cash.' },
    decision: {
      hook: 'Offers, not fixed prices',
      before: 'On campus, almost every sale starts with bargaining in chat.',
      decision: 'A proposal sheet with a suggested price, a lower option, “Other”, and room for a swap request.',
      result: 'Bargaining happens in one step, and swaps fit into the same flow. The trade-off is one more tap than a Buy button.'
    },
    micro: ['The suggested price is highlighted, so most people just accept it.'],
    screens: [{ label: 'Proposal', img: 'proposal', alt: 'Send Proposal: offer price, a suggested amount and a message for the seller' }]
  },
  {
    id: 'gg-errors',
    title: 'When something goes wrong',
    what: 'Every error says what went wrong and how to fix it.',
    solves: { theme: 'Drop-off', problem: 'People get stuck at verification and give up.' },
    decision: {
      hook: 'Every error tells you the fix',
      before: 'Verification can fail in many ways, and a vague “try again” leaves people stuck.',
      decision: 'Six error states, each with the reason and the next step, from a wrong roll number to rejected documents.',
      result: 'People can fix the problem themselves instead of giving up on sign-up.'
    },
    micro: ['Errors appear next to the field, in red, with plain words.', 'Rejected documents list exactly which file to upload again.'],
    screens: [
      { label: 'Roll number', img: 'err-roll', alt: 'Invalid roll number, shown under the field' },
      { label: 'College', img: 'err-college', alt: 'College not selected' },
      { label: 'Upload', img: 'err-3', alt: 'An ID upload that needs fixing, flagged in red' },
      { label: 'File size', img: 'err-size', alt: 'File too large, with the size limit' },
      { label: 'Failed', img: 'err-failed', alt: 'Verification failed, with a Try again button' },
      { label: 'Rejected', img: 'err-rejected', alt: 'Documents rejected, with the reasons and Resubmit' }
    ]
  }
];

export const TEST = {
  title: 'How I would test it',
  text: 'This was not usability tested yet. My next step is 5 students on two tasks.',
  tasks: [
    'Sign up and get verified. Success: 4 of 5 finish without help.',
    'Find a book and send an offer. Success: done in under 2 minutes.'
  ]
};

export const NEXT = {
  title: 'What I learned',
  paragraphs: [
    'Trust was the real product, not the listings. Next time I would test the verification flow first, since it is the step most likely to make people quit.'
  ]
};
