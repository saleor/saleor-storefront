import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { CreditCardTile } from "@components/molecules";

import { IProps } from "./types";

export const CreditCardGrid: React.FC<IProps> = ({ creditCards }: IProps) => {
  const addNewTile = [<AddNewTile type="card" />];
  const ccTiles = creditCards.map(cc => <CreditCardTile {...cc} />);

  return <TileGrid elements={addNewTile.concat(ccTiles)} />;
};
