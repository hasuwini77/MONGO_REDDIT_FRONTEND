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

// Create a variable outside the hook to track refresh state
let isRefreshingToken = false
let refreshSubscribers: ((token: string) => void)[] = []

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

export function useAuthentication() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('userData')
        return userData ? JSON.parse(userData) : null
      } catch (error) {
        console.error('Error parsing user data:', error)
        return null
      }
    }
    return null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(!!user)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const handleUserUpdate = (event: CustomEvent<User>) => {
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

  useEffect(() => {
    checkAuth()
  }, []) // Run on component mount

  const refreshToken = async () => {
    try {
      if (isRefreshingToken) {
        // Return a promise that resolves when the token is refreshed
        return new Promise((resolve) => {
          refreshSubscribers.push(resolve)
        })
      }

      isRefreshingToken = true
      const storedRefreshToken = localStorage.getItem('refreshToken')

      if (!storedRefreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await client.post('/auth/refresh-token', {
        refreshToken: storedRefreshToken,
      })

      const newToken = response.data.token
      localStorage.setItem('token', newToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)

      client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      onRefreshed(newToken)
      return newToken
    } catch (error) {
      console.error('Token refresh failed:', error)
      await logout()
      return null
    } finally {
      isRefreshingToken = false
    }
  }

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 < Date.now()
    } catch {
      return true
    }
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }

      if (isTokenExpired(token)) {
        const newToken = await refreshToken()
        if (!newToken) {
          await logout()
          return
        }
      }

      client.defaults.headers.common['Authorization'] = `Bearer ${token}`

      try {
        const response = await client.get('/auth/me')
        if (response.data) {
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
            return checkAuth() // Retry the auth check with new token
          }
        }
        throw error
      }
    } catch (error) {
      console.error('Auth check error:', error)
      await logout()
    } finally {
      setIsLoading(false)
    }
  }

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
            // If no new token, handle logout
            await logout()
            return Promise.reject(error)
          } catch (refreshError) {
            await logout()
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

  const login = async ({ token, refreshToken, user }: LoginParams) => {
    if (!token || !refreshToken) {
      console.error('Missing token or refresh token')
      return
    }

    try {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`

      if (user) {
        const userData: User = {
          id: user.id,
          username: user.username,
          iconName: user.iconName || 'UserCircle',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        await checkAuth()
      }
    } catch (error) {
      console.error('Login error:', error)
      await logout()
    }
  }

  useEffect(() => {
    // Set up default authorization header if token exists
    const token = localStorage.getItem('token')
    if (token) {
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }, [])

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userData')
      delete client.defaults.headers.common['Authorization']
      setUser(null)
      setIsAuthenticated(false)
      router.push('/auth/log-in')
    } catch (error) {
      console.error('Logout error:', error)
    }
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
