import { EditExerciseForm } from 'components/EditExerciseForm'
import type { NextPage } from 'next'
import { useParams } from 'next/navigation'
import React from 'react'
import { prisma } from 'server/db'


async function editExercise (data: any) {
  'use server'
  
  console.log(data)

  // const result = await prisma.exercise.create({ data: { name, description } }) 
}

async function getExercise (id: string) {
  return prisma.exercise.findUnique({ where: { id }, include: { sets: true } })
}

const EditPage = async ({ params }: { params: { id: string } }) => {
  const edittingExercise = await getExercise(params.id)

  if (!edittingExercise) throw Error('No valid exercise')

  return (
    <div className='w-5/6 h-5/6 mx-auto my-16'>
      <EditExerciseForm 
        exercise={edittingExercise} 
        editExercise={editExercise} 
      />
    </div>
  )
}

export default EditPage
