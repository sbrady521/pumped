import type { Exercise, Set as ISet } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import type { EdittableSet} from './Set';
import { v4 as uuid } from 'uuid'
import { NameAndDescription } from './NameAndDescription';
import { SetManager } from './SetManager';

export interface WorkoutDescProps {
  name: string
  desc: string
  onChangeName: (name: string) => void
  onChangeDesc: (desc: string) => void
  onNext: () => void
  onCancel: () => void
}

export const WorkoutDesc: React.FC<WorkoutDescProps> = (props) => {

  const { name, desc, onChangeName, onChangeDesc, onNext, onCancel } = props

  return (
    <>
      <NameAndDescription 
        name={name}
        desc={desc}
        onChangeDesc={onChangeDesc}
        onChangeName={onChangeName}
      />
      <div className='fixed bottom-16 right-16'>
        <label className='btn btn-ghost' onClick={onCancel}>
          Cancel
        </label>
        <button className='btn btn-primary' onClick={onNext} >
          Add sets
        </button>
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

  const onChangeSet = (changeIdx: number, newSet: ISet) => {
    const newSets = sets.map((set, setIdx) => setIdx === changeIdx ? newSet : set)
    onChangeSets(newSets)
  }

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
      <div className='fixed bottom-16 right-16'>
        <label className='btn btn-ghost' onClick={onPrev}>
          Back
        </label>
        <label className='btn btn-primary' onClick={onNext}>
          Create exercise
        </label>
      </div>
    </>
  )
}

export interface ExerciseFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (exercise: Exercise & { sets: ISet[] }) => void
}
export const ExerciseForm: React.FC<ExerciseFormProps> = (props) => {
  const { isOpen, onSubmit, onClose } = props
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [page, setPage] = useState<'workout-weights' | 'workout-sets'>('workout-weights')
  const [exerciseId, setExerciseId] = useState(uuid())

  const newSet = () => ({
    id: uuid(),
    weightMetric: 'kg' ,
    reps: 10
  })

  const [sets, setSets] = useState<EdittableSet[]>([newSet()])

  useEffect(() => {
    setPage('workout-weights')
    setSets([newSet()])
    setName('')
    setDesc('')
    setExerciseId(uuid())
  }, [isOpen])



  return (
    <div className='p-8 h-full w-full'>
      {page === 'workout-weights' && (
         <WorkoutDesc 
          name={name} 
          desc={desc}
          onChangeDesc={setDesc}
          onChangeName={setName}
          onNext={(): void => setPage('workout-sets')}
          onCancel={onClose}
        />
      )}
      {page === 'workout-sets' && (
         <WorkoutSets
            sets={sets}
            onChangeSets={setSets}
            onNewSet={(): void => setSets([...sets, newSet()])}
            onNext={(): void => {
              onSubmit({ name, id: exerciseId, description: desc, sets: sets as ISet[] })
            }}
            onPrev={() => {setPage('workout-weights')}}
          />
      )}
    </div>
  )
}
