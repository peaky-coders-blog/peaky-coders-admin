import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    min-height:  100vh;
    margin: 0;
    padding: 0;

    font-family: Rubik, sans-serif;
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

  [class^="devicon-"] {
    font-size: 32px;
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

  .code-highlight .code-line {
    background-color: #222121;
  }

  .language-markdown .code-line {
    background-color: #2D2D2D !important;
  }
`
