import { ConnectResult, SaleorManager } from "@saleor/sdk";
import BaseList, { BaseListVariables } from "@saleor/sdk/lib/helpers/BaseList";

import { featuredProductsQuery } from "@graphql";
import { FeaturedProduct } from "@graphql/gqlTypes/FeaturedProduct";
import {
  FeaturedProductsQuery,
  FeaturedProductsQueryVariables,
} from "@graphql/gqlTypes/FeaturedProductsQuery";
import { apiUrl, channelSlug } from "@temp/constants";

let CONNECTION: ConnectResult | null = null;

export const getSaleorApi = async () => {
  if (!CONNECTION) {
    const manager = new SaleorManager({
      apiUrl,
      channel: channelSlug,
    });
    CONNECTION = await manager.connect();
  }

  return CONNECTION;
};

export const exhaustList = async <
  TQuery,
  TObject,
  TVariables extends BaseListVariables
>(
  listApi: BaseList<TQuery, TObject, TVariables>,
  tries = 60
): Promise<void> =>
  new Promise((resolve, reject) => {
    (async function fetch(listApi, triesLeft) {
      const { pageInfo, next } = listApi;

      if (pageInfo?.hasNextPage === false) {
        return resolve();
      }

      if (!triesLeft) {
        return reject(new Error("Max tries exeeded"));
      }

      await next();

      fetch(listApi, --triesLeft);
    })(listApi, tries);
  });

export const getFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    FeaturedProductsQuery,
    FeaturedProductsQueryVariables
  >({
    query: featuredProductsQuery,
    variables: { channel: channelSlug },
  });

  return data?.collection?.products?.edges.map(e => e.node) || [];
};
