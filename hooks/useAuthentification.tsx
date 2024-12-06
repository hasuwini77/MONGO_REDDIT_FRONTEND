'use client'

import { useState, useEffect } from 'react'
import { client } from 'lib/client'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  username: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useAuthentication() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        await delay(1000)
        setIsLoading(false)
        return
      }

      client.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await delay(1000) // Add 1 second delay
      const response = await client.get('/auth/me')

      if (response.data) {
        setUser(response.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('token')
      delete client.defaults.headers.common['Authorization']
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const login = async (token: string) => {
    localStorage.setItem('token', token)
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await checkAuth()
  }

  const logout = async () => {
    localStorage.removeItem('token')
    delete client.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
    router.push('/auth/log-in')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}
