'use client'

import { useMutation } from '@tanstack/react-query'
import { getUserPosts } from 'actions/get-user-post'
import { handleServerActionError } from 'lib/error-handling'
import Link from 'next/link'
import { useEffect } from 'react'
import { Post } from 'types/types'
import { useAuthentication } from 'hooks/useAuthentification'
import { useRouter } from 'next/navigation'

const UserPosts = () => {
  const { isAuthenticated, user } = useAuthentication()
  const router = useRouter()

  const {
    mutate,
    data: posts,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token available')
      }
      const result = await getUserPosts(token)
      return handleServerActionError(result) as Post[]
    },
    onError: (error) => {
      console.error('Error fetching user posts:', error)
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/log-in')
      return
    }
    mutate()
  }, [isAuthenticated, mutate, router])

  if (!isAuthenticated || !user) {
    return null
  }

  if (isPending) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-lg'>Loading your posts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-red-500'>
          Error loading your posts:
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className='rounded-lg bg-white py-8 text-center shadow'>
        <p className='text-gray-500'>You haven&apos;t created any posts yet.</p>
        <button
          onClick={() => router.push('/create-post')}
          className='mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
        >
          Create Your First Post
        </button>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-7xl p-4'>
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900'>My Posts</h1>
        <button
          onClick={() => router.push('/create-post')}
          className='rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
        >
          Create New Post
        </button>
      </div>

      <div className='space-y-6'>
        {posts.map((post) => (
          <Link
            href={`/posts/${post._id}`}
            key={post._id}
            className='block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-[0_0_10px_5px_rgba(75,0,130,0.2),0_0_10px_10px_rgba(128,0,128,0.2)]'
          >
            <article>
              {/* Title */}
              <h2 className='text-2xl font-semibold text-gray-900'>
                {post.title}
              </h2>

              {/* Content Preview */}
              <div className='mt-2 text-gray-700'>
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </div>

              {/* Author & Date */}
              <div className='mt-4 text-sm text-gray-600'>
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </div>

              {/* Comments */}
              <div className='mt-2 text-sm text-gray-500'>
                {post.comments.length} comment
                {post.comments.length !== 1 ? 's' : ''}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserPosts
