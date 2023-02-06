import Link from 'next/link'
import React from 'react'
import useDarkMode from '../hooks/useDarkMode'
import {
  FaMoon,
  FaSun,
} from 'react-icons/fa';

export interface SidebarNav {}

export const SidebarNav: React.FC<SidebarNav> = (props) => {
  const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => { setDarkTheme(!darkTheme) };
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size='24' className='top-navigation-icon' />
      ) : (
        <FaMoon size='24' className='top-navigation-icon' />
      )}
    </span>
  );
};

  return (
    <nav className='h-screen w-64 flex flex-col bg-white text-black dark:bg-grey-900 dark:text-white shadow-lg'>
      <Link href='/'>
        Home
      </Link>
      <Link href='/workouts'>
        Workouts
      </Link>
      <ThemeIcon />
    </nav>
  )
}
