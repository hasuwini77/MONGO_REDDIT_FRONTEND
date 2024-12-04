'use server'

import { client } from 'lib/client'
import { ServerActionResponse } from 'lib/error-handling'
import { revalidatePath, revalidateTag } from 'next/cache'

interface CreatePostValues {
  title: string
  content: string
}

export const createPost = async (
  data: CreatePostValues,
): Promise<ServerActionResponse> => {
  try {
    console.log('Server Action: Creating new post')
    const response = await client.post('/posts', data)

    // Revalidate after successful post creation
    revalidateTag('posts')
    revalidatePath('/') // Revalidate the home page
    revalidatePath(`/posts/${response.data._id}`) // Revalidate the new post's page

    console.log('Server Action: Post created:', response.data)
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
        'Failed to create post',
    }
  }
}
