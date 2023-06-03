import type { NextPage } from 'next'
import React from 'react'
import { ExerciseList } from 'components/ExerciseList';
import { prisma } from 'server/db';

const getExercises = () => {
  return prisma.exercise.findMany({ include: { sets: true } })
}

const ExercisePage: NextPage = async () => {

  const exercises = await getExercises()

  return (
    <div className='p-2 mt-8'>
      <ExerciseList 
        exercises={exercises}
      />
    </div>
  )
}

export default ExercisePage

export const revalidate = 0
