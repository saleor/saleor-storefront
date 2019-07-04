import { shallow } from "enzyme";
import "jest-styled-components";
import React from "react";

import { CCProviders, TileGrid } from "@components/atoms";
import { CreditCardGrid } from "./CreditCardGrid";
import * as S from "./styles";

describe("<CreditCardGrid/>", () => {
  const DEFAULT_PROPS = {};

  it("exists", () => {
    const creditCardGrid = shallow(<CreditCardGrid creditCards={[]} />);

    expect(creditCardGrid.exists()).toEqual(true);
  });

  it("should contain only AddNewTile if no credit cards provider", () => {
    const creditCardGrid = shallow(<CreditCardGrid creditCards={[]} />);
    expect(creditCardGrid.find(TileGrid).props().elements.length).toEqual(1);
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
