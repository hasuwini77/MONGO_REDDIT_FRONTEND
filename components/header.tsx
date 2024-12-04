'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserCircle } from 'lucide-react'
import { useAuthentication } from 'hooks/useAuthentification'

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthentication()
  const router = useRouter()

  // Add debug log
  console.log('Header render:', { isAuthenticated, user })

  return (
    <header className='flex h-16 w-full items-center justify-between gap-4 px-4 py-2 md:px-20'>
      <Link href='/' className='text-2xl font-bold'>
        reddit
      </Link>

      <div className='flex items-center gap-4'>
        {isAuthenticated ? (
          <>
            <button
              onClick={() => router.push('/create-post')}
              className='button-primary'
            >
              Create Post
            </button>

            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2'>
                <UserCircle className='h-8 w-8' />
                <span className='text-sm font-medium'>{user?.username}</span>
              </div>

              <button onClick={() => logout()} className='button-secondary'>
                Log out
              </button>
            </div>
          </>
        ) : (
          <Link href='/auth/log-in' className='button-primary'>
            Log in
          </Link>
        )}
      </div>
    </header>
  )
}
