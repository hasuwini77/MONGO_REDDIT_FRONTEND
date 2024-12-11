'use server'

import { client } from 'lib/client'
import { ServerActionResponse } from 'lib/error-handling'
import { revalidateTag } from 'next/cache'

interface UserPost {
  _id: string
  title: string
  content: string
  author: {
    username: string
    iconName?: string
  }
  comments: Array<{
    content: string
    author: {
      username: string
    }
  }>
  createdAt: string
}

export const getUserPosts = async (
  token: string,
): Promise<ServerActionResponse<UserPost[]>> => {
  try {
    const response = await client.get('/my-posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    revalidateTag('user-posts')

    return { data: response.data }
  } catch (error: any) {
    console.error(
      'Server Action: Error:',
      error.response?.data || error.message,
    )
    return {
      error:
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch your posts',
    }
  }
}
