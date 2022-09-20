import React, { useState, Fragment } from 'react'
import Link from 'next/link'
import { useHotkeys  } from 'react-hotkeys-hook'
import { useRouter } from 'next/router'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  UserIcon,
} from '@heroicons/react/24/outline'

import { useAuth } from '@/hooks'
import { SearchPopup } from '@/components/layouts/common'
import { LoginModal } from '@/components/login/login_modal'

type NavbarProps = {}
function classNames(...classes: any) {
  return classes.filter(Boolean).join('')
}
export function Navbar({}: NavbarProps) {
  const { profile, logout, fistLoading } = useAuth()
  const { asPath, push, reload } = useRouter()
  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const getChangerPopupSearch = (status: any) => {
    setSearchIsOpen(status)
  }
  useHotkeys('ctrl+alt+k', () => setSearchIsOpen(true))
  const menu = [
    { title: 'Trang Chủ', href: '/', current: asPath === '/' },
    { title: 'Thẻ', href: '/tags', current: asPath === '/tags/' },
    { title: 'Thành Viên', href: '/users', current: asPath === '/users/' },
  ]
  const handleLogout = async () => {
    await logout()
    await reload()
  }

  const AccountInfo = () => {
    if (fistLoading) {
      return (
        <>
          <div className='flex  animate-pulse flex-row items-center h-full justify-center space-x-5'>
            <div className='w-10 bg-gray-300 h-10 rounded-full mr-2 md:mr-0'></div>
            <div className=' flex-col space-y-3 hidden md:flex'>
              <div className='w-36 bg-gray-300 h-6 rounded-md '></div>
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        {!profile?.name && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <button
              onClick={() => setOpenLoginModal(true)}
              className='flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 outline-0 shadow-none'>
              <UserIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
              <span className='hidden md:block ml-2'>Đăng nhập / Đăng ký</span>
            </button>
          </div>
        )}
        {profile?.name && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <Link href={'/posts/new'}>
              <a className=' hidden md:inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <PlusIcon
                  className='-ml-1 mr-2 h-5 w-5 text-gray-500'
                  aria-hidden='true'
                />
                Đặt Câu Hỏi
              </a>
            </Link>
            <Link href={'/notifications'}>
              <a className='bg-white dark:bg-gray-800 p-1 ml-4 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <span className='sr-only'>View notifications</span>
                <BellIcon className='h-6 w-6' aria-hidden='true' />
              </a>
            </Link>

            {/* Profile dropdown */}
            <Menu as='div' className='ml-3 relative'>
              <div>
                <Menu.Button>
                  <div
                    className='h-9 w-9 relative overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: profile?.avatar,
                    }}
                  />
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
                      <Link href={'/accounts/me'}>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                          {profile?.name}
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={'/accounts/settings'}>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                          Cài đặt
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={'/'}>
                        <a
                          onClick={() => handleLogout()}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text text-sm text-gray-700'
                          )}>
                          Đăng Xuất
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </>
    )
  }
  return (
    <>
      <Disclosure
        as='nav'
        className=' bg-white border-b-2 m-auto dark:bg-gray-800'>
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto'>
              <div className='relative flex items-center justify-between h-16'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex-shrink-0 flex items-center'>
                    <Link href={'/'}>
                      <a>
                        <img
                          className='block lg:hidden h-8 w-auto'
                          src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                          alt='Workflow'
                        />
                        <img
                          className='hidden lg:block h-8 w-auto'
                          src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                          alt='Workflow'
                        />
                      </a>
                    </Link>
                  </div>
                  <div className='hidden sm:block sm:ml-6'>
                    <div>
                      <div
                        onClick={() => setSearchIsOpen(true)}
                        className='mt-1 relative rounded-md shadow-sm'>
                        <input
                          type='text'
                          name='price'
                          id='price'
                          disabled={true}
                          className='focus:ring-indigo-500 cursor-pointer  focus:border-indigo-500 block w-full pl-3 pr-44 py-2 font-medium sm:text-sm border-gray-300 rounded-md'
                          placeholder={'Tìm kiếm... (Ctrl + alt + k)'}
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center'>
                          <button className='p-3'>
                            <MagnifyingGlassIcon
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {AccountInfo()}
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {menu.map((item) => (
                  <Disclosure.Button
                    key={item.title}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'border-l-4 border-indigo-600 text-gray-700 bg-gray-100'
                        : 'text-gray-600 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2  text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    {item.title}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <SearchPopup
        searchIsOpen={searchIsOpen}
        getChangerPopupSearch={getChangerPopupSearch}
      />
      <LoginModal
        openModel={openLoginModal}
        handleOpen={(value: boolean) => setOpenLoginModal(value)}
      />
    </>
  )
}
