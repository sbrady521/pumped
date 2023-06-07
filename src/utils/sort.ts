/* eslint-disable @typescript-eslint/restrict-template-expressions */
function descendingComparatorAlpha<T> (a: T, b: T, orderBy: keyof T): number {
  const aVal = `${a[orderBy] ?? ''}`.toLowerCase()
  const bVal = `${b[orderBy] ?? ''}`.toLowerCase()
  if (bVal < aVal) {
    return -1
  }
  if (bVal > aVal) {
    return 1
  }
  return 0
}

/*
  creates an ascending sort predicate using a key to map an object to a string
*/
export function alphaSort <T> (key: keyof T): (a: T, b: T) => number {
  return (a: T, b: T): number => -descendingComparatorAlpha(a, b, key)
}
