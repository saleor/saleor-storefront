import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { styled } from "@styles";

import { IconButton } from "../IconButton";
import { DropdownMenu } from ".";

const Container = styled.div`
  width: 600px;
  height: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;
const onClick = action("onClick");
const header = (
  <IconButton
    testingContext="editButton"
    size={19}
    name="edit"
    onClick={onClick}
  />
);
const items = [
  { onClick, content: <span>MY ACCOUNT</span> },
  { onClick, content: <span>ORDER HISTORY</span> },
  { onClick, content: <span>LOG OUT</span> },
];

storiesOf("@components/atoms/DropdownMenu", module)
  .addParameters({ component: DropdownMenu })
  .add("hoverable", () => (
    <Container>
      <DropdownMenu type="hoverable" header={header} items={items} />
    </Container>
  ))
  .add("clickable", () => (
    <Container>
      <DropdownMenu type="clickable" header={header} items={items} />
    </Container>
  ));
