import React from "react";
import { FormattedMessage } from "react-intl";

import { Icon } from "../Icon";
import { Tile } from "../Tile";
import * as S from "./styles";
import { IProps } from "./types";

export const AddNewTile: React.FC<IProps> = ({ type, ...props }: IProps) => {
  return (
    <Tile tileType="addNew" {...props}>
      <S.Content>
        <p>
          <Icon size={24} name="plus" />
        </p>
        <p>
          <FormattedMessage defaultMessage="Add new {type}" values={{ type }} />
        </p>
      </S.Content>
    </Tile>
  );
};
