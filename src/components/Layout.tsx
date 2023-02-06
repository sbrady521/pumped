import Head from 'next/head'
import React from 'react'
import { SidebarNav } from './SidebarNav'

export interface LayoutProps {
  children: JSX.Element
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props
  return (
    <div className='flex dark:bg-grey-700 dark:text-grey-400 text-grey-800 ' >
      <Head>
        <title>Pumped App</title>
        <meta name="description" content="Get pumped" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarNav />
      <main className='flex w-screen h-screen'>
        {children}
      </ main>
    </ div>
  )
}