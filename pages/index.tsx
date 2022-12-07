import { useState, useEffect } from 'react'
import _ from 'lodash'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import { Posts, Welcome } from '@/components'
import { postApi } from '@/api-client'
import { useAuth } from '@/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SORT_POST_NEW, SORT_POST_HOT } from '@/constants'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const Home: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Array<PostModel>>([])
  const [noMore, setNoMore] = useState(true)
  const [page, setPage] = useState(2)
  const [loader, setLoader] = useState(true)
  const [sortType, setSortType] = useState('relevant')
  const { profile } = useAuth()

  useEffect(() => {
    if (!profile?.name) {
      setSortType(SORT_POST_NEW)
      fetchInitDataPosts()
    } else {
      setSortType(sortType)
      fetchInitDataPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.name, sortType])

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
          {Array.from(Array(5), (e, i) => {
            return (
              <div
                key={i}
                className='overflow-hidden  border-b border-gray-200 w-full mb-4 m-auto'>
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
            <div className='overflow-hidden  border-b border-gray-200 w-full mb-4 m-auto'>
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
            <div className='py-5' style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </div>
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
    <div>
      <div className='pl-4 pr-6 bg-white pb-4 border-b border-gray-200 sm:pl-6 lg:pl-8 xl:pl-3 xl:border-t-0'>
        {profile?.name && (
          <div className='mb-4 flex justify-end'>
            <Link href={'/bai-dang/them-moi'}>
              <a className='px-2 flex bg-gray-50 text-sm block md:hidden hover:bg-gray-100 py-2 border rounded-lg'>
                <PlusIcon
                  className='-ml-1 mr-2 h-5 w-5 text-gray-500'
                  aria-hidden='true'
                />
                Tạo bài đăng
              </a>
            </Link>
          </div>
        )}
        <div className='flex items-center mb-3'>
          {profile?.name && (
            <button
              onClick={() => setSortType('relevant')}
              className={classNames(
                'px-2 py-2 mr-2 hover:bg-gray-50  rounded-md',
                sortType == 'relevant' && 'font-medium bg-gray-200'
              )}>
              Liên Quan
            </button>
          )}

          <button
            onClick={() => setSortType(SORT_POST_NEW)}
            className={classNames(
              'px-2 py-2 hover:bg-gray-50 rounded-md mr-2',
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
      </div>
      <Welcome />
      {renderPosts()}
    </div>
  )
}

Home.Layout = MainLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
