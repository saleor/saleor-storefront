import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";

import { AddressGrid } from ".";

const address = {
  address: {
    city: "Wroclaw",
    companyName: "Mirumee",
    country: {
      code: "PL",
      country: "Poland",
    },
    countryArea: "dolnyslask",
    firstName: "John",
    isDefaultBillingAddress: false,
    isDefaultShippingAddress: true,
    lastName: "Doe",
    phone: "555-5555",
    postalCode: "55-555",
    streetAddress1: "St Street",
    streetAddress2: "Second",
  },
  id: "12345",
  onEdit: jest.fn(),
  onRemove: jest.fn(),
  setDefault: jest.fn(),
};

const DEFAULT_PROPS = {
  // tslint:disable-next-line: no-empty
  addNewAddress: () => {},
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
    const wrapper = shallow(
      <AddressGrid addNewAddress={jest.fn()} addresses={[]} />
    );
    const firstTile = wrapper.find(TileGrid).props().elements[0];

    expect(wrapper.find(TileGrid).props().elements.length).toBe(1);
    expect((firstTile as any).type).toBe(AddNewTile);
  });

  it("should contain AddNewTile and 3 address tiles for provided array of addresses", () => {
    const addressArray = [address, address, address];
    addressArray[0].id = "0";
    addressArray[1].id = "1";
    addressArray[2].id = "2";
    const wrapper = shallow(
      <AddressGrid addNewAddress={jest.fn()} addresses={addressArray} />
    );

    expect(wrapper.find(TileGrid).props().elements.length).toBe(4);
  });
});
