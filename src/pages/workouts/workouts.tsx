import type { NextPage } from 'next'
import React, { useState } from 'react'
import Button from '../../components/Button'
import ExerciseCard from '../../components/ExerciseCard'
import { Searchbar } from '../../components/Searchbar'
import { api } from '../../utils/api'
import { FaPlusCircle } from 'react-icons/fa';
import { Modal } from '../../components/Modal'
import ExerciseForm from '../../components/ExerciseForm'

const WorkoutPage: NextPage = () => {

  const { data } = api.exercises.getAll.useQuery()

  const [search, setSearch] = useState<string>('')
  const [showCreate, setShowCreate] = useState<boolean>(false)

  const filteredExercies = data?.filter(ex => search === '' || ex.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='w-5/6 mx-auto my-16'>
      <Modal 
        isOpen={showCreate} 
        onRequestClose={(): void => setShowCreate(false)}
        ariaHideApp={false}
        className='w-3/6 h-3/6 p-0'
      >
        <ExerciseForm />
      </Modal>
      <h1 className='font-bold text-3xl mb-8'>Exercise Tracker</h1>
      <div className='flex mb-4 justify-between'>
        <Searchbar className='w-3/6' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <Button className='flex items-center gap-3' onClick={(): void => setShowCreate(true)}>
          <FaPlusCircle />
          Create
        </Button>
      </div>
      {filteredExercies?.map(workout => (
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