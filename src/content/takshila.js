// All copy for the Takshila case study (/work/takshila). Edit text here; layout lives in
// src/pages/Takshila.jsx and src/components/takshila/.

export const HERO = {
  headline: 'Takshila is a handcrafted jewelry marketplace with no playbook to follow,',
  headlineEmphasis: 'so we built one around its users.',
  intro:
    'Takshila is an AI-powered jewelry marketplace: you design your own piece with AI, and a skilled artisan makes it by hand. I led JTBD research, redesigned the core screens for the US festive season, and defined the PRD, flows and IA for Project North Star, the next version of Takshila.',
  meta: [
    { label: 'My role', value: 'Product Design Intern' },
    { label: 'Timeline', value: '6 Months' }
  ]
};

export const CONTEXT = {
  label: 'Context',
  heading: 'A new kind of marketplace, with three kinds of people',
  what: 'Takshila connects customers, designers and artisans. Customers co-create with AI, and an artisan makes the piece by hand.',
  users: [
    { title: 'Customers', text: 'Co-design a piece and own it' },
    { title: 'Designers', text: 'Design pieces and earn on every sale' },
    { title: 'Artisans', text: 'Make each piece by hand' }
  ],
  // Context for the decisions: the three main parts of Takshila, each with a short line.
  know: {
    heading: 'What you need to know before my decisions',
    screens: [
      { name: 'Community', text: 'Where people share moments, follow makers and join challenges.', alt: 'The Takshila Community page' },
      { name: 'Design Studio', text: 'Describe a piece in words and AI designs it for you.', alt: 'The Takshila Design Studio prompt screen' },
      { name: 'Profile', text: 'A designer’s page with their collections, followers and story.', alt: 'A Takshila designer profile' }
    ]
  },
  stakeholderLead: 'Who else Takshila depends on:'
};

export const RESEARCH = {
  label: 'Research',
  heading: 'Understanding the jobs users hire Takshila for',
  text: 'Since Takshila was new, we couldn’t copy what others were doing. So we went straight to people. We ran detailed Jobs-To-Be-Done (JTBD) interviews with 15 people from around the globe, and I personally led 5 of them one-on-one.',
  interviewed: 'Interviewed: 9 customers, 4 sellers, 2 artisans',
  callsNote: 'Interviews over Google Meet. Interviewees’ faces are blurred for privacy.',
  learnedHeading: 'What we learned',
  insights: [
    {
      id: 'insight-1',
      title: 'Buying jewelry online feels risky',
      text: 'It’s costly and personal, and they can’t touch it.',
      quote: 'When I buy jewelry online, I want to feel sure about what I’m getting, so I don’t regret spending my money.'
    },
    {
      id: 'insight-2',
      title: 'AI alone isn’t enough',
      text: 'Prompts are hard. People want a guide.',
      quote: 'When I design my own piece, I want someone to guide me, so I can get what I imagined without struggling with prompts.'
    },
    {
      id: 'insight-3',
      title: 'Delivery causes anxiety',
      text: 'Occasion pieces need clear timelines.',
      quote: 'When I order a piece for a special occasion, I want clear timelines and updates, so I know it will arrive on time.'
    },
    {
      id: 'insight-4',
      title: 'Easy returns build trust',
      text: 'A simple return makes ordering feel safe.',
      quote: 'When I buy custom jewelry, I want an easy way to return it, so I feel safe placing the order.'
    }
  ]
};

export const WORK = {
  label: 'The work',
  heading: 'What I worked on',
  sub: 'Three projects, one after another.',
  // Shown in this order: US festive season, Project North Star, Redesign. North Star is highlighted.
  phases: [
    {
      num: '01',
      title: 'US festive season',
      about: 'Getting the site ready for the US festive season, October to December.',
      problem: 'Friction at checkout was losing sales.',
      to: 'phase-2'
    },
    {
      num: '02',
      title: 'Project North Star',
      about: 'The next version of Takshila, rebuilt from scratch.',
      problem: 'In the Design Studio, users settled for the AI’s first design.',
      to: 'phase-3',
      current: true
    },
    {
      num: '03',
      title: 'Redesign',
      about: 'A refresh of Takshila’s existing website.',
      problem: 'The old design didn’t match the pieces it sold.',
      to: 'phase-1'
    }
  ]
};

