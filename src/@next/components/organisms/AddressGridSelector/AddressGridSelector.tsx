import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTileOption } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const AddressGridSelector: React.FC<IProps> = ({
  addresses,
  selectedAddressId,
  onSelect,
}: IProps) => {
  const addNewTile = <AddNewTile key="0" type="address" onClick={() => null} />;

  const addressTiles = addresses.reduce(
    (elements, { id, address }) => {
      elements.push(
        <AddressTileOption
          key={id}
          id={id}
          inputName="address-tile-option"
          label="Deliver to this address"
          address={address}
          onChange={() => onSelect(id, address)}
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
