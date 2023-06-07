import { EditExerciseForm } from 'components/EditExerciseForm'
import { useRouter } from 'next/router'
import React from 'react'

const EditPage = () => {
  const { query } = useRouter()

  if (!query.id) return <div>Loading</div>

  return (
    <div className='w-full h-full mx-auto pt-8'>
      <EditExerciseForm exerciseId={query.id as string} />
    </div>
  )
}

export default EditPage
