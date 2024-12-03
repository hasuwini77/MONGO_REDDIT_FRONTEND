import Link from 'next/link'

export const Header = () => {
  return (
    <header className='flex h-16 w-full items-center justify-between gap-4 px-4 py-2 md:px-20'>
      <Link href='/' className='text-2xl font-bold'>
        reddit
      </Link>
      <Link href='/auth/log-in' className='button-primary'>
        Log in
      </Link>
    </header>
  )
}
