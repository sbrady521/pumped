import type { Set as ISet } from '@prisma/client'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Dropdown } from './Dropdown'
import { Input } from './Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'
import { cn } from 'utils/tailwind'

export interface EdittableSet extends Omit<ISet, 'weight' | 'exerciseId'> {
  weight?: number
}

export interface SetProps {
  set: EdittableSet
  className?: string
  onChangeSet: (set: ISet) => void
}

export const Set: React.FC<SetProps> = (props) => {
  const {
    set,
    className,
    onChangeSet
  } = props

  const { weight, weightMetric, reps } = set

  return (
    <div className={cn('flex items-center', className)}>
      <Input 
        className='w-2/6' 
        placeholder='Weight' 
        value={weight ?? ''} 
        autoFocus
        onChange={(e) => onChangeSet({ ...set, weight: parseInt(e.currentTarget.value || '0') })}
      />
      <Select 
        onValueChange={(weightMetric: string) => onChangeSet({ weight: 0, ...set, weightMetric })}
      >
        <SelectTrigger className='w-20 ml-2'>
          <SelectValue placeholder={weightMetric} />
        </SelectTrigger>
        <SelectContent>
          {['kg', 'lb'].map(opt => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className='font-bold ml-4 mr-4' >
        <FaTimes />
      </div>
      <Input 
        className='w-2/6' 
        placeholder='Weight' 
        value={reps} 
        onChange={(e) => onChangeSet({ weight: 0, ...set, reps: parseInt(e.currentTarget.value || '0') })}
      />
      <div className='flex items-center justify-center ml-2 font-bold'>
        reps
      </div>
    </div>
  )
}
