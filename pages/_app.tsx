import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import SEO from '@bradgarropy/next-seo'
import GoogleAnalytics from '@bradgarropy/next-google-analytics'
import ConnectionNotification from 'react-connection-notification'
import axiosConfig from '@/api-client/axios-config'
import { BlankLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import { AppProvider } from '@/store'
import { Analytics } from '@vercel/analytics/react'
import '@uiw/react-markdown-preview/markdown.css'
import 'easymde/dist/easymde.min.css'
import 'react-medium-image-zoom/dist/styles.css'
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
        <SEO
          title='IT FORUMS'
          description='Nơi để nhận giải đáp cho mọi câu hỏi, nơi để chia sẻ kiến thức, nơi để đọc, để suy ngẫm và để vui'
          keywords={['Hỏi đáp IT', 'Chia sẻ kiến thức', 'Học IT']}
        />
        <Analytics />
        <GoogleAnalytics measurementId="G-F2V2QR1BPJ" />
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
