import Link from 'next/link'
import { SContainer } from './styles'

export default function CookiesPolicy() {
  return (
    <SContainer>
      <h1>Cookies Policy</h1>

      <div className="content">
        <div>
          <h3>1. Why using cookies?</h3>
          <p>
            To know which user is logged in and to be able to use the website,
            like adding, editing, deleting account related data
          </p>
        </div>
        <div>
          <h3>2. What is stored?</h3>
          <p>User ID created in database</p>
        </div>
      </div>

  <Link href="/">Return</Link>
    </SContainer>
  )
}
