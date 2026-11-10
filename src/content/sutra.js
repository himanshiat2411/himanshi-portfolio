// All copy for the Sutra case study (/work/sutra), from the team's design document for CVENT
// BeyondPixels 2026 (Team Jantar Mantar, DTU). Same shape as Sylus, Grub'n Grab and Finworld: a hook,
// numbers, an overview, then each part of the concept told as a decision tied to what research found.
// Images are keys into src/assets/sutra.

export const INTRO = {
  title: 'Sutra, a city that moves every night, and the AI that guides you through it',
  tags: ['Design competition', 'AI concept', 'Team of 2'],
  hook: 'A map tells you where things are. Moon remembers where you belong.',
  stats: [
    { value: '5', label: 'people interviewed, from a rider to a child' },
    { value: '3', label: 'concepts sketched and compared' },
    { value: '5', label: 'moods that show what the AI feels' },
    { value: '9', label: 'prototype screens to meet Moon' }
  ],
  overview: [
    { label: 'Problem', text: 'In 2080 everyone stays in, so the city reshuffles its streets every night to bring people together.' },
    { label: 'Solution', text: 'Moon, an AI companion that floats beside you and guides you without a screen.' },
    { label: 'Result', text: 'A world, a character, a phone prototype and a 3D film.' }
  ],
  paragraphs: [
    'Sutra is a city in 2080, run by an AI. Every night at 23:00, some streets and blocks quietly **swap places**, and only the AI knows the new map. Everyone gets Moon, a glowing guide above their head. No maps, no signs, no screens.',
    'We designed it in a team of two for the CVENT BeyondPixels 2026 design competition.'
  ],
  context: {
    facts: [
      { label: 'Team', value: 'Akanksha Singh & Himanshi Meena' },
      { label: 'Event', value: 'CVENT BeyondPixels 2026' },
      { label: 'Made', value: 'World, character, prototype, film' }
    ],
    constraint:
      'A speculative brief: design for a city that changes overnight. We grounded every rule in what real people told us about finding their way today.'
  }
};

export const DECISIONS = {
  strategic: ['An AI companion, not a live map', 'Guide by landmarks that never move', 'One Moon, three modes for three people'],
  micro: ['Feelings in glow and shape, no words', 'Say sorry, then re-route', 'Learn patterns, never secrets']
};

// The five rules of the world, shown as a short list.
export const WORLD = {
  title: 'Five rules of Sutra',
  rules: [
    { name: 'When it changes', text: 'Every night at 23:00, some streets and blocks swap places.' },
    { name: 'Who knows', text: 'Only the AI knows the new map. Moon learns it and guides you.' },
    { name: 'Why it changes', text: 'One motive: bring people closer. Nothing else.' },
    { name: 'What can’t touch it', text: 'No person, company or system can steer how blocks move.' },
    { name: 'The daytime exception', text: 'In an emergency, streets may shift by day. Every AI is told at once.' }
  ],
  note: 'Blocks move. The river stays.'
};

export const RESEARCH = {
  title: 'What 5 people told us',
  text: 'We asked two young adults, a Zomato rider, an elder and a child how they find their way when their phone dies, and what would make them trust a city that changes.',
  insights: [
    { theme: 'Landmarks', quote: 'Temple, petrol pump, chai stall — that’s my map.', who: 'Zomato rider', then: 'Moon guides by landmarks. Anchors never move.' },
    { theme: 'People', quote: 'Honestly? I just ask someone.', who: 'Young adult', then: 'When unsure, Moon leads you to people and Anchors.' },
    { theme: 'Change', quote: 'Scared. I’d just stay home.', who: 'Elder', then: 'A steady Moon keeps routines and asks before any change.' },
    { theme: 'Reasons', quote: 'A new place to eat. Food is the best excuse.', who: 'Young adult', then: 'Moon gives reasons to go out, not just routes.' },
    { theme: 'Trust', quote: 'If it says sorry and fixes it fast.', who: 'Young adult', then: 'Moon shows when it’s wrong, says sorry and re-routes.' }
  ],
  backing: 'Each finding was checked against research, from Kevin Lynch’s The Image of the City (1960) to recent work on wayfinding and trust.'
};

