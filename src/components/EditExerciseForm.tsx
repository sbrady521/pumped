import type { Exercise, Set as ISet } from '@prisma/client'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import React, { useEffect, useState } from 'react'
import type { EdittableSet} from 'components/Set';
import { v4 as uuid } from 'uuid'
import { NameAndDescription } from 'components/NameAndDescription';
import { SetManager } from 'components/SetManager';
import { FaEdit } from 'react-icons/fa';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

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

export interface EditExerciseFormProps {
  exercise: Exercise & {sets: ISet[]}
  onClose: () => void
  onSubmit: (exercise: Exercise & { sets: ISet[] }) => void
}
export const EditExerciseForm: React.FC<EditExerciseFormProps> = (props) => {
  const { exercise, onSubmit, onClose } = props
  const [name, setName] = useState(exercise.name)
  const [desc, setDesc] = useState(exercise.description ?? '')
  const [exerciseId, setExerciseId] = useState(exercise.id)
  const [sets, setSets] = useState<EdittableSet[]>(exercise.sets)

  const newSet = () => ({
    id: uuid(),
    weightMetric: 'kg' ,
    reps: 10
  })

  useEffect(() => {
    setSets(exercise.sets)
    setName(exercise.name)
    setDesc(exercise.description ?? '')
    setExerciseId(exercise.id)
  }, [exercise])

  return (
    <div className='relative h-full w-full'>
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
          value={desc}
          onChange={e => setDesc(e.currentTarget.value ?? '')}
        />
        <FaEdit className="opacity-0 group-hover:opacity-50 transition-opacity ml-[-20px] " />
      </ div>
      <div className='mb-24'>
        <SetManager 
          sets={sets}
          onChangeSets={setSets}
          onNewSet={() => setSets([...sets, newSet()])}
        />
      </div>
      <div className='absolute gap-4 bottom-0 right-0'>
        <DialogPrimitive.Close>
          <Button variant='ghost'>
            Cancel
          </Button>
        </DialogPrimitive.Close>
        <Button 
          onClick={() => { onSubmit({ name, id: exerciseId, description: desc, sets: sets as ISet[] }) }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
