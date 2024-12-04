'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { client } from 'lib/client'

interface User {
  id: string
  username: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Checking stored token:', token) // Debug log

      if (!token) {
        return
      }

      // Set the token in axios headers
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Fetch user data
      const response = await client.get('/auth/me')
      console.log('User data response:', response.data) // Debug log

      if (response.data) {
        setUser(response.data)
        setIsAuthenticated(true)
        console.log('Auth state updated:', {
          user: response.data,
          isAuthenticated: true,
        }) // Debug log
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem('token')
      delete client.defaults.headers.common['Authorization']
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const login = async (token: string) => {
    try {
      console.log('Setting token:', token) // Debug log

      // Store token
      localStorage.setItem('token', token)

      // Set auth header
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Fetch user data
      const response = await client.get('/auth/me')
      console.log('User data after login:', response.data) // Debug log

      setUser(response.data)
      setIsAuthenticated(true)
      console.log('Auth state updated after login') // Debug log
    } catch (error) {
      console.error('Login error:', error)
      localStorage.removeItem('token')
      delete client.defaults.headers.common['Authorization']
      throw error
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    delete client.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
    router.push('/auth/log-in')
  }

  // Check auth on mount
  useEffect(() => {
    console.log('AuthProvider mounted, checking auth...') // Debug log
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
