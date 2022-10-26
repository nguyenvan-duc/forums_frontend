import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  MinusIcon,
  ArrowsPointingOutIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline'
import { ShareButton } from './share_button'
import { VoteComponent } from './vote'
import { FunctionallyButtons } from './functionally_buttons'
import { Account } from '@/models'
import { Comment } from '@/models/comment'
import { commentApi } from '@/api-client/comment-api'
import _ from 'lodash'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
interface AnswerProps {
  id: number
  content: string
  account: Account
  voteType: string
  voteCount: number
  vote: boolean
  reply: Array<Comment>
  bookmark: boolean
  post_id: number
}
export function Answer({
  id,
  account,
  content,
  voteCount,
  voteType,
  reply,
  post_id,
}: AnswerProps) {
  const [clicked, setClicked] = useState<any>(0)
  const [showFormComment, setShowFormComment] = useState(false)
  const [value, setValue] = useState('')
  const [replyList, setReplyList] = useState(reply)
  const handleToggle = (index: any) => {
    if (clicked === index) {
      return setClicked(0)
    }
    setClicked(index)
  }
  const handleShowFormComment = (e: any) => {
    e.preventDefault()
    setShowFormComment(true)
  }
  const replyComment = async () => {
    if (value == '') return
    await commentApi.replyComment(post_id, value, { id }).then((res: any) => {
      setReplyList([res, ...replyList])
      setValue('')
    })
  }

  return (
    <>
      {clicked == id ? (
        <div className='flex mb-3 py-3 bg-gray-200'>
          <div className='w-1/12 flex justify-center '>
            <div className='text-center flex flex-col justify-center items-center'>
              <button onClick={() => setClicked('')} title='Phóng To'>
                <ArrowsPointingOutIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
          <div className='w-11/12 dark:text-gray-800 px-2 border-gray-100'>
            <div>
              <span>
                Trả lời bởi: <a href='#'>{account.name}</a>
              </span>{' '}
              - <span>T5, 27/2022 lúc 10:59</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex  py-3'>
          <div className='w-1/12 relative'>
            <button
              onClick={() => handleToggle(id)}
              title='Thu nhỏ'
              className='mb-2 w-full flex justify-center pb-4'>
              <MinusIcon className='h-6 w-6' />
            </button>
            <VoteComponent
              id={id}
              voteCount={voteCount}
              userVote={voteType}
              subjectVote='COMMENT'
              getNotify={false}
            />
          </div>
          <div className='w-11/12 dark:text-gray-800 px-2 border-b border-gray-200 pb-1'>
            <div>
              <span>
                Trả lời bởi: <a href='#'>{account.name}</a>
              </span>{' '}
              - <span>T5, 27/2022 lúc 10:59</span>
            </div>
            <span className='text-xs text-gray-400'>
              Nội dung câu trả lời {id}:
            </span>
            <div className='ml-2 mb-2'>
              <MarkdownPreview source={content} />
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
            <ul className='my-3'>
              {_.map(replyList, (item) => (
                <li
                  key={item?.id}
                  className='text-sm p-2 h-full bg-gray-100 border mb-2'>
                  trả lời bởi: {item.account.username}
                  <div className='mt-2 ml-2'>{item?.content}</div>
                </li>
              ))}
            </ul>
            {showFormComment && (
              <div>
                <textarea
                  onChange={(value) => setValue(value.target.value)}
                  className='mt-2 w-full rounded-md min-h-[100px] outline-none p-2 text-gray-600'
                  placeholder='Viết bình luận'>
                  {value}
                </textarea>
                <div className='flex justify-end mt-2'>
                  <button
                    onClick={() => setShowFormComment(false)}
                    className='py-1 px-4 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300'>
                    Hủy
                  </button>
                  <button
                    onClick={() => replyComment()}
                    className='py-1 px-4 text-gray-700 bg-blue-200 rounded-md ml-3 hover:bg-blue-300'>
                    Thêm bình luận
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
