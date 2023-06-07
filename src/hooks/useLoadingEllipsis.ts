import { useEffect, useState } from 'react'

export function useLoadingEllipsis (): string {
  const [loading, setLoading] = useState<string>('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(loading => {
        switch (loading) {
          case '.':
            return '..'
          case '..':
            return '...'
          case '...':
            return '.'
          default:
            return '.'
        }
      })
    }, 500)

    return (): void => clearInterval(interval)
  }, [])

  return loading
}
