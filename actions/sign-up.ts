'use server'

import { client } from 'lib/client'
import { handleAxiosError, ServerActionResponse } from 'lib/error-handling'
import { signUpSchema, SignUpValues } from 'lib/schemas'

export const signUp = async (
  data: SignUpValues,
): Promise<ServerActionResponse> => {
  try {
    const parsedData = signUpSchema.parse(data)

    // First, sign up the user
    await client.post('/auth/sign-up', parsedData)

    // Then, immediately log them in using the same credentials
    const loginResponse = await client.post('/auth/log-in', parsedData)

    if (!loginResponse.data.token || !loginResponse.data.user) {
      return { error: 'Invalid response from server' }
    }

    return {
      token: loginResponse.data.token,
      user: loginResponse.data.user,
    }
  } catch (error) {
    return handleAxiosError(error)
  }
}
