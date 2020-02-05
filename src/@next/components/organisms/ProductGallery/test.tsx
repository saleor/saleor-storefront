import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CachedImage } from "@components/molecules";

import { eightImages } from "./fixtures";

import { ProductGallery } from ".";

describe("<ProductGallery />", () => {
  it("exists", () => {
    const wrapper = shallow(<ProductGallery images={eightImages} />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain n+1 images", () => {
    const wrapper = shallow(<ProductGallery images={eightImages} />);

    expect(wrapper.find(CachedImage).length).toEqual(eightImages.length + 1);
  });
});
