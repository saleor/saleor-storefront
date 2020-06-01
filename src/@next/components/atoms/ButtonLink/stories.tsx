import { storiesOf } from "@storybook/react";
import React from "react";

const TEXT = "Text";

import { ButtonLink } from ".";
storiesOf("@components/atoms/ButtonLink", module)
  .addParameters({ component: ButtonLink })
  .add("Base", () => <ButtonLink>{TEXT}</ButtonLink>)
  .add("Secondary", () => <ButtonLink color="secondary">{TEXT}</ButtonLink>)
  .add("Size sm", () => <ButtonLink size="sm">{TEXT}</ButtonLink>);
