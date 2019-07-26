import { mount, shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { AddNewTile, CCProviders, TileGrid } from "@components/atoms";
import { CreditCardGrid } from "./CreditCardGrid";

describe("<CreditCardGrid/>", () => {
  it("exists", () => {
    const creditCardGrid = shallow(<CreditCardGrid creditCards={[]} />);
    expect(creditCardGrid.exists()).toEqual(true);
  });

  it("should contain only AddNewTile if no credit cards provider", () => {
    const creditCardGrid = mount(<CreditCardGrid creditCards={[]} />);
    expect(creditCardGrid.find(TileGrid).props().elements.length).toBe(1);
    const firstTile = creditCardGrid.find(TileGrid).props().elements[0];
    expect((firstTile as any).type).toBe(AddNewTile);
  });
  it("should contain AddNewTile and 3 credit cards tiles for provided array with credit card details", () => {
    const visa: CCProviders = "visa";
    const ccData = {
      creditCardProvider: visa,
      expirationDate: "05/2019",
      last4Digits: 9876,
      nameOnCard: "John Doe",
    };

    const ccArray = [ccData, ccData, ccData];
    const creditCardGrid = shallow(<CreditCardGrid creditCards={ccArray} />);
    expect(creditCardGrid.find(TileGrid).props().elements.length).toEqual(4);
  });
});
