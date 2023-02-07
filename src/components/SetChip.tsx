import React from 'react'

export interface SetChipProps {
  weight: number
  reps: number
}

const SetChip: React.FC<SetChipProps> = (props) => {
  const { weight, reps } = props
  return (
    <div className='rounded-md border-1 border-grey-400'>
      <span className='font-bold'>{`${weight}kg`}</span>
      <span>{` x ${reps}`}</span>
    </div>
  )
}

export default SetChip