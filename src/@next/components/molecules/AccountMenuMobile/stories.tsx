import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";
import { IntlProvider } from "react-intl";

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
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => (
    <Wrapper>
      <AccountMenuMobile {...DEFAULT_PROPS} />
    </Wrapper>
  ));
