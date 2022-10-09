import { SContainer } from './styles'
import Link from 'next/link'
import { useCookieConsent } from 'context/cookieConsentContext'

export default function CookieConsent() {
  const { cookieConsent, setCookieConsent } = useCookieConsent()

  return (
    <SContainer className={!cookieConsent ? 'show' : ''}>
      <p>
        We use cookies in this website to give you the best experience on our
        site.
      </p>
      <p>
        To find out more, read our{' '}
        <Link href="/">
          <a>privacy policy</a>
        </Link>{' '}
        and{' '}
        <Link href="/">
          <a>cookies policy</a>
        </Link>
      </p>
      <button onClick={() => setCookieConsent(true)}>Okay</button>
    </SContainer>
  )
}
