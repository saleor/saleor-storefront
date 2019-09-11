import React from "react";

import { Attribute, IconButton, Tile } from "@components/atoms";

import { PasswordChangeForm } from "./PasswordChangeForm";
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
            onClick={() => setIsEditing(isEditing => !isEditing)}
          />
        </S.Header>
        <S.Content>
          {isEditing ? (
            <S.ContentEdit>
              <PasswordChangeForm />
            </S.ContentEdit>
          ) : (
            <Attribute description="Password" attributeValue="**************" />
          )}
        </S.Content>
      </S.Wrapper>
    </Tile>
  );
};