export const APPROACH = {
  heading: 'Design principles',
  principles: [
    { id: 'principle-jakob', name: 'Jakob’s Law', text: 'Use patterns people already know.' },
    { id: 'principle-hick', name: 'Hick’s Law', text: 'Show less; reveal more when needed.' },
    {
      id: 'principle-recognition',
      name: 'Recognition over recall',
      text: 'Pick from options, not blank prompts.'
    },
    {
      id: 'principle-ikea',
      name: 'IKEA effect',
      text: 'People value what they help make.'
    },
    {
      id: 'principle-peak-end',
      name: 'Peak-end rule',
      text: 'Nudge people to explore, not leave.'
    },
    { id: 'principle-proof', name: 'Proof over promise', text: 'Back every claim with something visible.' }
  ],
  closing: 'Designing a platform that feels familiar, lets people make something truly theirs, and',
  closingEmphasis: 'backs every claim with proof.'
};

export const PHASE_1 = {
  label: 'Phase 3',
  heading: 'Redesigning the old Takshila website',
  intro: 'We started by redesigning the existing screens to make them simpler and easier to use.',
  rounds: [
    { label: 'Round 1', text: 'Structure: what goes where, and why.' },
    {
      label: 'Round 2',
      text: 'After team pushback on scope or a specific screen, like Design Studio’s two-path split and the Profile shell.'
    },
    { label: 'Round 3', text: 'Only where the build didn’t match the design, like Orders.' }
  ],
  roundsCaption: '2 to 3 rounds per surface.'
};

export const PHASE_2 = {
  label: 'Phase 1',
  heading: 'Getting Takshila ready for the US festive season',
  intro: 'I audited 11 flows, from home to checkout.',
  audit: ['Homepage', 'Discovery feed', 'Product page', 'Cart', 'Checkout'],
  // Three key decisions, in this order: the product page, checkout with OTP, and the Shop.
  decisionsHeading: 'Key decisions',
  keyDecision: {
    tag: 'Shop',
    title: 'Bringing the Shop forward',
    text: 'Takshila was positioned only as a community. People could browse and engage, but buying wasn’t the focus. Before the festive season, I pushed for the Shop to become a main feature, so the platform could drive sales and not just engagement.',
    separate: 'The Shop is a dedicated space for buying, kept separate from the Community, so shopping gets its own focus.',
    alt: 'The new Takshila Shop page: a festive hero, shop by category, filters and a grid of pieces to customise'
  },
  // The product page: previous vs new side by side, then the choices behind it.
  productPage: {
    tag: 'Product page',
    title: 'A product page without the friction',
    text: 'I removed the friction points and the extra, unnecessary details from the product page.',
    beforeAlt: 'The previous Takshila product page for a ring',
    alt: 'The new Takshila product page for a ring',
    // box: where each choice sits on the new page, [x, y, w, h] in its pixels (1440 × 3375).
    choices: [
      {
        title: 'Metal in one row',
        box: [828, 412, 538, 246],
        chose: 'Karat, metal type and colour, which were three separate choices, now sit in one row.',
        why: 'Three pickers for one decision slowed people down.',
        tradeoff: 'Rare combinations aren’t shown up front.'
      },
      {
        title: 'No reviews, for now',
        box: [828, 133, 538, 247],
        chose: 'Removed the reviews section.',
        why: 'We’re a new brand with no reviews yet, and an empty review block hurts trust more than none.',
        tradeoff: 'No social proof yet; trust points like certified stones carry it instead.'
      },
      {
        title: 'Delivery on the page',
        box: [828, 1387, 538, 360],
        chose: 'Check delivery right on the product page, with the trust points beside it.',
        why: 'Custom pieces are for occasions, so people need to know it will arrive on time.',
        tradeoff: 'A slightly longer page.'
      },
      {
        title: 'Every view of the piece',
        box: [75, 133, 703, 1736],
        chose: 'A gallery with every angle, and the piece being worn.',
        why: 'The old page had one image, and people can’t touch jewelry online.',
        tradeoff: 'More photos to shoot for every piece.'
      },
      {
        title: 'Made for you',
        box: [75, 2141, 1290, 555],
        chose: 'Sets built around the piece, like The Proposal Set.',
        why: 'Keeps people interested and grows the order.',
        tradeoff: 'Pushes “You might also like” further down.'
      }
    ]
  },
  checkout: {
    tag: 'Checkout',
    title: 'Guest checkout with OTP',
    problem: 'Checkout took 10 to 12 clicks. Customers had to sign up, and there was no familiar way to pay.',
    clicks: { before: '10–12', after: '5–6' },
    chose: 'Guest checkout with a one-time code (OTP) and Apple Pay, cutting checkout to 5 to 6 clicks.',
    why: 'Forcing a sign-up right at checkout loses buyers. OTP and Apple Pay are ways people already know.',
    tradeoff: 'Fewer accounts up front, so it’s harder to bring guests back later.'
  }
};

