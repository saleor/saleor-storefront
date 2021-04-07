import { useAuth, useOrdersByUser } from "@saleor/sdk/";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Button, Loader } from "@components/atoms";
import { OrderTable } from "@components/molecules";

import * as S from "./styles";

const ORDERS_PER_API_CALL = 5;

export const OrdersHistory: React.FC = () => {
  const { user } = useAuth();
  const { data, loading, loadMore } = useOrdersByUser(
    {
      perPage: ORDERS_PER_API_CALL,
    },
    {
      fetchPolicy: "network-only",
    }
  );

  return loading && !data ? (
    <Loader />
  ) : (
    <>
      <OrderTable orders={data?.edges.map(e => e.node) || []} isGuest={!user} />
      {data?.pageInfo.hasNextPage && (
        <S.Wrapper>
          <Button
            testingContext="loadMoreOrdersButton"
            onClick={() => {
              loadMore({
                after: data!.pageInfo.endCursor,
                perPage: ORDERS_PER_API_CALL,
              });
            }}
          >
            <FormattedMessage defaultMessage="Load more" />
          </Button>
        </S.Wrapper>
      )}
    </>
  );
};
