'use server'

import { prisma } from "server/db"
import { ExerciseAndSet } from "stores/exercises/types"

export async function deleteExercise (id: string) {

  await prisma.set.deleteMany({ where: { exerciseId: id } })
  await prisma.exercise.delete({ where: { id } })
}

export async function editExercise (exercise: ExerciseAndSet) {
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

