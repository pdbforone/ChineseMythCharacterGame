import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // The Bureau palette
        void: '#0a0a0b',
        paper: '#1a1915',
        'paper-aged': '#2a2520',
        ink: '#e8e4d9',
        'ink-faded': '#8a8578',
        'seal-red': '#8b2c2c',
        'spirit-glow': '#c9a227',
        'spirit-bound': '#2d5a3d',
      },
      fontFamily: {
        body: ['Crimson Pro', 'serif'],
        ui: ['IBM Plex Mono', 'monospace'],
        chinese: ['Noto Serif TC', 'serif'],
      },
      animation: {
        'spirit-pulse': 'pulse 3s ease-in-out infinite',
        'spirit-glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px rgba(201, 162, 39, 0.5)' },
          '100%': { textShadow: '0 0 30px rgba(201, 162, 39, 0.9), 0 0 60px rgba(201, 162, 39, 0.4)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
