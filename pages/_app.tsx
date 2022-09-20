import { SWRConfig } from 'swr'
import axiosConfig from '@/api-client/axios-config'
import { BlankLayout } from '@/components/layouts'
import { AppPropsWithLayout } from '@/models'
import '@uiw/react-markdown-preview/markdown.css'
import 'easymde/dist/easymde.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? BlankLayout
  const sidebarRight: boolean = Component.sidebarRight ?? false
  const sidebarLeft: boolean = Component.sidebarRight ?? false
  const requestAuth: boolean = Component.requestAuth ?? false

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosConfig.get(url),
        shouldRetryOnError: false,
      }}>
      <Layout
        sidebarRight={sidebarRight}
        sidebarLeft={sidebarLeft}
        requestAuth={requestAuth}>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default MyApp
