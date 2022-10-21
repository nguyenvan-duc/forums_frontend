import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ShareIcon } from '@heroicons/react/24/outline'
import { NextPageWithLayout } from '@/models'
import { MainLayout } from '@/components/layouts'
import { useAuth } from '@/hooks'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
type Props = {}

const Notifications: NextPageWithLayout = (props: Props) => {
  const { login } = useAuth()
  return (
    <>
      <div className=' min-h-screen  max-w-xl mt-4 m-auto'>
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
      </div>
    </>
  )
}
Notifications.Layout = MainLayout
Notifications.sidebarRight = false
Notifications.SidebarLeft = false
Notifications.requestAuth = true
export default Notifications
