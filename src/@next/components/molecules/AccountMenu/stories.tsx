import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";
import { IntlProvider } from "react-intl";

import { MemoryRouter } from "react-router";
import { AccountMenu } from ".";

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
storiesOf("@components/molecules/AccountMenu", module)
  .addParameters({ component: AccountMenu })
  .addDecorator(story => (
    <IntlProvider locale="en">
      <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
    </IntlProvider>
  ))
  .add("default", () => (
    <Wrapper>
      <AccountMenu {...DEFAULT_PROPS} />
    </Wrapper>
  ));
