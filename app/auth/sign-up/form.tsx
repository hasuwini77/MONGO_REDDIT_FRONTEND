'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toastServerError, ServerActionResponse } from 'lib/error-handling'
import { signUp } from 'actions/sign-up'
import { signUpSchema, SignUpValues } from 'lib/schemas'
import { FieldError } from 'components/field-error'
import { useAuthentication } from 'hooks/useAuthentification'
import { useRouter } from 'next/navigation'
import HashLoader from 'react-spinners/HashLoader'

export const SignUpForm = () => {
  const { login } = useAuthentication()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SignUpValues) => {
      const response = await signUp(values)
      if ('error' in response) {
        throw new Error(response.error)
      }
      return response as Extract<ServerActionResponse, { token: string }>
    },
    onSuccess: async (data) => {
      if ('token' in data) {
        await login(data.token)
        router.push('/')
      }
    },
    onError: toastServerError,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full max-w-md flex-col gap-4'
    >
      <input
        {...register('username')}
        type='text'
        placeholder='Username'
        className='input'
        disabled={isPending}
      />
      <FieldError error={errors.username} />

      <input
        {...register('password')}
        type='password'
        placeholder='Password'
        className='input'
        disabled={isPending}
      />
      <FieldError error={errors.password} />

      <button
        type='submit'
        className='inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-indigo-700'
        disabled={isPending}
      >
        {isPending ? (
          <div className='flex items-center justify-center gap-2'>
            <HashLoader size={20} color='#ffffff' />
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign up'
        )}
      </button>
    </form>
  )
}
