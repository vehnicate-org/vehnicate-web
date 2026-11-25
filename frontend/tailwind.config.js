/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        subtle: 'var(--bg-subtle)',
        elevated: 'var(--bg-elevated)',
        ink: 'var(--text)',
        body: 'var(--text-body)',
        muted: 'var(--text-muted)',
        line: 'var(--border)',
        lineStrong: 'var(--border-strong)',
        btn: 'var(--btn-bg)',
        btnHover: 'var(--btn-bg-hover)',
        onAccent: 'var(--on-accent)',
        link: 'var(--link)',
        linkHover: 'var(--link-hover)',
        defect: {
          pothole: 'var(--defect-pothole, #D92D20)',
          speedbreak: 'var(--defect-speedbreak, #DC6803)',
        },
        brand: {
          purple: 'var(--brand-purple)',
          pink: 'var(--brand-pink)',
          purpleSoft: 'var(--brand-purple-soft)',
          pinkSoft: 'var(--brand-pink-soft)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        ledger: ['Ledger', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'var(--gradient-brand)',
        'brand-gradient-reverse': 'var(--gradient-brand-reverse)',
        'brand-full': 'var(--gradient-full)',
      },
      maxWidth: {
        container: '1120px',
      },
    },
  },
  plugins: [],
}
