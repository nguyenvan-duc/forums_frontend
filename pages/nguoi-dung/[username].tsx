import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks'
import { UseInfo } from '@/components/account'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import useSWR from 'swr'

type Props = {}

const AccountDetail: NextPageWithLayout = (props: Props) => {
  const { query, push } = useRouter()
  const { profile } = useAuth()
  if (profile?.username == query.username) push('/nguoi-dung/me')

  const { data: userProfile } = useSWR<any>(`user/${query?.username}/info`, {
    dedupingInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const { data: userPosts } = useSWR<any>(`user/${query?.username}/posts`, {
    dedupingInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const { data: userComments } = useSWR<any>(
    `user/${query?.username}/comments`,
    {
      dedupingInterval: 15 * 60 * 1000,
      revalidateOnFocus: false,
    }
  )
  let loading = !userProfile?.info || !userPosts || !userComments
  return (
    <div className='max-w-5xl m-auto'>
      <UseInfo
        loading={loading}
        info={userProfile?.info}
        badges={userProfile?.badges}
        contacts={userProfile?.contacts}
        posts={userPosts}
        comments={userComments}
      />
    </div>
  )
}
AccountDetail.Layout = MainLayout
AccountDetail.sidebarRight = false
AccountDetail.SidebarLeft = false
AccountDetail.requestAuth = true
export default AccountDetail
