/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--foreground)',
              '--tw-prose-headings': 'var(--foreground)',
              '--tw-prose-lead': 'var(--muted-foreground)',
              '--tw-prose-links': 'var(--primary)',
              '--tw-prose-bold': 'var(--foreground)',
              '--tw-prose-counters': 'var(--muted-foreground)',
              '--tw-prose-bullets': 'var(--primary)',
              '--tw-prose-hr': 'var(--border)',
              '--tw-prose-quotes': 'var(--foreground)',
              '--tw-prose-quote-borders': 'var(--primary)',
              '--tw-prose-captions': 'var(--muted-foreground)',
              '--tw-prose-code': 'var(--foreground)',
              '--tw-prose-th-borders': 'var(--border)',
              '--tw-prose-td-borders': 'var(--border)',
              maxWidth: 'none',
              lineHeight: '1.7',
              a: {
                fontWeight: '500',
                textDecorationThickness: '1px',
                textUnderlineOffset: '3px',
              },
              'a:hover': { textDecorationThickness: '2px' },
              blockquote: { fontStyle: 'normal', borderLeftWidth: '2px' },
            },
          ],
        },
        base: {
          css: [
            {
              h1: { fontSize: '2.75rem' },
              h2: { fontSize: '1.875rem', marginTop: '2.5em' },
              h3: { fontSize: '1.375rem' },
            },
          ],
        },
        md: {
          css: [{ h1: { fontSize: '3.75rem' }, h2: { fontSize: '2.375rem' } }],
        },
      },
    },
  },
}

export default config
