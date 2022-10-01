import { InputHTMLAttributes } from 'react'
import { SContainer, SError } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string
  error?: boolean
  errorMessage: string
}

const Input = ({ labelName, error, errorMessage, ...props }: InputProps) => {
  return (
    <SContainer error={error}>
      <label>
        {labelName}
        <input {...props} />
        {error && <SError>{errorMessage}</SError>}
      </label>
    </SContainer>
  )
}

export default Input
