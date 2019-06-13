import React from "react";

import { Wrapper, Outline } from "./styles";

export const OutLineDecorator = storyFn => (
  <Wrapper>
    {storyFn()}
    <Outline />
  </Wrapper>
);
