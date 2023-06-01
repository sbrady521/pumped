import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useLocalStorage } from 'usehooks-ts'
import { FaSun, FaMoon } from 'react-icons/fa'

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";
import { Button } from "components/Button";
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <SessionProvider session={session}>
    <div className='flex bg-base-100' >
      <Head>
        <title>Pumped App</title>
        <meta name="description" content="Get pumped" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex w-screen h-screen'>
        <Component {...pageProps} />
        <Button 
          variant='ghost'
          onClick={() => { 
            setTheme(theme === 'light' ? 'dark' : 'light')
          }}
        >
           {theme === 'light' && <FaMoon />} 
           {theme === 'dark' && <FaSun />} 
        </Button>
      </ main>
    </ div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
