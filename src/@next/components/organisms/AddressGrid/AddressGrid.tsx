import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTile } from "@components/molecules";

import { IProps } from "./types";

/**
 * Addresses tiles with add new address tile opening address form addition modal.
 */
export const AddressGrid: React.FC<IProps> = ({
  addresses,
  addNewAddress,
}: IProps) => {
  const addNewTile = (
    <AddNewTile key="newTile" type="address" onClick={addNewAddress} />
  );

  const addressTiles = addresses.reduce(
    (elements, address) => {
      elements.push(
        <AddressTile key={`addressTile-${address.id}`} {...address} />
      );
      return elements;
    },
    [addNewTile]
  );

  return <TileGrid columns={2} elements={addressTiles} />;
};
