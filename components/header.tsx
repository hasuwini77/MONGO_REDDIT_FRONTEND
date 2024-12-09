'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthentication } from 'hooks/useAuthentification'
import { IconComponent } from './Icons'
import { useEffect, useState } from 'react'

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuthentication()
  const router = useRouter()
  // Add loading state to handle initial hydration
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  // Only render the authenticated content on the client side
  const renderAuthContent = () => {
    if (!isClient) return null

    return isAuthenticated && user ? (
      <div className='flex items-center gap-4 md:gap-6'>
        <Link href='/auth/profile'>
          <div className='flex items-center gap-2'>
            <IconComponent
              name={user.iconName || 'UserCircle'}
              className='h-8 w-8 text-white md:h-10 md:w-10'
            />
            <span className='text-sm font-semibold text-white md:text-lg'>
              {user.username}
            </span>
          </div>
        </Link>
        <div className='flex flex-col gap-2 md:flex-row'>
          <button
            onClick={() => router.push('/create-post')}
            className='button-primary rounded-lg bg-green-500 px-5 py-1 text-sm text-white transition duration-300 hover:bg-green-700 md:px-8 md:py-2 md:text-base'
          >
            Create Post
          </button>
          <button
            onClick={handleLogout}
            className='button-primary rounded-lg bg-red-500 px-5 py-1 text-sm text-white transition duration-300 hover:bg-red-700 md:px-8 md:py-2 md:text-base'
          >
            Logout
          </button>
        </div>
      </div>
    ) : (
      <Link
        href='/auth/log-in'
        className='button-primary rounded-lg bg-blue-500 px-6 py-2 text-white transition duration-300 hover:bg-blue-700'
      >
        Login
      </Link>
    )
  }

  return (
    <header className='flex h-20 w-full items-center justify-between gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-4 shadow-lg md:px-20'>
      <Link
        href='/'
        className='text-3xl font-bold text-white transition hover:text-yellow-400 md:text-4xl'
      >
        reddit
      </Link>

      <div className='flex items-center gap-4 md:gap-6'>
        {renderAuthContent()}
      </div>
    </header>
  )
}
