/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Searchbar } from "./Searchbar"
import { Button } from "./Button"
import { FaPlusCircle, FaSearch } from "react-icons/fa"
import ExerciseCard from "./ExerciseCard"
import { useRouter } from "next/router"
import { useExerciseStore } from "stores/exercises/exercises"
import { selectIsLoading, selectOrderedExerciseIds } from "stores/exercises/selectors"
import LoadingExerciseCard from "./LoadingExerciseCard"

export const ExerciseList: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null)

  const exerciseStore = useExerciseStore()
  const orderedExerciseIds = selectOrderedExerciseIds(exerciseStore)
  const isLoading = selectIsLoading(exerciseStore)

  const isMobile = useMediaQuery('(max-width: 640px)')

  const { push } = useRouter()

  const showSearchBar = (isMobile && search !== null) || !isMobile

  const filteredExerciseIds = orderedExerciseIds
    .filter(id => !search || exerciseStore.exercisesById[id]?.name.toLowerCase().includes(search.toLowerCase()))

  const cards = isLoading 
    ? Array.from({ length: 15 }, (_, idx) => <LoadingExerciseCard key={idx} />)
    : filteredExerciseIds?.map(id => (
      <ExerciseCard 
        key={id} 
        onClick={() => { 
          push(`/exercises/${id}`) 
          setTimeout((): void => { setSearch(null) }, 1000)
        }} 
        exerciseId={id} 
      />
    ))

  return (
    <div className="">
      <div className='flex mb-4 justify-between'>
        {showSearchBar && ( 
          <Searchbar 
            autoFocus={isMobile}
            className='w-full max-w-lg' 
            value={search ?? ''} 
            onChange={(e) => setSearch(e.currentTarget.value)} 
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
      <div className='flex flex-col gap-4 h-full overflow-auto'>
        {cards}
      </div>
    </div>
  )

}
