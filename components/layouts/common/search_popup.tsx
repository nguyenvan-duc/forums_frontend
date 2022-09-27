import React, { useState } from 'react'
import { Fragment } from 'react'
import { Transition, Dialog, Tab } from '@headlessui/react'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function SearchPopup(props: any) {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  })

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
                {/* <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Payment successful
                                </Dialog.Title> */}
                <div className='flex justify-between items-start rounded-t '>
                  <button
                    onClick={() => props.getChangerPopupSearch(false)}
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
                  autoFocus={true}
                  placeholder='Search...'
                  className='w-full outline-none bg-transparent border-l-2 border-l-indigo-200 focus:border-l-indigo-600 text-3xl mt-3 h-16 px-4 py-2'
                />
                <div className='border-b-2 mt-2' />
                <div className='w-full mt-4 sm:px-0'>
                  <Tab.Group>
                    <Tab.List className='flex p-1 space-x-1 bg-gray-50 rounded-xl'>
                      {Object.keys(categories).map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              'w-full py-2.5 text-sm leading-5 font-medium text-indigo-600 rounded-lg',
                              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                              selected
                                ? 'bg-white shadow'
                                : ' text-indigo-300  hover:text-indigo-500'
                            )
                          }>
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className='mt-2'>
                      {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                          key={idx}
                          className={classNames(
                            'bg-white rounded-xl p-3',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                          )}>
                          <ul>
                            {posts.map((post) => (
                              <li
                                key={post.id}
                                className='relative p-3 rounded-md hover:bg-coolGray-100'>
                                <h3 className='text-sm font-medium leading-5'>
                                  {post.title}
                                </h3>

                                <ul className='flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500'>
                                  <li>{post.date}</li>
                                  <li>&middot;</li>
                                  <li>{post.commentCount} comments</li>
                                  <li>&middot;</li>
                                  <li>{post.shareCount} shares</li>
                                </ul>

                                <a
                                  href='#'
                                  className={classNames(
                                    'absolute inset-0 rounded-md',
                                    'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
                                  )}
                                />
                              </li>
                            ))}
                          </ul>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
                <div className='flex justify-end mt-3'>
                  <button className='px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-400 rounded-md'>
                    {'Xem Them...'}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
