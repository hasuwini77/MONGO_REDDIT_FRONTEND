'use client'

import { useState, useEffect } from 'react'
import { client } from 'lib/client'
import { useRouter } from 'next/navigation'
import { User } from 'types/types'

export function useAuthentication() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  const refreshToken = async () => {
    try {
      const response = await client.post('/auth/refresh-token')
      const newToken = response.data.token
      localStorage.setItem('token', newToken)
      client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      return newToken
    } catch (error) {
      console.error('Token refresh failed:', error)
      await logout()
      return null
    }
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }

      client.defaults.headers.common['Authorization'] = `Bearer ${token}`

      try {
        const response = await client.get('/auth/me')
        if (response.data) {
          setUser(response.data)
          setIsAuthenticated(true)
        }
      } catch (error: any) {
        // If we get a 401 error, try to refresh the token
        if (error?.response?.status === 401) {
          const newToken = await refreshToken()
          if (newToken) {
            // Retry the original request
            const retryResponse = await client.get('/auth/me')
            if (retryResponse.data) {
              setUser(retryResponse.data)
              setIsAuthenticated(true)
            }
          }
        } else {
          throw error
        }
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

  // Set up an axios interceptor to handle token refresh
  useEffect(() => {
    const interceptor = client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // If we get a 401 error and haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const newToken = await refreshToken()
            if (newToken) {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`
              return client(originalRequest)
            }
          } catch (refreshError) {
            return Promise.reject(refreshError)
          }
        }
        return Promise.reject(error)
      },
    )

    // Clean up interceptor on unmount
    return () => {
      client.interceptors.response.eject(interceptor)
    }
  }, [])

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
    updateUser,
  }
}
