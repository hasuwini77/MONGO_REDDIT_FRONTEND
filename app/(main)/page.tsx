import AllPosts from 'app/(main)/posts/page'

export const dynamic = 'force-dynamic'
export const revalidate = 900
export const fetchCache = 'force-cache'

export default function Home() {
  return (
    <div className='main'>
      <h1 className='hidden'>REDDIT IS DA SHITTT</h1>
      <div>
        <AllPosts />
      </div>
    </div>
  )
}
