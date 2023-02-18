import type { Exercise, Set as ISet } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import type { EdittableSet} from './Set';
import { FaMinus, FaPlusCircle, FaTimes } from 'react-icons/fa';
import { Set } from './Set'
import { v4 as uuid } from 'uuid'

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
      <h1 className='text-2xl font-bold mb-8'>
        Workout description
      </h1>
      <div className='mb-4 w-full'>
      <label className='label'>Name</label>
        <input 
          type="text" 
          placeholder='Exercise name' 
          className='input input-bordered w-full'
          value={name} 
          onChange={e => onChangeName(e.currentTarget.value)} 
        />
      </div>
      <div>
        <label className='label'>Description (optional)</label>
        <textarea 
          placeholder='Any additional notes or description about your exercise' 
          className='textarea textarea-bordered w-full'
          value={desc} 
          onChange={e => onChangeDesc(e.currentTarget.value)} 
        />
      </div>
      <div className='fixed bottom-16 right-16'>
        <label className='btn btn-ghost' htmlFor='exercise-form-modal' >
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
}

export const WorkoutSets: React.FC<WorkoutSetsProps> = (props) => {

  const { sets, onChangeSets, onNewSet, onNext } = props

  const onChangeSet = (changeIdx: number, newSet: ISet) => {
    const newSets = sets.map((set, setIdx) => setIdx === changeIdx ? newSet : set)
    onChangeSets(newSets)
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>
        Workout sets
      </h1>
      <div className='overflow-x-auto pr-4 pl-1'>
        {sets.map((set, idx) => (
          <div key={set.id} className='flex items-center gap-4'>
            <Set 
              set={set} 
              onChangeSet={(set: ISet) => onChangeSet(idx, set)} 
            />
            <button 
              className='btn btn-circle btn-xs'
              onClick={(): void => onChangeSets(sets.filter((_, i) => i !== idx))}
            >
              <FaMinus size='8'/>
            </button>
          </div>
        ))}
      </div>
      <button 
        className='btn btn-outline w-full mt-4'
        onClick={onNewSet}
      >
        <FaPlusCircle />
      </button>
      <div className='fixed bottom-16 right-16'>
        <label className='btn btn-ghost' htmlFor='exercise-form-modal' >
          Cancel
        </label>
        <label className='btn btn-primary' onClick={onNext} htmlFor='exercise-form-modal' >
          Create exercise
        </label>
      </div>
    </>
  )
}

export interface ExerciseFormProps {
  isOpen: boolean
  onSubmit: (exercise: Exercise & { sets: ISet[] }) => void
}
export const ExerciseForm: React.FC<ExerciseFormProps> = (props) => {
  const { isOpen, onSubmit } = props
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
          />
      )}
    </div>
  )
}
