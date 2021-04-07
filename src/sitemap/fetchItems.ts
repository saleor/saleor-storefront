import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import dotenv from "dotenv";
import fetch from "isomorphic-fetch";
import { generatePath } from "react-router";

import { paths } from "../paths";
import {
  getCategoriesQuery,
  getCollectionsQuery,
  getProductsQuery,
} from "./queries";

const config = {
  ...dotenv.config().parsed,
  ...dotenv.config({ path: ".env.local" }).parsed,
};

const fetchItems = async ({ query, perPage = 100 }, callback: any) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri: config.NEXT_PUBLIC_API_URI, fetch }),
  });
  const next = async (cursor = null) => {
    const response = await client.query({
      query,
      variables: {
        perPage,
        cursor,
        channel: config.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG,
      },
    });
    const data =
      response.data[query.definitions[0].selectionSet.selections[0].name.value];
    data.edges.map(({ node }) => callback(node));
    if (data.pageInfo.hasNextPage) {
      await next(data.pageInfo.endCursor);
    }
  };
  await next();
};

export const getCategories = async callback => {
  await fetchItems({ query: getCategoriesQuery }, ({ slug }) => {
    callback({ url: generatePath(paths.category, { slug }) });
  });
};

export const getCollections = async callback => {
  await fetchItems({ query: getCollectionsQuery }, ({ slug }) => {
    callback({ url: generatePath(paths.collection, { slug }) });
  });
};

export const getProducts = async callback => {
  await fetchItems({ query: getProductsQuery }, ({ slug }) => {
    callback({ url: generatePath(paths.product, { slug }) });
  });
};
