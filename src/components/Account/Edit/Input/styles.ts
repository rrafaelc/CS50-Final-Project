import styled from 'styled-components'
import colors from 'styles/colors'

export const SContainer = styled.div<{ error?: boolean }>`
  label {
    font-size: 16px;
    color: ${colors.weak};

    display: flex;
    flex-direction: column;

    div {
      display: flex;
      border: 1px solid ${colors.weak};
      border-radius: 7px;
      margin-top: 3px;

      transition: border-color 200ms ease-in;

      &:hover {
        border-color: ${colors.white};
      }

      &:focus {
        border-color: ${colors.white};
      }

      input {
        outline: 0;
        margin-top: 0;
      }

      button {
        display: flex;
        align-items: center;
        background: transparent;
        padding-right: 10px;
      }
    }

    input {
      flex: 1;
      margin-top: 5px;
      padding: 8px;
      font-size: 18px;
      border-radius: 5px;
      background: transparent;
      outline: 1px solid ${({ error }) => (error ? colors.red : colors.weak)};
      color: ${({ error }) => (error ? colors.red : colors.white)};

      transition: outline ease-in 200ms;

      &:hover {
        outline-color: ${({ error }) => (error ? '' : colors.white)};
      }

      &::placeholder {
        color: ${colors.more_weak};
      }
    }
  }

  @media (min-width: 500px) {
    label {
      font-size: 20px;

      input {
        font-size: 24px;
        padding: 14px;
        border-radius: 8px;
      }
    }
  }
`

export const SError = styled.span`
  font-size: 16px;
  margin-top: 3px;
  color: ${colors.red};
`
