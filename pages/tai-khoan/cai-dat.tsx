import React from 'react'
import { UserIcon, CogIcon } from '@heroicons/react/24/outline'
import { Tab } from '@headlessui/react'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import { ChangeAdvancedInfo, ChangeBaseInfo } from '@/components/account'
type Props = {}
function classNames(...classNamees: any) {
  return classNamees.filter(Boolean).join(' ')
}
const Settings: NextPageWithLayout = (props: Props) => {
  return (
    <>
      <div className='flex  container mx-auto  md:w-5/6 w-11/12 '>
        <Tab.Group>
          <Tab.List className='w-64 px-2 py-6 hidden md:block'>
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
          <Tab.Panels className='w-3/4 px-3 py-6 hidden md:block'>
            <Tab.Panel>
            <ChangeBaseInfo/>
            <ChangeAdvancedInfo/>
            </Tab.Panel>
            <Tab.Panel>
              <div className='p-6  bg-white w-full mb-4 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
                <form>
                  <div className='mb-6'>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Mật Khẩu Cũ
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name@flowbite.com'
                      required
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Mật Khẩu Mới
                    </label>
                    <input
                      type='password'
                      id='password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Nhập Lại Mật Khẩu
                    </label>
                    <input
                      type='password'
                      id='password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required
                    />
                  </div>
                  <button
                    type='submit'
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Submit
                  </button>
                </form>
              </div>
              <div className='p-6  bg-white w-full rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
                <a href='#'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-red-600 dark:text-white'>
                    Xoá Tài Khoản
                  </h5>
                </a>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href='#'
                  className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  Xoá Tài Khoản
                </a>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}

Settings.Layout = MainLayout
Settings.sidebarRight = false
Settings.SidebarLeft = false
Settings.requestAuth = true

export default Settings
