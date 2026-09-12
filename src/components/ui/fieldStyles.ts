/**
 * Shared field chrome.
 *
 * One definition so the text input, textarea and select trigger cannot drift
 * apart. Notes on the choices:
 *
 * - `h-11` (44px) is the minimum comfortable touch target.
 * - `text-base` on small screens: iOS Safari zooms the page when a focused
 *   field's text is under 16px, which is why this steps down only at `md`.
 * - `bg-background` rather than transparent, so a field still reads as a field
 *   when the form sits on a tinted panel.
 * - Focus is the global `:focus-visible` outline plus a border shift; the old
 *   4px ring was left mangled when the dark-mode variants were stripped.
 */
export const fieldBase =
  'w-full rounded-md border border-input bg-background px-3.5 text-base text-foreground transition-colors ' +
  'placeholder:text-muted-foreground ' +
  'hover:border-foreground/40 ' +
  'focus-visible:border-ring ' +
  'disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-muted ' +
  'aria-[invalid=true]:border-destructive aria-[invalid=true]:hover:border-destructive ' +
  'md:text-[0.9375rem]'

export const fieldHeight = 'h-11'
