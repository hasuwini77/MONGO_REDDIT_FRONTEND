import { client } from 'lib/client'
import type { IconName } from '../components/Icons'

interface UpdateProfileData {
  username: string
  iconName: IconName
}

export const updateProfile = async (
  token: string,
  updateData: UpdateProfileData,
) => {
  try {
    const updateResponse = await client.put('/auth/profile', updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const userResponse = await client.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    localStorage.setItem('userData', JSON.stringify(userResponse.data))

    return {
      data: userResponse.data,
      error: null,
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || 'Error updating profile',
    }
  }
}
