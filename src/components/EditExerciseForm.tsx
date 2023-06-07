import type { Exercise, Set as ISet } from '@prisma/client'
import React, { useState } from 'react'
import type { EdittableSet} from 'components/Set';
import { v4 as uuid } from 'uuid'
import { SetManager } from 'components/SetManager';
import { FaTrashAlt } from 'react-icons/fa';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { useRouter } from 'next/router';

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
  editExercise: (exercise: Exercise & { sets: ISet[] }) => void
  deleteExercise: () => void
}
export const EditExerciseForm: React.FC<EditExerciseFormProps> = (props) => {
  const { exercise, editExercise, deleteExercise } = props

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
          sets={sets}
          onChangeSets={setSets}
          onNewSet={() => setSets([...sets, newSet()])}
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
              editExercise({ id: exercise.id, name, description, sets: sets as ISet[] }) 
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
