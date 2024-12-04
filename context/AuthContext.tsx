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
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await client.get('/auth/me')
      if (response.data) {
        setUser(response.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const logout = async () => {
    try {
      await client.post('/auth/logout')
      setUser(null)
      setIsAuthenticated(false)
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
