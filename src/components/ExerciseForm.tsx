import type { Exercise, Set as ISet } from '@prisma/client'
import React, { useState } from 'react'
import type { EdittableSet} from 'components/Set';
import { v4 as uuid } from 'uuid'
import { NameAndDescription } from 'components/NameAndDescription';
import { SetManager } from 'components/SetManager';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from 'components/Button';

export interface WorkoutDescProps {
  name: string
  desc: string
  onChangeName: (name: string) => void
  onChangeDesc: (desc: string) => void
  onNext: () => void
}

export const WorkoutDesc: React.FC<WorkoutDescProps> = (props) => {

  const { name, desc, onChangeName, onChangeDesc, onNext } = props

  return (
    <>
      <NameAndDescription 
        name={name}
        desc={desc}
        onChangeDesc={onChangeDesc}
        onChangeName={onChangeName}
      />
      <div className='absolute gap-4 bottom-0 right-0'>
        <DialogPrimitive.Close>
          <Button variant='ghost'>
            Cancel
          </Button>
        </DialogPrimitive.Close>
        <Button onClick={onNext} >
          Add sets
        </Button>
      </div>
    </>
  )
}

export interface WorkoutSetsProps {
  sets: EdittableSet[]
  onChangeSets: (sets: EdittableSet[]) => void
  onNewSet: () => void
  onNext: () => void
  onPrev: () => void
}

export const WorkoutSets: React.FC<WorkoutSetsProps> = (props) => {

  const { sets, onChangeSets, onNewSet, onNext, onPrev } = props

  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>
        Workout sets
      </h1>
      <SetManager 
        sets={sets}
        onChangeSets={onChangeSets}
        onNewSet={onNewSet}
      />
      <div className='absolute bottom-0 right-0'>
        <Button variant='ghost' onClick={onPrev}>
          Back
        </Button>
        <Button onClick={onNext}>
          Create exercise
        </Button>
      </div>
    </>
  )
}

export interface ExerciseFormProps {
  onSubmit: (exercise: Exercise & { sets: ISet[] }) => void
}
export const ExerciseForm: React.FC<ExerciseFormProps> = (props) => {
  const { onSubmit } = props
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [page, setPage] = useState<'workout-weights' | 'workout-sets'>('workout-weights')

  const newSet = () => ({
    id: uuid(),
    weightMetric: 'kg' ,
    reps: 10
  })

  const [sets, setSets] = useState<EdittableSet[]>([newSet()])

  return (
    <div className='relative h-full w-full'>
      {page === 'workout-weights' && (
        <div className='mb-24'>
           <WorkoutDesc 
            name={name} 
            desc={desc}
            onChangeDesc={setDesc}
            onChangeName={setName}
            onNext={(): void => setPage('workout-sets')}
          />
        </div>
      )}
      {page === 'workout-sets' && (
        <div className='mb-24'>
         <WorkoutSets
            sets={sets}
            onChangeSets={setSets}
            onNewSet={(): void => setSets([...sets, newSet()])}
            onNext={(): void => {
              onSubmit({ name, id: uuid(), description: desc, sets: sets as ISet[] })
            }}
            onPrev={() => {setPage('workout-weights')}}
          />
        </div>
      )}
    </div>
  )
}
