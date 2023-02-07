import React from 'react'
import { Input } from './Input'
import { FaSearch } from 'react-icons/fa';

export const Searchbar: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  return (
    <div className='relative'>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" >
        <FaSearch />
      </div>
      <Input 
        type="search" 
        id="default-search" 
        placeholder='search exercises...'
        className='pl-10'
        {...props}
      />
    </div>
  )
}
