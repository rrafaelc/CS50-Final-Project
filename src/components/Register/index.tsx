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

const Register = () => {
  return (
    <SMain>
      <STitle>
        Register<span>.</span>
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

            <label>
              <span>Password</span>
              <input
                id="confirm"
                type="password"
                placeholder="Password (again)"
              />
              <SSpanError>Incorrect username or password</SSpanError>
            </label>
          </SInputs>

          <SButton type="submit">Register</SButton>
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
