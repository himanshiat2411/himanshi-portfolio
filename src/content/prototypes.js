// Clickable prototypes for the case studies: which screens, and where each tap area leads. Boxes are
// [x, y, w, h] as fractions of the screen image, placed over the real buttons in each design.
const g = import.meta.glob('../assets/grub-n-grab/screens/*.webp', { eager: true, import: 'default' });
const f = import.meta.glob('../assets/finworld/screens/*.webp', { eager: true, import: 'default' });
const s = import.meta.glob('../assets/sylus/*.webp', { eager: true, import: 'default' });
const grub = k => g[`../assets/grub-n-grab/screens/${k}.webp`];
const fin = k => f[`../assets/finworld/screens/${k}.webp`];
const sy = k => s[`../assets/sylus/${k}.webp`];

// Grub'n Grab: the phone's bottom tabs are the same on every main screen.
const TABS = [
  { box: [0.04, 0.905, 0.15, 0.08], to: 'home', name: 'Home tab' },
  { box: [0.22, 0.905, 0.15, 0.08], to: 'swaps', name: 'Swap tab' },
  { box: [0.42, 0.89, 0.16, 0.1], to: 'sell', name: 'Sell tab' }
];
const BACK = to => ({ box: [0.02, 0.035, 0.15, 0.07], to, name: 'Back' });

export const GRUB = {
  start: 'welcome',
  steps: ['welcome', 'signup', 'verify', 'upload', 'submitted', 'home', 'product', 'proposal', 'sell', 'swaps'],
  screens: {
    welcome: {
      label: 'Welcome',
      src: grub('welcome'),
      spots: [
        { box: [0.49, 0.86, 0.38, 0.08], to: 'signup', name: 'Sign up' },
        { box: [0.08, 0.86, 0.39, 0.08], to: 'home', name: 'Log in' }
      ]
    },
    signup: { label: 'Sign up', src: grub('signup'), spots: [{ box: [0.1, 0.83, 0.8, 0.075], to: 'verify', name: 'Continue' }, BACK('welcome')] },
    verify: { label: 'Verify your ID', src: grub('verify'), spots: [{ box: [0.1, 0.32, 0.8, 0.2], to: 'upload-2', name: 'Upload college ID' }, BACK('signup')] },
    'upload-2': { label: 'Add a selfie', src: grub('upload-2'), spots: [{ box: [0.1, 0.58, 0.8, 0.2], to: 'upload', name: 'Upload selfie' }, BACK('verify')] },
    upload: { label: 'Submit', src: grub('upload'), spots: [{ box: [0.1, 0.87, 0.8, 0.07], to: 'submit', name: 'Submit for verification' }, BACK('upload-2')] },
    submit: { label: 'Submitting', src: grub('submit'), spots: [], auto: { to: 'submitted', ms: 1100 } },
    submitted: { label: 'Submitted', src: grub('submitted'), spots: [{ box: [0, 0, 1, 1], to: 'home', name: 'Continue to home' }], auto: { to: 'home', ms: 2200 } },
    home: {
      label: 'Home',
      src: grub('home'),
      spots: [{ box: [0.01, 0.33, 0.48, 0.32], to: 'product', name: 'Vintage Denim Shirt' }, ...TABS]
    },
    product: {
      label: 'Item page',
      src: grub('product'),
      spots: [
        { box: [0.03, 0.05, 0.12, 0.04], to: 'home', name: 'Back to home' },
        { box: [0.05, 0.915, 0.84, 0.05], to: 'proposal', name: 'Send proposal' }
      ]
    },
    proposal: {
      label: 'Send a proposal',
      src: grub('proposal'),
      under: 'product',
      spots: [
        { box: [0.85, 0.01, 0.13, 0.1], to: 'product', name: 'Close' },
        { box: [0.08, 0.79, 0.84, 0.15], to: { done: 'Proposal sent. The seller will reply in chat.' }, name: 'Submit' }
      ]
    },
    sell: { label: 'List an item', src: grub('sell'), spots: [{ box: [0.52, 0.12, 0.44, 0.065], to: 'swap-item', name: 'Swap' }, BACK('home'), ...TABS] },
    'swap-item': { label: 'List a swap', src: grub('swap-item'), spots: [{ box: [0.04, 0.12, 0.44, 0.065], to: 'sell', name: 'Sell' }, BACK('home'), ...TABS] },
    swaps: { label: 'Swap feed', src: grub('swaps'), spots: TABS }
  }
};

// Finworld: the import flow's "Next" button sits in the same place on every step.
const NEXT = to => ({ box: [0.81, 0.925, 0.155, 0.06], to, name: 'Next' });

