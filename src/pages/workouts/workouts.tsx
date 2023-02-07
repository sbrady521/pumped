import type { NextPage } from 'next'
import React from 'react'
import ExerciseCard from '../../components/ExerciseCard'
import { Searchbar } from '../../components/Searchbar'
import { api } from '../../utils/api'


const WorkoutPage: NextPage = () => {

  const { data } = api.exercises.getAll.useQuery()

  console.log({data})

  return (
    <div className='w-5/6 mx-auto my-16'>
      <h1 className='font-bold text-3xl mb-8'>Exercise Tracker</h1>
      <div className='mb-4'>
        <Searchbar />
      </div>
      {data?.map(workout => (
        <ExerciseCard  
          key={workout.id} 
          name={workout.name}
          sets={workout.sets}
        />
      ))}
    </div>
  )
}

export default WorkoutPage