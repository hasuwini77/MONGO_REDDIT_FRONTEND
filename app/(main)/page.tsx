import MyPosts from 'app/(main)/posts/page'

export const dynamic = 'force-dynamic'
export const revalidate = 300
export const fetchCache = 'force-cache'

export default function Home() {
  return (
    <div className='main'>
      <h1 className='hidden'>REDDIT IS DA SHITTT</h1>
      <div>
        <MyPosts />
      </div>
    </div>
  )
}
