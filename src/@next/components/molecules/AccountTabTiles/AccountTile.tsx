import React from "react";

import { useAccountUpdate, useUserDetails } from "@sdk/react";

import { Attribute, IconButton, Tile } from "@components/atoms";

import { AccountUpdateForm } from "./AccountUpdateForm";
import * as S from "./styles";

import { useIntl } from "react-intl";

export const AccountTile: React.FC = () => {
  const intl = useIntl();

  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate, { data, error }] = useAccountUpdate();
  const { data: user } = useUserDetails();

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
          {intl.formatMessage({
                defaultMessage: "MY DATA",
                description: "my data account title",
            })}
          </S.Header>
          <S.Content>
            <S.HeaderSmall>
              {intl.formatMessage({
                  defaultMessage: "Personal details",
                  description: "personal details account title",
              })}
              {!isEditing && (
                <IconButton
                  name="edit"
                  size={22}
                  onClick={() => setIsEditing(isEditing => !isEditing)}
                />
              )}
            </S.HeaderSmall>
            {isEditing ? (
              <AccountUpdateForm
                initialValues={{
                  firstName: (user && user.firstName) || "",
                  lastName: (user && user.lastName) || "",
                }}
                handleSubmit={data => {
                  setAccountUpdate({ input: data });
                }}
                hide={() => {
                  setIsEditing(false);
                }}
              />
            ) : (
              <S.ContentOneLine>
                <Attribute
                  description=
                  {intl.formatMessage({
                    defaultMessage: "First Name",
                    description: "first name account attribute",
                  })}
                  attributeValue={(user && user.firstName) || "-"}
                />
                <Attribute
                  description=
                  {intl.formatMessage({
                    defaultMessage: "Last Name",
                    description: "last name account attribute",
                  })}
                  attributeValue={(user && user.lastName) || "-"}
                />
              </S.ContentOneLine>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
