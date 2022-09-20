import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import colors from '../../styles/colors'

export const SMobileContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: ${colors.black};
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 40px;

  user-select: none;
`

export const SDesktopContainer = styled.div`
  margin-bottom: 50px;

  summary {
    display: flex;
    align-items: center;
    gap: 5px;

    font-size: 24px;
    cursor: pointer;
    color: ${colors.white};
    list-style: none; // Remove the marker
    user-select: none;

    transition: color 200ms ease-out;

    svg {
      fill: ${colors.white};

      transition: fill 200ms ease-out;
    }

    &:hover {
      color: ${lighten(0.2, colors.white)};
      svg {
        fill: ${lighten(0.2, colors.white)};
      }
    }
  }
`

export const STitle = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    font-weight: 500;
    font-size: 20px;
  }

  button {
    background: transparent;
  }
`

export const SItems = styled.div`
  margin-top: 35px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  button {
    padding: 4px 10px;
    border-radius: 4px;
    background-color: ${colors.more_weak};
    color: ${colors.white};
    font-size: 16px;

    transition: background-color 200ms ease-in;

    &.selected {
      background-color: ${colors.green};
      color: ${colors.black};
    }

    &:hover {
      background-color: ${lighten(0.15, colors.more_weak)};
    }

    &.selected:hover {
      background-color: ${lighten(0.15, colors.green)};
    }
  }

  @media (min-width: 500px) {
    margin-top: 20px;

    button {
      font-size: 20px;
    }
  }
`
