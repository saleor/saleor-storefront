import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTile } from "@components/molecules";

import { IProps } from "./types";

export const AddressGrid: React.FC<IProps> = ({ addresses }: IProps) => {
  const addNewTile = <AddNewTile key="0" type="address" />;

  const addressTiles = addresses.reduce(
    (elements, address) => {
      elements.push(<AddressTile key={address.id} {...address} />);
      return elements;
    },
    [addNewTile]
  );

  return <TileGrid columns={2} elements={addressTiles} />;
};
