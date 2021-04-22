import React from "react";

import { Loader } from "@components/atoms";
import { IconButton } from "@components/atoms/IconButton";

import { RegisterStoreVariables } from "./gqlTypes/RegisterStore";
import {
  TypedStoreRegisterMutation,
  TypedStoreUpdateMutation,
  TypeStoreForUserQuery,
} from "./queries";
import { StoreForm } from "./StoreForm";
import * as S from "./styles";

type Props = {
  storeId?: string;
  storeName?: string;
};
export const StoreDetail: React.FC<Props> = ({ storeId, storeName }) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const NO_STORE = `You don't have Store`;

  return (
    <>
      {storeId ? (
        <TypeStoreForUserQuery
          alwaysRender
          displayLoader={false}
          errorPolicy="all"
          variables={{ id: storeId }}
        >
          {({ data: dataStore }) => {
            if (!dataStore?.store) {
              return <Loader />;
            }

            const tempDescription =
              dataStore.store.description &&
              dataStore.store.description.replace(/'/g, '"');

            const initialData: RegisterStoreVariables = {
              name: dataStore.store.name || "",
              description: tempDescription
                ? JSON.parse(tempDescription)?.description
                : "",

              phone: dataStore?.store.phone,
              acreage: dataStore?.store.acreage,
              latlong: dataStore?.store.latlong,
              storeTypeId: dataStore.store.storeType.id,
            };

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
                  <TypedStoreUpdateMutation>
                    {(updateStore, { loading, data }) => {
                      console.log({ data });
                      return (
                        <StoreForm
                          isLoadingSubmit={loading}
                          initialValues={initialData}
                          handleSubmit={data => {
                            updateStore({
                              variables: {
                                ...data,
                                id: storeId,
                                description: JSON.stringify({
                                  description: data.description,
                                }),
                              },
                            });
                            setIsEditing(false);
                          }}
                          hide={() => {
                            setIsEditing(false);
                          }}
                        />
                      );
                    }}
                  </TypedStoreUpdateMutation>
                ) : null}
              </>
            );
          }}
        </TypeStoreForUserQuery>
      ) : (
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
                    handleSubmit={data => {
                      createStore({
                        variables: {
                          ...data,
                          description: JSON.stringify({
                            description: data.description,
                          }),
                        },
                      });
                      setIsEditing(false);
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
      )}
    </>
  );
};
