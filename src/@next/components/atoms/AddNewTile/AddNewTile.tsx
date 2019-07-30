import React from "react";

import { Icon } from "../Icon";
import { Tile } from "../Tile";
import * as S from "./styles";
import { IProps } from "./types";

export const AddNewTile: React.FC<IProps> = ({ type }: IProps) => {
  return (
    <Tile tileType="addNew">
      <S.Content>
        <p>
          <Icon size={24} name="plus" />
        </p>
        <p>Add new {type}</p>
      </S.Content>
    </Tile>
  );
};
