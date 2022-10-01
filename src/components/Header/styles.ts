import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import colors from 'styles/colors'

export const SMobileContainer = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 500px;

  margin: 20px auto;
  gap: 10px;

  .logo {
    position: relative;
    width: 50px;
    height: 36px;

    display: flex;
    align-items: center;
  }

  .account {
    background: transparent;
  }

  svg {
    cursor: pointer;
  }
`

export const SMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;

  padding: 0 15px;

  .container {
    /* width: 100%; */
    border-radius: 10px;
    margin-top: 80px;
    padding: 20px;
    background: ${colors.black};

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: 20px;
        font-weight: 500;
        color: ${colors.white};
      }

      button {
        display: flex;
        background: transparent;
      }
    }

    .buttons {
      margin-top: 25px;

      display: flex;
      flex-direction: column;
      gap: 15px;

      button {
        font-size: 20px;
        font-weight: 500;
        border-radius: 6px;
        padding: 10px 0;
        color: ${colors.white};
        background-color: ${colors.more_weak};
      }

      .logout {
        background: ${colors.red};
      }
    }
  }
`

export const SSearch = styled.form<{ isDesktop: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 0 10px;
  ${({ isDesktop }) =>
    isDesktop &&
    css`
      height: 40px;
    `}

  border: 1px solid ${colors.weak};
  border-radius: 8px;

  transition: border-color 200ms ease-in;

  &:hover {
    border-color: ${colors.white};
  }

  svg:hover {
    transition: fill 200ms ease-in;
    fill: ${colors.white};
  }

  input {
    flex: 1;
    width: 100%;
    align-self: stretch;

    font-size: ${({ isDesktop }) => (isDesktop ? 24 : 14)}px;
    background: transparent;
    color: ${colors.white};

    &::placeholder {
      color: ${colors.more_weak};
    }
  }

  button {
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const SDesktopContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1140px;
  gap: 15px;

  margin: 20px auto;

  svg {
    cursor: pointer;
  }
`

export const Menu = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    font-weight: 500;
    font-size: 26px;
    cursor: pointer;
    color: ${colors.white};
    text-decoration: none;

    transition: color 200ms ease-in;

    &:hover {
      color: ${lighten(0.2, colors.white)};
    }
  }

  @media only screen and (max-width: 1000px) {
    gap: 15px;

    a {
      font-size: 22px;
    }
  }

  @media only screen and (max-width: 800px) {
    gap: 10px;

    a {
      font-size: 18px;
    }
  }
`
