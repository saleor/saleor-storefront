import { storiesOf } from "@storybook/react";
import React from "react";

import { Select } from ".";

const DEFAULT_PROPS = {
  name: "country",
  optionLabelKey: "country",
  optionValueKey: "code",
  options: [
    { code: "PL", country: "Poland" },
    { code: "PT", country: "Portugal" },
    { code: "US", country: "United States of America" },
    { code: "DE", country: "Germany" },
    { code: "BE", country: "Belarus" },
    { code: "SE", country: "Sweden" },
    { code: "FR", country: "France" },
    { code: "CZ", country: "Czech Republic" },
    { code: "FI", country: "Finland" },
    { code: "GB", country: "Great Britain" },
  ],
};

const Container = () => {
  const [value, setValue] = React.useState();
  return (
    <Select
      value={value}
      onChange={value => setValue(value)}
      {...DEFAULT_PROPS}
    />
  );
};

storiesOf("@components/atoms/Select", module)
  .addParameters({ component: Select })
  .add("sample select", () => {
    return <Container />;
  });
