import styled from 'styled-components'
import colors from 'styles/colors'

export const SContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;

  svg {
    fill: ${colors.white};
  }

  .numbers {
    display: flex;
    gap: 5px;

    li {
      list-style: none;
    }

    button {
      font-size: 24px;
      font-weight: 500;
      padding: 5px 15px;
      border-radius: 4px;

      background-color: transparent;
      border: 1px solid ${colors.white};

      &.selected {
        border-color: ${colors.green};
      }
    }
  }
`
