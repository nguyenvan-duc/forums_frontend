import { useEffect, useState } from 'react'
import _ from 'lodash'
import { appApi } from '@/api-client'
import { useAuth, useBookmarks } from '@/hooks'
import { useStore } from '@/store'
import {StarIcon} from '@heroicons/react/24/outline'
import useSWR from 'swr'
import Link from 'next/link'

type Props = {}
export function SidebarRight({}: Props) {
  const { profile, logout, fistLoading } = useAuth()
  const { bookmarks, fistLoading: loadBookmarks } = useBookmarks()
  const {
    data: userFamous,
    error,
    mutate,
  } = useSWR<any>(`/users/famous`, {
    dedupingInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const renderBookmark = () => {
    if (loadBookmarks) {
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
    if (bookmarks?.length == 0) {
      return (
        <>
          <div className='text-center py-3 text-gray-600'>Không có gì!</div>
        </>
      )
    }
    return (
      <>
        {_.map(bookmarks, (item: any) => (
            <li key={item?.id} className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
              <Link href={`/bai-dang/${item?.url_redirect}`}>
                <a>
                  {item?.subject == 'COMMENT' ? (
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
                      {item?.content}
                    </>
                  ) : (
                    ''
                  )}
                </a>
              </Link>
            </li>
        ))}
      </>
    )
  }

  const renderUsersFamous = () => {
    if (userFamous === undefined && error === undefined) {
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
    return _.map(userFamous, (item, index:any) => (
        <li key={item?.id} className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
          <div className='flex items-center'>
            <img src={item?.imageUrl} className=' w-8 h-8 rounded-full mr-3' />
            <div>
              <div className='flex items-center text-xs text-gray-500'>
                <span className='mr-1'>{index + 1}</span>
                <span className='mr-1'>·</span>
                <span>Nổi bật </span>
                {index == 0&&(<StarIcon className='h-3 w-3 ml-1'/>)}
                
              </div>
              <Link href={`/nguoi-dung/${item?.username}`}>
                <a>
                  <h3 className='  font-semibold hover:underline '>{item?.name}</h3>
                </a>
              </Link>

              <div className=' text-orange-600'>{item?.reputation} Điểm</div>
            </div>
          </div>
        </li>
    ))
  }
  return (
    <>
      <div className='w-full border rounded-md bg-gray-50 mb-3 overflow-hidden'>
        <div
          className='w-full border-b flex items-center px-3 pt-5 pb-1'
          style={{
            backgroundImage: 'url("/home-banner.png")',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          <h2 className='text-lg font-semibold text-white'>
            Người dùng nổi bật
          </h2>
        </div>
        <div className='px-2'>
          <ul>{renderUsersFamous()}</ul>
        </div>
        <div className='p-2 text-center'>
          <Link href={'#'}>
            <a className='text-blue-500 hover:underline text-sm hover:cursor-pointer'>
              Xem tất cả
            </a>
          </Link>
        </div>
      </div>
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
