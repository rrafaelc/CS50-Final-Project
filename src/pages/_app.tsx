import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/globalsStyle'
import Header from '../components/Header'

import { AppProvider } from '../context'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AppProvider>
      <GlobalStyle />
      {router.pathname !== '/' &&
        router.pathname !== '/register' &&
        router.pathname !== '/_error' && <Header />}
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
