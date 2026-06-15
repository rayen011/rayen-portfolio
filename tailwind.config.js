/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0D0D0D',
        surface: '#141414',
        card: '#1E1E1E',
        border: '#2A2A2A',
        gold: {
          DEFAULT: '#F5A623',
          bright: '#FFD700',
          dim: '#C47D0E',
          glow: 'rgba(245,166,35,0.15)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#AAAAAA',
          muted: '#666666',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'gradient-x': 'gradientX 4s ease infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5A623, #FFD700)',
        'dark-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #141414 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(245,166,35,0.3)',
        'gold-sm': '0 0 10px rgba(245,166,35,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
