import { cn } from '@/utilities/ui'
import * as React from 'react'

import { fieldBase } from './fieldStyles'

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn(fieldBase, 'min-h-28 py-2.5 leading-relaxed', className)}
      data-slot="textarea"
      {...props}
    />
  )
}

export { Textarea }
