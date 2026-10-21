/** @type {import('tailwindcss').Config} */
// All color / shadow / easing / radius values live as CSS variables in src/index.css
// (values from CLONE_SPEC.md section 0) and are exposed here as Tailwind tokens.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['diatype', 'diatype Fallback', '-apple-system', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Max-width breakpoints from the spec. Declared largest-first so smaller ones win in the cascade.
      screens: {
        'lt1000': { raw: '(max-width: 1000px)' },
        'lt800': { raw: '(max-width: 800px)' },
        'lt760': { raw: '(max-width: 760px)' },
        'lt600': { raw: '(max-width: 600px)' },
        'lt480': { raw: '(max-width: 480px)' },
      },
      colors: {
        accent: { DEFAULT: 'var(--accent)', hover: 'var(--accent-hover)' },
        ink: 'var(--ink)',
        'prose-muted': 'var(--prose-muted)',
        hairline: 'var(--hairline)',
        rule: 'var(--rule)',
        'page-tint': 'var(--page-tint)',
        'surface-border': 'var(--landing-surface-border)',
        hero: {
          text: 'var(--hero-text)',
          muted: 'var(--hero-text-muted)',
          link: 'var(--hero-link)',
          'link-muted': 'var(--hero-link-muted)',
          chip: 'var(--hero-chip)',
          'chip-hover': 'var(--hero-chip-hover)',
          'chip-text': 'var(--hero-chip-text)',
        },
        success: 'var(--success)',
        selection: { bg: 'var(--selection-bg)', rule: 'var(--selection-rule)', marker: 'var(--selection-marker)' },
        updated: 'var(--updated-bg)',
        grey: {
          222: 'var(--grey-222)',
          444: 'var(--grey-444)',
          555: 'var(--grey-555)',
          666: 'var(--grey-666)',
          777: 'var(--grey-777)',
          888: 'var(--grey-888)',
          999: 'var(--grey-999)',
          aaa: 'var(--grey-aaa)',
          e7: 'var(--grey-e7)',
          f0: 'var(--grey-f0)',
          f2: 'var(--grey-f2)',
          fa: 'var(--grey-fa)',
        },
        'black-60': 'var(--black-60)',
        'black-30': 'var(--black-30)',
        status: {
          'signed-bg': 'var(--status-signed-bg)',
          signed: 'var(--status-signed)',
          'waiting-bg': 'var(--status-waiting-bg)',
          waiting: 'var(--status-waiting)',
          'draft-bg': 'var(--status-draft-bg)',
          draft: 'var(--status-draft)',
        },
      },
      boxShadow: {
        hairline: 'var(--ring-hairline)',
        card: 'var(--shadow-card)',
        focus: 'var(--focus-shadow)',
        surface: 'var(--landing-surface-shadow)',
        composer: 'var(--shadow-composer)',
        selection: 'var(--shadow-selection-card)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      borderRadius: {
        pill: '999px',
        chip: '6px',
        card: '24px',
        composer: '20px',
        thread: '16px',
        citation: '12px',
      },
      letterSpacing: {
        title: 'var(--type-tracking-title)',
        heading: 'var(--type-tracking-heading)',
        small: 'var(--type-tracking-small)',
      },
    },
  },
  plugins: [],
}
