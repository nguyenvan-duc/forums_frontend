import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  HomeIcon,
  HashtagIcon,
  FireIcon,
  UsersIcon,
  CakeIcon,
} from '@heroicons/react/24/outline'
const menu = [
  {
    title: 'Trang Chủ',
    href: '/',
    icon: HomeIcon,
  },
  {
    title: 'Thẻ',
    href: '/tags',
    icon: HashtagIcon,
  },
  {
    title: 'Thành Viên',
    href: '/users/',
    icon: UsersIcon,
  },
]
type Props = {}
export function SidebarLeft({}: Props) {
  const { asPath } = useRouter()
  return (
    <aside className='w-full min-w-[200px]'>
      <div className='px-3 py-4 overflow-y-auto  '>
        <ul className='space-y-2'>
          {menu.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <a
                  className={
                    asPath === item.href
                      ? 'flex items-center p-2 text-sm font-normal text-gray-900 border-l-4 border-indigo-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'flex items-center p-2 text-sm font-normal text-gray-900 hover:border-l-4 hover:border-indigo-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }>
                  <item.icon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                  <span className='ml-3'>{item.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className='pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700'>
          {/* <li>
            <Link href={"/donate"}>  
            <a className="flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
              <CakeIcon className="h-6 w-6"/>
              <span className="ml-4">Ủng Hộ Tôi</span>
            </a>
            </Link>
          
          </li> */}
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
                <path
                  fillRule='evenodd'
                  d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                  clipRule='evenodd'></path>
              </svg>
              <span className='ml-3'>Privacy Policy</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z'></path>
              </svg>
              <span className='ml-3'>Terms of use</span>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'>
              <svg
                className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z'
                  clipRule='evenodd'></path>
              </svg>
              <span className='ml-3'>Help</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}
