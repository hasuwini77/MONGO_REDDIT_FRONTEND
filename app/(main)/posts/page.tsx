'use client'

import { useMutation } from '@tanstack/react-query'
import { getPosts } from 'actions/get-posts'
import { client } from 'lib/client'
import HashLoader from 'react-spinners/HashLoader'
import { handleServerActionError } from 'lib/error-handling'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Post } from 'types/types'
import { useAuthentication } from 'hooks/useAuthentification'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AllPosts = () => {
  const [localPosts, setLocalPosts] = useState<Post[]>([])
  const { isAuthenticated } = useAuthentication()
  const router = useRouter()

  const {
    mutate: fetchPosts,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ['posts'],
    mutationFn: async () => {
      const result = await getPosts()
      const posts = handleServerActionError(result) as Post[]
      const formattedPosts = posts.map((post) => ({
        ...post,
        upvotes: Number(post.upvotes) || 0,
        downvotes: Number(post.downvotes) || 0,
      }))

      // adding fake delay for my loader
      await new Promise((resolve) => setTimeout(resolve, 700))
      setLocalPosts(formattedPosts)
      return formattedPosts
    },
  })

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const voteMutation = useMutation({
    mutationFn: async ({
      postId,
      voteType,
    }: {
      postId: string
      voteType: 'up' | 'down'
    }) => {
      try {
        const voteTypeForBackend = voteType === 'up' ? 'upvote' : 'downvote'
        const response = await client.post(`/posts/${postId}/vote`, {
          voteType: voteTypeForBackend,
        })
        const data = response.data
        return {
          ...data,
          upvotes: Number(data.upvotes) || 0,
          downvotes: Number(data.downvotes) || 0,
        }
      } catch (error: any) {
        if (error.response?.status === 401) {
          // Token expired or invalid
          toast.error('Please log in to vote!')
          router.push('/login')
        }
        throw error
      }
    },
    onMutate: async ({ postId, voteType }) => {
      if (!localPosts) return { previousPosts: null }

      const previousPosts = [...localPosts]
      const updatedPosts = previousPosts.map((post) => {
        if (post._id === postId) {
          let { upvotes, downvotes, userVote } = post
          upvotes = Number(upvotes) || 0
          downvotes = Number(downvotes) || 0

          if (userVote === voteType) {
            userVote = ''
            if (voteType === 'up') upvotes--
            else downvotes--
          } else {
            if (voteType === 'up') {
              upvotes++
              if (userVote === 'down') downvotes--
            } else {
              downvotes++
              if (userVote === 'up') upvotes--
            }
            userVote = voteType
          }

          return { ...post, upvotes, downvotes, userVote }
        }
        return post
      })

      setLocalPosts(updatedPosts)
      return { previousPosts }
    },
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        setLocalPosts(context.previousPosts)
      }
    },
    onSuccess: (updatedPost, { postId }) => {
      if (!localPosts) return

      const updatedPosts = localPosts.map((post) =>
        post._id === postId ? { ...post, ...updatedPost } : post,
      )
      setLocalPosts(updatedPosts)
    },
  })

  const handleVote = (
    e: React.MouseEvent,
    postId: string,
    voteType: 'up' | 'down',
  ) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      toast.error('Please log in to vote!')
      router.push('/auth/log-in')
      return
    }

    voteMutation.mutate({ postId, voteType })
  }

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <HashLoader size={50} color='#3B82F6' />
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

  if (!localPosts || localPosts.length === 0) {
    return (
      <div className='flex items-center justify-center p-4'>
        <div className='text-lg'>No posts found</div>
      </div>
    )
  }

  const sortedPosts = [...localPosts].sort((a, b) => {
    const scoreA = (Number(a.upvotes) || 0) - (Number(a.downvotes) || 0)
    const scoreB = (Number(b.upvotes) || 0) - (Number(b.downvotes) || 0)
    if (scoreB !== scoreA) {
      return scoreB - scoreA
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className='mx-auto max-w-7xl p-4'>
      <h1 className='mb-8 text-center text-4xl font-bold text-blue-800'>
        All Posts
      </h1>
      <div className='space-y-6'>
        {sortedPosts.map((post) => (
          <Link
            href={`/posts/${post._id}`}
            key={post._id}
            className='block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 ease-in-out hover:shadow-[0_0_10px_5px_rgba(75,0,130,0.2),0_0_10px_10px_rgba(128,0,128,0.2)]'
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('button')) {
                e.preventDefault()
              }
            }}
          >
            <article>
              <h2 className='text-2xl font-semibold text-gray-900'>
                {post.title}
              </h2>

              <div className='mt-2 text-gray-700'>
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </div>

              <div className='mt-4 text-sm text-gray-600'>
                Posted by{' '}
                <span className='font-medium text-gray-800'>
                  {post.author.username}
                </span>{' '}
                • {new Date(post.createdAt).toLocaleDateString()}
              </div>

              <div className='mt-2 flex items-center gap-4 text-sm text-gray-500'>
                <div className='flex items-center gap-1'>
                  {post.comments.length} comment
                  {post.comments.length !== 1 ? 's' : ''}
                </div>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={(e) => handleVote(e, post._id, 'up')}
                    className={`flex items-center ${
                      post.userVote === 'up'
                        ? 'text-orange-500'
                        : 'text-gray-400'
                    } hover:text-orange-500`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M12 3l8 8H4z' />
                      <line x1='12' y1='3' x2='12' y2='17' />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleVote(e, post._id, 'down')}
                    className={`flex items-center ${
                      post.userVote === 'down'
                        ? 'text-blue-500'
                        : 'text-gray-400'
                    } hover:text-blue-500`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M12 21l-8-8h16z' />
                      <line x1='12' y1='21' x2='12' y2='7' />
                    </svg>
                  </button>
                  <span className='ml-2 min-w-[20px] text-center text-sm font-medium'>
                    {String(
                      (Number(post.upvotes) || 0) -
                        (Number(post.downvotes) || 0),
                    )}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllPosts
