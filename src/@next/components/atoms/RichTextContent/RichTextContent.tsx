import { sanitize } from "dompurify";
import draftToHtml from "draftjs-to-html";
import React from "react";

import { IProps } from "./types";

export const RichTextContent: React.FC<IProps> = ({ descriptionJson }) => (
  <>
    {descriptionJson && (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(draftToHtml(JSON.parse(descriptionJson))),
        }}
      />
    )}
  </>
);
