// All copy for the Sylus AI case study (/work/sylus-ai). Edit text here; layout lives in
// src/pages/Sylus.jsx. Structured as decision stories: list every decision, classify it, then tell
// the few that matter as Title · Hook · Before · Decision · After · Result. Each hook names the
// product moment and why it matters, so a recruiter gets both what Sylus does and what I solved.

export const HERO = {
  headline: 'Paste your website link.',
  headlineEmphasis: 'Get a month of on‑brand posts.',
  intro:
    'Sylus AI is an AI marketing platform: it learns a brand, then plans, writes, schedules and reports on its social media. I designed it end to end, from the first login to the workspace an agency uses to run a dozen brands.',
  meta: [
    { label: 'My role', value: 'Product Designer' },
    { label: 'Scope', value: 'Onboarding · Individual · Agency' },
    { label: 'Output', value: 'Clickable prototype' }
  ]
};

// What Sylus does, in three moves, each with its screen.
export const PRODUCT = {
  label: 'The product',
  heading: 'Three things Sylus does for you',
  items: [
    { title: 'Learns your brand', text: 'From a link or a file, it drafts your voice, audience and look.', img: 'brand-vibe' },
    { title: 'Creates and plans', text: 'Writes posts, finds trends and plans a month of content.', img: 'post-preview' },
    { title: 'Runs it for a team', text: 'Agencies manage many brands, approvals and reports in one place.', img: 'agency-overview' }
  ]
};

export const PROBLEM = {
  label: 'The problem',
  heading: 'AI tools give you a blank box and wish you luck',
  text: 'Most AI writers start with an empty prompt. You still have to explain your brand every time, decide what to post, and keep up a schedule. For an agency, multiply that by every client.',
  goal: 'Goal: Sylus should know the brand once, then do the heavy lifting every day.'
};

export const FLOW = {
  label: 'Onboarding',
  heading: 'Seven steps, one at a time',
  steps: ['Sign up', 'Workspace', 'Quick survey', 'Brand setup', 'AI processing', 'Brand Vibe', 'Connect socials'],
  note: 'Progressive disclosure: each step shows only what that step needs.',
  shots: [
    { img: 'login-final', caption: 'Login that explains the product', alt: 'Sylus AI login: a gradient panel listing four features beside the form' },
    { img: 'workspace', caption: 'Individual or Agency, asked first', alt: 'Workspace choice: Individual and Agency cards with what each includes' },
    { img: 'connect-accounts', caption: 'Connect socials, or skip for now', alt: 'Connect accounts step with Facebook, Instagram, LinkedIn and more' }
  ]
};

// Every decision, sorted into strategic (shapes the product) and micro (shapes a screen).
export const DECISIONS = {
  label: 'Every decision',
  heading: '16 decisions, sorted',
  sub: 'I listed every decision, then split them. The starred ones are told below.',
  items: [
    { text: 'AI drafts the brand from a link or a file', kind: 'strategic', star: true },
    { text: 'Create Post split into four small steps', kind: 'strategic', star: true },
    { text: 'Plan a month by answering three questions', kind: 'strategic', star: true },
    { text: 'One agency home for every client brand', kind: 'strategic', star: true },
    { text: 'Ask Individual or Agency before anything else', kind: 'strategic' },
    { text: 'Every AI output stays editable', kind: 'strategic' },
    { text: 'Roles and permissions set per brand', kind: 'strategic' },
    { text: 'Explain the product beside the login form', kind: 'micro' },
    { text: 'Tasks as a board or a calendar, same data', kind: 'micro' },
    { text: 'Turn a trending story into a post in one click', kind: 'micro' },
    { text: 'Preview the post exactly as it will appear', kind: 'micro' },
    { text: 'Approvals waiting, right on the agency home', kind: 'micro' },
    { text: 'Files grouped by brand in one library', kind: 'micro' },
    { text: 'Progress bar and step count on every setup screen', kind: 'micro' },
    { text: 'Social connections can be skipped', kind: 'micro' },
    { text: 'A prompt bar to refine the brand in plain words', kind: 'micro' }
  ]
};

// The decision stories. Image keys point into src/assets/sylus.
export const STORIES = [
  {
    id: 'story-brand',
    kind: 'Strategic',
    title: 'Your website is the brief',
    hook: 'Most AI tools start with an empty box. Sylus starts by reading your website, so the very first post already sounds like you.',
    before: {
      text: 'A long form: brand name, description, audience, voice, products. All typed by hand before the product does anything useful.',
      img: 'brand-setup',
      alt: 'Manual brand setup form with brand name, description, category and services'
    },
    decision: 'Paste a link or drop brand files, and Sylus drafts the whole brand: voice, audience, colours, fonts and a tagline. Every field stays editable, and a prompt bar refines it in plain words, like “make the tone more premium”.',
    after: { img: 'brand-vibe', alt: 'Brand Vibe: logo, colours, typography, tagline and mockups generated from the website' },
    result: 'Setup turns from writing into reviewing. Brands with no website still get a manual path.',
    micro: [
      'Why a prompt bar? Fixing a draft in plain words is faster than retyping a field.',
      'Why “Manual setup” as a small link? Most people have a website, so AI stays the default.'
    ]
  },
  {
    id: 'story-create',
    kind: 'Strategic',
    title: 'One post, four small steps',
    hook: 'A good post needs a brief, a caption, an image and a final check. Cram that into one screen and people get a wall of fields.',
    before: {
      text: 'The obvious version is one long page: topic, platforms, caption, hashtags, image prompt and schedule, all competing for attention.',
    },
    decision: 'A four-step flow, Brief → Caption → Media → Preview, with a step count at the bottom. The AI writes each part from the brief, and you can tweak it before moving on.',
    after: { img: 'post-preview', alt: 'Create Post preview: the LinkedIn post exactly as it will appear, with publish, schedule or save as draft' },
    result: 'Each screen asks one thing. The last one shows the post exactly as followers will see it, before it goes out.',
    micro: [
      'Why a step count at the bottom? Four steps feel short when you can see the end.',
      'Why Publish, Schedule and Save as draft side by side? Not every post is ready to go now.'
    ]
  },
  {
    id: 'story-planner',
    kind: 'Strategic',
    title: 'Plan a month in three answers',
    hook: 'Writing one post is easy. Posting every week for a month is where most brands give up.',
    before: {
      text: 'Without help, it is a blank calendar: you decide every day what to post, on which platform, in which format.',
    },
    decision: 'The AI Content Planner asks three things: how often (a week, 15 days, a month), the mix of formats, and the brief. Then it fills the calendar for you to approve.',
    after: { img: 'planner', alt: 'AI Content Planner: choose a cadence of a week, 15 days, a month or custom' },
    result: 'A month of posts starts from a few taps, and every post is still reviewed before it publishes.',
    micro: [
      'Why “A month” marked Most popular? It nudges the plan that keeps a brand posting.',
      'Why steppers for the format mix? Small numbers are quicker to tap than to type.'
    ]
  },
  {
    id: 'story-agency',
    kind: 'Strategic',
    title: 'One home for twelve brands',
    hook: 'An agency is not one big user. It is twelve clients, each with their own posts, people and approvals.',
    before: {
      text: 'The Individual dashboard, built for one brand: one queue, one set of accounts, no idea of clients or roles.',
      img: 'dashboard',
      alt: 'Individual dashboard for one brand: posts published, engagement, platform health and queue'
    },
    decision: 'An Agency Overview that shows every client brand at once, with what is scheduled today and what is waiting for approval. Roles and permissions are set per brand.',
    after: { img: 'agency-overview', alt: 'Agency Overview: 12 brands, 34 posts this week, pending approvals and client brand cards' },
    result: 'An account manager sees what needs them the moment they log in, across every client.',
    micro: [
      'Why approvals on the home screen? A post waiting on a client is the most urgent thing.',
      'Why tasks as a board or a calendar? Same data, two ways to think about the week.'
    ]
  }
];

// The rest of the product, by workspace.
export const GALLERIES = [
  {
    id: 'sy-individual',
    label: 'Individual workspace',
    heading: 'Everything one brand needs',
    items: [
      { img: 'dashboard', caption: 'Dashboard' },
      { img: 'trends', caption: 'Trending content research' },
      { img: 'competitors', caption: 'Competitor intelligence' },
      { img: 'planner-mix', caption: 'Planner: set your content mix' },
      { img: 'post-caption', caption: 'Create Post: caption' },
      { img: 'post-media', caption: 'Create Post: media' }
    ]
  },
  {
    id: 'sy-agency',
    label: 'Agency workspace',
    heading: 'Built for a team running many clients',
    items: [
      { img: 'agency-onboarding', caption: 'Agency onboarding' },
      { img: 'add-client', caption: 'Add clients' },
      { img: 'agency-tasks', caption: 'Tasks board' },
      { img: 'brands', caption: 'Brands' },
      { img: 'team-roles', caption: 'Team & roles' },
      { img: 'team-chat', caption: 'Team chat' },
      { img: 'library', caption: 'Central library' },
      { img: 'reports', caption: 'Reports' }
    ]
  }
];

export const PRINCIPLES = {
  heading: 'Principles I kept to',
  items: [
    { name: 'Progressive disclosure', text: 'One step, one question.' },
    { name: 'AI first, never AI only', text: 'Every AI output is editable.' },
    { name: 'Show it before it ships', text: 'Preview and approve before publishing.' },
    { name: 'Same data, many views', text: 'Board or calendar, brand or agency.' }
  ]
};

export const REFLECTION = {
  label: 'Reflection',
  heading: 'What I’d do next',
  items: [
    'Measure completion at each onboarding step to find where people still drop off.',
    'Test the AI-drafted brand against what users would write themselves.',
    'Watch how agencies use approvals, and cut any step that slows a client sign-off.'
  ],
  honesty: 'The flows were designed and prototyped. They were not live with users in my time, so there are no usage numbers yet.'
};
