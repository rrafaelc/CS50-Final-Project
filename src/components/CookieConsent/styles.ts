import styled from 'styled-components'

export const SContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2f3640;
  padding: 32px;
  box-shadow: 0 -2px 16px #2f364063;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  display: none;

  &.show {
    display: flex;
  }

  a,
  p,
  button {
    color: #f5f6fa;
  }

  button {
    margin-top: 10px;
    align-self: flex-start;
    background: #e84118;
    border: 0;
    padding: 6px 32px;
    font-size: 16px;
    border-radius: 4px;

    @media (min-width: 500px) {
      align-self: inherit;
      font-size: 18px;
      padding: 12px 48px;
      border-radius: 8px;
    }
  }
`
