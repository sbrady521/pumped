import Link from 'next/link'
import React from 'react'
import {
  FaMoon,
  FaSun,
  FaHome,
  FaWeightHanging,
  FaCog
} from 'react-icons/fa';

          <button data-set-theme="dark" data-act-class="ACTIVECLASS"><FaMoon size='24'/> </button>

const themeOpts = [
  {label: 'Light', value: 'light'},
  {label: 'Dark', value: 'dark'},
]

export const SidebarNav: React.FC = () => {

  return (
    <nav className='h-screen w-80 flex flex-col items-center 
      text-justify p-2 bg-base-200
      '
    >
      <input type="checkbox" id="homepage-settings-modal" className="modal-toggle" />
      <label htmlFor="homepage-settings-modal" className="modal modal-bottom sm:modal-middle cursor-pointer">
        <label className="modal-box relative h-3/6 bg-base-100" htmlFor="">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">Click</label>
            <ul tabIndex={0} className="dropdown-content menu bg-base-200 p-2 shadow rounded-box w-52">
              {themeOpts.map(opt => (
                <li data-set-theme={opt.value} data-act-class='ACTIVECLASS' key={opt.value}><a>{opt.label}</a></li>
              ))}
            </ul>
          </div>
        </label>
      </label>
      <ul className="menu rounded-box p-2 gap-2 h-full w-full font-bold text-md">
        <li>
          <Link href='/'>
            <FaHome size="20" />
            Home
          </Link >
        </li>
        <li>
          <Link href='/workouts'>
            <FaWeightHanging size="20" />
            Workouts
          </Link >
        </li>
        <li>
          <label htmlFor="homepage-settings-modal" className="flex items-center gap-3">
            <FaCog size="20" />
            Settings
          </label>
        </li>
      </ul>
    </nav>
  )
}
