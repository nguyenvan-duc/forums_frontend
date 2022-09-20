import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { LayoutProps } from '@/models'
import { useAuth } from '@/hooks'
type Profile = {
  name?: string
  role?: string
  email?: string
}
export function AdminLayout({ children }: LayoutProps) {
  const router = useRouter()
  const { profile, fistLoading } = useAuth()
  useEffect(() => {
    if ((!fistLoading && !profile) || profile?.role !== 'ADMIN')
      router.push('/')
  }, [router, profile, fistLoading])
  if (!profile) return <p>Loading</p>
  return <>{children}</>
}
