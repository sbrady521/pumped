import type { LocalSet, RemoteSet } from 'types/exercises'
import { v4 as uuid } from 'uuid'
export function createDefaultSet () {
  return {
    id: uuid(),
    weight: 0,
    exerciseId: '',
    weightMetric: 'kg' ,
    reps: 10
  }
}

export function localSetToRemoteSet (localSet: LocalSet, exerciseId: string): RemoteSet {
  const { weight, weightMetric, reps, id } = localSet
  return {
    id,
    weight: weight ?? 0,
    weightMetric: weightMetric ?? 'kg',
    reps: reps ?? 0,
    exerciseId
  }
}
