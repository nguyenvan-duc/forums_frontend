import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Transition, Dialog, Tab } from '@headlessui/react'
import { appApi } from '@/api-client'
import format_date from '@/utils/format_date'

import _ from 'lodash'
import Link from 'next/link'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function SearchPopup(props: any) {
  const [keyword, setKeyword] = useState('')
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keyword.length > 0) {
        fetchData()
      }
      setResult([])
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [keyword])
  const fetchData = async () => {
    setLoading(true)
    await appApi.searchPosts(keyword, 5).then((res: any) => {
      setLoading(false)
      setResult(res)
    })
  }
  const renderData = () => {
    if (loading) {
      return (
        <>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </li>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </li>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </li>
        </>
      )
    }
    if (result.length <= 0 && keyword.length == 0) {
      return (
        <li className='text-center py-5'>
          Không có kết quả
        </li>
      )
    }
    return _.map(result, (item: any) => (
      <li
      onClick={()=>props.getChangerPopupSearch(false)}
        key={item?.slug}
        className='relative p-3 rounded-md hover:bg-coolGray-100 hover:bg-gray-100'>
        <h3 className='text-sm font-medium leading-5'>{item.title}</h3>
        <ul className='flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500'>
          <li>{format_date.formatDate(item?.createdAt)}</li>
          <li>&middot;</li>
          <li>{item?.comment_count} Bình luận</li>
          <li>&middot;</li>
          <li>{item?.vote_count} Đánh giá</li>
          <li>&middot;</li>
          <li>{item?.bookmark_count} Bookmark</li>
        </ul>
        <Link href={`/bai-dang/${item?.slug}`}>
          <a
            className={classNames(
              'absolute inset-0 rounded-md',
              'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
            )}
          />
        </Link>
      </li>
    ))
  }
  return (
    <>
      <Transition appear show={props.searchIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 bg-blend-hue overflow-y-auto'
          onClose={() => props.getChangerPopupSearch(false)}>
          <div className='min-h-screen px-4 text-center bg-black bg-opacity-40 '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed' />
            </Transition.Child>
            <span className='inline-block  h-screen align-top'>&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <div className='inline-block w-full max-w-3xl p-6 my-28 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <div className='flex justify-between items-start rounded-t '>
                  <button
                    onClick={() => {
                      props.getChangerPopupSearch(false)
                    }}
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    data-modal-toggle='defaultModal'>
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'></path>
                    </svg>
                  </button>
                </div>
                <input
                  value={keyword}
                  onChange={(value) => setKeyword(value.target.value)}
                  autoFocus={true}
                  placeholder='Search...'
                  className='w-full outline-none bg-transparent border-l-2 border-l-indigo-200 focus:border-l-indigo-600 text-3xl mt-3 h-16 px-4 py-2'
                />
                <div className='border-b-2 mt-2' />
                <div className='w-full mt-4 sm:px-0 '>
                  <div className='mb-3'>Kết quả tìm kiếm:</div>
                  <ul>{renderData()}</ul>
                </div>
                {/* <div className='flex justify-end mt-3'>
                  <a className=' text-blue-500 hover:underline hover:cursor-pointer'>
                    Xem thêm
                  </a>
                </div> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
