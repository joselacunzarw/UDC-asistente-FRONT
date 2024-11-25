/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            p: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'h1, h2, h3': {
              marginTop: '1rem',
              marginBottom: '0.5rem',
              fontWeight: '600',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            code: {
              color: 'inherit',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              backgroundColor: '#f3f4f6',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
            blockquote: {
              borderLeftWidth: '4px',
              borderLeftColor: '#e5e7eb',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'ul, ol': {
              paddingLeft: '1.25rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            li: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            table: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },
            'th, td': {
              padding: '0.5rem',
              borderWidth: '1px',
              borderColor: '#e5e7eb',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};