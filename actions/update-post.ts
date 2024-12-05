import { client } from 'lib/client'

export const updatePost = async (
  postId: string,
  token: string,
  updateData: { title: string; content: string },
) => {
  try {
    const response = await client.put(`/posts/${postId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { data: response.data }
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error updating post' }
  }
}
