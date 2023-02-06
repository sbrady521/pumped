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

  const NavItem = (props: React.ComponentProps<typeof Link>) => {
    return (
      <Link {...props} className='w-full p-4 rounded-xl hover:bg-grey-300 dark:hover:bg-grey-700 text-lg font-bold mb-4' />
    )
  }

  return (
    <nav className='h-screen w-64 flex flex-col items-center 
      text-justify bg-grey-100 dark:bg-grey-900 shadow-lg p-2
      '
    >
      <NavItem href='/'>
        Home
      </NavItem>
      <NavItem href='/workouts'>
        Workouts
      </NavItem>
      <ThemeIcon />
    </nav>
  )
}
