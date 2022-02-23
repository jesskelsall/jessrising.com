import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 16px;
    color: black;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
