import { storiesOf } from "@storybook/react";
import React from "react";

import styled from "styled-components";
import { Select } from ".";

const Container = styled.div`
  width: 300px;
  margin: 1rem;
`;

const DEFAULT_PROPS = {
  defaultValue: "Canada",
  label: "Country",
  options: [
    "Poland",
    "Germany",
    "England",
    "Italy",
    "RPA",
    "Lithuania",
    "Russia",
    "China",
    "Croatia",
    "Spain",
    "Canada",
  ],
};

storiesOf("@components/atoms/Select", module).add("default", () => (
  <Container>
    <Select {...DEFAULT_PROPS} />
  </Container>
));
