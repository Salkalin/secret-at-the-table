export default {
  content: ['./index.html', './web/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#110f0e',
        panel: '#1a1816',
        panel2: '#221e1b',
        line: '#312b26',
        text: '#ece5da',
        muted: '#8d857a',
        accent: '#c0563a',
        paper: '#e7dfd0'
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Courier Prime', 'monospace']
      }
    }
  },
  plugins: []
};
