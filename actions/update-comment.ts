import { client } from 'lib/client'

export const updateComment = async (
  postId: string,
  commentId: string,
  token: string,
  updateData: { content: string },
) => {
  try {
    const response = await client.put(
      `/posts/${postId}/comments/${commentId}`,
      updateData, // Pass the entire updateData object
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return { data: response.data }
  } catch (error: any) {
    return {
      error: error.response?.data?.message || 'Error updating comment',
    }
  }
}
