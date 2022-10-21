import {
  BookmarkIcon,
  ChevronDownIcon,
  BellIcon,
  EllipsisHorizontalIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
export function FunctionallyButtons() {
  return (
    <>
      <div className='flex flex-wrap'>
        <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <BookmarkIcon className='w-5 h-45text-gray-400' />
          <span className='ml-1 font-medium'>Lưu lại</span>
        </button>
        <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <ShareIcon className='w-5 h-5 text-gray-400' />
          <span className='ml-1 font-medium'>Chia sẻ</span>
        </button>
        <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <BellIcon className='w-5 h-5 text-gray-400' />
          <span className='ml-1 font-medium'>Nhận Thông báo</span>
        </button>
        <button className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
          <EllipsisHorizontalIcon className='w-5 h-5 text-gray-400' />
        </button>
      </div>
    </>
  )
}
