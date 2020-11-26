import { storiesOf } from "@storybook/react";
import React from "react";

import * as fixtures from "./fixtures";
import {
  RichTextEditorContent,
  RichTextEditorContentProps,
} from "./RichTextEditorContent";

const props: RichTextEditorContentProps = {
  jsonData: fixtures.jsonData,
};

storiesOf("@components/atoms/RichTextEditorContent", module)
  .addParameters({ component: RichTextEditorContent })
  .add("default", () => <RichTextEditorContent {...props} />);
