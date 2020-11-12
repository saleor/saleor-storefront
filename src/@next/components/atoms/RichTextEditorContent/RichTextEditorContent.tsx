import EditorJS, {
  OutputData,
  ToolConstructable,
  ToolSettings,
} from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import createGenericInlineTool from "editorjs-inline-tool";
import React from "react";

import * as S from "./styles";

export interface RichTextEditorContentProps {
  data: OutputData;
  onReady?: () => void;
}

export const tools: Record<string, ToolConstructable | ToolSettings> = {
  header: {
    class: Header,
    config: {
      defaultLevel: 1,
      levels: [1, 2, 3],
    },
  },
  list: List,
  quote: Quote,
  strikethrough: createGenericInlineTool({
    sanitize: {
      s: {},
    },
    shortcut: "CMD+S",
    tagName: "s",
    toolboxIcon: "",
  }),
};

export const RichTextEditorContent: React.FC<RichTextEditorContentProps> = ({
  data,
  onReady,
}) => {
  const editor = React.useRef<EditorJS>();
  const editorContainer = React.useRef<HTMLDivElement>(null);
  React.useEffect(
    () => {
      if (data && editorContainer.current) {
        editor.current = new EditorJS({
          data,
          holder: editorContainer.current,
          onReady,
          readOnly: true,
          tools,
        });
      }

      return editor.current?.destroy;
    },
    // Rerender editor only if changed from undefined to defined state
    [data === undefined]
  );
  React.useEffect(() => editor.current?.destroy, []);

  return <S.Content ref={editorContainer} />;
};
