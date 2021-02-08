import "jest-styled-components";

import { mount, shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "@styles";

import { ProductDescription } from ".";
import { attributes, descriptionJSON } from "./fixtures";
import * as S from "./styles";

describe("<ProductDescription />", () => {
  it("exists", () => {
    const wrapper = shallow(
      <ProductDescription
        attributes={attributes}
        description={descriptionJSON}
      />
    );

    expect(wrapper.exists()).toEqual(true);
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={defaultTheme}>
          <ProductDescription
            attributes={attributes}
            description={descriptionJSON}
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show product attributes when clicking on attributes tab", () => {
    const wrapper = mount(
      <ProductDescription
        attributes={attributes}
        description={descriptionJSON}
      />
    );

    wrapper.find(S.TabTitle).at(1).simulate("click");

    attributes.forEach(attribute =>
      expect(wrapper.text()).toContain(attribute.attribute.name)
    );
  });
});
