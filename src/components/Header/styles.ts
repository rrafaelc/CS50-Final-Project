import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import colors from 'styles/colors'

export const SMobileContainer = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 500px;

  margin: 20px auto;
  gap: 15px;

  svg {
    cursor: pointer;
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

  span {
    font-weight: 500;
    font-size: 26px;
    cursor: pointer;
    color: ${colors.white};

    transition: color 200ms ease-in;

    &:hover {
      color: ${lighten(0.2, colors.white)};
    }
  }

  @media only screen and (max-width: 1000px) {
    gap: 15px;

    span {
      font-size: 22px;
    }
  }

  @media only screen and (max-width: 800px) {
    gap: 10px;

    span {
      font-size: 18px;
    }
  }
`
