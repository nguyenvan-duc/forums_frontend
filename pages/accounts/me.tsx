import { UseInfo } from '@/components/account'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import React from 'react'

type Props = {}

const Me:NextPageWithLayout = (props: Props) => {
  return (
    <>
    <UseInfo/>
    </>
  )
}
Me.Layout = MainLayout
Me.sidebarRight = false
Me.SidebarLeft = false
Me.requestAuth = true

export default Me
