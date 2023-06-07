import type { Exercise, Set } from "@prisma/client";


export type RemoteExercise = Exercise
export type RemoteSet = Set
export type RemoteExerciseWithSets = Exercise & { sets: Set[] }

export type LocalExercise = Exercise & { sets: LocalSet[] }

export type LocalSet = {
  id: string
  weight?: number
  reps?: number
  weightMetric?: string
}
