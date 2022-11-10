import React, { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layouts'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { FunctionallyButtons, VoteComponent } from '@/components'
import { PostModel } from '@/models'
import { postApi } from '@/api-client'
import { GetStaticPaths, GetStaticProps, NextPageContext } from 'next'
import { Loader } from '@/components/layouts/common'
import { AnswerOfPost } from '@/components/answer_of_post'
import format_date from '@/utils/format_date'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
export interface IPropType {
  post: PostModel
  slug: string
}
const DetailsPost = ({ post, slug }: any) => {
  const router = useRouter()
  const [detailPost, setDetailsPost] = useState<PostModel>()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fetchData = async () => {
    await postApi.getDetails(slug).then((res: any) => {
      setDetailsPost(res)
      setLoader(false)
    })
  }
  if (router.isFallback) {
    return <Loader />
  }
  if (!post) return null
  return (
    <div className='md:border-x px-2 w-full h-full  bg-gray-50 border pb-3 rounded-md'>
      <div className='w-full border-b py-3 border-gray-40 px-2'>
        <div className='flex items-center'>
          <div className='flex items-center'>
            <Link href={`/nguoi-dung/${post?.account?.username}`}>
              <a className='flex items-center text-sm font-[500] hover:underline mr-2'>
                <img
                  className='h-8 w-8 rounded-full mr-1'
                  src={post?.account?.imageUrl}
                />
                {post?.account?.name}
              </a>
            </Link>
            <span className='text-sm text-gray-500'>
              {format_date.formatDate(post.createdAt)}
            </span>
          </div>
        </div>
        <h1 className='text-4xl dark:text-gray-800 font-[500] mb-3 mt-2'>
          {post?.title}
        </h1>
        <div className='flex flex-wrap mb-2  justify-starts items-center mt-2 mb-3'>
          {_.map(post.tags, (item) => (
            <Link href={`/tag/${item?.slug}`} key={item.id}>
              <a className='text-sm mr-2 py-1 px-1.5 text-gray-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md'>
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex  py-3'>
        <div className='w-1/12 relative'>
          <VoteComponent
            id={post?.id}
            loader={loader}
            subjectVote='POST'
            voteCount={detailPost?.voteCount as number}
            userVote={detailPost?.voteType as string}
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
          <div className='flex justify-end'>
            <FunctionallyButtons
              id={post?.id}
              isBookmark={detailPost?.bookmark as boolean}
              subject='POST'
            />
          </div>
        </div>
      </div>
      <AnswerOfPost id={post?.id} />
    </div>
  )
}
DetailsPost.Layout = MainLayout
DetailsPost.sidebarRight = true
DetailsPost.SidebarLeft = true
DetailsPost.requestAuth = false

export default DetailsPost

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: any = await postApi.getAllPostForStaticProps().then((res) => {
    return res
  })
  const paths = posts?.map((post: any) => ({
    params: { slug: post.slug.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: any) => {
  let slug = params?.slug
  const post = await postApi.getDetails(slug).then((res) => {
    return res
  })
  return {
    props: {
      post,
      slug,
    },
    revalidate: 60,
  }
}
