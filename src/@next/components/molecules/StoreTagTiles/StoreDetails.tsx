import React from "react";

import { IconButton } from "@components/atoms/IconButton";

import { RegisterStoreVariables } from "./gqlTypes/RegisterStore";
import { TypedStoreRegisterMutation } from "./queries";
import { StoreForm } from "./StoreForm";
import * as S from "./styles";

type Props = {
  storeId?: string;
  storeName?: string;
};
export const StoreDetail: React.FC<Props> = ({ storeId, storeName }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const initialValues: RegisterStoreVariables = {
    name: "",
    storeTypeId: "",
  };

  const NO_STORE = `You don't have Store`;

  return (
    <>
      <S.HeaderSmall>
        <div>{storeName || NO_STORE}</div>
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
            return (
              <StoreForm
                isLoadingSubmit={loading}
                initialValues={initialValues}
                handleSubmit={data => {
                  createStore({
                    variables: {
                      ...data,
                      description: `{}`,
                    },
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
    </>
  );
};
