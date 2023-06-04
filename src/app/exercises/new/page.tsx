import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Label } from 'components/Label'
import { Textarea } from 'components/Textarea'
import type { NextPage } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { prisma } from 'server/db'
import { v4 as uuid } from 'uuid'


async function createExercise (data: FormData) {
  'use server'
  
  const name = data.get('name')?.valueOf()
  const description = data.get('description')?.valueOf()

  if (typeof name !== 'string' || (description !== undefined && typeof description !== 'string')) {
    throw Error('Invalid exercise')
  }

  if (name === '') {
    redirect('/exercises')
  } else {
    const exercise = await prisma.exercise.create({ data: {  name, description } }) 
    redirect(`/exercises/${exercise.id}`)
  }
}

const NewPage: NextPage = async () => {
  return (
    <div className='w-5/6 h-5/6 mx-auto my-16'>
      <h1 className="text-2xl font-bold mb-4">
        Workout description
      </h1>
      <form action={createExercise}>
        <div className='mb-4 w-full'>
          <Label htmlFor='name'>Name</Label>
          <Input 
            id='name'
            name='name'
            type="text" 
            placeholder='Exercise name' 
            className='w-full'
          />
        </div>
        <div className='mb-4'>
          <Label htmlFor='description'>Description (optional)</Label>
          <Textarea 
            id='description'
            name='description'
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
          <Button type='submit' >
            Create exercise
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewPage
