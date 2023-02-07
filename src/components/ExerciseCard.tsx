import type { Set } from '@prisma/client'
import React from 'react'
import SetChip from './SetChip'

export interface ExerciseCardProps {
  name: string
  sets: Set[]
}

const ExerciseCard: React.FC<ExerciseCardProps> = (props) => {
  const { name, sets } = props
  return (
    <div className='rounded-md shadow-md border-1 border-grey-400 p-4 flex justify-between dark:bg-grey-600'>
      <h3 className='font-bold'>
        {name}
      </h3>
      <div>
        {sets.map(set => (
          <SetChip 
            key={set.id}
            weight={set.weight} 
            reps={set.reps} 
          />
        ))}
      </div>
    </div>
  )
}

export default ExerciseCard