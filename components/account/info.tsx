import React, { Fragment } from 'react'
import { UserIcon, CogIcon } from '@heroicons/react/24/outline'
import { Tab, Menu, Transition } from '@headlessui/react'

type UseInfoPageProps ={
    name:string,
    avatar:string
}

function classNames(...classNamees: any) {
  return classNamees.filter(Boolean).join(' ')
}
export function UseInfo() {
  return (
    <>
      <div className='w-full mt-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex justify-end px-4 pt-4'>
          <button
            id='dropdownButton'
            data-dropdown-toggle='dropdown'
            className='hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5'
            type='button'>
            <svg
              className='w-6 h-6'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
            </svg>
          </button>

          <div
            id='dropdown'
            className='hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700'>
            <ul className='py-1' aria-labelledby='dropdownButton'>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                  Edit
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col items-center pb-10'>
          <img
            className='mb-3 w-24 h-24 rounded-full shadow-lg'
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            alt='Bonnie image'
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            Bonnie Green
          </h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Visual Designer
          </span>
          <div className='flex mt-4 space-x-3 lg:mt-6'>
            <a
              href='#'
              className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              Add friend
            </a>
            <a
              href='#'
              className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800'>
              Message
            </a>
          </div>
        </div>
      </div>
      <div className='flex mt-3'>
        <Tab.Group>
          <Tab.List className='w-64 px-2 py-6 hidden md:block h-64 rounded-lg shadow-md'>
            <Tab
              className={({ selected }) =>
                classNames(
                  'flex w-full items-center p-2 text-sm font-normal mb-3 text-gray-900 transition',
                  ' duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group',
                  selected ? 'bg-white shadow' : '  hover:text-black'
                )
              }>
              <UserIcon className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
              <span className='ml-3'>Thông Tin Tài Khoản</span>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'flex w-full items-center p-2 text-sm font-normal text-gray-900 transition',
                  ' duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group',
                  selected ? 'bg-white shadow' : '  hover:text-black'
                )
              }>
              <CogIcon className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
              <span className='ml-3'>Cài Đặt Tài Khoản</span>
            </Tab>
          </Tab.List>
          <Tab.Panels className='w-3/4 px-3  hidden md:block'>
            <Tab.Panel>
              <div className='p-6 bg-white flex justify-between items-center w-full rounded-lg mb-1 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
                <div>
                  <h1 className='font-semibold text-lg'>This is Notify</h1>
                  <p>This is description</p>
                </div>

                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='p-2 rounded-full text-gray-500 hover:bg-indigo-100  border'>
                      <svg
                        className='w-6 h-6'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}>
                            Facebook
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </Tab.Panel>
            <Tab.Panel></Tab.Panel>
            <div className='p-6 bg-white flex justify-between items-center w-full rounded-lg mb-1 border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
              <div>
                <h1 className='font-semibold text-lg'>This is Notify</h1>
                <p>This is description</p>
              </div>

              <Menu as='div' className='ml-3 relative'>
                <div>
                  <Menu.Button className='p-2 rounded-full text-gray-500 hover:bg-indigo-100  border'>
                    <svg
                      className='w-6 h-6'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z'></path>
                    </svg>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'>
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                          Facebook
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
