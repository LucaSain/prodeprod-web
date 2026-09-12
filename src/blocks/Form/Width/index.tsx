import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={className}
      style={
        // The editor's percentage is a desktop intent. Below `md` it is
        // ignored by the stylesheet, so a 50%-wide field is not left as a
        // cramped half-column on a phone.
        width ? ({ '--field-width': `${width}%` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </div>
  )
}
