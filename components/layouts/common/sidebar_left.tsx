import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TagModel } from '@/models'
import _ from 'lodash'

import {
  HomeIcon,
  HashtagIcon,
  FireIcon,
  UsersIcon,
  CakeIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks'
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
]
type Props = {}
export function SidebarLeft({}: Props) {
  const { asPath } = useRouter()
  const { profile } = useAuth()
  const {
    data: tags,
    mutate,
    error,
  } = useSWR<Array<TagModel>>(
    `${profile?.name ? '/my/tags-following' : '/tags'}`,
    {
      dedupingInterval: 60 * 60 * 1000,
      revalidateOnFocus: false,
    }
  )
  useEffect(() => {
    mutate()
  }, [profile?.name])
  const renderTags = () => {
    if (tags === undefined && error === undefined) {
      return (
        <>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-7 mr-2 rounded-full' />
          </li>
          <li>
            <div className='animate-pulse bg-gray-300 w-full h-7 mr-2 rounded-full' />
          </li>
        </>
      )
    }
    return _.map(tags, (item) => (
      <li key={item?.id}>
        <Link href={`/tag/${item?.slug}`}>
          <a className='flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white group '>
            <span
              className={`text-${
                item?.color_bg ? item?.color_bg : 'gray'
              }-800`}>
              #
            </span>
            {item?.name}
          </a>
        </Link>
      </li>
    ))
  }
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
        <div>
          <div className='pt-4 mt-4 space-y-2   border-t border-gray-200 dark:border-gray-700'>
            <div>
              <h2 className='text-lg font-bold'>
                {profile?.name ? 'Tag đã theo dõi' : 'Tags phổ biến'}
              </h2>
            </div>
            <ul className='max-h-72 overflow-y-auto'>{renderTags()}</ul>
          </div>
        </div>
      </div>
    </aside>
  )
}
