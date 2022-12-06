import React, { useEffect, useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { LayoutProps } from '@/models'
import {
  Footer,
  Loader,
  Navbar,
  SidebarLeft,
  SidebarRight,
  Totop,
} from '@/components/layouts/common'

import { useAuth } from '@/hooks'
import { LoginModal } from '../login/login_modal'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function MainLayout({
  children,
  sidebarLeft,
  sidebarRight,
  requestAuth,
}: LayoutProps) {
  const router = useRouter()
  const { profile, fistLoading } = useAuth({})
  const [isRequestAuth, setItRequestAuth] = useState(false)
  useEffect((): any => {
    if (requestAuth) {
      if (!profile?.name && !fistLoading) {
        setItRequestAuth(true)
      } else {
        setItRequestAuth(false)
      }
    }
  }, [router, profile, requestAuth, fistLoading])
  return (
    <div className=' bg-white pt-16'>
      <Navbar />
      <LoginModal
        openModel={isRequestAuth}
        handleOpen={(
          value: boolean,
          e: MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          e.preventDefault()
          setItRequestAuth(value)
          router.push('/')
        }}
      />
      {!profile?.name && requestAuth ? (
        <Loader />
      ) : (
        <>
          <div className='flex-grow w-full min-h-screen max-w-[100rem] 	mx-auto lg:flex'>
            {sidebarLeft && (
              <div className=' hidden lg:block xl:flex-shrink-0 xl:w-80 xl:border-r xl:border-gray-200'>
                <SidebarLeft />
              </div>
            )}

            <div className='flex container mx-auto'>
              <div
              className={classNames(sidebarRight?'w-full  py-6 bg-landscape':'w-full')}
                // className={ sidebarRight
                //     ? ''
                //     : ''}
                    
                    >
                {isRequestAuth && !profile ? (
                  <div className='h-screen'></div>
                ) : (
                  children
                )}
              </div>
              {sidebarRight && (
                <div className={'px-4 sm:px-6 hidden lg:block lg:px-8 lg:flex-shrink-0 lg:border-l py-6 lg:border-gray-200 xl:pr-0 lg:w-96'}>
                  <SidebarRight />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <Totop />
      <Footer />
    </div>
  )
}
