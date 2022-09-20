import Link from 'next/link'

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
  return (
    <SMain>
      <STitle>
        Login<span>.</span>
      </STitle>

      <section>
        <SForm>
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

          <Link href="/dashboard">
            <SButton type="submit">Login</SButton>
          </Link>
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
