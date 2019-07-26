import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";

import { AddressGrid } from ".";

const address = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: "Poland",
    countryArea: "dolnyslask",
    firstName: "John",
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  isDefaultBillingAddress: false,
  isDefaultShippingAddress: true,
  onEdit: jest.fn(),
  onRemove: jest.fn(),
  setDefault: jest.fn(),
};

const DEFAULT_PROPS = {
  addresses: [
    {
      ...address,
    },
  ],
};

describe("<AddressGrid />", () => {
  it("exists", () => {
    const wrapper = shallow(<AddressGrid {...DEFAULT_PROPS} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should contain only AddNewTile if no addresses provided", () => {
    const wrapper = shallow(<AddressGrid addresses={[]} />);
    expect(wrapper.find(TileGrid).props().elements.length).toBe(1);
    const firstTile = wrapper.find(TileGrid).props().elements[0];
    expect((firstTile as any).type).toBe(AddNewTile);
  });

  it("should contain AddNewTile and 3 address tiles for provided array of addresses", () => {
    const addressArray = [address, address, address];
    const wrapper = shallow(<AddressGrid addresses={addressArray} />);

    expect(wrapper.find(TileGrid).props().elements.length).toBe(4);
  });
});
