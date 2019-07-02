import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { ButtonLink } from ".";
import { IProps } from "./types";

const TEXT = "Text";

describe("<ButtonLink />", () => {
  const renderButtonLink = (props?: IProps) =>
    shallow(<ButtonLink {...props}>{TEXT}</ButtonLink>);

  it("exists", () => {
    const buttonLink = renderButtonLink();

    expect(buttonLink.exists()).toEqual(true);
  });

  it("renders children", () => {
    const buttonLink = renderButtonLink();

    expect(buttonLink.text()).toEqual(TEXT);
  });

  it("simulates click events", () => {
    const onButtonLinkClick = jest.fn();
    const PROPS = {
      children: TEXT,
      onClick: onButtonLinkClick,
    };
    const buttonLink = renderButtonLink(PROPS);

    buttonLink.simulate("click");
    expect(onButtonLinkClick).toHaveBeenCalled();
  });
});
