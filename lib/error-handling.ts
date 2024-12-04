// lib/error-handling.ts
import { isAxiosError } from 'axios'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { toast } from 'sonner'

export type ServerActionResponse<T = any> =
  | { data: T; error?: never } // Success with data
  | { token: string; user: T; error?: never } // Success with token and user
  | { data?: never; error: string } // Error case

export const handleServerActionError = <T>(
  response: ServerActionResponse<T>,
): T => {
  if ('error' in response) {
    throw new Error(response.error)
  }
  if ('token' in response) {
    return response.token as unknown as T
  }
  return response.data
}

// Handle Axios errors
export const handleAxiosError = (
  error: unknown,
): ServerActionResponse<never> => {
  const defaultErrorMessage = 'something went wrong'

  if (!isAxiosError(error)) {
    console.error(error)
    return { error: defaultErrorMessage }
  }

  return { error: error.response?.data.message || defaultErrorMessage }
}

// Toast error messages
export const toastServerError = (error: Error) => {
  if (!isRedirectError(error)) {
    toast.error(error.message)
  }
}
