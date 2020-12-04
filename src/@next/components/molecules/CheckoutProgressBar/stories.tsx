import { storiesOf } from "@storybook/react";
import React from "react";

import { MemoryRouter } from "react-router";

import { CheckoutProgressBar } from ".";

const steps = [
  {
    index: 0,
    link: "#",
    name: "Shipping",
  },

  {
    index: 1,
    link: "#",
    name: "Billing",
  },
  {
    index: 2,
    link: "#",
    name: "Payment",
  },
  {
    index: 3,
    link: "#",
    name: "Review",
  },
];

storiesOf("@components/molecules/CheckoutProgressBar", module)
  .addParameters({ component: CheckoutProgressBar })
  .add("first", () => {
    return (
      <MemoryRouter>
        <CheckoutProgressBar steps={steps} activeStep={1} />
      </MemoryRouter>
    );
  })
  .add("second", () => {
    return (
      <MemoryRouter>
        <CheckoutProgressBar steps={steps} activeStep={2} />
      </MemoryRouter>
    );
  })
  .add("third", () => {
    return (
      <MemoryRouter>
        <CheckoutProgressBar steps={steps} activeStep={3} />
      </MemoryRouter>
    );
  });
