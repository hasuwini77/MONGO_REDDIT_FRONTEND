import { client } from 'lib/client'
import type { IconName } from '../components/Icons'
import { User } from 'types/types'

interface UpdateProfileData {
  username: string
  iconName: IconName
}

export const updateProfile = async (
  token: string,
  updateData: UpdateProfileData,
) => {
  try {
    // First update the profile
    const response = await client.put<{ message: string; user: User }>(
      '/auth/profile',
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    // Get the updated user data from the response
    const updatedUser = response.data.user

    // Update localStorage with the fresh data
    localStorage.setItem('userData', JSON.stringify(updatedUser))

    // Dispatch custom event with the updated user data
    window.dispatchEvent(
      new CustomEvent('user-updated', {
        detail: updatedUser,
      }),
    )

    return {
      data: updatedUser,
      error: null,
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || 'Error updating profile',
    }
  }
}
