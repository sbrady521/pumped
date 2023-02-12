import React, { useState } from 'react'

export interface ExerciseFormProps {}

const ExerciseForm: React.FC<ExerciseFormProps> = (props) => {
  const [name, setName] = useState('')
  return (
    <div className='p-8'>
      <label className='label'>Exercise name</label>
      <input 
        type="text" 
        placeholder='Exercise name' 
        className='input input-bordered w-full max-w-xs'
        value={name} 
        onChange={e => setName(e.currentTarget.value)} 
      />
    </div>
  )
}

export default ExerciseForm