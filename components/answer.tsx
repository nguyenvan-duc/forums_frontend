import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  MinusIcon,
  ArrowsPointingOutIcon,
  ChatBubbleOvalLeftIcon,
  ArrowUturnRightIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline'
import Zoom from 'react-medium-image-zoom'
import { VoteComponent } from './vote'
import { FunctionallyButtons } from './functionally_buttons'
import { Account } from '@/models'
import { Comment } from '@/models/comment'
import { commentApi } from '@/api-client/comment-api'
import _ from 'lodash'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import format_date from '@/utils/format_date'
import { ComponentRequestAuth } from './layouts/common'
import { useRouter } from 'next/router'
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
  createdAt: string
}
export function Answer({
  id,
  account,
  content,
  voteCount,
  voteType,
  reply,
  post_id,
  bookmark,
  createdAt,
}: AnswerProps) {
  let array = []
  const router = useRouter()
  const [clicked, setClicked] = useState<any>(0)
  const [showFormComment, setShowFormComment] = useState(false)
  const [idCommentReply, setIdCommentReply] = useState<any>()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [replyList, setReplyList] = useState<any>([])
  const { profile, fistLoading } = useAuth()
  const handleToggle = (index: any) => {
    if (clicked === index) {
      return setClicked(0)
    }
    setClicked(index)
  }
  useEffect(() => {
    mergeReply()
  }, [])
  const handleShowFormComment = () => {
    setShowFormComment(true)
  }
  const replyComment = async () => {
    if (value == '') return
    setLoading(true)
    await commentApi
      .replyComment(post_id, value, { id: idCommentReply?.id })
      .then((res: any) => {
        setReplyList([res, ...replyList])
        setValue('')
        setLoading(false)
      })
  }
  const mergeReply = async () => {
    let array: any = []
    const AppendReplyComments = async (reply: any) => {
      if (reply.length == 0) {
        return
      }
      for (let i = 0; i < reply.length; i++) {
        array = [...array, reply[i]]
        console.log(array)
        await AppendReplyComments(reply[i].reply)
      }
    }
    await AppendReplyComments(reply)
    setReplyList(array)
  }

  return (
    <>
      {clicked == id ? (
        <div className='flex mb-3 py-3 bg-gray-200 rounded-md'>
          <div className='w-1/12 flex justify-center '>
            <div className='text-center flex flex-col justify-center items-center'>
              <button onClick={() => setClicked('')} title='Phóng To'>
                <ArrowsPointingOutIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
          <div className='w-11/12 dark:text-gray-800 px-2 border-gray-100'>
            <div className='flex'>
              <span className='mr-2 flex'>
              <img
                    src={account.imageUrl}
                    className='h-6 w-6 rounded-full mr-2'
                  />
                <a >{account.name}</a>
              </span>
              <span className='ml-3 flex items-center text-gray-500'><ArrowUturnRightIcon className='w-3 h-3 text-gray-700 mr-2'/> {replyList.length} câu trả lời</span>
            </div>
          </div>
        </div>
      ) : (
        <div id={`comment-${id}`} className='flex  py-3'>
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
            <div className='flex items-center'>
              <Link href={`/nguoi-dung/${account.username}`}>
                <a className='flex item-center mr-2'>
                  <img
                    src={account.imageUrl}
                    className='h-6 w-6 rounded-full mr-2'
                  />
                  {account.name}
                </a>
              </Link>
              <span className='text-sm text-gray-400'>
                {format_date.formatDate(createdAt)}
              </span>
            </div>
            <span className='text-xs text-gray-400'>
              Nội dung câu trả lời :
            </span>
            <div className='ml-2 mb-2 mt-2'>
              <Zoom>
                <MarkdownPreview source={content} />
              </Zoom>
            </div>
            <div className='flex justify-between'>
              <ComponentRequestAuth>
                <button
                  disabled={!profile?.name}
                  onClick={() => {
                    router.push(`#form-reply-${id}`)
                    handleShowFormComment()
                    setIdCommentReply({
                      id: id,
                      account: account,
                    })
                  }}
                  className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
                  <ChatBubbleOvalLeftIcon className='h-4 w-4 mr-2' />
                  <span>thêm bình luận</span>
                </button>
              </ComponentRequestAuth>

              <FunctionallyButtons
                id={id}
                subject='COMMENT'
                isBookmark={bookmark}
              />
            </div>
            <ul className='my-3'>
              {_.map(
                _.orderBy(replyList, (it) => new Date(it.createdAt), ['asc']),
                (item) => (
                  <li
                    id={`comment-${item?.id}`}
                    key={item?.id}
                    className='text-sm p-2 h-full rounded-md border mb-2'>
                    {id !== item?.parent?.id && (
                      <div className='bg-gray-100 border rounded-md p-2 mb-2'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <img
                              src={item?.parent?.account?.imageUrl}
                              className='h-5 w-5 rounded-full mr-2'
                            />
                            {item?.parent.account?.name}
                          </div>
                          <button
                            onClick={() =>
                              router.push(`#comment-${item?.parent?.id}`)
                            }
                            className='hover:bg-gray-200 p-2 rounded-full'>
                            <ArrowUpIcon className='h-4 w-4 text-gray-800' />
                          </button>
                        </div>
                        <div className='pt-2 max-h-5 cut-text-reply'>
                          <MarkdownPreview source={item?.parent?.content} />
                        </div>
                      </div>
                    )}

                    <div className='flex items-center'>
                      <Link href={`/nguoi-dung/${item?.account?.username}`}>
                        <a className='flex item-center mr-2 text-sm'>
                          <img
                            src={item?.account?.imageUrl}
                            className='h-6 w-6 rounded-full mr-2'
                          />
                          {item?.account?.name}
                        </a>
                      </Link>
                      <span className='text-sm text-gray-400'>
                        {format_date?.formatDate(item.createdAt)}
                      </span>
                    </div>
                    <div className='mt-2 ml-2'>
                      <MarkdownPreview source={item?.content} />
                      <div className='flex justify-end'>
                        <ComponentRequestAuth>
                          <button
                            disabled={!profile?.name}
                            onClick={() => {
                              setShowFormComment(true)
                              setIdCommentReply(item)
                            }}
                            className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
                            <ArrowUturnRightIcon className='h-4 w-4 mr-2' />
                            <span>Trả lời bình luận</span>
                          </button>
                        </ComponentRequestAuth>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
            {showFormComment && (
              <div
                id={`form-reply-${id}`}
                className='p-2 border border-indigo-700 rounded-md top-16 bg-gray-50'>
                <div className='w-full bg-gray-100 border rounded-md p-2 mt-3'>
                  <div className='flex items-center mr-2'>
                    <ArrowUturnRightIcon className='w-4 h-4 mr-2' />
                    <div className='flex items-center'>
                      <img
                        src={idCommentReply?.account?.imageUrl}
                        className='h-5 w-5 rounded-full mr-2'
                      />
                      {idCommentReply?.account?.name}
                    </div>
                  </div>
                </div>

                <textarea
                  value={value}
                  onChange={(value) => setValue(value.target.value)}
                  className='mt-2 w-full rounded-md min-h-[100px] border  outline-none p-2 text-gray-600'
                  placeholder='Viết bình luận'/>
                <div className='flex justify-end mt-2'>
                  <button
                    disabled={loading}
                    onClick={() => setShowFormComment(false)}
                    className='py-1 px-4 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300'>
                    Hủy
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => replyComment()}
                    className='py-1 px-4 text-gray-700 bg-blue-200 rounded-md ml-3 hover:bg-blue-300'>
                    {loading ? 'Đang gửi' : 'Thêm bình luận'}
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
