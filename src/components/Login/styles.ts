import styled from 'styled-components'
import colors from 'styles/colors'

export const SMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 45px;
`

export const STitle = styled.h1`
  margin: 60px 0;

  color: ${colors.white};
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 50px;

  @media only screen and (min-width: 500px) {
    margin: 30px 0;
    font-size: 60px;
  }

  span {
    color: ${colors.green};
  }
`

export const SForm = styled.form`
  width: 300px;
  max-width: 300px;

  @media only screen and (min-width: 500px) {
    width: 400px;
    max-width: 400px;
  }
`

export const SInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 20px;

  label {
    font-size: 16px;
    color: ${colors.weak};

    @media only screen and (min-width: 500px) {
      font-size: 18px;
    }
  }

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
      border: 0;
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
    margin-top: 3px;
    width: 100%;
    height: 35px;
    color: ${colors.white};

    border: 0;
    border: 1px solid ${colors.weak};
    border-radius: 5px;
    padding: 0 10px;

    background-color: transparent;
    outline: none;
    transition: border-color 200ms ease-in;

    @media only screen and (min-width: 500px) {
      height: 0;
      padding: 22px 15px;
      border-radius: 8px;
      font-size: 18px;
    }

    &:hover {
      border-color: ${colors.white};
    }

    &:focus {
      border-color: ${colors.white};
    }
  }
`

export const SSpanError = styled.span`
  display: none;
  color: ${colors.red};
  text-align: center;
  font-size: 14px;
  margin-top: 2px;

  @media only screen and (min-width: 500px) {
    font-size: 18px;
  }

  &.error {
    display: block;
  }
`

export const SButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-size: 18px;
  font-weight: 500;

  border: 0;
  border: 1px solid ${colors.green};
  border-radius: 5px;

  background: transparent;
  color: ${colors.white};

  cursor: pointer;

  transition-property: background-color, color;
  transition-duration: 200ms;
  transition-timing-function: ease-in;

  &:disabled {
    border-color: ${colors.gray};
    color: ${colors.gray};
    &:hover {
      background: transparent;
      color: ${colors.gray};
    }
  }

  @media only screen and (min-width: 500px) {
    padding: 15px 0;
    font-size: 20px;
    border-radius: 8px;
    margin-top: 30px;
  }

  &:hover {
    background-color: ${colors.green};
    color: ${colors.black};
  }
`

export const SLink = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: ${colors.weak};

  display: flex;
  justify-content: center;
  gap: 5px;

  @media only screen and (min-width: 500px) {
    font-size: 18px;
    gap: 10px;
  }

  a {
    color: ${colors.green};
    text-decoration-color: transparent;

    transition: text-decoration-color 200ms ease-out;

    &:hover {
      text-decoration-color: ${colors.green};
    }
  }
`

export const SInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  max-width: 400px;
  padding: 10px 5px;
  border: 1px solid ${colors.yellow};
  border-radius: 5px;
  margin-top: 20px;

  text-align: center;

  p {
    color: ${colors.white};
  }
`
