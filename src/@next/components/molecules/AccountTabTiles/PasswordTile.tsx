import React from "react";

import { Attribute, IconButton, Tile } from "@components/atoms";

import { usePasswordChange } from "@sdk/react";
import { PasswordChangeForm } from "./PasswordChangeForm";
import * as S from "./styles";

import { useIntl } from "react-intl";

export const PasswordTile: React.FC = () => {
  const intl = useIntl();

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
            {
              intl.formatMessage({
                defaultMessage: "MY PASSWORD",
                description: "my password title",
              })
            }
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
                description=
                {
                  intl.formatMessage({
                    defaultMessage: "Password",
                    description: "password title",
                  })
                }
                attributeValue="**************"
              />
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
