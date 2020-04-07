import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTileOption } from "@components/molecules";

import { IProps } from "./types";

/**
 * Example component description.
 */
const AddressGridSelector: React.FC<IProps> = ({
  addresses,
  selectedAddressId,
  onSelect,
}: IProps) => {
  const addNewTile = (
    <AddNewTile
      data-cy={`addressTileAddNew`}
      key="0"
      type="address"
      onClick={() => null}
    />
  );

  const addressTiles = addresses.reduce(
    (elements, { id, address }) => {
      elements.push(
        <AddressTileOption
          data-cy={`addressTileOption${id}`}
          key={id}
          id={id}
          inputName="address-tile-option"
          label="Deliver to this address"
          address={address}
          onChange={() => onSelect(address, id)}
          checked={!!selectedAddressId && selectedAddressId === id}
        />
      );
      return elements;
    },
    [addNewTile]
  );

  return <TileGrid columns={2} elements={addressTiles} />;
};

export { AddressGridSelector };
