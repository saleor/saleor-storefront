import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { CheckoutProgressBar } from ".";

const steps = [
  {
    link: "#",
    name: "Shipping",
  },

  {
    link: "#",
    name: "Billing",
  },
  {
    link: "#",
    name: "Payment",
  },
  {
    link: "#",
    name: "Review",
  },
];

const label = "Active step";
const defaultValue = 1;
const options = {
  max: 3,
  min: 0,
  range: true,
  step: 1,
};

storiesOf("@components/molecules/CheckoutProgressBar", module)
  .addParameters({ component: CheckoutProgressBar })
  .add("default", () => {
    const value = number(label, defaultValue, options);
    return (
      <MemoryRouter>
        <CheckoutProgressBar steps={steps} activeStep={value} />
      </MemoryRouter>
    );
  });
