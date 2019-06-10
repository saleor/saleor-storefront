import React from "react";
import { ThemeProvider } from "styled-components";

import { Wrapper, Outline } from "./styles";
import { defaultTheme } from "../src/globalStyles";

const StylesDecorator = storyFn => (
  <ThemeProvider theme={defaultTheme}>
    <Wrapper>
      {storyFn()}
      <Outline />
    </Wrapper>
  </ThemeProvider>
);

export default StylesDecorator;
