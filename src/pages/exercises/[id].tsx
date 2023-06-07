/* eslint-disable @typescript-eslint/no-floating-promises */
import { EditExerciseForm } from 'components/EditExerciseForm'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from 'utils/api'

const EditPage = () => {
  const { query } = useRouter()
  const utils = api.useContext()

  const exerciseId = query.id as string

  const { data: edittingExercise, isLoading } = api.exercises.get.useQuery(exerciseId, { enabled: !!exerciseId })

  const updateExercise = api.exercises.update.useMutation({
    onSuccess(input) {
      utils.exercises.getAll.invalidate()
      if (input.id) utils.exercises.get.invalidate(input.id)
    }
  })
  const deleteExercise = api.exercises.delete.useMutation({
    onSuccess() {
      utils.exercises.getAll.invalidate()
    }
  })

  if (isLoading || !edittingExercise) return <div>Loading</div>

  return (
    <div className='w-5/6 h-5/6 mx-auto my-16'>
      <EditExerciseForm 
        exercise={edittingExercise} 
        editExercise={(newExercise) => { updateExercise.mutate(newExercise) }} 
        deleteExercise={() => { deleteExercise.mutate(exerciseId) }}
      />
    </div>
  )
}

export default EditPage
