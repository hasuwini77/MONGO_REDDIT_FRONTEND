import 'server-only'

import { cookies } from 'next/headers'

const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies()

  cookieStore.set('access-token', accessToken, { httpOnly: true })
}

const deleteAccessToken = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('access-token')
}

const getAccessToken = async () => {
  const cookieStore = await cookies()

  return cookieStore.get('access-token')
}

export const auth = {
  setAccessToken,
  deleteAccessToken,
  getAccessToken,
}
