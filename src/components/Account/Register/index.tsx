import { FormEventHandler, useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
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
} from './styles'
import { registerAccount } from 'lib/db'

interface RegisterProps {
  name: string
  password: string
  confirm_password: string
}

const Register = () => {
  const router = useRouter()
  const { getCookieConsent } = useCookieConsent()
  const { data: session } = useSession()
  const [formState, setFormState] = useState<RegisterProps>({
    name: '',
    password: '',
    confirm_password: '',
  })

  const [pageState, setPageState] = useState({
    error_name: false,
    error_password: false,
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
      toast.warn('To register you need to accept the cookies')
      return
    }

    if (!/^[a-zA-Z].*/.test(formState.name)) {
      toast.warn('First character must be alphabetical!')
      return
    }

    if (!/^[a-zA-Z0-9_]*$/.test(formState.name)) {
      toast.warn('Only alphanumerics and underscores are allowed!')
      return
    }

    if (formState.password.length < 3) {
      toast.warn('Password must be at least 3 characters long')
      return
    }

    setPageState({ error_name: false, error_password: false, processing: true })

    // Check if passwords match
    if (formState.password !== formState.confirm_password) {
      setPageState({
        error_name: false,
        error_password: true,
        processing: false,
      })
      return
    }

    try {
      await registerAccount({
        name: formState.name.toLowerCase(),
        password: formState.password,
      })

      toast.success('Account created, you can now login')

      router.push('/')
    } catch (err) {
      const error = err as AxiosError

      console.log(error)

      if (error.response?.status === 403) {
        setPageState({
          error_name: true,
          error_password: false,
          processing: false,
        })

        return
      }

      toast.error('Unknowm error occurred! Check the logs')
    }

    setPageState({
      error_name: false,
      error_password: false,
      processing: false,
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
        Register<span>.</span>
      </STitle>

      <section>
        <SForm onSubmit={handleSubmit}>
          <SInputs>
            <label>
              <span>Username</span>
              <input
                id="username"
                type="text"
                required
                placeholder="Username"
                value={formState.name}
                onChange={e =>
                  setFormState(old => ({ ...old, name: e.target.value }))
                }
              />
              <SSpanError className={pageState.error_name ? 'error' : ''}>
                Username already taken
              </SSpanError>
            </label>

            <label>
              <span>Password</span>
              <div>
                <input
                  id="password"
                  type={passwordShown ? 'text' : 'password'}
                  required
                  placeholder="Password"
                  value={formState.password}
                  onChange={e =>
                    setFormState(old => ({ ...old, password: e.target.value }))
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
            </label>

            <label>
              <span>Password (again)</span>
              <div>
                <input
                  id="confirm"
                  type={passwordShown ? 'text' : 'password'}
                  required
                  placeholder="Password (again)"
                  value={formState.confirm_password}
                  onChange={e =>
                    setFormState(old => ({
                      ...old,
                      confirm_password: e.target.value,
                    }))
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
              <SSpanError className={pageState.error_password ? 'error' : ''}>
                Passwords are different
              </SSpanError>
            </label>
          </SInputs>

          <SButton type="submit" disabled={pageState.processing}>
            {pageState.processing ? 'Loading' : 'Register'}
          </SButton>
        </SForm>

        <SLink>
          <p>Already have an account?</p>
          <Link href="/">
            <a>Login</a>
          </Link>
        </SLink>
      </section>
    </SMain>
  )
}

export default Register
