import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
}

export const Input: React.FC<React.HTMLProps<HTMLInputElement>> = (props: React.HTMLProps<HTMLInputElement>) => {

  const { className, label, ...rest } = props

  return (
    <>
      {label && ( 
        <label className='font-bold dark:text-grey-400'>
          {label}
        </label>
      )}
      <input 
        className={twMerge("block p-4 pl-6 text-sm border border-grey-300 rounded-lg bg-grey-50 focus:ring-grey-500 focus:border-grey-900  focus-visible:ring-grey-900 focus-visible:border-grey-900 dark:bg-grey-700 dark:border-grey-600 dark:placeholder-grey-400 dark:focus:ring-grey-500 dark:focus:border-grey-500 outline-none", className)} 
        {...rest} 
      />
    </>
  )
}