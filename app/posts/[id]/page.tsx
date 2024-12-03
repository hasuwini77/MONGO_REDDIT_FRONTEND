'use client'

import { useMutation } from '@tanstack/react-query'
import { getPost } from 'actions/get-post'
import { handleServerActionError } from 'lib/error-handling'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

interface Post {
  _id: string
  title: string
  content: string
  author: {
    username: string
  }
  comments: Array<{
    content: string
    author: {
      username: string
    }
  }>
  createdAt: string
}

const PostPage = () => {
  const params = useParams()
  const postId = params.id as string

  // Add validation for postId
  if (!postId) {
    return <div>Invalid post ID</div>
  }

  const {
    mutate,
    data: post,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      if (!postId) throw new Error('Post ID is required')
      console.log('Fetching post with ID:', postId)
      const result = await getPost(postId)
      return handleServerActionError(result) as Post // Add type assertion here
    },
    onError: (error) => {
      console.error('Error fetching post:', error)
    },
    onSuccess: (data) => {
      console.log('Successfully fetched post:', data)
    },
  })

  useEffect(() => {
    if (postId) {
      mutate()
    }
  }, [mutate, postId])

  if (isPending) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-lg'>Loading post...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-red-500'>
          Error loading post:{' '}
          {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-lg'>Post not found</div>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <article>
        <h1 className='text-3xl font-bold'>{post.title}</h1>
        <div className='mt-2 text-gray-500'>
          Posted by {post.author.username}
        </div>
        <div className='prose mt-6'>{post.content}</div>

        {/* Comments section */}
        <div className='mt-8'>
          <h2 className='text-2xl font-bold'>Comments</h2>
          <div className='mt-4 space-y-4'>
            {post.comments.map((comment, index) => (
              <div key={index} className='rounded border p-4'>
                <p>{comment.content}</p>
                <div className='mt-2 text-sm text-gray-500'>
                  By {comment.author.username}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

export default PostPage
