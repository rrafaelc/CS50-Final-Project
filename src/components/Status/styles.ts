import styled from 'styled-components'

export const SContainerButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  margin-top: 10px;

  @media (max-width: 500px) {
    display: none;
  }
`

export const SButton = styled.button`
  background-color: transparent;
  color: white;

  .swiper-disabled {
    color: red;
  }
`
