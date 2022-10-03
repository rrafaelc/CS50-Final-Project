import styled from 'styled-components'
import colors from 'styles/colors'
import { lighten } from 'polished'

export const SCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 50px 0;

  .poster {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 500px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  h1 {
    font-size: 24px;
    font-weight: normal;
    color: ${colors.white};
    max-width: 250px;
  }

  p {
    font-size: 16px;
    color: ${colors.weak};
  }
`
export const SImage = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  outline: 1px solid ${colors.white};
  border-radius: 5px;
  overflow: hidden;

  margin: 20px 0;

  @media (min-width: 500px) {
    width: 220px;
    height: 330px;
  }
`

export const STvEpisodes = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 500px) {
    margin: 0;
  }

  div {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 36px;
      color: ${colors.weak};
    }

    input {
      font-size: 24px;
      width: 80px;
      padding: 5px 10px;
      background-color: ${colors.more_weak};
      color: ${colors.white};
      border-radius: 8px;
      text-align: center;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }
  }
`

export const SButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 500px) {
    gap: 15px;
  }

  button {
    padding: 10px 50px;
    border-radius: 6px;
    font-size: 20px;
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

    &.save {
      background-color: ${colors.green};
      color: ${colors.black};

      transition-property: background-color, color;
      transition-duration: 200ms;
      transition-timing-function: ease-in;

      &:hover {
        background: ${lighten(0.1, colors.green)};
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
  }
`
