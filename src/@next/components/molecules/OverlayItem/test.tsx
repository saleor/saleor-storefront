import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Icon } from "@components/atoms";

import { OverlayItem } from ".";
import { IProps } from "./types";

describe("<OverlayItem />", () => {
  const children = "Item";
  const DEFAULT_PROPS = {
    children,
    dataCy: "test",
  };

  const renderOverlayItem = (props: IProps) =>
    shallow(<OverlayItem {...props}>{children}</OverlayItem>);

  it("exists", () => {
    const item = renderOverlayItem(DEFAULT_PROPS);

    expect(item.exists()).toEqual(true);
  });

  it("should render tick icon when `selected` prop is passed", () => {
    const icon = renderOverlayItem({ ...DEFAULT_PROPS, selected: true }).find(
      Icon
    );

    expect(icon.exists()).toEqual(true);
    expect(icon.prop("name")).toEqual("tick");
  });

  it("simulates click events", () => {
    const onClick = jest.fn();
    const item = renderOverlayItem({ ...DEFAULT_PROPS, onClick });

    item.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });
});
