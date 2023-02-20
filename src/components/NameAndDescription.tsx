interface NameAndDescriptionProps {
  name: string
  desc: string
  onChangeName: (name: string) => void
  onChangeDesc: (desc: string) => void
}

export const NameAndDescription: React.FC<NameAndDescriptionProps> = (props) => {
  const { name, desc, onChangeName, onChangeDesc } = props
  return (
    <>
      <h1>
        Workout description
      </h1>
      <div className='mb-4 w-full'>
        <label className='label'>Name</label>
        <input 
        type="text" 
        placeholder='Exercise name' 
        className='input input-bordered w-full'
        value={name} 
        onChange={e => onChangeName(e.currentTarget.value)} 
        />
      </div>
      <div>
        <label className='label'>Description (optional)</label>
        <textarea 
          placeholder='Any additional notes or description about your exercise'    
          className='textarea textarea-bordered w-full'
          value={desc} 
          onChange={e => onChangeDesc(e.currentTarget.value)} 
        />
      </div>
    </>
  )
}


