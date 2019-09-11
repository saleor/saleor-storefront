import { storiesOf } from "@storybook/react";
import React from "react";

import { Attribute } from ".";
storiesOf("@components/atoms/Attribute", module).add("default", () => (
  <Attribute description="First Name" attributeValue="John" />
));
