import { ConnectResult, SaleorManager } from "@saleor/sdk";
import BaseList, { BaseListVariables } from "@saleor/sdk/lib/helpers/BaseList";
import { GetShop } from "@saleor/sdk/lib/queries/gqlTypes/GetShop";
import { getShop } from "@saleor/sdk/lib/queries/shop";

import {
  featuredProductsQuery,
  shopAttributesQuery,
  shopMenusQuery,
} from "@graphql";
import { Attribute } from "@graphql/gqlTypes/Attribute";
import {
  FeaturedProductsQuery,
  FeaturedProductsQuery_collection,
  FeaturedProductsQuery_collection_products_edges_node,
  FeaturedProductsQueryVariables,
} from "@graphql/gqlTypes/FeaturedProductsQuery";
import {
  ShopAttributesQuery,
  ShopAttributesQueryVariables,
} from "@graphql/gqlTypes/ShopAttributesQuery";
import {
  ShopMenusQuery,
  ShopMenusQueryVariables,
} from "@graphql/gqlTypes/ShopMenusQuery";
import { apiUrl, channelSlug } from "@temp/constants";
import { RequireOnlyOne } from "@utils/tsUtils";

let CONNECTION: ConnectResult | null = null;

export const getSaleorApi = async () => {
  if (!CONNECTION) {
    const manager = new SaleorManager(
      { apiUrl, channel: channelSlug },
      { options: { ssrMode: true } }
    );
    CONNECTION = await manager.connect();
  }

  return CONNECTION;
};

/**
 * Fetches all data from collection based API which extends BaseList abstraction.
 */
export const exhaustList = async <
  TQuery,
  TObject,
  TVariables extends BaseListVariables
>(
  listApi: Promise<BaseList<TQuery, TObject, TVariables>>,
  tries = 60
): Promise<BaseList<TQuery, TObject, TVariables>> =>
  new Promise((resolve, reject) => {
    (async function fetch(listApi, triesLeft) {
      const result = await listApi;
      const { pageInfo, next } = result;

      if (pageInfo?.hasNextPage === false) {
        return resolve(result);
      }

      if (!triesLeft) {
        return reject(new Error("Max tries exeeded"));
      }

      await next();

      fetch(listApi, --triesLeft);
    })(listApi, tries);
  });

export type FeaturedProducts = {
  products: FeaturedProductsQuery_collection_products_edges_node[];
} & Partial<Pick<FeaturedProductsQuery_collection, "name" | "backgroundImage">>;

export const getFeaturedProducts = async (): Promise<FeaturedProducts> => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    FeaturedProductsQuery,
    FeaturedProductsQueryVariables
  >({
    query: featuredProductsQuery,
    variables: { channel: channelSlug },
  });

  return {
    ...data.collection,
    products: data.collection?.products?.edges.map(e => e.node) || [],
  };
};

export const getShopAttributes = async ({
  categoryId = null,
  collectionId = null,
}: RequireOnlyOne<{
  categoryId: string | null;
  collectionId: string | null;
}>): Promise<Attribute[]> => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    ShopAttributesQuery,
    ShopAttributesQueryVariables
  >({
    query: shopAttributesQuery,
    variables: {
      categoryId,
      collectionId,
      channel: channelSlug,
    },
  });
  return data?.attributes?.edges.map(e => e.node) || [];
};

export const getShopMenus = async (): Promise<ShopMenusQuery> => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    ShopMenusQuery,
    ShopMenusQueryVariables
  >({
    query: shopMenusQuery,
    variables: {
      channel: channelSlug,
      footerSlug: "footer",
      mainMenuSlug: "navbar",
    },
  });
  return data;
};

export type ShopConfig = ShopMenusQuery & { shopConfig: GetShop["shop"] };

export const getShopConfig = async (): Promise<any> => {
  const { apolloClient } = await getSaleorApi();
  const [{ footer, mainMenu }, shopConfig] = await Promise.all([
    apolloClient
      .query<ShopMenusQuery, ShopMenusQueryVariables>({
        query: shopMenusQuery,
        variables: {
          channel: channelSlug,
          footerSlug: "footer",
          mainMenuSlug: "navbar",
        },
      })
      .then(({ data }) => data),
    apolloClient
      .query<GetShop>({
        query: getShop,
      })
      .then(({ data }) => data?.shop),
  ]);

  return { footer, mainMenu, shopConfig };
};
