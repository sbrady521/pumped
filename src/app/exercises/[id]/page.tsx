'use client'

import { deleteExercise, editExercise } from 'app/api/exercises/mutations'
import { EditExerciseForm } from 'components/EditExerciseForm'
import React from 'react'
import { useExerciseStore } from 'stores/exercises/exercises'

export const revalidate = 3

const EditPage = async ({ params }: { params: { id: string } }) => {
  const edittingExercise = useExerciseStore((state) => state.exercises.find(ex => ex.id === params.id))

  console.log({edittingExercise})

  if (!edittingExercise) throw Error('No valid exercise')

  return (
    <div className='w-5/6 h-5/6 mx-auto my-16'>
      <EditExerciseForm 
        exercise={edittingExercise} 
        editExercise={editExercise} 
        deleteExercise={() => deleteExercise(params.id)}
      />
    </div>
  )
}

export default EditPage
