'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { HashLoader } from 'react-spinners'
import { logIn } from 'actions/log-in'
import { logInSchema, LogInValues } from 'lib/schemas'
import { FieldError } from 'components/field-error'
import { useAuthentication } from 'hooks/useAuthentification'

type LoginResponse = {
  token: string
  refreshToken: string
  user: {
    id: string
    username: string
    iconName: string
  }
}

export const LogInForm = () => {
  const { login } = useAuthentication()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
  })

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (values: LogInValues) => {
      // Add artificial delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const response = await logIn(values)

      if ('error' in response) {
        throw new Error(response.error)
      }

      return response as LoginResponse
    },
    onSuccess: async (response) => {
      if ('token' in response) {
        // Pass both tokens and user data to the login function
        await login({
          token: response.token,
          refreshToken: response.refreshToken,
          user: response.user,
        })
        toast.success('Logged in successfully')
        router.push('/')
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full max-w-md flex-col gap-4'
    >
      <input
        {...register('username')}
        type='text'
        placeholder='username'
        className='input'
        disabled={isSubmitting}
      />
      <FieldError error={errors.username} />
      <input
        {...register('password')}
        type='password'
        placeholder='password'
        className='input'
        disabled={isSubmitting}
      />
      <FieldError error={errors.password} />
      <button
        type='submit'
        className='inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-indigo-700'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className='flex items-center justify-center gap-2'>
            <HashLoader size={20} color='#ffffff' />
            <span>Logging in...</span>
          </div>
        ) : (
          'Log in'
        )}
      </button>
    </form>
  )
}
