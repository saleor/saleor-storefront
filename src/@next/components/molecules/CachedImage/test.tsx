import { shallow } from "enzyme";
import React from "react";

import { CachedImage } from ".";

const sampleImage = "https://dummyimage.com/600x400/000/fff";

describe("<CachedImage />", () => {
  it("Renders img", () => {
    const wrapper = shallow(<CachedImage url={sampleImage} />);

    expect(wrapper.find("img").prop("src")).toEqual(sampleImage);
  });
});
