// ---------------------------------------------------------------------------
// All site content lives here. Edit this file to update copy, projects, links.
// ---------------------------------------------------------------------------

export const PROFILE = {
  firstName: 'Rayen',
  lastName: 'Barkaoui',
  role: 'Flutter Developer & Product Designer',
  location: 'Tunisia',
  timezone: 'Africa/Tunis',
  available: true,
  availabilityLabel: 'Available for new projects',
  email: 'Rayenbarkawi31@gmail.com',
  cv: null, // set to '/cv.pdf' after dropping the file into /public
}

/** The newest thing on a store, shown as a badge in the hero. */
export const LATEST_RELEASE = {
  label: 'Life Tycoon is live on Google Play',
  href: 'https://play.google.com/store/apps/details?id=com.rayen.life_tycoon',
}

export const SOCIAL_LINKS = {
  github: 'https://github.com/rayen011',
  linkedin: 'https://linkedin.com/in/rayen',
  upwork: '',
  email: PROFILE.email,
}

/**
 * Contact form endpoint. Leave empty to fall back to a pre-filled mailto:
 * link. Works out of the box with Formspree ("https://formspree.io/f/xxxx")
 * or FormSubmit ("https://formsubmit.co/ajax/you@email.com").
 */
export const FORM_ENDPOINT = ''

/**
 * Each section sits in its own patch of nebula. Two radial gradients per
 * region; the backdrop crossfades between them as you scroll, so descending the
 * page drifts through the galaxy rather than stepping between themed boxes.
 */
export const REGIONS = [
  { id: 'top', hues: ['rgba(245,166,35,0.20)', 'rgba(109,40,217,0.18)'] },
  { id: 'work', hues: ['rgba(109,40,217,0.20)', 'rgba(30,58,138,0.20)'] },
  { id: 'services', hues: ['rgba(30,58,138,0.22)', 'rgba(14,165,233,0.12)'] },
  { id: 'about', hues: ['rgba(109,40,217,0.17)', 'rgba(245,166,35,0.12)'] },
  { id: 'process', hues: ['rgba(30,58,138,0.20)', 'rgba(109,40,217,0.15)'] },
  { id: 'skills', hues: ['rgba(14,165,233,0.14)', 'rgba(109,40,217,0.20)'] },
  { id: 'contact', hues: ['rgba(245,166,35,0.18)', 'rgba(109,40,217,0.16)'] },
]

export const SECTION_IDS = REGIONS.map((r) => r.id)

export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export const HERO_ROLES = [
  'Flutter Developer',
  'Product Designer',
  'Firebase Architect',
  'SaaS Builder',
  'Game Developer',
  'App Rescuer',
]

export const TICKER = [
  'Flutter', 'Firebase', 'Bloc / Cubit', 'Supabase', 'Clean Architecture',
  'RevenueCat', 'Cloud Functions', 'Figma', 'React', 'Stripe', 'Claude API',
  'Offline-first', 'RTL / Arabic', 'CI & Tests', 'AdMob', 'Play Store',
]

export const STATS = [
  { value: 15, suffix: '+', label: 'Apps built end to end' },
  { value: 3, suffix: '+', label: 'Years shipping Flutter' },
  { value: 440, suffix: '+', label: 'Automated tests on one app' },
  { value: 4, suffix: '', label: 'Markets designed for' },
]

export const MARKETS = [
  { flag: '🇹🇳', name: 'Tunisia' },
  { flag: '🇱🇾', name: 'Libya' },
  { flag: '🇯🇴', name: 'Jordan' },
  { flag: '🇬🇧', name: 'UK' },
]

