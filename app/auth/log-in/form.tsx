// components/login-form.tsx
'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { logIn } from 'actions/log-in'
import { logInSchema, LogInValues } from 'lib/schemas'
import { FieldError } from 'components/field-error'
import { useAuthentication } from 'hooks/useAuthentification'

export const LogInForm = () => {
  const { login } = useAuthentication()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: LogInValues) => {
      const response = await logIn(values)

      if ('error' in response) {
        throw new Error(response.error)
      }

      if ('token' in response) {
        await login(response.token)
        toast.success('Logged in successfully')
        router.push('/')
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInValues>({
    resolver: zodResolver(logInSchema),
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
      />
      <FieldError error={errors.username} />
      <input
        {...register('password')}
        type='password'
        placeholder='password'
        className='input'
      />
      <FieldError error={errors.password} />
      <button type='submit' className='button-primary' disabled={isPending}>
        {isPending ? 'logging in...' : 'log in'}
      </button>
    </form>
  )
}
