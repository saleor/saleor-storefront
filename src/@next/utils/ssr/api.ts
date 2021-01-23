import { SaleorManager } from "@saleor/sdk";
import { SaleorAPI } from "@saleor/sdk/lib/api";
import BaseList, { BaseListVariables } from "@saleor/sdk/lib/helpers/BaseList";

import { apiUrl, channelSlug } from "@temp/constants";

let API: SaleorAPI | null = null;

export const getSaleorApi = async () => {
  if (!API) {
    const manager = new SaleorManager({
      apiUrl,
      channel: channelSlug,
    });
    API = (await manager.connect()).api;
  }

  return API;
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
