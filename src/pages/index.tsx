import { Button } from "components/Button";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/router";

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <h1 className="text-5xl text-center mb-8 mt-40 font-extrabold tracking-tight sm:text-[5rem]">
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
      <Button
        size='lg'
        className="rounded-full w-80"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};
