import { CreatePostAuthWrapper } from './authWrapper'

export default function CreatePostPage() {
  return (
    <div className='container mx-auto max-w-2xl p-4'>
      <h1 className='mb-6 text-2xl font-bold'>Create a New Post</h1>
      <CreatePostAuthWrapper />
    </div>
  )
}