// Three directions we sketched, compared on the same questions.
export const CONCEPTS = {
  title: 'Three directions, one choice',
  text: 'We sketched three ways to guide people through a city that moves, then scored them on the same questions.',
  options: [
    { name: 'Dor', img: 'concept-dor', text: 'Threads that tie you to your places.' },
    { name: 'Moon', img: 'concept-moon', text: 'An AI companion beside you.', chosen: true },
    { name: 'Live map', img: 'concept-map', text: 'A map that redraws every morning.' }
  ],
  cols: ['Dor', 'Moon', 'Map'],
  // 2 = yes, 1 = partly, 0 = no
  rows: [
    ['Works with no screen', 2, 2, 0],
    ['Works for Lena, Arjun and Kamala', 1, 2, 0],
    ['Can show it’s unsure or wrong', 0, 2, 1],
    ['Keeps people’s privacy', 0, 1, 2],
    ['Goes beyond a map app', 2, 2, 0],
    ['Brings people together', 1, 2, 0]
  ]
};

export const FEATURES = [
  {
    id: 'su-guide',
    title: 'Guiding without a screen',
    what: 'Moon flies ahead, waits at turns, leans into corners and glows brighter as you get close. It chirps to turn, hums to go and lands on your shoulder when you arrive.',
    solves: { theme: 'Landmarks', problem: 'People find their way by landmarks, not addresses, and a map needs your eyes.' },
    decision: {
      hook: 'Guide like a living creature, not a map',
      before: 'A live map that redraws every morning is familiar, but it keeps your eyes on a screen.',
      decision: 'Moon leads with movement and light, past Anchors, landmarks that never move.',
      result: 'You follow Moon’s gaze instead of reading anything. Sound, not speech.'
    },
    micro: ['It speaks only when asked to.', 'For people who can’t see Moon: sound and a wristband buzz.'],
    shots: [
      { label: 'Flies ahead', img: 'guide-ahead' },
      { label: 'Leans into turns', img: 'guide-lean' },
      { label: 'Looks the right way', img: 'guide-look' },
      { label: 'Sound, not speech', img: 'guide-sound' },
      { label: 'Lands when you arrive', img: 'guide-land' }
    ]
  },
  {
    id: 'su-moods',
    title: 'Feelings you can see',
    what: 'Moon has two eyes and no mouth. It shows how it feels in its glow and shape: calm, happy, unsure, alert and sorry.',
    solves: { theme: 'Trust', problem: 'People trust an AI again when it shows it’s unsure, says sorry and tells them why.' },
    decision: {
      hook: 'Two eyes, no mouth',
      before: 'Today’s assistants talk, and words make it easy to sound sure when they aren’t.',
      decision: 'Five moods in glow and shape, from a steady glow to a flicker when unsure and a droop when sorry.',
      result: 'You can tell at a glance when Moon is unsure, so it never hides a doubt in a sentence.'
    },
    micro: ['Glows in your colour, and shifts a little with your mood.', 'The same shape from every side, so you always know it’s a Moon.'],
    shots: [{ label: 'Calm, Happy, Unsure, Alert, Sorry', img: 'moods', wide: true }]
  },
  {
    id: 'su-modes',
    title: 'One Moon, three modes',
    what: 'Three residents shaped three ways Moon behaves: a tourist, a delivery rider and an elder who lives alone.',
    solves: { theme: 'Change', problem: 'A city that changes overnight feels like danger to elders, and lost minutes cost riders money.' },
    decision: {
      hook: 'Different people, different Moons',
      before: 'One guide for everyone would be too slow for a rider and too sudden for an elder.',
      decision: 'Guest Moon for Lena (zero words), Rider mode for Arjun (no timers, no scores), Steady Moon for Kamala (keeps her routine).',
      result: 'Each person gets the help they need, and Kamala is asked before anything changes.'
    },
    micro: ['When a block moves mid-route, the city logs it and a Delay Fund covers the rider.', 'For a small child, Moon stays close and alerts a parent.'],
    shots: [
      { label: 'Lena, 29 · Guest Moon', img: 'lena' },
      { label: 'Arjun, 24 · Rider mode', img: 'arjun' },
      { label: 'Kamala, 75 · Steady Moon', img: 'kamala' }
    ]
  },
  {
    id: 'su-wrong',
    title: 'When Moon gets it wrong',
    what: 'Moon pulls Kamala toward her old tailor shop. She stops, raises a palm, and Moon owns the mistake.',
    solves: { theme: 'Trust', problem: 'An AI that fails quietly loses trust fast.' },
    decision: {
      hook: 'Say sorry, then fix it',
      before: 'Most AI either hides a mistake or explains it in text nobody reads.',
      decision: 'Moon droops and dims, comes back close, re-routes past a landmark she trusts, and learns: no detours on pharmacy days.',
      result: 'The mistake becomes a moment of trust instead of a reason to stay home.'
    },
    micro: ['Out of date: Moon flickers “not sure” and goes to an Anchor.', 'Offline: Moon glows dim and points to a local person.', 'Palm up always means stop.'],
    shots: [{ label: 'Moon says sorry', img: 'sorry', wide: true }]
  },
  {
    id: 'su-privacy',
    title: 'Watched, or looked after?',
    what: 'Our own edge case: “Isn’t Moon watching everything I do?”',
    solves: { theme: 'Trust', problem: 'A companion that knows where you go can feel like surveillance.' },
    decision: {
      hook: 'Learn patterns, never secrets',
      before: 'An AI that learns you is the biggest privacy risk of the Moon concept.',
      decision: 'Moon remembers where and when you like to go, never what you said or did there. You can see what it learned and delete anything.',
      result: 'Brushing Moon away always wins, so the person stays in control.'
    },
    micro: ['Put it to rest, or brush it away at any time.']
  }
];

