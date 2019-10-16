import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";

import { FilterAttribute } from ".";
import { DEFAULT_PROPS } from "./testData";

const Container = styled.div`
  width: 350px;
`;

storiesOf("@components/molecules/FilterAttribute", module).add(
  "default",
  () => (
    <Container>
      <FilterAttribute
        {...DEFAULT_PROPS}
        onAttributeFiltersChange={action("click")}
      />
    </Container>
  )
);
