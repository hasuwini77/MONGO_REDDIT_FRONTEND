import Link from 'next/link'
import { SignUpForm } from './form'

export default function SignUpPage() {
  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-indigo-600 to-purple-800 px-4 py-6 text-white sm:px-6 lg:px-8'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-lg'>
        <h1 className='mb-6 text-center text-3xl font-semibold text-gray-800'>
          Create an account
        </h1>

        {/* Sign Up Form */}
        <SignUpForm />

        <div className='mt-4 text-center'>
          <Link
            href='/auth/log-in'
            className='text-sm text-indigo-600 hover:underline'
          >
            Already have an account? Log in
          </Link>
        </div>

        {/* Home Button */}
        <div className='mt-6 text-center'>
          <Link href='/' className='button-secondary'>
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}
