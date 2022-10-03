import { lighten } from 'polished'
import styled from 'styled-components'
import colors from 'styles/colors'

export const SContainer = styled.div``

export const SSearchCards = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid ${colors.weak};
  border-radius: 8px;
  margin: 30px 0 20px 0;

  transition: border-color 200ms ease-in;

  @media (min-width: 500px) {
    padding: 8px 12px;
    margin-top: 50px;
  }

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

    font-size: 14px;
    background: transparent;
    color: ${colors.white};

    @media (min-width: 500px) {
      font-size: 24px;
    }

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

export const SStatus = styled.div`
  margin-bottom: 30px;

  @media (min-width: 500px) {
    margin-bottom: 80px;
  }
`

export const SStatusTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`
export const SModal = styled.div`
  overflow-y: auto;
  width: 90%;
  position: fixed;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 10px;
  bottom: 10px;

  border-radius: 10px;
  padding: 20px;
  background-color: ${colors.black};
  z-index: 9999;

  .close {
    position: absolute;
    right: 15px;
    top: 15px;

    display: flex;
    padding: 5px;
    background: transparent;

    svg {
      fill: ${colors.white};
    }
  }

  h1 {
    font-size: 20px;
    font-weight: 500;
    color: ${colors.white};
  }

  .content {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      color: ${colors.white};
    }

    .poster {
      max-width: 250px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .image {
        margin-top: 15px;
        position: relative;
        width: 100px;
        height: 150px;

        outline: 1px solid ${colors.white};
        border-radius: 5px;
        overflow: hidden;
      }
    }

    .buttons {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      button {
        padding: 10px 50px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        color: ${colors.white};

        &:last-child {
          background-color: ${colors.black};
          color: ${colors.white};

          transition-property: background-color, color;
          transition-duration: 200ms;
          transition-timing-function: ease-in;

          &:hover {
            background: ${lighten(0.1, colors.black)};
          }

          &:disabled {
            border: 1px solid ${colors.gray};
            color: ${colors.gray};
            background: transparent;
            &:hover {
              background: transparent;
              color: ${colors.gray};
            }
          }
        }

        &.options {
          background: transparent;
          border-width: 1px;
          border-style: solid;

          &.watching {
            border-color: ${colors.green};

            transition-property: background-color, color;
            transition-timing-function: ease-out;
            transition-duration: 200ms;

            &:hover {
              color: ${colors.black};
              background: ${colors.green};
            }

            &.selected {
              color: ${colors.black};
              background: ${colors.green};
            }
          }

          &.completed {
            border-color: ${colors.blue};

            transition-property: background-color, color;
            transition-timing-function: ease-out;
            transition-duration: 200ms;

            &:hover {
              color: ${colors.white};
              background: ${colors.blue};
            }

            &.selected {
              color: ${colors.white};
              background: ${colors.blue};
            }
          }

          &.dropped {
            border-color: ${colors.red};

            transition-property: background-color, color;
            transition-timing-function: ease-out;
            transition-duration: 200ms;

            &:hover {
              color: ${colors.white};
              background: ${colors.red};
            }

            &.selected {
              color: ${colors.white};
              background: ${colors.red};
            }
          }

          &.onhold {
            border-color: ${colors.yellow};

            transition-property: background-color, color;
            transition-timing-function: ease-out;
            transition-duration: 200ms;

            &:hover {
              color: ${colors.black};
              background: ${colors.yellow};
            }

            &.selected {
              color: ${colors.black};
              background: ${colors.yellow};
            }
          }

          &.ptw {
            border-color: ${colors.gray};

            transition-property: background-color, color;
            transition-timing-function: ease-out;
            transition-duration: 200ms;

            &:hover {
              color: ${colors.black};
              background: ${colors.gray};
            }

            &.selected {
              color: ${colors.black};
              background: ${colors.gray};
            }
          }
        }
      }
    }
  }

  @media (min-width: 700px) {
    overflow-x: hidden;

    .content {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 30px;
    }

    .poster {
      h1 {
        font-size: 32px;
      }

      .image {
        width: 220px !important;
        height: 330px !important;
      }
    }

    .buttons {
      margin-top: 0 !important;
      gap: 20px !important;

      button {
        font-size: 30px !important;
        border-radius: 10px !important;
      }
    }
  }
`
