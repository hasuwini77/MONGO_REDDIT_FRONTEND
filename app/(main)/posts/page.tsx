'use client'

import { useMutation } from '@tanstack/react-query'
import { getPosts } from 'actions/get-posts'
import { handleServerActionError } from 'lib/error-handling'
import Link from 'next/link'
import { useEffect } from 'react'
import { Post } from 'types/types'

const MyPosts = () => {
  const {
    mutate,
    data: posts,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      const result = await getPosts()
      return handleServerActionError(result) as Post[]
    },
    onError: (error) => {
      console.error('Error fetching posts:', error)
    },
    onSuccess: (data) => {},
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  if (isPending) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-lg'>Loading posts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-red-500'>
          Error loading posts:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-lg'>No posts found</div>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-7xl p-4'>
      <h1 className='mb-8 text-center text-4xl font-bold text-blue-800'>
        All Posts
      </h1>
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
                Posted by{' '}
                <span className='font-medium text-gray-800'>
                  {post.author.username}
                </span>{' '}
                • {new Date(post.createdAt).toLocaleDateString()}
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

export default MyPosts
