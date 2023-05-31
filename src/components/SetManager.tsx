import { Button } from "./Button";
import { Set } from "./Set"
import type { EdittableSet } from "./Set"
import { FaMinus, FaPlusCircle } from 'react-icons/fa';

interface SetManagerProps {
  sets: EdittableSet[]
  onChangeSets: (sets: EdittableSet[]) => void
  onNewSet: () => void
}

export const SetManager: React.FC<SetManagerProps> = (props) => {
  const { sets, onChangeSets, onNewSet } = props
  const onChangeSet = (changeIdx: number, newSet: EdittableSet) => {
    const newSets = sets.map((set, setIdx) => setIdx === changeIdx ? newSet : set)
    onChangeSets(newSets)
  }

  return (
    <>
      <div className='flex flex-col gap-3'>
        {sets.map((set, idx) => (
          <div key={set.id} className='flex items-center'>
            <Set 
              set={set} 
              className="mr-4"
              onChangeSet={(set: EdittableSet) => onChangeSet(idx, set)} 
            />
            <Button 
              className="h-6 px-2 rounded-full"
              onClick={(): void => onChangeSets(sets.filter((_, i) => i !== idx))}
            >
              <FaMinus size='8'/>
            </Button>
          </div>
        ))}
      </div>
      <Button 
        variant='outline'
        className='w-full mt-4'
        onClick={onNewSet}
      >
        <FaPlusCircle />
      </Button>
    </>
  )

}


