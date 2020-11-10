import { storiesOf } from "@storybook/react";
import React from "react";

import { RichTextContent } from ".";
import descriptionJson from "./fixtures/default_text_block";

storiesOf("@components/atoms/RichTextContent", module)
  .addParameters({ component: RichTextContent })
  .add("default", () => <RichTextContent descriptionJson={descriptionJson} />);
