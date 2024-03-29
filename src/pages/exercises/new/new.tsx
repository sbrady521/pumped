import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { v4 as uuid } from 'uuid'
import { Label } from 'components/Label'
import { Textarea } from 'components/Textarea'
import Link from 'next/link'
import type { NextPage } from 'next/types'
import { useState } from 'react'
import { api } from 'utils/api'
import { useRouter } from 'next/router'
import { useExerciseStore } from 'stores/exercises/exercises'


const NewPage: NextPage = () => {
  const { push } = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const { exerciseCreated } = useExerciseStore()

  const createExercise = api.exercises.create.useMutation()

  const handleCreate = () => {
    const id = uuid()
    exerciseCreated({ name, description, id }) 
    createExercise.mutate({ name, description, id })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    push(`/exercises/${id}`)
  }

  return (
    <div className='w-full h-full mx-auto pt-8'>
      <h1 className="text-2xl font-bold mb-4">
        Workout description
      </h1>
      <div>
        <div className='mb-4 w-full'>
          <Label htmlFor='name'>Name</Label>
          <Input 
            onChange={(e) => setName(e.currentTarget.value)}
            id='name'
            type="text" 
            placeholder='Exercise name' 
            className='w-full'
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor='description'>Description (optional)</Label>
          <Textarea 
            onChange={(e) => setDescription(e.currentTarget.value)}
            id='description'
            placeholder='Any additional notes or description about your exercise'    
            className='w-full'
          />
        </div>
        <div className='flex gap-4 justify-end'>
          <Link href='/exercises'>
            <Button variant='ghost'>
              Cancel
            </Button>
          </Link>
          <Button 
            onClick={handleCreate}
          >
            Create exercise
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NewPage
