// All copy for the Finworld case study (/work/finworld). Same shape as Sylus and Grub'n Grab: a hook,
// numbers, an overview, one real task walked through, then each tool told as a decision tied to the
// problem it solves. Screens are keys into src/assets/finworld/screens.

export const INTRO = {
  title: 'Finworld, a financial modeling tool for beginners and experts',
  tags: ['Design assignment', 'FinTech', 'Web app'],
  hook: 'Turn a spreadsheet into answers, without writing a formula.',
  stats: [
    { value: '55 hrs', label: 'solo design sprint' },
    { value: '4 tools', label: 'dashboard, model, import, AI' },
    { value: '2 users', label: 'beginner and expert, one product' },
    { value: '3 min', label: 'target from file to dashboard' }
  ],
  overview: [
    { label: 'Problem', text: 'Financial models are hard to read, share and learn.' },
    { label: 'Solution', text: 'One tool where beginners see answers and experts keep full control.' },
    { label: 'Result', text: 'Import, model, dashboard and an AI helper, designed end to end.' }
  ],
  paragraphs: [
    'Finworld helps analysts build financial models and read them as clear charts, without getting lost in spreadsheet formulas.',
    'It was a 55-hour design assignment for a financial platform. I worked alone, with no real company data and no users to test with.'
  ],
  facts: [
    { label: 'Role', value: 'Solo product designer' },
    { label: 'Timeline', value: '55 hours' },
    { label: 'Type', value: 'Design assignment' }
  ]
};

export const DECISIONS = {
  strategic: ['One dashboard for beginners and experts', 'Answers first: revenue, profit, cash', 'AI beside the work, not in a new tab'],
  micro: ['A Map columns step at import', 'Data issues flagged before modeling', 'Save and continue later on every step']
};

// The three problems behind the project. Each decision below names which of these it solves.
export const ISSUES = {
  title: 'Three problems with financial models today',
  items: [
    { theme: 'Clarity', text: 'Formulas are buried in spreadsheets, so nobody sees how numbers connect.' },
    { theme: 'Learning', text: 'Beginners get lost, while experts need full flexibility.' },
    { theme: 'Teamwork', text: 'Files get copied and versions clash, so work can’t be reused.' }
  ]
};

// The two people the design had to serve at once.
export const USERS = {
  title: 'Two users, opposite needs',
  items: [
    { name: 'Riya, the Explorer', role: 'Junior investment analyst', thinks: 'Thinks in ideas, not formulas.', needs: 'Templates, guidance and outputs she can read.' },
    { name: 'Aryan, the Builder', role: 'Senior financial analyst', thinks: 'Thinks in logic and structure.', needs: 'Custom formulas, reusable parts and version control.' }
  ]
};

// One real task, start to end, so the reader sees what the product is for.
export const TASK = {
  title: 'One task, start to end',
  question: 'Riya needs to know: will the company’s cash last 6 months?',
  steps: [
    { label: 'Upload', text: 'She drops in last quarter’s spreadsheet.' },
    { label: 'Check', text: 'Finworld flags 3 bad numbers and a missing date.' },
    { label: 'Match', text: 'She matches her columns to Finworld fields.' },
    { label: 'Answer', text: 'The dashboard shows cash forecast at the top. Nova warns cash runs low in 6 months.' }
  ]
};

