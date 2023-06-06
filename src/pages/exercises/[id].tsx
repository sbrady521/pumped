import type { Exercise, Set } from '@prisma/client'
import { EditExerciseForm } from 'components/EditExerciseForm'
import React from 'react'
import { api } from 'utils/api'

const EditPage = ({ params }: { params: { id: string } }) => {
  const { data: edittingExercise, isLoading } = api.exercises.get.useQuery(params.id)
  const trpcUtils = api.useContext()

  const updateExercise = api.exercises.update.useMutation({
    onMutate: async (newExercise) => {
      await trpcUtils.exercises.getAll.cancel()
      const previous = trpcUtils.exercises.getAll.getData() ?? []

      const newData = (previous.findIndex(ex => ex.id === newExercise.id) !== -1)
         ? previous.map(ex => ex.id === newExercise.id ? newExercise : ex) as (Exercise & { sets: Set[] })[]
         : [...previous, newExercise] as (Exercise & { sets: Set[] })[]

      trpcUtils.exercises.getAll.setData(undefined, newData)
    }
  })

  const deleteExercise = api.exercises.delete.useMutation()

  if (isLoading || !edittingExercise) return <div>Loading</div>

  return (
    <div className='w-5/6 h-5/6 mx-auto my-16'>
      <EditExerciseForm 
        exercise={edittingExercise} 
        editExercise={(newExercise) => { updateExercise.mutate(newExercise) }} 
        deleteExercise={() => { deleteExercise.mutate(params.id) }}
      />
    </div>
  )
}

export default EditPage
