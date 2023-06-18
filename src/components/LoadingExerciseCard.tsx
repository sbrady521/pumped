import React from 'react'
import { Card, CardContent, CardHeader } from './Card'
import { Skeleton } from './Skeleton'

const LoadingExerciseCard: React.FC = () => {
  return (
    <Card className='flex justify-between py-4 px-6 items-center'>
        <CardHeader className='p-0 mr-8 whitespace-nowrap'>
          <Skeleton className='h-6 w-40 my-2' />
        </CardHeader>
      <CardContent className='p-0 overflow-auto'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-8 w-14 min-w-14' />
          <Skeleton className='h-8 w-14 min-w-14' />
          <Skeleton className='h-8 w-14 min-w-14' />
        </div>
      </CardContent>
    </Card>
  )
}

export default LoadingExerciseCard
