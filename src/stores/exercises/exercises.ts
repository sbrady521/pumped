import type { LocalExercise } from 'types/exercises'
import omit from 'lodash.omit'
import { create } from 'zustand'
import { createDefaultSet } from 'utils/exercises'

export type ExercisesState = {
  exercisesById: Record<string, LocalExercise>
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
    exercisesById: Object.fromEntries(exercises.map(ex => [ex.id, ex])),
    isInitialised: true 
  })),
  exerciseCreated: (incExercise: Omit<LocalExercise, 'sets'>) => set(state => ({
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
    exercisesById: omit(state.exercisesById, id)
  })),
}))
