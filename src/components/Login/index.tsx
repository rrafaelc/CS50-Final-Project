import { FormEventHandler } from 'react'
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

const Login = () => {
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    await signIn('credentials', {
      name: 'rafael',
      password: '123',
      redirect: false,
    }).then(response => {
      console.log(response)
      if (response!.ok) {
        router.push('/dashboard')
      }
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
              <input id="username" type="text" placeholder="Username" />
              {/* <SSpanError className="error"> */}
              <SSpanError>Incorrect username or password</SSpanError>
            </label>

            <label>
              <span>Password</span>
              <input id="password" type="password" placeholder="Password" />
              <SSpanError>Incorrect username or password</SSpanError>
            </label>
          </SInputs>

          <SButton type="submit">Login</SButton>
        </SForm>

        <SLink>
          <p>Don&#39;t have an account?</p>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </SLink>
      </section>
    </SMain>
  )
}

export default Login
