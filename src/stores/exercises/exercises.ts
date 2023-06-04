import {create} from 'zustand'
import { ExerciseAndSet } from './types'

type ExerciseState = {
  exercises: ExerciseAndSet[]
  setExercises: (exercises: ExerciseAndSet[]) => void
  addExercise: (ex: ExerciseAndSet) => void
  removeExercise: (id: string) => void
  replaceExercise: (newEx: ExerciseAndSet) => void
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  setExercises: (exercises: ExerciseAndSet[]) => set(() => ({ exercises })),
  addExercise: (ex: ExerciseAndSet) => set((state) => ({ exercises: [...state.exercises, ex] })),
  removeExercise: (id: string) => set((state) => ({ exercises: state.exercises.filter(ex => ex.id !== id) })),
  replaceExercise: (newEx: ExerciseAndSet) => set((state) => ({ 
    exercises: state.exercises.map(ex => ex.id === newEx.id ? newEx : ex) 
  })),
}))
