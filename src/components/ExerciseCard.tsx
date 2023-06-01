import type { Set } from '@prisma/client'
import React from 'react'
import SetChip from 'components/SetChip'
import { Card, CardContent, CardHeader } from './Card'

export interface ExerciseCardProps {
  name: string
  sets: Set[]
  onClick: () => void
}

const ExerciseCard: React.FC<ExerciseCardProps> = (props) => {
  const { name, sets, onClick } = props
  return (
    <Card onClick={onClick} className='flex justify-between py-4 px-6 items-center hover:bg-accent cursor-pointer'>
        <CardHeader className='p-0'>
          <h3 className='font-bold text-lg'>
            {name}
          </h3>
        </CardHeader>
      <CardContent className='p-0'>
        <div className='flex items-center gap-4'>
          {sets.map(set => (
            <SetChip 
              weightMetric={set.weightMetric}
              key={set.id}
              weight={set.weight} 
              reps={set.reps} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ExerciseCard
