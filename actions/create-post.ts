'use server'

import { client } from 'lib/client'
import { ServerActionResponse } from 'lib/error-handling'
import { revalidateTag, revalidatePath } from 'next/cache'

interface Post {
  _id: string
  title: string
  content: string
  author: {
    username: string
  }
  createdAt: string
}

export const createPost = async (
  data: { title: string; content: string },
  token: string,
): Promise<ServerActionResponse<Post>> => {
  try {
    if (!token) {
      throw new Error('Authentication required')
    }

    // Add authorization header to the request
    const response = await client.post<Post>('/posts', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    revalidateTag('posts')
    revalidatePath('/')

    return { data: response.data }
  } catch (error: any) {
    return {
      error:
        error.response?.data?.message ||
        error.message ||
        'Failed to create post',
    }
  }
}
