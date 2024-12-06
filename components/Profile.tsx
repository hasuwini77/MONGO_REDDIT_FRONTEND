'use client'
import { useEffect, useState } from 'react'

import { IconSelector } from './IconSelector'
import { useAuthentication } from 'hooks/useAuthentification'
import { UserCircle, User, UserCog, UserCircle2, Ghost } from 'lucide-react'
import { client } from 'lib/client'
import axios from 'axios'

export const VALID_ICONS = {
  UserCircle,
  User,
  UserCog,
  UserCircle2,
  Ghost,
} as const

export type IconName = keyof typeof VALID_ICONS

export const Profile = () => {
  const { user, updateUser } = useAuthentication()
  const [username, setUsername] = useState(user?.username || '')
  const [selectedIcon, setSelectedIcon] = useState<IconName>(
    (user?.iconName as IconName) || 'UserCircle',
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      setSelectedIcon((user.iconName as IconName) || 'UserCircle')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await client.put('/profile', {
        username,
        iconName: selectedIcon,
      })

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
    }
  }

  return (
    <div className='mx-auto mt-8 max-w-md rounded-lg bg-white p-6 shadow'>
      <h2 className='mb-6 text-2xl font-bold'>Profile Settings</h2>
      {message && (
        <div className='mb-4 rounded bg-blue-100 p-2 text-blue-700'>
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
          />
        </div>

        <button
          type='submit'
          className='w-full rounded bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700'
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}
