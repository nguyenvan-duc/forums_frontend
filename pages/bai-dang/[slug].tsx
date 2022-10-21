import React, { useState } from 'react'
import { MainLayout } from '@/components/layouts'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline'
import {
  Answer,
  AnswersForm,
  FunctionallyButtons,
  VoteComponent,
} from '@/components'
import { PostModel } from '@/models'
import { postApi } from '@/api-client'
import { GetStaticPaths, GetStaticProps, NextPageContext } from 'next'
import { Loader } from '@/components/layouts/common'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
export interface IPropType {
  post: PostModel
}
const DetailsPost = ({ post }: any) => {
  const [showFormComment, setShowFormComment] = useState(false)
  const router = useRouter();
  const handleShowFormComment = (e: any) => {
    e.preventDefault()
    setShowFormComment(true)
  }
  if(router.isFallback) return <Loader/>
  return (
    <div className='md:border-x px-2 w-full h-full  bg-gray-50 border pb-3 rounded-md'>
      <div className='w-full border-b py-3 border-gray-40'>
        <span className='text-xs text-gray-600'>Tiêu đề :</span>
        <h1 className='text-2xl ml-2 dark:text-gray-800'>{post?.title}</h1>
        <ul className='mt-2 flex'>
          <li className='mx-2'>
            Hỏi bởi: <a className='#'> {post?.account?.username}</a>
          </li>
          <li className='mx-2'>Th2, 27/2022</li>
          <li className='mx-2'>Lượt xem: 20</li>
        </ul>
      </div>
      <div className='flex  py-3'>
        <div className='w-1/12 relative'>
          <VoteComponent
            voteCount={post?.voteCount}
            userVote={post?.voteType}
            getNotify={true}
          />
        </div>
        <div className='w-11/12 pb-1 dark:text-gray-800 px-2 border-b border-gray-100'>
          <div className='mb-3'>
            <span className='text-xs text-gray-400'>Nội dung :</span>
            <div className='ml-2 post-details relative'>
              <MarkdownPreview source={post?.content} />
            </div>
          </div>
          <div className='flex justify-between'>
            <button
              onClick={handleShowFormComment}
              className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
              <ChatBubbleOvalLeftIcon className='h-4 w-4 mr-2' />
              <span>thêm bình luận</span>
            </button>
            <FunctionallyButtons />
          </div>
          {showFormComment && (
            <div>
              <textarea
                className='mt-2 w-full rounded-md min-h-[100px] outline-none p-2 text-gray-600'
                placeholder='Viết bình luận'></textarea>
              <div className='flex justify-end mt-2+'>
                <button
                  onClick={() => setShowFormComment(false)}
                  className='py-1 px-4 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300'>
                  Hủy
                </button>
                <button className='py-1 px-4 text-gray-700 bg-blue-200 rounded-md ml-3 hover:bg-blue-300'>
                  Thêm bình luận
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <h1 className='mt-3 text-lg font-medium flex'>
        Bạn có biết ai có thể chả lời cho câu hỏi này không?{' '}
      </h1>
      <h2>Có 6 câu Trả Lời: </h2>
      <Answer />
      <AnswersForm />
    </div>
  )
}
DetailsPost.Layout = MainLayout
DetailsPost.sidebarRight = true
DetailsPost.SidebarLeft = true
DetailsPost.requestAuth = false

export default DetailsPost

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: any = await postApi.getAllPost().then((res) => {
    return res
  })
  const paths = posts?.map((post: any) => ({
    params: { slug: post.slug.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = await postApi.getDetails(params?.slug)
  return { props: { post }, revalidate: 60 }
}