export const SERVICES = [
  {
    id: 'mobile',
    index: '01',
    title: 'Mobile App Development',
    description:
      'Production Flutter apps for iOS and Android from one codebase — Firebase or Supabase backend, clean Bloc/Cubit architecture, and a real store launch at the end.',
    points: ['Flutter · iOS & Android', 'Firebase / Supabase backends', 'Subscriptions, maps, push, offline sync'],
    color: '#F5A623',
    icon: 'phone',
  },
  {
    id: 'saas',
    index: '02',
    title: 'SaaS & Web MVPs',
    description:
      'From idea to a product you can put in front of users: React front end, Postgres with row-level security, Stripe billing, and AI features wired in safely on the server.',
    points: ['React + Supabase', 'Stripe checkout & portal', 'Claude / OpenAI integrations'],
    color: '#3B82F6',
    icon: 'browser',
  },
  {
    id: 'design',
    index: '03',
    title: 'UI/UX Design',
    description:
      'Interfaces that feel effortless. Flows and wireframes in Figma, a consistent design system, then motion-rich screens — including Arabic-first, fully RTL products.',
    points: ['User flows & prototypes', 'Design systems', 'RTL & localisation'],
    color: '#8B5CF6',
    icon: 'pen',
  },
  {
    id: 'rescue',
    index: '04',
    title: 'App Rescue & Bug Fixes',
    description:
      'An app that crashes, lags or was left half-finished? I find the root cause, fix it fast, add tests around it, and leave the codebase easier to hand off than I found it.',
    points: ['Crash & performance fixes', 'Refactors & test coverage', 'Store compliance & releases'],
    color: '#10B981',
    icon: 'wrench',
  },
]

export const PROCESS = [
  {
    step: '01',
    title: 'Discover',
    description: 'A scope call, a short written plan, and an honest estimate. If a feature is not worth building yet, I say so before you pay for it.',
    deliverable: 'Plan + estimate',
  },
  {
    step: '02',
    title: 'Design',
    description: 'User flows and screens in Figma, then a clickable prototype so we agree on the feel of the app before a line of Dart is written.',
    deliverable: 'Figma prototype',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Clean architecture, weekly demo builds on your phone, server-side rules for anything worth cheating, and tests that keep it honest.',
    deliverable: 'Weekly builds',
  },
  {
    step: '04',
    title: 'Ship & support',
    description: 'Store listings, release signing, crash monitoring — and I stay around after launch for the fixes and the next iteration.',
    deliverable: 'Store release',
  },
]

export const SKILL_ROWS = [
  [
    'Flutter', 'Dart', 'flutter_bloc', 'Cubit', 'get_it / injectable', 'go_router',
    'freezed', 'Hive / Hive CE', 'RevenueCat', 'AdMob', 'FCM push', 'Google Maps',
    'Barcode scanning', 'Localization (l10n)', 'RTL layouts', 'Crashlytics',
  ],
  [
    'Firebase Auth', 'Firestore', 'Cloud Functions', 'Security Rules', 'Supabase',
    'Postgres + RLS', 'Edge Functions', 'Stripe', 'REST APIs', 'React', 'Vite',
    'Tailwind', 'TypeScript', 'Zustand', 'React Query',
  ],
  [
    'Claude API', 'OpenAI', 'Gemini', 'Figma', 'Design systems', 'Prototyping',
    'Git / GitHub', 'GitHub Actions', 'Android Studio', 'Play Console',
    'App Store Connect', 'Vercel', 'Cloudflare Workers', 'Framer Motion',
    'Deterministic sim engines',
  ],
]

export const NOW = [
  {
    label: 'Now live',
    title: 'Life Tycoon',
    body: 'Idle tycoon + life sim, free on Google Play. Deterministic Dart engine, balance bots playing whole lives in CI.',
    accent: '#FFC94A',
    live: true,
    href: 'https://play.google.com/store/apps/details?id=com.rayen.life_tycoon',
  },
  {
    label: 'Latest build',
    title: 'Stockfy',
    body: 'Scan-to-sell shop back office — now sells by weight, and the ledger can be asked a question.',
    accent: '#38A3E8',
  },
  {
    label: 'Proud number',
    title: '441 tests',
    body: 'Dart + Firestore rules tests on StudySwap. Every value worth cheating lives on the server.',
    accent: '#C8F000',
  },
]

