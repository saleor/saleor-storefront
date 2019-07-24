import React from "react";

import { I18nLoader } from "@components/containers/";

import { GlobalStyle } from "../src/@next/globalStyles";
import * as S from "./styles";

import { i18nMark } from "@lingui/react";
import { languages } from "../src/languages";

export const OutLineDecorator = storyFn => (
  <S.Wrapper>
    <I18nLoader languages={languages}>
      {storyFn()}
      <S.Outline />
      <GlobalStyle />
    </I18nLoader>
  </S.Wrapper>
);
