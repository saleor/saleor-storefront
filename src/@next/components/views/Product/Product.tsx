import React from "react";

import { useSingleProduct } from "@sdk/react";
import { getGraphqlIdFromDBId } from "@utils/core";
import { ProductPage } from "@components/templates";

import { Loader } from "@components/atoms";
import { RouteComponentProps } from "react-router";

export const Product: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
}: RouteComponentProps<{ id: string }>) => {
  const id = getGraphqlIdFromDBId(match.params.id, "Product");
  const { loading } = useSingleProduct(
    { id },
    {
      fetchPolicy: "cache-and-network",
    }
  );
  return <>{loading ? <Loader fullScreen={true} /> : <ProductPage />}</>;
};
