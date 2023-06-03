import { SignIn } from "components/SignIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "server/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/exercises')



  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SignIn session={session} />
    </div>
  );
}
