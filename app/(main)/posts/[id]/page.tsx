'use client'

import { useMutation } from '@tanstack/react-query'
import { deletePost } from 'actions/delete-post'
import { getPost } from 'actions/get-post'
import { updatePost } from 'actions/update-post' // Added missing import
import { CommentForm } from 'components/CommentForm'
import { useAuthentication } from 'hooks/useAuthentification'
import { handleServerActionError } from 'lib/error-handling'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

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

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')

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
      router.push('/') // Redirect to home page after deletion
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  // Add update post mutation
  const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Not authenticated')

      return updatePost(postId, token, {
        title: editedTitle,
        content: editedContent,
      })
    },
    onSuccess: () => {
      setIsEditing(false)
      mutate() // Refetch the post to get updated data
      toast.success('Post updated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  // Initialize edit form when post data is available
  useEffect(() => {
    if (post) {
      setEditedTitle(post.title)
      setEditedContent(post.content)
    }
  }, [post])

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
        {isEditing ? (
          <div className='space-y-4'>
            <input
              type='text'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className='w-full rounded border p-2'
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className='min-h-[200px] w-full rounded border p-2'
            />
            <div className='space-x-2'>
              <button
                onClick={() => {
                  Swal.fire({
                    title: 'Confirm update',
                    text: 'Are you sure you want to update this post?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, update it!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleUpdate()
                    }
                  })
                }}
                disabled={isUpdating}
                className='rounded bg-blue-500 px-4 py-2 text-white'
              >
                {isUpdating ? (
                  <div className='flex items-center gap-2'>
                    <HashLoader size={20} color='#ffffff' />
                    <span>Updating...</span>
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className='rounded bg-gray-500 px-4 py-2 text-white'
                disabled={isUpdating}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold'>{post.title}</h1>
            <div className='mt-2 text-gray-500'>
              Posted by {post.author.username}
            </div>
            <div className='prose mt-6'>{post.content}</div>

            {/* Action buttons - only shown if user is the author */}
            {user?.id === post.author._id && (
              <div className='space-x-2 py-2'>
                <button
                  onClick={() => setIsEditing(true)}
                  className='rounded bg-blue-500 px-4 py-2 text-white'
                >
                  Edit Post
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete()
                        Swal.fire(
                          'Deleted!',
                          'Your post has been deleted.',
                          'success',
                        )
                      }
                    })
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
          </>
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
          {user && (
            <CommentForm postId={postId} onCommentAdded={() => mutate()} />
          )}
        </div>
      </article>
    </div>
  )
}

export default PostPage
