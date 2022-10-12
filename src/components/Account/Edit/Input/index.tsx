import { InputHTMLAttributes, useState } from 'react'
import { SContainer, SError } from './styles'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import colors from 'styles/colors'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string
  error?: boolean
  errorMessage: string
}

const Input = ({ labelName, error, errorMessage, ...props }: InputProps) => {
  const [passwordShown, setPasswordShown] = useState(false)

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <SContainer error={error}>
      <label>
        {labelName}
        {props.type === 'password' ? (
          <div>
            <input {...props} type={passwordShown ? 'text' : 'password'} />
            <button type="button" onClick={togglePassword}>
              {passwordShown ? (
                <AiFillEye size={24} color={colors.weak} />
              ) : (
                <AiFillEyeInvisible size={24} color={colors.weak} />
              )}
            </button>
          </div>
        ) : (
          <input {...props} />
        )}
        {error && <SError>{errorMessage}</SError>}
      </label>
    </SContainer>
  )
}

export default Input
