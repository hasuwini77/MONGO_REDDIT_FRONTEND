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

export const getPost = async (id: string): Promise<ServerActionResponse> => {
  if (!id) {
    return { error: 'Post ID is required' }
  }

  try {
    console.log('Server Action: Fetching post with ID:', id) // Debug log
    const response = await client.get(`/posts/${id}`)
    console.log('Server Action: API response:', response.data) // Debug log
    return { data: response.data }
  } catch (error) {
    console.error('Server Action: Error:', error) // Error log
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch post',
    }
  }
}
