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
      <Header />
      <Providers>
        <AuthProvider>{children}</AuthProvider>
      </Providers>
    </>
  )
}
