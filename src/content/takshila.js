// All copy for the Takshila case study (/work/takshila). Edit text here; layout lives in
// src/pages/Takshila.jsx and src/components/takshila/.

export const HERO = {
  headline: 'Takshila is a handcrafted jewelry marketplace with no playbook to follow,',
  headlineEmphasis: 'so we built one around its users.',
  intro:
    'Takshila is a social-commerce marketplace for handcrafted jewelry. As a pioneer in this space, there was no set path to follow. I started with research, including JTBD interviews, to understand what users actually need. We then redesigned the existing screens, optimised the platform for Q4 festive sales, and began Project North Star, the next version of Takshila, for which I defined the PRD, user flows, and information architecture.',
  meta: [
    { label: 'My role', value: 'Product Design Intern' },
    { label: 'Timeline', value: '6 Months' }
  ]
};

export const CONTEXT = {
  label: 'Context',
  heading: 'A new kind of marketplace, with three kinds of people',
  what: 'Takshila is the world’s first peer-to-peer co-fabrication platform. It connects customers, designers, and artisans so they can create jewelry together — with no middlemen. Customers co-design with AI, and a named artisan makes it by hand.',
  users: [
    { title: 'Customers', text: 'Co-design a piece and own it' },
    { title: 'Designers', text: 'Design pieces and earn on every sale' },
    { title: 'Artisans', text: 'Make each piece by hand' }
  ],
  coreProblem:
    'A brand-new category, three very different users, and an AI that can quietly replace the customer’s own idea.',
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
      title: 'People still don’t fully trust buying jewelry online.',
      text: 'Jewelry is personal and costly. Without touching or seeing it in person, customers stay doubtful.',
      quote: 'When I buy jewelry online, I want to feel sure about what I’m getting, so I don’t regret spending my money.'
    },
    {
      id: 'insight-2',
      title: 'Users don’t trust AI to design alone.',
      text: 'Most people are not good at writing prompts. They want a companion or a professional to guide them while they design.',
      quote: 'When I design my own piece, I want someone to guide me, so I can get what I imagined without struggling with prompts.'
    },
    {
      id: 'insight-3',
      title: 'Delivery causes anxiety.',
      text: 'Custom pieces are usually made for special occasions. So customers need a clear timeline and exact updates on their order.',
      quote: 'When I order a piece for a special occasion, I want clear timelines and updates, so I know it will arrive on time.'
    },
    {
      id: 'insight-4',
      title: 'Easy returns build trust.',
      text: 'Customers wanted a simple return process. Knowing they can return a piece makes them trust the company more.',
      quote: 'When I buy custom jewelry, I want an easy way to return it, so I feel safe placing the order.'
    }
  ]
};

export const WORK = {
  label: 'The work',
  heading: 'What I worked on',
  sub: 'Three projects, one after another.',
  phases: [
    {
      num: '01',
      title: 'Redesign',
      about: 'A refresh of Takshila’s existing website.',
      problem: 'The old design didn’t match the pieces it sold.',
      to: 'phase-1'
    },
    {
      num: '02',
      title: 'Q4 Sales',
      about: 'Getting the site ready for the US festive season, October to December.',
      problem: 'Friction at checkout was losing sales.',
      to: 'phase-2'
    },
    {
      num: '03',
      title: 'Project North Star',
      about: 'The next version of Takshila, rebuilt from scratch.',
      problem: 'In the Design Studio, users settled for the AI’s first design.',
      to: 'phase-3'
    }
  ]
};

export const APPROACH = {
  heading: 'Design principles',
  principles: [
    { id: 'principle-jakob', name: 'Jakob’s Law', text: 'Use patterns people already know, even in a brand-new category.' },
    { id: 'principle-hick', name: 'Hick’s Law', text: 'Show less at once, and reveal details only when they’re needed.' },
    {
      id: 'principle-recognition',
      name: 'Recognition over recall',
      text: 'Let people pick from options instead of writing prompts from scratch.'
    },
    {
      id: 'principle-ikea',
      name: 'IKEA effect',
      text: 'People value what they help make, so the user makes the final edit.'
    },
    {
      id: 'principle-peak-end',
      name: 'Peak-end rule',
      text: 'If a design isn’t working, nudge people to explore instead of leaving frustrated.'
    },
    { id: 'principle-proof', name: 'Proof over promise', text: 'Back every claim with something visible, like the named artisan.' }
  ],
  closing: 'Designing a platform that feels familiar, lets people make something truly theirs, and',
  closingEmphasis: 'backs every claim with proof.'
};

