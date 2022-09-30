import styled from 'styled-components'
import colors from 'styles/colors'
import { lighten } from 'polished'

export const SContainer = styled.ul`
  @media (min-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    gap: 50px;
  }
`

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
    max-width: 200px;
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

  margin-top: 5px;
  margin-bottom: 20px;

  @media (min-width: 500px) {
    width: 220px;
    height: 330px;
  }
`
export const SButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 500px) {
    gap: 20px;
  }

  button {
    padding: 10px 50px;
    border-radius: 6px;
    font-size: 20px;
    font-weight: 500;

    &:first-child {
      background-color: ${colors.green};
      color: ${colors.black};

      transition: background-color ease-in 200ms;

      &:hover {
        background: ${lighten(0.1, colors.green)};
      }
    }

    &:last-child {
      background-color: ${colors.black};
      color: ${colors.white};

      transition: background-color ease-in 200ms;

      &:hover {
        background: ${lighten(0.1, colors.black)};
      }
    }
  }
`

export const SNotFound = styled.p`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

export const SLoading = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: 25px;

  display: flex;
  justify-content: center;
`

export const SScrolToTop = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 99;
  font-size: 18px;
  padding: 8px 10px;
  border-radius: 10px;
  background-color: ${colors.black};
  color: ${colors.white};

  transition: background-color ease-out 200ms;

  &:hover {
    background-color: ${lighten(0.1, colors.black)};
  }
`
