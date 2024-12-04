import { Header } from 'components/header'
import { Providers } from './providers'
import { AuthProvider } from 'context/AuthContext'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Providers>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </Providers>
    </>
  )
}
