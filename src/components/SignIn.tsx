'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

interface SignInProps {
  session: Session | null
}

export const SignIn = ({session}: SignInProps) => (
  <button
    className="rounded-full bg-black/70 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black"
    onClick={session ? () => void signOut() : () => void signIn()}
  >
  </button>
)

