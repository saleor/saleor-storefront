import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import { Select } from ".";

const Container = styled.div`
  padding: 2rem;
  width: 350px;
`;

const country = { label: "Poland", value: "PL" };
const DEFAULT_PROPS = {
  label: "Country",
  name: "country",
  onBlur: (name: any, value: any) => {
    return value;
  },
  onChange: (name: any, inputValue: any) => {
    DEFAULT_PROPS.value.label = inputValue.label;
    DEFAULT_PROPS.value.value = inputValue.value;
  },
  options: [
    { value: "PL", label: "Poland" },
    { value: "PT", label: "Portugal" },
    { value: "US", label: "United States of America" },
    { value: "DE", label: "Germany" },
    { value: "BE", label: "Belarus" },
    { value: "SE", label: "Sweden" },
    { value: "FR", label: "France" },
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
