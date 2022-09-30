import React from 'react'
import { MainLayout } from '@/components/layouts'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  BookmarkIcon,
  ShareIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { Comment, CommentForm, ShareButton } from '@/components'
import { NextPageWithLayout } from '@/models'
type Props = {}

const DetailsPost: NextPageWithLayout = (props: Props) => {
  return (
    <div className='md:border-x px-2 w-full h-full  border-gray-100'>
      <div className='w-full border-b py-3 border-gray-50'>
        <span className='text-xs text-gray-600'>Tiêu đề :</span>
        <h1 className='text-2xl ml-2 dark:text-gray-800'>
          WebRTC For Beginners - Part 5.5: Building the WebRTC Android Library
        </h1>
        <ul className='mt-2 flex'>
          <li className='mx-2'>
            Hỏi bởi: <a className='#'>đức nv</a>
          </li>
          <li className='mx-2'>Th2, 27/2022</li>
          <li className='mx-2'>Lượt xem: 20</li>
        </ul>
      </div>

      <div className='flex  py-3'>
        <div className='w-1/12 flex justify-center '>
          <ul>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <button className='mb-2'>
                <ChevronUpIcon className='h-6 w-6' />
              </button>
              <span>0</span>
            </li>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <button className='mb-2'>
                <ChevronDownIcon className='h-6 w-6' />
              </button>
              <span>0</span>
            </li>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <button className='mb-2'>
                <BookmarkIcon className='h-6 w-6' />
              </button>
              <span>0</span>
            </li>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <ShareButton />
            </li>
          </ul>
        </div>
        <div className='w-11/12 dark:text-gray-800 px-2 border-b border-gray-100 pb-12'>
          <span className='text-xs text-gray-400'>Nội dung :</span>
          <div className='ml-2'>
            <p>
              Thuật ngữ Th3 23, 2020 Hai G. 5ít nhất Đọc React là gì? Và nó hoạt
              động như thế nào? React là gì? Tại sao sử dụng React? React hoạt
              động như thế nào? Lời kết React là gì? React là thư viện
              JavaScript phổ biến nhất để xây dựng giao diện người dùng (UI). Nó
              cho tốc độ phản hồi tuyệt vời khi user nhập liệu bằng cách sử dụng
              phương pháp mới để render trang web. Components của công cụ này
              được phát triển bởi Facebook. Nó được ra mắt như một công cụ
              JavaScript mã nguồn mở vào năm 2013. Hiện tại, nó đã đi trước các
              đối thủ chính như Angular và Bootstrap, hai thư viện JavaScript
              bán chạy nhất thời bấy giờ. Trong bài viết này, chúng tôi sẽ giúp
              bạn hiểu React là gì và lợi ích nó mang lại cho công việc như một
              nhà phát triển front-end
            </p>
            <div className=' w-full flex items-center text-xs text-orange-400 justify-end px-4'>
              <span className='flex items-center cursor-help'>
                <ExclamationTriangleIcon className='h-4 w-4 text-orange-400 mr-1' />{' '}
                Bài viết có vấn đề
              </span>
            </div>
          </div>
        </div>
      </div>
      <h1 className='mt-3 text-lg font-medium flex'>
        Bạn có biết ai có thể chả lời cho câu hỏi này không?{' '}
      </h1>
      <h2>Có 6 câu Trả Lời: </h2>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <CommentForm />
    </div>
  )
}
DetailsPost.Layout = MainLayout
DetailsPost.sidebarRight = true
DetailsPost.SidebarLeft = true
DetailsPost.requestAuth = false
export default DetailsPost
