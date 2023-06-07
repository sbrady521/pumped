import { api } from "utils/api";
import { useExerciseStore } from "./exercises";

export function useSyncExercises () {
  const { isInitialised, initExercises } = useExerciseStore()
  const { data: remoteExercises, isLoading, isSuccess } = api.exercises.getAll.useQuery()

  if (!isLoading && isSuccess && !isInitialised && remoteExercises.length > 0) {
    initExercises(remoteExercises)
  }
}
