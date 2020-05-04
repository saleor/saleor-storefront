import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { Cart } from ".";

describe("<Cart />", () => {
  it("exists", () => {
    const wrapper = shallow(<Cart />);

    expect(wrapper.exists()).toEqual(true);
  });

  it("should show passed breadcrumbs", () => {
    const breadcrumbs = "breadcrumbs";
    const wrapper = shallow(<Cart breadcrumbs={breadcrumbs} />);

    expect(wrapper.text()).toContain(breadcrumbs);
  });

  it("should show passed title", () => {
    const title = "title";
    const wrapper = shallow(<Cart title={title} />);

    expect(wrapper.text()).toContain(title);
  });

  it("should show passed cart", () => {
    const cart = "cart";
    const wrapper = shallow(<Cart cart={cart} />);

    expect(wrapper.text()).toContain(cart);
  });

  it("should show passed button", () => {
    const button = "button";
    const wrapper = shallow(<Cart button={button} />);

    expect(wrapper.text()).toContain(button);
  });
});
