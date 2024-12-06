'use server'

import { client } from 'lib/client'
import { ServerActionResponse } from 'lib/error-handling'

export const getPost = async (id: string): Promise<ServerActionResponse> => {
  if (!id) {
    return { error: 'Post ID is required' }
  }

  try {
    const response = await client.get(`/posts/${id}`)
    return { data: response.data }
  } catch (error) {
    console.error('Server Action: Error:', error)
    return {
      error: error instanceof Error ? error.message : 'Failed to fetch post',
    }
  }
}
