import { cn } from '@/utilities/ui'
import * as React from 'react'

import { fieldBase, fieldHeight } from './fieldStyles'

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  type,
  ...props
}) => {
  return (
    <input
      className={cn(
        fieldBase,
        fieldHeight,
        'file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        className,
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  )
}

export { Input }
