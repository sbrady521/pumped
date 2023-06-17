import { useEffect } from "react"
import { useLocalStorage } from "usehooks-ts"

export const useTheme = () => {
  const [theme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
}
