import { storiesOf } from "@storybook/react";
import React from "react";

import { Tile } from ".";
import { createStory } from "../baseStory";

storiesOf("@components/atoms/Tile", module)
  .add("default", () => (
    <Tile header={<h3>This is header</h3>}>
      <div>This is body</div>
    </Tile>
  ))
  .add("with hover", () => (
    <Tile
      hover={true}
      header={<h3>This is header</h3>}
      footer={<p>And this is footer</p>}
    >
      <div>This is body</div>
    </Tile>
  ));
