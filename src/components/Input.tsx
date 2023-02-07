import React from 'react'
import { twMerge } from 'tailwind-merge'

export const Input: React.FC<React.HTMLProps<HTMLInputElement>> = (props: React.HTMLProps<HTMLInputElement>) => {

  const { className, ...rest } = props

  return (
    <input 
      className={twMerge("block p-4 pl-6 text-sm text-grey-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-grey-500 focus:border-grey-900  focus-visible:ring-grey-900 focus-visible:border-grey-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-grey-700 dark:focus:ring-grey-500 dark:focus:border-grey-500 outline-none", className)} 
      {...rest} 
      />
  )
}