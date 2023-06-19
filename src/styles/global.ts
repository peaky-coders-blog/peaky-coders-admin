import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    font-family: 'Rubik', sans-serif;

    min-height:  100vh;
    margin: 0;
    padding: 0;
    
    font-size: 16px;
    font-weight: 400;
    
    background-color: #F0F2F5;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  ul {
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .wmde-markdown{
    background-color: #2D2D2D;
  }
  .w-md-editor {
    background-color: #2D2D2D;
  }
  .code-highlight {
    background-color: #222121 !important;
  }
`
