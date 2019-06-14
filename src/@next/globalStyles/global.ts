import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from ".";

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    font-family: ${props => props.theme.typography.baseFontFamily};
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    color: ${props => props.theme.colors.baseFontColor};

    * {
      box-sizing: border-box;
    }

    h1 {
      font-size: ${props => props.theme.typography.h1FontSize};
      line-height: ${props => props.theme.typography.h1LineHeight};
    }

    h3 {
      font-size: ${props => props.theme.typography.h3FontSize};
      line-height: 1.7rem;
    }

    h4 {
      font-size: ${props => props.theme.typography.h4FontSize};
    }

    a {
      text-decoration: none;
      font-weight: normal;
      color: inherit;
    }

    p {
      line-height: 1.5rem;
    }

    #root {
      display: flex;
      min-height: 100vh;
      flex-direction: column;

      & > div:first-of-type {
        flex: 1;
      }
    }
  }
`;
