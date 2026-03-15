/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(187 96% 27%)',
        secondary: 'hsl(199 89% 48%)',
        destructive: 'hsl(0 84.2% 60.2%)',
        'wiki-blue': 'hsl(187 96% 27%)',
        'wiki-blue-visited': 'hsl(187 96% 20%)',
        'wiki-border': '#a7d7f9',
        'wiki-bg': '#f8f9fa',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1a1a',
            maxWidth: 'none',
            a: {
              color: 'hsl(187 96% 27%)',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              '&:visited': { color: 'hsl(187 96% 20%)' },
            },
            h2: {
              fontFamily: 'Georgia, serif',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '0.5rem',
              marginBottom: '1rem',
            },
            h3: { fontFamily: 'Georgia, serif' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
