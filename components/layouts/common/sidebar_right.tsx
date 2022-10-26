import { useEffect, useState } from 'react'
import _ from 'lodash'
import { appApi } from '@/api-client'
import { useAuth } from '@/hooks'

type Props = {}
export function SidebarRight({}: Props) {
  const { profile, logout, fistLoading } = useAuth()
  const [bookmarks, setBookmark] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    if (profile?.name) {
      fetchData()
    }
  }, [])
  const fetchData = async () => {
    await appApi.bookmarkList().then((res: any) => {
      setBookmark(res)
      setLoader(false)
      console.log(res)
    })
  }

  const renderBookmark = () => {
    if (loader) {
      return (
        <>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
        </>
      )
    }
    return (
      <>
        {_.map(bookmarks, (item: any) => (
          <>
            <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
              <a>
                {item?.comment ? (
                  <>
                    <span className='px-2 py-2 bg-yellow-200 text-yellow-600 text-sm'>
                      trả lời
                    </span>
                  </>
                ) : item.post ? (
                  <>
                    <span className='px-2 py-[1px] rounded-md mr-2 bg-yellow-200 text-yellow-600 text-xs'>
                      bài viết
                    </span>
                    {item?.post?.title}
                  </>
                ) : (
                  ''
                )}
              </a>
            </li>
          </>
        ))}
      </>
    )
  }
  return (
    <>
      {profile?.name && (
        <div className='w-full border p-3 rounded-md bg-gray-50'>
          <div className='w-full border-b pb-2 flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Bookmark</h2>
            <a className='text-sm text-blue-500 hover:underline hover:cursor-pointer'>
              xem tất cả
            </a>
          </div>
          <ul className='w-full'>{renderBookmark()}</ul>
        </div>
      )}
    </>
  )
}
