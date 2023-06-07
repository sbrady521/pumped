import { EditExerciseForm } from 'components/EditExerciseForm'
import { useRouter } from 'next/router'
import React from 'react'

const EditPage = () => {
  const { query } = useRouter()

  if (!query.id) return <div>Loading</div>

  return (
    <div className='w-5/6 h-5/6 mx-auto my-16'>
      <EditExerciseForm exerciseId={query.id as string} />
    </div>
  )
}

export default EditPage
