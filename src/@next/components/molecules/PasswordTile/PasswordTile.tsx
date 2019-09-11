import React from "react";

import { IconButton, Tile } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const PasswordTile: React.FC<IProps> = ({  }: IProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  return (
    <Tile>
      <S.Wrapper>
        <S.Header>
          MY PASSWORD{" "}
          <IconButton
            name="edit"
            size={22}
            onClick={() => setIsEditing(true)}
          />
        </S.Header>
      </S.Wrapper>
    </Tile>
  );
};
