/* eslint-disable @typescript-eslint/no-floating-promises */
import type { NextPage } from 'next'
import React from 'react'
import { ExerciseList } from 'components/ExerciseList';
import { ThemeSwitcher } from 'components/ThemeSwitcher';

const ExercisePage: NextPage = () => {
  return (
    <div className='w-full mt-8'>
      <ExerciseList />
      <ThemeSwitcher />
    </div>
  )
}

export default ExercisePage
