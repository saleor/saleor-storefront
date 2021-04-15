import React from "react";
import { FormattedMessage } from "react-intl";

import { IconButton, Tile } from "@components/atoms";

import { RegisterStoreVariables } from "./gqlTypes/RegisterStore";
import { TypedStoreRegisterMutation } from "./queries";
import { StoreForm } from "./StoreForm";
import * as S from "./styles";

export const StoreTabTiles: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const initialValues: RegisterStoreVariables = {
    name: "",
    storeTypeId: "",
  };
  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            <FormattedMessage defaultMessage="STORE" />
          </S.Header>
          <S.Content>
            <S.HeaderSmall>
              <FormattedMessage defaultMessage="Store details" />
              {!isEditing && (
                <IconButton
                  testingContext="editDetailsButton"
                  name="edit"
                  size={22}
                  onClick={() => setIsEditing(isEditing => !isEditing)}
                />
              )}
            </S.HeaderSmall>
            {isEditing ? (
              <TypedStoreRegisterMutation>
                {(createStore, { loading, data }) => {
                  console.log({ data });
                  return (
                    <StoreForm
                      isLoadingSubmit={loading}
                      initialValues={initialValues}
                      handleSubmit={data => {
                        createStore({
                          variables: data,
                        });
                      }}
                      hide={() => {
                        setIsEditing(false);
                      }}
                    />
                  );
                }}
              </TypedStoreRegisterMutation>
            ) : null}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
