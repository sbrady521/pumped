import Link from 'next/link'
import React from 'react'
import {
  FaMoon,
  FaSun,
  FaHome,
  FaWeightHanging,
  FaCog
} from 'react-icons/fa';
import { Modal, ModalTrigger } from './Modal';

          <button data-set-theme="dark" data-act-class="ACTIVECLASS"><FaMoon size='24'/> </button>

const themeOpts = [
  {label: 'Light', value: 'emerald'},
  {label: 'Dark', value: 'dark'},
  // {label: 'Cupcake', value: 'cupcake'},
  // {label: 'Emerald', value: 'emerald'},
  // {label: 'Forest', value: 'forest'},
  // {label: 'Dracula', value: 'dracula'},
]

export const SidebarNav: React.FC = () => {

  return (
    <nav className='h-screen w-80 flex flex-col items-center 
      text-justify p-2 bg-base-200
      '
    >
      <Modal id="homepage-settings-modal">
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">Theme</label>
          <ul tabIndex={0} className="dropdown-content menu bg-base-200 p-2 shadow rounded-box w-52">
            {themeOpts.map(opt => (
              <li data-set-theme={opt.value} data-act-class='ACTIVECLASS' key={opt.value}><a>{opt.label}</a></li>
            ))}
          </ul>
        </div>
      </Modal>
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
          <ModalTrigger id="homepage-settings-modal">
            <FaCog size="20" />
            Settings
          </ModalTrigger>
        </li>
      </ul>
    </nav>
  )
}
