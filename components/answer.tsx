import React, { useState } from 'react'
import {
  MinusIcon,
  ArrowsPointingOutIcon,
  ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline'
import { ShareButton } from './share_button'
import { VoteComponent } from './vote'
import { FunctionallyButtons } from './functionally_buttons'
export function Answer(props: any) {
  const [clicked, setClicked] = useState('')
  const [showFormComment, setShowFormComment] = useState(false)

  const handleToggle = (index: any) => {
    if (clicked === index) {
      return setClicked('0')
    }
    setClicked(index)
  }
  const handleShowFormComment = (e: any) => {
    e.preventDefault()
    setShowFormComment(true)
  }

  return (
    <>
      {clicked == props.id ? (
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
                Trả lời bởi: <a href='#'>ducucnv</a>
              </span>{' '}
              - <span>T5, 27/2022 lúc 10:59</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex  py-3'>
          <div className='w-1/12 relative'>
            <button
              onClick={() => handleToggle(props.id)}
              title='Thu nhỏ'
              className='mb-2 w-full flex justify-center pb-4'>
              <MinusIcon className='h-6 w-6' />
            </button>
            <VoteComponent voteCount={20} userVote={"UPVOTE"} />
          </div>
          <div className='w-11/12 dark:text-gray-800 px-2 border-b border-gray-200 pb-1'>
            <div>
              <span>
                Trả lời bởi: <a href='#'>u/ducucnv</a>
              </span>{' '}
              - <span>T5, 27/2022 lúc 10:59</span>
            </div>
            <span className='text-xs text-gray-400'>
              Nội dung câu trả lời :
            </span>
            <div className='ml-2 mb-2'>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
                doloribus nisi vero obcaecati, cupiditate nostrum quae saepe,
                facere praesentium exercitationem numquam iusto facilis natus
                fugit dicta nulla? Velit, eaque repellendus.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
                doloribus nisi vero obcaecati, cupiditate nostrum quae saepe,
                facere praesentium exercitationem numquam iusto facilis natus
                fugit dicta nulla? Velit, eaque repellendus.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
                doloribus nisi vero obcaecati, cupiditate nostrum quae saepe,
                facere praesentium exercitationem numquam iusto facilis natus
                fugit dicta nulla? Velit, eaque repellendus.
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
                doloribus nisi vero obcaecati, cupiditate nostrum quae saepe,
                facere praesentium exercitationem numquam iusto facilis natus
                fugit dicta nulla? Velit, eaque repellendus.
              </p>
              {props.content}
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
                    <button onClick={()=>setShowFormComment(false)} className='py-1 px-4 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300'>
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
      )}
    </>
  )
}
