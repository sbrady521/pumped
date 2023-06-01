import React from 'react'
import { Card } from './Card'

export interface SetChipProps {
  weight: number
  reps: number
  weightMetric: string
}

const SetChip: React.FC<SetChipProps> = (props) => {
  const { weight, reps, weightMetric } = props
  return (
    <Card className='py-2 px-4 w-fit'>
      <span className='font-bold'>{`${weight}${weightMetric}`}</span>
      <span>{` x ${reps}`}</span>
    </Card>
  )
}

export default SetChip
