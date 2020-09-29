import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AddToCartButton } from ".";
import { IAddToCartButton } from "./AddToCartButton";

const DEFAULT_PROPS: IAddToCartButton = {
  disabled: false,
  onSubmit: () => undefined,
};

storiesOf("@components/molecules/AddToCartButton", module)
  .addParameters({ component: AddToCartButton })
  .addDecorator(story => <IntlProvider locale="en">story()</IntlProvider>)
  .add("default", () => <AddToCartButton {...DEFAULT_PROPS} />)
  .add("disabled", () => <AddToCartButton {...DEFAULT_PROPS} disabled />);