export const PHASE_1 = {
  label: 'Phase 1',
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
  label: 'Phase 2',
  heading: 'Getting Takshila ready for Q4 sales',
  intro:
    'Before the US festive season (Halloween, Thanksgiving, Christmas and New Year), I did a full sales audit of the website. I checked the homepage, discovery feed, product page, cart and checkout. The goal was to find what stopped people from buying, fix it, and make them want to come back.',
  audit: ['Homepage', 'Discovery feed', 'Product page', 'Cart', 'Checkout'],
  auditNote: '11 user flows audited before Q4.',
  keyDecision: {
    title: 'Bringing the Shop forward',
    text: 'Takshila was positioned only as a community. People could browse and engage, but buying wasn’t the focus. Before the festive season, I pushed for the Shop to become a main feature, so the platform could drive sales and not just engagement.'
  },
  checkout: {
    problem: 'No easy checkout. Customers had to sign up, and there was no familiar way to pay.',
    proposed: 'Guest checkout with OTP instead of passwords, plus Apple Pay.'
  }
};

export const PHASE_3 = {
  label: 'Phase 3',
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
      {
        label: 'What I found',
        text: 'Seeing an AI image locks people’s thinking to it — they start liking what we made instead of what they came for. This mainly hurts one group: people who know exactly what they want but can’t put it into words.'
      },
      {
        label: 'What I chose',
        text: 'Don’t generate right away. Read the prompt first, check what’s missing — material, stone, size, budget — and ask only about that. Then generate.'
      },
      {
        label: 'Why',
        text: 'The questions do the job the user’s own words couldn’t. And by answering first, the user has already described their own idea — so they can judge our design against theirs, not just accept it.'
      },
      {
        label: 'What I gave up',
        text: 'An extra step before the exciting part. I only ask about what’s actually missing, so a complete prompt sails straight through.'
      },
      { label: 'What I’d measure', text: 'How often someone buys the very first design they’re shown.' }
    ],
    principles: ['principle-recognition', 'principle-ikea'],
    // The three kinds of people who prompt sit right after the finding.
    visualAfter: 'What I found'
  },
  {
    id: 'decision-b',
    tag: 'Design Studio · Output count',
    heading: 'Why three options, not one or two',
    points: [
      { label: 'The question', text: 'When AI generates designs from a prompt, how many options should we show?' },
      {
        label: 'What I found',
        text: 'One isn’t a choice — if it’s wrong, the only move is to start over. Two reads as a test, so people pick the less-bad one instead of what they actually want. Three shows a real range without turning into work. More than three turns choosing into browsing, and every extra option costs more to generate.'
      },
      { label: 'What I chose', text: 'Three variations per prompt.' },
      {
        label: 'Why',
        text: 'The right number depends on what happens next. We want someone to pick a direction and shape it — not pick a winner. Three is the smallest number that reads as a range, not an answer.'
      },
      {
        label: 'What I gave up',
        text: 'An honest gap: a vague prompt can still come back with three wrong options, and there’s no “none of these, try a different direction” path yet.'
      },
      {
        label: 'What I’d measure',
        text: 'How often people regenerate instead of refining — and whether the middle option gets picked far more than the other two.'
      }
    ],
    principles: ['principle-hick'],
    screenCaption: 'The actual screen — 3 directions to explore.'
  },
  {
    id: 'decision-d',
    tag: 'Community',
    heading: 'Infinite, with a checkpoint',
    points: [
      { label: 'The question', text: 'Should the Community Feed scroll forever, or stop at some point?' },
      {
        label: 'What I found',
        text: 'The Feed’s whole job is engagement — it’s the closest thing Takshila has to a social platform, and we want people spending real time there. But scrolling with no end has a cost: it’s easy to scroll on autopilot, and the Feed starts to feel like just another social app.'
      },
      {
        label: 'What I chose',
        text: 'Infinite scroll, with a “Load more” screen after a set number of posts — a natural pause, not a hard stop.'
      },
      {
        label: 'Why',
        text: 'The pause gives people a break from autopilot scrolling — less mental load. And it’s a natural exit: keep going, or act on what they saw — the Design Studio, an order, the Home page.'
      },
      {
        label: 'What I gave up',
        text: 'Some of the always-on feeling other social apps have. The Feed is supposed to bring people back to making something, not compete for attention.'
      },
      {
        label: 'What I’d measure',
        text: 'How many people tap “Load more” versus stop at the checkpoint — and what they do right after.'
      }
    ],
    principles: ['principle-peak-end']
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
    { value: 11, text: 'user flows audited before Q4' },
    { value: 2, text: 'North Star PRDs: Design Studio and Community' }
  ],
  pushedHeading: 'Changes I pushed for',
  pushed: ['Brought the Shop forward for Q4', 'Caught the font and colour mismatch on Orders', 'Started a weekly design–tech sync'],
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
    'My three prompting groups (no idea, can’t prompt it, can prompt it) came from reasoning, not interviews.',
    'I argued the Shop leads people to co-create, but never designed the moment that invites them.',
    'I under-planned the video hero — load time, fallbacks, re-shoots.'
  ],
  closing: 'Most of this work was not drawing screens. It was deciding what the screens were for.'
};

export const FUN = {
  heading: 'My journey at Takshila',
  text: 'Every monthly session ended with a team fun day. Great people, great learning, and a lot of fun.',
  alt: 'The Takshila team on a video call for team fun day, with a “Hi Takshila” slide'
};

// Phase 1 before / after: the redesigned order-tracking card (rebuilt in code from the Figma design).
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
