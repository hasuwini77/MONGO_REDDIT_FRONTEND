'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthentication } from 'hooks/useAuthentification'
import { CreatePostForm } from './form'

export function CreatePostAuthWrapper() {
  const { isAuthenticated, isLoading } = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/log-in')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <CreatePostForm />
}
