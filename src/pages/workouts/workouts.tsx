import type { NextPage } from 'next'
import React, { useState } from 'react'
import ExerciseCard from '../../components/ExerciseCard'
import { Searchbar } from '../../components/Searchbar'
import { api } from '../../utils/api'
import { FaPlusCircle } from 'react-icons/fa';
import { ExerciseForm } from '../../components/ExerciseForm'
import { ModalTrigger, Modal } from '../../components/Modal'

const WorkoutPage: NextPage = () => {

  const { data } = api.exercises.getAll.useQuery()
  const upsertExercise = api.exercises.upsert.useMutation()

  const [search, setSearch] = useState<string>('')

  const filteredExercies = data?.filter(ex => search === '' || ex.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='w-5/6 mx-auto my-16'>
      <Modal id="exercise-form-modal">
        <ExerciseForm 
        
          onSubmit={(exercise, sets) => {
            console.log({exercise, sets})
            upsertExercise.mutate({exercise, sets})
          }}
        />
      </Modal>
      <h1 className='font-bold text-3xl mb-8'>Exercise Tracker</h1>
      <div className='flex mb-4 justify-between'>
        <Searchbar className='w-3/6' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <ModalTrigger id="exercise-form-modal" className="btn flex gap-2">
          <>
            <FaPlusCircle />
            Create
          </>
        </ModalTrigger>
      </div>
      <div className='flex flex-col gap-4'>
        {filteredExercies?.map(workout => (
          <ExerciseCard  
            key={workout.id} 
            name={workout.name}
            sets={workout.sets}
          />
        ))}
      </div>
    </div>
  )
}

export default WorkoutPage