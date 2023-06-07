import type { NextPage } from 'next'
import React from 'react'
import { ExerciseList } from 'components/ExerciseList';

const ExercisePage: NextPage = () => {
  return (
    <div className='w-full mt-8'>
      <ExerciseList />
    </div>
  )
}

export default ExercisePage
