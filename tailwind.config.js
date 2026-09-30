export default {
  content: ['./index.html', './web/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // старые (для игры)
        ink: '#110f0e',
        panel: '#1a1816',
        panel2: '#221e1b',
        line: '#312b26',
        text: '#ece5da',
        muted: '#8d857a',
        accent: '#c0563a',
        paper: '#e7dfd0',

        // новые (для лендинга)
        lnd: {
          ink: '#0d0807',
          cream: '#f3e6cf',
          text: '#eadcc6',
          muted: '#a8968a',
          amber: '#f2a541',
          red: '#e0603a',
          teal: '#3fb39c',
          gold: '#e3b04b',
          panel: 'rgba(22,14,11,.82)',
          line: 'rgba(243,230,207,.10)'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Courier Prime', 'monospace']
      }
    }
  },
  plugins: []
};