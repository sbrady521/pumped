import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";
import { useSyncExercises } from "stores/exercises/hooks";
import { useTheme } from "hooks/useTheme";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  useSyncExercises()
  useTheme()

  return (
    <SessionProvider session={session}>
      <div className='flex bg-base-100' >
        <Head>
          <title>Pumped App</title>
          <meta name="description" content="Get pumped" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className='flex w-screen h-screen px-4'>
          <Component {...pageProps} />
        </ main>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