/** Screens shown inside the hero phone. Files live in /public/screens. */
export const HERO_SCREENS = [
  { key: 'lifetycoon', app: 'Life Tycoon', tagline: 'Live on Google Play', color: '#FFC94A', src: '/screens/lifetycoon.jpg' },
  { key: 'restock', app: 'RESTOCK', tagline: 'AI restocking predictions', color: '#2DD4A0', src: '/screens/restock.jpg' },
  { key: 'stockfy', app: 'Stockfy', tagline: 'Offline-first shop back office', color: '#38A3E8', src: '/screens/stockfy.jpg' },
  { key: 'swiftdrop', app: 'SwiftDrop', tagline: 'Group orders & live tracking', color: '#F97316', src: '/screens/swiftdrop.jpg' },
  { key: 'studyswap', app: 'StudySwap', tagline: 'Live auctions, server-enforced', color: '#C8F000', src: '/screens/studyswap.jpg' },
]

export const PROJECTS = [
  {
    id: 'lifetycoon',
    title: 'Life Tycoon',
    tagline: 'Start at 18 with $300. Build an empire before time runs out.',
    description:
      'An idle tycoon and life simulator in one, live on Google Play. A month passes every 30 seconds: work, study, open a food cart, hire managers, and read a real monthly profit and loss. Health and happiness decide how long the life lasts — then you choose an heir and play on as them. The whole game runs offline on a deterministic pure-Dart engine in its own package.',
    highlights: [
      'Deterministic pure-Dart engine, separate from the Flutter app',
      'Balance bots play whole lives in CI; a money audit balances to the cent',
      '36 businesses over 7 industries, each with a real monthly P&L',
      'Dynasty, heirs and traits, 10 rivals, a fictional market — all offline',
    ],
    tags: ['Flutter', 'Dart engine', 'Hive CE', 'go_router', 'AdMob', 'Play Store'],
    type: 'Mobile game',
    year: '2026',
    color: '#FFC94A',
    image: '/projects/lifetycoon.jpg',
    imageAlt: 'Life Tycoon screens: the life tab, the business empire, the market and a whole life of statistics',
    github: 'https://github.com/rayen011/Life-Tycoon',
    live: 'https://play.google.com/store/apps/details?id=com.rayen.life_tycoon',
    liveLabel: 'Google Play',
    badge: 'Live on Google Play',
    featured: true,
  },
  {
    id: 'restock',
    title: 'RESTOCK',
    tagline: 'Home inventory that tells you what to restock, when — and what it costs to keep.',
    description:
      'Scan a barcode or just say it out loud, and RESTOCK tracks every item in the house, learns how fast you use it, and builds the shopping list before you run out. Ask the AI what to buy, see what keeping your home stocked really costs, and get a nudge the day before something runs dry.',
    highlights: [
      'Prediction engine + auto shopping list, with FCM nudges',
      'Barcode scan (Open Food Facts) and voice entry',
      'Spending analytics per category and per item',
      'RevenueCat subscriptions, family sharing, offline cache',
    ],
    tags: ['Flutter', 'Bloc', 'Firebase', 'Hive', 'RevenueCat', 'AI'],
    type: 'Mobile app',
    year: '2026',
    color: '#2DD4A0',
    image: '/projects/restock.jpg',
    imageAlt: 'RESTOCK app screens: categories, home dashboard and spending',
    github: 'https://github.com/rayen011/restock',
    live: null,
    liveLabel: 'Google Play',
  },
  {
    id: 'stockfy',
    title: 'Stockfy',
    tagline: 'Inventory and takings for a small shop, on the phone the owner already has.',
    description:
      'The camera is the till: scan a barcode and the product drops into a basket with the margin beside it. It asks what kind of shop this is and defaults everything from the answer, sells by weight, length or time as well as by the piece, and leads reports with profit rather than revenue. Dead stock, shrinkage, the credit book and supplier reorders are all handled offline-first — and the ledger can be asked a question in plain language.',
    highlights: [
      'Scan-to-sell checkout with per-line margin, sold by piece, kg, metre or hour',
      'Dead Stock Detective, Shrinkage Radar and an askable ledger',
      'Credit book, customer receipts and WhatsApp reorders',
      'Offline-first: Hive is the source of truth, cloud pages merge in',
    ],
    tags: ['Flutter', 'Cubit', 'Firebase', 'Hive', 'Offline-first', '~200 tests'],
    type: 'Mobile app',
    year: '2026',
    color: '#38A3E8',
    image: '/projects/stockfy.jpg',
    imageAlt: 'Stockfy app screens: home with profit today, scan-to-sell basket, Shrinkage Radar and the profit report',
    github: 'https://github.com/rayen011/stockfy',
    live: null,
    liveLabel: 'Google Play',
  },
  {
    id: 'studyswap',
    title: 'StudySwap',
    tagline: 'A campus marketplace where the buyers decide the price.',
    description:
      'Students were guessing what their textbooks were worth and getting it wrong both ways. StudySwap lets a seller hand that decision to the buyers: hidden-reserve auctions run on a server-enforced clock, anti-snipe extensions kill last-second wins, and bids cost credits earned by completing real trades. A win hands off to the chat and deal flow already there.',
    highlights: [
      'Live auctions with anti-snipe extensions',
      'Deal loop & reputation enforced in Cloud Functions and rules',
      'Realtime chat with deal requests and unread counts',
      '441 automated tests: Dart + Firestore rules',
    ],
    tags: ['Flutter', 'Bloc', 'Firebase', 'Cloud Functions', 'TypeScript', 'CI'],
    type: 'Mobile app',
    year: '2026',
    color: '#C8F000',
    image: '/projects/studyswap.jpg',
    imageAlt: 'StudySwap app screens: marketplace, bid room, live auction and placing a bid',
    github: 'https://github.com/rayen011/study-swap',
    live: null,
    liveLabel: 'Google Play',
  },
  {
    id: 'swiftdrop',
    title: 'SwiftDrop',
    tagline: 'Deliver together. Arrive smarter.',
    description:
      'Food and essentials delivery for Tunis with three twists: group orders that share one cart and split the delivery fee, an Eco Bundle mode that pools nearby orders and counts the CO₂ saved, and a Delivery Passport that stamps neighbourhoods to unlock deals. Built with a mock-driver simulation so the live-tracking loop works end to end in a demo.',
    highlights: [
      'Group orders via invite code, fee split equally',
      'Eco Bundle with CO₂ accounting',
      'Live order tracking and driver simulation',
      'SwiftDrop Plus subscription, phone OTP auth',
    ],
    tags: ['Flutter', 'Bloc', 'Firestore', 'Maps', 'l10n'],
    type: 'Mobile app',
    year: '2026',
    color: '#F97316',
    image: '/projects/swiftdrop.jpg',
    imageAlt: 'SwiftDrop app screens: eco mode, home, onboarding, store types and checkout',
    github: 'https://github.com/rayen011/swiftdrop',
    live: null,
    liveLabel: 'Google Play',
  },
  {
    id: 'closingline',
    title: 'ClosingLine',
    tagline: 'Every real-estate email, ready in seconds.',
    description:
      'A SaaS for solo real-estate agents who write the same ten emails every day. Pick a template, fill in the deal, and Claude drafts the email — in any language — with the API call locked behind a Supabase Edge Function so the key never reaches the browser. Google sign-in, a template library, history, saved templates, and Stripe billing round it out.',
    highlights: [
      'React + Supabase (Postgres, Auth, row-level security)',
      'Claude generation behind an Edge Function with trial & cost caps',
      'Stripe Checkout, Customer Portal and webhooks',
      'Send via Gmail / Outlook, multi-language output',
    ],
    tags: ['React', 'Vite', 'Supabase', 'Stripe', 'Claude', 'Tailwind'],
    type: 'Web SaaS',
    year: '2026',
    color: '#3B82F6',
    image: '/projects/closingline.jpg',
    imageAlt: 'ClosingLine landing page',
    github: 'https://github.com/rayen011/closingline',
    live: null,
    liveLabel: 'Live site',
  },
]

