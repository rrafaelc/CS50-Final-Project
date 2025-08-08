import { FormEventHandler, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useCookieConsent } from 'context/cookieConsentContext'
import { toast } from 'react-toastify'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import colors from 'styles/colors'

import {
  SMain,
  STitle,
  SForm,
  SInputs,
  SSpanError,
  SButton,
  SLink,
  SInformation,
} from './styles'

interface LoginProps {
  name: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const { getCookieConsent } = useCookieConsent()
  const { data: session } = useSession()
  const [authState, setAuthState] = useState<LoginProps>({
    name: '',
    password: '',
  })

  const [pageState, setPageState] = useState({
    error: false,
    processing: false,
  })

  const [passwordShown, setPasswordShown] = useState(false)

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    // Check if cookies was accepted
    const cookieConsent = getCookieConsent()
    if (cookieConsent !== 'true') {
      toast.warn('To login you need to accept the cookies')
      return
    }

    if (!/^[a-zA-Z].*/.test(authState.name)) {
      toast.warn('First character must be alphabetical!')
      return
    }

    if (!/^[a-zA-Z0-9_]*$/.test(authState.name)) {
      toast.warn('Only alphanumerics and underscores are allowed!')
      return
    }

    setPageState({ error: false, processing: true })

    signIn('credentials', {
      name: authState.name.toLowerCase(),
      password: authState.password,
      redirect: false,
    })
      .then(response => {
        if (response!.ok) {
          router.push('/dashboard')
        } else {
          setPageState({ error: true, processing: false })
        }
      })
      .catch(error => {
        console.log(error)
        setPageState({
          error: false,
          processing: false,
        })
        toast.error('Something went wrong! Please check the logs')
      })
  }

  useEffect(() => {
    if (session) {
      router.replace('/dashboard')
    }
  }, [session])

  return (
    <SMain>
      <STitle>
        Login<span>.</span>
      </STitle>

      <section>
        <SForm onSubmit={handleSubmit}>
          <SInputs>
            <label>
              <span>Username</span>
              <input
                id="username"
                type="text"
                placeholder="Username"
                required
                value={authState.name}
                onChange={e =>
                  setAuthState(old => ({ ...old, name: e.target.value }))
                }
              />
              <SSpanError className={pageState.error ? 'error' : ''}>
                Incorrect username or password
              </SSpanError>
            </label>

            <label>
              <span>Password</span>
              <div>
                <input
                  id="password"
                  type={passwordShown ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={authState.password}
                  onChange={e =>
                    setAuthState(old => ({ ...old, password: e.target.value }))
                  }
                />
                <button type="button" onClick={togglePassword}>
                  {passwordShown ? (
                    <AiFillEye size={24} color={colors.weak} />
                  ) : (
                    <AiFillEyeInvisible size={24} color={colors.weak} />
                  )}
                </button>
              </div>
              <SSpanError className={pageState.error ? 'error' : ''}>
                Incorrect username or password
              </SSpanError>
            </label>
          </SInputs>

          <SButton disabled={pageState.processing} type="submit">
            {pageState.processing ? 'Loading' : 'Login'}
          </SButton>
        </SForm>
        <SLink>
          <p>Don&#39;t have an account?</p>
          <Link href="/account/register">Register</Link>
        </SLink>
      </section>

      <SInformation>
        <p>This is a final project for CS50</p>
        <p>
          Accounts that were created more than 10 days ago will be automatically
          deleted
        </p>
      </SInformation>
    </SMain>
  )
}

export default Login
