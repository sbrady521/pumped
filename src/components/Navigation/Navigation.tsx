import Link from 'next/link'
import React from 'react'

export interface NavigationProps {}

export const Navigation: React.FC = (props: NavigationProps) => {
  return (
    <nav>
      <Link href='/'>
        Home
      </Link>
      <Link href='/workouts'>
        Workouts
      </Link>
    </nav>
  )
}
