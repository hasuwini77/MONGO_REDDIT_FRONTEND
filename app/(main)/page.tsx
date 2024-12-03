import MyPosts from 'app/posts/page'

export default function Home() {
  return (
    <div className='main'>
      <h1> Home Page</h1>
      <div>
        <MyPosts />
      </div>
    </div>
  )
}
