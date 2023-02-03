import clsx from 'clsx'
import { PropsWithChildren } from 'react'

export function Container({ className, ...props }: {className?:string} & PropsWithChildren) {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
