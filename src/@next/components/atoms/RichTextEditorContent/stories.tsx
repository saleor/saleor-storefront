import { OutputData } from "@editorjs/editorjs";
import { storiesOf } from "@storybook/react";
import React from "react";

import * as fixtures from "./fixtures.json";
import {
  RichTextEditorContent,
  RichTextEditorContentProps,
} from "./RichTextEditorContent";

export const data: OutputData = fixtures.richTextEditor;

const props: RichTextEditorContentProps = {
  data,
  onReady: () => undefined,
};

storiesOf("@components/atoms/RichTextEditorContent", module)
  .addParameters({ component: RichTextEditorContent })
  .add("default", () => <RichTextEditorContent {...props} />);
