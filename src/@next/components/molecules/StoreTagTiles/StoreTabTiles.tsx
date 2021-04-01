import { IconButton, Tile } from "@components/atoms";
import { useAccountUpdate } from "@saleor/sdk";
import React from "react";
import { FormattedMessage } from "react-intl";
import { StoreForm } from "./StoreForm";
import * as S from "./styles";

export const StoreTabTiles: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [setAccountUpdate] = useAccountUpdate();
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
              <StoreForm
                initialValues={{
                  storeName: "" || "",
                  storeAddress: "" || "",
                  storeCategory: "",
                  storeDescription: "",
                  storeImageFarm: "",
                  storePhonenumber: "",
                  storeCoordinates: 0,
                  storeAcreage: 0,
                }}
                handleSubmit={data => {
                  setAccountUpdate({ input: data });
                }}
                hide={() => {
                  setIsEditing(false);
                }}
              />
            ) : null}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
