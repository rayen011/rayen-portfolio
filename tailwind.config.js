/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#070708',
        surface: '#0E0E10',
        card: '#131316',
        elevated: '#1A1A1E',
        border: '#242428',
        gold: {
          DEFAULT: '#F5A623',
          bright: '#FFD166',
          dim: '#C47D0E',
          glow: 'rgba(245,166,35,0.15)',
        },
        text: {
          primary: '#F7F7F8',
          secondary: '#9E9EA7',
          muted: '#65656F',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
        snug: '-0.03em',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 14s linear infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marqueeReverse 40s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        drift: 'drift 22s ease-in-out infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% center' },
          to: { backgroundPosition: '-200% center' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.12)' },
        },
      },
      boxShadow: {
        gold: '0 0 30px rgba(245,166,35,0.35)',
        'gold-sm': '0 0 12px rgba(245,166,35,0.25)',
        card: '0 10px 40px rgba(0,0,0,0.5)',
        panel: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 60px -30px rgba(0,0,0,0.9)',
        phone: '0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
