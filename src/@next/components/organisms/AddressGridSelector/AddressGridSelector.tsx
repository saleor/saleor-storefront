import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTileOption } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const AddressGridSelector: React.FC<IProps> = ({ addresses }: IProps) => {
  const [tempSelectId, setTemoSelectId] = React.useState(addresses[0].id);

  const addNewTile = <AddNewTile key="0" type="address" onClick={() => null} />;

  const addressTiles = addresses.reduce(
    (elements, { id, address, onSelect }) => {
      elements.push(
        <AddressTileOption
          key={id}
          id={id}
          inputName="address-tile-option"
          label="Deliver to this address"
          address={address}
          onChange={() => setTemoSelectId(id)}
          checked={tempSelectId === id}
        />
      );
      return elements;
    },
    [addNewTile]
  );

  return <TileGrid columns={2} elements={addressTiles} />;
};

export { AddressGridSelector };
