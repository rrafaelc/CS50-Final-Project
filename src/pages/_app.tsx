import { useEffect } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AppProvider } from 'context'

import Header from 'components/Header'

import GlobalStyle from 'styles/globalsStyle'

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
