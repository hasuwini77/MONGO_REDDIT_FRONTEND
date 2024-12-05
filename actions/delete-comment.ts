// actions/delete-comment.ts
import { client } from 'lib/client'

export const deleteComment = async (
  postId: string,
  commentId: string,
  token: string,
) => {
  try {
    const response = await client.delete(
      `/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return { data: response.data }
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Error deleting comment' }
  }
}
