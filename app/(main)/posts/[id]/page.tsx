'use client'

import { useMutation } from '@tanstack/react-query'
import { deletePost } from 'actions/delete-post'
import { getPost } from 'actions/get-post'
import { useAuthentication } from 'hooks/useAuthentification'
import { handleServerActionError } from 'lib/error-handling'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import HashLoader from 'react-spinners/HashLoader'
import { toast } from 'sonner'

interface Post {
  _id: string
  title: string
  content: string
  author: {
    _id: string | undefined
    username: string
  }
  comments: Array<{
    content: string
    author: {
      _id: string
      username: string
    }
  }>
  createdAt: string
}

const PostPage = () => {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuthentication()
  const postId = params.id as string

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
      return handleServerActionError(result) as Post
    },
    onError: (error) => {
      console.error('Error fetching post:', error)
    },
    onSuccess: (data) => {
      console.log('Successfully fetched post:', data)
    },
  })

  // Delete post mutation
  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Not authenticated')

      await new Promise((resolve) => setTimeout(resolve, 1000)) // Optional delay
      return deletePost(postId, token)
    },
    onSuccess: () => {
      toast.success('Post deleted successfully')
      router.push('/') // Redirect to home page after deletion
    },
    onError: (error: Error) => {
      toast.error(error.message)
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
        <HashLoader size={30} color='#3B82F6' />
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

        {/* Delete button - only shown if user is the author */}
        {user?.id === post.author._id && (
          <div className='py-2'>
            <button
              onClick={() => {
                if (
                  window.confirm('Are you sure you want to delete this post?')
                ) {
                  handleDelete()
                }
              }}
              className='button-danger rounded-md'
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className='flex items-center gap-2'>
                  <HashLoader size={20} color='#ffffff' />
                  <span>Deleting...</span>
                </div>
              ) : (
                'Delete Post'
              )}
            </button>
          </div>
        )}

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
