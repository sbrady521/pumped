import React, { useState } from 'react'
import { SetManager } from 'components/SetManager';
import { FaTrashAlt } from 'react-icons/fa';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { useRouter } from 'next/router';
import { createDefaultSet, localSetToRemoteSet } from 'utils/exercises';
import type { LocalExercise } from 'types/exercises';
import { useExerciseStore } from 'stores/exercises/exercises';
import { api } from 'utils/api';

export interface WorkoutDescriptionProps {
  name: string
  description: string
  onChangeName: (name: string) => void
  onChangeDescription: (description: string) => void
  onNext: () => void
  onCancel: () => void
}

export interface EditExerciseFormProps {
  exerciseId: string
}
export const EditExerciseForm: React.FC<EditExerciseFormProps> = (props) => {
  const { exerciseId } = props

  const { push } = useRouter()

  const { exercisesById, exerciseChanged, exerciseDeleted } = useExerciseStore()

  console.log({exercisesById})

  const exercise = exercisesById[exerciseId]

  const [name, setName] = useState(exercise?.name ?? '')
  const [description, setDescription] = useState(exercise?.description ?? '')

  const updateRemoteExercise = api.exercises.update.useMutation()
  const deleteRemoteExercise = api.exercises.delete.useMutation()

  const deleteExercise = () => {
    exerciseDeleted(exerciseId) 
    deleteRemoteExercise.mutate(exerciseId)
  }

  const updateExercise = (newExercise: Omit<LocalExercise, 'id'>) => {
    exerciseChanged({ ...newExercise, id: exerciseId })
    updateRemoteExercise.mutate({ 
      ...newExercise, 
      id: exerciseId, 
      sets: newExercise.sets.map(ex => localSetToRemoteSet(ex, exerciseId)) 
    })
  }

  return (
    <div className='h-full w-full'>
      <div className='relative w-fit mx-auto min-w-[350px]'>
        <Button 
          className='absolute top-0 right-0 rounded-full hover:bg-destructive'
          variant='secondary'
          onClick={() => {
            deleteExercise()
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            push('/exercises')
          }}
        >
          <FaTrashAlt />
        </Button>
        <Input 
          type="text" 
          placeholder="Exercise name" 
          className="w-5/6 text-2xl font-bold ml-[-14px] border-none"
          value={name}
          onChange={e => setName(e.currentTarget.value ?? '')}
        />
        <Input 
          type="text" 
          placeholder="Exercise description" 
          className="w-5/6 ml-[-14px] border-none"
          value={description}
          onChange={e => setDescription(e.currentTarget.value ?? '')}
        />
        <SetManager 
          sets={exercise?.sets ?? []}
          onChangeSets={sets => { 
            if (!exercise) return
            exerciseChanged({ ...exercise, sets })
          }}
          onNewSet={() => {
            if (!exercise) return
            exerciseChanged({ ...exercise, sets: [...exercise.sets, createDefaultSet()] })
          }}
        />
        <div className='flex gap-4 justify-end mt-4'>
          <Button 
            variant='ghost' 
            onClick={() => { 
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              push('/exercises')
            }}>
            Cancel
          </Button>
          <Button 
            onClick={() =>  { 
              if (!exercise) return
              const { name, description, sets } = exercise
              updateExercise({ name, description, sets }) 
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              push('/exercises')
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
