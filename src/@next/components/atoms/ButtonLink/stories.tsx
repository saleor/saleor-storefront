import { storiesOf } from "@storybook/react";
import React from "react";

const TEXT = "Text";

import { ButtonLink } from ".";
storiesOf("@components/atoms/ButtonLink", module)
  .addParameters({ component: ButtonLink })
  .add("Base", () => <ButtonLink testingContext="test">{TEXT}</ButtonLink>)
  .add("Secondary", () => <ButtonLink color="secondary" testingContext="test">{TEXT}</ButtonLink>)
  .add("Size sm", () => <ButtonLink size="sm" testingContext="test">{TEXT}</ButtonLink>);