export const FINWORLD = {
  start: 'home',
  steps: ['home', 'upload', 'preview', 'map', 'dashboard', 'model'],
  screens: {
    home: {
      label: 'Home',
      src: fin('home'),
      spots: [
        { box: [0.43, 0.165, 0.21, 0.08], to: 'upload', name: 'Import data' },
        { box: [0.2, 0.16, 0.23, 0.09], to: 'model', name: 'New model' },
        { box: [0, 0.44, 0.18, 0.04], to: 'dashboard', name: 'Dashboard' }
      ]
    },
    upload: {
      label: 'Upload',
      src: fin('upload'),
      spots: [{ box: [0.39, 0.5, 0.12, 0.06], to: 'preview', name: 'Upload file' }, NEXT('preview'), { box: [0, 0.1, 0.18, 0.05], to: 'home', name: 'Home' }]
    },
    preview: { label: 'Preview data', src: fin('preview'), spots: [NEXT('map'), { box: [0, 0.1, 0.18, 0.05], to: 'home', name: 'Home' }] },
    map: { label: 'Map columns', src: fin('map'), spots: [NEXT('dashboard'), { box: [0, 0.1, 0.18, 0.05], to: 'home', name: 'Home' }] },
    dashboard: {
      label: 'Dashboard',
      src: fin('dashboard'),
      spots: [
        { box: [0, 0.07, 0.05, 0.06], to: 'home', name: 'Home' },
        { box: [0, 0.14, 0.05, 0.06], to: 'model', name: 'Model' }
      ]
    },
    model: {
      label: 'Model analysis',
      src: fin('model'),
      spots: [
        { box: [0.85, 0.05, 0.145, 0.05], to: 'dashboard', name: 'View dashboard' },
        { box: [0, 0.07, 0.05, 0.06], to: 'home', name: 'Home' }
      ]
    }
  }
};

// Sylus AI: onboarding, then creating a post and planning a month.
const SY_CONTINUE = (to, y) => ({ box: [0.42, y, 0.25, 0.07], to, name: 'Continue' });
const SY_BACK = (to, y) => ({ box: [0.32, y, 0.1, 0.07], to, name: 'Back' });
const POST_NEXT = to => ({ box: [0.82, 0.94, 0.17, 0.05], to, name: 'Continue' });
const POST_BACK = to => ({ box: [0.18, 0.94, 0.1, 0.05], to, name: 'Back' });

export const SYLUS = {
  start: 'login-final',
  steps: ['login-final', 'workspace', 'brand-upload', 'brand-vibe', 'connect-accounts', 'dashboard', 'post-brief', 'post-caption', 'post-media', 'post-preview', 'planner', 'planner-mix'],
  screens: {
    'login-final': { label: 'Log in', src: sy('login-final'), spots: [{ box: [0.54, 0.765, 0.35, 0.07], to: 'workspace', name: 'Login' }] },
    workspace: {
      label: 'Choose a workspace',
      src: sy('workspace'),
      spots: [{ box: [0.24, 0.3, 0.6, 0.45], to: 'brand-upload', name: 'Individual or Agency' }, SY_CONTINUE('brand-upload', 0.83)]
    },
    'brand-upload': {
      label: 'Brand setup',
      src: sy('brand-upload'),
      spots: [{ box: [0.22, 0.38, 0.56, 0.24], to: 'brand-vibe', name: 'Drop brand assets' }, SY_CONTINUE('brand-vibe', 0.83), SY_BACK('workspace', 0.83)]
    },
    'brand-vibe': { label: 'Brand Vibe', src: sy('brand-vibe'), spots: [SY_CONTINUE('connect-accounts', 0.865), SY_BACK('brand-upload', 0.865)] },
    'connect-accounts': { label: 'Connect accounts', src: sy('connect-accounts'), spots: [SY_CONTINUE('dashboard', 0.82), SY_BACK('brand-vibe', 0.82)] },
    dashboard: {
      label: 'Dashboard',
      src: sy('dashboard'),
      spots: [
        { box: [0.87, 0.1, 0.12, 0.05], to: 'post-brief', name: 'New post' },
        { box: [0, 0.165, 0.16, 0.04], to: 'post-brief', name: 'Create post' },
        { box: [0, 0.215, 0.16, 0.04], to: 'planner', name: 'AI Content Planner' }
      ]
    },
    'post-brief': {
      label: 'Post: brief',
      src: sy('post-brief'),
      spots: [{ box: [0.32, 0.64, 0.11, 0.05], to: 'post-caption', name: 'Generate' }, POST_NEXT('post-caption'), { box: [0, 0.12, 0.16, 0.045], to: 'dashboard', name: 'Dashboard' }]
    },
    'post-caption': { label: 'Post: caption', src: sy('post-caption'), spots: [POST_NEXT('post-media'), POST_BACK('post-brief')] },
    'post-media': { label: 'Post: media', src: sy('post-media'), spots: [POST_NEXT('post-preview'), POST_BACK('post-caption')] },
    'post-preview': {
      label: 'Post: preview',
      src: sy('post-preview'),
      spots: [{ box: [0.85, 0.94, 0.14, 0.05], to: { done: 'Published to LinkedIn.' }, name: 'Publish now' }, POST_BACK('post-media')]
    },
    planner: {
      label: 'Planner: cadence',
      src: sy('planner'),
      spots: [{ box: [0.83, 0.94, 0.16, 0.05], to: 'planner-mix', name: 'Continue' }, { box: [0, 0.12, 0.16, 0.045], to: 'dashboard', name: 'Dashboard' }]
    },
    'planner-mix': {
      label: 'Planner: content mix',
      src: sy('planner-mix'),
      spots: [{ box: [0.83, 0.94, 0.16, 0.05], to: { done: 'Your month of posts is being planned.' }, name: 'Continue' }, POST_BACK('planner')]
    }
  }
};
