import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTile } from "@components/molecules";

import { IProps } from "./types";

export const AddressGrid: React.FC<IProps> = ({ addresses }: IProps) => {
  const addNewTile = [<AddNewTile type="address" />];
  const addressTiles = addresses.map(address => <AddressTile {...address} />);

  return <TileGrid elements={addNewTile.concat(addressTiles)} />;
};
