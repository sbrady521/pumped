import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <main>
          <nav>
            <Link href='/'>
              Home
            </Link>
            <Link href='/workouts'>
              Workouts
            </Link>
          </nav>
        {children}
        </main>
      </body>
    </html>
  )
}
