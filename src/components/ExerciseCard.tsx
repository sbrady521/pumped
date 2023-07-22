import React from 'react'
import { Card, CardContent, CardHeader } from './Card'
import { useExerciseStore } from 'stores/exercises/exercises'
import type { LocalSet } from 'types/exercises'

function getMaxSetWeight (sets: LocalSet[]): string | null {
  let topWeight: number | undefined
  let metric: string | undefined

  for (const set of sets) {
    if (set.weight !== undefined && (!topWeight || set.weight > topWeight)) {
      topWeight = set.weight
      metric = set.weightMetric
    }
  }

  return (topWeight !== undefined && metric !== undefined) 
    ? `${topWeight}${metric}`
    : null
}

export interface ExerciseCardProps {
  exerciseId: string
  onClick: () => void
}

const ExerciseCard: React.FC<ExerciseCardProps> = (props) => {
  const { exerciseId, onClick } = props
  const { exercisesById } = useExerciseStore()

  const { sets = [], name = '' } = exercisesById[exerciseId] ?? {}
  
  const maxSetWeight = getMaxSetWeight(sets)

  return (
    <Card onClick={onClick} className='flex justify-between py-4 px-6 items-center hover:bg-accent cursor-pointer'>
        <CardHeader className='p-0 mr-8 whitespace-nowrap'>
          <h3 className='font-bold text-md'>
            {name}
          </h3>
        </CardHeader>
      <CardContent className='p-0 overflow-auto'>
        {maxSetWeight !== null && (
          <Card className='py-2 px-4 w-fit whitespace-nowrap'>
          <span className='font-bold'>{maxSetWeight}</span>
        </Card>
        )}
      </CardContent>
    </Card>
  )
}

export default ExerciseCard
