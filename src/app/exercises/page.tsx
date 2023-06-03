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
    <div className='w-5/6 mx-auto my-16'>
      <ExerciseList 
        exercises={exercises}
      />
    </div>
  )
}

export default ExercisePage

export const revalidate = 0
