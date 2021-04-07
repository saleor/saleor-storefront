import { GetStaticProps } from "next";

import { featuredProductsQuery } from "@graphql";
import {
  FeaturedProductsQuery,
  FeaturedProductsQueryVariables,
} from "@graphql/gqlTypes/FeaturedProductsQuery";
import {
  channelSlug,
  incrementalStaticRegenerationRevalidate,
} from "@temp/constants";
import { SearchPage, SearchPageProps } from "@temp/views/Search";
import { getSaleorApi } from "@utils/ssr";

export default SearchPage;

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
  const { apolloClient } = await getSaleorApi();
  const { data } = await apolloClient.query<
    FeaturedProductsQuery,
    FeaturedProductsQueryVariables
  >({
    query: featuredProductsQuery,
    variables: { channel: channelSlug },
  });

  return {
    revalidate: incrementalStaticRegenerationRevalidate,
    props: { data },
  };
};
