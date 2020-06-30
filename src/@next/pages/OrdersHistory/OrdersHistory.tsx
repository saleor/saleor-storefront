import { useOrdersByUser } from "@saleor/sdk/";
import React from "react";
import { FormattedMessage } from "react-intl";

import { Button, Loader } from "@components/atoms";
import { OrderTabel } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

const ORDERS_PER_APICALL = 5;

export const OrdersHistory: React.FC<IProps> = ({ history }: IProps) => {
  const { data, loading, loadMore } = useOrdersByUser(
    {
      perPage: ORDERS_PER_APICALL,
    },
    {
      fetchPolicy: "network-only",
    }
  );

  return loading && !data ? (
    <Loader />
  ) : (
    <>
      <OrderTabel orders={data?.edges} history={history} />
      {data?.pageInfo.hasNextPage && (
        <S.Wrapper>
          <Button
            testingContext="loadMoreOrdersButton"
            onClick={() => {
              loadMore({
                after: data!.pageInfo.endCursor,
                perPage: ORDERS_PER_APICALL,
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
