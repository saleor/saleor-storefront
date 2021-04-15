import { useOrdersByUser } from "@saleor/sdk/";
import React from "react";

import { Loader } from "@components/atoms";
import { StoreTabTiles } from "@components/molecules/StoreTagTiles";

import * as S from "./styles";

const ORDERS_PER_API_CALL = 5;

export const StorePage: React.FC = () => {
  const { data, loading } = useOrdersByUser(
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
      <S.Wrapper>
        <StoreTabTiles />
      </S.Wrapper>
    </>
  );
};
