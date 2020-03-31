import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";
import { MemoryRouter } from "react-router";

import { AccountMenuMobile } from ".";

const Wrapper = styled.div`
  margin-top: 100px;
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

storiesOf("@components/molecules/AccountMenuMobile", module)
  .addParameters({ component: AccountMenuMobile })
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("default", () => (
    <Wrapper>
      <AccountMenuMobile {...DEFAULT_PROPS} />
    </Wrapper>
  ));
