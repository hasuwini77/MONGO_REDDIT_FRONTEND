// hooks/useAuth.tsx or context/AuthContext.tsx
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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Checking token:', token) // Debug log

      if (!token) {
        setIsLoading(false)
        return
      }

      client.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const response = await client.get('/auth/me')
      console.log('Auth check response:', response.data) // Debug log

      if (response.data) {
        setUser(response.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('CheckAuth error:', error)
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem('token')
      delete client.defaults.headers.common['Authorization']
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (token: string) => {
    try {
      console.log('Login called with token:', token) // Debug log

      // Store token
      localStorage.setItem('token', token)

      // Set auth header
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Get user data
      const response = await client.get('/auth/me')
      console.log('Login user data:', response.data) // Debug log

      setUser(response.data)
      setIsAuthenticated(true)
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

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
