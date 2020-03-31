import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";

const Wrapper = styled.div`
  width: 360px;
`;

const links = [
  "/personal-information/",
  "/address-book/",
  "/order-history/",
  "/payment-options/",
];
const active = "/address-book/";

const DEFAULT_PROPS = { ...{ links, active } };

import { MemoryRouter } from "react-router";
import { AccountMenu } from ".";
storiesOf("@components/molecules/AccountMenu", module)
  .addParameters({ component: AccountMenu })
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <Wrapper>
      <AccountMenu {...DEFAULT_PROPS} />
    </Wrapper>
  ));
