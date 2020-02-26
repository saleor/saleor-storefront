import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Loader } from ".";

storiesOf("@components/atoms/Loader", module)
  .addParameters({ component: Loader })
  .add("default", () => <Loader fullScreen={boolean("Fullscreen", false)} />);
