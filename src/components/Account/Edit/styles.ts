import styled from 'styled-components'
import colors from 'styles/colors'
import { lighten } from 'polished'

export const SContainer = styled.div`
  width: 100%;

  margin: 50px 0;
  display: flex;
  flex-direction: column;
  gap: 50px;
`

export const SForm = styled.form`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;

  .inputs {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  button[type='submit'] {
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    padding: 12px 0;
    background: ${colors.green};
    color: ${colors.black};
    border-radius: 6px;

    transition: background-color ease-in 200ms;

    &:hover {
      background-color: ${lighten(0.1, colors.green)};
    }

    &.delete {
      background: ${colors.red};
      color: ${colors.white};

      &:hover {
        background-color: ${lighten(0.1, colors.red)};
      }
    }
  }

  @media (min-width: 500px) {
    max-width: 570px;

    .inputs {
      margin-bottom: 20px;
      gap: 15px;
    }

    button[type='submit'] {
      font-size: 28px;
      padding: 16px 0;
      border-radius: 8px;
    }
  }

  @media (min-width: 1000px) {
    max-width: 700px;
  }
`
