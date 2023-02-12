import React from 'react'
import { Input } from './Input'
import { FaSearch } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge'

export const Searchbar: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  const { className, ...rest } = props
  return (
    <div className='relative w-full'>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" >
        <FaSearch />
      </div>
      <input 
        type="search" 
        id="default-search" 
        placeholder='search exercises...'
        className={twMerge('input input-bordered pl-10', className)}
        {...rest}
      />
    </div>
  )
}
