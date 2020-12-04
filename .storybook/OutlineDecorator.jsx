import React from "react";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "../src/@next/globalStyles";
import { defaultTheme } from "../src/@next/globalStyles";
import * as S from "./styles";

export const OutLineDecorator = (Story,context) => (
  <ThemeProvider theme={defaultTheme}>
    <IntlProvider locale={context.globals.locale}>
    <S.Wrapper>
      <Story />
      <S.Outline />
      <GlobalStyle />
    </S.Wrapper>
    </IntlProvider>
  </ThemeProvider>
);
