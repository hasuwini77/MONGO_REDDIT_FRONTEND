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
import { useAuthentication } from 'hooks/useAuthentification'

export const CreatePostForm = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthentication()

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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div>
        <input
          {...register('title')}
          type='text'
          placeholder='Post title'
          className='input w-full'
          disabled={isSubmitting}
        />
        <FieldError error={errors.title} />
      </div>

      <div>
        <textarea
          {...register('content')}
          placeholder='Write your post content here...'
          className='input min-h-[200px] w-full'
          disabled={isSubmitting}
        />
        <FieldError error={errors.content} />
      </div>

      <div className='flex gap-4'>
        <button
          type='submit'
          className='button-primary relative'
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
          className='button-secondary'
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
