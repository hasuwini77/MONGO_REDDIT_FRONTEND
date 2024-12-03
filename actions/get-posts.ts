// actions/get-posts.ts
'use server'

import { client } from 'lib/client'
import { ServerActionResponse } from 'lib/error-handling'

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
    console.log('Server Action: Fetching all posts')
    const response = await client.get('/posts')
    console.log('Server Action: API response:', response.data)
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
