import { useLocalStorage } from "usehooks-ts"
import { Button } from "./Button"
import { FaMoon, FaSun } from "react-icons/fa"

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <Button 
      variant='ghost'
      className="fixed bottom-0 right-0"
      onClick={() => { 
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
    >
      {theme === 'light' && <FaMoon />} 
      {theme === 'dark' && <FaSun />} 
    </Button>
  )
}
