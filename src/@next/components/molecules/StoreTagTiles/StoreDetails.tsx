import React from "react";
import { useAlert } from "react-alert";

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
  const alert = useAlert();
  const NO_STORE = `You don't have Store`;

  const [reRender, setRerender] = React.useState(false);

  return (
    <>
      {storeId ? (
        <TypeStoreForUserQuery
          alwaysRender
          displayLoader={false}
          errorPolicy="all"
          variables={{ id: storeId }}
        >
          {({ data: dataStore, refetch }) => {
            if (reRender) {
              refetch();
              setRerender(false);
            }
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
                  <TypedStoreUpdateMutation
                    onCompleted={() => {
                      setIsEditing(false);
                      setRerender(true);
                    }}
                  >
                    {(updateStore, { loading, data }) => {
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
            <TypedStoreRegisterMutation
              onCompleted={() => {
                setIsEditing(false);
                setRerender(true);
              }}
            >
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
                      }).then((resp: any) => {
                        const errors = resp.data.storeCreate.storeErrors;
                        if (errors.length === 0) {
                          alert.show(
                            {
                              title: "Success",
                            },
                            { type: "success" }
                          );
                        } else {
                          alert.show(
                            {
                              title: errors[0].message,
                            },
                            { type: "error" }
                          );
                        }
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
      )}
    </>
  );
};
