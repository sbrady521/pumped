import { Input } from "./Input"
import { Label } from "./Label"
import { Textarea } from "./Textarea"

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
      <h1 className="text-2xl font-bold mb-4">
        Workout description
      </h1>
      <div className='mb-4 w-full'>
        <Label htmlFor='name'>Name</Label>
        <Input 
          id='name'
          type="text" 
          placeholder='Exercise name' 
          className='w-full'
          value={name} 
          onChange={e => onChangeName(e.currentTarget.value)} 
        />
      </div>
      <div>
        <Label htmlFor='desc'>Description (optional)</Label>
        <Textarea 
          id='desc'
          placeholder='Any additional notes or description about your exercise'    
          className='w-full'
          value={desc} 
          onChange={e => onChangeDesc(e.currentTarget.value)} 
        />
      </div>
    </>
  )
}


