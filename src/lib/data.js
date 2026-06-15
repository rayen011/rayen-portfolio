export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const STATS = [
  { value: 12, suffix: '+', label: 'Apps Shipped' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Bugs Squashed' },
  { value: 2, suffix: '', label: 'Platforms' },
]

export const SERVICES = [
  {
    id: 'app-dev',
    icon: '📱',
    title: 'App Development',
    description:
      'I build production-quality mobile apps end to end with Flutter — clean architecture, Firebase backends, and code that ships to both stores.',
    points: ['Flutter · iOS & Android', 'Firebase / Supabase backends', 'Clean, scalable architecture'],
    color: '#F5A623',
  },
  {
    id: 'ui-ux',
    icon: '🎨',
    title: 'UI/UX App Design',
    description:
      'I design clean, intuitive mobile interfaces that feel effortless — from wireframes and flows in Figma to a polished, consistent design system.',
    points: ['Wireframes & user flows', 'Figma design systems', 'Pixel-perfect, motion-rich UI'],
    color: '#8B5CF6',
  },
  {
    id: 'bug-fixes',
    icon: '🛠️',
    title: 'App Bug Fixes',
    description:
      'Got an app that crashes, lags, or misbehaves? I diagnose the root cause, fix it fast, and harden the codebase so it stays fixed.',
    points: ['Crash & ANR debugging', 'Performance & memory fixes', 'Code rescue & refactors'],
    color: '#10B981',
  },
]

export const SKILLS = {
  development: [
    'Flutter', 'Dart', 'Firebase', 'flutter_bloc', 'get_it / injectable',
    'go_router', 'Hive', 'Firestore', 'Firebase Auth', 'freezed',
    'Supabase', 'REST APIs', 'Clean Architecture', 'Android', 'iOS',
  ],
  design: [
    'Figma', 'Design Systems', 'Wireframing', 'Prototyping',
    'User Flows', 'Material Design', 'Auto Layout', 'Micro-interactions',
    'Responsive Layout', 'Accessibility',
  ],
  tools: [
    'Git / GitHub', 'VS Code', 'Android Studio', 'Postman',
    'Vercel', 'Google Play Console', 'App Store Connect',
  ],
}

export const PROJECTS = [
  {
    id: 'enigma',
    title: 'Enigma',
    description:
      'Daily mystery-solving app. Players get one cryptic case per day — clues, deductions, and reveals. Firebase-powered with full offline support and Cloud Functions for daily case scheduling. Designed and built end to end.',
    tags: ['Flutter', 'Firebase', 'UI/UX', 'Cloud Functions'],
    featured: true,
    github: 'https://github.com/rayen011',
    demo: null,
    color: '#8B5CF6',
    icon: '🔍',
    image: '/projects/enigma.png',
  },
  {
    id: 'nafas',
    title: 'Nafas نَفَس',
    description:
      'AI mental wellness companion for Arabic-speaking MENA users. Daily AI check-in, mood history, shareable quote cards. Full RTL UI with both MSA and dialect support.',
    tags: ['Flutter', 'Firebase', 'AI', 'RTL Design'],
    featured: false,
    github: 'https://github.com/rayen',
    demo: null,
    color: '#10B981',
    icon: '🌿',
    image: '/projects/nafas.png',
  },
  {
    id: 'wanderstory',
    title: 'WanderStory',
    description:
      'A free, open-source Flutter app that blends location-based storytelling with real-time multiplayer exploration. WanderStory lets users discover hidden gems in their city through immersive audio walks, collect digital souvenirs, and interact with friends in shared AR sessions.',
    tags: ['Flutter', 'Firebase', 'Real-time', 'AR'],
    featured: false,
    github: 'https://github.com/rayen011',
    demo: null,
    color: '#3B82F6',
    icon: '⚡',
    image: '/projects/wanderstory.png',
  },
  {
    id: 'swiftdrop',
    title: 'SwiftDrop',
    description:
      'Hyperlocal delivery app for the MENA market. Real-time order tracking, driver matching, and neighborhood-level delivery — with a fast, map-first interface.',
    tags: ['Flutter', 'Firebase', 'Maps', 'UI/UX'],
    featured: false,
    github: 'https://github.com/rayen011',
    demo: null,
    color: '#EF4444',
    icon: '📦',
    image: '/projects/swiftdrop.png',
  },
  {
    id: 'studyswap',
    title: 'StudySwap',
    description:
      'StudySwap is a social marketplace for university students to buy, sell, and trade textbooks, notes, and study materials. Created as a full-stack capstone project, it features a comprehensive student authentication system, real-time messaging, and a seamless transaction flow—all built with Flutter and Firebase.',
    tags: ['Flutter', 'Firebase', 'Full-Stack', 'Capstone'],
    featured: false,
    github: 'https://github.com/rayen011',
    demo: null,
    color: '#F5A623',
    icon: '🎓',
    image: '/projects/studyswap.png',
  },
]

export const SOCIAL_LINKS = {
  github: 'https://github.com/rayen011',
  linkedin: 'https://linkedin.com/in/rayen',
  email: 'Rayenbarkawi31@gmail.com',
}
