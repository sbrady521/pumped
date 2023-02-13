import type { Set as ISet } from '@prisma/client'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Dropdown } from './Dropdown'

export interface EdittableSet extends Omit<ISet, 'weight' | 'exerciseId'> {
  weight?: number
}

export interface SetProps {
  set: EdittableSet
  onChangeSet: (set: ISet) => void
}

export const Set: React.FC<SetProps> = (props) => {
  const {
    set,
    onChangeSet
  } = props

  const { weight, weightMetric, reps } = set

  return (
    <div className='flex items-center'>
      <input 
        className='input input-bordered w-2/6' 
        placeholder='Weight' 
        value={weight ?? ''} 
        autoFocus
        onChange={(e) => onChangeSet({ ...set, weight: parseInt(e.currentTarget.value || '0') })}
      />
      <Dropdown
        label={weightMetric}
        options={[{ value: 'kg', label: 'KG' }, { value: 'lb', label: 'LB' }]} 
        onSelect={(weightMetric: string) => onChangeSet({ weight: 0, ...set, weightMetric })}
      />
      <div className='font-bold ml-4 mr-5' >
        <FaTimes />
      </div>
      <input 
        className='input input-bordered w-2/6' 
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