import Link from 'next/link'
import { SContainer } from './styles'

export default function PrivacyPolicy() {
  return (
    <SContainer>
      <div className="content">
        <div>
          <h3>1. What information is collected?</h3>
          <p>Username and password</p>
        </div>

        <div>
          <h3>2. Why is this information collected?</h3>
          <p>
            To be able to use the website, like adding, editing, deleting
            account related data
          </p>
        </div>

        <div>
          <h3>3. By what means is this information collected?</h3>
          <p>Using web forms</p>
        </div>

        <div>
          <h3>4. How long will the collected information be stored?</h3>
          <p>
            10 days, user can delete his account whenever he wants in the
            settings
          </p>
        </div>

        <div>
          <h3>5. How is user information protected?</h3>
          <p>
            The password is hashed, if the user forget the password, there is no
            way to recover, since email is not collected. After 10 days the
            account will be automatic deleted
          </p>
        </div>
        <div>
          <h3>6. Any related question contact me</h3>
          <p>rafael.costa.fw@gmail.com</p>
        </div>
      </div>

      <Link href="/">
        <a>Return</a>
      </Link>
    </SContainer>
  )
}
