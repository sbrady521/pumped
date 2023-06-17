import { alphaSort } from "utils/sort";
import type { ExercisesState } from "./exercises";

export function selectOrderedExerciseIds (state: ExercisesState): string[] {
  const { exercisesById } = state
  return Object.values(exercisesById).sort(alphaSort('name')).map(ex => ex.id)
}

export function selectIsLoading (state: ExercisesState): boolean {
  return !state.isInitialised
}
