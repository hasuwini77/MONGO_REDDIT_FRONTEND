'use server'

import { client } from 'lib/client'
import { ServerActionResponse } from 'lib/error-handling'
import { revalidateTag, revalidatePath } from 'next/cache'
import { Post } from 'types/types'

interface Comment {
  _id: string
  content: string
  author: {
    username: string
  }
  createdAt: string
}

interface PostWithComments extends Post {
  comments: Comment[]
}

export const addComment = async (
  postId: string,
  data: { content: string },
  token: string,
): Promise<ServerActionResponse<PostWithComments>> => {
  try {
    if (!token) {
      throw new Error('Authentication required')
    }

    const response = await client.post<PostWithComments>(
      `/posts/${postId}/comments`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    revalidateTag(`post-${postId}`)
    revalidateTag('posts')
    revalidatePath(`/posts/${postId}`)

    return { data: response.data }
  } catch (error: any) {
    return {
      error:
        error.response?.data?.message ||
        error.message ||
        'Failed to add comment',
    }
  }
}
