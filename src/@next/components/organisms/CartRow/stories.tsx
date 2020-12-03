import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartRow } from ".";
import { DEFAULT_PROPS } from "./fixtures";

const STORY_PROPS = {
  onQuantityChange: action("onQuantityChange has been called"),
  onRemove: action("onRemove has been called"),
  ...DEFAULT_PROPS,
};

storiesOf("@components/organisms/CartRow", module)
  .addParameters({ component: CartRow })
  .add("responsive", () => (
    <IntlProvider locale="en">
      <CartRow {...STORY_PROPS} />
    </IntlProvider>
  ))
  .add("condense", () => (
    <IntlProvider locale="en">
      <CartRow {...STORY_PROPS} type="condense" />
    </IntlProvider>
  ));
