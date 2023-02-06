import type { NextPage } from 'next'
import React from 'react'
import { api } from '../../utils/api'

export interface WorkoutPageProps {}

const WorkoutPage: NextPage<WorkoutPageProps> = (props) => {

  const { data } = api.exercises.getAll.useQuery()

  return (
    <div className='w-full'>
      {data?.map(workout => (
        <div key={workout.id}>
          {workout.name}
        </div>
      ))}
    </div>
  )
}

export default WorkoutPage