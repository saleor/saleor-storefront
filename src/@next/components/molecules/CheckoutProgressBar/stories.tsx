import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";
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
      <IntlProvider locale="en">
        <MemoryRouter>
          <CheckoutProgressBar steps={steps} activeStep={1} />
        </MemoryRouter>
      </IntlProvider>
    );
  })
  .add("second", () => {
    return (
      <IntlProvider locale="en">
        <MemoryRouter>
          <CheckoutProgressBar steps={steps} activeStep={2} />
        </MemoryRouter>
      </IntlProvider>
    );
  })
  .add("third", () => {
    return (
      <IntlProvider locale="en">
        <MemoryRouter>
          <CheckoutProgressBar steps={steps} activeStep={3} />
        </MemoryRouter>
      </IntlProvider>
    );
  });
