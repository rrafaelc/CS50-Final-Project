import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import colors from 'styles/colors'

interface SSInfo {
  isMovie?: boolean
}

interface SStatusProps {
  status: string
}

export const SContainer = styled.div`
  max-width: 283px;

  width: 100%;

  display: flex;

  border: 1px solid ${colors.weak};
  border-radius: 5px;

  overflow: hidden;
  user-select: none;

  @media (min-width: 500px) {
    max-width: 570px;
    border-radius: 10px;
    border-width: 2px;
  }
`

export const SImage = styled.div`
  position: relative;
  width: 100px;
  height: 160px;

  @media (min-width: 500px) {
    width: 220px;
    height: 330px;
  }
`

export const SInfo = styled.div<SSInfo>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 10px;
  color: ${colors.white};

  .icon {
    color: ${colors.white};
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;

    transition: color 200ms ease-out;

    &:hover {
      color: ${lighten(0.2, colors.white)};
    }

    &.delete:hover {
      color: red;
    }

    @media (min-width: 500px) {
      top: 10px;
    }
  }

  h1 {
    font-weight: 500;
    font-size: 14px;
    user-select: text;

    inline-size: 120px;
    overflow-wrap: break-word;

    @media (min-width: 500px) {
      font-size: 32px;
      inline-size: 250px;
    }
  }

  .middle {
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .episodes {
      display: flex;
      gap: 2px;
      color: ${colors.weak};
      font-size: 12px;

      span {
        color: ${colors.white};
      }
    }

    .lastUpdate {
      font-size: 12px;
      color: ${colors.weak};
    }

    @media (min-width: 500px) {
      flex: 1;

      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      margin: ${({ isMovie }) => isMovie && 0};

      gap: 10px;

      .episodes {
        gap: 30px;
      }

      span,
      p {
        font-size: 24px;
      }

      .lastUpdate {
        font-size: 20px;
      }
    }
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 5px;

    button {
      display: flex;
      gap: 5px;
      align-items: center;
      border-radius: 5px;

      font-size: 12px;
      font-weight: 500;
      padding: 5px;
      width: fit-content;

      border-radius: 6px;
      color: ${colors.black};
      background: ${colors.green};

      transition: background-color 200ms ease-in;

      &:hover {
        background: ${lighten(0.1, colors.green)};
      }
    }

    @media (min-width: 500px) {
      row-gap: 10px;

      button {
        font-size: 24px;
        padding: 10px;
        border-radius: 10px;
      }
    }
  }
`
export const SStatus = styled.button<SStatusProps>`
  font-size: 12px;
  font-weight: 500;
  padding: 5px;
  width: fit-content;

  border-radius: 6px;

  transition: background-color 200ms ease-in;

  ${({ status }) => {
    switch (status) {
      case 'watching':
        return css`
          color: ${colors.black};
          background: ${colors.green};

          &:hover {
            background: ${lighten(0.1, colors.green)};
          }
        `

      case 'completed':
        return css`
          color: ${colors.white};
          background: ${colors.blue};

          &:hover {
            background: ${lighten(0.1, colors.blue)};
          }
        `

      case 'onhold':
        return css`
          color: ${colors.black};
          background: ${colors.yellow};

          &:hover {
            background: ${lighten(0.1, colors.yellow)};
          }
        `

      case 'dropped':
        return css`
          color: ${colors.white};
          background: ${colors.red};

          &:hover {
            background: ${lighten(0.1, colors.red)};
          }
        `

      case 'plantowatch' || 'ptw':
        return css`
          color: ${colors.black};
          background: ${colors.gray};

          &:hover {
            background: ${lighten(0.1, colors.gray)};
          }
        `

      default:
        return css`
          color: ${colors.black};
          background: ${colors.gray};

          &:hover {
            background: ${lighten(0.1, colors.gray)};
          }
        `
    }
  }};

  @media (min-width: 500px) {
    font-size: 24px;
    padding: 10px;
    border-radius: 10px;
  }
`
