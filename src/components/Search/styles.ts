import styled from 'styled-components'
import colors from 'styles/colors'

export const SContainer = styled.ul``

export const SCard = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 50px 0;

  h1 {
    font-size: 24px;
    font-weight: normal;
    color: ${colors.white};
  }

  &.sentinela {
    width: 100%;
    height: 10px;
    background-color: magenta;
  }
`

export const SImage = styled.div`
  position: relative;
  width: 200px;
  height: 300px;

  margin: 20px 0;

  @media (min-width: 500px) {
    width: 220px;
    height: 330px;
  }
`
export const SButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    padding: 10px 50px;
    border-radius: 6px;
    font-size: 20px;
    font-weight: 500;

    &:first-child {
      background-color: ${colors.green};
      color: ${colors.black};
    }

    &:last-child {
      background-color: ${colors.black};
      color: ${colors.white};
    }
  }
`
