import { useState, useEffect } from 'react'
import {
  BellIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import HeroIcon from './hero_icon'
import { postApi, commentApi } from '@/api-client'
interface PropsComponent {
  id: number
  isBookmark: boolean
  subject: string
}
export function FunctionallyButtons({
  id,
  subject,
  isBookmark,
}: PropsComponent) {
  const [statusBookmark, setStatusBookmark] = useState(isBookmark)
  useEffect(()=>{
    setStatusBookmark(isBookmark)
  },[])
  const handleBookmark = async (e: any) => {
    e.preventDefault()
    setStatusBookmark(!statusBookmark)
    try {
      setStatusBookmark(!statusBookmark)
      if (subject == 'POST') {
        await postApi.bookmarkPost(id).then((res:any) => {
          if(res.status == 200){
            setStatusBookmark(res.data)
          }
        })
      }else if(subject == 'COMMENT'){
        await commentApi.bookmarkAnswer(id).then((res:any)=>{
          if(res.status == 200){
            setStatusBookmark(res.data)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className='flex flex-wrap'>
        <button onClick={handleBookmark} className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <HeroIcon
            name='BookmarkIcon'
            className='w-5 h-45  text-gray-400'
            outline={statusBookmark}
          />
          <span className='ml-1 font-medium'>Lưu lại</span>
        </button>
        <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <ShareIcon className='w-5 h-5 text-gray-400' />
          <span className='ml-1 font-medium'>Chia sẻ</span>
        </button>
        {/* <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <BellIcon className='w-5 h-5 text-gray-400' />
          <span className='ml-1 font-medium'>Nhận Thông báo</span>
        </button> */}
        <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <EllipsisHorizontalIcon className='w-5 h-5 text-gray-400' />
        </button>
      </div>
    </>
  )
}
