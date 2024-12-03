import { Header } from 'components/header'
import { Providers } from './providers'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <Providers>{children}</Providers>
    </>
  )
}
