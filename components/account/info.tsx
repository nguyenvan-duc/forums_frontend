import React, { Fragment, useEffect, useState } from 'react'
import {
  UserIcon,
  CogIcon,
  BriefcaseIcon,
  UsersIcon,
  PencilSquareIcon,
  ChatBubbleBottomCenterIcon,
  TagIcon,
} from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import { Tab, Menu, Transition } from '@headlessui/react'
import { accountApi } from '@/api-client/account-api'
import { Profile } from '@/models'
import _ from 'lodash'
import format_date from '@/utils/format_date'
import { Posts } from '../posts'
import Link from 'next/link'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
type UseInfoPageProps = {
  info?: Profile
  contacts?: any[]
  badges?: any[]
  comments?: any[]
  posts?: any[]
  loading?: boolean
  isMe?: boolean
}

function classNames(...classNamees: any) {
  return classNamees.filter(Boolean).join(' ')
}
export function UseInfo({
  info,
  badges,
  contacts,
  posts,
  comments,
  loading,
  isMe,
}: UseInfoPageProps) {
  const [githubInfo, setGithubInfo] = useState<any>()
  useEffect(() => {
    if (info?.github_username) {
      fetchGithubInfoData()
    }
  }, [info?.github_username])
  const fetchGithubInfoData = async () => {
    await accountApi
      .githubInfo(info?.github_username as string)
      .then((res: any) => {
        setGithubInfo(res?.data)
      })
  }
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className='w-full mt-5 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center pb-10 pt-10'>
              <div className='animate-pulse bg-gray-300 w-24 h-24 rounded-full mb-3' />
              <div className='animate-pulse bg-gray-300 w-52 h-8 rounded-md' />
            </div>
          </div>
          <div className='md:flex mt-5 '>
            <div className='w-full md:w-1/4'>
              <div className='rounded-lg border bg-white mb-3 '>
                <div className='animate-pulse bg-gray-300 w-full h-32 rounded-md' />
              </div>
              <div className='rounded-lg border bg-white mb-3 '>
                <div className='animate-pulse bg-gray-300 w-full h-32 rounded-md' />
              </div>
            </div>
            <div className='w-full md:w-3/4 md:pl-3'>
              <div className='bg-white w-full rounded-md border'>
                <div className='w-full px-3 py-3 text-lg font-medium border-b'>
                  Ý kiến đóng góp gần đây.
                </div>
                <div className='animate-pulse bg-gray-300 w-full h-16 border-b' />
                <div className='animate-pulse bg-gray-300 w-full h-16 border-b' />
              </div>
              <h2 className='text-lg font-semibold mt-3 mb-2'>Bài đăng</h2>
              <div>
                {Array.from(Array(3), (e, i) => {
                  return (
                    <>
                      <div className='overflow-hidden border border-gray-300 md:rounded-md w-full mb-4 m-auto'>
                        <div className='w-full block h-full'>
                          {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
                          <div className='bg-white hover:bg-gray-50 hover:dark:bg-gray-600 dark:bg-gray-800 w-full p-4'>
                            <div className='animate-pulse  bg-gray-300 w-72 rounded-md h-8' />
                            <div className='flex flex-wrap mb-2  justify-starts items-center mt-2'>
                              <div className='animate-pulse  bg-gray-300 w-96 rounded-md h-8' />
                            </div>
                            <div className='flex justify-between items-end'>
                              <div className='animate-pulse  bg-gray-300 w-[70%] rounded-md h-16' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        <div className='w-full md:mt-5 bg-white md:rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex justify-end px-4 pt-4'>
            {isMe ? (
              <>
                <Link href={'/tai-khoan/cai-dat'}>
                  <a
                    id='dropdownButton'
                    data-dropdown-toggle='dropdown'
                    className='py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md'
                    type='button'>
                    Chỉnh sửa
                  </a>
                </Link>
              </>
            ) : (
              ''
            )}
          </div>
          <div className='flex flex-col items-center pb-10'>
            {info?.avatar ? (
              <img
                className='w-24 h-24 object-cover rounded-full'
                src={info?.avatar}
                alt={info?.name}
              />
            ) : (
              <div className='w-24 h-24 rounded-full flex text-3xl justify-center items-center bg-yellow-600 text-white'>
                {info?.name[0]}
              </div>
            )}
            <h5 className='mb-1 text-2xl font-medium text-gray-900 dark:text-white'>
              {info?.name}
            </h5>
            <span className='text-sm text-gray-500'>@{info?.username}</span>
            <p className='text-lg text-gray-700 w-full md:max-w-2xl m-auto dark:text-gray-400 text-center'>
              {info?.bio}
            </p>
            <div className='flex mt-4 items-center justify-center'>
              <div className='text-gray-600'>
                Đã tham gia vào{' '}
                <span className='font-medium'>
                  {format_date?.formatDMY(info?.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='md:flex mt-5 '>
          <div className='w-full md:w-1/4'>
            <div className='rounded-lg border bg-white mb-5'>
              <div className='py-3 px-3 border-b border-gray-300'>
                <h3 className='font-medium text-gray-700 text-md'>
                  Thông tin tài khoản
                </h3>
              </div>
              <div className='px-3 py-3'>
                <div className='w-full py-2 px-2 text-gray-700 font-medium flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0'
                    />
                  </svg>
                  {info?.reputation} Điểm nổi tiếng
                </div>
                <div className='w-full py-2 px-2 text-gray-700 font-medium flex items-center'>
                  <PencilSquareIcon className='w-5 h-5 mr-2' />
                  {info?.post_count} Bài đăng
                </div>
                <div className='w-full py-2 px-2 text-gray-700 font-medium flex items-center'>
                  <ChatBubbleBottomCenterIcon className='w-5 h-5 mr-2' />
                  {info?.comment_count} Ý kiến đóng góp
                </div>
                <div className='w-full py-2 px-2 text-gray-700 font-medium flex items-center'>
                  <TagIcon className='w-5 h-5 mr-2' />
                  {info?.tag_flowing_count} Tags đang theo dõi
                </div>
              </div>
            </div>
            <div className='rounded-lg border bg-white mb-5 '>
              <div className='py-3 px-3 border-b border-gray-300'>
                <h3 className='font-medium text-gray-700 text-md'>Danh hiệu</h3>
              </div>
              <div className='px-3 py-3 text-gray-600'>
                {badges?.length == 0 ? (
                  <div className='text-center'>chưa có danh hiệu nào!</div>
                ) : (
                  _.map(badges, (item) => <></>)
                )}
              </div>
            </div>
            <div className='rounded-lg border bg-white mb-3 '>
              <div className='py-3 px-3 border-b border-gray-300'>
                <h3 className='font-medium text-gray-700 text-md'>
                  Kỹ năng/Ngôn ngữ lập trình
                </h3>
              </div>
              <div className='px-3 py-3 text-gray-600'>
                {!info?.skill ? (
                  <div className='text-center'>chưa được thêm!</div>
                ) : (
                  info?.skill
                )}
              </div>
            </div>
            {info?.github_username && (
              <div className='rounded-lg border bg-white mb-5'>
                <div className='py-3 px-3 border-b border-gray-300'>
                  <h3 className='font-medium text-gray-700 text-md'>
                    Thông tin Github
                  </h3>
                </div>
                <div className='px-3 border-b border-gray-300'>
                  <div className='w-full py-2 px-2 text-gray-700 font-medium flex items-center'>
                    <BriefcaseIcon className='w-5 h-5 mr-2' />
                    {githubInfo?.public_repos} Dự án
                  </div>
                  <div className='w-full py-2 px-2 text-gray-700 font-medium flex items-center'>
                    <UsersIcon className='w-5 h-5 mr-2' />
                    {githubInfo?.followers} Người theo dõi
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='w-full md:w-3/4 md:pl-5'>
            <div className='bg-white w-full rounded-md border'>
              <div className='w-full px-3 py-3 text-lg font-medium border-b'>
                Ý kiến đóng góp gần đây.
              </div>
              {comments?.length == 0 ? (
                <div className='text-center text-gray-600 my-4'>
                  Không có gì!
                </div>
              ) : (
                _.map(comments, (item) => (
                  <Link href={`/bai-dang/${item?.post?.slug}?to_comment=comment-${item?.id}`} key={item?.id}>
                    <a>
                      <div className='py-3 px-3 border-b hover:bg-gray-50'>
                        <h3 className='text-lg font-semibold'>
                          {item?.post?.title}
                        </h3>
                        <div className='cut-text-reply'>
                          <MarkdownPreview source={item?.content} />
                        </div>
                      </div>
                    </a>
                  </Link>
                ))
              )}
            </div>
            <h2 className='text-lg font-semibold mt-5 mb-2'>Bài đăng</h2>
            <div className='border border-gray-200 bg-white mb-5 rounded-lg overflow-hidden'>
              {posts?.length == 0 ? (
                <div className='text-center text-gray-600 mt-4'>
                  Không có gì!
                </div>
              ) : (
                _.map(posts, (item) => (
                  <Posts
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    slug={item.slug}
                    tags={item.tags}
                    content={item.content}
                    voteCount={item.voteCount}
                    commentCount={item.commentCount}
                    isBookmark={item.bookmark}
                    author={item.account}
                    createdAt={item.createdAt}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
  return renderContent()
}
