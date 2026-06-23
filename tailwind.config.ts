import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b0c3ca',
        secondary: '#64748b',
        accent: '#f59e0b',
        cream: '#FAF8F5',
        sand: '#EDE8E0',
        charcoal: '#1C1C1C',
        muted: '#8A9BA5',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        headline: ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        subheadline: ['clamp(1.1rem, 2vw, 1.4rem)', { lineHeight: '1.6' }],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
