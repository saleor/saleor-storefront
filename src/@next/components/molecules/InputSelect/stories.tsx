import { storiesOf } from "@storybook/react";
import React from "react";

import { styled } from "@styles";

const DEFAULT_PROPS = {
  label: "Country",
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

const Wrapper = styled.div`
  max-height: 200px;
`;

const Container = () => {
  const [value, setValue] = React.useState();
  return (
    <InputSelect
      dataCy="test"
      value={value}
      onChange={value => setValue(value)}
      {...DEFAULT_PROPS}
    />
  );
};

import { InputSelect } from ".";
storiesOf("@components/molecules/InputSelect", module)
  .addParameters({ component: InputSelect })
  .add("default", () => (
    <Wrapper>
      <Container />
    </Wrapper>
  ));
