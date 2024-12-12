'use client'

import { useState, useEffect } from 'react'
import { client } from 'lib/client'
import { useRouter } from 'next/navigation'
import { User } from 'types/types'

type LoginParams = {
  token: string
  refreshToken: string
  user?: {
    id: string
    username: string
    iconName: string
  }
}

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
      const storedRefreshToken = localStorage.getItem('refreshToken')

      // Add validation to prevent requests with no refresh token
      if (!storedRefreshToken) {
        throw new Error('No refresh token available')
      }

      // Add flag to track refresh attempts
      const isRefreshing = localStorage.getItem('isRefreshing')
      if (isRefreshing === 'true') {
        throw new Error('Token refresh already in progress')
      }

      try {
        localStorage.setItem('isRefreshing', 'true')

        const response = await client.post('/auth/refresh-token', {
          refreshToken: storedRefreshToken,
        })

        const newToken = response.data.token
        localStorage.setItem('token', newToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)

        client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        return newToken
      } finally {
        // Always clear the refreshing flag
        localStorage.removeItem('isRefreshing')
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      // Clear all auth-related storage
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('isRefreshing')
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
            iconName: response.data.iconName || 'UserCircle',
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
              const storedUserData = localStorage.getItem('userData')
              const parsedStoredData = storedUserData
                ? JSON.parse(storedUserData)
                : null

              const userData = {
                ...retryResponse.data,
                iconName: retryResponse.data.iconName || 'UserCircle',
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

  const login = async ({ token, refreshToken, user }: LoginParams) => {
    // Store tokens and user data
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user))
    }

    // Set authorization header
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // Check authentication
    await checkAuth()
  }

  const logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
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
