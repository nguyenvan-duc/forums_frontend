import { MainLayout } from '@/components/layouts'
import React from 'react'

type Props = {}

const Nguoidung = (props: Props) => {
  return (
    <div>Nguoidung</div>
  )
}
Nguoidung.Layout = MainLayout
Nguoidung.sidebarRight = false
Nguoidung.SidebarLeft = true
Nguoidung.requestAuth = false
export default Nguoidung