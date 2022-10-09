import type { NextPage } from 'next'

import Register from 'components/Account/Register'
import CookieConsent from 'components/CookieConsent'
import { useCookieConsent } from 'context/cookieConsentContext'

const RegisterPage: NextPage = () => {
  const { cookieConsent } = useCookieConsent()

  return (
    <>
      <CookieConsent />
      <Register />
    </>
  )
}

export default RegisterPage
