import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

client.interceptors.response.use(
  (response) => {
    console.log('API Response:', response)
    return response
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)
