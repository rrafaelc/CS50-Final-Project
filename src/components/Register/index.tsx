import { FormEventHandler, useState } from 'react'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  SMain,
  STitle,
  SForm,
  SInputs,
  SSpanError,
  SButton,
  SLink,
} from './styles'

interface RegisterProps {
  name: string
  password: string
  confirm_password: string
}

const Register = () => {
  const router = useRouter()
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    if (!/^[a-zA-Z].*/.test(formState.name)) {
      alert('First character must be alphabetical!')
      return
    }

    if (!/^[a-zA-Z0-9_]*$/.test(formState.name)) {
      alert('Only alphanumerics and underscores are allowed!')
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
      await axios.post('/api/account/register', {
        name: formState.name.toLowerCase(),
        password: formState.password,
      })

      alert('Account created, you can now login')

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

      alert('Unknowm error occurred! Check the logs')
    }

    setPageState({
      error_name: false,
      error_password: false,
      processing: false,
    })
  }

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
              <input
                id="password"
                type="password"
                required
                placeholder="Password"
                value={formState.password}
                onChange={e =>
                  setFormState(old => ({ ...old, password: e.target.value }))
                }
              />
            </label>

            <label>
              <span>Password</span>
              <input
                id="confirm"
                type="password"
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
