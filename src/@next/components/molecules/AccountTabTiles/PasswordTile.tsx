import React from "react";

import { Attribute, IconButton, Tile } from "@components/atoms";

import { usePasswordChange } from "@sdk/react";
import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";

export const PasswordTile: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setPasswordChange, { data, error }] = usePasswordChange();

  React.useEffect(() => {
    if (data && !error) {
      setIsEditing(false);
    }
  }, [data, error]);
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            MY PASSWORD
            {!isEditing && (
              <IconButton
                name="edit"
                size={22}
                onClick={() => setIsEditing(isEditing => !isEditing)}
              />
            )}
          </S.Header>
          <S.Content>
            {isEditing ? (
              <S.ContentEdit>
                <PasswordChangeForm
                  handleSubmit={data => {
                    setPasswordChange(data);
                  }}
                  hide={() => {
                    setIsEditing(false);
                  }}
                  error={error ? error!.extraInfo!.userInputErrors : []}
                />
              </S.ContentEdit>
            ) : (
              <Attribute
                description="Password"
                attributeValue="**************"
              />
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
