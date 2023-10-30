import { createGlobalStyle } from "styled-components";
import { colors } from "..";

export const GlobalStyles = createGlobalStyle`  
  body {
    font-family: var(--font-ortica), sans-serif;
    font-style: normal;
    font-weight: normal;
    margin: 0;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    outline: none;
  }

  a,
  button,
  input,
  label,
  select,
  textarea {
    outline: 0;
  }

  a {
    text-decoration: none;
    color: ${colors.black};
  }

  button {
    cursor: pointer;
    border: 0;
    outline: 0;
    background: none;
    padding: 0;
    margin: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  table {
    border-collapse: collapse;
  }
`;
