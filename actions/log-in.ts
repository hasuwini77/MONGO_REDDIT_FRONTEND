'use server'

import { client } from 'lib/client'
import { handleAxiosError, ServerActionResponse } from 'lib/error-handling'
import { logInSchema, LogInValues } from 'lib/schemas'

export const logIn = async (
  data: LogInValues,
): Promise<ServerActionResponse> => {
  try {
    const parsedData = logInSchema.parse(data)
    const response = await client.post('/auth/log-in', parsedData)

    if (
      !response.data.token ||
      !response.data.user ||
      !response.data.refreshToken
    ) {
      return { error: 'Invalid response from server' }
    }

    return {
      token: response.data.token,
      user: response.data.user,
      refreshToken: response.data.refreshToken,
    }
  } catch (error) {
    return handleAxiosError(error)
  }
}
