import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Input } from './Input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './Select'
import { cn } from 'utils/tailwind'
import type { LocalSet } from 'types/exercises'

export interface SetProps {
  set: LocalSet
  className?: string
  onChangeSet: (set: LocalSet) => void
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
        type='number'
        value={weight ?? ''} 
        autoFocus
        onChange={(e) => onChangeSet({ 
          ...set, 
          weight: e.currentTarget.value ? parseFloat(e.currentTarget.value) : undefined 
        })}
      />
      <Select 
        onValueChange={(weightMetric: string) => onChangeSet({...set, weightMetric })}
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
        type='number'
        value={reps} 
        onChange={(e) => onChangeSet({ 
          ...set, 
          reps: e.currentTarget.value ? parseInt(e.currentTarget.value) : undefined 
        })}
      />
      <div className='flex items-center justify-center ml-2 font-bold'>
        reps
      </div>
    </div>
  )
}
