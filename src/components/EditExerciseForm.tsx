'use client'

import type { Exercise, Set as ISet } from '@prisma/client'
import React, { useState } from 'react'
import type { EdittableSet} from 'components/Set';
import { v4 as uuid } from 'uuid'
import { SetManager } from 'components/SetManager';
import { FaEdit } from 'react-icons/fa';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { useRouter } from 'next/navigation';

export interface WorkoutDescriptionProps {
  name: string
  description: string
  onChangeName: (name: string) => void
  onChangeDescription: (description: string) => void
  onNext: () => void
  onCancel: () => void
}

export interface EditExerciseFormProps {
  exercise: Exercise & {sets: ISet[]}
  editExercise: (exercise: Exercise & { sets: ISet[] }) => Promise<void>
}
export const EditExerciseForm: React.FC<EditExerciseFormProps> = (props) => {
  const { exercise, editExercise } = props
  const [name, setName] = useState(exercise.name)
  const [description, setDescription] = useState(exercise.description ?? '')
  const [sets, setSets] = useState<EdittableSet[]>(exercise.sets)

  const { push } = useRouter()

  const newSet = () => ({
    id: uuid(),
    weightMetric: 'kg' ,
    reps: 10
  })

  return (
    <div className='relative h-full w-full'>
      <div className='w-fit mx-auto min-w-[350px]'>
        <div className="flex group items-center">
          <Input 
            type="text" 
            placeholder="Exercise name" 
            className="w-full text-2xl font-bold ml-[-14px] border-none"
            value={name}
            onChange={e => setName(e.currentTarget.value ?? '')}
          />
          <FaEdit className="opacity-0 group-hover:opacity-50 transition-opacity mt-1 ml-[-20px] " />
        </ div>
        <div className="flex group items-center mb-4">
          <Input 
            type="text" 
            placeholder="Exercise description" 
            className="w-full ml-[-14px] border-none"
            value={description}
            onChange={e => setDescription(e.currentTarget.value ?? '')}
          />
          <FaEdit className="opacity-0 group-hover:opacity-50 transition-opacity ml-[-20px] " />
        </ div>
        <SetManager 
          sets={sets}
          onChangeSets={setSets}
          onNewSet={() => setSets([...sets, newSet()])}
        />
        <div className='flex gap-4 justify-end mt-4'>
          <Button variant='ghost' onClick={() => { push('/exercises') }}>
            Cancel
          </Button>
          <Button 
            onClick={async () => { 
              await editExercise({ id: exercise.id, name, description, sets: sets as ISet[] })
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
