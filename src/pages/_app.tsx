import Head from 'next/head'
import type { AppProps } from 'next/app'
import GlobalStyle from 'styles/globalsStyle'
import Header from 'components/Header'
import { SessionProvider } from 'next-auth/react'

import { AppProvider } from 'context'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>CS50 Final Project</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <AppProvider>
          <GlobalStyle />
          {router.pathname !== '/' &&
            router.pathname !== '/account/register' &&
            router.pathname !== '/_error' && <Header />}
          <Component {...pageProps} />
        </AppProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
