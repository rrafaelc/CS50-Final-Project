import styled from 'styled-components'

export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;

  .tmdb {
    max-width: 275px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      text-align: center;
    }

    .img {
      margin-top: 20px;
      position: relative;
      width: 300px;
      height: 40px;
    }

    @media (min-width: 1000px) {
      max-width: 570px;

      p {
        font-size: 32px;
      }
    }
  }

  .social {
    margin-top: 50px;
    display: flex;
    gap: 20px;

    a {
      position: relative;
      width: 50px;
      height: 50px;
    }

    .linkedin {
      width: 54px;
      height: 54px;
    }
  }
`
