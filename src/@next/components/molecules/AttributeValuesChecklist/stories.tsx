import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { styled } from "@styles";
import React from "react";

import { AttributeValuesChecklist } from ".";
import { GET_DEFAULT_PROPS } from "./fixtures";

const Container = styled.div`
  width: 350px;
`;

storiesOf("@components/molecules/AttributeValuesChecklist", module)
  .addParameters({ component: AttributeValuesChecklist })
  .add("default", () => (
    <Container>
      <AttributeValuesChecklist
        {...GET_DEFAULT_PROPS({ onValueClick: action("click") })}
      />
    </Container>
  ));
