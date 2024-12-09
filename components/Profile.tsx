'use client'
import { useState, useEffect } from 'react'
import { IconSelector } from './IconSelector'
import { useAuthentication } from 'hooks/useAuthentification'
import { updateProfile } from 'actions/update-profile'
import { Loader2 } from 'lucide-react'
import type { IconName } from './Icons'
import { User } from 'types/types'
import { useRouter } from 'next/navigation'

interface ProfileProps {
  user: User
  onUpdateSuccess: (updatedUser: User) => void
}

export const Profile = ({ user, onUpdateSuccess }: ProfileProps) => {
  const [username, setUsername] = useState(user.username)
  const [selectedIcon, setSelectedIcon] = useState<IconName>('UserCircle')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { updateUser } = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setSelectedIcon(user.iconName || 'UserCircle')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    const token = localStorage.getItem('token')
    if (!token) {
      setMessage('Authentication required')
      setIsLoading(false)
      return
    }

    const { data, error } = await updateProfile(token, {
      username,
      iconName: selectedIcon,
    })

    if (error) {
      setMessage(error)
      setIsLoading(false)
    } else if (data) {
      // Use the updateUser function from the hook
      updateUser(data)

      // Add a delay before refreshing
      setTimeout(() => {
        router.refresh()
        setMessage('Profile updated successfully! Refreshing...')
        setIsLoading(false)
      }, 700)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto max-w-2xl px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>Update Profile</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'
          >
            Username
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Select Icon
          </label>
          <IconSelector selected={selectedIcon} onChange={setSelectedIcon} />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='flex w-full items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400'
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
              Updating...
            </>
          ) : (
            'Update Profile'
          )}
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes('Error') || message.includes('failed')
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
