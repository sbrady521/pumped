import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-5xl text-center mb-8 font-extrabold tracking-tight sm:text-[5rem]">
        Pumped
      </h1>
      <div className="flex flex-col items-center gap-2">
        <AuthShowcase />
      </div>
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const { push } = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  if (sessionData) push('/exercises')


  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-black/70 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
      </button>
    </div>
  );
};
