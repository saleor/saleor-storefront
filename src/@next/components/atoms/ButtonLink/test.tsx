import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ButtonLink } from ".";
import { IProps } from "./types";

const TEXT = "Text";
const DEFAULT_PROPS = {
  text: TEXT,
};

describe("<ButtonLink />", () => {
  const renderButtonLink = (props: IProps) =>
    shallow(<ButtonLink {...props} />);

  it("exists", () => {
    const buttonLink = renderButtonLink(DEFAULT_PROPS);

    expect(buttonLink.exists()).toEqual(true);
  });

  it("renders children", () => {
    const buttonLink = renderButtonLink(DEFAULT_PROPS);

    expect(buttonLink.text()).toEqual(TEXT);
  });

  it("simulates click events", () => {
    const onButtonLinkClick = jest.fn();
    const buttonLink = renderButtonLink({
      ...DEFAULT_PROPS,
      onClick: onButtonLinkClick,
    });

    buttonLink.simulate("click");
    expect(onButtonLinkClick).toHaveBeenCalled();
  });
});