export const MORE_PROJECTS = [
  {
    id: 'debtkill',
    title: 'DebtKill',
    description: 'Gamified debt payoff: every debt is a boss, every payment a strike. XP, ranks, missions and achievements on top of Firebase + Crashlytics.',
    tags: ['Flutter', 'Firebase', 'Gamification'],
    color: '#8B5CF6',
    github: 'https://github.com/rayen011/deptkill',
    status: 'Shipped',
  },
  {
    id: 'rihla',
    title: 'Rihla',
    description: 'Negotiation-first ride hailing for Libya: the rider names a price, drivers bid, either side counters. Three apps (rider, driver, admin web) on one Firebase backend.',
    tags: ['Flutter', 'Firebase', '3 apps'],
    color: '#F5A623',
    github: null,
    status: 'Client work',
  },
  {
    id: 'marbah',
    title: 'Marbah · مربح',
    description: 'Offline inventory and profit tracking for a Jordanian corner shop. Scan a barcode, the Arabic name auto-fills, sell, and watch the profit land on the dashboard.',
    tags: ['Flutter', 'Offline', 'Arabic'],
    color: '#10B981',
    github: null,
    status: 'Client work',
  },
  {
    id: 'enigma',
    title: 'Enigma',
    description: 'One mystery a day, 24 hours to crack it. Daily cases scheduled by Cloud Functions, full offline support, designed and built end to end.',
    tags: ['Flutter', 'Firebase', 'Cloud Functions'],
    color: '#EC4899',
    github: null,
    status: 'Shipped',
  },
  {
    id: 'proofly',
    title: 'Proofly',
    description: 'AI product analyst: records sessions, detects rage clicks and dead ends, and tells you in plain language what is broken and what it costs. Cloudflare Workers + R2 + Supabase + React.',
    tags: ['React', 'Cloudflare', 'Supabase', 'AI'],
    color: '#3B82F6',
    github: null,
    status: 'In progress',
  },
]

