import React, { useState } from 'react'
import { Input } from './Input'

export interface ExerciseFormProps {}

const ExerciseForm: React.FC<ExerciseFormProps> = (props) => {
  const [name, setName] = useState('')
  return (
    <div className='p-8'>
      <Input className='w-full' label='name' value={name} onChange={e => setName(e.currentTarget.value)} />
    </div>
  )
}

export default ExerciseForm