import { FormEventHandler, useState } from 'react'
import Input from './Input'

import { SContainer, SForm } from './styles'

export default function Edit() {
  const [error, setError] = useState({
    username: {
      name: {
        status: false,
        message: 'Username already exists',
      },
      password: {
        status: false,
        message: 'Incorrect password',
      },
    },
    password: {
      old: {
        status: false,
        message: 'Incorrect password',
      },
      new: {
        status: false,
        message: 'Passwords does not match / At least 3 characters',
      },
      confirm: {
        status: false,
        message: 'Passwords does not match',
      },
    },
    delete: {
      password: {
        status: false,
        message: 'Incorrect password',
      },
    },
  })

  const handleChangeUsername: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
  }

  const handleChangePassword: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
  }

  const handleDeleteAccount: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
  }

  return (
    <SContainer>
      <SForm onSubmit={handleChangeUsername}>
        <div className="inputs">
          <Input
            type="text"
            labelName="Change username"
            placeholder="Type a new username"
            error={error.username.name.status}
            errorMessage={error.username.name.message}
          />
          <Input
            type="password"
            labelName="Password"
            placeholder="Type your password"
            error={error.username.password.status}
            errorMessage={error.username.password.message}
          />
        </div>
        <button type="submit">Change username</button>
      </SForm>

      <SForm onSubmit={handleChangePassword}>
        <div className="inputs">
          <Input
            type="password"
            labelName="Old password"
            placeholder="Type your old password"
            error={error.password.old.status}
            errorMessage={error.password.old.message}
          />
          <Input
            type="password"
            labelName="New password"
            placeholder="Type your new password"
            error={error.password.new.status}
            errorMessage={error.password.new.message}
          />
          <Input
            type="password"
            labelName="New password (again)"
            placeholder="Type your new password (again)"
            error={error.password.confirm.status}
            errorMessage={error.password.confirm.message}
          />
        </div>
        <button type="submit">Change password</button>
      </SForm>

      <SForm onSubmit={handleDeleteAccount}>
        <div className="inputs">
          <Input
            type="password"
            labelName="Password"
            placeholder="Type your password"
            error={error.delete.password.status}
            errorMessage={error.delete.password.message}
          />
        </div>
        <button className="delete" type="submit">
          Delete Account
        </button>
      </SForm>
    </SContainer>
  )
}
