import * as React from 'react'

/** The asterisk beside a required field's label. */
export const RequiredMark: React.FC = () => (
  <span className="text-destructive">
    {' '}
    *<span className="sr-only"> (required)</span>
  </span>
)
