import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  
  useEffect(() => {
    themeChange(false)
  }, [])
  
  return (
    <SessionProvider session={session}>
    <div data-theme="ACTIVETHEME" className='flex bg-base-100' >
      <Head>
        <title>Pumped App</title>
        <meta name="description" content="Get pumped" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex w-screen h-screen'>
        <Component {...pageProps} />
      </ main>
    </ div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
