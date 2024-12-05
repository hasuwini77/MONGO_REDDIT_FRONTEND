'use client'

import { useMutation } from '@tanstack/react-query'
import { addComment } from 'actions/create-comment'
import { useState } from 'react'
import { HashLoader } from 'react-spinners'
import { toast } from 'sonner'

interface CommentFormProps {
  postId: string
  onCommentAdded: () => void
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('')

  const { mutate: handleAddComment, isPending } = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Not authenticated')

      return addComment(postId, { content }, token)
    },
    onSuccess: () => {
      setContent('')
      onCommentAdded() // This will trigger a refetch of the post
      toast.success('Comment added successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      toast.error('Comment cannot be empty')
      return
    }
    handleAddComment()
  }

  return (
    <form onSubmit={handleSubmit} className='mt-4'>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Write a comment...'
        className='w-full rounded border p-2'
        rows={3}
      />
      <button
        type='submit'
        disabled={isPending}
        className='mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50'
      >
        {isPending ? (
          <div className='flex items-center gap-2'>
            <HashLoader size={20} color='#ffffff' />
            <span>Adding comment...</span>
          </div>
        ) : (
          'Add Comment'
        )}
      </button>
    </form>
  )
}
