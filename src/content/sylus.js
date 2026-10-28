// All copy for the Sylus AI case study (/work/sylus-ai). Written plainly, feature by feature: what
// each part does, then why I designed it that way. Screens are keys into src/assets/sylus; each
// feature's `screens` become a slideshow with tabs, and `video` is its zoom walkthrough
// (src/assets/sylus/video, with a -portrait cut for phones).

export const INTRO = {
  title: 'Designing Sylus AI, a marketing CRM that learns your brand',
  tags: ['Sylus AI', 'B2B SaaS', 'AI CRM'],
  hook: 'Sylus learns, writes and plans.',
  stats: [
    { value: '1 link', label: 'to set up a whole brand' },
    { value: '3 answers', label: 'to plan a month of posts' },
    { value: '4 steps', label: 'from brief to a ready post' },
    { value: '30+', label: 'screens designed end to end' }
  ],
  overview: [
    { label: 'Problem', text: 'AI tools forget the brand. Agencies juggle too many tools.' },
    { label: 'Solution', text: 'One CRM that learns the brand once and reuses it.' },
    { label: 'Result', text: 'Individual and Agency workspaces, login to reports.' }
  ],
  cover: { img: 'dashboard', alt: 'The Sylus AI dashboard for one brand: posts published, engagement, platform health and the content queue' },
  paragraphs: [
    'Sylus AI is a marketing CRM for brands and agencies. It uses AI to write and plan social posts in each brand’s voice.',
    'I designed it end to end: onboarding, the Individual workspace and the Agency workspace.'
  ],
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Scope', value: 'Onboarding, Individual, Agency' },
    { label: 'Output', value: 'Clickable prototype' }
  ]
};

// The headline decisions, listed near the top so a skim shows them before the detail.
export const DECISIONS = {
  strategic: ['Learn the brand from a link', 'Separate Individual and Agency workspaces', 'Agency home built around clients'],
  micro: ['Four-step post flow', 'Three-question planner', 'Post button on every trend', 'Roles set per brand']
};

