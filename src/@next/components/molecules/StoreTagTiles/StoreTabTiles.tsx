import { useAuth } from "@saleor/sdk";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Loader, Tile } from "@components/atoms";

import { TypeListStoreUserQuery } from "./queries";
import { StoreDetail } from "./StoreDetails";
import * as S from "./styles";

export const StoreTabTiles: React.FC = () => {
  const { user } = useAuth();

  return (
    <S.TileWrapper>
      <Tile>
        <S.Wrapper>
          <S.Header>
            <FormattedMessage defaultMessage="User Store" />
          </S.Header>
          <S.Content>
            <TypeListStoreUserQuery
              alwaysRender
              displayLoader={false}
              errorPolicy="all"
              variables={{ id: user?.id }}
            >
              {({ data, loading }) => {
                const listStore = data?.user?.store;

                if (loading) {
                  return <Loader />;
                }

                if (
                  (listStore && Object.keys(listStore).length === 0) ||
                  !listStore
                ) {
                  return <StoreDetail />;
                }

                return (
                  <>
                    {listStore && (
                      <StoreDetail
                        storeId={listStore.id}
                        storeName={listStore.name}
                      />
                    )}
                  </>
                );
              }}
            </TypeListStoreUserQuery>
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
