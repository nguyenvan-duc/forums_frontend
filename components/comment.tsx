import React, { useState } from 'react'
import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  ArrowsPointingOutIcon,
  ShareIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { ShareButton } from './share_button'
export function Comment(props: any) {
  const [clicked, setClicked] = useState('')

  const handleToggle = (index: any) => {
    if (clicked === index) {
      return setClicked('0')
    }
    setClicked(index)
  }

  return (
    <>
      {clicked == props.id ? (
        <div className='flex mb-3 py-3 bg-gray-100'>
          <div className='w-1/12 flex justify-center '>
            <div className='text-center flex flex-col justify-center items-center'>
              <button onClick={() => setClicked('')} title='Phóng To'>
                <ArrowsPointingOutIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
          <div className='w-11/12 dark:text-gray-800 px-2 border-b border-gray-100'>
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
          <div className='w-1/12 flex justify-center '>
            <ul>
              <li className='text-center flex flex-col justify-center items-center mb-4'>
                <button
                  onClick={() => handleToggle(props.id)}
                  title='Thu nhỏ'
                  className='mb-2'>
                  <MinusIcon className='h-6 w-6' />
                </button>
              </li>
              <li className='text-center flex flex-col justify-center items-center mb-4'>
                <button className='mb-2'>
                  <ChevronUpIcon className='h-6 w-6' />
                </button>
                <span className='mb-2'>0</span>
                <button>
                  <ChevronDownIcon className='h-6 w-6' />
                </button>
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
            <div>
              <span>
                Trả lời bởi: <a href='#'>ducucnv</a>
              </span>{' '}
              - <span>T5, 27/2022 lúc 10:59</span>
            </div>
            <span className='text-xs text-gray-400'>
              Nội dung câu trả lời :
            </span>
            <div className='ml-2'>
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
              <div className='w-full flex items-center text-xs text-orange-400 justify-end px-4'>
                <span className='flex items-center cursor-help'>
                  <ExclamationTriangleIcon className='h-4 w-4 text-orange-400 mr-1' />{' '}
                  Câu trả lời có vấn đề
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
