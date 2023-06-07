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
import { useLoadingEllipsis } from 'hooks/useLoadingEllipsis'


const NewPage: NextPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const loadingEllipsis = useLoadingEllipsis()

  const { push } = useRouter()

  const createExercise = api.exercises.create.useMutation()

  const onSubmit = async () => {
    const id = uuid()
    setIsCreating(true)
    await createExercise.mutateAsync({ name, description, id })
    setIsCreating(false)
    await push(`/exercises/${id}`)
  }

  return (
    <div className='w-5/6 h-5/6 mx-auto my-16'>
      <h1 className="text-2xl font-bold mb-4">
        Workout description
      </h1>
      <form>
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
            onClick={() => { 
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              // onSubmit() 
              const id = uuid()
              createExercise.mutate({name, description, id})
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              push(`/exercises/${id}`)

            }}
          >
            {isCreating && `Creating${loadingEllipsis}`}
            {!isCreating && 'Create exercise'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewPage
