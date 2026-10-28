// All copy for the Sylus AI case study (/work/sylus-ai). Written plainly, feature by feature: what
// each part does, then why I designed it that way. Screens are keys into src/assets/sylus; each
// feature's `screens` become a slideshow with tabs, and `video` is its zoom walkthrough
// (src/assets/sylus/video, with a -portrait cut for phones).

export const INTRO = {
  title: 'Designing Sylus AI, a marketing CRM that learns your brand',
  tags: ['Sylus AI', 'B2B SaaS', 'AI CRM'],
  cover: { img: 'dashboard', alt: 'The Sylus AI dashboard for one brand: posts published, engagement, platform health and the content queue' },
  paragraphs: [
    'Sylus AI is a marketing CRM for brands and agencies. It keeps clients, teammates, posts and reports in one place, and uses AI to plan, write and schedule social media in each brand’s own voice.',
    'Most AI writing tools start from an empty prompt, so people explain their brand again every time. For agencies it is worse: one tool for clients, another for content, and nothing connecting them. Sylus is built to learn a brand once and keep using it.',
    'I designed the product end to end: onboarding, the Individual workspace for creating and planning content, and the Agency workspace for running many clients.'
  ],
  facts: [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Scope', value: 'Onboarding, Individual, Agency' },
    { label: 'Output', value: 'Clickable prototype' }
  ]
};

export const FEATURES = [
  {
    id: 'sy-onboarding',
    video: 'onboarding',
    videoLabel: 'Walkthrough: login, workspace choice, brand setup, Brand Vibe and connecting accounts',
    title: 'Onboarding that reads your brand',
    what: 'A new account goes through seven short steps: sign up, choose Individual or Agency, two quick survey questions, brand setup, a processing screen, the generated Brand Vibe, and connecting social accounts. Each step asks one thing.',
    why: 'The slowest part of setting up any marketing tool is describing the brand: voice, audience, colours, products. So instead of a long form, brand setup asks for a website link or brand files and drafts all of it. People then edit a draft instead of writing from nothing. A manual form is still there for brands without a website, and every AI field stays editable.',
    screens: [
      { label: 'Login', img: 'login-final', alt: 'Login with a panel describing what Sylus does beside the form' },
      { label: 'Workspace', img: 'workspace', alt: 'Choosing between an Individual and an Agency workspace' },
      { label: 'Brand setup', img: 'brand-upload', alt: 'Brand setup: drop brand files or paste a website link' },
      { label: 'Brand Vibe', img: 'brand-vibe', alt: 'Brand Vibe generated from the website: logo, colours, type and mockups' },
      { label: 'Connect', img: 'connect-accounts', alt: 'Connecting social accounts, with an option to skip' }
    ],
    notes: [
      'The login explains the product beside the form, so someone arriving from an ad knows what they are signing up for.',
      'Individual or Agency is asked first because it changes the whole workspace that follows.'
    ]
  },
  {
    id: 'sy-create',
    video: 'create',
    videoLabel: 'Walkthrough: brief, caption, media and the final preview',
    title: 'Creating a post',
    what: 'Create Post is a four-step flow: Brief, Caption, Media, Preview. You describe the post once, and the AI writes the caption and hashtags and generates an image from that brief.',
    why: 'Putting the topic, platforms, caption, hashtags, image and schedule on one page made every field compete for attention. Splitting it into steps keeps each screen to one job, and the step count at the bottom shows how close you are to done. The last step shows the post exactly as it will appear on the platform, because that is when people catch mistakes.',
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
    what: 'The AI Content Planner builds a calendar from three answers: how often to post, the mix of formats and platforms, and a short brief. You review the plan before anything is scheduled.',
    why: 'Writing one post is rarely the problem. Keeping it up every week is. A blank calendar asks people to decide every slot themselves, so the planner asks for the few things only they know and fills in the rest. Format counts use small plus and minus steppers because tapping is quicker than typing a number.',
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
    what: 'Trending Content Research shows news and topics relevant to the brand, and Competitor Intelligence tracks other brands’ followers, posting frequency and engagement.',
    why: 'Research tools usually end at a list of links. Here every trending story has a Post button that starts Create Post with the story as the brief, so finding an idea and acting on it happen in the same place.',
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
    what: 'Agencies get their own workspace: an overview of every client brand, a tasks board that also works as a calendar, client and brand records, team roles, team chat, a shared file library and reports.',
    why: 'An agency is not one large user. It is many clients, each with their own posts, people and approvals. So the home screen is about clients rather than content: what is scheduled today and what is waiting for a client to approve, across every brand. Roles and permissions are set per brand, because a designer on one account should not see another client’s drafts.',
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
    notes: [
      'Tasks can be viewed as a board or a calendar. It is the same data, but some people plan by status and others by date.',
      'Agency onboarding adds clients and teammates during setup, so the workspace is useful on the first day.'
    ]
  }
];

export const NEXT = {
  title: 'What I would do next',
  paragraphs: [
    'The flows were designed and prototyped but had not gone live with users during my time, so there are no usage numbers yet. The first things I would measure are where people drop off in onboarding, how often they keep the AI-drafted brand without editing it, and how long a client approval takes in the agency workspace.'
  ]
};
