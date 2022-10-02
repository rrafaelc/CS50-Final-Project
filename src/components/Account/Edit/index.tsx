import { FormEventHandler, useState } from 'react'

import { signOut } from 'next-auth/react'
import Input from './Input'
import { editUsername, editPassword, deleteAccount } from 'lib/db'

import { SContainer, SForm } from './styles'

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
  const [password, setPassword] = useState({
    old: '',
    new: '',
    confirm: '',
  })

  const [delError, setDelError] = useState('')
  const [del, setDel] = useState('')

  const [loading, setLoading] = useState(false)

  const handleEditUsername: FormEventHandler<HTMLFormElement> = async e => {
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
      alert('Password must be at least 3 characters long')
      return
    }

    const name = username.name
    const password = username.password

    setLoading(true)

    try {
      await editUsername({ name, password })

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

  const handleChangePassword: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    setPasswordError({
      old: '',
      new: '',
      confirm: '',
    })

    if (password.new.length < 3) {
      setPasswordError({
        old: '',
        new: 'Must be at least 3 characters long',
        confirm: '',
      })

      return
    }

    if (password.new !== password.confirm) {
      setPasswordError({
        old: '',
        new: '',
        confirm: 'Passwords are not the same',
      })

      return
    }

    setLoading(true)

    try {
      await editPassword({ password: password.old, newPassword: password.new })

      alert('Password changed, please log-in again')

      await signOut()
    } catch (err: any) {
      if (err.response.status === 400) {
        setPasswordError({
          old: 'Incorrect password',
          new: '',
          confirm: '',
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

  const handleDeleteAccount: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    if (!del) {
      alert('Password required')

      return
    }

    if (!confirm('Are you sure you want to delete your account?')) return

    setLoading(true)
    try {
      await deleteAccount(del)

      await signOut()
    } catch (err: any) {
      if (err.response.status === 400) {
        setDelError('Incorrect password')

        setLoading(false)
        return
      }

      console.log(err.message)
      console.log(err)

      setLoading(false)
      alert('An error occurred when deleting account')
    }

    setLoading(false)
  }

  return (
    <SContainer>
      <SForm onSubmit={handleEditUsername}>
        <div className="inputs">
          <Input
            required
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
            required
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
            required
            type="password"
            labelName="Old password"
            placeholder="Type your old password"
            value={password.old}
            onChange={e => {
              setPasswordError({
                old: '',
                new: '',
                confirm: '',
              })
              setPassword(prevState => ({ ...prevState, old: e.target.value }))
            }}
            error={!!passwordError.old}
            errorMessage={passwordError.old}
          />
          <Input
            required
            type="password"
            labelName="New password"
            placeholder="Type your new password"
            value={password.new}
            onChange={e => {
              setPasswordError({
                old: '',
                new: '',
                confirm: '',
              })
              setPassword(prevState => ({ ...prevState, new: e.target.value }))
            }}
            error={!!passwordError.new}
            errorMessage={passwordError.new}
          />
          <Input
            required
            type="password"
            labelName="New password (again)"
            placeholder="Type your new password (again)"
            value={password.confirm}
            onChange={e => {
              setPasswordError({
                old: '',
                new: '',
                confirm: '',
              })
              setPassword(prevState => ({
                ...prevState,
                confirm: e.target.value,
              }))
            }}
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
            required
            type="password"
            labelName="Password"
            placeholder="Type your password"
            value={del}
            onChange={e => {
              setDelError('')
              setDel(e.target.value)
            }}
            error={!!delError}
            errorMessage={delError}
          />
        </div>
        <button disabled={loading} className="delete" type="submit">
          {loading ? 'Loading' : 'Delete Account'}
        </button>
      </SForm>
    </SContainer>
  )
}
