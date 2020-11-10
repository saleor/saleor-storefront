import { shallow } from "enzyme";
import React from "react";

import { RichTextContent, IProps } from ".";
import customDescriptionJson from "./fixtures/text_blocks";

describe("<RichTextContent />", () => {
  const PROPS = {
    descriptionJson: customDescriptionJson,
  };
  const renderRichTextContent = (props: IProps) =>
    shallow(<RichTextContent {...props} />);

  it("exists", () => {
    const richTextContent = renderRichTextContent(PROPS);

    expect(richTextContent.exists()).toEqual(true);
  });
});
