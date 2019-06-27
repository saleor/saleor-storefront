import React from "react";

import { Icon, Tile } from "..";
import * as S from "./styles";
import { IProps } from "./types";

export const AddNewTile: React.FC<IProps> = ({ type }: IProps) => {
  return (
    <Tile tileType="addNew">
      <S.Content>
        <Icon size={24} name="plus" />
        <p>Add new {type}</p>
      </S.Content>
    </Tile>
  );
};
