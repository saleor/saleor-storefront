import { storiesOf } from "@storybook/react";
import React from "react";

import { CCProviders } from "@components/atoms";
import { CreditCardGrid } from ".";

const visa: CCProviders = "visa";

const ccData = {
  creditCardProvider: visa,
  expirationDate: "05/2019",
  last4Digits: 9876,
  nameOnCard: "John Doe",
};

const elements = [ccData, ccData, ccData];

storiesOf("@components/organisms/CreditCardGrid", module)
  .addParameters({ component: CreditCardGrid })
  .add("default", () => <CreditCardGrid creditCards={elements} />);
