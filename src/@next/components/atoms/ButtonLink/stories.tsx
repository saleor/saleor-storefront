import { storiesOf } from "@storybook/react";
import React from "react";

const TEXT = "Text";

import { ButtonLink } from ".";
storiesOf("@components/atoms/ButtonLink", module)
  .add("Base", () => <ButtonLink text={TEXT} />)
  .add("Secondary", () => <ButtonLink text={TEXT} color="secondary" />)
  .add("Size sm", () => <ButtonLink text={TEXT} size="sm" />);
