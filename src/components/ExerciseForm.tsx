import { Set } from '@prisma/client'
import React, { useState } from 'react'
import { Set } from './Set'

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
  onNext: () => void
}

export const WorkoutSets: React.FC<WorkoutSetsProps> = (props) => {

  const { onNext } = props
  
  const [sets, setSets] = useState<Set[]>([ {weightMetric: 'kg'} ])

  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>
        Workout sets
      </h1>
      <Set />
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

export interface ExerciseFormProps {}
export const ExerciseForm: React.FC<ExerciseFormProps> = (props) => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [page, setPage] = useState<'workout-weights' | 'workout-sets'>('workout-weights')

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
            onNext={(): void => setPage('workout-sets')}
          />
      )}
    </div>
  )
}
