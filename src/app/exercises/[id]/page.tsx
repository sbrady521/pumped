import { Exercise, Set } from '@prisma/client'
import { EditExerciseForm } from 'components/EditExerciseForm'
import React from 'react'
import { prisma } from 'server/db'


async function editExercise (exercise: Exercise & { sets: Set[] }) {
  'use server'
  
  const { name, description, id, sets } = exercise

  const setsNoExercise = sets.map(({exerciseId, ...rest}) => rest)


  const setEntries = setsNoExercise.map(set => ({ 
    create: set, 
    update: set, 
    where: { id: set.id } 
  }))

  await prisma.set.deleteMany({
    where: {
      exerciseId: id,
    },
  })

  await prisma.exercise.update({
    data: { 
      name, 
      description, 
      sets: { 
        upsert: setEntries 
      } 
    },
    where: {
      id
    },
    include: {
      sets: true
    }
  })

  
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
