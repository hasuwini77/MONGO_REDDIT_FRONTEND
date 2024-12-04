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
    onSuccess: (data) => {
      console.log('Successfully fetched posts:', data) // Success log
    },
  })

  useEffect(() => {
    console.log('Effect triggered') // Debug log
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
    <div className='mx-auto max-w-4xl p-4'>
      <h1 className='mb-6 text-3xl font-bold'>All Posts</h1>
      <div className='space-y-6'>
        {posts.map((post) => (
          <Link
            href={`/posts/${post._id}`}
            key={post._id}
            className='block rounded-lg border p-4 transition hover:bg-gray-50'
          >
            <article>
              <h2 className='text-xl font-semibold'>{post.title}</h2>
              <div className='mt-2 text-gray-600'>
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </div>
              <div className='mt-2 text-sm text-gray-500'>
                Posted by {post.author.username} •{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
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
