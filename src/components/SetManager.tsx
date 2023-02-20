import type { Set as EdittableSet } from "@prisma/client"
import { Set } from "./Set"
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
      <div className='overflow-x-auto pr-4 pl-1'>
        {sets.map((set, idx) => (
          <div key={set.id} className='flex items-center gap-4'>
            <Set 
              set={set} 
              onChangeSet={(set: EdittableSet) => onChangeSet(idx, set)} 
            />
            <button 
              className='btn btn-circle btn-xs'
              onClick={(): void => onChangeSets(sets.filter((_, i) => i !== idx))}
            >
              <FaMinus size='8'/>
            </button>
          </div>
        ))}
      </div>
      <button 
        className='btn btn-outline w-full mt-4'
        onClick={onNewSet}
      >
        <FaPlusCircle />
      </button>
    </>
  )

}


