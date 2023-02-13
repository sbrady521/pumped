import type { Set as ISet } from '@prisma/client'
import React from 'react'



export interface SetProps {
  set: ISet
  onChangeSet: (set: ISet) => void
}

export const Set: React.FC<SetProps> = (props) => {
  const {
    set,
    onChangeSet
  } = props

  const { weight, weightMetric, reps } = set

  return (
    <div>
      <input 
        className='input input-bordered' 
        placeholder='Weight' 
        value={weight} 
        autoFocus
        onChange={(e) => onChangeSet({ ...set, weight: parseInt(e.currentTarget.value ?? '0') })}
      />
    </div>
  )
}