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
    <div className=' bg-gray-100'>
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
          <div className='max-w-7xl flex flex-nowrap m-auto'>
            {sidebarLeft && (
              <div className='md:w-1/6 hidden md:block '>
                <SidebarLeft />
              </div>
            )}

            <div className='flex container mx-auto'>
              <div
              className={classNames(sidebarRight?'w-full md:w-3/4  py-6 md:px-6 bg-landscape':'w-full')}
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
                <div className={'w-1/4 py-6 hidden md:block'}>
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
