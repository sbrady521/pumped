import React from 'react'
import SetChip from 'components/SetChip'
import { Card, CardContent, CardHeader } from './Card'
import { useExerciseStore } from 'stores/exercises/exercises'

export interface ExerciseCardProps {
  exerciseId: string
  onClick: () => void
}

const ExerciseCard: React.FC<ExerciseCardProps> = (props) => {
  const { exerciseId, onClick } = props
  const { exercisesById } = useExerciseStore()

  const { sets = [], name = '' } = exercisesById[exerciseId] ?? {}

  return (
    <Card onClick={onClick} className='flex justify-between py-4 px-6 items-center hover:bg-accent cursor-pointer'>
        <CardHeader className='p-0 mr-8 whitespace-nowrap'>
          <h3 className='font-bold text-md'>
            {name}
          </h3>
        </CardHeader>
      <CardContent className='p-0 overflow-auto'>
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
