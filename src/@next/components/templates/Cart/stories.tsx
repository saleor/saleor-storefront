import { storiesOf } from "@storybook/react";
import React from "react";

import { action } from "@storybook/addon-actions";

import { Cart } from ".";

storiesOf("@components/templates/Cart", module)
  .addParameters({ component: Cart })
  .add("default", () => (
    <Cart
      items={[]}
      updateItem={action("updateItem")}
      removeItem={action("removeItem")}
      loading={false}
      errors={[]}
    />
  ));
