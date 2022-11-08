import { tagApi } from '@/api-client'
import React, { useState } from 'react'

interface TagItemProps {
  id: number
  name: string
  desciption: string
  tag_follow_count: number
  follow: boolean
}
function classNames(...classNamees: any) {
  return classNamees.filter(Boolean).join(' ')
}
export function TagItem(item: TagItemProps) {
  const [follow, setFollow] = useState(item?.follow)
  const [loader, setLoader] = useState(false)
  const handleFollow = async (id: number) => {
    setFollow(!follow)
    setLoader(true)
    await tagApi.followTag(id).then((res: any) => {
      console.log(res)
      setLoader(false)
      setFollow(res?.follow)
    })
  }
  return (
    <>
      <div key={item?.id} className='border bg-gray-50 rounded-md p-3'>
        <div className='mb-3'>
          <button className='px-2 text-sm text-blue-800 rounded-sm py-1 mb-2 bg-indigo-50'>
            {item?.name}
          </button>
          <p>
            Tutorial is a general purpose tag. We welcome all types of tutorial
            - code related or not! Its all about learning, and using tutorials
            to teach others!
          </p>
        </div>
        <div className='flex justify-between'>
          <div className='text-sm text-gray-500 mr-2'>
            4000{item?.tag_follow_count} lượt theo dõi
          </div>
          <div className='text-sm text-gray-500'>6000 bài đăng</div>
        </div>

        <button
          onClick={() => handleFollow(item?.id)}
          disabled={loader}
          className={classNames(
            'w-full py-2 px-2 mt-2 rounded-md border font-medium text-white ',
            follow ? 'bg-indigo-400' : 'bg-indigo-600'
          )}>
          {follow ? 'Đã theo dõi' : 'Theo dõi'}
        </button>
      </div>
    </>
  )
}
