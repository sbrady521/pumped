import type { Exercise, Set } from "@prisma/client";


export type RemoteExercise = Omit<Exercise, 'createdBy' | 'updatedAt' | 'updatedBy' | 'createdAt'>
export type RemoteSet = Set
export type RemoteExerciseWithSets = RemoteExercise & { sets: RemoteSet[] }

export type LocalExercise = RemoteExercise & { sets: LocalSet[] }

export type LocalSet = {
  id: string
  weight?: number
  reps?: number
  weightMetric?: string
}
