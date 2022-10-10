import styled from 'styled-components'
import colors from 'styles/colors'

export const SContainer = styled.div`
  max-width: 700px;
  margin: 20px 0;

  h1 {
    margin-bottom: 20px;
  }

  * {
    color: ${colors.white};
  }

  a {
    display: inline-block;
    margin: 20px 0;
    font-size: 18px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 15px;

    h3 {
      font-size: 18px;
      margin-bottom: 6px;
    }
  }
`
