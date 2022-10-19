import dynamic from 'next/dynamic'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import { useAuth } from '@/hooks'
import { Comment, CommentForm, Posts } from '@/components'
const Home: NextPageWithLayout = () => {
  return (
    <>
      <Posts />
      <Posts />
      <Posts />
      <Posts />
    </>
  )
}

Home.Layout = MainLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
