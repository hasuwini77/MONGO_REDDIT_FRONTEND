import { isAxiosError } from 'axios'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { toast } from 'sonner'

// lib/error-handling.ts

export type ServerActionResponse<T = any> =
  | { data: T; error?: never } // Success case
  | { data?: never; error: string } // Error case

export const handleServerActionError = <T>(
  response: ServerActionResponse<T>,
): T => {
  if ('error' in response) {
    throw new Error(response.error)
  }
  return response.data
}
export const handleAxiosError = (error: unknown): ServerActionResponse => {
  const defaultErrorMessage = 'something went wrong'

  if (!isAxiosError(error)) {
    console.error(error)
    return { error: defaultErrorMessage }
  }

  return { error: error.response?.data.message || defaultErrorMessage }
}

export const toastServerError = (error: Error) => {
  if (!isRedirectError(error)) {
    toast.error(error.message)
  }
}
