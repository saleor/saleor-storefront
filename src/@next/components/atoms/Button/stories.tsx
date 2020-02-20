import { boolean } from "@storybook/addon-knobs";
// import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from ".";

// storiesOf("@components/atoms/Button", module)
//   .add("Primary", () => (
//     <Button fullWidth={boolean("FullWidth", false)}>Primary Button</Button>
//   ))
//   .add("Secondary", () => (
//     <Button color="secondary" fullWidth={boolean("FullWidth", false)}>
//       Secondary Button
//     </Button>
//   ))
//   .add("Size sm", () => (
//     <Button size="sm" fullWidth={boolean("FullWidth", false)}>
//       Small Button
//     </Button>
//   ));

export default {
  component: Button,
  title: "@components/atoms/Button",
};

export const Primary = () => (
  <Button fullWidth={boolean("FullWidth", false)}>Primary Button</Button>
);
export const Secondary = () => (
  <Button color="secondary" fullWidth={boolean("FullWidth", false)}>
    Secondary Button
  </Button>
);
export const SizeSm = () => (
  <Button size="sm" fullWidth={boolean("FullWidth", false)}>
    Small Button
  </Button>
);
