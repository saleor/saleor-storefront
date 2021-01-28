import type EditorJS from "@editorjs/editorjs";
import {
  OutputData,
  ToolConstructable,
  ToolSettings,
} from "@editorjs/editorjs";
import createGenericInlineTool from "editorjs-inline-tool";
import React from "react";

import * as S from "./styles";

export interface RichTextEditorContentProps {
  jsonData: string;
}

export const getTools = async (): Promise<
  Record<string, ToolConstructable | ToolSettings>
> => {
  const [Header, List, Quote] = await Promise.all([
    /* eslint-disable global-require */
    require("@editorjs/header"),
    require("@editorjs/list"),
    require("@editorjs/quote"),
    /* eslint-enable global-require */
  ]);

  return {
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
};

export const RichTextEditorContent: React.FC<RichTextEditorContentProps> = ({
  jsonData,
}) => {
  const editor = React.useRef<EditorJS>();
  const editorContainer = React.useRef<HTMLDivElement>(null);

  const data: OutputData = JSON.parse(jsonData);

  React.useEffect(() => {
    if (data && editorContainer.current) {
      (async () => {
        const Editor: typeof EditorJS = await require("@editorjs/editorjs"); // eslint-disable-line  global-require

        editor.current = new Editor({
          data,
          holder: editorContainer.current!,
          readOnly: true,
          tools: await getTools(),
        });
      })();
    }

    return editor.current?.destroy;
  }, [jsonData]);

  return <S.Content ref={editorContainer} />;
};
