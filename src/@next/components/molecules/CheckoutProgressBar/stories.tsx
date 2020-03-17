import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
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
  range: true,
  min: 0,
  max: 3,
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
