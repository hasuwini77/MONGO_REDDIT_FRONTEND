import { client } from 'lib/client'

export const deletePost = async (postId: string, token: string) => {
  try {
    const response = await client.delete(`/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { data: response.data }
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error deleting post' }
  }
}
