import type { NextPage } from 'next'
import React from 'react'
import { ExerciseList } from 'components/ExerciseList';
import { api } from 'utils/api';

const ExercisePage: NextPage = () => {

  const { data: exercises } = api.exercises.getAll.useQuery()

  if (!exercises) return <div>loading</div>

  return (
    <div className='w-full p-2 mt-8'>
      <ExerciseList 
        exercises={exercises}
      />
    </div>
  )
}

export default ExercisePage
