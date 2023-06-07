import type { LocalExercise } from 'types/exercises'
import omit from 'lodash.omit'
import { create } from 'zustand'
import { createDefaultSet } from 'utils/exercises'

export type ExercisesState = {
  exercisesById: Record<string, LocalExercise>
  exerciseIds: string[]
  isInitialised: boolean
  initExercises: (exercises: LocalExercise[]) => void
  exerciseCreated: (incExercise: Omit<LocalExercise, 'sets'>) => void
  exerciseChanged: (incExercise: LocalExercise) => void
  exerciseDeleted: (id: string) => void
}

export const useExerciseStore = create<ExercisesState>((set) => ({
  exercisesById: {},
  exerciseIds: [],
  isInitialised: false,
  initExercises: (exercises: LocalExercise[]) => set(() => ({ 
    exerciseIds: exercises.map(ex => ex.id),
    exercisesById: Object.fromEntries(exercises.map(ex => [ex.id, ex])),
    isInitialised: true 
  })),
  exerciseCreated: (incExercise: Omit<LocalExercise, 'sets'>) => set(state => ({
    exerciseIds: [...state.exerciseIds, incExercise.id],
    exercisesById: { 
      ...state.exercisesById, 
      [incExercise.id]: {
        ...incExercise,
        sets: [ createDefaultSet() ]
      } 
    }
  })),
  exerciseChanged: (incExercise: LocalExercise) => set(state => ({
    exercisesById: { ...state.exercisesById, [incExercise.id]: incExercise }
  })),
  exerciseDeleted: (id: string) => set(state => ({
    exerciseIds: state.exerciseIds.filter(exId => exId !== id),
    exercisesById: omit(state.exercisesById, id)
  })),
}))
