'use server'

import { client } from 'lib/client'
import { handleAxiosError, ServerActionResponse } from 'lib/error-handling'
import { signUpSchema, SignUpValues } from 'lib/schemas'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signUp = async (
  data: SignUpValues,
): Promise<ServerActionResponse> => {
  const parsedData = signUpSchema.parse(data)

  try {
    const response = await client.post('/auth/sign-up', parsedData)

    // Immediately log them in and get the token
    const loginResponse = await client.post('/auth/log-in', {
      username: parsedData.username,
      password: parsedData.password,
    })

    // Store the token in cookies
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'token',
      value: loginResponse.data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
  } catch (error) {
    return handleAxiosError(error)
  }

  redirect('/?login=success')
}
