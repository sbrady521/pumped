import type { NextPage } from 'next'
import type { Exercise, Set } from '@prisma/client';
import React, { useState } from 'react'
import ExerciseCard from '../../components/ExerciseCard'
import { Searchbar } from '../../components/Searchbar'
import { api } from '../../utils/api'
import { FaPlusCircle } from 'react-icons/fa';
import { ExerciseForm } from '../../components/ExerciseForm'
import { Dialog, DialogContent, DialogTrigger } from '../../components/Dialog'
import { EditExerciseForm } from '../../components/EditExerciseForm';
import { Button } from '../../components/Button';

const WorkoutPage: NextPage = () => {

  const trpcUtils = api.useContext()

  const { data } = api.exercises.getAll.useQuery()
  const upsertExercise = api.exercises.upsert.useMutation({
    onMutate: async (newExercise) => {
      await trpcUtils.exercises.getAll.cancel()
      const previous = trpcUtils.exercises.getAll.getData() ?? []

      const newData = (previous.findIndex(ex => ex.id === newExercise.id) !== -1)
         ? previous.map(ex => ex.id === newExercise.id ? newExercise : ex) as (Exercise & { sets: Set[] })[]
         : [...previous, newExercise] as (Exercise & { sets: Set[] })[]

      trpcUtils.exercises.getAll.setData(undefined, newData)
    }
  })

  const [search, setSearch] = useState<string>('')
  const [edittingExerciseId, setEdittingExerciseId] = useState<string | null>(null)

  const filteredExercies = data?.filter(ex => search === '' || ex.name.toLowerCase().includes(search.toLowerCase()))
  const edittingExercise = (edittingExerciseId && data)
    ? data.find(ex => ex.id === edittingExerciseId) ?? null
    : null

  return (
    <div className='w-5/6 mx-auto my-16'>
      <Dialog >
        <DialogContent>
          <>
            {(edittingExerciseId === null || !edittingExercise) && (
              <ExerciseForm 
                  onSubmit={(exercise) => { upsertExercise.mutate(exercise) }}
                />
            )}
            {(edittingExerciseId !== null && edittingExercise) && (
              <EditExerciseForm 
                exercise={edittingExercise}
                onClose={() => {
                  setEdittingExerciseId(null)
                }}
                onSubmit={(exercise) => {
                  upsertExercise.mutate(exercise)
                  setEdittingExerciseId(null)
                }}
              /> 
            )}
          </>
        </DialogContent>
      <div className='flex mb-4 justify-between'>
        <Searchbar className='w-3/6' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <DialogTrigger asChild> 
          <Button 
            className="gap-2"
            onClick={() => { setEdittingExerciseId(null) }}
          >
            <>
              <FaPlusCircle />
              Create
            </>
          </Button>
        </DialogTrigger> 
      </div>
      <div className='flex flex-col gap-4'>
        {filteredExercies?.map(workout => (
          <DialogTrigger asChild key={workout.id}>
            <ExerciseCard
              onClick={() => { setEdittingExerciseId(workout.id) }}
              name={workout.name}
              sets={workout.sets}
            />
          </DialogTrigger>
        ))}
      </div>
      </Dialog>
    </div>
  )
}

export default WorkoutPage
