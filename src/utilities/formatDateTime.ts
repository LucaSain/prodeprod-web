/**
 * Formats a timestamp for display.
 *
 * `timeZone: 'UTC'` is deliberate: the server renders in the host's zone and
 * the browser in the visitor's, so letting it default produces a hydration
 * mismatch whenever the two disagree about the date.
 */
export const formatDateTime = (timestamp: string, locale = 'en'): string => {
  const date = timestamp ? new Date(timestamp) : new Date()

  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
