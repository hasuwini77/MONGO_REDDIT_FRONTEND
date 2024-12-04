import { Header } from 'components/header'
import { Providers } from './providers'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Providers>
        <Header />
        {children}
      </Providers>
    </>
  )
}
