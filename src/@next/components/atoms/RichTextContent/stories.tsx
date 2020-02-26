import { storiesOf } from "@storybook/react";
import React from "react";

import { RichTextContent } from ".";
import descriptionJson from "./fixtures/default_text_block";
import customDescriptionJson from "./fixtures/text_blocks";

storiesOf("@components/atoms/RichTextContent", module)
  .addParameters({ component: RichTextContent })
  .add("default", () => <RichTextContent descriptionJson={descriptionJson} />)
  .add("custom", () => (
    <RichTextContent descriptionJson={customDescriptionJson} />
  ));
