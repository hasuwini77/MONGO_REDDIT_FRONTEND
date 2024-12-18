'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { HashLoader } from 'react-spinners'
import { createPost } from 'actions/create-post'
import { FieldError } from 'components/field-error'
import { toastServerError } from 'lib/error-handling'
import { createPostSchema, CreatePostValues } from 'lib/schemas'

export const CreatePostForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
  })

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (values: CreatePostValues) => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication required')
      }

      // Add artificial delay for the loader
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await createPost(values, token)
      if ('error' in response) {
        throw new Error(response.error)
      }
      return response
    },
    onSuccess: (response) => {
      if ('data' in response) {
        router.push(`/posts/${response.data._id}`)
      }
    },
    onError: toastServerError,
  })

  const onSubmit = (values: CreatePostValues) => {
    mutate(values)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto flex max-w-xl flex-col gap-6 p-4'
    >
      {/* Title Input */}
      <div>
        <input
          {...register('title')}
          type='text'
          placeholder='Post title'
          className='input w-full rounded-lg border px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isSubmitting}
        />
        <FieldError error={errors.title} />
      </div>

      {/* Content Textarea */}
      <div>
        <textarea
          {...register('content')}
          placeholder='Write your post content here...'
          className='input min-h-[200px] w-full rounded-lg border px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          disabled={isSubmitting}
        />
        <FieldError error={errors.content} />
      </div>

      {/* Action Buttons */}
      <div className='flex flex-col gap-4 sm:flex-row'>
        <button
          type='submit'
          className='button-primary relative w-full rounded-lg bg-green-500 px-6 py-3 text-lg text-white transition duration-300 hover:bg-green-700 focus:outline-none sm:w-auto'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className='flex items-center justify-center gap-2'>
              <HashLoader size={20} color='#ffffff' />
              <span>Creating post...</span>
            </div>
          ) : (
            'Create Post'
          )}
        </button>
        <button
          type='button'
          onClick={() => router.back()}
          className='button-secondary w-full rounded-lg bg-red-500 px-6 py-3 text-lg text-white transition duration-300 hover:bg-red-700 focus:outline-none sm:w-auto'
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