export const PHASE_3 = {
  label: 'Phase 2',
  heading: 'Project North Star',
  intro: 'North Star is a complete rebuild of Takshila. For this, I wrote the PRD and defined the user flows and information architecture.',
  sub: 'I worked on 2 PRDs: the Design Studio (AI design fixation) and the Community page.',
  decisionsHeading: 'Key decisions',
  // Decision A: the three kinds of people who prompt the AI. The middle one is the focus group.
  promptUsers: [
    { key: 'none', title: 'No idea yet', text: 'Doesn’t know what they want.', idea: false, prompt: false },
    {
      key: 'stuck',
      title: 'Has an idea, can’t prompt it',
      text: 'Knows what they want, but can’t put it into words.',
      idea: true,
      prompt: false,
      focus: true
    },
    { key: 'expert', title: 'Has an idea and can prompt it', text: 'Knows what they want and can describe it well.', idea: true, prompt: true }
  ],
  focusLabel: 'Our focus group'
};

export const DECISIONS = [
  {
    id: 'decision-a',
    tag: 'Design Studio',
    heading: 'Ask before you generate',
    points: [
      { label: 'The question', text: 'Should AI generate a design straight from a rough prompt?' },
      { label: 'What I found', text: 'Seeing an AI image locks people’s thinking to it. It hurts most those who know what they want but can’t put it into words.' }
    ],
    choice: {
      chose: 'Read the prompt first, ask only about what’s missing, then generate.',
      why: 'Their answers describe their own idea, so they judge our design against it.',
      tradeoff: 'An extra step, which complete prompts skip.'
    },
    principles: ['principle-recognition', 'principle-ikea'],
    // The three kinds of people who prompt sit right after the finding.
    visualAfter: 'What I found',
    // The Design Studio screen closes the card. Zones are [x, y, w, h] in the screen's pixels (1423 × 800).
    screen: {
      alt: 'The Design Studio asking about the occasion, feeling and story before showing a bracelet design',
      zones: [
        {
          id: 'prompt',
          title: 'The rough prompt',
          text: 'We read it first, instead of generating straight away.',
          box: [481, 104, 385, 46]
        },
        {
          id: 'occasion',
          title: 'Ask what’s missing',
          text: 'It’s missing the occasion, so we ask what the piece is marking.',
          box: [247, 165, 600, 140]
        },
        { id: 'feeling', title: 'The feeling', text: 'Then the feeling it should carry.', box: [247, 333, 600, 160] },
        { id: 'story', title: 'The story', text: 'And the story behind it, in their own words.', box: [247, 501, 610, 110] },
        { id: 'design', title: 'Then generate', text: 'Only then do we generate, from their answers.', box: [961, 160, 378, 420] },
        {
          id: 'directions',
          title: 'Three directions',
          text: 'Three directions to explore, judged against their own idea.',
          box: [924, 592, 437, 111]
        }
      ]
    }
  },
  {
    id: 'decision-b',
    tag: 'Design Studio · Output count',
    heading: 'Why three options, not one or two',
    points: [
      { label: 'The question', text: 'How many AI options should we show?' },
      { label: 'What I found', text: 'One isn’t a choice, two feels like a test, and four or more turns into browsing.' }
    ],
    choice: {
      chose: 'Three variations per prompt.',
      why: 'Three is the smallest number that reads as a range.',
      tradeoff: 'A vague prompt can still return three wrong options.'
    },
    principles: ['principle-hick'],
    // The one-to-four options comparison sits right after the finding.
    visualAfter: 'What I found'
  },
  {
    id: 'decision-d',
    tag: 'Community',
    heading: 'Infinite, with a checkpoint',
    points: [
      { label: 'The question', text: 'Should the Community Feed scroll forever?' },
      { label: 'What I found', text: 'The Feed drives engagement, but endless scrolling turns into autopilot.' }
    ],
    choice: {
      chose: 'Infinite scroll, with a “Load more” pause after a set number of posts.',
      why: 'A natural break, and a moment to act on what they saw.',
      tradeoff: 'Less of the always-on feel of social apps.'
    },
    principles: ['principle-peak-end'],
    // The real feed, with its checkpoint called out, sits right after the finding.
    visualAfter: 'What I found'
  }
];

export const BUILD = {
  label: 'Build',
  heading: 'When the build didn’t match the design',
  problem:
    'On Orders, the build didn’t match the design — colours and sizes on the order journey were off, and the developer had used a different font than our design system. I caught it by inspecting the live site myself. A mismatch that small still changes how the whole brand reads.',
  changed:
    'I asked for a weekly sync with the tech team — a fixed space to go over what was unresolved, what the team hadn’t understood in the designs, and where a real technical limit was the actual reason for a gap.'
};

export const IMPACT = {
  label: 'Impact',
  heading: 'What came out of it',
  numbers: [
    { value: 15, text: 'JTBD interviews, 5 led by me' },
    { value: 11, text: 'user flows audited, home to checkout' },
    { value: 2, text: 'North Star PRDs: Design Studio and Community' }
  ],
  pushedHeading: 'Changes I pushed for',
  pushed: ['Brought the Shop forward for the festive season', 'Caught the font and colour mismatch on Orders', 'Started a weekly design–tech sync'],
  honesty: 'The product wasn’t live with users during my time, so these are design decisions, not measured results.'
};

export const REFLECTION = {
  label: 'Reflection',
  heading: 'What I take with me',
  well: [
    'Found the user AI would fail, and designed the question flow that protects their idea.',
    'Made the business case for bringing the Shop forward.'
  ],
  differently: [
    'Test earlier. “Three options” and the spec questions could each have been tested in an afternoon.',
    'My three prompting groups (no idea, can’t prompt it, can prompt it) came from reasoning, not interviews.'
  ],
  closing: 'Most of this work was not drawing screens. It was deciding what the screens were for.'
};

export const FUN = {
  heading: 'My journey at Takshila',
  text: 'Every monthly session ended with a team fun day. Great people, great learning, and a lot of fun.',
  alt: 'The Takshila team on a video call for team fun day, with a “Hi Takshila” slide'
};

// Redesign before / after: the redesigned order-tracking card (rebuilt in code from the Figma design).
// Sub-steps under "In Production" use stage names from the old site; edit them here.
export const ORDER = {
  id: '#TKS-2025-0041',
  status: 'Crafting',
  product: 'Royal Sage Ring',
  maker: 'Arjun Mehta',
  ordered: 'April 10th, 2023',
  price: '$ 3,450',
  stages: [
    { name: 'Order Confirmed', state: 'done', date: 'May 07, 2026', time: '17:32:20' },
    { name: 'Product Approved', state: 'done', date: 'May 11, 2026', time: '22:02:10' },
    {
      name: 'In Production',
      state: 'current',
      icon: 'gem',
      date: 'May 21, 2026',
      time: '12:45:45',
      steps: [
        { name: 'Diamond sourced', state: 'pending' },
        { name: 'Ring in production', state: 'pending' }
      ]
    },
    { name: 'Final Product', state: 'pending', icon: 'ring' },
    { name: 'Product Verified', state: 'pending', icon: 'badge' },
    { name: 'Shipping', state: 'pending', icon: 'truck' },
    { name: 'Delivered', state: 'pending', icon: 'box' }
  ]
};
