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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Pokemon-themed colors
        pokemon: {
          red: '#EA1D25',
          blue: '#2A72B8',
          yellow: '#F7C505',
          orange: '#FF6B35',
          green: '#4CAF50',
          purple: '#7B68EE',
          pink: '#FF69B4',
        },
      },
    },
  },
  darkMode: 'media',
  plugins: [],
}
export default config
