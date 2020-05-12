import { useOrdersByUser } from "@sdk/react/";
import React from "react";

import { Button, Loader } from "@components/atoms";
import { OrderTabel } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

import { buttonMessages } from "@saleor/intl";
import { useIntl } from "react-intl";

const ORDERS_PER_APICALL = 5;

export const OrdersHistory: React.FC<IProps> = ({ history }: IProps) => {
  const intl = useIntl();

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
      <OrderTabel orders={data!.edges} history={history} />
      {data!.pageInfo.hasNextPage && (
        <S.Wrapper>
          <Button
            data-testid="load_more__button"
            onClick={() => {
              loadMore({
                after: data!.pageInfo.endCursor,
                perPage: ORDERS_PER_APICALL,
              });
            }}
          >
          {intl.formatMessage(buttonMessages.loadMore)}   
       </Button>
        </S.Wrapper>
      )}
    </>
  );
};
