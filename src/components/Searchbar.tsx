import React from 'react'
import type { InputProps } from 'components/Input';
import { Input } from 'components/Input'
import { FaSearch } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge'

export const Searchbar: React.FC<InputProps> = (props) => {
  const { className, ...rest } = props
  return (
    <div className='relative w-full'>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" >
        <FaSearch />
      </div>
      <Input 
        type="search" 
        id="default-search" 
        placeholder='search exercises...'
        className={twMerge('pl-10', className)}
        {...rest}
      />
    </div>
  )
}
