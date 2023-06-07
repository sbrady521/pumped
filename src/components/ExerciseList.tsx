/* eslint-disable @typescript-eslint/no-floating-promises */
import { Exercise, Set } from "@prisma/client"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Searchbar } from "./Searchbar"
import { Button } from "./Button"
import { FaPlusCircle, FaSearch } from "react-icons/fa"
import ExerciseCard from "./ExerciseCard"
import { useRouter } from "next/router"

export type ExerciseListProps = {
  exercises: (Exercise & { sets: Set[] })[]
}

export const ExerciseList: React.FC<ExerciseListProps> = (props) => {
  const { exercises }  = props

  const [search, setSearch] = useState<string | null>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const { push } = useRouter()

  const showSearchBar = (isMobile && search !== null) || !isMobile

  const filteredExercies = exercises.filter(ex => !search || ex.name.toLowerCase().includes(search.toLowerCase()))

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
        {filteredExercies?.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            onClick={() => { 
              push(`/exercises/${exercise.id}`) 
            }} 
            name={exercise.name}
            sets={exercise.sets}
          />
        ))}
      </div>
    </div>
  )

}
