import { SaleorManager } from "@saleor/sdk";
import { SaleorAPI } from "@saleor/sdk/lib/api";
import BaseList, { BaseListVariables } from "@saleor/sdk/lib/helpers/BaseList";
import ApolloClient from "apollo-client";

import { apiUrl, channelSlug } from "@temp/constants";

let CONNECTION: {
  api: SaleorAPI;
  apolloClient: ApolloClient<any>;
} | null = null;

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
