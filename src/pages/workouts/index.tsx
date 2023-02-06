import React from 'react'
import { api } from '../../utils/api'

export interface WorkoutPageProps {}

const WorkoutPage = (props: WorkoutPageProps): JSX.Element => {

  const { data } = api.exercises.getAll.useQuery()

  return (
    <div>
      {data?.map(workout => (
        <div key={workout.id}>
          {workout.name}
        </div>
      ))}
    </div>
  )
}

export default WorkoutPage