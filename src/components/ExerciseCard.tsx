import type { Set } from '@prisma/client'
import React from 'react'
import SetChip from './SetChip'

export interface ExerciseCardProps {
  name: string
  sets: Set[]
  onClick: () => void
}

const ExerciseCard: React.FC<ExerciseCardProps> = (props) => {
  const { name, sets, onClick } = props
  return (
    <div className='rounded-md shadow-md border-1 bg-base-200 p-4 flex justify-between items-center hover:bg-base-300 cursor-pointer' onClick={onClick}>
      <h3 className='font-bold text-lg'>
        {name}
      </h3>
      <div className='flex items-center gap-4'>
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
