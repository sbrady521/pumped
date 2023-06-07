import { useLocalStorage } from "usehooks-ts"
import { Button } from "./Button"
import { useEffect } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <Button 
      variant='ghost'
      className="absolute bottom-0 right-0"
      onClick={() => { 
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      {theme === 'light' && <FaMoon />} 
      {theme === 'dark' && <FaSun />} 
    </Button>
  )
}
