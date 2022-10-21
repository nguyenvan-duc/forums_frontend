import Link from 'next/link'
import _ from 'lodash'

import { useRouter } from 'next/router'
import { TagModel } from '@/models'
import { Account } from '@/models/account'
import HeroIcon from './hero_icon'
interface PostProps {
  title?: string
  slug?: string
  tags?: Array<TagModel>
  content?: string
  author?: Account
  createdAt?: string
  isBookmark?: boolean
  commentCount?: number
  voteCount?: number
}
export function Posts({
  title,
  slug,
  tags,
  content,
  author,
  createdAt,
  commentCount,
  voteCount,
  isBookmark,
}: PostProps) {
  const route = useRouter()
  return (
    <>
      <div className='overflow-hidden border border-gray-300 md:rounded-md w-full mb-4 m-auto'>
        <div className='w-full block h-full'>
          {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
          <div className='bg-white hover:bg-gray-50 hover:dark:bg-gray-600 dark:bg-gray-800 w-full p-4'>
            <Link href={`/bai-dang/[slug]`} as={`/bai-dang/${slug}`}>
              <a className='text-gray-800 dark:text-white text-xl font-medium mb-2 hover:text-indigo-600'>
                {title}
              </a>
            </Link>
            <div className='flex flex-wrap mb-2  justify-starts items-center mt-2'>
              {_.map(tags, (item) => (
                <Link href='#' key={item.id}>
                  <a className='text-xs mr-2 py-1 px-1.5 text-gray-500 bg-blue-50 hover:bg-blue-100 rounded-md'>
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            <Link href={'/posts/ask/ask'}>
              <a className='text-gray-600 truncate w-full mt-2 dark:text-gray-300 font-light text-sm'>
                {/* {content} */}
              </a>
            </Link>
            <div className='flex justify-between items-end'>
              <div className='flex items-center mt-4'>
                <a href='#' className='block relative'>
                  <img
                    alt={author?.name}
                    src={author?.imageUrl}
                    className='mx-auto object-cover rounded-full h-6 w-6 '
                  />
                </a>
                <div className='flex flex-col justify-between ml-4 text-xs'>
                  <Link href={`/nguoi-dung/${author?.username}`}>
                    <a className='text-gray-800 hover:underline dark:text-white'>
                      {author?.name}
                    </a>
                  </Link>
                  <p className='text-gray-400 dark:text-gray-300'>
                    {createdAt}
                  </p>
                </div>
              </div>
              <div className='flex items-center mt-4 text-sm text-gray-600'>
                <Link href='#'>
                  <a className='flex items-center mr-4 p-2 hover:bg-gray-100 rounded-md'>
                    {/* <ChevronUpIcon className='h-5 w-5 mr-1' /> */}
                    <span>{voteCount} Đánh giá</span>
                  </a>
                </Link>
                <Link href='#'>
                  <a className='flex items-center p-2 mr-4 hover:bg-gray-100 rounded-md'>
                    {/* <ChatBubbleOvalLeftIcon className='h-5 w-5 mr-1' />{' '} */}
                    <span>{commentCount} Bình luận</span>
                  </a>
                </Link>
                <button className='p-3 hover:bg-indigo-100 rounded-full'>
                  <HeroIcon
                    name='BookmarkIcon'
                    className='h-4 w-4'
                    outline={isBookmark}
                  />
                </button>
              </div>
            </div>
            <div className='mt-2 p-2 bg-blue-50 rounded-md'>
              <p className='text-sm mb-1'>câu trả lời hữu ích nhất:</p>
              This question shows research effort; it is useful and clear 0 I
              have a requirement to calculate active users in a given a month
              and year by the user type. I have date range for each user with
              start date and end date. A user with an open ended date is an
              active user and has to be counted from the beginning of time till
              current date (year month).
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
