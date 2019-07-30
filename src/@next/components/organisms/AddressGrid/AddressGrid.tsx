import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTile } from "@components/molecules";

import { IProps } from "./types";

export const AddressGrid: React.FC<IProps> = ({ addresses }: IProps) => {
  const addNewTile = [<AddNewTile key="0" type="address" />];
  const addressTiles = addresses.map(address => (
    <AddressTile key={address.id} {...address} />
  ));

  return <TileGrid elements={addNewTile.concat(addressTiles)} />;
};
