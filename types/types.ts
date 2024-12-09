import { IconName } from 'components/Icons'

export interface Post {
  _id: string
  title: string
  content: string
  author: {
    username: string
  }
  comments: Array<{
    content: string
    author: {
      username: string
    }
  }>
  createdAt: string
}
export interface User {
  _id: string
  username: string
  iconName: IconName
  createdAt: Date
  updatedAt: Date
}
