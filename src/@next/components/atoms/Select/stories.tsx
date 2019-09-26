import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import { Select } from ".";

const Container = styled.div`
  padding: 2rem;
  width: 350px;
`;

const country = { country: "Poland", code: "PL" };
const DEFAULT_PROPS = {
  label: "Country",
  name: "country",
  onBlur: (name: any, value: any) => {
    return value;
  },
  onChange: (name: any, inputValue: any) => {
    DEFAULT_PROPS.value.country = inputValue.label;
    DEFAULT_PROPS.value.code = inputValue.value;
  },
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
  ],
  value: country,
};

storiesOf("@components/atoms/Select", module).add("sample select", () => {
  return (
    <Container>
      <Select {...DEFAULT_PROPS} />
    </Container>
  );
});
