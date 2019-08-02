import { shallow } from "enzyme";
import React from "react";

import { SizeOverlay } from ".";
import { IProps } from "./types";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal-root");
  document.body.appendChild(portalRoot);
}

describe("<SizeOverlay />", () => {
  const DEFAULT_PROPS = {
    hide: jest.fn(),
    onClick: jest.fn(),
    show: true,
    target: portalRoot,
    values: [],
  };

  const renderSizeOverlay = (props: IProps) =>
    shallow(<SizeOverlay {...props} />);

  it("exists", () => {
    const overlay = renderSizeOverlay(DEFAULT_PROPS);

    expect(overlay.exists()).toEqual(true);
  });

  it("should render values", () => {
    const value = "M";
    const overlay = renderSizeOverlay({
      ...DEFAULT_PROPS,
      values: [value],
    });

    expect(overlay.contains(value)).toBe(true);
  });
});
