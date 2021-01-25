import { GetStaticPaths, GetStaticProps } from "next";

import { shopAttributesQuery } from "@graphql";
import {
  ShopAttributesQuery,
  ShopAttributesQueryVariables,
} from "@graphql/gqlTypes/ShopAttributesQuery";
import {
  channelSlug,
  exportMode,
  incrementalStaticRegenerationRevalidate,
  staticPathsFetchBatch,
} from "@temp/constants";
import { PRODUCTS_PER_PAGE } from "@temp/core/config";
import { CategoryPage, CategoryPageProps } from "@temp/views/Category";
import { exhaustList, getFeaturedProducts, getSaleorApi } from "@utils/ssr";

export default CategoryPage;

export const getStaticPaths: GetStaticPaths<
  CategoryPageProps["params"]
> = async () => {
  const { api } = await getSaleorApi();
  // TODO: Refactor to
  // const productsListApi = await exhaustList(() =>
  //   api.products.getList({
  //     first: staticPathsFetchBatch,
  //     channel: channelSlug,
  //   })
  // );

  const categoriesList = await api.categories.getList({
    first: staticPathsFetchBatch,
  });

  await exhaustList(categoriesList);

  const paths = categoriesList.data.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: !exportMode };
};

export const getStaticProps: GetStaticProps<
  CategoryPageProps,
  CategoryPageProps["params"]
> = async ({ params: { slug } }) => {
  let data = null;
  const { api, apolloClient } = await getSaleorApi();
  const { data: details } = await api.categories.getDetails({ slug });

  if (details) {
    const { id } = details;

    const [
      attributes,
      featuredProducts,
      ancestors,
      [products, numberOfProducts],
    ] = await Promise.all([
      apolloClient
        .query<ShopAttributesQuery, ShopAttributesQueryVariables>({
          query: shopAttributesQuery,
          variables: { categoryId: id, channel: channelSlug },
        })
        .then(({ data }) => data.attributes?.edges.map(e => e.node) || []),
      getFeaturedProducts(),
      api.categories.getAncestors({ first: 5, id }).then(({ data }) => data),
      api.products
        .getList({
          first: PRODUCTS_PER_PAGE,
          channel: channelSlug,
          filter: { categories: [id] },
        })
        .then(({ data, totalCount }) => [data, totalCount]),
    ]);
    data = {
      details,
      ancestors,
      featuredProducts,
      attributes,
      products,
      id,
      numberOfProducts,
    };
  }

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: {
      data,
      params: { slug },
    },
  };
};
