import { tagApi } from '@/api-client'
import Link from 'next/link'
import React, { useState } from 'react'

interface TagItemProps {
  id: number
  icon:string
  slug:string
  color_bg:string
  name: string
  desciption: string
  tag_follow_count: number
  follow: boolean,
  posts_use:number,
  bg_color:string,
}
function classNames(...classNames: any) {
  return classNames.filter(Boolean).join(' ')
}
export function TagItem(item: TagItemProps) {
  const [follow, setFollow] = useState(item?.follow)
  const [loader, setLoader] = useState(false)
  const [followCount, setFollowCount] = useState(item?.tag_follow_count);
  const handleFollow = async (id: number) => {
    setFollow(!follow)
    setLoader(true)
    if(follow){
      setFollowCount(followCount - 1)
    }else{
      setFollowCount(followCount + 1)
    }
    await tagApi.followTag(id).then((res: any) => {
      console.log(res)
      setLoader(false)
      setFollow(res?.follow)
      setFollowCount(res?.tag_follow_count)
    })
  }
  return (
    <>
      <div key={item?.id} className='border bg-gray-50 rounded-md p-3'>
        <div className='mb-3'>
          <Link href={`/tag/${item?.slug}`}>
            <a className={`px-2 text-lg font-medium  rounded-sm py-1 bg-${item?.color_bg?item?.color_bg:"indigo"}-50`}>
            <span className={`text-${item?.color_bg?item?.color_bg:"gray"}-800`}>#</span>{item?.name}
            </a>
          </Link>
          <div className='mt-2 min-h-[50px]'>
            {item?.desciption}
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='text-sm text-gray-500 mr-2'>
            {followCount} lượt theo dõi
          </div>
          <div className='text-sm text-gray-500'>{item?.posts_use} bài đăng</div>
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
