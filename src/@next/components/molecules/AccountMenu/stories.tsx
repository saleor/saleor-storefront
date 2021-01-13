import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { paths } from "@paths";
import { styled } from "@styles";

import { AccountMenu } from ".";

const Wrapper = styled.div`
  width: 360px;
`;

const links = [
  paths.account,
  paths.accountOrderHistory,
  paths.accountAddressBook,
];
const active = paths.accountAddressBook;

const DEFAULT_PROPS = { ...{ links, active } };
storiesOf("@components/molecules/AccountMenu", module)
  .addParameters({ component: AccountMenu })
  .addDecorator(story => <IntlProvider locale="en">{story()}</IntlProvider>)
  .add("default", () => (
    <Wrapper>
      <AccountMenu {...DEFAULT_PROPS} />
    </Wrapper>
  ));