// ---------------------------------------------------------------------------
// Star map
//
// Where each project sits on the work map, as a percentage of the map box, and
// how bright it burns. Positions are hand-placed rather than generated so the
// constellation stays balanced — retune them here, not in the component.
// Keep x between 10 and 90 so labels don't run off the edge.
// ---------------------------------------------------------------------------

export const STAR_MAP = {
  // The six case studies: bright, always labelled.
  lifetycoon: { x: 50, y: 38, weight: 1 },
  restock: { x: 21, y: 22, weight: 0.84 },
  stockfy: { x: 79, y: 26, weight: 0.84 },
  studyswap: { x: 14, y: 61, weight: 0.78 },
  swiftdrop: { x: 45, y: 77, weight: 0.74 },
  closingline: { x: 83, y: 62, weight: 0.74 },

  // The smaller builds: dimmer companions that name themselves on hover.
  debtkill: { x: 33, y: 50, weight: 0.42 },
  rihla: { x: 64, y: 48, weight: 0.42 },
  marbah: { x: 70, y: 86, weight: 0.4 },
  enigma: { x: 26, y: 88, weight: 0.4 },
  proofly: { x: 88, y: 42, weight: 0.44 },
}

/** Pairs of project ids joined by a faint line on the map. */
export const CONSTELLATION = [
  ['lifetycoon', 'restock'],
  ['lifetycoon', 'stockfy'],
  ['restock', 'studyswap'],
  ['stockfy', 'closingline'],
  ['studyswap', 'swiftdrop'],
  ['swiftdrop', 'closingline'],
  ['lifetycoon', 'swiftdrop'],
]