export const FEATURES = [
  {
    id: 'fw-import',
    title: 'Getting data in',
    what: 'A four-step import: upload, preview, map columns, confirm. Nova sits beside each step.',
    solves: { theme: 'Clarity', problem: 'One wrongly read column quietly breaks every chart after it.' },
    decision: {
      hook: 'Add a “Map columns” step',
      before: 'Most tools guess what each column means and move on.',
      decision: 'After preview, each column is matched to a Finworld field, with problems flagged.',
      result: 'Mistakes are caught at import, not weeks later in a report. The cost is one more step, even for clean files.'
    },
    micro: ['Preview flags invalid numbers and missing values before anything is built.', 'Tips for a clean upload sit beside the drop zone.', 'Save & continue later on every step.'],
    screens: [
      { label: 'Upload', img: 'upload', alt: 'Upload: drag in a spreadsheet or import from Drive, OneDrive or a database' },
      { label: 'Preview', img: 'preview', alt: 'Preview: detected issues like invalid numbers and missing values' },
      { label: 'Map columns', img: 'map', alt: 'Map columns: each file column matched to a Finworld field' }
    ]
  },
  {
    id: 'fw-dashboard',
    title: 'The dashboard',
    what: 'Revenue, net profit and cash forecast across the top, with drivers on the left and insights below.',
    solves: { theme: 'Learning', problem: 'Beginners and experts would need two different tools.' },
    decision: {
      hook: 'One screen for beginners and experts',
      before: 'Tools either hide the controls experts need, or show them all and scare beginners.',
      decision: 'One dashboard. Key numbers stay open; advanced inputs fold into side panels.',
      result: 'Teams share one screen, and beginners grow into the panels. Experts need one extra click.'
    },
    micro: ['Revenue, profit and cash come first, since every model asks: are we making money, and will the cash last?', 'Changing an input updates the charts, so people see cause and effect.'],
    screens: [
      { label: 'Dashboard', img: 'dashboard', alt: 'Dashboard: revenue, net profit and cash forecast on top, drivers on the left' },
      { label: 'Home', img: 'home', alt: 'Home: start a new model, import data or pick a template' }
    ]
  },
  {
    id: 'fw-model',
    title: 'Building the model',
    what: 'Model Analysis shows inputs, calculations and outputs as connected blocks, with a formula editor below.',
    solves: { theme: 'Clarity', problem: 'In a spreadsheet, you can’t see how one number feeds another.' },
    decision: {
      hook: 'Show the model as connected blocks',
      before: 'Formulas live inside cells, so the logic is invisible.',
      decision: 'Inputs, calculations and outputs sit in three columns, with an audit trail and dependencies view.',
      result: 'Anyone can trace where a number comes from. Experts still write their own formulas.'
    },
    micro: ['Data sources live in a side list, so they can be reused across models.', 'An audit trail shows who changed what.'],
    screens: [{ label: 'Model', img: 'model', alt: 'Model Analysis: inputs, calculations and outputs, with the formula editor and Nova' }]
  },
  {
    id: 'fw-nova',
    title: 'Nova, the AI helper',
    what: 'Nova suggests formulas, explains numbers and spots risks, like cash running low.',
    solves: { theme: 'Learning', problem: 'Beginners don’t know which formula to write or what a number means.' },
    decision: {
      hook: 'A side panel, not a separate chat',
      before: 'AI chat in a new tab loses sight of the numbers being asked about.',
      decision: 'Nova sits beside the model. It suggests, you apply, and it shows the numbers it used.',
      result: 'Questions get answered in context, and people stay in control. The trade-off is less room for long chats.'
    },
    micro: ['Nova only suggests; nothing changes until the person applies it.'],
    screens: [{ label: 'Nova', img: 'dashboard', alt: 'Nova on the dashboard: insights like “Cash reserves low in 6 months”' }]
  }
];

export const TEST = {
  title: 'How I would test it',
  text: 'There were no real users in the sprint, so this is the plan, not a result.',
  tasks: [
    'Who: 5 junior analysts like Riya and 3 senior analysts like Aryan.',
    'Task: import a spreadsheet and tell if cash lasts 6 months, in under 3 minutes.',
    'Success: 4 of 5 beginners import without help, and experts find advanced settings alone.'
  ]
};

export const REFLECTION = {
  title: 'Looking back',
  well: ['Two clear users shaped every screen.', 'One design language across four tools.', 'A full flow, import to insight, in 55 hours.'],
  differently: ['Talk to 3 real analysts first.', 'Check the three problems with them before solving them.', 'Test import with real, messy files.']
};
