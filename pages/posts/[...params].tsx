  import React from 'react'
  import { MainLayout } from '@/components/layouts'
  import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
  import {
    Comment,
    CommentForm,
    FunctionallyButtons,
    ShareButton,
    VoteComponent,
  } from '@/components'
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
          <div className='w-1/12 relative'>
            <VoteComponent voteCount={40} userVote={-1} getNotify={true} />
          </div>
          <div className='w-11/12 pb-1 dark:text-gray-800 px-2 border-b border-gray-100'>
            <div className='mb-3'>
              <span className='text-xs text-gray-400'>Nội dung :</span>
              <div className='ml-2'>
                <p>
                  Thuật ngữ Th3 23, 2020 Hai G. 5ít nhất Đọc React là gì? Và nó
                  hoạt động như thế nào? React là gì? Tại sao sử dụng React? React
                  hoạt động như thế nào? Lời kết React là gì? React là thư viện
                  JavaScript phổ biến nhất để xây dựng giao diện người dùng (UI).
                  Nó cho tốc độ phản hồi tuyệt vời khi user nhập liệu bằng cách sử
                  dụng phương pháp mới để render trang web. Components của công cụ
                  này được phát triển bởi Facebook. Nó được ra mắt như một công cụ
                  JavaScript mã nguồn mở vào năm 2013. Hiện tại, nó đã đi trước
                  các đối thủ chính như Angular và Bootstrap, hai thư viện
                  JavaScript bán chạy nhất thời bấy giờ. Trong bài viết này, chúng
                  tôi sẽ giúp bạn hiểu React là gì và lợi ích nó mang lại cho công
                  việc như một nhà phát triển front-end
                </p>
              </div>
            </div>
            <div className='flex justify-end'>
              <FunctionallyButtons />
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
