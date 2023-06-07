/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Searchbar } from "./Searchbar"
import { Button } from "./Button"
import { FaPlusCircle, FaSearch } from "react-icons/fa"
import ExerciseCard from "./ExerciseCard"
import { useRouter } from "next/router"
import { useExerciseStore } from "stores/exercises/exercises"

export const ExerciseList: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null)

  const { exerciseIds, exercisesById } = useExerciseStore()

  const isMobile = useMediaQuery('(max-width: 640px)')

  const { push } = useRouter()

  const showSearchBar = (isMobile && search !== null) || !isMobile

  const filteredExerciseIds = exerciseIds
    .filter(id => !search || exercisesById[id]?.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div className='flex mb-4 justify-between'>
        {showSearchBar && ( 
          <Searchbar 
            autoFocus={isMobile}
            className='w-full max-w-lg' 
            value={search ?? ''} 
            onChange={(e) => setSearch(e.currentTarget.value)} 
            onBlur={() => setSearch(null)}
          />
        )}
        {!showSearchBar && (
          <Button variant='secondary' className="rounded-full" onClick={() => setSearch('')}>
            <FaSearch />
          </Button>
        )} 
        {!(isMobile && showSearchBar) && (
          <Button 
            className="gap-2"
            onClick={() => { 
              push('/exercises/new') 
            }}
          >
            <>
              <FaPlusCircle />
              Create
            </>
          </Button>
        )}
      </div>
      <div className='flex flex-col gap-4'>
        {filteredExerciseIds?.map(id => (
          <ExerciseCard
            key={id}
            onClick={() => { 
              push(`/exercises/${id}`) 
            }} 
            exerciseId={id}
          />
        ))}
      </div>
    </div>
  )

}
