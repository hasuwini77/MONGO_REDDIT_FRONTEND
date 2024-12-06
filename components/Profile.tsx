'use client'

import { useState, useEffect } from 'react'
import { IconSelector } from './IconSelector'
import { useAuthentication } from 'hooks/useAuthentification'
import { client } from 'lib/client'
import axios from 'axios'

import { Loader2 } from 'lucide-react' // Import loader icon
import { IconName, IconComponent } from './Icons'

export const Profile = () => {
  const { user, updateUser } = useAuthentication()
  const [username, setUsername] = useState(user?.username || '')
  const [selectedIcon, setSelectedIcon] = useState<IconName>(
    (user?.iconName as IconName) || 'UserCircle',
  )
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setSelectedIcon((user.iconName as IconName) || 'UserCircle')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const { data } = await client.put('/profile', {
        username,
        iconName: selectedIcon,
      })

      // Artificial delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 700))

      setMessage('Profile updated successfully')
      updateUser({
        ...user!,
        username,
        iconName: selectedIcon,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Update failed')
      } else {
        setMessage('An error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow'>
      <h2 className='mb-6 text-2xl font-bold'>Profile Settings</h2>

      {message && (
        <div
          className={`mb-4 rounded p-2 ${
            message === 'Profile updated successfully'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            Select Your Icon
          </label>
          <IconSelector selected={selectedIcon} onChange={setSelectedIcon} />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            Username
          </label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full rounded border p-2 focus:border-purple-500 focus:ring-purple-500'
            disabled={isLoading}
          />
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className={`relative w-full rounded px-4 py-2 text-white transition-colors ${
            isLoading
              ? 'cursor-not-allowed bg-purple-400'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isLoading ? (
            <span className='flex items-center justify-center'>
              <Loader2 className='mr-2 h-5 w-5 animate-spin' />
              Updating...
            </span>
          ) : (
            'Update Profile'
          )}
        </button>
      </form>

      {/* Preview section */}
      <div className='mt-6 border-t pt-6'>
        <h3 className='mb-2 text-sm font-medium text-gray-700'>Preview</h3>
        <div className='flex items-center gap-2 rounded bg-gray-50 p-3'>
          <IconComponent name={selectedIcon} className='h-6 w-6' />
          <span className='font-medium'>{username}</span>
        </div>
      </div>
    </div>
  )
}
