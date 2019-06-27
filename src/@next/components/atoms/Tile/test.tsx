import { defaultTheme } from "@styles";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Tile } from ".";

describe("<Tile />", () => {
  it("renders header, footer and content", () => {
    const headerText = "This is header";
    const contentText = "This is content";
    const footerText = "This is footer";

    const addHTMLSurroundingTag = (text: string) => <p>{text}</p>;

    const wrapper = shallow(
      <Tile
        header={addHTMLSurroundingTag(headerText)}
        footer={addHTMLSurroundingTag(footerText)}
      >
        {addHTMLSurroundingTag(contentText)}
      </Tile>
    );
    expect(wrapper.text()).toContain(headerText);
    expect(wrapper.text()).toContain(contentText);
    expect(wrapper.text()).toContain(footerText);
  });
  it("changes style for hover tile type", () => {
    const wrapper = mount(
      <Tile>
        <p>This is content</p>
      </Tile>
    );

    const wrapperWithHover = mount(
      <Tile tileType="hover">
        <p>This is content</p>
      </Tile>
    );

    expect(wrapper).not.toHaveStyleRule(
      "border-color",
      defaultTheme.tile.hoverBorder,
      {
        modifier: ":hover",
      }
    );

    expect(wrapperWithHover).toHaveStyleRule(
      "border-color",
      defaultTheme.tile.hoverBorder,
      {
        modifier: ":hover",
      }
    );
  });

  it("changes style for addNew tile type", () => {
    const wrapper = mount(
      <Tile>
        <p>This is content</p>
      </Tile>
    );

    const wrapperWithAddNew = mount(
      <Tile tileType="addNew">
        <p>This is content</p>
      </Tile>
    );

    expect(wrapper).toHaveStyleRule(
      "background-color",
      defaultTheme.tile.backgroundColor
    );

    expect(wrapperWithAddNew).toHaveStyleRule(
      "background-color",
      defaultTheme.colors.secondary,
      {
        modifier: ":hover",
      }
    );
    expect(wrapperWithAddNew).toHaveStyleRule(
      "color",
      defaultTheme.colors.white,
      {
        modifier: ":hover",
      }
    );
  });
});
