import { useEffect } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AppProvider } from 'context'
import { ToastContainer } from 'react-toastify'

import Header from 'components/Header'

import GlobalStyle from 'styles/globalsStyle'

import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Tv & Movie tracker | CS50 Final Project</title>
      </Head>

      <SessionProvider session={pageProps.session}>
        <AppProvider>
          <GlobalStyle />
          <ToastContainer />
          {router.pathname !== '/' &&
            router.pathname !== '/account/register' &&
            router.pathname !== '/privacypolicy' &&
            router.pathname !== '/cookiespolicy' &&
            router.pathname !== '/_error' && <Header />}

          <Component {...pageProps} />
        </AppProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp
