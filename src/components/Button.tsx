import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {

  const { className, ...rest } = props

  return (
    <button 
      className={twMerge("text-white bg-grey-700 hover:bg-grey-800 focus:ring-4 focus:ring-grey-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-grey-600 dark:hover:bg-grey-700 focus:outline-none dark:focus:ring-grey-800", className)}
      {...rest}
    />
  )
}

export default Button