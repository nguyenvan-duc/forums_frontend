import { useState, useEffect } from 'react'
import _ from 'lodash'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import { Posts, Welcome } from '@/components'
import { postApi } from '@/api-client'
import { useAuth } from '@/hooks'
const Home: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Array<PostModel>>([])
  const [loader, setLoader] = useState(true)
  const { profile } = useAuth()
  useEffect(() => {
    postApi.getAllPost().then((res: any) => {
      setLoader(false)
      return setPosts(res)
    })
  }, [])
  const renderPosts = () => {
    if (loader) {
      return (
        <>
          {Array.from(Array(3), (e, i) => {
            return (
              <>
                <div className='overflow-hidden border border-gray-300 md:rounded-md w-full mb-4 m-auto'>
                  <div className='w-full block h-full'>
                    {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
                    <div className='bg-white hover:bg-gray-50 hover:dark:bg-gray-600 dark:bg-gray-800 w-full p-4'>
                      <div className='animate-pulse  bg-gray-300 w-72 rounded-md h-8' />
                      <div className='flex flex-wrap mb-2  justify-starts items-center mt-2'>
                        <div className='animate-pulse  bg-gray-300 w-96 rounded-md h-8' />
                      </div>
                      <div className='flex justify-between items-end'>
                        <div className='animate-pulse  bg-gray-300 w-[70%] rounded-md h-16' />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </>
      )
    }
    return _.map(posts, (item) => (
      <Posts
        key={item.id}
        id={item.id}
        title={item.title}
        slug={item.slug}
        tags={item.tags}
        content={item.content}
        voteCount={item.voteCount}
        commentCount={item.commentCount}
        isBookmark={item.bookmark}
        author={item.account}
        createdAt={item.createdAt}
      />
    ))
  }
  return (
    <div className='min-h-[80vh]'>
      <Welcome />
      <div className='flex mb-2'>
        <button className='px-2 py-2 mr-2 hover:bg-gray-50 font-medium rounded-md'>
          Liên Quan
        </button>
        <button className='px-2 py-2 hover:bg-gray-50 rounded-md'>
          Mới nhất
        </button>
        <button className='px-2 py-2 hover:bg-gray-50 rounded-md'>
          Phổ biến
        </button>
      </div>
      {renderPosts()}
    </div>
  )
}

Home.Layout = MainLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
