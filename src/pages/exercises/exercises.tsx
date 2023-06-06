  // const trpcUtils = api.useContext()

  // const { data } = api.exercises.getAll.useQuery()
  // const upsertExercise = api.exercises.upsert.useMutation({
  //   onMutate: async (newExercise) => {
  //     await trpcUtils.exercises.getAll.cancel()
  //     const previous = trpcUtils.exercises.getAll.getData() ?? []

  //     const newData = (previous.findIndex(ex => ex.id === newExercise.id) !== -1)
  //        ? previous.map(ex => ex.id === newExercise.id ? newExercise : ex) as (Exercise & { sets: Set[] })[]
  //        : [...previous, newExercise] as (Exercise & { sets: Set[] })[]

  //     trpcUtils.exercises.getAll.setData(undefined, newData)
  //   }
  // })

import type { NextPage } from 'next'
import React from 'react'
import { ExerciseList } from 'components/ExerciseList';
import { api } from 'utils/api';

const ExercisePage: NextPage = () => {

  const { data: exercises } = api.exercises.getAll.useQuery()

  if (!exercises) return <div>loading</div>

  return (
    <div className='p-2 mt-8'>
      <ExerciseList 
        exercises={exercises}
      />
    </div>
  )
}

export default ExercisePage
