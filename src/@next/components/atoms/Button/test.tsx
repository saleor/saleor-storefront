import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Button } from ".";
import * as S from "./styles";

describe("<Button />", () => {
  it("renders children", () => {
    const text = "test";
    const wrapper = shallow(<Button>{text}</Button>);

    expect(wrapper.text()).toEqual(text);
  });

  it("simulates click events", () => {
    const onButtonClick = jest.fn();
    const wrapper = shallow(<Button onClick={onButtonClick} />);

    wrapper.simulate("click");
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it("uses correct theme based on color prop", () => {
    const PrimaryButton = mount(<Button />);
    const SecondaryButton = mount(<Button color="secondary" />);

    expect(PrimaryButton).toHaveStyleRule(
      "background-color",
      defaultTheme.button.colors.primary.background
    );

    expect(SecondaryButton).toHaveStyleRule(
      "background-color",
      defaultTheme.button.colors.secondary.background
    );
  });

  it("uses correct theme based on size prop", () => {
    const NormalButtonText = mount(<Button size="md" />).find(S.Text);
    const SmallButtonText = mount(<Button size="sm" />).find(S.Text);

    expect(NormalButtonText).toHaveStyleRule(
      "font-size",
      defaultTheme.button.typography.fontSize
    );

    expect(SmallButtonText).toHaveStyleRule(
      "font-size",
      defaultTheme.button.typography.smallFontSize
    );
  });
});
