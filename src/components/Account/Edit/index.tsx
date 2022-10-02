import { FormEventHandler, useState } from 'react'

import { signOut } from 'next-auth/react'
import Input from './Input'
import { changeUsername } from 'lib/db'

import { SContainer, SForm } from './styles'

const errors = [
  'Incorrect password',
  'Passwords does not match',
  'Username already exists',
  'At least 3 characters',
]

export default function Edit() {
  const [usernameError, setUsernameError] = useState({
    name: '',
    password: '',
  })
  const [username, setUsername] = useState({
    name: '',
    password: '',
  })

  const [passwordError, setPasswordError] = useState({
    old: '',
    new: '',
    confirm: '',
  })

  const [deleteError, setDeleteError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleChangeUsername: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    setUsernameError({
      name: '',
      password: '',
    })

    if (!/^[a-zA-Z].*/.test(username.name)) {
      alert('First character must be alphabetical!')
      return
    }

    if (!/^[a-zA-Z0-9_]*$/.test(username.name)) {
      alert('Only alphanumerics and underscores are allowed!')
      return
    }

    if (username.password.length < 3) {
      alert('Password should have at least 3 characters')
      return
    }

    const name = username.name
    const password = username.password

    setLoading(true)

    try {
      await changeUsername({ name, password })

      alert('Username changed, please log-in again')

      await signOut()
    } catch (err: any) {
      if (err.response.status === 403) {
        setUsernameError({
          name: 'Username already exists',
          password: '',
        })

        setLoading(false)
        return
      }

      if (err.response.status === 400) {
        setUsernameError({
          name: '',
          password: 'Incorrect password',
        })

        setLoading(false)
        return
      }

      console.log(err)
      console.log(err.message)

      setLoading(false)
      alert('An error occurred while change username')
    }
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
            labelName="New username"
            placeholder="Type a new username"
            value={username.name}
            onChange={e => {
              setUsernameError({
                name: '',
                password: '',
              })
              setUsername(prevState => ({ ...prevState, name: e.target.value }))
            }}
            error={!!usernameError.name}
            errorMessage={usernameError.name}
          />
          <Input
            type="password"
            labelName="Password"
            placeholder="Type your password"
            value={username.password}
            onChange={e => {
              setUsernameError({
                name: '',
                password: '',
              })
              setUsername(prevState => ({
                ...prevState,
                password: e.target.value,
              }))
            }}
            error={!!usernameError.password}
            errorMessage={usernameError.password}
          />
        </div>
        <button disabled={loading} type="submit">
          {loading ? 'Loading' : 'Change username'}
        </button>
      </SForm>

      <SForm onSubmit={handleChangePassword}>
        <div className="inputs">
          <Input
            type="password"
            labelName="Old password"
            placeholder="Type your old password"
            error={!!passwordError.old}
            errorMessage={passwordError.old}
          />
          <Input
            type="password"
            labelName="New password"
            placeholder="Type your new password"
            error={!!passwordError.new}
            errorMessage={passwordError.new}
          />
          <Input
            type="password"
            labelName="New password (again)"
            placeholder="Type your new password (again)"
            error={!!passwordError.confirm}
            errorMessage={passwordError.confirm}
          />
        </div>
        <button disabled={loading} type="submit">
          {loading ? 'Loading' : 'Change password'}
        </button>
      </SForm>

      <SForm onSubmit={handleDeleteAccount}>
        <div className="inputs">
          <Input
            type="password"
            labelName="Password"
            placeholder="Type your password"
            error={!!deleteError}
            errorMessage={deleteError}
          />
        </div>
        <button disabled={loading} className="delete" type="submit">
          {loading ? 'Loading' : 'Delete Account'}
        </button>
      </SForm>
    </SContainer>
  )
}
