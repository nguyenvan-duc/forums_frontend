import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import ConnectionNotification from 'react-connection-notification'
import axiosConfig from '@/api-client/axios-config'
import { BlankLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import { AppProvider } from '@/store'
import { Analytics } from '@vercel/analytics/react'
import '@uiw/react-markdown-preview/markdown.css'
import 'easymde/dist/easymde.min.css'
import '@/styles/globals.css'
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? BlankLayout
  const sidebarRight: boolean = Component.sidebarRight ?? false
  const sidebarLeft: boolean = Component.SidebarLeft ?? false
  const requestAuth: boolean = Component.requestAuth ?? false

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosConfig.get(url),
        shouldRetryOnError: false,
      }}>
      <ThemeProvider enableSystem={true} attribute='class'>
        <Analytics />
        <AppProvider>
          <Layout
            sidebarRight={sidebarRight}
            sidebarLeft={sidebarLeft}
            requestAuth={requestAuth}>
            <ConnectionNotification
              onlineText='Bạn đã kết nỗi lại.'
              offlineText='Bạn đã mất kết nôi.'
              duration={3500}
            />
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}

export default MyApp
