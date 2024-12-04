'use client'
import MyPosts from 'app/(main)/posts/page'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Home() {
  const searchParams = useSearchParams()

  useEffect(() => {
    let toastId: string | number | undefined

    if (searchParams.get('login') === 'success') {
      toastId = toast.success('Successfully logged in!', {
        position: 'top-right',
      })
    }
    return () => {
      if (toastId) {
        toast.dismiss(toastId)
      }
    }
  }, [searchParams])

  return (
    <div className='main'>
      <h1> Home Page</h1>
      <div>
        <MyPosts />
      </div>
    </div>
  )
}