export const FEATURES = [
  {
    id: 'sy-onboarding',
    video: 'onboarding',
    videoLabel: 'Walkthrough: login, workspace choice, brand setup, Brand Vibe and connecting accounts',
    title: 'Onboarding that reads your brand',
    what: 'Seven short steps, one question each, from sign up to connected accounts.',
    why: 'Describing a brand is the slowest part of setup. So Sylus reads a website link and drafts it. People edit a draft instead of starting blank.',
    decision: {
      hook: 'Read a link, don’t ask for a form',
      before: 'Brand setup was a long form: voice, audience, colours, products.',
      decision: 'Paste a website link or drop brand files. AI drafts the brand; people edit it.',
      result: 'Setup becomes reviewing a draft, not writing from blank. A manual form stays as a fallback.'
    },
    micro: [
      'Individual or Agency is asked first, since it changes the whole workspace.',
      'The login explains the product beside the form, for people arriving from an ad.',
      'Every AI field stays editable.'
    ],
    screens: [
      { label: 'Login', img: 'login-final', alt: 'Login with a panel describing what Sylus does beside the form' },
      { label: 'Workspace', img: 'workspace', alt: 'Choosing between an Individual and an Agency workspace' },
      { label: 'Brand setup', img: 'brand-upload', alt: 'Brand setup: drop brand files or paste a website link' },
      { label: 'Brand Vibe', img: 'brand-vibe', alt: 'Brand Vibe generated from the website: logo, colours, type and mockups' },
      { label: 'Connect', img: 'connect-accounts', alt: 'Connecting social accounts, with an option to skip' }
    ],
  },
  {
    id: 'sy-create',
    video: 'create',
    videoLabel: 'Walkthrough: brief, caption, media and the final preview',
    title: 'Creating a post',
    what: 'Four steps: Brief, Caption, Media, Preview. Describe the post once; AI writes and illustrates it.',
    why: 'One long page made every field compete. Steps keep each screen to one job, and the preview catches mistakes.',
    decision: {
      hook: 'Four steps, not one long page',
      before: 'Topic, platforms, caption, hashtags, image and schedule all sat on one page.',
      decision: 'Split it into Brief, Caption, Media and Preview, each with one job.',
      result: 'Each screen stays focused, and the preview shows the real post before it goes out.'
    },
    micro: [
      'A step counter shows how close you are to done.',
      'Captions and hashtags are written per platform.'
    ],
    screens: [
      { label: 'Brief', img: 'post-brief', alt: 'Create Post: describe what the post is about' },
      { label: 'Caption', img: 'post-caption', alt: 'Create Post: AI caption and hashtags per platform' },
      { label: 'Media', img: 'post-media', alt: 'Create Post: generate or upload an image' },
      { label: 'Preview', img: 'post-preview', alt: 'Create Post: preview with publish, schedule or save as draft' }
    ]
  },
  {
    id: 'sy-planner',
    video: 'planner',
    videoLabel: 'Walkthrough: choosing a cadence, then the content mix',
    title: 'Planning a month of content',
    what: 'Three answers build a month: how often, which formats, and a short brief.',
    why: 'Posting every week is the hard part. The planner asks only what people know and fills the rest.',
    decision: {
      hook: 'Ask three things, fill the rest',
      before: 'A blank calendar made people decide every slot themselves.',
      decision: 'Ask only cadence, content mix and a short brief. AI builds the plan.',
      result: 'A month of posts from three answers, reviewed before anything is scheduled.'
    },
    micro: [
      'Plus and minus steppers for format counts, since tapping beats typing.'
    ],
    screens: [
      { label: 'Cadence', img: 'planner', alt: 'Planner: choose a week, 15 days, a month or a custom range' },
      { label: 'Content mix', img: 'planner-mix', alt: 'Planner: set how many image posts, carousels, videos and reels, and the platforms' }
    ]
  },
  {
    id: 'sy-research',
    video: 'research',
    videoLabel: 'Walkthrough: trending stories, then competitor tracking',
    title: 'Research that turns into posts',
    what: 'Trending topics for the brand, plus competitor followers, frequency and engagement.',
    why: 'Every trend has a Post button, so an idea becomes a post in one click.',
    decision: {
      hook: 'Every idea gets a Post button',
      before: 'Research tools end at a list of links.',
      decision: 'Each trending story has a Post button that opens Create Post with it as the brief.',
      result: 'Finding an idea and acting on it happen in one place.'
    },
    micro: [
      'Competitors are compared on followers, frequency and engagement in one table.'
    ],
    screens: [
      { label: 'Trends', img: 'trends', alt: 'Trending Content Research with news cards and Post buttons' },
      { label: 'Competitors', img: 'competitors', alt: 'Competitor Intelligence table with followers, posts per week and engagement' }
    ]
  },
  {
    id: 'sy-agency',
    video: 'agency',
    videoLabel: 'Walkthrough: agency overview, tasks, calendar, team roles and the library',
    title: 'The agency CRM',
    what: 'Every client in one place: overview, tasks, calendar, team roles, chat, library and reports.',
    why: 'An agency is many clients, not one big user. Home shows approvals across brands, and roles are set per brand.',
    decision: {
      hook: 'Built around clients, not content',
      before: 'Agencies were treated as one big user.',
      decision: 'Home shows every client: today’s posts and pending approvals. Roles are set per brand.',
      result: 'Approvals don’t get lost, and a designer on one brand can’t see another client’s drafts.'
    },
    micro: [
      'Tasks show as a board or a calendar: same data, different ways to plan.',
      'Clients and teammates are added during setup, so day one is useful.'
    ],
    screens: [
      { label: 'Overview', img: 'agency-overview', alt: 'Agency Overview: brands, posts this week, pending approvals and client cards' },
      { label: 'Tasks', img: 'agency-tasks', alt: 'Agency Tasks as a board' },
      { label: 'Calendar', img: 'calendar', alt: 'Agency Tasks as a calendar' },
      { label: 'Brands', img: 'brands', alt: 'Brands managed by the agency' },
      { label: 'Team & roles', img: 'team-roles', alt: 'Team members and their roles per brand' },
      { label: 'Chat', img: 'team-chat', alt: 'Team chat with channels per brand' },
      { label: 'Library', img: 'library', alt: 'Central library of files grouped by brand' },
      { label: 'Reports', img: 'reports', alt: 'Reports per brand with export' }
    ],
  }
];

export const NEXT = {
  title: 'What I would do next',
  paragraphs: [
    'Not live yet, so no usage numbers. First I would measure onboarding drop-off, how often the AI brand is kept as is, and client approval time.'
  ]
};
