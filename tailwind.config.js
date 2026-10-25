/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        teal: {
          DEFAULT: 'hsl(var(--teal))',
          50: '#F0FDFA',
          100: '#CCFBF1',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        coral: {
          DEFAULT: 'hsl(var(--coral))',
          100: '#FFE4E6',
          400: '#FB7185',
          500: '#F43F5E',
        },
        gold: {
          DEFAULT: 'hsl(var(--gold))',
          100: '#FEF3C7',
          400: '#FBBF24',
          500: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
      },
    },
  },
  plugins: [],
}
