import { storiesOf } from "@storybook/react";
import React from "react";

import { Checkout } from ".";

const style = {
  backgroundColor: "#ccc",
  border: "1px solid black",
  padding: "10px",
};

const navigation = <div style={style}>Navigation</div>;
const checkout = <div style={style}>Checkout</div>;
const paymentGateways = <div style={style}>Payment gateways</div>;
const cartSummary = <div style={style}>Cart summary</div>;
const button = <button style={style}>Button</button>;

storiesOf("@components/templates/Checkout", module)
  .addParameters({ component: Checkout })
  .add("default", () => (
    <Checkout
      navigation={navigation}
      checkout={checkout}
      paymentGateways={paymentGateways}
      cartSummary={cartSummary}
      button={button}
    />
  ));