// The onboarding prototype: meeting Moon for the first time.
export const PROTOTYPE = {
  title: 'Meeting Moon',
  text: 'Onboarding that feels like being understood, not signing up. Every answer gets a reply, and picking an option moves you on. No forms. Try it below: it works like the real thing.',
  screens: [
    { label: 'Sign up', img: 'screen-signup', alt: 'Sign up: the AI to step outside with' },
    { label: 'Check-in', img: 'screen-checkin', alt: 'A gentle check-in where Moon replies to every answer' },
    { label: 'Connection', img: 'screen-love', alt: 'Love and connection: Moon learns who you miss' },
    { label: 'A good day', img: 'screen-goodday', alt: 'What a good day outside looks like' },
    { label: 'Reveal', img: 'screen-reveal', alt: 'Tap and hold to meet Moon' },
    { label: 'Hello', img: 'screen-hello', alt: 'Hello, Moon, shaped by your answers' },
    { label: 'First words', img: 'screen-words', alt: 'Moon’s first words: brush me away anytime' },
    { label: 'Home', img: 'screen-home', alt: 'Home, with a loose end and your people nearby' },
    { label: 'Today’s map', img: 'screen-map', alt: 'Today’s map: the city moved and Moon knows the way' }
  ]
};

// Kamala's Thursday, told in six moments.
export const JOURNEY = {
  title: 'Kamala’s Thursday',
  text: 'A full day with Steady Moon, for a 75-year-old whose pharmacy moved overnight.',
  steps: [
    { time: '7:00 AM', label: 'A calm heads-up', img: 'kamala-1' },
    { time: '8:00 AM', label: 'Same walk, new streets', img: 'kamala-2' },
    { time: '9:00 AM', label: 'The old bridge', img: 'kamala-3' },
    { time: '9:30 AM', label: 'Moon gets it wrong', img: 'kamala-4' },
    { time: '10:30 AM', label: 'Medicines in hand', img: 'kamala-5' },
    { time: '5:00 PM', label: 'A reason to go out', img: 'kamala-6' }
  ]
};

export const RULES = {
  title: 'Three rules Moon lives by',
  items: [
    { name: 'Show, don’t tell', text: 'Lena follows Moon’s gaze.' },
    { name: 'Say sorry, then fix it', text: 'Moon droops, then re-routes.' },
    { name: 'You can always stop it', text: 'Palm up means stop.' }
  ]
};

export const PROCESS = {
  title: 'How we made it',
  text: 'Claude for ideas, research and writing. Claude Code for the prototype, the 3D film and the document. Gemini for images of Moon and Sutra, three.js for the 3D city, and Figma for the screens.',
  references: 'Inspired by S Line’s threads above people’s heads, Calvino’s Invisible Cities, Lynch’s landmarks, Monopoly’s fixed edge around a moving board, and Replika’s onboarding.'
};

export const NEXT = {
  title: 'What we’d do next',
  items: [
    { label: 'Test first', text: 'Can people learn Moon’s signals in a day?' },
    { label: 'Open question', text: 'Would you trust a city that knows what you long for?' },
    { label: 'With more time', text: 'Build a real Moon and test it in a market.' }
  ]
};
