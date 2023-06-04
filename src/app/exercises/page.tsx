import type { NextPage } from 'next'
import React  from 'react'
import { ExerciseList } from 'components/ExerciseList';
import { prisma } from 'server/db';

async function getExercises () {
  return await prisma.exercise.findMany({ include: { sets: true } })
}

const ExercisePage: NextPage = async () => {
  return (
    <div className='p-2 mt-8'>
      <ExerciseList exercises={await getExercises()} />
    </div>
  )
}

export default ExercisePage
