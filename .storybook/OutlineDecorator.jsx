import React from "react";

import { GlobalStyle } from "../src/@next/globalStyles";
import { Wrapper, Outline } from "./styles";

export const OutLineDecorator = storyFn => (
  <Wrapper>
    {storyFn()}
    <Outline />
    <GlobalStyle />
  </Wrapper>
);
