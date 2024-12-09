'use client'

import { Profile } from 'components/Profile'
import { useAuthentication } from 'hooks/useAuthentification'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const MyProfile = () => {
  const { isAuthenticated, isLoading, user, updateUser } = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Profile user={user} onUpdateSuccess={updateUser} />
    </div>
  )
}

export default MyProfile
