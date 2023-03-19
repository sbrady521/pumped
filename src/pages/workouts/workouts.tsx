import type { NextPage } from 'next'
import type { Exercise, Set } from '@prisma/client';
import React, { useState } from 'react'
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import superjson from 'superjson'
import ExerciseCard from '../../components/ExerciseCard'
import { Searchbar } from '../../components/Searchbar'
import { api } from '../../utils/api'
import { FaPlusCircle } from 'react-icons/fa';
import { ExerciseForm } from '../../components/ExerciseForm'
import { Modal } from '../../components/Modal'
import { appRouter } from '../../server/api/root';
import { createTRPCContext } from '../../server/api/trpc';
import { EditExerciseForm } from '../../components/EditExerciseForm';

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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [edittingExerciseId, setEdittingExerciseId] = useState<string | null>(null)

  const filteredExercies = data?.filter(ex => search === '' || ex.name.toLowerCase().includes(search.toLowerCase()))
  const edittingExercise = (edittingExerciseId && data)
    ? data.find(ex => ex.id === edittingExerciseId) ?? null
    : null

  return (
    <div className='w-5/6 mx-auto my-16'>
      <Modal 
        id="exercise-form-modal" 
        onClose={() => {
          setIsOpen(false)
          setEdittingExerciseId(null)
        }}
        isOpen={isOpen}
      >
        <>
          {(edittingExerciseId === null || !edittingExercise) && (
            <ExerciseForm 
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                onSubmit={(exercise) => {
                  upsertExercise.mutate(exercise)
                  setIsOpen(false)
                }}
              />
          )}
          {(edittingExerciseId !== null && edittingExercise) && (
            <EditExerciseForm 
              exercise={edittingExercise}
              onClose={() => {
                setIsOpen(false)
                setEdittingExerciseId(null)
              }}
              onSubmit={(exercise) => {
                upsertExercise.mutate(exercise)
                setIsOpen(false)
                setEdittingExerciseId(null)
              }}
            /> 
          )}
        </>
      </Modal>
      <h1 className='font-bold text-3xl mb-8'>Exercise Tracker</h1>
      <div className='flex mb-4 justify-between'>
        <Searchbar className='w-3/6' value={search} onChange={(e) => setSearch(e.currentTarget.value)} />
        <button onClick={() => { setIsOpen(true) }} className="btn flex gap-2">
          <>
            <FaPlusCircle />
            Create
          </>
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        {filteredExercies?.map(workout => (
          <ExerciseCard
            onClick={() => { 
              setEdittingExerciseId(workout.id)
              setIsOpen(true)
            }}
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

export async function getServerSideProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    // @ts-expect-error trpc context really wants params
    ctx: await createTRPCContext(),
    transformer: superjson,
  });
  await ssg.exercises.getAll.prefetch()
  return {
    props: {
      trpcState: ssg.dehydrate()
    },
  };
}
