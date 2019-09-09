import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";

const Wrapper = styled.div`
  width: 360px;
`;

import { AccountMenu } from ".";
storiesOf("@components/molecules/AccountMenu", module).add("default", () => (
  <Wrapper>
    <AccountMenu />
  </Wrapper>
));
