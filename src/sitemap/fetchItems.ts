import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import urljoin from "url-join";

import { generateCategoryUrl, generateCollectionUrl, generateProductUrl } from '../core/utils';
import { getCategoriesQuery, getCollectionsQuery, getProductsQuery } from './queries';

const API_URL = urljoin(process.env.BACKEND_URL || "", "/graphql/");

const fetchItems = async ({ uri, query, perPage }, callback: any) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({ uri, fetch })
  });
  const field = query.definitions[0].selectionSet.selections[0].name.value
  const next = async (cursor=null) => {
    const response = await client.query({ query, variables: { perPage, cursor } });
    const edges = response.data[field].edges
    edges.map(({ node }) => callback(node))
    if (edges.length === perPage) {
      await next(edges[edges.length-1].cursor)
    }
  }
  await next()
}

export const getCategories = async (callback) => {
  await fetchItems({ uri: API_URL, perPage: 100, query: getCategoriesQuery}, ({ id, name }) => {
    callback({ url: generateCategoryUrl(id, name) });
  })
}

export const getCollections = async (callback) => {
  await fetchItems({ uri: API_URL, perPage: 100, query: getCollectionsQuery}, ({ id, name }) => {
    callback({ url: generateCollectionUrl(id, name) });
  })
}

export const getProducts = async (callback) => {
  await fetchItems({ uri: API_URL, perPage: 100, query: getProductsQuery}, ({ id, name }) => {
    callback({ url: generateProductUrl(id, name) });
  })
}
