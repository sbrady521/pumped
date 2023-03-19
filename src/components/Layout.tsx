import Head from 'next/head'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { HamburgerNav } from './HamburgerNav'
import { SidebarNav } from './SidebarNav'
import { Breakpoints } from '../constants/screen'
import { FaBars } from 'react-icons/fa'

export interface LayoutProps {
  children: JSX.Element
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  const isMobile = useMediaQuery({ maxWidth: Breakpoints.Small })

  return (
    <div data-theme="ACTIVETHEME" className='flex bg-base-100' >
      <Head>
        <title>Pumped App</title>
        <meta name="description" content="Get pumped" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <main className='flex w-screen h-screen'>
            {children}
          </ main>
          <label 
            htmlFor="my-drawer-2" 
            className="absolute top-0 left-0 btn btn-ghost drawer-button lg:hidden"
          >
              <FaBars />
            </label>
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <SidebarNav />
        </div>
      </div>
    </ div>
  )
}
