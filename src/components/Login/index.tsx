import { FormEventHandler, useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
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

interface LoginProps {
  name: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const [authState, setAuthState] = useState<LoginProps>({
    name: '',
    password: '',
  })

  const [pageState, setPageState] = useState({
    error: false,
    processing: false,
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    if (!/^[a-zA-Z].*/.test(authState.name)) {
      alert('First character must be alphabetical!')
      return
    }

    if (!/^[a-zA-Z0-9_]*$/.test(authState.name)) {
      alert('Only alphanumerics and underscores are allowed!')
      return
    }

    setPageState({ error: false, processing: true })

    await signIn('credentials', {
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
        alert('Something went wrong! Check the logs')
      })
  }

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
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={authState.password}
                onChange={e =>
                  setAuthState(old => ({ ...old, password: e.target.value }))
                }
              />
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
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </SLink>
      </section>
    </SMain>
  )
}

export default Login
