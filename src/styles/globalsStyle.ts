import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const GlobalStyle = createGlobalStyle`  
* {
  font-family: Roboto, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 0;
  outline: 0;
}

body {
  background-color: ${colors.bg_color};
  color: ${colors.white};

  margin: 0 auto;
  padding: 0 15px;
  max-width: 1140px;
}

button {
  cursor: pointer;
}
`

export default GlobalStyle
