import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/globalsStyle'
import Header from '../components/Header'
import { SessionProvider } from 'next-auth/react'

import { AppProvider } from '../context'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppProvider>
        <GlobalStyle />
        {router.pathname !== '/' &&
          router.pathname !== '/register' &&
          router.pathname !== '/_error' && <Header />}
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  )
}

export default MyApp
