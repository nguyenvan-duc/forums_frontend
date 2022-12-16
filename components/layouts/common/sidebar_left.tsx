import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TagModel } from '@/models'
import _ from 'lodash'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
import {
  HomeIcon,
  HashtagIcon,
  FireIcon,
  UsersIcon,
  TagIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks'
import { useTagsFollow } from '@/hooks/use-tag'
import { TagForSidebar } from '@/components/tags_for_sidebar'
const menu = [
  {
    title: 'Trang Chủ',
    href: '/',
    icon: HomeIcon,
  },
  {
    title: 'Hỏi đáp',
    href: '/tag/hoi-dap',
    icon: QuestionMarkCircleIcon
    ,
  },
  {
    title: 'Thảo luận',
    href: '/tag/thao-luan',
    icon: ChatBubbleLeftRightIcon
    ,
  },
  {
    title: 'Chủ đề',
    href: '/tags',
    icon: TagIcon,
  },
  {
    title: 'Người dùng',
    href: '/nguoi-dung',
    icon: UsersIcon,
  },
  {
    title: 'Giới thiệu',
    href: '/tags',
    icon: FireIcon,
  }
]
type Props = {}
export function SidebarLeft({}: Props) {
  const { asPath } = useRouter()
  return (
    <aside className='w-full sticky top-5 z-10 mt-5 bg-white border rounded-lg'>
      <div className='px-3 py-4 overflow-y-auto relative '>
        <ul className='space-y-2'>
          {menu.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <a
                  className={
                    classNames('flex items-center p-2 text-sm font-normal text-gray-900 hover:border-l-4 hover:border-indigo-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700',asPath == item.href && ('border-l-4 border-indigo-600 font-bold text-black font-bold'))
                  }>
                  <item.icon className={classNames('w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white',asPath == item.href && ('font-bold text-black') )} />
                  <span className='ml-3'>{item.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <div className='pt-4 mt-4 space-y-2   border-t border-gray-200 dark:border-gray-700'>
            <TagForSidebar/>
          </div>
        </div>
      </div>
    </aside>
  )
}
