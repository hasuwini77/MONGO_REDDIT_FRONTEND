'use client'

import { useState, useEffect } from 'react'
import { client } from 'lib/client'
import { useRouter } from 'next/navigation'
import { User } from 'types/types'

export function useAuthentication() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('userData')
      return userData ? JSON.parse(userData) : null
    }
    return null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(!!user)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Listen for user update events
  useEffect(() => {
    const handleUserUpdate = (event: CustomEvent<User>) => {
      //adding fake delay
      setTimeout(() => {
        setUser(event.detail)
      }, 700)

      setIsAuthenticated(true)
    }

    window.addEventListener('user-updated', handleUserUpdate as EventListener)
    return () => {
      window.removeEventListener(
        'user-updated',
        handleUserUpdate as EventListener,
      )
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user))
    }
  }, [user])

  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem('refreshToken') // Get stored refresh token

      const response = await client.post('/auth/refresh-token', {
        refreshToken: storedRefreshToken, // Send it in the request
      })

      const newToken = response.data.token
      // Store both tokens
      localStorage.setItem('token', newToken)
      localStorage.setItem('refreshToken', response.data.refreshToken) // Store new refresh token if provided

      // Update authorization header
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
          const storedUserData = localStorage.getItem('userData')
          const parsedStoredData = storedUserData
            ? JSON.parse(storedUserData)
            : null

          const userData = {
            ...response.data,
            iconName:
              parsedStoredData?.iconName ||
              response.data.iconName ||
              'UserCircle',
          }

          setUser(userData)
          localStorage.setItem('userData', JSON.stringify(userData))
          setIsAuthenticated(true)
        }
      } catch (error: any) {
        if (error?.response?.status === 401) {
          const newToken = await refreshToken()
          if (newToken) {
            const retryResponse = await client.get('/auth/me')
            if (retryResponse.data) {
              // Same logic for retry response
              const storedUserData = localStorage.getItem('userData')
              const parsedStoredData = storedUserData
                ? JSON.parse(storedUserData)
                : null

              const userData = {
                ...retryResponse.data,
                iconName:
                  parsedStoredData?.iconName ||
                  retryResponse.data.iconName ||
                  'UserCircle',
              }

              setUser(userData)
              localStorage.setItem('userData', JSON.stringify(userData))
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
      localStorage.removeItem('userData')
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

    return () => {
      client.interceptors.response.eject(interceptor)
    }
  }, [])

  // Initialize user from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData)
        setUser(parsedUserData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('userData')
      }
    }
    checkAuth()
  }, [])

  const login = async (token: string, refreshToken: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)

    client.defaults.headers.common['Authorization'] = `Bearer ${token}`

    await checkAuth()
  }

  const logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    delete client.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
    router.push('/auth/log-in')
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    setIsAuthenticated(true)
    localStorage.setItem('userData', JSON.stringify(updatedUser))
    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent('user-updated', { detail: updatedUser }),
    )
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
