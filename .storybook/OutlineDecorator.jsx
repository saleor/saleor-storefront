import React from "react";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../src/@next/globalStyles";
import { defaultTheme } from "../src/@next/globalStyles";
import * as S from "./styles";

export const OutLineDecorator = Story => (
  <ThemeProvider theme={defaultTheme}>
    <S.Wrapper>
      <Story />
      <S.Outline />
      <GlobalStyle />
    </S.Wrapper>
  </ThemeProvider>
);
