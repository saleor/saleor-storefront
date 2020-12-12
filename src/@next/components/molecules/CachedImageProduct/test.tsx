import { shallow } from "enzyme";
import React from "react";

import { CachedImageProduct } from ".";

const sampleImage = "https://dummyimage.com/600x400/000/fff";

describe("<CachedImageProduct />", () => {
  it("Renders img", () => {
    const wrapper = shallow(<CachedImageProduct url={sampleImage} />);

    expect(wrapper.find("img").prop("src")).toEqual(sampleImage);
  });
});
