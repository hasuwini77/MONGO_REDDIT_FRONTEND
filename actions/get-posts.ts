'use server'

import { client } from 'lib/client'
import { ServerActionResponse } from 'lib/error-handling'
import { revalidateTag } from 'next/cache'

interface Post {
  _id: string
  title: string
  content: string
  author: {
    username: string
  }
  comments: Array<{
    content: string
    author: {
      username: string
    }
  }>
  createdAt: string
}

export const getPosts = async (): Promise<ServerActionResponse<Post[]>> => {
  try {
    const response = await client.get('/posts')
    revalidateTag('posts')

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
        'Failed to fetch posts',
    }
  }
}
