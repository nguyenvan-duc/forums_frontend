import { useState, useEffect } from 'react'
import _ from 'lodash'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import { Posts, Welcome } from '@/components'
import { postApi } from '@/api-client'
import { useAuth } from '@/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SORT_POST_NEW, SORT_POST_HOT } from '@/constants'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const Home: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Array<PostModel>>([])
  const [noMore, setNoMore] = useState(true)
  const [page, setPage] = useState(2)
  const [loader, setLoader] = useState(true)
  const [sortType, setSortType] = useState('none')
  const { profile } = useAuth()
  useEffect(() => {
    fetchInitDataPosts()
  }, [sortType])
  useEffect(()=>{
    if(!profile?.name){
      setSortType(SORT_POST_NEW)
      fetchInitDataPosts()
    }else{
      setSortType('relevant')
    }
  },[profile?.name])
  const fetchInitDataPosts = async () => {
    setLoader(true)
    setNoMore(true)
    await postApi.getAllPost(sortType, 1).then((res: any) => {
      setLoader(false)
      setPosts(res?.content)
      setPage(2)
    })
  }
  const fetchWhenScroll = async () => {
    const result = await await postApi
      .getAllPost(sortType, page)
      .then((res: any) => {
        return res?.content
      })
    setPosts([...posts, ...result])
    if (result.length === 0 || result < 2) {
      setNoMore(false)
    }
    setPage(page + 1)
  }
  const renderPosts = () => {
    if (loader) {
      return (
        <>
          {Array.from(Array(3), (e, i) => {
            return (
           
                <div key={i} className='overflow-hidden border border-gray-300 md:rounded-md w-full mb-4 m-auto'>
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
            )
          })}
        </>
      )
    }
    return (
      <>
        <InfiniteScroll
          next={fetchWhenScroll}
          dataLength={posts.length}
          hasMore={noMore}
          loader={
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
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          {_.map(posts, (item) => (
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
          ))}
        </InfiniteScroll>
      </>
    )
  }
  return (
    <div className='min-h-[80vh]'>
      <Welcome />
      <div className='flex mb-2'>
        {profile?.name && (
          <button
            onClick={() => setSortType('relevant')}
            className={classNames(
              'px-2 py-2 mr-2 hover:bg-gray-50  rounded-md',
              sortType == 'none' && 'font-medium bg-gray-200'
            )}>
            Liên Quan
          </button>
        )}

        <button
          onClick={() => setSortType(SORT_POST_NEW)}
          className={classNames(
            'px-2 py-2 hover:bg-gray-50 rounded-md',
            sortType == SORT_POST_NEW && 'font-medium bg-gray-200'
          )}>
          Mới nhất
        </button>
        <button
          onClick={() => setSortType(SORT_POST_HOT)}
          className={classNames(
            'px-2 py-2 hover:bg-gray-50 rounded-md',
            sortType == SORT_POST_HOT && 'font-medium bg-gray-200'
          )}>
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
