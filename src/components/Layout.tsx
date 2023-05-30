import Head from 'next/head'
import React from 'react'

export interface LayoutProps {
  children: JSX.Element
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { children } = props

  return (
    <div data-theme="ACTIVETHEME" className='flex bg-base-100' >
      <Head>
        <title>Pumped App</title>
        <meta name="description" content="Get pumped" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <main className='flex w-screen h-screen'>
          {children}
        </ main>
      </div>
    </ div>
  )
}
